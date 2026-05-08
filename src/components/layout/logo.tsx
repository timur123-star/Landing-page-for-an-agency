import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        aria-hidden="true"
        className="relative inline-flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 via-violet-500 to-fuchsia-500 text-white shadow-[0_8px_30px_-6px_hsl(var(--primary)/0.6)]"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow"
        >
          <path
            d="M2 12V2L12 12V2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-base font-semibold tracking-tight">
        NOVA
        <span className="text-muted-foreground">.studio</span>
      </span>
    </span>
  );
}
