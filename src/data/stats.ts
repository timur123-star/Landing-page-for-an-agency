export type Stat = {
  key: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** When true, suffix is read from translations (stats.items.<key>.suffix). */
  localizedSuffix?: boolean;
  /** Percent of the underline progress bar to fill (0–100). */
  progressPercent?: number;
};

export const stats: Stat[] = [
  { key: "projects", value: 142, suffix: "+", progressPercent: 92 },
  { key: "conversion", value: 38, suffix: "%", progressPercent: 78 },
  { key: "rating", value: 4.9, decimals: 1, suffix: " / 5", progressPercent: 98 },
  { key: "speed", value: 6, localizedSuffix: true, progressPercent: 60 },
];
