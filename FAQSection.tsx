import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How quickly can we launch?", a: "Most deployments are completed within 2 to 4 weeks, including custom model training, website integration, and rigorous QA testing." },
  { q: "Can AI answer calls naturally?", a: "Yes. Our conversational AI systems use sub-second latency generation and natural voice synthesis, allowing them to handle interruptions, ask clarifying questions, and sound virtually indistinguishable from a human." },
  { q: "Can it integrate with HubSpot?", a: "We provide native, seamless integrations with HubSpot, Salesforce, GoHighLevel, and over 100 other major CRM and marketing platforms." },
  { q: "Can it book appointments?", a: "Absolutely. The AI agents sync directly with your team's Google or Outlook calendars to identify open slots and hard-book qualified leads instantly." },
  { q: "Does it work internationally?", a: "Our AI systems support over 40 languages and dialects, handling global inquiries gracefully with localized intonation and context." },
  { q: "Can it replace receptionists?", a: "It typically replaces the need to hire additional receptionists or SDRs, operating 24/7 at a fraction of the cost while ensuring zero missed opportunities." },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-surface/20 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Technical Overview</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/5 bg-surface/30 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-white">{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 ml-4 group-hover:bg-white/10 transition-colors">
                    {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-muted font-light leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
