"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

function useHueFilter(value: MotionValue<number>) {
  return useTransform(value, (h) => `hue-rotate(${h}deg) blur(140px)`);
}

export function SectionHueShift() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const blob1X = useTransform(scrollYProgress, [0, 1], ["5%", "25%"]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["5%", "18%"]);
  const blob1Hue = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const blob1Filter = useHueFilter(blob1Hue);

  const blob2X = useTransform(scrollYProgress, [0, 1], ["55%", "30%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["15%", "35%"]);
  const blob2Hue = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const blob2Filter = useHueFilter(blob2Hue);

  const blob3X = useTransform(scrollYProgress, [0, 1], ["25%", "60%"]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], ["50%", "10%"]);
  const blob3Hue = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const blob3Filter = useHueFilter(blob3Hue);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.5, 1],
    [0, 0.25, 0.35, 0.25],
  );

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        style={{ x: blob1X, y: blob1Y, filter: blob1Filter }}
        className="absolute size-[35vmax] rounded-full bg-[radial-gradient(circle_at_30%_30%,#5159ff,transparent_60%)]"
      />
      <motion.div
        style={{ x: blob2X, y: blob2Y, filter: blob2Filter }}
        className="absolute size-[30vmax] rounded-full bg-[radial-gradient(circle_at_70%_50%,#d946ef,transparent_60%)]"
      />
      <motion.div
        style={{ x: blob3X, y: blob3Y, filter: blob3Filter }}
        className="absolute size-[28vmax] rounded-full bg-[radial-gradient(circle_at_50%_50%,#22d3ee,transparent_60%)]"
      />
    </motion.div>
  );
}
