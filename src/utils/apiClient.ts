export class ApiError extends Error {
  status: number;
  payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

type ApiClientOptions = RequestInit & {
  query?: Record<string, string | number | boolean | undefined>;
};

function buildUrl(input: string, query?: ApiClientOptions["query"]): string {
  if (!query) return input;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) params.append(key, String(value));
  }
  const suffix = params.toString();
  return suffix ? `${input}?${suffix}` : input;
}

export async function apiClient<T>(
  input: string,
  { query, headers, ...init }: ApiClientOptions = {}
): Promise<T> {
  const res = await fetch(buildUrl(input, query), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!res.ok) {
    let payload: unknown = undefined;
    try {
      payload = await res.json();
    } catch {
      // non-JSON error body — ignore
    }
    throw new ApiError(
      `Request failed with status ${res.status}`,
      res.status,
      payload
    );
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
