import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One star for Monday — a one-star review of Monday, written as if
// Monday were a restaurant. At most 25 words, 1-180 characters.
const ENTRY =
  "One star. Monday seated us at 7 a.m., served cold coffee with a side of meetings, and charged us the whole week for it.";

const words = ENTRY.trim().split(/\s+/).length;
if (ENTRY.length < 1 || ENTRY.length > 180) {
  throw new Error(`entry is ${ENTRY.length} characters, gate needs 1-180`);
}
if (words > 25) {
  throw new Error(`entry is ${words} words, gate needs at most 25`);
}

const target = process.argv[2] ?? "/output";
// Accept either an output directory (entry.txt is created inside it)
// or a direct file path.
const outPath = target.endsWith(".txt") ? target : join(target, "entry.txt");
mkdirSync(join(outPath, ".."), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${outPath} (${ENTRY.length} characters, ${words} words)`);
