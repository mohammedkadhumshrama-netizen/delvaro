import { motion } from "motion/react";
import { Cpu, LayoutTemplate, Zap, Shield, TrendingUp, Layers } from "lucide-react";

export function WhyChooseUs() {
  const points = [
    { icon: Cpu, title: "AI-First Approach", desc: "Native intelligence built into every component, not just bolted on." },
    { icon: LayoutTemplate, title: "Custom Implementation", desc: "Bespoke engineering tailored to your exact operational workflows." },
    { icon: Zap, title: "Fast Deployment", desc: "From strategy to fully functional live systems in a matter of weeks." },
    { icon: Layers, title: "No-Code Automation", desc: "Seamless system integration without taxing your internal engineering resources." },
    { icon: Shield, title: "Scalable Infrastructure", desc: "Built on enterprise-grade architecture that scales effortlessly with traffic volume." },
    { icon: TrendingUp, title: "Revenue-Focused", desc: "Every metric we track is directly tied to pipeline growth and booked revenue." },
  ];

  return (
    <section className="py-32 relative" id="why-us">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Why Delvaro</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl glass-card hover:bg-surface/60 transition-colors"
            >
              <point.icon className="w-8 h-8 text-white/70 mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
              <p className="text-muted font-light leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
