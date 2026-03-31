import { blades } from "./client/src/data/blades";
for (const b of blades) {
  console.log(
    b.id +
      ": " +
      (b.standardDimensions ? b.standardDimensions.length : 0) +
      " rows"
  );
}
