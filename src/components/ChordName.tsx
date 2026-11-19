import type { FC } from "react";
import { alterationSign, type Chord, qualities } from "@/notes.ts";
import { cn } from "@/lib/utils.ts";

/** Chord rendered like on a lead sheet: big root, raised accidental and quality. */
export const ChordName: FC<{ chord: Chord; className?: string }> = ({
  chord,
  className,
}) => {
  const sign = alterationSign(chord.alteration);
  const suffix = qualities[chord.quality].suffix;
  return (
    <span
      className={cn(
        "font-display inline-flex items-start leading-none tracking-tight whitespace-nowrap",
        className,
      )}
    >
      <span className="font-semibold">{chord.root}</span>
      {(sign || suffix) && (
        <span className="ml-[0.04em] flex items-start text-[0.55em] font-medium">
          {sign && <span className="-mt-[0.05em]">{sign}</span>}
          {suffix && <span className="mt-[0.05em]">{suffix}</span>}
        </span>
      )}
    </span>
  );
};
