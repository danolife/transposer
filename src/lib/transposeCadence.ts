import { type Cadence, findSemiTone, semiToneToNote } from "@/notes.ts";

export function transposeCadence(cadence: Cadence, offset: number) {
  return cadence.map((chord) => {
    if (!chord) return undefined;
    return {
      fundamental:
        semiToneToNote[
          modulo(
            findSemiTone(chord.fundamental) + offset,
            12,
          ) as keyof typeof semiToneToNote
        ],
      quality: chord.quality,
    };
  });
}

function modulo(a: number, n: number): number {
  return ((a % n) + n) % n;
}
