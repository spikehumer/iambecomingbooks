import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { McpTool, TradingStatus } from "@shared/trading";
import { isMutatingTool } from "@shared/trading";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type ToolWithFlag = McpTool & { mutating?: boolean };

type CallResult = {
  ok: boolean;
  text: string;
  raw: unknown;
};

/** Pull the property definitions out of a tool's JSON Schema. */
function getSchemaFields(tool: McpTool | null): Array<{
  name: string;
  type: string;
  description?: string;
  required: boolean;
  enum?: string[];
}> {
  if (!tool?.inputSchema) return [];
  const schema = tool.inputSchema as {
    properties?: Record<string, any>;
    required?: string[];
  };
  const properties = schema.properties ?? {};
  const required = new Set(schema.required ?? []);

  return Object.entries(properties).map(([name, def]) => ({
    name,
    type: typeof def?.type === "string" ? def.type : "string",
    description: def?.description,
    required: required.has(name),
    enum: Array.isArray(def?.enum) ? def.enum.map(String) : undefined,
  }));
}

export default function Trading() {
  const [status, setStatus] = useState<TradingStatus | null>(null);
  const [tools, setTools] = useState<ToolWithFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ToolWithFlag | null>(null);
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<CallResult | null>(null);
  const [pendingConfirm, setPendingConfirm] = useState(false);

  // This console is a private operational tool — keep it out of search indexes.
  useEffect(() => {
    let robots = document.head.querySelector<HTMLMetaElement>(
      'meta[name="robots"]'
    );
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex,nofollow");
  }, []);

  async function loadEverything() {
    setLoading(true);
    try {
      const statusRes = await fetch("/api/trading/status");
      const statusData: TradingStatus = await statusRes.json();
      setStatus(statusData);

      if (statusData.configured && statusData.connected) {
        const toolsRes = await fetch("/api/trading/tools");
        const toolsData = await toolsRes.json();
        if (toolsRes.ok) setTools(toolsData.tools ?? []);
      } else {
        setTools([]);
      }
    } catch {
      setStatus({ configured: false, endpoint: "" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEverything();
  }, []);

  const fields = useMemo(() => getSchemaFields(selected), [selected]);

  function selectTool(tool: ToolWithFlag) {
    setSelected(tool);
    setResult(null);
    const initial: Record<string, string | boolean> = {};
    for (const field of getSchemaFields(tool)) {
      initial[field.name] = field.type === "boolean" ? false : "";
    }
    setValues(initial);
  }

  /** Coerce the raw form values into a typed arguments object. */
  function buildArguments(): Record<string, unknown> {
    const args: Record<string, unknown> = {};
    for (const field of fields) {
      const value = values[field.name];
      if (field.type === "boolean") {
        args[field.name] = Boolean(value);
        continue;
      }
      const str = String(value ?? "").trim();
      if (str === "") continue; // omit empty optionals
      if (field.type === "number" || field.type === "integer") {
        const num = Number(str);
        args[field.name] = Number.isNaN(num) ? str : num;
      } else {
        args[field.name] = str;
      }
    }
    return args;
  }

  async function runCall(confirm: boolean) {
    if (!selected) return;

    const missing = fields.filter(
      f =>
        f.required &&
        f.type !== "boolean" &&
        !String(values[f.name] ?? "").trim()
    );
    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.map(f => f.name).join(", ")}`);
      return;
    }

    setRunning(true);
    setResult(null);
    try {
      const res = await fetch("/api/trading/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selected.name,
          arguments: buildArguments(),
          confirm,
        }),
      });
      const data = await res.json();

      if (res.status === 428 && data.requiresConfirmation) {
        setPendingConfirm(true); // server asked us to confirm a mutating call
        return;
      }

      if (!res.ok) {
        toast.error(data.error || "The call failed.");
        setResult({
          ok: false,
          text: data.error || "The call failed.",
          raw: data,
        });
        return;
      }

      const isError = Boolean(data.isError);
      setResult({
        ok: !isError,
        text: data.text || JSON.stringify(data, null, 2),
        raw: data,
      });
      if (isError) toast.error("The tool reported an error.");
      else toast.success("Done.");
    } catch (err) {
      toast.error("Network error — please try again.");
      setResult({ ok: false, text: String(err), raw: null });
    } finally {
      setRunning(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selected && isMutatingTool(selected.name)) {
      setPendingConfirm(true);
      return;
    }
    runCall(false);
  }

  const configured = status?.configured;
  const connected = status?.connected;

  return (
    <Layout>
      <Seo path="/trading" />

      <section className="mx-auto max-w-5xl space-y-10 py-4 animate-fade-in">
        <header className="space-y-3 text-center">
          <p className="text-xs tracking-[0.24em] uppercase text-muted-foreground/65">
            Robinhood · MCP
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground">
            Trading Console
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground/80">
            A direct interface to the Robinhood trading agent. Read‑only lookups
            run immediately; anything that can move money asks you to confirm
            first.
          </p>
        </header>

        {/* Connection status */}
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-block h-2.5 w-2.5 rounded-full",
                  loading
                    ? "bg-muted-foreground/40"
                    : connected
                      ? "bg-emerald-500"
                      : configured
                        ? "bg-amber-500"
                        : "bg-muted-foreground/40"
                )}
              />
              <span className="text-sm font-medium text-foreground/90">
                {loading
                  ? "Checking connection…"
                  : connected
                    ? `Connected${status?.serverName ? ` · ${status.serverName}` : ""}`
                    : configured
                      ? "Configured, not connected"
                      : "Not configured"}
              </span>
              {connected && typeof status?.toolCount === "number" && (
                <Badge variant="secondary">{status.toolCount} tools</Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={loadEverything}
              disabled={loading}
              className="rounded-full"
            >
              Refresh
            </Button>
          </div>

          {status?.endpoint && (
            <p className="mt-3 break-all font-mono text-xs text-muted-foreground/60">
              {status.endpoint}
            </p>
          )}
          {!loading && configured && !connected && status?.error && (
            <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
              {status.error}
            </p>
          )}
        </div>

        {/* Setup instructions when unconfigured */}
        {!loading && !configured && (
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-6 text-sm leading-relaxed text-muted-foreground/85">
            <p className="mb-3 font-medium text-foreground/90">
              Connect your Robinhood account
            </p>
            <p className="mb-4">
              Set these environment variables on the server, then restart it and
              press <em>Refresh</em>:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-background/80 p-4 font-mono text-xs text-foreground/80">
              {`ROBINHOOD_MCP_TOKEN=your-robinhood-agent-token
# optional — defaults to the official endpoint
ROBINHOOD_MCP_URL=https://agent.robinhood.com/mcp/trading`}
            </pre>
            <p className="mt-4 text-xs text-muted-foreground/70">
              The token is read only on the server and is never sent to the
              browser.
            </p>
          </div>
        )}

        {/* Tools + runner */}
        {connected && (
          <div className="grid gap-6 md:grid-cols-[minmax(0,18rem)_1fr]">
            {/* Tool list */}
            <aside className="space-y-2">
              <p className="px-1 text-xs tracking-[0.18em] uppercase text-muted-foreground/60">
                Tools
              </p>
              {tools.length === 0 && (
                <p className="px-1 text-sm text-muted-foreground/70">
                  No tools available.
                </p>
              )}
              <ul className="space-y-1.5">
                {tools.map(tool => {
                  const active = selected?.name === tool.name;
                  return (
                    <li key={tool.name}>
                      <button
                        onClick={() => selectTool(tool)}
                        className={cn(
                          "w-full rounded-xl border px-3.5 py-2.5 text-left transition-colors",
                          active
                            ? "border-accent/60 bg-accent/10"
                            : "border-border/50 bg-background/40 hover:border-border hover:bg-background/70"
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[0.8rem] text-foreground/90">
                            {tool.title || tool.name}
                          </span>
                          {tool.mutating && (
                            <Badge
                              variant="destructive"
                              className="shrink-0 text-[0.6rem]"
                            >
                              order
                            </Badge>
                          )}
                        </div>
                        {tool.description && (
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground/70">
                            {tool.description}
                          </p>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Runner */}
            <div className="min-w-0">
              {!selected ? (
                <div className="flex h-full min-h-[16rem] items-center justify-center rounded-2xl border border-dashed border-border/60 text-sm text-muted-foreground/60">
                  Select a tool to begin.
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <h2 className="font-mono text-lg text-foreground">
                        {selected.name}
                      </h2>
                      {isMutatingTool(selected.name) && (
                        <Badge variant="destructive">changes account</Badge>
                      )}
                    </div>
                    {selected.description && (
                      <p className="text-sm leading-relaxed text-muted-foreground/80">
                        {selected.description}
                      </p>
                    )}
                  </div>

                  <form onSubmit={onSubmit} className="space-y-5">
                    {fields.length === 0 && (
                      <p className="text-sm text-muted-foreground/70">
                        This tool takes no parameters.
                      </p>
                    )}

                    {fields.map(field => (
                      <div key={field.name} className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground/85">
                          <span className="font-mono">{field.name}</span>
                          {field.required && (
                            <span className="text-destructive">*</span>
                          )}
                          <span className="text-xs font-normal text-muted-foreground/55">
                            {field.type}
                          </span>
                        </label>
                        {field.description && (
                          <p className="text-xs text-muted-foreground/65">
                            {field.description}
                          </p>
                        )}

                        {field.type === "boolean" ? (
                          <Switch
                            checked={Boolean(values[field.name])}
                            onCheckedChange={checked =>
                              setValues(prev => ({
                                ...prev,
                                [field.name]: checked,
                              }))
                            }
                          />
                        ) : field.enum ? (
                          <select
                            value={String(values[field.name] ?? "")}
                            onChange={e =>
                              setValues(prev => ({
                                ...prev,
                                [field.name]: e.target.value,
                              }))
                            }
                            className="h-11 w-full rounded-lg border border-border/70 bg-background/80 px-3 text-sm"
                          >
                            <option value="">— select —</option>
                            {field.enum.map(option => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : field.type === "object" ||
                          field.type === "array" ? (
                          <Textarea
                            value={String(values[field.name] ?? "")}
                            onChange={e =>
                              setValues(prev => ({
                                ...prev,
                                [field.name]: e.target.value,
                              }))
                            }
                            placeholder={
                              field.type === "array" ? "[ ... ]" : "{ ... }"
                            }
                            className="font-mono text-sm"
                            rows={3}
                          />
                        ) : (
                          <Input
                            type={
                              field.type === "number" ||
                              field.type === "integer"
                                ? "number"
                                : "text"
                            }
                            value={String(values[field.name] ?? "")}
                            onChange={e =>
                              setValues(prev => ({
                                ...prev,
                                [field.name]: e.target.value,
                              }))
                            }
                            className="h-11"
                          />
                        )}
                      </div>
                    ))}

                    <Button
                      type="submit"
                      disabled={running}
                      className={cn(
                        "rounded-full px-8",
                        isMutatingTool(selected.name) &&
                          "bg-destructive text-white hover:bg-destructive/90"
                      )}
                    >
                      {running
                        ? "Running…"
                        : isMutatingTool(selected.name)
                          ? "Review & confirm"
                          : "Run"}
                    </Button>
                  </form>

                  {result && (
                    <div
                      className={cn(
                        "rounded-2xl border p-4",
                        result.ok
                          ? "border-border/60 bg-background/60"
                          : "border-destructive/40 bg-destructive/5"
                      )}
                    >
                      <p className="mb-2 text-xs tracking-[0.18em] uppercase text-muted-foreground/60">
                        Result
                      </p>
                      <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-words font-mono text-xs text-foreground/85">
                        {result.text}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Confirmation gate for order-placing / money-moving tools */}
      <AlertDialog open={pendingConfirm} onOpenChange={setPendingConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm this action</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p>
                  <span className="font-mono text-foreground">
                    {selected?.name}
                  </span>{" "}
                  can change your Robinhood account. Review the details before
                  continuing.
                </p>
                <pre className="max-h-48 overflow-auto rounded-lg bg-muted/40 p-3 font-mono text-xs text-foreground/80">
                  {JSON.stringify(buildArguments(), null, 2)}
                </pre>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setPendingConfirm(false);
                runCall(true);
              }}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Confirm & submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
