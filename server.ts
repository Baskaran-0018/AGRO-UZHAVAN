import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { handleApiRequest } from './src/server/apiRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// API handler
app.all('/api/*', async (req, res) => {
  const queryObj = Object.fromEntries(
    Object.entries(req.query).map(([k, v]) => [k, String(v)])
  );
  const result = await handleApiRequest(req.path, req.body, queryObj);
  res.status(result.status).json(result.data);
});

// Serve static files in production
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[AGRO AI Server] listening on port ${PORT}`);
});
