import { type FC } from "react";
import { ChordSelect } from "@/components/ChordSelect.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { Cadence } from "@/notes.ts";
import { PlusIcon } from "lucide-react";

export const CadenceInput: FC<{
  cadence: Cadence;
  setCadence: (c: Cadence | ((c: Cadence) => Cadence)) => void;
}> = ({ cadence, setCadence }) => {
  return (
    <>
      {cadence.map((chord, index) => (
        <div className="row-1" key={index}>
          <ChordSelect
            value={chord}
            setValue={(value) => {
              setCadence((cadence) => {
                const newCadence = [...cadence];
                newCadence[index] = value;
                return newCadence;
              });
            }}
          />
        </div>
      ))}
      <Button
        onClick={() => setCadence((cadence) => [...cadence, undefined])}
        className="row-1 size-[100px]"
      >
        <PlusIcon />
        Add
      </Button>
    </>
  );
};
