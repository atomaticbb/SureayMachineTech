import {
  bladeDetailPages,
  getShredderDetailBlade,
  isUpgradedShredderBlade,
} from "../../client/src/data/blades.ts";

/** Public detail copy, including standalone pages and derived Shredder layouts. */
export const blades = bladeDetailPages.map(blade =>
  isUpgradedShredderBlade(blade) && !blade.detailLayout
    ? getShredderDetailBlade(blade)
    : blade
);
