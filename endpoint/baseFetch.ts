/**
 * 
 * HTTP client for 360backend (Nest). Set `VITE_API_BASE_URL` in `.env` (e.g. http://localhost:3000).
 */

const DEFAULT_BASE_URL = "https://backend-934c.onrender.com";

/** localStorage keys — use these after login so refresh works */
export const ACCESS_TOKEN_STORAGE_KEY = "access_token";
export const REFRESH_TOKEN_STORAGE_KEY = "refresh_token";
export const ACCOUNT_TYPE_STORAGE_KEY = "account_type";

export function hasAccessToken(): boolean {
  if (typeof window === "undefined") return false;
  const t = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  return typeof t === "string" && t.trim().length > 0;
}

export type AuthTokensPayload = {
  accessToken: string;
  refreshToken: string;
};

export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL as string | undefined;
  const base = (raw?.trim() || DEFAULT_BASE_URL).replace(/\/$/, "");
  return base;
}

export type FetchContext = {
  url: string;
  init: RequestInit;
  /** When true, 401 will not trigger refresh+retry */
  skipAuthRefresh?: boolean;
};

export type RequestInterceptor = (
  ctx: FetchContext,
) => FetchContext | Promise<FetchContext>;

export type ResponseInterceptor = (
  response: Response,
  ctx: FetchContext,
) => Response | Promise<Response>;

export type ResponseErrorInterceptor = (
  error: unknown,
  ctx: FetchContext,
) => unknown;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];
const responseErrorInterceptors: ResponseErrorInterceptor[] = [];

let tokenGetter: () => string | null | undefined = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
};

let refreshTokenGetter: () => string | null | undefined = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
};

/** Called after refresh fails or tokens are cleared (e.g. redirect to sign-in). */
let onSessionExpired: (() => void) | null = null;

export function setOnSessionExpired(handler: (() => void) | null): void {
  onSessionExpired = handler;
}

/** Override where the access token is read from */
export function setAccessTokenGetter(
  getter: () => string | null | undefined,
): void {
  tokenGetter = getter;
}

/** Override where the refresh token is read from */
export function setRefreshTokenGetter(
  getter: () => string | null | undefined,
): void {
  refreshTokenGetter = getter;
}

export function saveAuthTokens(tokens: AuthTokensPayload): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, tokens.refreshToken);
}

export function saveAccountType(accountType: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCOUNT_TYPE_STORAGE_KEY, accountType);
}

export function getAccountType(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCOUNT_TYPE_STORAGE_KEY);
}

export function clearAuthTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(ACCOUNT_TYPE_STORAGE_KEY);
}

function mergeHeaders(a?: HeadersInit, b?: HeadersInit): Headers {
  const out = new Headers(a);
  if (b) {
    new Headers(b).forEach((value, key) => {
      out.set(key, value);
    });
  }
  return out;
}

function resolveUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = getApiBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function isAuthRefreshUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/\/$/, "");
    return path.endsWith("/auth/refresh");
  } catch {
    return /\/auth\/refresh(\?|$|#)/.test(url);
  }
}

/** Register request middleware (runs in order). Returns an unsubscribe function. */
export function addRequestInterceptor(
  interceptor: RequestInterceptor,
): () => void {
  requestInterceptors.push(interceptor);
  return () => {
    const i = requestInterceptors.indexOf(interceptor);
    if (i !== -1) requestInterceptors.splice(i, 1);
  };
}

/** Register response middleware (runs in order on the Response object). */
export function addResponseInterceptor(
  interceptor: ResponseInterceptor,
): () => void {
  responseInterceptors.push(interceptor);
  return () => {
    const i = responseInterceptors.indexOf(interceptor);
    if (i !== -1) responseInterceptors.splice(i, 1);
  };
}

/** Register handlers for failures (network errors or errors you rethrow from response interceptors). */
export function addResponseErrorInterceptor(
  interceptor: ResponseErrorInterceptor,
): () => void {
  responseErrorInterceptors.push(interceptor);
  return () => {
    const i = responseErrorInterceptors.indexOf(interceptor);
    if (i !== -1) responseErrorInterceptors.splice(i, 1);
  };
}

async function runRequestInterceptors(
  ctx: FetchContext,
): Promise<FetchContext> {
  let next = ctx;
  for (const ic of requestInterceptors) {
    next = await ic(next);
  }
  return next;
}

async function runResponseInterceptors(
  response: Response,
  ctx: FetchContext,
): Promise<Response> {
  let next = response;
  for (const ic of responseInterceptors) {
    next = await ic(next, ctx);
  }
  return next;
}

async function runResponseErrorInterceptors(
  error: unknown,
  ctx: FetchContext,
): Promise<never> {
  let e = error;
  for (const ic of responseErrorInterceptors) {
    e = await ic(e, ctx);
  }
  throw e;
}

let refreshInFlight: Promise<boolean> | null = null;

/**
 * POST /auth/refresh with refresh token as Bearer. Updates storage on success.
 * Concurrent callers share one in-flight refresh.
 */
async function refreshSessionTokens(): Promise<boolean> {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    try {
      const refresh = refreshTokenGetter();
      if (!refresh) return false;

      const res = await fetch(resolveUrl("/auth/refresh"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refresh}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        clearAuthTokens();
        onSessionExpired?.();
        return false;
      }

      const data = (await res.json()) as Partial<AuthTokensPayload> & {
        accountType?: string;
      };
      if (data.accessToken && data.refreshToken) {
        saveAuthTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
        if (typeof data.accountType === "string" && data.accountType.length > 0) {
          saveAccountType(data.accountType);
        }
        return true;
      }

      clearAuthTokens();
      onSessionExpired?.();
      return false;
    } catch {
      clearAuthTokens();
      onSessionExpired?.();
      return false;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

export type ApiErrorBody = {
  message?: string | string[];
  statusCode?: number;
  error?: string;
  [key: string]: unknown;
};

export class ApiError extends Error {
  readonly status: number;
  readonly body: ApiErrorBody | null;

  constructor(message: string, status: number, body: ApiErrorBody | null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

async function parseErrorBody(
  response: Response,
): Promise<ApiErrorBody | null> {
  const ct = response.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    try {
      return (await response.json()) as ApiErrorBody;
    } catch {
      return null;
    }
  }
  try {
    const text = await response.text();
    return text ? { message: text } : null;
  } catch {
    return null;
  }
}

export type BaseFetchOptions = {
  /** When true (default), non-OK responses throw ApiError after response interceptors run. */
  throwOnError?: boolean;
  /** When true, 401 does not trigger refresh + retry (use for public routes). */
  skipAuthRefresh?: boolean;
};

async function executeFetch(
  path: string,
  init: RequestInit,
  options: BaseFetchOptions,
): Promise<{ response: Response; ctx: FetchContext }> {
  const ctx: FetchContext = {
    url: resolveUrl(path),
    init: { ...init, headers: mergeHeaders(init.headers) },
    skipAuthRefresh: options.skipAuthRefresh === true,
  };

  const run = async (c: FetchContext) => {
    const withInterceptors = await runRequestInterceptors(c);
    let res = await fetch(withInterceptors.url, withInterceptors.init);
    res = await runResponseInterceptors(res, withInterceptors);
    return { response: res, ctx: withInterceptors };
  };

  let first = await run(ctx);
  let response = first.response;
  let activeCtx = first.ctx;

  const mayRefresh =
    !activeCtx.skipAuthRefresh &&
    response.status === 401 &&
    !isAuthRefreshUrl(activeCtx.url);

  if (mayRefresh) {
    const ok = await refreshSessionTokens();
    if (ok) {
      const retryCtx: FetchContext = {
        url: activeCtx.url,
        init: {
          ...activeCtx.init,
          headers: mergeHeaders(activeCtx.init.headers),
        },
        skipAuthRefresh: true,
      };
      const second = await run(retryCtx);
      response = second.response;
      activeCtx = second.ctx;
    }
  }

  return { response, ctx: activeCtx };
}

/**
 * Low-level fetch: resolves path against `VITE_API_BASE_URL`, runs interceptors, returns `Response`.
 * Response bodies are not consumed; if an interceptor reads the body, clone the response first.
 */
export async function baseFetch(
  path: string,
  init: RequestInit = {},
  options: BaseFetchOptions = {},
): Promise<Response> {
  const { throwOnError = true } = options;
  let ctx: FetchContext = {
    url: resolveUrl(path),
    init: { ...init, headers: mergeHeaders(init.headers) },
    skipAuthRefresh: options.skipAuthRefresh === true,
  };

  try {
    const { response, ctx: finalCtx } = await executeFetch(path, init, options);
    ctx = finalCtx;

    if (throwOnError && !response.ok) {
      const body = await parseErrorBody(response.clone());
      const message =
        (Array.isArray(body?.message)
          ? body.message.join(", ")
          : body?.message) ||
        response.statusText ||
        `HTTP ${response.status}`;
      throw new ApiError(message, response.status, body);
    }

    return response;
  } catch (err) {
    return runResponseErrorInterceptors(err, ctx);
  }
}

/** JSON helper: sets Accept; stringifies plain object bodies and sets Content-Type. */
export async function baseFetchJson<T>(
  path: string,
  init: RequestInit = {},
  options?: BaseFetchOptions,
): Promise<T> {
  const headers = mergeHeaders(init.headers, { Accept: "application/json" });
  let body: BodyInit | null | undefined = init.body;

  const isPlainObject =
    body !== undefined &&
    body !== null &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer) &&
    !(
      typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams
    );

  if (isPlainObject) {
    body = JSON.stringify(body);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  const res = await baseFetch(path, { ...init, headers, body }, options);
  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return undefined as T;
  }
  return res.json() as Promise<T>;
}

/* --- Default interceptors: attach access token; optional dev logging --- */

addRequestInterceptor((ctx) => {
  const headers = mergeHeaders(ctx.init.headers);
  const token = tokenGetter();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return { ...ctx, init: { ...ctx.init, headers } };
});

if (import.meta.env.DEV) {
  addRequestInterceptor((ctx) => {
    console.debug("[api]", ctx.init.method ?? "GET", ctx.url);
    return ctx;
  });
}
