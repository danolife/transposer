import { type FC } from "react";
import { type Cadence, chordQualityNotationSuffix } from "@/notes.ts";
import { getAlterationSign } from "@/lib/getAlterationSign.ts";

export const CadenceOutput: FC<{ outputCadence: Cadence }> = ({
  outputCadence,
}) => {
  return (
    <>
      {outputCadence.map((chord, index) =>
        chord ? (
          <div
            key={index}
            className={
              "size-[100px] bg-secondary flex items-center justify-center font-semibold rounded-md text-secondary-foreground row-2"
            }
          >
            {chord.root}
            {getAlterationSign(chord.alteration)}
            {chordQualityNotationSuffix[chord.quality]}
          </div>
        ) : null,
      )}
    </>
  );
};
