import { handleApiRequest } from '../src/server/apiRouter';

export default async function handler(req: any, res: any) {
  try {
    const url = req.url || '';
    const pathname = url.split('?')[0];
    const queryObj = Object.fromEntries(
      Object.entries(req.query || {}).map(([k, v]) => [k, String(v)])
    );

    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {}
    }

    const result = await handleApiRequest(pathname, body || {}, queryObj);
    res.status(result.status).json(result.data);
  } catch (err: any) {
    console.error('[Vercel API Handler Error]:', err);
    res.status(500).json({ error: err?.message || 'Internal Server Error' });
  }
}
