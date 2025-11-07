import { type FC, useState } from "react";
import {
  type AlteredNote,
  type Chord,
  chordQualityNotationSuffix,
  type Note,
  notes,
  type Quality,
} from "../notes.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer.tsx";
import { getAlterationSign } from "@/lib/getAlterationSign.ts";

export const ChordSelect: FC<{
  value: Chord | undefined;
  setValue: (v: Chord) => void;
}> = ({ value, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [root, setRoot] = useState<AlteredNote | undefined>(undefined);

  return (
    <Drawer
      onOpenChange={(isOpen) => {
        setRoot(undefined);
        setIsOpen(isOpen);
      }}
      open={isOpen}
    >
      <DrawerTrigger asChild>
        <Button className="size-[100px]">
          {value ? (
            <>
              {value.root}
              {getAlterationSign(value.alteration)}
              {chordQualityNotationSuffix[value.quality]}
            </>
          ) : (
            "Select"
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {!root ? (
          <div className="grid grid-rows-3 grid-cols-7 gap-2 p-4">
            {notes.map((note, index) => (
              <Button
                key={index}
                onClick={() => setRoot({ note, alteration: 1 })}
              >
                {note}#
              </Button>
            ))}
            {notes.map((note, index) => (
              <Button
                key={index}
                onClick={() => setRoot({ note, alteration: 0 })}
              >
                {note}
              </Button>
            ))}
            {notes.map((note, index) => (
              <Button
                key={index}
                onClick={() => setRoot({ note, alteration: -1 })}
              >
                {note}♭
              </Button>
            ))}
          </div>
        ) : (
          <div className="grid grid-rows-3 grid-cols-8 gap-2 p-4">
            {Object.entries(chordQualityNotationSuffix).map(
              ([quality, suffix]) => (
                <Button
                  key={quality}
                  onClick={() => {
                    setValue({
                      root: `${root.note}` as Note,
                      alteration: root?.alteration,
                      quality: quality as Quality,
                    });
                    setIsOpen(false);
                  }}
                >
                  {root.note}
                  {getAlterationSign(root.alteration)}
                  {suffix}
                </Button>
              ),
            )}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
