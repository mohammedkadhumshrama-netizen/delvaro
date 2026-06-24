import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-white to-cyan-400 z-[100]"
    />
  );
}
