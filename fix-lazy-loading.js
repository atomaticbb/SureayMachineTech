import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'client/src/pages');

const pagesToUpdate = [
  'Home.tsx',
  'Materials.tsx',
  'Contact.tsx',
  'About.tsx',
  'ProductDetailPlastic.tsx',
  'ProductDetailMetal.tsx',
  'ProductDetail.tsx'
];

function fixAndAddLazyLoading(content) {
  // Fix broken img tags first - look for pattern like: />\n spaces loading="lazy"
  content = content.replace(/\/\s*\n\s+loading="lazy"\n\s+decoding="async">/g, '\n            loading="lazy"\n            decoding="async"\n          />');

  // Now add loading and decoding to img tags that don't have them
  // Match <img tags that span multiple lines
  content = content.replace(
    /<img\s+([^>]*?)>/gs,
    (match, attrs) => {
      // Only process if doesn't already have loading and decoding
      if (attrs.includes('loading=') && attrs.includes('decoding=')) {
        return match;
      }

      // Find the last attribute to add new ones before />
      const trimmedAttrs = attrs.trim();
      let newAttrs = trimmedAttrs;

      if (!attrs.includes('loading=')) {
        newAttrs += '\n            loading="lazy"';
      }
      if (!attrs.includes('decoding=')) {
        newAttrs += '\n            decoding="async"';
      }

      return `<img ${newAttrs}\n          />`;
    }
  );

  return content;
}

for (const page of pagesToUpdate) {
  const filePath = path.join(pagesDir, page);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠ File not found: ${page}`);
    continue;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = fixAndAddLazyLoading(content);

    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✓ Fixed and updated: ${page}`);
  } catch (error) {
    console.error(`Error updating ${page}:`, error.message);
  }
}

console.log('\n✓ All pages fixed and processed!');
