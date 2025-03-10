import { BACKEND_URL } from '@/config';

export async function fetchBackend(path, options = {}) {
  try {
    const response = await fetch(`${BACKEND_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });

    const data = await response.json().catch(() => null);

    return { data, status: response.status };
  } catch (error) {
    console.error('Proxy error:', error);
    return { data: { error: 'Failed to reach the server'}, status: 502};
  }
}
