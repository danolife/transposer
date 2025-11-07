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
    <div className="flex gap-8">
      <CadenceInput cadence={cadence} setCadence={setCadence} />
      <OffsetInput offset={offset} setOffset={setOffset} />
      <CadenceOutput outputCadence={outputCadence} />
    </div>
  );
}

export default App;
