"use client";

import * as React from "react";

export function SkipToContent() {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof document === "undefined") return;
    const main = document.querySelector("main");
    if (!main) return;
    if (!main.hasAttribute("tabindex")) {
      main.setAttribute("tabindex", "-1");
    }
    (main as HTMLElement).focus({ preventScroll: false });
    main.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <a
      href="#main"
      onClick={onClick}
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[200] focus-visible:rounded-full focus-visible:border focus-visible:border-border focus-visible:bg-background focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-foreground focus-visible:shadow-lg"
    >
      Skip to content
    </a>
  );
}
