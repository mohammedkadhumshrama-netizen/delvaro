import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Zap } from "lucide-react";

export function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if it already triggered this session
    const triggered = sessionStorage.getItem("exitIntentTriggered");
    if (triggered) {
      setHasTriggered(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse leaves from the top of the window, assuming they are going to close/back/change tab
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem("exitIntentTriggered", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasTriggered]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md relative z-10 glass-card rounded-3xl p-1 shadow-[0_0_80px_rgba(79,70,229,0.2)]"
          >
            <div className="bg-surface/90 backdrop-blur-xl rounded-[23px] overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
              
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                      <Zap className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Audit Requested</h3>
                    <p className="text-muted">We'll be in touch shortly with your custom revenue insights.</p>
                  </div>
                ) : (
                  <>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full w-fit mb-6">
                      <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-accent">Wait before you go</span>
                    </div>

                    <h3 className="text-3xl font-bold text-white tracking-tight mb-4 leading-tight">
                      Don't leave revenue on the table.
                    </h3>
                    
                    <p className="text-muted leading-relaxed mb-8 text-sm">
                      Get a free, custom AI Revenue Audit. We'll show you exactly where an autonomous sales system can increase your conversions.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="email"
                          placeholder="Your work email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group transition-all"
                      >
                        Claim My Free Audit
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                    <p className="text-center text-[10px] text-muted mt-4">No commitment required. 100% free.</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
