export function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative flex h-4 w-full items-center justify-center"
    >
      <div
        className={`absolute inset-x-0 top-1/2 h-px bg-gradient-to-r ${
          flip
            ? "from-transparent via-fuchsia-500/40 to-transparent"
            : "from-transparent via-primary/40 to-transparent"
        }`}
      />
      <div
        className={`absolute inset-x-[20%] top-1/2 -translate-y-px h-[3px] bg-gradient-to-r ${
          flip
            ? "from-transparent via-fuchsia-500/20 to-transparent"
            : "from-transparent via-primary/20 to-transparent"
        } blur-sm`}
      />
      <span
        className={`relative z-10 size-1.5 rotate-45 rounded-[1px] ${
          flip ? "bg-fuchsia-500/50" : "bg-primary/50"
        }`}
      />
    </div>
  );
}
