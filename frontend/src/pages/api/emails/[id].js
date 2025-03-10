import { fetchBackend } from '@/lib/fetchBackend';

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  if (method === 'GET') {
    const { data, status } = await fetchBackend(`/emails/${id}`);
    res.status(status).json(data);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
