import { handleApiRequest } from '../src/server/apiRouter';

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

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
