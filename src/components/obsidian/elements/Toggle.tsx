"use client";

import ToggleSwitch from "./toggle/Switch";
import ToggleCheckbox from "./toggle/Checkbox";
import { Addons, UIElement } from "../element.types";
import { useForceCheckbox } from "../providers/ObsidianDataProvider";

export default function Toggle({
  text,
  checked,
  risky,
  variant = "Switch",
  stateKey,
  addonData,
  renderAddons
}: {
  text: string;
  checked: boolean;
  risky: boolean;
  variant?: "Switch" | "Checkbox";
  stateKey?: string;
  addonData: [UIElement, Addons[] | undefined, string | undefined];
  renderAddons: (element: UIElement, addons?: Addons[], stateKeyPrefix?: string, node?: React.ReactNode) => React.ReactNode;
}) {
  const forceCheckbox = useForceCheckbox();
  if (variant === "Checkbox" || forceCheckbox) {
    return (
      <ToggleCheckbox
        text={text}
        checked={checked}
        risky={risky}
        stateKey={stateKey}
      />
    );
  }

  return (
    <ToggleSwitch
      text={text}
      checked={checked}
      risky={risky}
      stateKey={stateKey}
      addonData={addonData}
      renderAddons={renderAddons}
    />
  );
}