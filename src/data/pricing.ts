export type PricingTier = {
  key: string;
  highlighted?: boolean;
  badged?: boolean;
};

export const pricingTiers: PricingTier[] = [
  { key: "start" },
  { key: "growth", highlighted: true, badged: true },
  { key: "studio" },
];
