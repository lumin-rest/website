import type { MileniumConfig } from "@/components/milenium/MileniumWindow";
import { BABFT_DATASETS } from "@/data/babft";
import { GRACE_DATASETS } from "@/data/grace";
import { ZOO_OR_OOF_DATASETS } from "@/data/zoooroof";

export const DEFAULT_MILENIUM_GAME = "Grace";

export const MILENIUM_PREVIEW_DATASETS: Record<
  string,
  {
    defaultMode: string;
    datasets: Record<string, MileniumConfig>;
  }
> = {
  Grace: {
    defaultMode: "In-Game (Normal)",
    datasets: GRACE_DATASETS,
  },
  "Build A Boat For Treasure": {
    defaultMode: "Main",
    datasets: BABFT_DATASETS,
  },
  "ZOO or OOF": {
    defaultMode: "Main",
    datasets: ZOO_OR_OOF_DATASETS,
  },
};