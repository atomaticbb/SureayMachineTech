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

function addLazyLoadingToImages(content) {
  // Pattern 1: <img without loading or decoding attributes
  let updated = content.replace(
    /<img\s+([^>]*?)(?<!loading=["'][^"']*["'])(?<!decoding=["'][^"']*["'])>/gi,
    (match, attrs) => {
      // Check if loading or decoding already exists
      const hasLoading = /loading\s*=/.test(attrs);
      const hasDecoding = /decoding\s*=/.test(attrs);

      let newAttrs = attrs;
      if (!hasLoading) {
        newAttrs += '\n            loading="lazy"';
      }
      if (!hasDecoding) {
        newAttrs += '\n            decoding="async"';
      }

      return `<img ${newAttrs}>`;
    }
  );

  return updated;
}

for (const page of pagesToUpdate) {
  const filePath = path.join(pagesDir, page);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠ File not found: ${page}`);
    continue;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = addLazyLoadingToImages(content);

    if (content !== updated) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`✓ Updated: ${page}`);
    } else {
      console.log(`- No changes needed: ${page}`);
    }
  } catch (error) {
    console.error(`Error updating ${page}:`, error.message);
  }
}

console.log('\n✓ All pages processed!');
