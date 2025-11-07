import { type FC } from "react";
import { Button } from "@/components/ui/button.tsx";

export const OffsetInput: FC<{
  offset: number;
  setOffset: (o: number | ((o: number) => number)) => void;
}> = ({ offset, setOffset }) => {
  return (
    <div className="flex flex-col">
      <div>{offset} demi-tons</div>
      <div className="flex items-center gap-2">
        <Button onClick={() => setOffset((offset) => offset - 1)}>-</Button>
        <Button onClick={() => setOffset((offset) => offset + 1)}>+</Button>
      </div>
    </div>
  );
};
