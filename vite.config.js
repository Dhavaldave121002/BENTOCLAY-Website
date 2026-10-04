import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Plugin to directly serve editable root video files (video1.mp4, video2.mp4, video3.mp4)
function serveRootVideosPlugin() {
  return {
    name: 'serve-root-videos',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url.match(/^\/(?:videos\/)?(video[123]\.mp4)(?:\?.*)?$/);
        if (match) {
          const fileName = match[1];
          const rootVideoPath = path.resolve(process.cwd(), fileName);
          if (fs.existsSync(rootVideoPath)) {
            const stat = fs.statSync(rootVideoPath);
            const range = req.headers.range;
            res.setHeader('Content-Type', 'video/mp4');
            res.setHeader('Accept-Ranges', 'bytes');
            
            if (range) {
              const parts = range.replace(/bytes=/, '').split('-');
              const start = parseInt(parts[0], 10);
              const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
              const chunksize = end - start + 1;
              const fileStream = fs.createReadStream(rootVideoPath, { start, end });
              res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${stat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4'
              });
              return fileStream.pipe(res);
            } else {
              res.writeHead(200, {
                'Content-Length': stat.size,
                'Content-Type': 'video/mp4'
              });
              return fs.createReadStream(rootVideoPath).pipe(res);
            }
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), serveRootVideosPlugin()],
  server: {
    port: 3000,
    open: false
  }
});

