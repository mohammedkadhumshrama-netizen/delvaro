import { motion } from "motion/react";
import { XCircle, CheckCircle2 } from "lucide-react";

export function ComparisonSection() {
  const without = [
    "Missed inbound calls",
    "Manual follow-up delays",
    "Slow, generic websites",
    "Poor conversion tracking",
    "Lost lead opportunities",
  ];

  const withUs = [
    "AI answers instantly 24/7",
    "Automated qualification & booking",
    "Premium, conversion-engineered design",
    "Real-time pipeline analytics",
    "Capture & engage every lead",
  ];

  return (
    <section className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">The Paradigm Shift</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative items-center">
          {/* Subtle connecting VS element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex w-12 h-12 rounded-full bg-background border border-white/10 items-center justify-center font-bold text-muted text-sm shadow-xl">
            VS
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl bg-surface/30 border border-white/5"
          >
            <h3 className="text-2xl font-bold text-white/50 mb-8 inline-flex items-center gap-3">
              Traditional Model
            </h3>
            <ul className="space-y-6">
              {without.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-muted">
                  <XCircle className="w-6 h-6 text-red-400/50 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-accent/10 to-indigo-500/5 border border-accent/20 relative overflow-hidden shadow-[0_0_50px_rgba(14,165,233,0.1)]"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl pointer-events-none">
               <div className="w-64 h-64 bg-accent rounded-full" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-8 inline-flex items-center gap-3 relative z-10">
              Delvaro Architecture
            </h3>
            <ul className="space-y-6 relative z-10">
              {withUs.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-white">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
