import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const KIT = dirname(fileURLToPath(import.meta.url));

/** El kit sin `export`, para incrustarlo en una página autónoma. */
export function kitScript() {
  return readFileSync(join(KIT, "iso-kit.mjs"), "utf8").replace(/^export /gm, "");
}
