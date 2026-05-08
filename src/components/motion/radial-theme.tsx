"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type Ctx = {
  trigger: (next: "light" | "dark", origin: { x: number; y: number }) => void;
};

const RadialThemeCtx = React.createContext<Ctx | null>(null);

export function useRadialTheme() {
  return React.useContext(RadialThemeCtx);
}

export function RadialThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setTheme } = useTheme();
  const [overlay, setOverlay] = React.useState<{
    x: number;
    y: number;
    next: "light" | "dark";
    visible: boolean;
  } | null>(null);

  const trigger = React.useCallback(
    (next: "light" | "dark", origin: { x: number; y: number }) => {
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setTheme(next);
        return;
      }

      setOverlay({ x: origin.x, y: origin.y, next, visible: true });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTheme(next);
        });
      });

      window.setTimeout(() => {
        setOverlay(null);
      }, 720);
    },
    [setTheme],
  );

  return (
    <RadialThemeCtx.Provider value={{ trigger }}>
      {children}
      {overlay ? <RadialOverlay overlay={overlay} /> : null}
    </RadialThemeCtx.Provider>
  );
}

function RadialOverlay({
  overlay,
}: {
  overlay: { x: number; y: number; next: "light" | "dark"; visible: boolean };
}) {
  const radius = React.useMemo(() => {
    if (typeof window === "undefined") return 1200;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dx = Math.max(overlay.x, w - overlay.x);
    const dy = Math.max(overlay.y, h - overlay.y);
    return Math.ceil(Math.sqrt(dx * dx + dy * dy));
  }, [overlay.x, overlay.y]);

  const tone =
    overlay.next === "dark"
      ? "rgba(7, 8, 16, 0.96)"
      : "rgba(255, 255, 255, 0.96)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[150]"
    >
      <span
        className={cn("block")}
        style={{
          position: "absolute",
          left: overlay.x,
          top: overlay.y,
          width: radius * 2,
          height: radius * 2,
          marginLeft: -radius,
          marginTop: -radius,
          borderRadius: "9999px",
          background: tone,
          transform: "scale(0)",
          animation:
            "nova-radial-reveal 700ms cubic-bezier(0.7, 0, 0.3, 1) forwards",
        }}
      />
      <style>{`@keyframes nova-radial-reveal { to { transform: scale(1); opacity: 0; } }`}</style>
    </div>
  );
}
