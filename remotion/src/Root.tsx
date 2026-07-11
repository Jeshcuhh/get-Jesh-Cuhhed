import React from "react";
import {
  AbsoluteFill,
  Composition,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { getVideoMetadata } from "@remotion/media-utils";
import captionsData from "./captions.json";

const VIDEO = "hairTone_edited.mp4";
const FPS = 30;
const INTRO_FRAMES = 60; // 2.0s intro card
const OUTRO_FRAMES = 75; // 2.5s outro card

const FONT =
  "'Poppins', 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const ROSE = "#ff5c8a";

type Props = {
  videoDurationInFrames: number;
};

// Section labels, timed to the sped-up montage stretches (video-local seconds).
const SECTIONS: { from: number; to: number; label: string }[] = [
  { from: 0.5, to: 21.5, label: "Prepping & mixing" },
  { from: 44, to: 62, label: "Measuring it out" },
  { from: 101, to: 144, label: "Applying the toner" },
  { from: 178.5, to: 216, label: "Working it through" },
  { from: 216.5, to: 265.5, label: "Rinse, dry & style" },
  { from: 266.6, to: 289, label: "The result ✨" },
];

// ---------------------------------------------------------------- Title card
const TitleCard: React.FC<{
  variant: "intro" | "outro";
  title: string;
  subtitle: string;
}> = ({ variant, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 20 });
  const outFade =
    variant === "outro"
      ? 1
      : interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const scale = interpolate(enter, [0, 1], [0.9, 1]);
  const y = interpolate(enter, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(120% 120% at 50% 20%, #52283a 0%, #2a1620 55%, #140b10 100%)",
        justifyContent: "center",
        alignItems: "center",
        opacity: Math.min(enter, outFade),
      }}
    >
      <div style={{ transform: `translateY(${y}px) scale(${scale})`, textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 96,
            letterSpacing: -2,
            color: "white",
            textShadow: "0 6px 30px rgba(0,0,0,0.5)",
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 22,
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: 38,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: ROSE,
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------- Section label
const SectionLabels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const active = SECTIONS.find((s) => t >= s.from && t < s.to);
  if (!active) return null;
  const inFade = interpolate(t, [active.from, active.from + 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outFade = interpolate(t, [active.to - 0.5, active.to], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(inFade, outFade);
  const y = interpolate(inFade, [0, 1], [-16, 0]);

  return (
    <AbsoluteFill style={{ padding: 56 }}>
      <div
        style={{
          alignSelf: "flex-start",
          transform: `translateY(${y}px)`,
          opacity,
          background: "rgba(20,11,16,0.72)",
          backdropFilter: "blur(6px)",
          border: `1px solid ${ROSE}`,
          borderRadius: 999,
          padding: "14px 30px",
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 34,
          color: "white",
          letterSpacing: 0.5,
        }}
      >
        {active.label}
      </div>
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ Captions
type Page = {
  startMs: number;
  endMs: number;
  tokens: { text: string; fromMs: number; toMs: number }[];
};

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const pages = captionsData.pages as Page[];
  const page = pages.find((p) => ms >= p.startMs && ms < p.endMs);
  if (!page) return null;

  const appear = interpolate(ms, [page.startMs, page.startMs + 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(appear, [0, 1], [24, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 130,
      }}
    >
      <div
        style={{
          maxWidth: "78%",
          textAlign: "center",
          transform: `translateY(${y}px)`,
          opacity: appear,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 18px",
        }}
      >
        {page.tokens.map((tok, i) => {
          const isActive = ms >= tok.fromMs && ms < tok.toMs;
          const wasSpoken = ms >= tok.toMs;
          return (
            <span
              key={i}
              style={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 68,
                lineHeight: 1.2,
                color: isActive ? ROSE : "white",
                transform: isActive ? "scale(1.08)" : "scale(1)",
                display: "inline-block",
                opacity: wasSpoken || isActive ? 1 : 0.82,
                textShadow:
                  "0 0 2px #000, 0 3px 12px rgba(0,0,0,0.85), 0 0 24px rgba(0,0,0,0.6)",
                WebkitTextStroke: "2px rgba(0,0,0,0.55)",
                transition: "none",
              }}
            >
              {tok.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- Info panels
type PanelItem = { name: string; desc?: string };
type Panel = {
  fromS: number;
  toS: number;
  title: string;
  items: PanelItem[];
  numbered?: boolean;
  compact?: boolean;
};

// Timed to the sped-up montage windows (video-local seconds, no speech there).
const PANELS: Panel[] = [
  {
    fromS: 2.5,
    toS: 20,
    title: "THE SUPPLIES",
    items: [
      { name: "Shades EQ 6T (Iron)", desc: "root tap" },
      { name: "Shades EQ 8T (Silver)", desc: "mids & ends" },
      { name: "Shades EQ 9P (Opal Glow)", desc: "mids & ends" },
      { name: "EQ Processing Solution", desc: "1:2 ratio with color" },
      { name: "Olaplex No. 1", desc: "a few drops per mix" },
      { name: "K18", desc: "post-rinse finishing mask" },
      { name: "Bowl, capes, scale, brush, gloves, timer" },
    ],
  },
  {
    fromS: 103,
    toS: 142,
    title: "THE METHOD",
    numbered: true,
    compact: true,
    items: [
      { name: "Start on towel-blotted wet hair" },
      { name: "Root tap: 15 ml 6T + 30 ml Processing + 1 drop Olaplex No. 1 — 1–1.5\" from scalp" },
      { name: "Mids & ends: equal parts 8T + 9P + Processing (1:2) + Olaplex No. 1" },
      { name: "Apply from the root-tap line through ends — saturate fully" },
      { name: "Process ~20 min — step away, go exercise" },
      { name: "Rinse thoroughly until the water runs clear" },
      { name: "Finish with a K18 treatment" },
    ],
  },
  {
    fromS: 218,
    toS: 242,
    title: "WASH & TREATMENT",
    compact: true,
    items: [
      { name: "FHI Heat UNbrush", desc: "barely any snag when brushed" },
      { name: "L'Oréal EverPure Bond Repair", desc: "daily color-safe wash" },
      { name: "Clarifying shampoo (double-wash)", desc: "strip buildup, keep tone" },
      { name: "ABC Deep Care Treatment", desc: "deep repair mask" },
      { name: "BlondMe Cool Blondes Mask", desc: "tone + hydration" },
      { name: "K18 Leave-In Molecular Mask", desc: "bond repair, holy grail" },
      { name: "Minoxidil", desc: "gold-standard regrowth" },
      { name: "Ketoconazole", desc: "dandruff / loss prevention" },
    ],
  },
  {
    fromS: 244,
    toS: 264,
    title: "LEAVE-IN & STYLING",
    items: [
      { name: "Oribe Leave-In Conditioner", desc: "lightweight detangle + moisture" },
      { name: "Pureology Hairspray", desc: "flexible hold, no crunch" },
      { name: "Garnier Fructis Sleek & Shine Serum", desc: "smoothing finish on ends" },
      { name: "CHI 44 Iron Guard Heat Protectant", desc: "before any heat — non-negotiable" },
    ],
  },
];

const InfoPanels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const p = PANELS.find((x) => t >= x.fromS && t < x.toS);
  if (!p) return null;

  const inFade = interpolate(t, [p.fromS, p.fromS + 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outFade = interpolate(t, [p.toS - 0.6, p.toS], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(inFade, outFade);
  const x = interpolate(inFade, [0, 1], [70, 0]);

  const nameSize = p.compact ? 27 : 31;
  const descSize = p.compact ? 23 : 26;
  const rowGap = p.compact ? 13 : 18;

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "flex-end", padding: "0 60px" }}
    >
      <div
        style={{
          width: "46%",
          maxWidth: 920,
          transform: `translateX(${x}px)`,
          opacity,
          background: "rgba(16,9,13,0.86)",
          borderRadius: 26,
          border: "1px solid rgba(255,92,138,0.45)",
          boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
          padding: "32px 40px",
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 38,
            letterSpacing: 3,
            color: ROSE,
            marginBottom: 22,
            paddingBottom: 16,
            borderBottom: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          {p.title}
        </div>
        {p.items.map((it, i) => {
          const itemOp = interpolate(
            t,
            [p.fromS + 0.25 + i * 0.11, p.fromS + 0.6 + i * 0.11],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 16,
                marginTop: i === 0 ? 0 : rowGap,
                opacity: itemOp,
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  flex: "0 0 auto",
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: p.numbered ? nameSize : 18,
                  color: ROSE,
                  minWidth: p.numbered ? 26 : 14,
                  lineHeight: 1.3,
                }}
              >
                {p.numbered ? `${i + 1}` : "•"}
              </span>
              <div style={{ lineHeight: 1.32 }}>
                <span
                  style={{
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: nameSize,
                    color: "white",
                  }}
                >
                  {it.name}
                </span>
                {it.desc ? (
                  <span
                    style={{
                      fontFamily: FONT,
                      fontWeight: 500,
                      fontSize: descSize,
                      color: "rgba(255,180,205,0.92)",
                    }}
                  >
                    {"  — " + it.desc}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// -------------------------------------------------------------- Main comp
const HairTone: React.FC<Props> = ({ videoDurationInFrames }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#140b10" }}>
      <Sequence durationInFrames={INTRO_FRAMES} name="Intro">
        <TitleCard variant="intro" title="HOW I TONE MY HAIR" subtitle="at-home salon routine" />
      </Sequence>

      <Sequence from={INTRO_FRAMES} durationInFrames={videoDurationInFrames} name="Tutorial">
        <AbsoluteFill>
          <OffthreadVideo src={staticFile(VIDEO)} />
        </AbsoluteFill>
        <SectionLabels />
        <InfoPanels />
        <Captions />
      </Sequence>

      <Sequence
        from={INTRO_FRAMES + videoDurationInFrames}
        durationInFrames={OUTRO_FRAMES}
        name="Outro"
      >
        <TitleCard variant="outro" title="thanks for watching ♡" subtitle="toned & done" />
      </Sequence>
    </AbsoluteFill>
  );
};

// --------------------------------------------------------------------- Root
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HairTone"
      component={HairTone}
      durationInFrames={INTRO_FRAMES + 9000 + OUTRO_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{ videoDurationInFrames: 9000 } as Props}
      calculateMetadata={async ({ props }) => {
        const meta = await getVideoMetadata(staticFile(VIDEO));
        const videoDurationInFrames = Math.round(meta.durationInSeconds * FPS);
        return {
          durationInFrames: INTRO_FRAMES + videoDurationInFrames + OUTRO_FRAMES,
          props: { ...props, videoDurationInFrames },
        };
      }}
    />
  );
};
