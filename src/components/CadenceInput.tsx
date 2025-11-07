import { type FC } from "react";
import { ChordSelect } from "@/components/ChordSelect.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { Cadence } from "@/notes.ts";

export const CadenceInput: FC<{
  cadence: Cadence;
  setCadence: (c: Cadence | ((c: Cadence) => Cadence)) => void;
}> = ({ cadence, setCadence }) => {
  return (
    <div className="flex flex-col gap-4">
      {cadence.map((chord, index) => (
        <ChordSelect
          key={index}
          value={chord}
          setValue={(value) => {
            setCadence((cadence) => {
              const newCadence = [...cadence];
              newCadence[index] = value;
              return newCadence;
            });
          }}
        />
      ))}
      <Button onClick={() => setCadence((cadence) => [...cadence, undefined])}>
        Ajouter un accord
      </Button>
    </div>
  );
};
