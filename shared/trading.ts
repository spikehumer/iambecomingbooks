/**
 * Shared types and helpers for the Robinhood trading integration.
 *
 * The frontend and the Express backend both import from here so the shape of a
 * tool, a tool result, and the classification of "dangerous" (state-changing)
 * tools stays in one place.
 */

export type JsonSchema = Record<string, unknown>;

/** A tool as advertised by the Robinhood MCP server (`tools/list`). */
export type McpTool = {
  name: string;
  title?: string;
  description?: string;
  inputSchema?: JsonSchema;
};

/** Normalized result of a `tools/call`. */
export type McpToolResult = {
  /** Concatenated text blocks returned by the tool, for easy display. */
  text: string;
  /** Whether the MCP server flagged the call as an error (`isError`). */
  isError: boolean;
  /** The raw content array, in case the caller wants structured blocks. */
  content: unknown[];
  /** Structured content, when the tool returns it. */
  structuredContent?: unknown;
};

export type TradingStatus = {
  /** True when the server has a token configured and can attempt calls. */
  configured: boolean;
  /** The endpoint the server will talk to (never includes the token). */
  endpoint: string;
  /** Populated on a successful handshake. */
  connected?: boolean;
  serverName?: string;
  serverVersion?: string;
  toolCount?: number;
  /** Human-readable reason when configured but not connected. */
  error?: string;
};

/**
 * Patterns that identify tools which change account state (placing or
 * cancelling orders, transferring funds, etc). Calls to these require an
 * explicit `confirm: true` from the client so a mistaken tap can't move money.
 *
 * Matched case-insensitively against the tool name.
 */
const MUTATING_TOOL_PATTERNS: RegExp[] = [
  /place/i,
  /order/i,
  /buy/i,
  /sell/i,
  /trade/i,
  /cancel/i,
  /submit/i,
  /transfer/i,
  /withdraw/i,
  /deposit/i,
  /execute/i,
];

/**
 * A tool is treated as read-only (safe) when its name clearly only fetches
 * data, even if it happens to contain a mutating keyword (e.g. "get_orders").
 */
const READ_ONLY_PREFIXES = [
  "get_",
  "list_",
  "read_",
  "fetch_",
  "search_",
  "find_",
  "view_",
];

export function isMutatingTool(name: string): boolean {
  const lower = name.toLowerCase();

  if (READ_ONLY_PREFIXES.some(prefix => lower.startsWith(prefix))) {
    return false;
  }

  return MUTATING_TOOL_PATTERNS.some(pattern => pattern.test(name));
}
