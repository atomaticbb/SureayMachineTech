import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'client/public/images');

function replaceOptimizedImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      replaceOptimizedImages(filePath);
    } else if (file.endsWith('.temp.webp')) {
      const originalPath = filePath.replace('.temp.webp', '.webp');

      try {
        // Delete original file
        if (fs.existsSync(originalPath)) {
          fs.unlinkSync(originalPath);
        }

        // Rename temp file to original
        fs.renameSync(filePath, originalPath);

        console.log(`✓ Replaced: ${path.basename(originalPath)}`);
      } catch (error) {
        console.error(`Error replacing ${originalPath}:`, error.message);
      }
    }
  }
}

console.log('Replacing optimized images...\n');
replaceOptimizedImages(imagesDir);
console.log('\n✓ All images replaced!');
