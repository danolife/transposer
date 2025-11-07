import { type FC } from "react";
import { type Cadence, chordQualityNotationSuffix } from "@/notes.ts";

export const CadenceOutput: FC<{ outputCadence: Cadence }> = ({
  outputCadence,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {outputCadence.map((chord, index) => (
        <div
          key={index}
          className={
            "h-[72px] bg-secondary min-w-[70px] flex items-center justify-center font-semibold rounded text-secondary-foreground"
          }
        >
          {chord && chord.quality && chord.fundamental ? (
            <>
              {chord.fundamental}
              {chordQualityNotationSuffix[chord.quality]}
            </>
          ) : (
            <>-</>
          )}
        </div>
      ))}
    </div>
  );
};
