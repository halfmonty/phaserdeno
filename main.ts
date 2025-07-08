import { Hono } from 'hono';
import { serveStatic } from 'hono/deno';
import { reloadApi, reloadWS } from './reload.ts';
import { blastemupWS } from './blastemup.server.ts';

const isDenoDeploy = Deno.env.get('DENO_DEPLOYMENT_ID') !== undefined;

const app = new Hono()
const port = 3000;
console.log(`🚀 Server starting on http://localhost:${port}`);

if (!isDenoDeploy) {
  console.log(`⚡ Live reload enabled`);
  // WebSocket endpoint for live reload
  app.route('/ws/reload', reloadWS);
  // API endpoint to trigger reload (called by build script)
  app.route('/api/reload', reloadApi);
}

app.route('/ws/blastemup/', blastemupWS);

app.use('/*', serveStatic({ root: './static/' }));
app.get('/', serveStatic({ path: './static/index.html' }));
app.get('*', serveStatic({ path: './static/404.html' }));

Deno.serve({ port }, app.fetch);
console.log(`🎮 Game available at http://localhost:${port}`);