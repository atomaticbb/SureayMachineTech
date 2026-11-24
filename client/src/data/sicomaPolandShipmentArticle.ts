import type { DispatchArticle } from "./news";

const photoDirectory = "/images/news/sicoma-mao-6000-4000-poland";
const mixingArms = `${photoDirectory}/mixing-arms-in-crate`;
const linerPlates = `${photoDirectory}/liner-plates-in-crate`;
const exportCrates = `${photoDirectory}/crates-loaded-for-dispatch`;

function shipmentPhotoSrcSet(stem: string): string {
  return `${stem}-400w.webp 400w, ${stem}-800w.webp 800w, ${stem}.webp 1200w`;
}

export const sicomaPolandShipmentArticle: DispatchArticle = {
  id: "sicoma-mao-6000-4000-wear-parts-shipped-to-poland",
  tag: "COMPANY NEWS",
  date: "24.NOV.2026",
  title: "Sureay Ships Wear Parts to Poland for SICOMA MAO 6000/4000 Mixer",
  excerpt:
    "Sureay Machinery Technology has shipped a complete set of replacement wear parts to a concrete batching plant in Poland. The parts were manufactured to fit the plant's Italian-made SICOMA MAO 6000/4000 mixer, and the order was dispatched within the agreed 20-day lead time.",
  metaDescription:
    "Sureay shipped replacement wear parts for a SICOMA MAO 6000/4000 mixer to Poland within 20 days, including trough liners, end-wall liners, mixing arms and paddles.",
  image: `${mixingArms}.webp`,
  imageSrcSet: shipmentPhotoSrcSet(mixingArms),
  imageAlt: "Mixing arms packed upright in an open plywood export crate",
  imageWidth: 1200,
  imageHeight: 675,
  readTime: "1 MIN",
  content: [
    { type: "h2", value: "Two Liner Sets for One Mixer" },
    {
      type: "paragraph",
      value:
        "The customer specified cast iron for the trough liners and Ni-Hard for the end-wall liners. The trough set alone comprised 216 tiles in three designs, together with mounting screws, nuts and springs. The order also included 20 mixing arms, 20 mixing paddles and 24 arm clamps, as well as left- and right-hand scraper arms and paddles.",
    },
    {
      type: "image",
      value: `${linerPlates}.webp`,
      imageSrcSet: shipmentPhotoSrcSet(linerPlates),
      imageAlt:
        "Stacks of liner plates with mounting holes visible inside a plywood crate",
      imageCaption: "Liner plates packed flat in a plywood export crate",
      imageWidth: 1200,
      imageHeight: 675,
    },
    { type: "h2", value: "Fit and Material Requirements" },
    {
      type: "paragraph",
      value:
        "Every mounting hole had to align precisely with its counterpart on the original mixer, and all installation dimensions had to match. The buyer required brand-new parts and rejected any castings or forgings with cracks, sand holes or other defects. A material test certificate, as requested, accompanied the order.",
    },
    { type: "h2", value: "Export Packing" },
    {
      type: "paragraph",
      value:
        "Liner plates were stacked flat and mixing arms were packed upright in plywood export crates. Once the lids were secured, the crates were loaded onto a truck for delivery to Poland.",
    },
    {
      type: "image",
      value: `${exportCrates}.webp`,
      imageSrcSet: shipmentPhotoSrcSet(exportCrates),
      imageAlt: "Closed plywood export crates on a truck outside the factory",
      imageCaption: "Export crates loaded for dispatch to Poland",
      imageWidth: 1200,
      imageHeight: 675,
    },
  ],
};
