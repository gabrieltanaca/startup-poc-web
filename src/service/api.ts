type RequestInitCustom = Omit<RequestInit, 'method' | 'body'>;

const RETRY_STATUS_LIST = [
  500, // internal server error
  504, // gateway timeout
  408, // request timeout
];
const MAX_RETRY = 3;

export type FetchCustomResponse<T> =
  | {
      ok: true;
      data: T | null;
    }
  | {
      ok: false;
      data: ApiCustomErrorMessage | null;
    };

function makeUrl(path = '') {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  if (!apiURL) {
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL is not defined. Please set NEXT_PUBLIC_API_BASE_URL in your .env.local (or environment) and restart the dev server.',
    );
  }

  return [apiURL, ...path.trim().split('/').filter(Boolean)].join('/');
}

async function makeInit(options: RequestInit): Promise<RequestInit> {
  /* const session = await auth(); */
  const token = /* session?.user.token */ '';

  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return {
    cache: 'no-store',
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  };
}

async function customFetch<T>(
  path: string,
  init: RequestInit,
  tries = 1,
): Promise<FetchCustomResponse<T>> {
  try {
    // faz requisição baseado no path e init
    const request = await fetch(path, init);

    // faz tentativas na request caso o retorna erro o timeout
    if (RETRY_STATUS_LIST.includes(request.status) && tries < MAX_RETRY) {
      return customFetch(path, init, tries + 1);
    }

    // verifica se tem corpo
    /*  if (!Number(request.headers.get('Content-Length'))) {
      return {
        ok: !!request.ok,
        data: null,
      };
    } */

    const response = await request.json();
    if (request.ok) {
      return {
        ok: true,
        data: response as T,
      };
    }

    throw new ApiCustomError(response);
  } catch (error) {
    return {
      ok: false,
      data: (error instanceof ApiCustomError ? error : new ApiCustomError()).getMessage(),
    };
  }
}

const api = {
  get: async <T = any>(path: string, init?: RequestInitCustom) =>
    customFetch<T>(
      makeUrl(path),
      await makeInit({
        ...init,
        method: 'GET',
      }),
    ),
  post: async <T = any>(path: string, body: object | FormData, init?: RequestInitCustom) =>
    customFetch<T>(
      makeUrl(path),
      await makeInit({
        ...init,
        method: 'POST',
        body: typeof body === 'object' && !(body instanceof FormData) ? JSON.stringify(body) : body,
      }),
    ),
  put: async <T = any>(path: string, body: object | FormData, init?: RequestInitCustom) =>
    customFetch<T>(
      makeUrl(path),
      await makeInit({
        ...init,
        method: 'PUT',
        body: typeof body === 'object' && !(body instanceof FormData) ? JSON.stringify(body) : body,
      }),
    ),
  patch: async <T = any>(path: string, body: object | FormData, init?: RequestInitCustom) =>
    customFetch<T>(
      makeUrl(path),
      await makeInit({
        ...init,
        method: 'PATCH',
        body: typeof body === 'object' && !(body instanceof FormData) ? JSON.stringify(body) : body,
      }),
    ),
  delete: async <T = any>(path: string, init?: RequestInitCustom) =>
    customFetch<T>(
      makeUrl(path),
      await makeInit({
        ...init,
        method: 'DELETE',
      }),
    ),
};

export default api;

export type ApiCustomErrorOptions = {
  statusCode: number;
  message: string[] | string;
  errors: any[];
};

export type ApiCustomErrorMessage = {
  statusCode: number;
  message: string;
  errors: string[];
};

export class ApiCustomError extends Error {
  statusCode: number;
  message: string;
  errors: string[];

  constructor(options?: ApiCustomErrorOptions) {
    super();
    this.statusCode = options?.statusCode || 500;
    this.errors = options?.errors || ['Internal server error'];
    this.message = 'Erro ao realizar a requisição. Tente novamente!';
    if (options?.message) {
      if (Array.isArray(options?.message) && options?.message?.[0]) {
        this.message = options.message[0];
      }
      if (typeof options?.message === 'string' && options?.message) {
        this.message = options.message;
      }
    }
    if (options?.errors) {
      if (Array.isArray(options?.errors) && options?.errors?.[0]) {
        if (typeof options?.errors?.[0] === 'object') {
          const error = options.errors[0];
          this.message = error.message;
        } else if (typeof options?.errors?.[0] === 'string') {
          this.message = options.errors[0];
        }
      }
      if (typeof options?.errors === 'string' && options?.errors) {
        this.message = options.errors[0];
      }
    }
  }

  getMessage(): ApiCustomErrorMessage {
    return {
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
    };
  }
}
