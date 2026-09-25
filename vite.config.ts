import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// Plugin to prevent Vite 6 client WebSocket send crash and uncaught connection rejection when HMR is disabled
function fixViteClientPlugin() {
  return {
    name: 'fix-vite-client-send',
    transform(code: string, id: string) {
      if (id.includes('vite/dist/client/client.mjs') || id.includes('@vite/client')) {
        return code
          .replace(
            'ws.send(JSON.stringify(data));',
            'if (typeof ws !== "undefined" && ws && ws.readyState === 1) { ws.send(JSON.stringify(data)); }'
          )
          .replace(
            'wsTransport.send(data);',
            'try { wsTransport?.send?.(data); } catch (_) {}'
          )
          .replace(
            'transport.connect(createHMRHandler(handleMessage));',
            'try { transport.connect(createHMRHandler(handleMessage)).catch(() => {}); } catch (_) {}'
          )
          .replace(
            'throw e;',
            'return;'
          )
          .replace(
            'throw new Error("send was called before connect");',
            'return;'
          )
          .replace(
            'throw new Error("invoke was called before connect");',
            'return;'
          );
      }
      return null;
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      fixViteClientPlugin(),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      proxy: {
        '/api/shopbase': {
          target: 'https://shopbasebd.com',
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api\/shopbase/, ''),
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://shopbasebd.com/',
          },
        },
      },
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
