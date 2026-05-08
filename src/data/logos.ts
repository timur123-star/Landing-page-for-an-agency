export type Logo = {
  name: string;
  width: number;
  icon: string;
};

export const logos: Logo[] = [
  { name: "Lumen", width: 140, icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { name: "Atlas", width: 130, icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { name: "Northwind", width: 160, icon: "M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" },
  { name: "Orbit", width: 130, icon: "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0" },
  { name: "Mosaic", width: 150, icon: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" },
  { name: "Helio", width: 130, icon: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" },
  { name: "Vertex", width: 140, icon: "M12 2l9 4.5v7L12 18l-9-4.5v-7L12 2z" },
  { name: "Polar", width: 130, icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { name: "Aeon", width: 120, icon: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" },
];
