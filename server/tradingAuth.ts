/**
 * Shared-passphrase gate for the trading console.
 *
 * When `TRADING_PASSCODE` is set, every `/api/trading/*` action requires the
 * caller to have unlocked with that passphrase. Unlocking sets a signed,
 * HttpOnly cookie (HMAC'd with the passphrase itself, so no separate secret is
 * needed) that authorizes subsequent requests until it expires.
 *
 * When `TRADING_PASSCODE` is unset, the gate is disabled and the console is
 * reachable by anyone with the URL — the UI surfaces a warning in that case.
 */

import crypto from "node:crypto";
import type express from "express";

const COOKIE = "rh_trading_gate";
const TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function passcode(): string {
  return process.env.TRADING_PASSCODE || "";
}

export function isGateEnabled(): boolean {
  return Boolean(passcode());
}

function safeEqualHex(a: string, b: string): boolean {
  const ab = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Constant-time comparison of the submitted passphrase against the configured one. */
export function verifyPasscode(input: unknown): boolean {
  const expected = passcode();
  if (!expected || typeof input !== "string" || input.length === 0)
    return false;
  // Hash both sides so timingSafeEqual always sees equal-length buffers.
  const inputHash = crypto.createHash("sha256").update(input).digest("hex");
  const expectedHash = crypto
    .createHash("sha256")
    .update(expected)
    .digest("hex");
  return safeEqualHex(inputHash, expectedHash);
}

function sign(exp: number): string {
  return crypto
    .createHmac("sha256", passcode())
    .update(String(exp))
    .digest("hex");
}

function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(value);
  }
  return out;
}

/** True when the request is authorized — either the gate is off, or a valid cookie is present. */
export function isUnlocked(req: express.Request): boolean {
  if (!isGateEnabled()) return true;

  const raw = parseCookies(req.headers.cookie)[COOKIE];
  if (!raw) return false;

  const dot = raw.lastIndexOf(".");
  if (dot === -1) return false;

  const exp = Number(raw.slice(0, dot));
  const sig = raw.slice(dot + 1);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;

  return safeEqualHex(sig, sign(exp));
}

function cookieAttributes(): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `Path=/; HttpOnly; SameSite=Strict${secure}`;
}

export function issueCookie(res: express.Response): void {
  const exp = Date.now() + TTL_MS;
  const value = `${exp}.${sign(exp)}`;
  res.setHeader(
    "Set-Cookie",
    `${COOKIE}=${encodeURIComponent(value)}; Max-Age=${Math.floor(TTL_MS / 1000)}; ${cookieAttributes()}`
  );
}

export function clearCookie(res: express.Response): void {
  res.setHeader("Set-Cookie", `${COOKIE}=; Max-Age=0; ${cookieAttributes()}`);
}

/** Express middleware: block `/api/trading/*` actions unless unlocked. */
export function requireUnlocked(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  if (isUnlocked(req)) {
    next();
    return;
  }
  res
    .status(401)
    .json({
      error: "This console is locked. Enter the passphrase to continue.",
      locked: true,
    });
}
