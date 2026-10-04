import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import path from 'path';
import fs from 'fs';

const videos = ['video1.mp4', 'video2.mp4', 'video3.mp4'];

async function processVideo(filename) {
  const rootSrc = path.resolve(process.cwd(), filename);
  const outPublicVideos = path.resolve(process.cwd(), 'public', 'videos', filename);
  const outPublicRoot = path.resolve(process.cwd(), 'public', filename);

  if (!fs.existsSync(rootSrc)) {
    console.warn(`Source video not found: ${rootSrc}`);
    return;
  }

  const stat = fs.statSync(rootSrc);
  console.log(`Starting compression for ${filename} (source: ${(stat.size / 1024 / 1024).toFixed(1)} MB)...`);

  const tmpOut = path.resolve(process.cwd(), `tmp_${filename}`);

  await new Promise((resolve, reject) => {
    // -an strips audio completely (100% silent)
    // -movflags +faststart moves moov atom to start for instant streaming
    // -vf scale ensures 1080p web-ready resolution for crisp display without lag
    const args = [
      '-y',
      '-i', rootSrc,
      '-c:v', 'libx264',
      '-vf', "scale='min(1080,iw)':-2",
      '-r', '30',
      '-crf', '25',
      '-preset', 'veryfast',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      '-an',
      tmpOut
    ];

    const proc = spawn(ffmpegPath, args, { stdio: 'inherit' });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
    proc.on('error', reject);
  });

  const outStat = fs.statSync(tmpOut);
  console.log(`Finished ${filename}: ${(outStat.size / 1024 / 1024).toFixed(2)} MB`);

  fs.copyFileSync(tmpOut, outPublicVideos);
  fs.copyFileSync(tmpOut, outPublicRoot);
  fs.unlinkSync(tmpOut);
  console.log(`Updated public/videos/${filename} and public/${filename}`);
}

async function run() {
  for (const v of videos) {
    await processVideo(v);
  }
  console.log('All 3 videos processed and synchronized successfully!');
}

run().catch(console.error);
