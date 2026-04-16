import type {
  MileniumConfig,
  SectionDef,
  UIEl,
} from "@/components/milenium/MileniumWindow";
import {
  CloudFog,
  Cog,
  Eye,
  Globe,
  Lightbulb,
  PawPrint,
  Play,
  ShieldOff,
  Sparkles,
  Sun,
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
      name: "Animal",
      icon: PawPrint,
      column: "left",
      elements: [
        { type: "toggle", text: "Auto Taunt", value: false },
        { type: "toggle", text: "No Crouch Delay", value: false },
        { type: "toggle", text: "Anti Barriers", value: false },
        { type: "button", text: "Teleport to Map" },
        { type: "button", text: "Teleport to Lobby" },
      ],
    }),
    section({
      name: "Zookeeper",
      icon: User,
      column: "right",
      elements: [
        { type: "toggle", text: "Silent Aim", value: false },
        { type: "toggle", text: "Rapid Fire", value: false },
        { type: "toggle", text: "No Recoil", value: false },
        { type: "toggle", text: "Animal ESP", value: false },
        { type: "dropdown", text: "Skin Changer", value: "vip", width: 160 },
        { type: "toggle", text: "Kill All", value: false },
        { type: "toggle", text: "Infinite Ult", value: false },
        { type: "toggle", text: "Anti-AFK Hunter", value: true },
        { type: "button", text: "Destroy All Props" },
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
        { type: "slider", text: "Brightness", value: 3, min: 0, max: 10 },
        { type: "slider", text: "Environment Diffuse Scale", value: 1, min: 0, max: 1 },
        { type: "slider", text: "Environment Specular Scale", value: 1, min: 0, max: 1 },
        { type: "slider", text: "Shadow Softness", value: 0.05, min: 0, max: 1 },
        { type: "divider", text: "Rendering" },
        { type: "dropdown", text: "Technology", value: "ShadowMap", width: 160 },
        { type: "toggle", text: "Global Shadows", value: true },
        { type: "divider", text: "Time & Position" },
        { type: "slider", text: "Clock Time", value: 11, min: 0, max: 23 },
        { type: "slider", text: "Geographic Latitude", value: 35, min: 0, max: 90 },
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
      name: "Atmosphere",
      icon: CloudFog,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "divider", text: "Colors" },
        { type: "toggle", text: "Color", value: false },
        { type: "toggle", text: "Decay", value: false },
        { type: "divider", text: "Properties" },
        { type: "slider", text: "Density", value: 0, min: 0, max: 1 },
        { type: "slider", text: "Offset", value: 0, min: 0, max: 1 },
        { type: "slider", text: "Glare", value: 0.3, min: 0, max: 10 },
        { type: "slider", text: "Haze", value: 1.9, min: 0, max: 10 },
      ],
    }),
    section({
      name: "Skybox",
      icon: Globe,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Celestial Bodies Shown", value: true },
        { type: "divider", text: "Celestial" },
        { type: "slider", text: "Star Count", value: 3000, min: 0, max: 5000 },
        { type: "slider", text: "Sun Angular Size", value: 11, min: 0, max: 60 },
        { type: "slider", text: "Moon Angular Size", value: 11, min: 0, max: 60 },
        { type: "divider", text: "Textures" },
        { type: "textbox", text: "Sun Texture", value: "rbxassetid://6196665106" },
        { type: "textbox", text: "Moon Texture", value: "rbxassetid://6444320592" },
        { type: "divider", text: "Skybox Faces" },
        { type: "textbox", text: "Back", value: "rbxassetid://88977499244187" },
        { type: "textbox", text: "Down", value: "rbxassetid://127371979008512" },
        { type: "textbox", text: "Front", value: "rbxassetid://89191873768259" },
        { type: "textbox", text: "Left", value: "rbxassetid://118796361735861" },
        { type: "textbox", text: "Right", value: "rbxassetid://114319706781691" },
        { type: "textbox", text: "Up", value: "rbxassetid://128763212738880" },
      ],
    }),
  ];
}

function effectSections(): SectionDef[] {
  return [
    section({
      name: "Bloom",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: false },
        { type: "slider", text: "Intensity", value: 0.3, min: 0, max: 10 },
        { type: "slider", text: "Size", value: 56, min: 0, max: 100 },
        { type: "slider", text: "Threshold", value: 1, min: 0, max: 10 },
      ],
    }),
    section({
      name: "Color Correction",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: true },
        { type: "slider", text: "Brightness", value: 0.15, min: -1, max: 1 },
        { type: "slider", text: "Contrast", value: 0.08, min: -1, max: 1 },
        { type: "slider", text: "Saturation", value: 0.08, min: -1, max: 1 },
        { type: "toggle", text: "Tint Color", value: false },
      ],
    }),
    section({
      name: "Sun Rays",
      icon: Sun,
      column: "right",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "toggle", text: "Enabled", value: true },
        { type: "slider", text: "Intensity", value: 0.01, min: 0, max: 1 },
        { type: "slider", text: "Spread", value: 0.1, min: 0, max: 1 },
      ],
    }),
  ];
}

function settingsSections(): SectionDef[] {
  return [
    section({
      name: "Game",
      icon: Play,
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
        { type: "toggle", text: "Reexecute On Teleport", value: true },
        { type: "toggle", text: "Silent Load", value: true },
        { type: "button", text: "Export Logs" },
        { type: "button", text: "Unload Lumin UI" },
        { type: "divider", text: "Configs" },
        { type: "dropdown", text: "Config List", value: "CRAZY GOOD", width: 170 },
        { type: "textbox", text: "Config Name", value: "", placeholder: "type here..." },
        { type: "toggle", text: "Auto Load Config", value: false },
        { type: "button", text: "Save Config" },
        { type: "button", text: "Load Config" },
        { type: "button", text: "Delete Config" },
      ],
    }),
  ];
}

export const ZOO_OR_OOF_MAIN: MileniumConfig = {
  gameName: "ZOO or OOF",
  placeId: 139233844569220,
  tabs: [
    {
      name: "Main",
      icon: PawPrint,
      order: 1010,
      pages: [{ name: "Main", order: 1, sections: mainSections() }],
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

export const ZOO_OR_OOF_DATASETS: Record<string, MileniumConfig> = {
  Main: ZOO_OR_OOF_MAIN,
};