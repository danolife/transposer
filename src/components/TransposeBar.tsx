import type { FC } from "react";
import { MinusIcon, PlusIcon, RotateCcwIcon } from "lucide-react";
import { type Chord, rootName } from "@/notes.ts";

function describeOffset(offset: number): string {
  if (offset === 0) return "Tonalité d'origine";
  const abs = Math.abs(offset);
  const whole = Math.floor(abs / 2);
  const half = abs % 2 === 1;
  const tones =
    whole === 0
      ? "½ ton"
      : `${whole} ton${whole > 1 ? "s" : ""}${half ? " ½" : ""}`;
  return `${tones} plus ${offset > 0 ? "haut" : "bas"}`;
}

const StepButton: FC<{
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}> = ({ onClick, label, children }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="bg-accent text-paper flex size-16 shrink-0 items-center justify-center rounded-full transition-transform active:scale-90"
  >
    {children}
  </button>
);

export const TransposeBar: FC<{
  offset: number;
  setOffset: (update: (o: number) => number) => void;
  /** First chord before / after transposition, to show the key change. */
  from?: Chord;
  to?: Chord;
}> = ({ offset, setOffset, from, to }) => {
  const step = (delta: number) =>
    setOffset((o) => {
      const next = o + delta;
      return Math.abs(next) >= 12 ? 0 : next;
    });

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30">
      <div className="from-paper via-paper/90 h-10 bg-gradient-to-t to-transparent" />
      <div className="bg-paper pointer-events-auto px-4 pb-[max(env(safe-area-inset-bottom),16px)]">
        <div className="bg-card border-line mx-auto flex max-w-md items-center gap-3 rounded-[32px] border p-2.5">
          <StepButton onClick={() => step(-1)} label="Descendre d'un demi-ton">
            <MinusIcon className="size-6" strokeWidth={2.5} />
          </StepButton>

          <div className="flex min-w-0 flex-1 flex-col items-center">
            <div className="flex items-center gap-1.5">
              <span
                key={offset}
                className="font-display animate-in fade-in zoom-in-90 text-4xl leading-none font-semibold tabular-nums duration-200"
              >
                {offset > 0 ? "+" : offset < 0 ? "−" : ""}
                {Math.abs(offset)}
              </span>
              {offset !== 0 && (
                <button
                  onClick={() => setOffset(() => 0)}
                  aria-label="Revenir à la tonalité d'origine"
                  className="text-ink-faint hover:text-ink -mr-6 rounded-full p-1.5 transition-colors"
                >
                  <RotateCcwIcon className="size-3.5" />
                </button>
              )}
            </div>
            <span className="text-ink-soft mt-1.5 truncate text-xs">
              {from && to && offset !== 0 ? (
                <>
                  <span className="font-display font-semibold">
                    {rootName(from)}
                  </span>
                  {" → "}
                  <span className="font-display text-accent font-semibold">
                    {rootName(to)}
                  </span>
                  {" · "}
                </>
              ) : null}
              {describeOffset(offset)}
            </span>
          </div>

          <StepButton onClick={() => step(1)} label="Monter d'un demi-ton">
            <PlusIcon className="size-6" strokeWidth={2.5} />
          </StepButton>
        </div>
      </div>
    </div>
  );
};
