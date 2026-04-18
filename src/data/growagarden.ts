import type {
  MileniumConfig,
  SectionDef,
  UIEl,
} from "@/components/milenium/MileniumWindow";
import {
  Cog,
  Eye,
  Globe,
  Lightbulb,
  Package,
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

function homeSections(): SectionDef[] {
  return [
    section({
      name: "Account",
      icon: User,
      column: "left",
      elements: [
        { type: "label", text: "Good evening Roblox! Welcome back to lumin." },
        { type: "divider", text: "Session" },
        { type: "label", text: "Script: Unknown" },
        { type: "label", text: "Version: Unknown" },
        { type: "label", text: "Discord: Unknown" },
        { type: "divider", text: "Key Info" },
        { type: "label", text: "Time Left: Unknown" },
        { type: "label", text: "Total Executions: 0" },
      ],
    }),
    section({
      name: "Script Status",
      icon: Sparkles,
      column: "right",
      elements: [
        { type: "label", text: "[+] 99 Nights In The Forest" },
        { type: "label", text: "[+] Build A Boat For Treasure" },
        { type: "label", text: "[+] Grace" },
        { type: "label", text: "[+] Grow a Garden" },
        { type: "label", text: "[+] Murder Mystery 2" },
        { type: "label", text: "[+] ZOO or OOF" },
        { type: "label", text: "[~] Tower of Hell" },
      ],
    }),
  ];
}

function autobuySections(): SectionDef[] {
  return [
    section({
      name: "Autobuy",
      icon: ShoppingCart,
      column: "left",
      elements: [
        {
          type: "label",
          text: "Autobuy: OFF | Picks 0 seeds / 0 gears / 0 eggs",
        },
        { type: "button", text: "Toggle Autobuy" },
        { type: "button", text: "Refresh Shop Lists" },
        { type: "slider", text: "Buy Delay", value: 0, min: 0, max: 10, suffix: "s" },
        { type: "dropdown", text: "Seeds", value: "", width: 190, multi: true },
        { type: "dropdown", text: "Gears", value: "", width: 190, multi: true },
        { type: "dropdown", text: "Eggs", value: "", width: 190, multi: true },
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
        { type: "label", text: "Farm: 0 plants | 0 ripe prompts | 0 seed qty" },
        {
          type: "label",
          text: "Loops: AFK OFF | Plant OFF | Collect OFF | Sell OFF | Quests OFF | Water OFF",
          muted: true,
        },
        { type: "toggle", text: "AFK Farm", value: false },
        { type: "slider", text: "Growth Wait", value: 5, min: 0, max: 30, suffix: "s" },
        { type: "divider", text: "AFK Autobuy" },
        { type: "toggle", text: "Buy Seeds/Gears", value: false },
        { type: "dropdown", text: "Seeds", value: "", width: 190, multi: true },
        { type: "dropdown", text: "Gears", value: "", width: 190, multi: true },
        { type: "divider", text: "Planting" },
        { type: "dropdown", text: "Seeds", value: "", width: 190, multi: true },
        { type: "dropdown", text: "Placement", value: "Top Left", width: 160 },
        { type: "slider", text: "Stud Distance", value: 2.25, min: 0, max: 10 },
        { type: "button", text: "Plant Once" },
        { type: "slider", text: "Plant Delay", value: 0.45, min: 0, max: 5, suffix: "s" },
        { type: "slider", text: "Plants / Cycle", value: 3, min: 1, max: 10 },
        { type: "toggle", text: "Auto Plant", value: false },
        { type: "divider", text: "Collecting" },
        { type: "toggle", text: "Auto Collect", value: false },
        { type: "slider", text: "Collect Delay", value: 0.1, min: 0, max: 5, suffix: "s" },
        { type: "divider", text: "Watering" },
        { type: "button", text: "Water All Now" },
        { type: "toggle", text: "Auto Water", value: false },
        { type: "slider", text: "Water Interval", value: 30, min: 0, max: 120, suffix: "s" },
      ],
    }),
  ];
}

function sellingSections(): SectionDef[] {
  return [
    section({
      name: "Selling",
      icon: Package,
      column: "left",
      elements: [
        { type: "button", text: "Sell All" },
        { type: "button", text: "Sell Selected Now" },
        { type: "dropdown", text: "Sell Rarities", value: "", width: 190, multi: true },
        { type: "toggle", text: "Auto Sell Selected", value: false },
        { type: "slider", text: "Sell Interval", value: 8, min: 0, max: 60, suffix: "s" },
      ],
    }),
  ];
}

function miscSections(): SectionDef[] {
  return [
    section({
      name: "Teleports",
      icon: Globe,
      column: "left",
      elements: [
        { type: "button", text: "Gear Shop" },
        { type: "button", text: "Easter Event" },
        { type: "button", text: "Perm Portal" },
      ],
    }),
    section({
      name: "Auto Like",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "toggle", text: "Auto Like All Farms", value: false },
        { type: "slider", text: "Like Interval", value: 60, min: 0, max: 300, suffix: "s" },
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
        { type: "slider", text: "Walk Speed", value: 20, min: 0, max: 200 },
        { type: "slider", text: "Jump Power", value: 50, min: 0, max: 500 },
        { type: "slider", text: "Jump Height", value: 7.2, min: 0, max: 100 },
        { type: "slider", text: "Fly Speed", value: 50, min: 0, max: 200 },
        { type: "toggle", text: "Infinite Jump", value: false },
        { type: "toggle", text: "Anti Void", value: false },
        { type: "toggle", text: "Anti Fling", value: false },
        { type: "toggle", text: "Anti AFK", value: true },
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
        { type: "slider", text: "Brightness", value: 2, min: 0, max: 10 },
        { type: "slider", text: "Environment Diffuse Scale", value: 0, min: 0, max: 1 },
        { type: "slider", text: "Environment Specular Scale", value: 0, min: 0, max: 1 },
        { type: "slider", text: "Shadow Softness", value: 0.03, min: 0, max: 1 },
        { type: "divider", text: "Rendering" },
        { type: "dropdown", text: "Technology", value: "ShadowMap", width: 160 },
        { type: "toggle", text: "Global Shadows", value: true },
        { type: "divider", text: "Time & Position" },
        { type: "slider", text: "Clock Time", value: 14, min: 0, max: 24 },
        { type: "slider", text: "Geographic Latitude", value: 29.5, min: 0, max: 90 },
        { type: "slider", text: "Exposure Compensation", value: 0, min: -5, max: 5 },
        { type: "divider", text: "Fog" },
        { type: "slider", text: "Fog Start", value: 0, min: 0, max: 100000 },
        { type: "slider", text: "Fog End", value: 100000, min: 0, max: 100000 },
      ],
    }),
  ];
}

function environmentSections(): SectionDef[] {
  return [
    section({
      name: "Atmosphere",
      icon: Globe,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "divider", text: "Colors" },
        { type: "toggle", text: "Color", value: false },
        { type: "toggle", text: "Decay", value: false },
        { type: "divider", text: "Properties" },
        { type: "slider", text: "Density", value: 0, min: 0, max: 1 },
        { type: "slider", text: "Offset", value: 0, min: 0, max: 1 },
        { type: "slider", text: "Glare", value: 0, min: 0, max: 1 },
        { type: "slider", text: "Haze", value: 0, min: 0, max: 5 },
      ],
    }),
    section({
      name: "Skybox",
      icon: Package,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Celestial Bodies Shown", value: true },
        { type: "divider", text: "Celestial" },
        { type: "slider", text: "Star Count", value: 0, min: 0, max: 5000 },
        { type: "slider", text: "Sun Angular Size", value: 15, min: 0, max: 60 },
        { type: "slider", text: "Moon Angular Size", value: 11, min: 0, max: 60 },
        { type: "divider", text: "Textures" },
        { type: "textbox", text: "Sun Texture", value: "rbxassetid://84297197373149" },
        { type: "textbox", text: "Moon Texture", value: "", placeholder: "rbxassetid://62326944" },
        { type: "divider", text: "Skybox Faces" },
        { type: "textbox", text: "Back", value: "rbxassetid://115721544632821" },
        { type: "textbox", text: "Down", value: "rbxassetid://72601404676117" },
        { type: "textbox", text: "Front", value: "rbxassetid://115721544632821" },
        { type: "textbox", text: "Left", value: "rbxassetid://115721544632821" },
        { type: "textbox", text: "Right", value: "rbxassetid://115721544632821" },
        { type: "textbox", text: "Up", value: "rbxassetid://112547577346413" },
      ],
    }),
  ];
}

function effectsSections(): SectionDef[] {
  return [
    section({
      name: "Color Corrections",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "label", text: "Multiple event color-correction profiles are available in-game." },
        { type: "label", text: "Flash, NightColor, Rain, Thunderstorm, Safari variants, and event filters are included.", muted: true },
      ],
    }),
    section({
      name: "Sun Rays",
      icon: Lightbulb,
      column: "right",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: true },
        { type: "slider", text: "Intensity", value: 0, min: 0, max: 1 },
        { type: "slider", text: "Spread", value: 0, min: 0, max: 1 },
      ],
    }),
    section({
      name: "Depth Of Field",
      icon: Eye,
      column: "right",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: true },
        { type: "slider", text: "Far Intensity", value: 0.75, min: 0, max: 1 },
        { type: "slider", text: "Near Intensity", value: 0.75, min: 0, max: 1 },
        { type: "slider", text: "Focus Distance", value: 0.1, min: 0, max: 10 },
        { type: "slider", text: "In-Focus Radius", value: 250, min: 0, max: 500 },
      ],
    }),
    section({
      name: "Blur",
      icon: Eye,
      column: "right",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: true },
        { type: "slider", text: "Size", value: 15, min: 0, max: 56 },
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

export const GROW_A_GARDEN_MAIN: MileniumConfig = {
  gameName: "Grow a Garden [BETA]",
  placeId: 126884695634066,
  tabs: [
    {
      name: "Home",
      icon: Sparkles,
      order: 5,
      pages: [{ name: "Main", order: 1, sections: homeSections() }],
    },
    {
      name: "Main",
      icon: Play,
      order: 1010,
      pages: [
        { name: "Autobuy", order: 1, sections: autobuySections() },
        { name: "Farm", order: 2, sections: farmSections() },
        { name: "Selling", order: 3, sections: sellingSections() },
        { name: "Misc", order: 4, sections: miscSections() },
      ],
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
        { name: "Effects", order: 3, sections: effectsSections() },
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

export const GROW_A_GARDEN_DATASETS: Record<string, MileniumConfig> = {
  Main: GROW_A_GARDEN_MAIN,
};