//#region endpoint/baseFetch.ts
/**
* HTTP client for 360backend (Nest). Set `VITE_API_BASE_URL` in `.env` (e.g. http://localhost:3000).
*/
var DEFAULT_BASE_URL = "http://localhost:3001";
/** localStorage keys — use these after login so refresh works */
var ACCESS_TOKEN_STORAGE_KEY = "access_token";
var REFRESH_TOKEN_STORAGE_KEY = "refresh_token";
var ACCOUNT_TYPE_STORAGE_KEY = "account_type";
function getApiBaseUrl() {
	return ((void 0)?.trim() || DEFAULT_BASE_URL).replace(/\/$/, "");
}
var requestInterceptors = [];
var responseInterceptors = [];
var responseErrorInterceptors = [];
var tokenGetter = () => {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
};
var refreshTokenGetter = () => {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
};
/** Called after refresh fails or tokens are cleared (e.g. redirect to sign-in). */
var onSessionExpired = null;
function saveAuthTokens(tokens) {
	if (typeof window === "undefined") return;
	localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, tokens.accessToken);
	localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, tokens.refreshToken);
}
function saveAccountType(accountType) {
	if (typeof window === "undefined") return;
	localStorage.setItem(ACCOUNT_TYPE_STORAGE_KEY, accountType);
}
function getAccountType() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(ACCOUNT_TYPE_STORAGE_KEY);
}
function clearAuthTokens() {
	if (typeof window === "undefined") return;
	localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
	localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
	localStorage.removeItem(ACCOUNT_TYPE_STORAGE_KEY);
}
function mergeHeaders(a, b) {
	const out = new Headers(a);
	if (b) new Headers(b).forEach((value, key) => {
		out.set(key, value);
	});
	return out;
}
function resolveUrl(path) {
	if (/^https?:\/\//i.test(path)) return path;
	return `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
function isAuthRefreshUrl(url) {
	try {
		return new URL(url).pathname.replace(/\/$/, "").endsWith("/auth/refresh");
	} catch {
		return /\/auth\/refresh(\?|$|#)/.test(url);
	}
}
/** Register request middleware (runs in order). Returns an unsubscribe function. */
function addRequestInterceptor(interceptor) {
	requestInterceptors.push(interceptor);
	return () => {
		const i = requestInterceptors.indexOf(interceptor);
		if (i !== -1) requestInterceptors.splice(i, 1);
	};
}
async function runRequestInterceptors(ctx) {
	let next = ctx;
	for (const ic of requestInterceptors) next = await ic(next);
	return next;
}
async function runResponseInterceptors(response, ctx) {
	let next = response;
	for (const ic of responseInterceptors) next = await ic(next, ctx);
	return next;
}
async function runResponseErrorInterceptors(error, ctx) {
	let e = error;
	for (const ic of responseErrorInterceptors) e = await ic(e, ctx);
	throw e;
}
var refreshInFlight = null;
/**
* POST /auth/refresh with refresh token as Bearer. Updates storage on success.
* Concurrent callers share one in-flight refresh.
*/
async function refreshSessionTokens() {
	if (refreshInFlight) return refreshInFlight;
	refreshInFlight = (async () => {
		try {
			const refresh = refreshTokenGetter();
			if (!refresh) return false;
			const res = await fetch(resolveUrl("/auth/refresh"), {
				method: "POST",
				headers: {
					Authorization: `Bearer ${refresh}`,
					Accept: "application/json"
				}
			});
			if (!res.ok) {
				clearAuthTokens();
				onSessionExpired?.();
				return false;
			}
			const data = await res.json();
			if (data.accessToken && data.refreshToken) {
				saveAuthTokens({
					accessToken: data.accessToken,
					refreshToken: data.refreshToken
				});
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
var ApiError = class extends Error {
	status;
	body;
	constructor(message, status, body) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.body = body;
	}
};
async function parseErrorBody(response) {
	if ((response.headers.get("content-type") ?? "").includes("application/json")) try {
		return await response.json();
	} catch {
		return null;
	}
	try {
		const text = await response.text();
		return text ? { message: text } : null;
	} catch {
		return null;
	}
}
async function executeFetch(path, init, options) {
	const ctx = {
		url: resolveUrl(path),
		init: {
			...init,
			headers: mergeHeaders(init.headers)
		},
		skipAuthRefresh: options.skipAuthRefresh === true
	};
	const run = async (c) => {
		const withInterceptors = await runRequestInterceptors(c);
		let res = await fetch(withInterceptors.url, withInterceptors.init);
		res = await runResponseInterceptors(res, withInterceptors);
		return {
			response: res,
			ctx: withInterceptors
		};
	};
	let first = await run(ctx);
	let response = first.response;
	let activeCtx = first.ctx;
	if (!activeCtx.skipAuthRefresh && response.status === 401 && !isAuthRefreshUrl(activeCtx.url)) {
		if (await refreshSessionTokens()) {
			const second = await run({
				url: activeCtx.url,
				init: {
					...activeCtx.init,
					headers: mergeHeaders(activeCtx.init.headers)
				},
				skipAuthRefresh: true
			});
			response = second.response;
			activeCtx = second.ctx;
		}
	}
	return {
		response,
		ctx: activeCtx
	};
}
/**
* Low-level fetch: resolves path against `VITE_API_BASE_URL`, runs interceptors, returns `Response`.
* Response bodies are not consumed; if an interceptor reads the body, clone the response first.
*/
async function baseFetch(path, init = {}, options = {}) {
	const { throwOnError = true } = options;
	let ctx = {
		url: resolveUrl(path),
		init: {
			...init,
			headers: mergeHeaders(init.headers)
		},
		skipAuthRefresh: options.skipAuthRefresh === true
	};
	try {
		const { response, ctx: finalCtx } = await executeFetch(path, init, options);
		ctx = finalCtx;
		if (throwOnError && !response.ok) {
			const body = await parseErrorBody(response.clone());
			throw new ApiError((Array.isArray(body?.message) ? body.message.join(", ") : body?.message) || response.statusText || `HTTP ${response.status}`, response.status, body);
		}
		return response;
	} catch (err) {
		return runResponseErrorInterceptors(err, ctx);
	}
}
/** JSON helper: sets Accept; stringifies plain object bodies and sets Content-Type. */
async function baseFetchJson(path, init = {}, options) {
	const headers = mergeHeaders(init.headers, { Accept: "application/json" });
	let body = init.body;
	if (body !== void 0 && body !== null && typeof body === "object" && !(body instanceof FormData) && !(body instanceof Blob) && !(body instanceof ArrayBuffer) && !(typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams)) {
		body = JSON.stringify(body);
		if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
	}
	const res = await baseFetch(path, {
		...init,
		headers,
		body
	}, options);
	if (res.status === 204 || res.headers.get("content-length") === "0") return;
	return res.json();
}
addRequestInterceptor((ctx) => {
	const headers = mergeHeaders(ctx.init.headers);
	const token = tokenGetter();
	if (token && !headers.has("Authorization")) headers.set("Authorization", `Bearer ${token}`);
	return {
		...ctx,
		init: {
			...ctx.init,
			headers
		}
	};
});
//#endregion
//#region lib/countries.ts
/**
* Seed list (add more later).
* Keep `iso2` uppercase to match libphonenumber-js country codes.
*/
var COUNTRIES = [
	{
		iso2: "NG",
		flag: "🇳🇬",
		name: "Nigeria",
		callingCode: "234"
	},
	{
		iso2: "GH",
		flag: "🇬🇭",
		name: "Ghana",
		callingCode: "233"
	},
	{
		iso2: "US",
		flag: "🇺🇸",
		name: "United States",
		callingCode: "1"
	},
	{
		iso2: "GB",
		flag: "🇬🇧",
		name: "United Kingdom",
		callingCode: "44"
	}
];
//#endregion
export { clearAuthTokens as a, saveAuthTokens as c, baseFetchJson as i, ACCESS_TOKEN_STORAGE_KEY as n, getAccountType as o, ApiError as r, saveAccountType as s, COUNTRIES as t };
