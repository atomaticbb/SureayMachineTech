/**
 * Script to convert downloaded images to WebP format
 * Run after download-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertToWebP() {
  const baseDir = path.join(__dirname, 'client', 'public', 'images');

  const directories = ['hero', 'common', 'materials', 'products', 'carousel'];

  console.log('Converting images to WebP format...\n');

  for (const dir of directories) {
    const dirPath = path.join(baseDir, dir);

    try {
      const files = fs.readdirSync(dirPath);

      for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
          const inputPath = path.join(dirPath, file);
          const outputPath = path.join(dirPath, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

          try {
            console.log(`Converting: ${dir}/${file} -> ${path.basename(outputPath)}`);

            await sharp(inputPath)
              .webp({ quality: 85, effort: 6 })
              .toFile(outputPath);

            // Delete original file after successful conversion
            fs.unlinkSync(inputPath);
            console.log('  ✓ Converted and removed original\n');

          } catch (error) {
            console.error(`  ✗ Failed to convert ${file}: ${error.message}\n`);
          }
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${dir}: ${error.message}`);
    }
  }

  console.log('Conversion complete!');
  console.log('All images have been converted to WebP format.');
}

convertToWebP().catch(console.error);
