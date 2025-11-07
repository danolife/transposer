import {
  type Cadence,
  mapNoteToSemiTone,
  mapSemiToneToNote,
  semiToneToNote,
} from "@/notes.ts";

export function transposeCadence(cadence: Cadence, offset: number): Cadence {
  return cadence.map((chord) => {
    if (!chord) return undefined;

    const transposedAlteredNote = mapSemiToneToNote(
      modulo(
        mapNoteToSemiTone(chord.root) + offset + chord.alteration,
        12,
      ) as keyof typeof semiToneToNote,
    );

    return {
      root: transposedAlteredNote.note,
      alteration: transposedAlteredNote.alteration,
      quality: chord.quality,
    };
  });
}

function modulo(a: number, n: number): number {
  return ((a % n) + n) % n;
}
