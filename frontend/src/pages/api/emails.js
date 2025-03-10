import { fetchBackend } from '@/lib/fetchBackend';

export default async function handler(req, res) {
  const { method, query, body } = req;

  if (method === 'GET') {
    const searchParam = query.search ? `?search=${query.search}` : '';
    const { data, status } = await fetchBackend(`/emails${searchParam}`);
    res.status(status).json(data);
  } else if (method === 'POST') {
    const { data, status} = await fetchBackend(`/emails`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    res.status(status).json(data);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
