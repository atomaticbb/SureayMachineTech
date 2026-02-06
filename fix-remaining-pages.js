import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'client/src/pages');

const pagesToUpdate = [
  'Materials.tsx',
  'Contact.tsx',
  'About.tsx',
  'ProductDetailPlastic.tsx',
  'ProductDetailMetal.tsx',
  'ProductDetail.tsx'
];

function fixImgFormats(content) {
  // Pattern 1: Fix broken tags with extra whitespace
  content = content.replace(
    /(<img[^>]*?)\s*\n\s*loading="lazy"\s*\n\s*decoding="async"\s*\n\s*\/>/g,
    (match, imgPart) => {
      // Extract existing attributes
      const srcMatch = imgPart.match(/src="([^"]*)"/);
      const altMatch = imgPart.match(/alt="([^"]*)"/);
      const classMatch = imgPart.match(/className="([^"]*)"/);

      const src = srcMatch ? srcMatch[1] : '';
      const alt = altMatch ? altMatch[1] : '';
      const className = classMatch ? classMatch[1] : '';

      // Get proper indentation
      const beforeImg = content.substring(0, content.indexOf(match));
      const lastNewline = beforeImg.lastIndexOf('\n');
      const indent = beforeImg.substring(lastNewline + 1).match(/^\s*/)[0];

      return `<img
${indent}  src="${src}"
${indent}  alt="${alt}"
${indent}  className="${className}"
${indent}  loading="lazy"
${indent}  decoding="async"
${indent}/>`;
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
    const updated = fixImgFormats(content);

    if (content !== updated) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`✓ Fixed: ${page}`);
    } else {
      console.log(`- No changes: ${page}`);
    }
  } catch (error) {
    console.error(`Error updating ${page}:`, error.message);
  }
}

console.log('\n✓ Done!');
