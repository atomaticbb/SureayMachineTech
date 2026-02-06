import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'client/public/images');

async function optimizeImage(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

    console.log(`Optimizing: ${path.basename(filePath)} (${sizeMB}MB)`);

    // Create a temporary file
    const tempPath = filePath.replace('.webp', '.temp.webp');

    // Optimize with lower quality and reasonable dimensions
    await sharp(filePath)
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 65, effort: 6 })
      .toFile(tempPath);

    // Get new size
    const newStats = fs.statSync(tempPath);
    const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);

    // Replace original with optimized
    fs.unlinkSync(filePath);
    fs.renameSync(tempPath, filePath);

    console.log(`✓ Reduced from ${sizeMB}MB to ${newSizeMB}MB`);
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error.message);
  }
}

async function optimizeAllImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await optimizeAllImages(filePath);
    } else if (file.endsWith('.webp')) {
      await optimizeImage(filePath);
    }
  }
}

console.log('Starting image optimization...\n');
await optimizeAllImages(imagesDir);
console.log('\n✓ All images optimized!');
