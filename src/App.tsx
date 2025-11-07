import { CadenceInput } from "@/components/CadenceInput.tsx";
import { OffsetInput } from "@/components/OffsetInput.tsx";
import { useState } from "react";
import type { Cadence } from "@/notes.ts";
import { CadenceOutput } from "@/components/CadenceOutput.tsx";
import { transposeCadence } from "@/lib/transposeCadence.ts";

function App() {
  const [cadence, setCadence] = useState<Cadence>([undefined]);
  const [offset, setOffset] = useState<number>(0);

  const outputCadence = transposeCadence(cadence, offset);

  return (
    <div className="flex gap-8 h-screen p-8">
      <OffsetInput offset={offset} setOffset={setOffset} />
      <div className="grid grid-rows-2 gap-2 justify-items-center items-center">
        <CadenceInput cadence={cadence} setCadence={setCadence} />
        <CadenceOutput outputCadence={outputCadence} />
      </div>
    </div>
  );
}

export default App;
