import { type FC } from "react";
import {
  type Chord,
  chordQualityNotationSuffix,
  type Note,
  notesSharp,
  type Quality,
} from "../notes.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

export const ChordSelect: FC<{
  value: Chord | undefined;
  setValue: (v: Chord) => void;
}> = ({ value, setValue }) => {
  return (
    <div className="flex flex-col items-stretch">
      <Select
        value={value?.fundamental}
        onValueChange={(fundamental) =>
          setValue({ fundamental: fundamental as Note, quality: undefined })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Fondamentale" />
        </SelectTrigger>
        <SelectContent>
          {notesSharp.map((note, index) => (
            <SelectItem key={index} value={note}>
              {note}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        disabled={!value?.fundamental}
        value={value?.quality}
        onValueChange={(quality) =>
          setValue({
            fundamental: value!.fundamental,
            quality: quality as Quality,
          })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Qualité" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(chordQualityNotationSuffix).map(
            ([quality, suffix]) => (
              <SelectItem key={quality} value={quality}>
                {value?.fundamental}
                {suffix}
              </SelectItem>
            ),
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
