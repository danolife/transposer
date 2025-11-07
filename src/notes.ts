export const notes = ["A", "B", "C", "D", "E", "F", "G"] as const;

export type Alteration = -1 | 0 | 1;
export type AlteredNote = {
  note: Note;
  alteration: Alteration;
};

export type Cadence = Array<Chord | undefined>;
export type Note = (typeof notes)[number];
export type Quality = keyof typeof quality;

export type Chord = {
  root: Note;
  alteration: Alteration;
  quality: Quality;
};

export const semiToneToNote = {
  0: "A",
  2: "B",
  3: "C",
  5: "D",
  7: "E",
  8: "F",
  10: "G",
} as const;

export function mapNoteToSemiTone(note: Note): number {
  return Number(
    Object.entries(semiToneToNote).find(([, n]) => n === note)?.[0],
  );
}
export function mapSemiToneToNote(semiTone: number): AlteredNote {
  if (semiToneToNote[semiTone as keyof typeof semiToneToNote]) {
    return {
      note: semiToneToNote[semiTone as keyof typeof semiToneToNote],
      alteration: 0,
    };
  }
  if (semiToneToNote[(semiTone - 1) as keyof typeof semiToneToNote]) {
    return {
      note: semiToneToNote[(semiTone - 1) as keyof typeof semiToneToNote],
      alteration: 1,
    };
  }
  throw new Error("Impossible!");
}

export const quality = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  augmented: [0, 4, 8],
  diminished: [0, 3, 6],
  suspendedSecond: [0, 2, 7],
  suspendedFourth: [0, 5, 7],
  majorSix: [0, 4, 7, 9],
  minor6: [0, 3, 7, 9],
  sixNine: [0, 4, 7, 9, 14],
  dominantSeven: [],
  majorSeven: [0, 4, 7, 11],
  minorSeven: [0, 3, 7, 10],
  halfDiminishedSeven: [0, 3, 6, 10],
  diminishedSeven: [0, 3, 6, 9],
  nine: [0, 4, 7, 10, 14],
  majorNine: [0, 4, 7, 11, 14],
  minorNine: [0, 3, 7, 10, 14],
  eleven: [0, 4, 7, 10, 14, 17],
  thirteen: [0, 4, 7, 10, 14, 17, 21],
  sevenFlatNine: [0, 4, 7, 10, 13],
  sevenSharpNine: [0, 4, 7, 10, 15],
  sevenAddNine: [0, 4, 7, 11, 14],
  minorAddNine: [0, 3, 7, 11, 14],
} as const satisfies Record<string, number[]>;

export const chordQualityNotationSuffix: Record<Quality, string> = {
  major: "",
  minor: "–",
  augmented: "+",
  diminished: "°",
  suspendedSecond: "sus2",
  suspendedFourth: "sus4",
  majorSix: "6",
  minor6: "–6",
  sixNine: "6/9",
  dominantSeven: "7",
  majorSeven: "∆",
  minorSeven: "–7",
  halfDiminishedSeven: "ø7",
  diminishedSeven: "°7",
  nine: "9",
  majorNine: "∆9",
  minorNine: "–9",
  eleven: "11",
  thirteen: "13",
  sevenFlatNine: "7♭9",
  sevenSharpNine: "7♯9",
  sevenAddNine: "add9",
  minorAddNine: "–add9",
};
