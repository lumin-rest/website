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

function gameSections(): SectionDef[] {
  return [
    section({
      name: "Farming",
      icon: RefreshCcw,
      column: "left",
      elements: [
        { type: "toggle", text: "Chop Aura", value: false },
        { type: "slider", text: "Chop Range", value: 20, min: 0, max: 100 },
        { type: "toggle", text: "Kill Aura", value: false },
        { type: "slider", text: "Kill Range", value: 15, min: 0, max: 100 },
      ],
    }),
    section({
      name: "ESP",
      icon: Eye,
      column: "left",
      elements: [
        { type: "toggle", text: "Enemy ESP", value: false },
        { type: "toggle", text: "Item ESP", value: false },
        { type: "toggle", text: "Chest ESP", value: false },
      ],
    }),
    section({
      name: "Collection",
      icon: ShoppingCart,
      column: "right",
      elements: [
        { type: "toggle", text: "Item Magnet", value: false },
        { type: "slider", text: "Item Range", value: 40, min: 0, max: 200 },
        { type: "toggle", text: "Coin Collector", value: false },
        { type: "slider", text: "Coin Range", value: 40, min: 0, max: 200 },
        { type: "toggle", text: "Auto Chest", value: false },
        { type: "slider", text: "Chest Range", value: 40, min: 0, max: 200 },
        { type: "toggle", text: "Auto Pick Flower", value: false },
        { type: "slider", text: "Flower Range", value: 40, min: 0, max: 200 },
      ],
    }),
    section({
      name: "Teleport",
      icon: Globe,
      column: "right",
      elements: [
        { type: "toggle", text: "Disable Boundaries", value: false },
        { type: "button", text: "Campfire" },
        { type: "button", text: "Cathedral" },
        { type: "button", text: "Dino Kid" },
        { type: "button", text: "Kraken Kid" },
        { type: "button", text: "Squid Kid" },
        { type: "button", text: "Koala Kid" },
      ],
    }),
  ];
}

function automationSections(): SectionDef[] {
  return [
    section({
      name: "Resources",
      icon: Package,
      column: "left",
      elements: [
        {
          type: "dropdown",
          text: "Type",
          value: "Food, Scrap, Fuel, Misc",
          width: 210,
          multi: true,
        },
        { type: "toggle", text: "Only Uncollected", value: true },
        { type: "button", text: "Bring all items" },
        { type: "button", text: "Stop Bringing Items" },
      ],
    }),
    section({
      name: "Survival",
      icon: ShieldOff,
      column: "right",
      elements: [
        { type: "toggle", text: "God Mode", value: false },
        { type: "toggle", text: "Auto Eat", value: false },
        { type: "slider", text: "Eat Below", value: 150, min: 0, max: 300 },
        { type: "divider", text: "Fire" },
        { type: "toggle", text: "Auto Feed Fire", value: false },
        { type: "slider", text: "Feed Range", value: 80, min: 0, max: 200 },
        { type: "divider", text: "Planting" },
        { type: "toggle", text: "Auto Plant", value: false },
        { type: "slider", text: "Plant Range", value: 60, min: 0, max: 200 },
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
        { type: "slider", text: "Brightness", value: 1, min: 0, max: 10 },
        {
          type: "slider",
          text: "Environment Diffuse Scale",
          value: 1,
          min: 0,
          max: 1,
        },
        {
          type: "slider",
          text: "Environment Specular Scale",
          value: 1,
          min: 0,
          max: 1,
        },
        { type: "slider", text: "Shadow Softness", value: 0.05, min: 0, max: 1 },
        { type: "divider", text: "Rendering" },
        { type: "dropdown", text: "Technology", value: "ShadowMap", width: 160 },
        { type: "toggle", text: "Global Shadows", value: true },
        { type: "divider", text: "Time & Position" },
        { type: "slider", text: "Clock Time", value: 14.5, min: 0, max: 24 },
        { type: "slider", text: "Geographic Latitude", value: 0, min: 0, max: 90 },
        { type: "slider", text: "Exposure Compensation", value: 0, min: -5, max: 5 },
        { type: "divider", text: "Fog" },
        { type: "slider", text: "Fog Start", value: 50, min: 0, max: 5000 },
        { type: "slider", text: "Fog End", value: 450, min: 0, max: 5000 },
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
        { type: "slider", text: "Sun Angular Size", value: 1, min: 0, max: 60 },
        { type: "slider", text: "Moon Angular Size", value: 1, min: 0, max: 60 },
        { type: "divider", text: "Textures" },
        {
          type: "textbox",
          text: "Sun Texture",
          value: "",
          placeholder: "rbxassetid://5392574622",
        },
        {
          type: "textbox",
          text: "Moon Texture",
          value: "",
          placeholder: "rbxassetid://62326944",
        },
        { type: "divider", text: "Skybox Faces" },
        {
          type: "textbox",
          text: "Back",
          value: "http://www.roblox.com/asset/?id=4495864450",
        },
        {
          type: "textbox",
          text: "Down",
          value: "http://www.roblox.com/asset/?id=4495864887",
        },
        {
          type: "textbox",
          text: "Front",
          value: "http://www.roblox.com/asset/?id=4495865458",
        },
        {
          type: "textbox",
          text: "Left",
          value: "http://www.roblox.com/asset/?id=4495866035",
        },
        {
          type: "textbox",
          text: "Right",
          value: "http://www.roblox.com/asset/?id=4495866584",
        },
        {
          type: "textbox",
          text: "Up",
          value: "http://www.roblox.com/asset/?id=4495867486",
        },
      ],
    }),
  ];
}

function effectsSections(): SectionDef[] {
  return [
    section({
      name: "Bloom",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: true },
        { type: "slider", text: "Intensity", value: 0.1, min: 0, max: 5 },
        { type: "slider", text: "Size", value: 11, min: 0, max: 56 },
        { type: "slider", text: "Threshold", value: 1, min: 0, max: 10 },
      ],
    }),
    section({
      name: "Color Correction - ColorCorrection",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: true },
        { type: "slider", text: "Brightness", value: 0, min: -1, max: 1 },
        { type: "slider", text: "Contrast", value: 0, min: -1, max: 1 },
        { type: "slider", text: "Saturation", value: -0.05, min: -1, max: 1 },
        { type: "toggle", text: "Tint Color", value: false },
      ],
    }),
    section({
      name: "Color Correction - CampfireEffect",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: false },
        { type: "slider", text: "Brightness", value: 0.2, min: -1, max: 1 },
        { type: "slider", text: "Contrast", value: 0.1, min: -1, max: 1 },
        { type: "slider", text: "Saturation", value: 0.3, min: -1, max: 1 },
        { type: "toggle", text: "Tint Color", value: false },
      ],
    }),
    section({
      name: "Color Correction - UndeadColorCorrection",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: false },
        { type: "slider", text: "Brightness", value: 0, min: -1, max: 1 },
        { type: "slider", text: "Contrast", value: 0.7, min: -1, max: 1 },
        { type: "slider", text: "Saturation", value: -0.6, min: -1, max: 1 },
        { type: "toggle", text: "Tint Color", value: false },
      ],
    }),
    section({
      name: "Color Correction - AdminFlashlightColorCorrection",
      icon: Sparkles,
      column: "right",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: false },
        { type: "slider", text: "Brightness", value: 0.6, min: -1, max: 1 },
        { type: "slider", text: "Contrast", value: 0, min: -1, max: 1 },
        { type: "slider", text: "Saturation", value: 0, min: -1, max: 1 },
        { type: "toggle", text: "Tint Color", value: false },
      ],
    }),
    section({
      name: "Color Correction - BunnyChaseCorrection",
      icon: Sparkles,
      column: "right",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: false },
        { type: "slider", text: "Brightness", value: 0, min: -1, max: 1 },
        { type: "slider", text: "Contrast", value: 0.5, min: -1, max: 1 },
        { type: "slider", text: "Saturation", value: -0.5, min: -1, max: 1 },
        { type: "toggle", text: "Tint Color", value: false },
      ],
    }),
    section({
      name: "Sun Rays",
      icon: Lightbulb,
      column: "right",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: true },
        { type: "slider", text: "Intensity", value: 0.01, min: 0, max: 1 },
        { type: "slider", text: "Spread", value: 0.1, min: 0, max: 1 },
      ],
    }),
    section({
      name: "Depth Of Field",
      icon: Eye,
      column: "right",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: false },
        { type: "slider", text: "Far Intensity", value: 0.1, min: 0, max: 1 },
        { type: "slider", text: "Near Intensity", value: 0.75, min: 0, max: 1 },
        { type: "slider", text: "Focus Distance", value: 0.1, min: 0, max: 10 },
        { type: "slider", text: "In-Focus Radius", value: 30, min: 0, max: 100 },
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
        {
          type: "textbox",
          text: "Config Name",
          value: "",
          placeholder: "type here...",
        },
        { type: "toggle", text: "Auto Load Config", value: false },
        { type: "button", text: "Save Config" },
        { type: "button", text: "Load Config" },
        { type: "button", text: "Delete Config" },
      ],
    }),
  ];
}

export const NINETY_NIGHTS_MAIN: MileniumConfig = {
  gameName: "99 Nights In The Forest [BETA]",
  placeId: 126509999114328,
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
        { name: "Game", order: 1, sections: gameSections() },
        { name: "Automation", order: 2, sections: automationSections() },
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

export const NINETY_NIGHTS_DATASETS: Record<string, MileniumConfig> = {
  Main: NINETY_NIGHTS_MAIN,
};