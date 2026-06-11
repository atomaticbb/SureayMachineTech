import { blades } from "../../client/src/data/blades.ts";
import { SECTOR_CONFIG } from "./constants.ts";

const order: { page: number; label: string; dims: number; markdown: boolean }[] = [];
let el = 2; // 1=cover, 2=about
for (const sector of Object.keys(SECTOR_CONFIG)) {
  const list = blades.filter((b) => b.sector === sector);
  if (!list.length) continue;
  el++; // divider
  for (const b of list) {
    el++;
    const dims = b.standardDimensions?.length || 0;
    const intro = b.fullDescription || b.description || "";
    const md = /(^|\n)##\s/.test(intro.slice(0, 450));
    order.push({ page: el, label: b.name, dims, markdown: md });
  }
}
console.log("SPARSE (dims<=5):");
order.filter((o) => o.dims <= 5).forEach((o) => console.log(`  p${o.page}  dims=${o.dims}  ${o.label}`));
console.log("\n## within first 450 chars:");
order.filter((o) => o.markdown).forEach((o) => console.log(`  p${o.page}  ${o.label}`));
