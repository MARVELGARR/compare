// apiClient.ts

export type ApiClientArgs<TBody = unknown> = {
  url: string;
  params?: Record<string, string | number>;
  query?: Record<string, unknown>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: TBody;
  headers?: Record<string, string>;
  token?: string; // for bearer auth
};

export async function apiClient<TResponse, TBody = unknown>(
  args: ApiClientArgs<TBody>
): Promise<TResponse> {
  const {
    url,
    params,
    query,
    method = "GET",
    body,
    headers = {},
    token,
  } = args;

  // 1. Build URL
  let fullUrl = url;

  // Path params replacement e.g. /users/:id → /users/10
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      fullUrl = fullUrl.replace(`:${key}`, String(value));
    });
  }

  // Query params
  if (query) {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        search.append(key, String(value));
      }
    }
    fullUrl += `?${search.toString()}`;
  }

  // 2. Auto headers
  const finalHeaders: Record<string, string> = {
    ...headers,
  };

  if (token) {
    finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  // 3. Body handling
  let fetchBody: BodyInit | undefined;

  if (method !== "GET" && body) {
    // If the body is FormData → send as-is
    if (body instanceof FormData) {
      fetchBody = body;
    } else {
      finalHeaders["Content-Type"] = "application/json";
      fetchBody = JSON.stringify(body);
    }
  }

  // 4. Final fetch
  const res = await fetch(fullUrl, {
    method,
    headers: finalHeaders,
    body: fetchBody,
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} - ${await res.text()}`);
  }

  return res.json() as Promise<TResponse>;
}
