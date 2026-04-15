import type {
  MileniumConfig,
  SectionDef,
  UIEl,
} from "@/components/milenium/MileniumWindow";
import {
  Blinds,
  Cog,
  Eye,
  Globe,
  Lightbulb,
  Package,
  PersonStanding,
  Play,
  RefreshCcw,
  ShieldOff,
  ShoppingCart,
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

function mainGameSections(): SectionDef[] {
  return [
    section({
      name: "Game",
      icon: Blinds,
      column: "left",
      elements: [
        { type: "divider", text: "Motorboat Tuning" },
        { type: "slider", text: "Motorboat Speed", value: 0, min: 0, max: 250 },
        { type: "textbox", text: "Turning Speed", value: "0", placeholder: "0 = default" },
        { type: "textbox", text: "Max Thrust Force", value: "0", placeholder: "0 = default" },
        { type: "textbox", text: "Max Turning Force", value: "0", placeholder: "0 = default" },
      ],
    }),
  ];
}

function farmSections(): SectionDef[] {
  return [
    section({
      name: "Farm",
      icon: RefreshCcw,
      column: "left",
      elements: [
        { type: "toggle", text: "Auto Farm", value: false },
        { type: "toggle", text: "Auto Claim", value: false },
        { type: "slider", text: "Farm Speed", value: 1.6, min: 0.5, max: 5, suffix: "s" },
        { type: "divider", text: "Stats" },
        { type: "label", text: "Gold/hr: 0 (earned: 0)" },
        { type: "label", text: "Gold/24h: 0" },
        { type: "label", text: "Gold Blocks/hr: 0 (earned: 0)" },
        { type: "label", text: "Gold Blocks/24h: 0" },
        { type: "button", text: "Reset Stats" },
      ],
    }),
    section({
      name: "Chests",
      icon: ShoppingCart,
      column: "right",
      elements: [
        { type: "dropdown", text: "Chest", value: "Common", width: 160 },
        { type: "textbox", text: "Chest Buy Amount", value: "1", placeholder: "1-1000" },
        { type: "toggle", text: "Auto Buy Chest", value: false },
      ],
    }),
  ];
}

function questSections(): SectionDef[] {
  return [
    section({
      name: "Quests",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "dropdown", text: "Quest", value: "Cloud", width: 160 },
        { type: "toggle", text: "Quest Completer", value: false },
        { type: "button", text: "Start Selected Quest" },
        { type: "button", text: "Cancel Active Quest" },
        { type: "button", text: "Complete Active Quest Step" },
      ],
    }),
  ];
}

function buildPageSections(): SectionDef[] {
  return [
    section({
      name: "Copy Build",
      icon: Package,
      column: "left",
      elements: [
        { type: "dropdown", text: "Team", value: "green", width: 160 },
        { type: "button", text: "Copy Build" },
        { type: "button", text: "Stop Build" },
        { type: "textbox", text: "Export Name", value: "", placeholder: "my_build" },
        { type: "button", text: "Export Team Build" },
        { type: "button", text: "Export Own Build" },
      ],
    }),
    section({
      name: "Builds",
      icon: Package,
      column: "right",
      elements: [
        {
          type: "dropdown",
          text: "Local Build",
          value: "cool_thing_from_i_think_poppy_playtime.json",
          width: 190,
        },
        {
          type: "dropdown",
          text: "Public Build",
          value: "cool_thing_from_i_think_poppy_playtime.json",
          width: 190,
        },
        {
          type: "label",
          text: "Selected Build: cool_thing_from_i_think_poppy_playtime.json",
        },
        { type: "toggle", text: "Preview Build", value: false },
        { type: "textbox", text: "Chest Gold Limit", value: "0", placeholder: "0 = unlimited" },
        { type: "button", text: "Preview Missing Blocks" },
        { type: "button", text: "Buy Missing Blocks" },
        { type: "button", text: "Import Build" },
        { type: "divider", text: "Refresh" },
        { type: "button", text: "Refresh Local Builds" },
        { type: "button", text: "Refresh Public Builds" },
        { type: "button", text: "Submit Builds" },
      ],
    }),
  ];
}

function imagePageSections(): SectionDef[] {
  return [
    section({
      name: "Image",
      icon: Blinds,
      column: "left",
      elements: [
        {
          type: "textbox",
          text: "Image URL",
          value: "",
          placeholder: "https://example.com/image.png",
        },
        { type: "slider", text: "Compression", value: 4, min: 0, max: 10 },
        { type: "slider", text: "Block Size", value: 2, min: 1, max: 2 },
        { type: "toggle", text: "Preview Image", value: false },
        { type: "label", text: "Plastic blocks: unavailable" },
        { type: "label", text: "Set a valid image URL to calculate blocks and cost.", muted: true },
        { type: "button", text: "Buy All Blocks" },
        { type: "button", text: "Import Image" },
      ],
    }),
  ];
}

function playerSections(): SectionDef[] {
  return [
    section({
      name: "Player",
      icon: PersonStanding,
      column: "left",
      elements: [
        { type: "button", text: "Give All Client Tools" },
        { type: "toggle", text: "Infinite Jetpack Fuel", value: false },
        { type: "toggle", text: "Bypass Isolation Mode", value: false },
        { type: "toggle", text: "Disable Water Damage", value: false },
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

function lightingSections(): SectionDef[] {
  return [
    section({
      name: "Lighting",
      icon: Lightbulb,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "divider", text: "Colors" },
        { type: "toggle", text: "Ambient", value: false },
        { type: "toggle", text: "Outdoor Ambient", value: false },
        { type: "toggle", text: "Shift Bottom", value: false },
        { type: "toggle", text: "Shift Top", value: false },
        { type: "toggle", text: "Fog Color", value: false },
        { type: "divider", text: "Brightness & Scaling" },
        { type: "slider", text: "Brightness", value: 1.5, min: 0, max: 10 },
        { type: "slider", text: "Environment Diffuse Scale", value: 0, min: 0, max: 1 },
        { type: "slider", text: "Environment Specular Scale", value: 0, min: 0, max: 1 },
        { type: "slider", text: "Shadow Softness", value: 0.5, min: 0, max: 1 },
        { type: "divider", text: "Rendering" },
        { type: "dropdown", text: "Technology", value: "ShadowMap", width: 160 },
        { type: "toggle", text: "Global Shadows", value: true },
        { type: "divider", text: "Time & Position" },
        { type: "slider", text: "Clock Time", value: 14, min: 0, max: 23 },
        { type: "slider", text: "Geographic Latitude", value: 41.7, min: 0, max: 90 },
        { type: "slider", text: "Exposure Compensation", value: 0, min: -5, max: 5 },
        { type: "divider", text: "Fog" },
        { type: "slider", text: "Fog Start", value: 0, min: 0, max: 50000 },
        { type: "slider", text: "Fog End", value: 100000, min: 0, max: 100000 },
      ],
    }),
  ];
}

function environmentSections(): SectionDef[] {
  return [
    section({
      name: "Skybox",
      icon: Package,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Celestial Bodies Shown", value: true },
        { type: "divider", text: "Celestial" },
        { type: "slider", text: "Star Count", value: 3000, min: 0, max: 5000 },
        { type: "slider", text: "Sun Angular Size", value: 21, min: 0, max: 60 },
        { type: "slider", text: "Moon Angular Size", value: 11, min: 0, max: 60 },
        { type: "divider", text: "Textures" },
        { type: "textbox", text: "Sun Texture", value: "rbxasset://sky/sun.jpg" },
        { type: "textbox", text: "Moon Texture", value: "rbxasset://sky/moon.jpg" },
        { type: "divider", text: "Skybox Faces" },
        { type: "textbox", text: "Back", value: "http://www.roblox.com/asset?id=58372690" },
        { type: "textbox", text: "Down", value: "http://www.roblox.com/asset?id=58372722" },
        { type: "textbox", text: "Front", value: "http://www.roblox.com/asset?id=58372742" },
        { type: "textbox", text: "Left", value: "http://www.roblox.com/asset?id=58372777" },
        { type: "textbox", text: "Right", value: "http://www.roblox.com/asset?id=58372794" },
        { type: "textbox", text: "Up", value: "http://www.roblox.com/asset?id=58372812" },
      ],
    }),
  ];
}

function effectSections(): SectionDef[] {
  return [
    section({
      name: "Color Correction",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: true },
        { type: "slider", text: "Brightness", value: 0.1, min: -1, max: 1 },
        { type: "slider", text: "Contrast", value: 0.18, min: -1, max: 1 },
        { type: "slider", text: "Saturation", value: 0, min: -1, max: 1 },
        { type: "toggle", text: "Tint Color", value: false },
      ],
    }),
  ];
}

function settingsSections(): SectionDef[] {
  return [
    section({
      name: "Game",
      icon: Cog,
      column: "left",
      elements: [
        { type: "button", text: "Rejoin Server" },
        { type: "button", text: "Server Hop" },
      ],
    }),
    section({
      name: "Menu",
      icon: User,
      column: "right",
      elements: [
        { type: "keybind", text: "UI Keybind", value: "RC" },
        { type: "toggle", text: "Menu Accent", value: false },
        { type: "button", text: "Export Logs" },
        { type: "button", text: "Unload Lumin UI" },
        { type: "divider", text: "Configs" },
        { type: "button", text: "BABFT" },
        { type: "textbox", text: "Config Name", value: "", placeholder: "type here..." },
        { type: "button", text: "Save Config" },
        { type: "button", text: "Load Config" },
        { type: "button", text: "Delete Config" },
      ],
    }),
  ];
}

export const BABFT_MAIN: MileniumConfig = {
  gameName: "Build A Boat For Treasure",
  placeId: 537413528,
  tabs: [
    {
      name: "Main",
      icon: Play,
      order: 1010,
      pages: [
        { name: "Game", order: 1, sections: mainGameSections() },
        { name: "Farm", order: 2, sections: farmSections() },
        { name: "Quests", order: 3, sections: questSections() },
      ],
    },
    {
      name: "Build [ BETA ]",
      icon: Package,
      order: 1015,
      pages: [
        { name: "Builds", order: 1, sections: buildPageSections() },
        { name: "Image", order: 2, sections: imagePageSections() },
      ],
    },
    {
      name: "Player",
      icon: PersonStanding,
      order: 1020,
      pages: [{ name: "Main", order: 1, sections: playerSections() }],
    },
    { name: "Universal", order: 2000, isSeparator: true, pages: [] },
    {
      name: "Universal",
      icon: Globe,
      order: 2001,
      pages: [
        { name: "Player", order: 1, sections: universalPlayerSections() },
        { name: "Combat", order: 2, sections: universalCombatSections() },
      ],
    },
    {
      name: "Visuals",
      icon: Eye,
      order: 2010,
      pages: [
        { name: "Lighting", order: 1, sections: lightingSections() },
        { name: "Environment", order: 2, sections: environmentSections() },
        { name: "Effects", order: 3, sections: effectSections() },
      ],
    },
    {
      name: "Settings",
      icon: Cog,
      order: 2100,
      pages: [{ name: "Main", order: 1, sections: settingsSections() }],
    },
  ],
};

export const BABFT_DATASETS: Record<string, MileniumConfig> = {
  Main: BABFT_MAIN,
};