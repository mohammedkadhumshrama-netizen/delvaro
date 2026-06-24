import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function CaseStudies() {
  const cases = [
    { metric: "+370%", label: "Qualified leads", client: "Enterprise SaaS" },
    { metric: "+210%", label: "Booked meetings", client: "B2B Financial" },
    { metric: "+64%",  label: "Sales efficiency", client: "Legal Tech" }
  ];

  return (
    <section className="py-32 bg-surface/20 border-y border-white/5" id="case-studies">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Proven Revenue Scaling
            </h2>
            <p className="text-lg text-muted font-light">
              We replace inefficient manual prospecting with scalable, autonomous AI systems.
            </p>
          </div>
          <button className="text-white hover:text-accent font-medium transition-colors flex items-center gap-1 group">
            View All Case Studies
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-8 pb-12 rounded-2xl glass border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              
              <div className="text-sm font-medium text-muted mb-12 uppercase tracking-widest">{cs.client}</div>
              
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                className="text-6xl md:text-7xl font-bold text-white tracking-tighter mb-4"
              >
                {cs.metric}
              </motion.div>
              
              <div className="text-lg text-white/80 font-medium">{cs.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
