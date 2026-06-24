import { motion } from "motion/react";
import { Mic, Globe, Users, Zap } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "AI Lead Generation",
    description: "Autonomous prospecting, outreach, qualification, and appointment booking.",
  },
  {
    icon: Mic,
    title: "AI Receptionists",
    description: "Human-like AI voice agents that answer calls instantly and never miss opportunities.",
  },
  {
    icon: Globe,
    title: "High-Converting Websites",
    description: "Beautiful custom websites engineered to maximize conversions.",
  },
  {
    icon: Zap,
    title: "Funnels & Automation",
    description: "Landing pages, CRM workflows, email sequences, and complete customer journeys.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-32 relative" id="services">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl text-left mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6"
          >
            Capabilities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted font-light"
          >
            We don't just build software. We engineer complete revenue systems designed to work autonomously.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-2xl glass-card relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
              
              <div className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:border-accent/50 transition-all duration-300">
                <service.icon className="w-6 h-6 text-white group-hover:text-accent transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-glow transition-all duration-500">{service.title}</h3>
              <p className="text-muted leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
