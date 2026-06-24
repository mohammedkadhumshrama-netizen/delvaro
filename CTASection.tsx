import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { openBookingModal } from "./BookingModal";

export function CTASection() {
  return (
    <section className="py-40 relative overflow-hidden">
      {/* Dynamic Background Effect */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-accent/20 blur-[150px] rounded-[100%] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSI+PC9jaXJjbGU+Cjwvc3ZnPg==')] opacity-50 z-0" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[1.1]">
            Your Competitors Are Automating.<br/>
            <span className="text-white/40">Are You?</span>
          </h2>
          
          <p className="text-xl text-muted font-light mb-12 max-w-2xl mx-auto">
            Stop losing revenue to missed calls and slow follow-ups. Deploy a custom AI sales system and dominate your market.
          </p>

          <button 
            onClick={openBookingModal}
            className="h-16 px-10 rounded-full bg-white text-black text-lg font-bold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto shadow-[0_0_40px_rgba(255,255,255,0.3)] group cursor-pointer"
          >
            Book Free Strategy Session
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
