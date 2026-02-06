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

function fixImgTags(content) {
  // Match img tags across multiple lines
  return content.replace(
    /<img\s+([^>]*?)>/gs,
    (match, attrs) => {
      // Clean up the attributes
      let cleanAttrs = attrs
        .replace(/\n\s*loading="lazy"/g, '')  // Remove existing loading
        .replace(/\n\s*decoding="async"/g, '') // Remove existing decoding
        .trim();

      // Find the indentation of the img tag
      const matchBefore = content.substring(0, content.indexOf(match));
      const lastNewline = matchBefore.lastIndexOf('\n');
      const lineStart = matchBefore.substring(lastNewline + 1);
      const indent = lineStart.match(/^\s*/)[0];
      const attrIndent = indent + '            ';

      // Split attributes by new lines to preserve multi-line format
      const lines = cleanAttrs.split('\n').map(line => line.trim()).filter(line => line);

      // Rebuild with proper formatting
      const formattedAttrs = lines.map(line => `${attrIndent}${line}`).join('\n');

      return `<img\n${formattedAttrs}\n${attrIndent}loading="lazy"\n${attrIndent}decoding="async"\n${indent}/>`;
    }
  );
}

for (const page of pagesToUpdate) {
  const filePath = path.join(pagesDir, page);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠ File not found: ${page}`);
    continue;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = fixImgTags(content);

    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✓ Fixed: ${page}`);
  } catch (error) {
    console.error(`Error updating ${page}:`, error.message);
  }
}

console.log('\n✓ All pages fixed!');
