import type {
  MileniumConfig,
  SectionDef,
  UIEl,
} from "@/components/milenium/MileniumWindow";
import {
  ArrowBigRightDash,
  ArrowUpRight,
  Cog,
  Eye,
  Globe,
  House,
  Lightbulb,
  Package,
  ShieldOff,
  Sparkles,
  User,
} from "lucide-react";

function estimateSectionSize(elements: UIEl[]): number {
  const total = elements.reduce((sum, element) => {
    switch (element.type) {
      case "slider":
      case "textbox":
      case "number":
      case "keybind":
      case "dropdown":
      case "color":
        return sum + 1.75;
      case "button":
        return sum + 1.2;
      case "divider":
      case "label":
        return sum + 0.7;
      default:
        return sum + 1;
    }
  }, 0);

  return Number(Math.max(total, 1).toFixed(2));
}

function section(definition: Omit<SectionDef, "size"> & { size?: number }): SectionDef {
  return {
    ...definition,
    size: definition.size ?? estimateSectionSize(definition.elements),
  };
}

function mainSections(): SectionDef[] {
  return [
    section({
      name: "Player",
      icon: User,
      column: "left",
      elements: [
        { type: "toggle", text: "God Mode", value: false },
        { type: "dropdown", text: "Anti Mutator", value: "", width: 160 },
        { type: "toggle", text: "Inf Double Jump", value: false },
        { type: "toggle", text: "Anti Conveyor", value: false },
        { type: "toggle", text: "Autofarm", value: false },
        { type: "toggle", text: "Auto Stacker", value: false },
        { type: "toggle", text: "Auto Minesweeper", value: false },
        { type: "button", text: "Give All Tools" },
        { type: "button", text: "Buy All Skills" },
        { type: "button", text: "Teleport to Top" },
        { type: "button", text: "Teleport to Lobby" },
        { type: "toggle", text: "Checkpoints", value: false },
      ],
    }),
    section({
      name: "Players",
      icon: ArrowUpRight,
      column: "left",
      elements: [
        { type: "dropdown", text: "Target", value: "J_T (@PercPerry_1)", width: 160 },
        { type: "toggle", text: "Fling", value: false },
      ],
    }),
    section({
      name: "Cosmetics",
      icon: Sparkles,
      column: "right",
      elements: [
        { type: "dropdown", text: "Halo", value: "None", width: 160 },
        { type: "dropdown", text: "Trail", value: "None", width: 160 },
        { type: "dropdown", text: "Radiance", value: "None", width: 160 },
        { type: "dropdown", text: "Head", value: "None", width: 160 },
        { type: "dropdown", text: "Accessory", value: "None", width: 160 },
        { type: "dropdown", text: "Tool Skin", value: "None", width: 160 },
      ],
    }),
    section({
      name: "Music",
      icon: Package,
      column: "right",
      elements: [
        { type: "textbox", text: "Add Song", value: "", placeholder: "Sound ID or rbxassetid..." },
        { type: "button", text: "Add to Playlist" },
        { type: "button", text: "Remove Custom Songs" },
      ],
    }),
  ];
}

function universalPlayerSections(): SectionDef[] {
  return [
    section({
      name: "Player",
      icon: User,
      column: "left",
      elements: [
        { type: "slider", text: "Walk Speed", value: 16, min: 0, max: 200 },
        { type: "slider", text: "Jump Power", value: 50, min: 0, max: 500 },
        { type: "slider", text: "Fly Speed", value: 50, min: 0, max: 200 },
        { type: "toggle", text: "Infinite Jump", value: false },
        { type: "toggle", text: "Anti Void", value: false },
        { type: "toggle", text: "Anti Fling", value: false },
        { type: "toggle", text: "Anti AFK", value: false },
        { type: "toggle", text: "NoClip", value: false },
        { type: "toggle", text: "Fly", value: false },
        { type: "divider", text: "Extra" },
        { type: "slider", text: "Gravity", value: 196, min: 0, max: 500 },
        { type: "toggle", text: "Click Teleport", value: false },
        { type: "slider", text: "Spin Speed", value: 10, min: 0, max: 100 },
        { type: "toggle", text: "Spin Bot", value: false },
      ],
    }),
  ];
}

function universalCombatSections(): SectionDef[] {
  return [
    section({
      name: "Combat",
      icon: ShieldOff,
      column: "left",
      elements: [
        { type: "slider", text: "Aimbot FOV", value: 60, min: 0, max: 360 },
        { type: "slider", text: "Aimbot Smoothness", value: 0.4, min: 0, max: 1 },
        { type: "dropdown", text: "Aimbot Mode", value: "Always", width: 160 },
        { type: "toggle", text: "Aimbot", value: false },
        { type: "toggle", text: "Wallcheck", value: false },
        { type: "keybind", text: "Aimbot Key", value: "LA" },
        { type: "toggle", text: "Draw FOV", value: false },
      ],
    }),
  ];
}

function universalEspSections(): SectionDef[] {
  return [
    section({
      name: "Player ESP",
      icon: Eye,
      column: "left",
      elements: [
        { type: "toggle", text: "Enabled", value: false },
        { type: "toggle", text: "Boxes", value: true },
        { type: "toggle", text: "Names", value: true },
        { type: "toggle", text: "Health Bars", value: true },
        { type: "toggle", text: "Distance", value: true },
        { type: "toggle", text: "Tracers", value: false },
        { type: "toggle", text: "Team Check", value: false },
        { type: "toggle", text: "Team Colors", value: false },
        { type: "toggle", text: "ESP Color", value: false },
      ],
    }),
    section({
      name: "Hitbox Expander",
      icon: ArrowBigRightDash,
      column: "left",
      elements: [
        { type: "slider", text: "Hitbox Size", value: 10, min: 0, max: 50 },
        { type: "slider", text: "Hitbox Transparency", value: 0.7, min: 0, max: 1 },
        { type: "toggle", text: "Enabled", value: false },
      ],
    }),
  ];
}

function utilitySections(): SectionDef[] {
  return [
    section({
      name: "World",
      icon: Globe,
      column: "left",
      elements: [
        { type: "toggle", text: "Fullbright", value: false },
        { type: "slider", text: "Field of View", value: 70, min: 0, max: 120 },
      ],
    }),
    section({
      name: "Camera",
      icon: Eye,
      column: "left",
      elements: [
        { type: "slider", text: "Freecam Speed", value: 1, min: 0, max: 10 },
        { type: "toggle", text: "Freecam", value: false },
        { type: "slider", text: "Max Zoom Distance", value: 400, min: 0, max: 1000 },
        { type: "slider", text: "Min Zoom Distance", value: 0.5, min: 0, max: 10 },
      ],
    }),
    section({
      name: "Teleport",
      icon: ArrowUpRight,
      column: "left",
      elements: [
        { type: "dropdown", text: "Target Player", value: "princess_hayes1", width: 160 },
        { type: "button", text: "Teleport to Player" },
        { type: "button", text: "Teleport to Spawn" },
        { type: "textbox", text: "Coordinates (X,Y,Z)", value: "", placeholder: "0, 100, 0" },
        { type: "button", text: "Goto Coordinates" },
      ],
    }),
    section({
      name: "Character",
      icon: User,
      column: "left",
      elements: [{ type: "button", text: "Refresh Character" }],
    }),
  ];
}

function lightingSections(): SectionDef[] {
  return [
    section({
      name: "Lighting",
      icon: Lightbulb,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "divider", text: "Colors" },
        { type: "color", text: "Ambient", value: "#808080" },
        { type: "color", text: "Outdoor Ambient", value: "#808080" },
        { type: "color", text: "Shift Bottom", value: "#000000" },
        { type: "color", text: "Shift Top", value: "#000000" },
        { type: "color", text: "Fog Color", value: "#808080" },
        { type: "divider", text: "Brightness & Scaling" },
        { type: "slider", text: "Brightness", value: 1, min: 0, max: 10 },
        { type: "slider", text: "Environment Diffuse Scale", value: 0, min: 0, max: 1 },
        { type: "slider", text: "Environment Specular Scale", value: 0, min: 0, max: 1 },
        { type: "slider", text: "Shadow Softness", value: 0.5, min: 0, max: 1 },
        { type: "divider", text: "Rendering" },
        { type: "dropdown", text: "Technology", value: "Voxel", width: 160 },
        { type: "toggle", text: "Global Shadows", value: false },
        { type: "divider", text: "Time & Position" },
        { type: "slider", text: "Clock Time", value: 14, min: 0, max: 24 },
        { type: "slider", text: "Geographic Latitude", value: 41.7, min: 0, max: 100 },
        { type: "slider", text: "Exposure Compensation", value: 0.3, min: -10, max: 10 },
        { type: "divider", text: "Fog" },
        { type: "slider", text: "Fog Start", value: 0, min: 0, max: 5000 },
        { type: "slider", text: "Fog End", value: 1200, min: 0, max: 5000 },
      ],
    }),
  ];
}

function effectsSections(): SectionDef[] {
  return [
    section({
      name: "Color Correction - hourglassColor",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: true },
        { type: "slider", text: "Brightness", value: 0, min: -10, max: 10 },
        { type: "slider", text: "Contrast", value: 0, min: -10, max: 10 },
        { type: "slider", text: "Saturation", value: 0, min: -10, max: 10 },
        { type: "toggle", text: "Tint Color", value: false },
      ],
    }),
    section({
      name: "Color Correction - Negative",
      icon: Sparkles,
      column: "right",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: false },
        { type: "slider", text: "Brightness", value: 0, min: -10, max: 10 },
        { type: "slider", text: "Contrast", value: 0, min: -10, max: 10 },
        { type: "slider", text: "Saturation", value: 0, min: -10, max: 10 },
        { type: "toggle", text: "Tint Color", value: false },
      ],
    }),
  ];
}

function settingsSections(): SectionDef[] {
  return [
    section({
      name: "Game",
      icon: House,
      column: "left",
      elements: [
        { type: "button", text: "Rejoin Server" },
        { type: "button", text: "Server Hop" },
      ],
    }),
    section({
      name: "Menu",
      icon: Cog,
      column: "right",
      elements: [
        { type: "keybind", text: "UI Keybind", value: "RC" },
        { type: "toggle", text: "Reexecute On Teleport", value: false },
        { type: "toggle", text: "Silent Load", value: false },
        { type: "button", text: "Export Logs" },
        { type: "button", text: "Unload Lumin UI" },
        { type: "divider", text: "Configs" },
        { type: "textbox", text: "Config Name", value: "", placeholder: "type here..." },
        { type: "toggle", text: "Auto Load Config", value: false },
        { type: "button", text: "Save Config" },
        { type: "button", text: "Load Config" },
        { type: "button", text: "Delete Config" },
      ],
    }),
  ];
}

const TOWER_OF_HELL_MAIN: MileniumConfig = {
  gameName: "Tower of Hell",
  placeId: 1962086868,
  tabs: [
    {
      name: "Main",
      order: 1010,
      icon: House,
      pages: [
        { name: "Target", order: 1, sections: mainSections() },
        { name: "Fling", order: 2, sections: mainSections() },
      ],
    },
    {
      name: "Universal",
      order: 2001,
      icon: Globe,
      pages: [
        { name: "Player", order: 1, sections: universalPlayerSections() },
        { name: "Combat", order: 2, sections: universalCombatSections() },
        { name: "ESP", order: 3, sections: universalEspSections() },
        { name: "Utility", order: 4, sections: utilitySections() },
      ],
    },
    {
      name: "Visuals",
      order: 2010,
      icon: Eye,
      pages: [
        { name: "Lighting", order: 1, sections: lightingSections() },
        { name: "Effects", order: 2, sections: effectsSections() },
      ],
    },
    {
      name: "Settings",
      order: 2100,
      icon: Cog,
      pages: [{ name: "Main", order: 1, sections: settingsSections() }],
    },
  ],
};

export const TOWER_OF_HELL_DATASETS: Record<string, MileniumConfig> = {
  Main: TOWER_OF_HELL_MAIN,
};