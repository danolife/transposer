import type { Alteration } from "@/notes.ts";

export function getAlterationSign(alteration: Alteration): string {
  if (alteration === 1) {
    return "#";
  } else if (alteration === -1) {
    return "♭";
  } else {
    return "";
  }
}
