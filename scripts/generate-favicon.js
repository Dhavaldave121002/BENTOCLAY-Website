import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateFavicons() {
  const sourceLogo = path.resolve('public/assets/bentoclay-logo.png');
  const publicDir = path.resolve('public');

  // 1. Trim the logo to remove empty transparent space around edges
  const trimmedBuffer = await sharp(sourceLogo)
    .trim()
    .toBuffer();

  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log('Trimmed dimensions:', trimmedMeta.width, 'x', trimmedMeta.height);

  // Helper to generate a square icon with solid white background and padding
  async function createWhiteBgIcon(size, paddingRatio = 0.12) {
    const innerSize = Math.round(size * (1 - paddingRatio * 2));
    
    // Resize trimmed logo to fit inside inner box
    const resizedLogo = await sharp(trimmedBuffer)
      .resize(innerSize, innerSize, {
        fit: 'inside',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toBuffer();

    const logoMeta = await sharp(resizedLogo).metadata();
    const left = Math.round((size - logoMeta.width) / 2);
    const top = Math.round((size - logoMeta.height) / 2);

    // Create solid white background square
    const finalIcon = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([
      {
        input: resizedLogo,
        top: top,
        left: left
      }
    ])
    .png()
    .toBuffer();

    return finalIcon;
  }

  // Generate 512x512
  const icon512 = await createWhiteBgIcon(512, 0.10);
  fs.writeFileSync(path.join(publicDir, 'favicon-512x512.png'), icon512);
  fs.writeFileSync(path.join(publicDir, 'assets/bentoclay-favicon.png'), icon512);

  // Generate 192x192
  const icon192 = await createWhiteBgIcon(192, 0.10);
  fs.writeFileSync(path.join(publicDir, 'favicon-192x192.png'), icon192);

  // Generate Apple Touch Icon 180x180
  const icon180 = await createWhiteBgIcon(180, 0.10);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), icon180);

  // Generate 64x64
  const icon64 = await createWhiteBgIcon(64, 0.08);
  fs.writeFileSync(path.join(publicDir, 'favicon-64x64.png'), icon64);

  // Generate 32x32
  const icon32 = await createWhiteBgIcon(32, 0.06);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), icon32);
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), icon32);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icon32);

  // Generate 16x16
  const icon16 = await createWhiteBgIcon(16, 0.05);
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), icon16);

  console.log('Successfully generated all white-background favicons!');
}

generateFavicons().catch(console.error);
