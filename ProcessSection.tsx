import { motion } from "motion/react";

const steps = [
  { num: "01", title: "Discovery" },
  { num: "02", title: "Strategy" },
  { num: "03", title: "AI Deployment" },
  { num: "04", title: "Website Development" },
  { num: "05", title: "Funnel Integration" },
  { num: "06", title: "Automation" },
  { num: "07", title: "Launch" },
  { num: "08", title: "Optimization" },
];

export function ProcessSection() {
  return (
    <section className="py-32 border-t border-white/5 bg-surface/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            How We Build Your Revenue Machine
          </h2>
          <p className="text-lg text-muted font-light max-w-2xl mx-auto">
            A methodical, engineering-grade approach to deploying autonomous sales systems.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated linking line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 hidden md:block">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-accent"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-24 gap-x-6 relative">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center group"
              >
                {/* Node dot */}
                <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center relative z-10 group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-accent transition-colors" />
                </div>
                
                <div className="mt-6 text-center">
                  <div className="text-xs font-mono text-accent mb-2 tracking-widest">{step.num}</div>
                  <h3 className="text-sm font-semibold text-white tracking-wide">{step.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
