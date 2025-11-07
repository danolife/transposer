import { type FC } from "react";
import { Button } from "@/components/ui/button.tsx";
import { MinusIcon, PlusIcon } from "lucide-react";

export const OffsetInput: FC<{
  offset: number;
  setOffset: (o: number | ((o: number) => number)) => void;
}> = ({ offset, setOffset }) => {
  return (
    <div className="grid grid-rows-3 gap-2 items-center">
      <Button size="icon" onClick={() => setOffset((offset) => offset + 1)}>
        <PlusIcon />
      </Button>
      <div className="text-center font-semibold">
        {offset > 0 ? "+" : ""}
        {offset}
      </div>
      <Button size="icon" onClick={() => setOffset((offset) => offset - 1)}>
        <MinusIcon />
      </Button>
    </div>
  );
};
