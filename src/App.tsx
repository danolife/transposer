import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { type Accidental, type Chord, transposeChord } from "@/notes.ts";
import { usePersistentState } from "@/hooks/usePersistentState.ts";
import { ChordName } from "@/components/ChordName.tsx";
import { ChordSheet } from "@/components/ChordSheet.tsx";
import { TransposeBar } from "@/components/TransposeBar.tsx";
import { cn } from "@/lib/utils.ts";

type SheetState = { open: false } | { open: true; index: number | null };

function App() {
  const [chords, setChords] = usePersistentState<Chord[]>("chords", []);
  const [offset, setOffset] = usePersistentState("offset", 0);
  const [accidental, setAccidental] = usePersistentState<Accidental>(
    "accidental",
    "sharp",
  );
  const [sheet, setSheet] = useState<SheetState>({ open: false });
  // Keep the last edited index while the sheet animates out.
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const transposed = chords.map((c) => transposeChord(c, offset, accidental));

  const openSheet = (index: number | null) => {
    setEditIndex(index);
    setSheet({ open: true, index });
  };
  const closeSheet = () => setSheet({ open: false });

  const saveChord = (chord: Chord) => {
    setChords((cs) =>
      editIndex === null
        ? [...cs, chord]
        : cs.map((c, i) => (i === editIndex ? chord : c)),
    );
    closeSheet();
  };

  const deleteChord = () => {
    setChords((cs) => cs.filter((_, i) => i !== editIndex));
    closeSheet();
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col px-4 pt-[max(env(safe-area-inset-top),20px)] pb-44">
      <header className="flex items-center justify-between py-2">
        <h1 className="font-display text-[26px] leading-none font-extrabold tracking-[-0.04em]">
          transposer
          <span className="text-accent">.</span>
        </h1>
        <div
          role="radiogroup"
          aria-label="Altérations"
          className="bg-card border-line flex rounded-full border p-0.5"
        >
          {(["sharp", "flat"] as const).map((a) => (
            <button
              key={a}
              role="radio"
              aria-checked={accidental === a}
              onClick={() => setAccidental(a)}
              className={cn(
                "font-display h-8 w-10 rounded-full text-lg transition-colors",
                accidental === a ? "bg-ink text-paper" : "text-ink-soft",
              )}
            >
              {a === "sharp" ? "♯" : "♭"}
            </button>
          ))}
        </div>
      </header>

      <div className="mt-6 mb-3 flex items-baseline justify-between">
        <h2 className="text-ink-soft text-xs font-semibold tracking-[0.18em] uppercase">
          Grille
        </h2>
        {chords.length > 0 && (
          <span className="text-ink-faint text-xs tabular-nums">
            {chords.length} accord{chords.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {chords.length === 0 ? (
        <button
          onClick={() => openSheet(null)}
          className="border-line hover:border-ink-faint flex flex-1 flex-col items-center justify-center gap-4 rounded-[28px] border-2 border-dashed px-8 py-16 text-center transition-colors"
        >
          <span className="bg-accent text-paper flex size-16 items-center justify-center rounded-full shadow-[0_10px_24px_-10px_var(--color-accent)]">
            <PlusIcon className="size-7" strokeWidth={2.5} />
          </span>
          <span className="font-display text-2xl font-semibold">
            Ta grille est vide
          </span>
          <span className="text-ink-soft max-w-60 text-sm">
            Ajoute les accords de ton morceau, puis transpose-les d'un geste.
          </span>
        </button>
      ) : (
        <ol className="grid grid-cols-3 gap-2.5">
          {chords.map((chord, index) => {
            const out = transposed[index];
            const changed = offset !== 0;
            return (
              <li key={index}>
                <button
                  onClick={() => openSheet(index)}
                  className="bg-card border-line relative flex aspect-[4/5] w-full flex-col items-center justify-center rounded-3xl border  transition-transform active:scale-95"
                >
                  <span className="text-ink-faint absolute top-2.5 left-3 text-[10px] font-semibold tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ChordName
                    key={`${offset}-${accidental}`}
                    chord={out}
                    className={cn(
                      "animate-in fade-in slide-in-from-bottom-1 text-[40px] duration-300",
                      changed ? "text-accent" : "text-ink",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute bottom-3 flex items-center gap-1 text-[11px] transition-opacity",
                      changed ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <span className="text-ink-faint">de</span>
                    <ChordName chord={chord} className="text-ink-soft text-sm" />
                  </span>
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => openSheet(null)}
              aria-label="Ajouter un accord"
              className="border-line text-ink-faint hover:border-ink-faint hover:text-ink-soft flex aspect-[4/5] w-full items-center justify-center rounded-3xl border-2 border-dashed transition-colors active:scale-95"
            >
              <PlusIcon className="size-7" />
            </button>
          </li>
        </ol>
      )}

      <TransposeBar
        offset={offset}
        setOffset={setOffset}
        from={chords[0]}
        to={transposed[0]}
      />

      <ChordSheet
        open={sheet.open}
        initial={editIndex === null ? undefined : chords[editIndex]}
        onOpenChange={(open) => !open && closeSheet()}
        onSave={saveChord}
        onDelete={deleteChord}
      />
    </div>
  );
}

export default App;
