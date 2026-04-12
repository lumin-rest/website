"use client";

import { ChevronsUpDown } from "lucide-react";
import { MileniumWindow } from "./milenium/MileniumWindow";
import WordFadeIn from "./ui/word-fade-in";
import { BlurFade } from "./magicui/blur-fade";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { GRACE_DATASETS } from "@/data/grace";

export function ModeSelection({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const modes = Object.keys(GRACE_DATASETS);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[260px] justify-between mt-5 mb-5 max-md:mt-2 max-md:mb-2 max-sm:mb-1 max-sm:mt-1"
        >
          Grace — {value}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[260px] p-0">
        <Command>
          <CommandList>
            <CommandGroup heading="Grace">
              {modes.map((mode) => (
                <CommandItem
                  key={mode}
                  onSelect={() => {
                    setValue(mode);
                    setOpen(false);
                  }}
                >
                  {mode}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function Features() {
  const [mode, setMode] = React.useState<string>("In-Game (Normal)");
  const config = GRACE_DATASETS[mode] ?? GRACE_DATASETS["In-Game (Normal)"];

  const memoizedWindow = React.useMemo(
    () => <MileniumWindow {...config} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode]
  );

  return (
    <div
      id="features"
      className="flex flex-col items-center text-center py-28 z-10"
    >
      <WordFadeIn
        className="text-3xl md:text-3xl mb-5"
        words={`lumin.rest features:`}
        inView
      />

      <BlurFade inViewMargin="0px" inView>
        <div className="w-full overflow-x-auto px-4">
          <div className="mx-auto w-[700px] min-w-[700px] max-w-none">
            {memoizedWindow}
          </div>
        </div>

        <ModeSelection value={mode} setValue={setMode} />
      </BlurFade>
    </div>
  );
}
