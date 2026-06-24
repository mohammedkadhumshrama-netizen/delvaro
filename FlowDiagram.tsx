import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Play, Zap, Terminal, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export function FlowDiagram() {
  const sources = ["Google", "Facebook", "LinkedIn", "Cold Email", "SEO", "Calls"];
  const stages = [
    { name: "AI Engine", log: "Inbound payload parsed, qualified with GPT-4o Agent, lead score: 0.94/1.0" },
    { name: "Website", log: "Custom personalized high-converting value proposition rendered in 240ms" },
    { name: "AI Receptionist", log: "Inbound voice scheduler dialed candidate automatically; call logged as HIGH VALUE" },
    { name: "CRM", log: "HubSpot sync complete. Lead status updated to 'Awaiting Strategy Session'" },
    { name: "Appointment", log: "Calendar invitation dispatched to james@delvaroservices.com. Confirmed slot booked." }
  ];

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activeSource, setActiveSource] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const startSimulation = async (sourceName?: string) => {
    if (isSimulating) return;
    setIsSimulating(true);
    const selectedSource = sourceName || sources[Math.floor(Math.random() * sources.length)];
    setActiveSource(selectedSource);
    setLogs([`⚡ Triggered lead event from static traffic source: [${selectedSource}]`]);
    
    // Simulate each stage with delay
    for (let i = 0; i < stages.length; i++) {
      setActiveStep(i);
      await new Promise(resolve => setTimeout(resolve, 1400));
      setLogs(prev => [...prev, `[${stages[i].name}] ${stages[i].log}`]);
    }

    setActiveStep(stages.length);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLogs(prev => [...prev, "💰 SUCCESS: Revenue attributed. Total pipeline grew by +$4,500.00"]);
    setIsSimulating(false);
  };

  return (
    <section className="py-32 relative overflow-hidden" id="solutions">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(14,165,233,0.05),transparent)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full w-fit mb-4"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400">Interactive Simulation</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]"
          >
            The Autonomous Revenue Engine
          </motion.h2>
          <p className="text-muted text-base mt-4 max-w-2xl mx-auto font-light leading-relaxed">
            Select an acquisition source or click below to trigger a live payload through our 24/7 revenue-generation architecture.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start mt-12">
          {/* Visual Flows - 7 Cols */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Raw Inbound Traffic Sources */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white/[0.02] p-4 rounded-2xl border border-white/5 w-full">
              {sources.map((source, i) => {
                const isActive = activeSource === source;
                return (
                  <button
                    key={i}
                    onClick={() => startSimulation(source)}
                    disabled={isSimulating}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      isActive 
                        ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-[0_0_15px_rgba(79,70,229,0.25)]" 
                        : "bg-surface/60 border border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                    } cursor-pointer`}
                  >
                    {source}
                  </button>
                );
              })}
            </div>

            {/* Downward connector from sources to Engine */}
            <div className="w-px h-10 bg-gradient-to-b from-white/10 to-indigo-500 relative">
              {activeStep !== null && (
                <motion.div 
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400"
                  animate={{ y: [0, 40] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                />
              )}
            </div>

            {/* Vertical Flow Diagram Nodes */}
            <div className="flex flex-col items-center gap-4 w-full">
              {stages.map((stage, i) => {
                const isActive = activeStep === i;
                const isPassed = activeStep !== null && activeStep > i;
                return (
                  <div key={i} className="flex flex-col items-center gap-4 w-full">
                    <motion.div
                      className={`w-full max-w-md p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                        isActive
                          ? "bg-indigo-500/10 border-indigo-500 shadow-[0_0_25px_rgba(79,70,229,0.2)] text-white"
                          : isPassed
                          ? "bg-white/[0.04] border-emerald-500/30 text-white/90"
                          : "bg-surface/40 border-white/5 text-gray-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg text-[10px] font-mono flex items-center justify-center font-bold border ${
                          isActive 
                            ? "bg-indigo-500/20 border-indigo-400 text-indigo-300"
                            : isPassed
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-stone-800 border-stone-700 text-stone-500"
                        }`}>
                          0{i + 1}
                        </span>
                        <span className="font-semibold text-sm tracking-wide">{stage.name}</span>
                      </div>
                      {isPassed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {isActive && <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-400 animate-pulse" />}
                    </motion.div>

                    {/* Stage line connector */}
                    {i < stages.length - 1 && (
                      <div className="w-px h-8 bg-white/5 relative">
                        {isActive && (
                          <motion.div 
                            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400"
                            animate={{ y: [0, 32] }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          />
                        )}
                        {isPassed && <div className="absolute inset-y-0 left-0 w-px bg-indigo-500/40" />}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* CRM to Revenue Connection */}
              <div className="w-px h-10 bg-white/5 relative">
                {activeStep === stages.length - 1 && (
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ y: [0, 40] }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                )}
                {activeStep !== null && activeStep >= stages.length && <div className="absolute inset-y-0 left-0 w-px bg-emerald-500/40" />}
              </div>

              {/* Revenue Node */}
              <motion.div
                className={`w-full max-w-md p-5 rounded-2xl border transition-all duration-500 text-center uppercase tracking-widest font-extrabold text-base ${
                  activeStep === stages.length
                    ? "bg-emerald-500/10 border-emerald-400 text-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.3)]"
                    : "bg-surface/20 border-white/5 text-gray-500"
                }`}
              >
                💰 Revenue Captured
              </motion.div>
            </div>
          </div>

          {/* Interactive Activity Feed - 5 Cols */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="w-full glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-96">
              <div className="h-14 border-b border-white/10 bg-black/20 px-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-white/90 tracking-wide text-sm">Live Activity</span>
                </div>
              </div>

              <div className="flex-1 p-5 text-sm leading-relaxed text-gray-300 overflow-y-auto space-y-4 bg-black/10 select-none">
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 gap-4">
                    <p className="font-light">Click any source or start simulation to see Delvaro in action.</p>
                    <button
                      onClick={() => startSimulation()}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm tracking-wide transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Start Experience
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {logs.map((log, index) => (
                      <motion.div
                         key={index}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.3 }}
                         className="flex gap-3 items-start"
                      >
                         <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            log.startsWith("💰") ? "bg-emerald-400" : "bg-indigo-400"
                         }`} />
                         <div className="text-gray-300 font-light">
                           {log.replace(/^[💰⚡]\s*/, "")}
                         </div>
                      </motion.div>
                    ))}
                    {isSimulating && (
                      <div className="flex items-center gap-3 italic text-gray-500 font-light">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-600 animate-pulse flex-shrink-0" />
                        Processing next action...
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
