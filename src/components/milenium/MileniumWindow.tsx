"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

// ── Milenium design tokens (exact rgb values from milenium.lua) ───────────────
export const ACCENT = "#f8bfd4";       // rgb(248,191,212)
const MUTED = "#484849";               // rgb(72,72,73)
const DARK_BG = "#0e0e10";             // rgb(14,14,16)
const SIDEBAR_DIVIDER = "#151517";     // rgb(21,21,23)
const TAB_ACTIVE_BG = "#1d1d1d";       // rgb(29,29,29)
const PAGE_MUTED = "#3e3e3f";          // rgb(62,62,63)
const SECTION_OUTER = "#19191d";       // rgb(25,25,29)
const SECTION_INNER = "#161618";       // rgb(22,22,24)
const SECTION_HEADER_BG = "#131315";   // rgb(19,19,21)
const SECTION_HDR_LINE = "#242425";    // rgb(36,36,37)
const BTN_BG = "#212123";              // rgb(33,33,35)
const EL_TEXT = "#f5f5f5";             // rgb(245,245,245)
const TOGGLE_OUTER_OFF = "#2a2a2d";
const TOGGLE_INNER_OFF = "#242426";
const TOGGLE_CIRCLE_OFF = "#565658";   // rgb(86,86,88)
const DIVIDER_LINE = "#242425";        // rgb(36,36,37)
const DIVIDER_LABEL_BG = "#161618";    // rgb(22,22,24)
const DIVIDER_LABEL_TEXT = "#76767a";  // rgb(118,118,122)
const INPUT_MUTED = "#565657";         // rgb(86,86,87)
const INFO_BG = "#171719";             // rgb(23,23,25)
const STROKE_COLOR = "#17171d";        // rgb(23,23,29)
const SLIDER_CIRCLE = "#f4f4f4";       // rgb(244,244,244)

const TITLE_TEXT_SIZE = 26;
const NAV_TEXT_SIZE = 14;
const SUBTAB_TEXT_SIZE = 13;
const SECTION_HEADER_TEXT_SIZE = 14;
const INFO_TEXT_SIZE = 10;
const FIELD_LABEL_TEXT_SIZE = 14;
const TOGGLE_LABEL_TEXT_SIZE = 14;
const FIELD_VALUE_TEXT_SIZE = 11;
const DIVIDER_TEXT_SIZE = 11;
const FIELD_TEXT_WEIGHT = 300;

const iconTransitionStyle: React.CSSProperties = {
  transition: "color 0.25s ease, opacity 0.25s ease, transform 0.25s ease",
};

// ── Element types ─────────────────────────────────────────────────────────────
export interface ToggleEl {
  type: "toggle";
  text: string;
  value: boolean;
}
export interface SliderEl {
  type: "slider";
  text: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
}
export interface NumberEl {
  type: "number";
  text: string;
  value: number;
}
export interface TextboxEl {
  type: "textbox";
  text: string;
  value: string;
  placeholder?: string;
}
export interface LabelEl {
  type: "label";
  text: string;
  muted?: boolean;
}
export interface ColorEl {
  type: "color";
  text: string;
  value: string;
}
export interface KeybindEl {
  type: "keybind";
  text: string;
  value: string;
}
export interface DividerEl {
  type: "divider";
  text?: string;
}
export interface ButtonEl {
  type: "button";
  text: string;
}
export interface DropdownEl {
  type: "dropdown";
  text: string;
  value: string;
  width?: number;
  multi?: boolean;
}
export type UIEl =
  | ToggleEl
  | SliderEl
  | NumberEl
  | TextboxEl
  | LabelEl
  | ColorEl
  | KeybindEl
  | DividerEl
  | ButtonEl
  | DropdownEl;

type IconComponent = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
export interface SpriteIconDef {
  kind: "sprite";
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  sheetWidth: number;
  sheetHeight: number;
}
type IconDef = IconComponent | SpriteIconDef;

const singleLineTextStyle: React.CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
};

function isSpriteIcon(icon: IconDef): icon is SpriteIconDef {
  return typeof icon === "object" && icon !== null && "kind" in icon && icon.kind === "sprite";
}

function RenderIcon({
  icon,
  size,
  color,
  strokeWidth,
}: {
  icon: IconDef;
  size: number;
  color: string;
  strokeWidth?: number;
}) {
  if (isSpriteIcon(icon)) {
    const scale = size / icon.width;
    return (
      <span
        aria-hidden
        style={{
          width: size,
          height: size,
          display: "inline-block",
          backgroundColor: color,
          WebkitMaskImage: `url(${icon.src})`,
          maskImage: `url(${icon.src})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: `${icon.sheetWidth * scale}px ${icon.sheetHeight * scale}px`,
          maskSize: `${icon.sheetWidth * scale}px ${icon.sheetHeight * scale}px`,
          WebkitMaskPosition: `${-icon.x * scale}px ${-icon.y * scale}px`,
          maskPosition: `${-icon.x * scale}px ${-icon.y * scale}px`,
          flexShrink: 0,
        }}
      />
    );
  }

  const Component = icon;
  return <Component size={size} color={color} strokeWidth={strokeWidth} />;
}

export interface SectionDef {
  name: string;
  column: "left" | "right";
  icon?: IconDef;
  size?: number;
  elements: UIEl[];
}
export interface PageDef {
  name: string;
  order: number;
  sections: SectionDef[];
}
export interface TabDef {
  name: string;
  order: number;
  isSeparator?: boolean;
  icon?: IconDef;
  pages: PageDef[];
}
export interface MileniumConfig {
  tabs: TabDef[];
  gameName: string;
  placeId: number;
}

// ── Element renderers ─────────────────────────────────────────────────────────
function ToggleRenderer({ el }: { el: ToggleEl }) {
  const [on, setOn] = useState(el.value);
  return (
    <div
      className="flex flex-row items-center justify-between cursor-pointer select-none"
      style={{ minHeight: 18 }}
      onClick={() => setOn((v) => !v)}
    >
      <span style={{ ...singleLineTextStyle, fontSize: TOGGLE_LABEL_TEXT_SIZE, color: EL_TEXT, fontWeight: FIELD_TEXT_WEIGHT, lineHeight: 1.1, paddingLeft: 5, paddingRight: 8, flex: "1 1 auto", textAlign: "left" }}>{el.text}</span>
      {/* 36×18 toggle */}
      <div
        className="relative shrink-0 rounded-full transition-colors duration-150"
        style={{ width: 36, height: 18, background: on ? ACCENT : TOGGLE_OUTER_OFF }}
      >
        {/* inner track: 1px inset */}
        <div
          className="absolute rounded-full transition-colors duration-150"
          style={{ top: 1, left: 1, right: 1, bottom: 1, background: on ? ACCENT : TOGGLE_INNER_OFF }}
        />
        {/* circle 12×12: off=(0,2,0,2) on=(1,-14,0,2) → left: on?22:2 */}
        <div
          className="absolute rounded-full transition-all duration-150"
          style={{
            width: 12,
            height: 12,
            top: "50%",
            left: on ? 22 : 2,
            transform: "translateY(-50%)",
            background: on ? "white" : TOGGLE_CIRCLE_OFF,
          }}
        />
      </div>
    </div>
  );
}

function NumberRenderer({ el }: { el: NumberEl }) {
  const [val, setVal] = useState(String(el.value));
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col">
      <span style={{ ...singleLineTextStyle, fontSize: FIELD_LABEL_TEXT_SIZE, color: EL_TEXT, fontWeight: FIELD_TEXT_WEIGHT, lineHeight: 1.1, padding: "0 5px", textAlign: "left" }}>{el.text}</span>
      {/* Lua: right_components at (4,19), padding top 4 right 4; input size (1,-4, 0, 30), corner 3 */}
      <div style={{ padding: "4px 4px 0 4px" }}>
        <input
          type="text"
          inputMode="numeric"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="rounded-[3px] outline-none text-center"
          style={{
            background: BTN_BG,
            border: "none",
            color: focused ? EL_TEXT : "#484848",
            fontSize: FIELD_VALUE_TEXT_SIZE,
            fontWeight: FIELD_TEXT_WEIGHT,
            width: "100%",
            height: 30,
            padding: "0 6px",
            fontFamily: "inherit",
          }}
          aria-label={el.text}
        />
      </div>
    </div>
  );
}

function TextboxRenderer({ el }: { el: TextboxEl }) {
  const [val, setVal] = useState(el.value);
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col">
      <span style={{ ...singleLineTextStyle, fontSize: FIELD_LABEL_TEXT_SIZE, color: EL_TEXT, fontWeight: FIELD_TEXT_WEIGHT, lineHeight: 1.1, padding: "0 5px", textAlign: "left" }}>{el.text}</span>
      <div style={{ padding: "4px 4px 0 4px" }}>
        <input
          type="text"
          value={val}
          placeholder={el.placeholder}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="rounded-[3px] outline-none text-center"
          style={{
            background: BTN_BG,
            border: "none",
            color: focused ? EL_TEXT : "#484848",
            fontSize: FIELD_VALUE_TEXT_SIZE,
            fontWeight: FIELD_TEXT_WEIGHT,
            width: "100%",
            height: 30,
            padding: "0 6px",
            fontFamily: "inherit",
          }}
          aria-label={el.text}
        />
      </div>
    </div>
  );
}

function SliderRenderer({ el }: { el: SliderEl }) {
  const clamp = (v: number) => Math.max(el.min, Math.min(el.max, v));
  const [val, setVal] = useState(clamp(el.value));
  const [editing, setEditing] = useState(false);
  const [textValue, setTextValue] = useState(String(clamp(el.value)));
  const pct = ((val - el.min) / (el.max - el.min)) * 100;

  const formatValue = (value: number, withSuffix: boolean) => {
    const rendered = Number.isInteger(value) ? String(value) : String(value);
    return withSuffix ? `${rendered}${el.suffix ?? ""}` : rendered;
  };

  const commitValue = (raw: string) => {
    const parsed = Number.parseFloat(raw);
    if (!Number.isNaN(parsed)) {
      const next = clamp(parsed);
      setVal(next);
      setTextValue(formatValue(next, false));
      return;
    }
    setTextValue(formatValue(val, false));
  };

  return (
    <div className="flex flex-col">
      {/* Lua: name padding 5px L/R, value padding 5px L/R, both textSize 16 */}
      <div className="flex flex-row items-center justify-between">
        <span style={{ ...singleLineTextStyle, fontSize: FIELD_LABEL_TEXT_SIZE, color: EL_TEXT, fontWeight: FIELD_TEXT_WEIGHT, lineHeight: 1.1, padding: "0 5px", flex: "1 1 auto", textAlign: "left" }}>{el.text}</span>
        <input
          type="text"
          value={editing ? textValue : formatValue(val, true)}
          onChange={(e) => setTextValue(e.target.value)}
          onFocus={() => {
            setEditing(true);
            setTextValue(formatValue(val, false));
          }}
          onBlur={() => {
            commitValue(textValue);
            setEditing(false);
          }}
          className="outline-none text-right bg-transparent"
          style={{
            color: editing ? EL_TEXT : MUTED,
            fontSize: FIELD_LABEL_TEXT_SIZE,
            fontWeight: FIELD_TEXT_WEIGHT,
            lineHeight: 1.1,
            padding: "0 5px",
            fontFamily: "inherit",
            width: 56,
            minWidth: 56,
            maxWidth: 56,
            flexShrink: 0,
          }}
          aria-label={`${el.text} value`}
        />
      </div>
      {/* Lua: right_components at (4,23), padding top 4; slider 4px tall, circle 12×12 rgb(244,244,244) */}
      <div style={{ padding: "4px 4px 2px 4px" }}>
        <div className="relative w-full rounded-full" style={{ height: 4, background: BTN_BG }}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: ACCENT }} />
          <div
            className="absolute top-1/2 -translate-y-1/2 rounded-full"
            style={{ width: 12, height: 12, left: `calc(${pct}% - 6px)`, background: SLIDER_CIRCLE }}
          />
          <input
            type="range"
            min={el.min}
            max={el.max}
            step={(el.max - el.min) / 100}
            value={val}
            onChange={(e) => {
              const next = clamp(parseFloat(e.target.value));
              setVal(next);
              setTextValue(formatValue(next, false));
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label={el.text}
          />
        </div>
      </div>
      {/* Bottom separator line (matches Lua slider separator) */}
      <div style={{ height: 1, background: DIVIDER_LINE, marginTop: 6 }} />
    </div>
  );
}

function DividerRenderer({ el }: { el: DividerEl }) {
  if (!el.text) {
    return (
      <div style={{ height: 18, display: "flex", alignItems: "center" }}>
        <div style={{ height: 1, width: "100%", background: DIVIDER_LINE }} />
      </div>
    );
  }
  return (
    <div className="relative flex items-center" style={{ height: 18 }}>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2" style={{ height: 1, background: DIVIDER_LINE }} />
      <span
        className="relative mx-auto whitespace-nowrap rounded-full"
        style={{
          fontSize: DIVIDER_TEXT_SIZE,
          color: DIVIDER_LABEL_TEXT,
          background: DIVIDER_LABEL_BG,
          fontWeight: FIELD_TEXT_WEIGHT,
          padding: "2px 13px",
          lineHeight: 1.1,
        }}
      >
        {el.text}
      </span>
    </div>
  );
}

function LabelRenderer({ el }: { el: LabelEl }) {
  return (
    <div style={{
      color: el.muted ? MUTED : EL_TEXT,
      fontSize: el.muted ? 11 : 12,
      fontWeight: FIELD_TEXT_WEIGHT,
      lineHeight: 1.1,
      padding: "0 5px",
      whiteSpace: "pre",
      overflow: "hidden",
    }}>
      {el.text}
    </div>
  );
}

function ColorRenderer({ el }: { el: ColorEl }) {
  return (
    <div className="flex flex-row items-center justify-between" style={{ minHeight: 16 }}>
      <span style={{ ...singleLineTextStyle, fontSize: FIELD_LABEL_TEXT_SIZE, color: EL_TEXT, fontWeight: FIELD_TEXT_WEIGHT, lineHeight: 1.1, padding: "0 5px", flex: "1 1 auto", paddingRight: 8, textAlign: "left" }}>{el.text}</span>
      <div
        className="rounded-[4px]"
        style={{
          width: 16,
          height: 16,
          background: el.value,
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div
          className="absolute rounded-[4px]"
          style={{ inset: 1, background: el.value }}
        />
      </div>
    </div>
  );
}

function KeybindRenderer({ el }: { el: KeybindEl }) {
  return (
    <div className="flex flex-row items-center justify-between" style={{ minHeight: 16 }}>
      <span style={{ ...singleLineTextStyle, fontSize: FIELD_LABEL_TEXT_SIZE, color: EL_TEXT, fontWeight: FIELD_TEXT_WEIGHT, lineHeight: 1.1, padding: "0 5px", flex: "1 1 auto", paddingRight: 8, textAlign: "left" }}>{el.text}</span>
      <div
        className="rounded-[4px]"
        style={{
          minWidth: 36,
          height: 16,
          background: BTN_BG,
          padding: "0 5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexShrink: 0,
        }}
      >
        <span style={{ ...singleLineTextStyle, fontSize: FIELD_VALUE_TEXT_SIZE, color: INPUT_MUTED, fontWeight: FIELD_TEXT_WEIGHT, lineHeight: 1.1, paddingTop: 1 }}>
          {el.value}
        </span>
      </div>
    </div>
  );
}

function ButtonRenderer({ el }: { el: ButtonEl }) {
  return (
    <div style={{ padding: "0 4px" }}>
      <button
        className="w-full flex items-center justify-center shrink-0"
        style={{
          height: 30,
          borderRadius: 3,
          background: BTN_BG,
          color: EL_TEXT,
          fontSize: FIELD_VALUE_TEXT_SIZE,
          fontWeight: FIELD_TEXT_WEIGHT,
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {el.text}
      </button>
    </div>
  );
}

function DropdownRenderer({ el }: { el: DropdownEl }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between cursor-pointer" style={{ minHeight: 16 }}>
        <span style={{ ...singleLineTextStyle, fontSize: FIELD_LABEL_TEXT_SIZE, color: EL_TEXT, fontWeight: FIELD_TEXT_WEIGHT, lineHeight: 1.1, paddingLeft: 5, paddingRight: 8, flex: "1 1 auto", textAlign: "left" }}>{el.text}</span>
        <div
          className="flex items-center shrink-0 rounded-[4px]"
          style={{
            width: el.width ?? 100,
            height: 16,
            background: BTN_BG,
          }}
        >
          <span
            className="truncate"
            style={{
              fontSize: FIELD_VALUE_TEXT_SIZE,
              color: INPUT_MUTED,
              fontWeight: FIELD_TEXT_WEIGHT,
              padding: "1px 5px 0 5px",
              flex: "1 1 0",
              lineHeight: 1.1,
            }}
          >{el.value}</span>
          {/* Open/external icon matching Lua UI */}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, marginRight: 5 }}>
            <path d="M4 1H2C1.448 1 1 1.448 1 2V8C1 8.552 1.448 9 2 9H8C8.552 9 9 8.552 9 8V6" stroke={INPUT_MUTED} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.5 1H9V3.5" stroke={INPUT_MUTED} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 1L5 5" stroke={INPUT_MUTED} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      {/* Bottom separator line */}
      <div style={{ height: 1, background: DIVIDER_LINE, marginTop: 6 }} />
    </div>
  );
}

function ElementRenderer({ el }: { el: UIEl }) {
  switch (el.type) {
    case "toggle":   return <ToggleRenderer el={el} />;
    case "slider":   return <SliderRenderer el={el} />;
    case "number":   return <NumberRenderer el={el} />;
    case "textbox":  return <TextboxRenderer el={el} />;
    case "divider":  return <DividerRenderer el={el} />;
    case "label":    return <LabelRenderer el={el} />;
    case "color":    return <ColorRenderer el={el} />;
    case "keybind":  return <KeybindRenderer el={el} />;
    case "button":   return <ButtonRenderer el={el} />;
    case "dropdown": return <DropdownRenderer el={el} />;
    default:         return null;
  }
}

function resolveSectionWeights(sections: SectionDef[]) {
  if (sections.length === 0) {
    return [];
  }

  const explicitTotal = sections.reduce((sum, section) => sum + (section.size ?? 0), 0);
  const autoCount = sections.filter((section) => section.size == null).length;

  if (autoCount > 0 && explicitTotal < 1) {
    const autoSize = (1 - explicitTotal) / autoCount;
    return sections.map((section) => section.size ?? autoSize);
  }

  const total = sections.reduce((sum, section) => sum + (section.size ?? 1), 0) || 1;
  return sections.map((section) => (section.size ?? 1) / total);
}

// ── Section renderer ──────────────────────────────────────────────────────────
function SectionRenderer({ sec }: { sec: SectionDef }) {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ background: SECTION_OUTER, borderRadius: 7, minHeight: 0, height: "100%" }}
    >
      {/* Inline: 1px inset on all sides */}
      <div
        className="flex flex-col overflow-hidden"
        style={{ margin: 1, borderRadius: 7, background: SECTION_INNER, minHeight: 0, flex: 1 }}
      >
        {/* Section header: height 35, bg rgb(19,19,21) */}
        <div
          className="relative flex flex-row items-center shrink-0"
          style={{
            height: 35,
            background: SECTION_HEADER_BG,
            borderRadius: "7px 7px 0 0",
          }}
        >
          {/* Icon 22×22 at x=10, vertically centered with -1 offset */}
          <div className="flex items-center justify-center shrink-0" style={{ width: 22, height: 22, marginLeft: 10, marginTop: -1 }}>
            {sec.icon
              ? <RenderIcon icon={sec.icon} size={20} color={ACCENT} strokeWidth={1.75} />
              : <div className="rounded-full" style={{ width: 8, height: 8, background: ACCENT }} />
            }
          </div>
          {/* Title: font SemiBold textSize 16, at x=40 (10+22+8=40), y offset -1 */}
          <span style={{ fontSize: SECTION_HEADER_TEXT_SIZE, color: "white", fontWeight: 600, marginLeft: 8, marginTop: -1, lineHeight: 1.1 }}>{sec.name}</span>
          {/* Bottom line: rgb(36,36,37) */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: 1, background: SECTION_HDR_LINE }}
          />
        </div>

        {/* Scrollable elements: position (0,35), padding 10 sides, 15 bottom, gap 10 */}
        <div
          className="milenium-section-scroll flex-1 overflow-y-auto overflow-x-hidden"
          style={{ padding: "10px 10px 15px", minHeight: 0 }}
        >
          <div className="flex flex-col" style={{ gap: 10 }}>
            {sec.elements.map((el, idx) => (
              <ElementRenderer key={idx} el={el} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main window ───────────────────────────────────────────────────────────────
export function MileniumWindow({ tabs, gameName, placeId }: MileniumConfig) {
  const sortedItems = [...tabs].sort((a, b) => a.order - b.order);
  const clickableTabs = sortedItems.filter((t) => !t.isSeparator);
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [activePageIdx, setActivePageIdx] = useState(0);
  const [transitionNonce, setTransitionNonce] = useState(0);
  const initialRenderRef = useRef(true);

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    setTransitionNonce((value) => value + 1);
  }, [activeTabIdx, activePageIdx]);

  const selectTab = useCallback((logicalIdx: number) => {
    setActiveTabIdx(logicalIdx);
    setActivePageIdx(0);
  }, []);

  const activeTab = clickableTabs[activeTabIdx];
  const sortedPages = activeTab
    ? [...activeTab.pages].sort((a, b) => a.order - b.order)
    : [];
  const activePage = sortedPages[activePageIdx];

  const leftSections = activePage?.sections.filter((s) => s.column === "left") ?? [];
  const rightSections = activePage?.sections.filter((s) => s.column === "right") ?? [];
  const leftWeights = resolveSectionWeights(leftSections);
  const rightWeights = resolveSectionWeights(rightSections);
  const columnGroups = [
    { key: "left", sections: leftSections, weights: leftWeights },
    { key: "right", sections: rightSections, weights: rightWeights },
  ].filter((group) => group.sections.length > 0);

  return (
    <div
      className={cn(inter.className, "relative overflow-hidden text-white select-none")}
      style={{
        width: 700,
        height: 565,
        background: DARK_BG,
        border: `1px solid ${STROKE_COLOR}`,
        borderRadius: 10,
        boxShadow: "0 24px 64px rgba(0, 0, 0, 0.45)",
      }}
    >
      {/* ── Sidebar: width 196, bottom 25 ── */}
      <div
        className="absolute top-0 left-0 flex flex-col"
        style={{ width: 196, bottom: 25 }}
      >
        {/* Right divider line: 1px, rgb(21,21,23) */}
        <div className="absolute top-0 right-0" style={{ width: 1, height: "100%", background: SIDEBAR_DIVIDER }} />

        {/* Title: height 70, font SemiBold textSize 30, paddingLeft 14 */}
        <div className="flex items-center justify-center shrink-0" style={{ height: 70 }}>
          <span style={{ color: ACCENT, fontSize: TITLE_TEXT_SIZE, fontWeight: 600, lineHeight: 1.1 }}>
            <u>lumin</u>
            <span style={{ color: "white" }}>.rest</span>
          </span>
        </div>

        {/* Tab list: padding top 16, bottom 36, left 10, right 11, gap 5 */}
        <div
          className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
          style={{ padding: "16px 11px 36px 10px", gap: 5 }}
        >
          {(() => {
            let logicalIdx = 0;
            return sortedItems.map((item, i) => {
              if (item.isSeparator) {
                // Lua: font SemiBold, textSize 16, color rgb(72,72,73), padding 5px L/R
                return (
                  <div
                    key={`sep-${i}`}
                    style={{
                      color: MUTED,
                      fontSize: NAV_TEXT_SIZE,
                      fontWeight: 600,
                      padding: "10px 5px 0 5px",
                      lineHeight: 1.1,
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    {item.name}
                  </div>
                );
              }
              const _idx = logicalIdx++;
              const isActive = _idx === activeTabIdx;
              return (
                <button
                  key={i}
                  onClick={() => selectTab(_idx)}
                  className="flex flex-row items-center shrink-0 text-left"
                  style={{
                    height: 35,
                    borderRadius: 7,
                    padding: "0 10px",
                    background: isActive ? TAB_ACTIVE_BG : "transparent",
                    color: isActive ? "white" : MUTED,
                    fontSize: NAV_TEXT_SIZE,
                    fontWeight: 600,
                    gap: 8,
                    cursor: "pointer",
                    border: "none",
                    fontFamily: "inherit",
                    lineHeight: 1.1,
                    transition: "background-color 0.25s ease, color 0.25s ease",
                  }}
                >
                  {/* Icon 22×22 */}
                  {item.icon
                    ? (
                      <span style={iconTransitionStyle}>
                        <RenderIcon icon={item.icon} size={22} color={isActive ? ACCENT : MUTED} strokeWidth={1.75} />
                      </span>
                    )
                    : <div className="shrink-0 rounded-full" style={{ width: 7, height: 7, background: isActive ? ACCENT : MUTED, transition: "background-color 0.25s ease" }} />
                  }
                  {item.name}
                </button>
              );
            });
          })()}
        </div>
      </div>

      {/* ── Content area ── */}
      <div
        className="absolute flex flex-col overflow-hidden"
        style={{ top: 0, left: 196, right: 0, bottom: 25 }}
      >
        {/* Page tab bar: height 56, bottom divider line */}
        <div
          className="relative flex flex-row items-end shrink-0 overflow-x-auto"
          style={{ height: 56 }}
        >
          {/* Bottom divider: rgb(21,21,23) */}
          <div className="absolute bottom-0 left-0 right-0" style={{ height: 1, background: SIDEBAR_DIVIDER }} />
          {/* Page buttons: padding 8 top 7 bottom 7 left 7 right, gap 7 */}
          <div className="flex flex-row items-end" style={{ padding: "8px 7px 7px 7px", gap: 7 }}>
          {sortedPages.map((page, idx) => {
            const isActive = idx === activePageIdx;
            return (
              <button
                key={idx}
                onClick={() => setActivePageIdx(idx)}
                className="milenium-page-button relative flex items-center justify-center shrink-0 whitespace-nowrap"
                style={{
                  height: 39,
                  padding: "0 10px",
                  color: isActive ? "white" : PAGE_MUTED,
                  fontWeight: 600,
                  fontSize: SUBTAB_TEXT_SIZE,
                  background: isActive ? SECTION_OUTER : "transparent",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: 7,
                  fontFamily: "inherit",
                  lineHeight: 1.1,
                  transition: "background-color 0.25s ease, color 0.25s ease",
                }}
              >
                {page.name}
                {/* Active accent pill: bottom+4, left 10 right 10, height 6, corner 999 */}
                {isActive && (
                  <div
                    className="absolute"
                    style={{
                      bottom: -2,
                      left: 10,
                      right: 10,
                      height: 2,
                      background: ACCENT,
                      borderRadius: 999,
                      transition: "opacity 0.25s ease, transform 0.25s ease",
                    }}
                  />
                )}
              </button>
            );
          })}
          </div>
        </div>

        {/* Two-column section layout: padding 7, gap 7 */}
        <div
          key={transitionNonce}
          className="milenium-content-switch flex-1 flex flex-row overflow-hidden"
          style={{ padding: 7, gap: 7 }}
        >
          {columnGroups.map((group) => (
            <div key={group.key} className="milenium-content-column flex flex-col flex-1 overflow-hidden" style={{ gap: 8 }}>
              {group.sections.map((sec, idx) => (
                <div key={idx} style={{ flexGrow: group.weights[idx], flexBasis: 0, minHeight: 0 }}>
                  <SectionRenderer sec={sec} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div key={`fade-${transitionNonce}`} className="milenium-global-fade" />
      </div>

      {/* ── Info bar: height 25, bg rgb(23,23,25), corner 10 at bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-between overflow-hidden"
        style={{
          height: 25,
          background: INFO_BG,
          borderRadius: "0 0 10px 10px",
          padding: "0 10px",
        }}
      >
        {/* Game name: font SemiBold textSize 14 rgb(72,72,73), position (10, center-1) */}
        <span style={{ color: MUTED, fontSize: INFO_TEXT_SIZE, fontWeight: 600, lineHeight: 1.1, marginTop: -1 }}>{gameName}</span>
        {/* Right: placeId in grey, name+suffix in accent, position (-10, center-1) right aligned */}
        <span style={{ fontSize: INFO_TEXT_SIZE, fontWeight: 600, lineHeight: 1.1, marginTop: -1 }}>
          <span style={{ color: MUTED }}>{placeId}&nbsp;&nbsp;</span>
          <span style={{ color: ACCENT }}>lumin.rest</span>
        </span>
      </div>
      <style jsx global>{`
        .milenium-global-fade {
          position: absolute;
          top: 56px;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${DARK_BG};
          pointer-events: none;
          opacity: 0;
          animation: mileniumGlobalFade 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .milenium-content-switch {
          animation: mileniumContentSwitch 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: center center;
        }

        .milenium-content-column {
          animation: mileniumContentColumn 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .milenium-page-button {
          transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }

        .milenium-page-button:hover {
          transform: translateY(-1px);
        }

        .milenium-section-scroll {
          scrollbar-width: thin;
          scrollbar-color: #2c2c2e transparent;
        }

        .milenium-section-scroll::-webkit-scrollbar {
          width: 2px;
        }

        .milenium-section-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .milenium-section-scroll::-webkit-scrollbar-thumb {
          background: #2c2c2e;
          border-radius: 999px;
        }

        @keyframes mileniumGlobalFade {
          0% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }

        @keyframes mileniumContentSwitch {
          0% {
            opacity: 0.92;
            transform: scale(0.968);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes mileniumContentColumn {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
