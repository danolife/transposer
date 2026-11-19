import { type FC, useEffect, useState } from "react";
import { Drawer } from "vaul";
import { Trash2Icon } from "lucide-react";
import {
  type Alteration,
  type Chord,
  notes,
  type Quality,
  qualities,
} from "@/notes.ts";
import { ChordName } from "@/components/ChordName.tsx";
import { cn } from "@/lib/utils.ts";

const DEFAULT_CHORD: Chord = { root: "C", alteration: 0, quality: "major" };

const alterations: { value: Alteration; label: string }[] = [
  { value: -1, label: "♭" },
  { value: 0, label: "♮" },
  { value: 1, label: "♯" },
];

export const ChordSheet: FC<{
  open: boolean;
  /** Chord being edited, or undefined when adding a new one. */
  initial: Chord | undefined;
  onOpenChange: (open: boolean) => void;
  onSave: (chord: Chord) => void;
  onDelete?: () => void;
}> = ({ open, initial, onOpenChange, onSave, onDelete }) => {
  const [draft, setDraft] = useState<Chord>(initial ?? DEFAULT_CHORD);

  useEffect(() => {
    if (open) setDraft(initial ?? DEFAULT_CHORD);
  }, [open, initial]);

  const isEditing = initial !== undefined;

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
        <Drawer.Content className="bg-card fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92dvh] max-w-md flex-col rounded-t-[28px] pb-[env(safe-area-inset-bottom)]  outline-none">
          <div className="bg-line mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full" />

          <div className="flex items-center justify-between px-6 pt-4">
            <Drawer.Title className="text-ink-soft text-xs font-semibold tracking-[0.18em] uppercase">
              {isEditing ? "Modifier l'accord" : "Nouvel accord"}
            </Drawer.Title>
            {isEditing && onDelete && (
              <button
                onClick={onDelete}
                className="text-ink-soft hover:text-accent active:bg-accent-soft -mr-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors"
              >
                <Trash2Icon className="size-4" />
                Supprimer
              </button>
            )}
          </div>
          <Drawer.Description className="sr-only">
            Choisis la fondamentale, l'altération et la qualité de l'accord.
          </Drawer.Description>

          <div className="flex h-28 items-center justify-center">
            <ChordName chord={draft} className="text-ink text-7xl" />
          </div>

          <div className="flex flex-col gap-5 overflow-y-auto px-5 pb-4">
            <section className="flex flex-col gap-2">
              <div className="grid grid-cols-7 gap-1.5">
                {notes.map((note) => (
                  <button
                    key={note}
                    onClick={() => setDraft((d) => ({ ...d, root: note }))}
                    className={cn(
                      "font-display flex h-12 items-center justify-center rounded-2xl text-xl font-semibold transition-all active:scale-95",
                      draft.root === note
                        ? "bg-accent text-paper"
                        : "bg-paper text-ink hover:bg-line",
                    )}
                  >
                    {note}
                  </button>
                ))}
              </div>
              <div className="bg-paper grid grid-cols-3 gap-1 rounded-2xl p-1">
                {alterations.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() =>
                      setDraft((d) => ({ ...d, alteration: value }))
                    }
                    className={cn(
                      "font-display h-10 rounded-xl text-xl transition-all",
                      draft.alteration === value
                        ? "bg-card text-ink "
                        : "text-ink-soft",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-4 gap-1.5">
              {(Object.keys(qualities) as Quality[]).map((quality) => {
                const selected = draft.quality === quality;
                return (
                  <button
                    key={quality}
                    onClick={() => setDraft((d) => ({ ...d, quality }))}
                    className={cn(
                      "flex h-14 flex-col items-center justify-center gap-0.5 rounded-2xl border transition-all active:scale-95",
                      selected
                        ? "border-accent bg-accent-soft text-accent-ink"
                        : "bg-card text-ink border-line",
                    )}
                  >
                    <span className="font-display text-lg leading-none font-semibold">
                      {qualities[quality].suffix || "M"}
                    </span>
                    {qualities[quality].label !==
                      qualities[quality].suffix && (
                      <span
                        className={cn(
                          "text-[10px] leading-none",
                          selected ? "text-accent-ink/80" : "text-ink-faint",
                        )}
                      >
                        {qualities[quality].label}
                      </span>
                    )}
                  </button>
                );
              })}
            </section>
          </div>

          <div className="border-line border-t px-5 pt-3 pb-4">
            <button
              onClick={() => onSave(draft)}
              className="bg-accent text-paper h-14 w-full rounded-2xl text-base font-semibold shadow-[0_8px_20px_-8px_var(--color-accent)] transition-transform active:scale-[0.98]"
            >
              {isEditing ? "Enregistrer" : "Ajouter"}
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
