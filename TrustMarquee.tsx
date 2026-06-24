import { motion } from "motion/react";

const companies = [
  "Microsoft",
  "Google",
  "Amazon",
  "Meta",
  "Netflix",
  "NVIDIA",
  "OpenAI",
  "Stripe",
  "Linear",
  "Vercel",
  "Anthropic",
  "Notion",
];

export function TrustMarquee() {
  // Duplicate to ensure seamless looping
  const marqueeItems = [...companies, ...companies];

  return (
    <section className="py-12 bg-background border-b border-white/5 overflow-hidden flex flex-col items-center">
      <p className="text-center text-xs font-semibold text-muted uppercase tracking-[0.2em] mb-8">
        Trusted by teams at the world's most innovative companies
      </p>
      <div className="relative w-full max-w-full flex">
        {/* Left and right fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center w-max gap-16 md:gap-24 px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
        >
          {marqueeItems.map((company, i) => (
            <div
              key={i}
              className="text-xl md:text-2xl font-bold text-white/30 tracking-tighter hover:text-white/60 transition-colors cursor-default whitespace-nowrap"
            >
              {company}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
