import type { LucideIcon } from "lucide-react";
import {
  Layers,
  PenTool,
  LineChart,
  Code2,
  Sparkles,
  Rocket,
} from "lucide-react";

export type Service = {
  key: string;
  icon: LucideIcon;
  badged?: boolean;
};

export const services: Service[] = [
  { key: "branding", icon: PenTool },
  { key: "product", icon: Layers, badged: true },
  { key: "web", icon: Code2 },
  { key: "performance", icon: LineChart },
  { key: "content", icon: Sparkles },
  { key: "launch", icon: Rocket },
];
