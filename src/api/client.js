import { HealthResponseSchema, SearchResponseSchema } from "./schemas";

const ENV_BASE_URL = import.meta.env.BACKEND_BASE_URL;
export const BASE_URL_KEY = "backendBaseUrl";

export function getBaseUrl() {
  const override = localStorage.getItem(BASE_URL_KEY)?.trim();
  return override ? override.replace(/\/+$/, "") : ENV_BASE_URL;
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function errorMessage(response) {
  try {
    const body = await response.json();
    if (Array.isArray(body.detail)) {
      return body.detail.map((d) => d.msg).join("; ");
    }
    if (body.detail) {
      return String(body.detail);
    }
  } catch {
    // ignore, fall back to a generic message
  }
  return `Request failed with status ${response.status}`;
}

async function request(path, options = {}) {
  const BASE_URL = getBaseUrl();
  if (!BASE_URL) {
    throw new ApiError(
      "Backend is not configured (BACKEND_BASE_URL is not set)",
      0,
    );
  }

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, options);
  } catch {
    throw new ApiError("Could not reach the backend server", 0);
  }

  if (!response.ok) {
    throw new ApiError(await errorMessage(response), response.status);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

export async function getHealth() {
  const data = await request("/health", {
    signal: AbortSignal.timeout(5000),
  });
  return HealthResponseSchema.parse(data);
}

export async function searchResearch(text) {
  const data = await request("/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return SearchResponseSchema.parse(data);
}

export async function sendFeedback({ traceId, useful }) {
  await request("/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trace_id: traceId, useful }),
  });
}
