import type {
  MileniumConfig,
  UIEl,
  TabDef,
  SectionDef,
} from "@/components/milenium/MileniumWindow";
import {
  Activity,
  ArrowBigRightDash,
  ArrowUpRight,
  BarChart3,
  Blinds,
  Box,
  CloudFog,
  Cog,
  Crown,
  DoorClosed,
  Eye,
  EyeOff,
  Ghost,
  Globe,
  Heart,
  House,
  Lightbulb,
  Mountain,
  Package,
  Play,
  RefreshCcw,
  ShieldOff,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  PersonStanding,
  User,
  Zap,
} from "lucide-react";

const LOADOUT_SLOT_SAMPLES = [
  ["Flashlight", "Default"],
  ["Lantern", "Firefly"],
  ["SHAKE", "Dispatch"],
  ["BRICK", "Artillery"],
  ["Joey", "Thrill"],
  ["SNAP", "Selfie"],
  ["Gleam", "Sidearm"],
] as const;

function estimateSectionSize(elements: UIEl[]): number {
  const total = elements.reduce((sum, element) => {
    switch (element.type) {
      case "slider":
      case "textbox":
      case "number":
        return sum + 1.75;
      case "button":
        return sum + 1.2;
      case "divider":
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

function playerMovementSections(): SectionDef[] {
  return [
    section({
      name: "Slide",
      icon: ArrowBigRightDash,
      column: "left",
      elements: [
        { type: "toggle", text: "Constant Slide Speed", value: false },
        { type: "slider", text: "Desired Slide Speed", value: 256, min: 16, max: 512 },
      ],
    }),
    section({
      name: "Wallkick",
      icon: ArrowUpRight,
      column: "right",
      elements: [
        { type: "toggle", text: "Infinite Wallkicks", value: false },
        { type: "divider", text: "Boosts" },
        { type: "textbox", text: "Speed Boost", value: "0", placeholder: "0-200" },
        { type: "textbox", text: "Height Boost", value: "0", placeholder: "0-120" },
      ],
    }),
  ];
}

function lobbyPlayerSections(): SectionDef[] {
  return playerMovementSections();
}

function ingamePlayerSections(): SectionDef[] {
  return [
    ...playerMovementSections(),
    section({
      name: "Inventory",
      icon: Package,
      column: "left",
      elements: [
        { type: "divider", text: "Loadout Slots" },
        ...LOADOUT_SLOT_SAMPLES.flatMap(([item, skin], index) => [
          { type: "dropdown", text: `Item ${index + 1}`, value: item, width: 160 } as UIEl,
          { type: "dropdown", text: `Skin ${index + 1}`, value: skin, width: 160 } as UIEl,
        ]),
        { type: "divider", text: "Traits" },
        { type: "dropdown", text: "Loadout Traits", value: "Runner, Hoarder", width: 160, multi: true },
        { type: "button", text: "Give Item / Trait Loadout" },
      ],
    }),
  ];
}

function universalSections(): SectionDef[] {
  return [
    section({
      name: "Player",
      icon: User,
      column: "left",
      elements: [
        { type: "slider", text: "Walk Speed", value: 16, min: 0, max: 200 },
        { type: "slider", text: "Jump Power", value: 50, min: 0, max: 500 },
        { type: "slider", text: "Jump Height", value: 7.2, min: 0, max: 100 },
        { type: "toggle", text: "Infinite Jump", value: false },
        { type: "toggle", text: "Anti AFK", value: false },
      ],
    }),
  ];
}

function visualsLightingSections(): SectionDef[] {
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
        { type: "color", text: "Shift Bottom", value: "#808080" },
        { type: "color", text: "Shift Top", value: "#808080" },
        { type: "color", text: "Fog Color", value: "#808080" },
        { type: "divider", text: "Brightness & Scaling" },
        { type: "slider", text: "Brightness", value: 2, min: 0, max: 100 },
        { type: "slider", text: "Environment Diffuse Scale", value: 1, min: 0, max: 1 },
        { type: "slider", text: "Environment Specular Scale", value: 1, min: 0, max: 1 },
        { type: "slider", text: "Shadow Softness", value: 0.2, min: 0, max: 1 },
        { type: "divider", text: "Time & Position" },
        { type: "slider", text: "Clock Time", value: 14, min: 0, max: 23 },
        { type: "slider", text: "Geographic Latitude", value: 41, min: 0, max: 100 },
        { type: "slider", text: "Exposure Compensation", value: 0, min: -10, max: 10 },
        { type: "divider", text: "Fog" },
        { type: "slider", text: "Fog Start", value: 0, min: 0, max: 50000 },
        { type: "slider", text: "Fog End", value: 100000, min: 0, max: 50000 },
      ],
    }),
  ];
}

function visualsEnvSections(): SectionDef[] {
  return [
    section({
      name: "Atmosphere",
      icon: CloudFog,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "divider", text: "Colors" },
        { type: "color", text: "Color", value: "#c0d8ff" },
        { type: "color", text: "Decay", value: "#8ea0b8" },
        { type: "divider", text: "Properties" },
        { type: "slider", text: "Density", value: 0.4, min: 0, max: 1 },
        { type: "slider", text: "Offset", value: 0, min: 0, max: 1 },
        { type: "slider", text: "Glare", value: 0, min: 0, max: 10 },
        { type: "slider", text: "Haze", value: 0, min: 0, max: 10 },
      ],
    }),
    section({
      name: "Skybox",
      icon: Box,
      column: "right",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "divider", text: "Celestial" },
        { type: "slider", text: "Star Count", value: 3000, min: 0, max: 5000 },
        { type: "slider", text: "Sun Angular Size", value: 11, min: 0, max: 60 },
        { type: "slider", text: "Moon Angular Size", value: 11, min: 0, max: 60 },
        { type: "divider", text: "Textures" },
        { type: "textbox", text: "Sun Texture", value: "rbxassetid://5392574622" },
        { type: "textbox", text: "Moon Texture", value: "rbxassetid://62326944" },
      ],
    }),
  ];
}

function visualsEffectsSections(): SectionDef[] {
  return [
    section({
      name: "Bloom",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "slider", text: "Intensity", value: 1, min: 0, max: 20 },
        { type: "slider", text: "Size", value: 24, min: 0, max: 56 },
        { type: "slider", text: "Threshold", value: 1, min: 0, max: 20 },
      ],
    }),
    section({
      name: "Color Grading",
      icon: Sparkles,
      column: "right",
      elements: [
        { type: "toggle", text: "Force", value: false },
        { type: "dropdown", text: "Preset", value: "Default" },
      ],
    }),
  ];
}

function settingsSections(): SectionDef[] {
  return [
    section({
      name: "Menu",
      icon: Cog,
      column: "left",
      elements: [
        { type: "keybind", text: "UI Keybind", value: "RCTRL" },
        { type: "button", text: "Export Logs" },
        { type: "button", text: "Unload Lumin UI" },
      ],
    }),
  ];
}

// â”€â”€ Shared universal/visuals/settings tabs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SHARED_TABS: TabDef[] = [
  { name: "Universal", order: 2000, isSeparator: true, pages: [] },
  {
    name: "Universal",
    icon: Globe,
    order: 2001,
    pages: [{ name: "Main", order: 1, sections: universalSections() }],
  },
  {
    name: "Visuals",
    icon: Eye,
    order: 2010,
    pages: [
      { name: "Lighting", order: 1, sections: visualsLightingSections() },
      { name: "Environment", order: 2, sections: visualsEnvSections() },
      { name: "Effects", order: 3, sections: visualsEffectsSections() },
    ],
  },
  {
    name: "Settings",
    icon: Cog,
    order: 2100,
    pages: [{ name: "Main", order: 1, sections: settingsSections() }],
  },
];

const LOBBY_PLAYER_TAB: TabDef = {
  name: "Player",
  icon: PersonStanding,
  order: 1020,
  pages: [{ name: "Main", order: 1, sections: lobbyPlayerSections() }],
};

const INGAME_PLAYER_TAB: TabDef = {
  name: "Player",
  icon: PersonStanding,
  order: 1020,
  pages: [{ name: "Main", order: 1, sections: ingamePlayerSections() }],
};

// â”€â”€ Entity disabler list (shared across ingame modes) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ENTITY_DISABLER_ELS: UIEl[] = [
  { type: "divider", text: "Item Disablers" },
  { type: "toggle", text: "No S.N.A.P", value: false },
  { type: "toggle", text: "No Doombringer", value: false },
  { type: "divider", text: "Entity Disabler" },
  { type: "toggle", text: "No Carnation", value: false },
  { type: "toggle", text: "No Doppel", value: false },
  { type: "toggle", text: "No Slugfish", value: false },
  { type: "toggle", text: "No Ire", value: false },
  { type: "toggle", text: "No Sorrow", value: false },
  { type: "toggle", text: "No Rue", value: false },
  { type: "toggle", text: "No Mime", value: false },
  { type: "toggle", text: "No Memory", value: false },
  { type: "toggle", text: "No Litany", value: false },
  { type: "toggle", text: "No Goatman", value: false },
  { type: "toggle", text: "No Fool", value: false },
  { type: "toggle", text: "No Drain", value: false },
  { type: "toggle", text: "No Dozer", value: false },
  { type: "toggle", text: "No Covet", value: false },
  { type: "toggle", text: "No Innego", value: false },
  { type: "toggle", text: "No Seesay", value: false },
  { type: "toggle", text: "No Stem", value: false },
  { type: "toggle", text: "No Sundial", value: false },
  { type: "toggle", text: "No Craven", value: false },
  { type: "toggle", text: "No Tar", value: false },
  { type: "toggle", text: "No Zombers", value: false },
  { type: "toggle", text: "No Slight & Heed", value: false },
  { type: "toggle", text: "No Elkman", value: false },
  { type: "toggle", text: "No Epikduk", value: false },
];

function ingameMainSections(): SectionDef[] {
  return [
    section({
      name: "Doors",
      icon: DoorClosed,
      column: "left",
      elements: [
        { type: "toggle", text: "Open Nearby Doors", value: false },
        { type: "slider", text: "Open Distance", value: 60, min: 10, max: 60 },
        { type: "toggle", text: "Door ESP", value: false },
        { type: "toggle", text: "Blast Door Warning", value: false },
      ],
    }),
    section({
      name: "Visual Suppression",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "toggle", text: "Suppress Flash / Spark", value: false },
        { type: "toggle", text: "Suppress Impact Frames", value: false },
        { type: "toggle", text: "Suppress Mistletoe CC", value: false },
        { type: "toggle", text: "Suppress Camera FX", value: false },
      ],
    }),
    section({
      name: "Entities",
      icon: Ghost,
      column: "right",
      elements: [
        { type: "toggle", text: "ESP", value: false },
        { type: "toggle", text: "Toggle Entity Spawns", value: false },
        ...ENTITY_DISABLER_ELS,
      ],
    }),
  ];
}

function mayhemSections(): SectionDef[] {
  return [
    section({
      name: "Automation",
      icon: RefreshCcw,
      column: "left",
      elements: [
        { type: "toggle", text: "Collect Hearts", value: false },
        { type: "toggle", text: "Auto Exit Collapse", value: false },
        { type: "toggle", text: "Auto Activate Altars", value: false },
        { type: "toggle", text: "Auto Vote Deck", value: false },
        { type: "toggle", text: "Auto Reset Trackers", value: false },
        { type: "toggle", text: "Violation Alerts", value: false },
      ],
    }),
    section({
      name: "Visuals",
      icon: Eye,
      column: "right",
      elements: [
        { type: "toggle", text: "Collapse ESP", value: false },
        { type: "toggle", text: "Altar ESP", value: false },
        { type: "toggle", text: "No Collapse / Violation FX", value: false },
      ],
    }),
  ];
}

function rotMainSections(): SectionDef[] {
  return [
    section({
      name: "Automation",
      icon: RefreshCcw,
      column: "left",
      elements: [
        { type: "button", text: "Infinite Bits" },
        { type: "toggle", text: "Auto TP To Highest Room", value: false },
        { type: "toggle", text: "Auto Get Upgrades", value: false },
        { type: "toggle", text: "Auto Random Option", value: false },
        { type: "toggle", text: "Auto Choose None", value: false },
      ],
    }),
    section({
      name: "Stats",
      icon: BarChart3,
      column: "left",
      elements: [
        { type: "label", text: "Bricks / Hour: 0" },
        { type: "label", text: "XP / Hour: 0" },
        { type: "label", text: "Keys / Hour: 0" },
        { type: "label", text: "Super Keys / Hour: 0" },
        { type: "label", text: "Key Crowns / Hour: 0" },
      ],
    }),
    section({
      name: "Hazards",
      icon: ShieldOff,
      column: "right",
      elements: [
        { type: "toggle", text: "Toggle Entity Spawns", value: false },
        { type: "divider", text: "Entity Disabler" },
        { type: "toggle", text: "No Carnation", value: false },
        { type: "toggle", text: "No Slugfish", value: false },
        { type: "toggle", text: "No Ire", value: false },
        { type: "toggle", text: "No Rue", value: false },
        { type: "toggle", text: "No Litany", value: false },
        { type: "toggle", text: "No Fool", value: false },
        { type: "toggle", text: "No Dozer", value: false },
        { type: "toggle", text: "No Covet", value: false },
        { type: "toggle", text: "No Innego", value: false },
        { type: "toggle", text: "No Seesay", value: false },
        { type: "toggle", text: "No Stem", value: false },
        { type: "toggle", text: "No Sundial", value: false },
        { type: "toggle", text: "No Craven", value: false },
      ],
    }),
  ];
}

function rotVisualSections(): SectionDef[] {
  return [
    section({
      name: "Performance",
      icon: Activity,
      column: "left",
      elements: [
        { type: "toggle", text: "Anti-Lag Mode", value: false },
      ],
    }),
    section({
      name: "Effects",
      icon: Sparkles,
      column: "left",
      elements: [
        { type: "toggle", text: "Disable Particles", value: false },
        { type: "toggle", text: "Disable Beams & Trails", value: false },
        { type: "toggle", text: "Disable Highlights", value: false },
        { type: "toggle", text: "Disable Post Effects", value: false },
        { type: "toggle", text: "Disable Blood Strings", value: false },
      ],
    }),
    section({
      name: "World",
      icon: Mountain,
      column: "right",
      elements: [
        { type: "toggle", text: "Disable Lights", value: false },
        { type: "toggle", text: "Disable World Guis", value: false },
        { type: "toggle", text: "Hide Decals & Textures", value: false },
      ],
    }),
  ];
}

function domainSections(): SectionDef[] {
  return [
    section({
      name: "Setup",
      icon: Zap,
      column: "left",
      elements: [
        { type: "button", text: "Flash Bulbs" },
      ],
    }),
    section({
      name: "Automation",
      icon: RefreshCcw,
      column: "left",
      elements: [
        { type: "toggle", text: "Auto Flash Bulbs", value: false },
        { type: "toggle", text: "Auto Open Door", value: false },
      ],
    }),
    section({
      name: "Domain",
      icon: SlidersHorizontal,
      column: "right",
      elements: [
        { type: "label", text: "Use severity to control how\naggressive the domain starts out." },
        { type: "slider", text: "Domain Severity", value: 0, min: 0, max: 10 },
      ],
    }),
  ];
}

function carnationSections(): SectionDef[] {
  return [
    section({
      name: "Player",
      icon: User,
      column: "left",
      elements: [
        { type: "toggle", text: "Infinite Sanity", value: false },
        { type: "toggle", text: "Infinite Timer", value: false },
        { type: "toggle", text: "No Stun", value: false },
      ],
    }),
    section({
      name: "Automation",
      icon: RefreshCcw,
      column: "left",
      elements: [
        { type: "toggle", text: "Auto Fill Flowers", value: false },
        { type: "toggle", text: "Auto Touch End", value: false },
        { type: "toggle", text: "Auto Reload Carnation", value: false },
      ],
    }),
    section({
      name: "Hazards",
      icon: ShieldOff,
      column: "right",
      elements: [
        { type: "toggle", text: "No S.N.A.P", value: false },
        { type: "toggle", text: "No Vines", value: false },
        { type: "toggle", text: "No Laser Beams", value: false },
        { type: "toggle", text: "No Stem", value: false },
        { type: "toggle", text: "Anti Flowerhead", value: false },
      ],
    }),
  ];
}

function sorrowSections(): SectionDef[] {
  return [
    section({
      name: "Player",
      icon: User,
      column: "left",
      elements: [
        { type: "toggle", text: "Infinite Sanity", value: false },
      ],
    }),
    section({
      name: "Automation",
      icon: RefreshCcw,
      column: "left",
      elements: [
        { type: "toggle", text: "Auto Hit Beacons", value: false },
        { type: "toggle", text: "Auto Touch End", value: false },
        { type: "toggle", text: "Auto Reload Sorrow", value: false },
      ],
    }),
    section({
      name: "Hazards",
      icon: ShieldOff,
      column: "right",
      elements: [
        { type: "toggle", text: "No Craven", value: false },
        { type: "toggle", text: "No Fool", value: false },
        { type: "toggle", text: "Remove Nukes", value: false },
        { type: "toggle", text: "Remove Worm", value: false },
        { type: "toggle", text: "Remove Platforms", value: false },
      ],
    }),
    section({
      name: "Phase",
      icon: Sparkles,
      column: "right",
      elements: [
        { type: "toggle", text: "Phase Warning", value: false },
        { type: "toggle", text: "Remove Blood Ocean", value: false },
      ],
    }),
  ];
}

function litanySections(): SectionDef[] {
  return [
    section({
      name: "Automation",
      icon: RefreshCcw,
      column: "left",
      elements: [
        { type: "toggle", text: "Auto Instant Win", value: false },
        { type: "toggle", text: "Auto Touch End", value: false },
        { type: "toggle", text: "Auto Reload Litany", value: false },
        { type: "toggle", text: "Auto Open Barriers", value: false },
      ],
    }),
    section({
      name: "Hazards",
      icon: ShieldOff,
      column: "right",
      elements: [
        { type: "toggle", text: "No Litany", value: false },
        { type: "toggle", text: "No Craven", value: false },
        { type: "toggle", text: "No Fool", value: false },
        { type: "toggle", text: "Disable Beams", value: false },
        { type: "toggle", text: "Disable Chasers", value: false },
        { type: "toggle", text: "Disable Instructions", value: false },
      ],
    }),
    section({
      name: "Phase",
      icon: Sparkles,
      column: "right",
      elements: [
        { type: "toggle", text: "Phase Warning", value: false },
      ],
    }),
  ];
}

// â”€â”€ Grace â€“ Lobby â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const GRACE_LOBBY: MileniumConfig = {
  gameName: "Grace [GRACE BUT EVIL]",
  placeId: 138837502355157,
  tabs: [
    {
      name: "Lobby",
      icon: House,
      order: 1010,
      pages: [
        {
          name: "Main",
          order: 1,
          sections: [
            section({
              name: "Main",
              icon: Blinds,
              column: "left",
              elements: [
                { type: "toggle", text: "Remove Barriers", value: false },
                { type: "button", text: "Discover Doodles" },
                { type: "button", text: "Obtain All Badges" },
                { type: "button", text: "Unlock All Documents" },
                { type: "divider", text: "Teleports" },
                { type: "button", text: "To Woed [Domains]" },
                { type: "button", text: "To Mayhem [HARD]" },
                { type: "button", text: "To ROT [EVIL]" },
              ],
            }),
            section({
              name: "Play",
              icon: Play,
              column: "left",
              elements: [
                { type: "button", text: "New Lobby [1,216.2% EXP]" },
                { type: "button", text: "Single-player Lobby [Base Game]" },
                { type: "divider", text: "Runs" },
                { type: "button", text: "Start Zen [Peaceful]" },
                { type: "button", text: "Start Reprieve [HARD]" },
              ],
            }),
            section({
              name: "Shop",
              icon: ShoppingCart,
              column: "right",
              elements: [
                { type: "button", text: "Enter Shop" },
                { type: "divider", text: "Traits" },
                { type: "button", text: "Use a Trait Charm" },
                { type: "divider", text: "Items" },
                { type: "dropdown", text: "Select Item", value: "Flashlight" },
                { type: "textbox", text: "Random Skin Amount", value: "3" },
                { type: "button", text: "Unlock Random Skin" },
                { type: "button", text: "Buy Best Style" },
                { type: "button", text: "Buy Cheapest Style" },
                { type: "button", text: "Buy All Styles" },
                { type: "divider", text: "Keys" },
                { type: "button", text: "Get Key Crown [100 Keys]" },
                { type: "button", text: "Open Cosmetics Key" },
                { type: "button", text: "Open Super Key" },
                { type: "button", text: "Open Vision Key" },
                { type: "button", text: "Open All Keys" },
              ],
            }),
          ],
        },
        {
          name: "Goobers",
          order: 2,
          sections: [
            section({
              name: "Goobclick",
              icon: Crown,
              column: "left",
              elements: [
                { type: "toggle", text: "Auto Regoob", value: false },
                { type: "toggle", text: "Auto Click", value: false },
                { type: "slider", text: "Clicks / Second", value: 10, min: 1, max: 60 },
                { type: "toggle", text: "Auto Buy Upgrades", value: false },
                { type: "divider", text: "Actions" },
                { type: "textbox", text: "Goobers Amount", value: "0" },
                { type: "button", text: "Give Goobers" },
                { type: "button", text: "Force Regoob" },
                { type: "button", text: "Save Goober Data" },
              ],
            }),
          ],
        },
      ],
    },
    LOBBY_PLAYER_TAB,
    ...SHARED_TABS,
  ],
};

// â”€â”€ Grace â€“ In-Game (Normal) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const GRACE_INGAME_NORMAL: MileniumConfig = {
  gameName: "Grace [GRACE BUT EVIL]",
  placeId: 110333320616502,
  tabs: [
    {
      name: "Gameplay",
      icon: Play,
      order: 1010,
      pages: [
        { name: "Main", order: 1, sections: ingameMainSections() },
      ],
    },
    INGAME_PLAYER_TAB,
    ...SHARED_TABS,
  ],
};

// â”€â”€ Grace â€“ In-Game (Mayhem) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const GRACE_INGAME_MAYHEM: MileniumConfig = {
  gameName: "Grace [GRACE BUT EVIL]",
  placeId: 110333320616502,
  tabs: [
    {
      name: "Gameplay",
      icon: Play,
      order: 1010,
      pages: [
        { name: "Main", order: 1, sections: ingameMainSections() },
      ],
    },
    {
      name: "Mayhem",
      icon: Heart,
      order: 1011,
      pages: [
        {
          name: "Main",
          order: 1,
          sections: mayhemSections(),
        },
      ],
    },
    INGAME_PLAYER_TAB,
    ...SHARED_TABS,
  ],
};

// â”€â”€ Grace â€“ rOT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const GRACE_ROT: MileniumConfig = {
  gameName: "Grace [GRACE BUT EVIL]",
  placeId: 110333320616502,
  tabs: [
    {
      name: "rOT",
      icon: RefreshCcw,
      order: 1013,
      pages: [
        {
          name: "Main",
          order: 1,
          sections: rotMainSections(),
        },
      ],
    },
    {
      name: "Visuals",
      icon: EyeOff,
      order: 1014,
      pages: [
        {
          name: "Main",
          order: 1,
          sections: rotVisualSections(),
        },
      ],
    },
    INGAME_PLAYER_TAB,
    ...SHARED_TABS,
  ],
};

// â”€â”€ Grace â€“ Domains â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const GRACE_DOMAINS: MileniumConfig = {
  gameName: "Grace [GRACE BUT EVIL]",
  placeId: 110333320616502,
  tabs: [
    {
      name: "Domain",
      icon: SlidersHorizontal,
      order: 1010,
      pages: [
        {
          name: "Main",
          order: 1,
          sections: domainSections(),
        },
      ],
    },
    {
      name: "Carnation",
      icon: Sparkles,
      order: 1011,
      pages: [
        {
          name: "Main",
          order: 1,
          sections: carnationSections(),
        },
      ],
    },
    {
      name: "Sorrow",
      icon: Sparkles,
      order: 1012,
      pages: [
        {
          name: "Main",
          order: 1,
          sections: sorrowSections(),
        },
      ],
    },
    {
      name: "Litany",
      icon: Sparkles,
      order: 1013,
      pages: [
        {
          name: "Main",
          order: 1,
          sections: litanySections(),
        },
      ],
    },
    INGAME_PLAYER_TAB,
    ...SHARED_TABS,
  ],
};

// â”€â”€ Dataset map â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const GRACE_DATASETS: Record<string, MileniumConfig> = {
  "Lobby":             GRACE_LOBBY,
  "In-Game (Normal)":  GRACE_INGAME_NORMAL,
  "In-Game (Mayhem)":  GRACE_INGAME_MAYHEM,
  "rOT":               GRACE_ROT,
  "Domains":           GRACE_DOMAINS,
};
