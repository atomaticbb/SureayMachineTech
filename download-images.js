/**
 * Script to download and convert remote images to WebP format
 * Run with: node download-images.js
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image mapping: URL -> local path (without extension)
const imageMapping = {
  // Hero images
  'https://private-us-east-1.manuscdn.com/sessionFile/atwthpmfUJ1KdGMP3YZhNS/sandbox/JHe2l9yPfpfDg5Wy1OgpOo-img-1_1770202027000_na1fn_aGVyby1zaHJlZGRlci1ibGFkZQ.png': 'hero/shredder-blade',
  'https://private-us-east-1.manuscdn.com/sessionFile/atwthpmfUJ1KdGMP3YZhNS/sandbox/JHe2l9yPfpfDg5Wy1OgpOo-img-2_1770202043000_na1fn_c2hyZWRkZXItbWFjaGluZS1vcGVyYXRpb24.png': 'common/shredder-machine',
  'https://private-us-east-1.manuscdn.com/sessionFile/atwthpmfUJ1KdGMP3YZhNS/sandbox/JHe2l9yPfpfDg5Wy1OgpOo-img-3_1770202043000_na1fn_YmxhZGUtaGVhdC10cmVhdG1lbnQ.png': 'materials/heat-treatment',
  'https://private-us-east-1.manuscdn.com/sessionFile/atwthpmfUJ1KdGMP3YZhNS/sandbox/JHe2l9yPfpfDg5Wy1OgpOo-img-4_1770202029000_na1fn_cHJlY2lzaW9uLW1hY2hpbmluZw.png': 'materials/precision-machining',
  'https://private-us-east-1.manuscdn.com/sessionFile/atwthpmfUJ1KdGMP3YZhNS/sandbox/JHe2l9yPfpfDg5Wy1OgpOo-img-5_1770202027000_na1fn_YmxhZGUtYXJyYXktZGlzcGxheQ.png': 'products/blade-array',

  // Unsplash images - Common (used multiple times)
  'https://images.unsplash.com/photo-1565688534245-05d6b5be184a': 'common/metal-industrial-1',
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789': 'common/industrial-waste-1',
  'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b': 'common/plastic-recycling-1',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837': 'common/waste-processing-1',
  'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952': 'common/industrial-waste-2',

  // Home page specific
  'https://images.unsplash.com/photo-1567789884554-0b844b597180': 'carousel/blade-detail-1',
  'https://images.unsplash.com/photo-1550009158-9ebf69173e03': 'carousel/blade-detail-2',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64': 'carousel/blade-detail-3',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1': 'carousel/blade-detail-4',
  'https://images.unsplash.com/photo-1565689157206-0fddef7589a2': 'carousel/blade-detail-5',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d': 'carousel/blade-detail-6',
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.promises.unlink(filepath).catch(() => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  const baseDir = path.join(__dirname, 'client', 'public', 'images');

  console.log('Starting image download...\n');

  for (const [url, localPath] of Object.entries(imageMapping)) {
    const cleanUrl = url.split('?')[0]; // Remove query params
    const extension = cleanUrl.includes('unsplash') ? 'jpg' : 'png';
    const fullPath = path.join(baseDir, `${localPath}.${extension}`);

    try {
      console.log(`Downloading: ${url.substring(0, 80)}...`);
      console.log(`  -> ${localPath}.${extension}`);

      await downloadImage(url, fullPath);
      console.log('  ✓ Downloaded\n');
    } catch (error) {
      console.error(`  ✗ Failed: ${error.message}\n`);
    }
  }

  console.log('Download complete!');
  console.log('\nImages have been downloaded to client/public/images/');
  console.log('\nTo convert to WebP format, you can:');
  console.log('1. Install sharp: npm install --save-dev sharp');
  console.log('2. Or use online converter');
  console.log('3. Or use ImageMagick: mogrify -format webp *.{jpg,png}');
}

downloadAll().catch(console.error);
