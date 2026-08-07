/**
 * Minimal client for the Robinhood trading MCP server.
 *
 * Robinhood exposes an agent endpoint (default
 * https://agent.robinhood.com/mcp/trading) that speaks the Model Context
 * Protocol over "Streamable HTTP": JSON-RPC 2.0 requests are POSTed to the
 * endpoint and the server answers either with a plain JSON body or a
 * `text/event-stream` (SSE) body. We implement just enough of the protocol —
 * `initialize`, the `initialized` notification, `tools/list` and `tools/call` —
 * to power a small trading console, without pulling in the full MCP SDK.
 *
 * Auth: the endpoint is protected. We send a bearer token from
 * `ROBINHOOD_MCP_TOKEN`. Nothing here ever logs or returns that token.
 */

import type { McpTool, McpToolResult } from "../shared/trading";

const DEFAULT_ENDPOINT = "https://agent.robinhood.com/mcp/trading";
const PROTOCOL_VERSION = "2025-06-18";
const CLIENT_INFO = { name: "iambecomingbooks-trading", version: "1.0.0" };

export function getEndpoint(): string {
  return process.env.ROBINHOOD_MCP_URL || DEFAULT_ENDPOINT;
}

export function isConfigured(): boolean {
  return Boolean(process.env.ROBINHOOD_MCP_TOKEN);
}

type JsonRpcResponse = {
  jsonrpc: "2.0";
  id?: number | string | null;
  result?: any;
  error?: { code: number; message: string; data?: unknown };
};

export class RobinhoodMcpError extends Error {
  status: number;
  constructor(message: string, status = 502) {
    super(message);
    this.name = "RobinhoodMcpError";
    this.status = status;
  }
}

/** Extract the JSON-RPC payload from either a JSON or an SSE (text/event-stream) body. */
function parseBody(raw: string, contentType: string): JsonRpcResponse {
  const trimmed = raw.trim();

  if (
    contentType.includes("text/event-stream") ||
    trimmed.startsWith("event:") ||
    trimmed.startsWith("data:")
  ) {
    // Collect every `data:` line and return the first payload that looks like a
    // JSON-RPC response (has a `result` or `error`).
    const dataLines = trimmed
      .split(/\r?\n/)
      .filter(line => line.startsWith("data:"))
      .map(line => line.slice(5).trim())
      .filter(Boolean);

    let lastParsed: JsonRpcResponse | null = null;
    for (const payload of dataLines) {
      try {
        const parsed = JSON.parse(payload) as JsonRpcResponse;
        lastParsed = parsed;
        if (parsed.result !== undefined || parsed.error !== undefined) {
          return parsed;
        }
      } catch {
        // Ignore keep-alive / non-JSON data lines.
      }
    }

    if (lastParsed) return lastParsed;
    throw new RobinhoodMcpError(
      "Received an event stream with no JSON-RPC response."
    );
  }

  try {
    return JSON.parse(trimmed) as JsonRpcResponse;
  } catch {
    throw new RobinhoodMcpError(
      `Unexpected response from MCP server: ${trimmed.slice(0, 200)}`
    );
  }
}

/**
 * A short-lived MCP session. Each public method opens a session
 * (initialize → initialized), performs one operation, and lets it drop. This
 * keeps the integration stateless and simple, which is fine for a low-traffic
 * personal console.
 */
class McpSession {
  private endpoint: string;
  private token: string;
  private sessionId: string | null = null;

  constructor(endpoint: string, token: string) {
    this.endpoint = endpoint;
    this.token = token;
  }

  private baseHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      Authorization: `Bearer ${this.token}`,
      "MCP-Protocol-Version": PROTOCOL_VERSION,
    };
    if (this.sessionId) headers["Mcp-Session-Id"] = this.sessionId;
    return headers;
  }

  private async post(payload: unknown): Promise<Response> {
    let res: Response;
    try {
      res = await fetch(this.endpoint, {
        method: "POST",
        headers: this.baseHeaders(),
        body: JSON.stringify(payload),
      });
    } catch (err: any) {
      throw new RobinhoodMcpError(
        `Could not reach the trading service: ${err?.message ?? err}`,
        502
      );
    }

    if (res.status === 401 || res.status === 403) {
      throw new RobinhoodMcpError(
        "Authorization was rejected by Robinhood. Check ROBINHOOD_MCP_TOKEN (it may be missing, expired, or lacking trading scope).",
        502
      );
    }

    return res;
  }

  private async rpc<T = any>(method: string, params?: unknown): Promise<T> {
    const res = await this.post({
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      params,
    });

    const sid = res.headers.get("mcp-session-id");
    if (sid) this.sessionId = sid;

    const contentType = res.headers.get("content-type") || "";
    const text = await res.text();

    if (!res.ok) {
      throw new RobinhoodMcpError(
        `Trading service returned ${res.status}: ${text.slice(0, 200) || res.statusText}`,
        502
      );
    }

    const parsed = parseBody(text, contentType);
    if (parsed.error) {
      throw new RobinhoodMcpError(
        `MCP error (${parsed.error.code}): ${parsed.error.message}`,
        502
      );
    }
    return parsed.result as T;
  }

  private async notify(method: string, params?: unknown): Promise<void> {
    // Notifications carry no id and expect no body; failures here are non-fatal.
    try {
      await this.post({ jsonrpc: "2.0", method, params });
    } catch {
      /* best effort */
    }
  }

  async open(): Promise<{ serverName?: string; serverVersion?: string }> {
    const result = await this.rpc<{
      serverInfo?: { name?: string; version?: string };
    }>("initialize", {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: {},
      clientInfo: CLIENT_INFO,
    });
    await this.notify("notifications/initialized");
    return {
      serverName: result?.serverInfo?.name,
      serverVersion: result?.serverInfo?.version,
    };
  }

  async listTools(): Promise<McpTool[]> {
    const result = await this.rpc<{ tools?: McpTool[] }>("tools/list", {});
    return result?.tools ?? [];
  }

  async callTool(
    name: string,
    args: Record<string, unknown>
  ): Promise<McpToolResult> {
    const result = await this.rpc<{
      content?: unknown[];
      isError?: boolean;
      structuredContent?: unknown;
    }>("tools/call", { name, arguments: args ?? {} });

    const content = Array.isArray(result?.content) ? result!.content : [];
    const text = content
      .map((block: any) =>
        block && typeof block === "object" && block.type === "text"
          ? String(block.text ?? "")
          : ""
      )
      .filter(Boolean)
      .join("\n");

    return {
      text,
      isError: Boolean(result?.isError),
      content,
      structuredContent: result?.structuredContent,
    };
  }
}

function requireToken(): string {
  const token = process.env.ROBINHOOD_MCP_TOKEN;
  if (!token) {
    throw new RobinhoodMcpError(
      "Trading is not configured. Set ROBINHOOD_MCP_TOKEN to connect to Robinhood.",
      503
    );
  }
  return token;
}

/** Handshake + list the tools Robinhood advertises. */
export async function connectAndListTools(): Promise<{
  serverName?: string;
  serverVersion?: string;
  tools: McpTool[];
}> {
  const session = new McpSession(getEndpoint(), requireToken());
  const info = await session.open();
  const tools = await session.listTools();
  return { ...info, tools };
}

/** Invoke a single tool by name. */
export async function callTool(
  name: string,
  args: Record<string, unknown>
): Promise<McpToolResult> {
  const session = new McpSession(getEndpoint(), requireToken());
  await session.open();
  return session.callTool(name, args);
}
