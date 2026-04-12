"use client";

import * as React from "react";
import { MileniumWindow } from "@/components/milenium/MileniumWindow";
import { GRACE_DATASETS } from "@/data/grace";

const DEFAULT_MODE = "In-Game (Normal)";

export default function MileniumPreviewPage() {
  const [mode, setMode] = React.useState<string>(DEFAULT_MODE);
  const modes = Object.keys(GRACE_DATASETS);
  const config = GRACE_DATASETS[mode] ?? GRACE_DATASETS[DEFAULT_MODE];

  return (
    <main className="min-h-screen bg-[#0e0e10] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[980px] flex-col items-center justify-center gap-6 px-6 py-10">
        <label className="flex items-center gap-3 text-sm font-medium text-[#f5f5f5]">
          <span>Mode</span>
          <select
            value={mode}
            onChange={(event) => setMode(event.target.value)}
            className="h-10 rounded-md border border-[#242425] bg-[#161618] px-3 text-sm text-white outline-none"
          >
            {modes.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
        </label>

        <div className="w-[700px] min-w-[700px]">
          <MileniumWindow {...config} />
        </div>
      </div>
    </main>
  );
}