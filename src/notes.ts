export const notes = ["C", "D", "E", "F", "G", "A", "B"] as const;

export type Note = (typeof notes)[number];
export type Alteration = -1 | 0 | 1;
export type Accidental = "sharp" | "flat";

export type Quality = keyof typeof qualities;

export type Chord = {
  root: Note;
  alteration: Alteration;
  quality: Quality;
};

const noteSemitone: Record<Note, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

export function chordSemitone(chord: Pick<Chord, "root" | "alteration">) {
  return modulo(noteSemitone[chord.root] + chord.alteration, 12);
}

export function semitoneToNote(
  semitone: number,
  accidental: Accidental,
): { root: Note; alteration: Alteration } {
  const s = modulo(semitone, 12);
  const natural = notes.find((n) => noteSemitone[n] === s);
  if (natural) return { root: natural, alteration: 0 };
  if (accidental === "sharp") {
    const root = notes.find((n) => noteSemitone[n] === modulo(s - 1, 12))!;
    return { root, alteration: 1 };
  }
  const root = notes.find((n) => noteSemitone[n] === modulo(s + 1, 12))!;
  return { root, alteration: -1 };
}

export function modulo(a: number, n: number): number {
  return ((a % n) + n) % n;
}

export const qualities = {
  major: { suffix: "", label: "majeur" },
  minor: { suffix: "–", label: "mineur" },
  dominantSeven: { suffix: "7", label: "7e" },
  majorSeven: { suffix: "∆", label: "7e maj." },
  minorSeven: { suffix: "–7", label: "m7" },
  halfDiminishedSeven: { suffix: "ø7", label: "demi-dim." },
  diminished: { suffix: "°", label: "diminué" },
  diminishedSeven: { suffix: "°7", label: "dim. 7" },
  augmented: { suffix: "+", label: "augmenté" },
  suspendedSecond: { suffix: "sus2", label: "sus2" },
  suspendedFourth: { suffix: "sus4", label: "sus4" },
  majorSix: { suffix: "6", label: "6te" },
  minor6: { suffix: "–6", label: "m6" },
  sixNine: { suffix: "6/9", label: "6/9" },
  nine: { suffix: "9", label: "9e" },
  majorNine: { suffix: "∆9", label: "9e maj." },
  minorNine: { suffix: "–9", label: "m9" },
  eleven: { suffix: "11", label: "11e" },
  thirteen: { suffix: "13", label: "13e" },
  sevenFlatNine: { suffix: "7♭9", label: "7♭9" },
  sevenSharpNine: { suffix: "7♯9", label: "7♯9" },
  sevenAddNine: { suffix: "add9", label: "add9" },
  minorAddNine: { suffix: "–add9", label: "m add9" },
} as const satisfies Record<string, { suffix: string; label: string }>;

export function alterationSign(alteration: Alteration): string {
  return alteration === 1 ? "♯" : alteration === -1 ? "♭" : "";
}

export function rootName(chord: Pick<Chord, "root" | "alteration">) {
  return chord.root + alterationSign(chord.alteration);
}

export function transposeChord(
  chord: Chord,
  offset: number,
  accidental: Accidental,
): Chord {
  return {
    ...semitoneToNote(chordSemitone(chord) + offset, accidental),
    quality: chord.quality,
  };
}
