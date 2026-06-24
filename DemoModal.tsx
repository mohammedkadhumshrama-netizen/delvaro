import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Square, MessageSquare, Volume2, Hexagon, Sparkles, Check } from "lucide-react";

export function openDemoModal() {
  window.dispatchEvent(new CustomEvent("open-demo-modal"));
}

interface DialogueItem {
  sender: "agent" | "lead" | "status";
  text: string;
  time: string;
}

const DEMO_SCENARIOS = [
  {
    title: "1. Mid-Market Inbound Response",
    badge: "Voice Agent",
    description: "Inbound phone response within 4.2 seconds to a qualified Enterprise demo request.",
    dialogue: [
      { sender: "status", text: "Incoming Inbound Web Call Triggered (Lead: TechCorp, $15M ARR)", time: "0.0s" },
      { sender: "agent", text: "Hey Sarah! This is Alex from Delvaro. I saw you literally just clicked submit on our demo request for skynet pipelines. How are you doing today?", time: "2.1s" },
      { sender: "lead", text: "Wow, that was fast! I was literally still looking at your thank you page.", time: "6.8s" },
      { sender: "agent", text: "Haha, our system is pretty immediate. Since you are looking at it right now, I wanted to quickly see what integrations you're currently prioritizing? We support HubSpot, Salesforce, and custom database webhooks natively.", time: "11.2s" },
      { sender: "lead", text: "We actually use HubSpot and want to automate booking directly into our sales reps' calendar without standard forms.", time: "18.5s" },
      { sender: "agent", text: "Ah, that is a perfect sweet spot. Our system auto-profiles your contact, matches timezone settings, and locks it in. Are you free this Friday at 2:00 PM EST? I can set up a direct custom trial for TechCorp.", time: "24.1s" },
      { sender: "lead", text: "Yes, that works! Let's lock it in. Send me the calendar invite.", time: "30.4s" },
      { sender: "status", text: "Appointment Locked. Hubspot synced. Cal.com booking dispatch complete.", time: "33.2s" }
    ] as DialogueItem[]
  },
  {
    title: "2. Enterprise LinkedIn Reactivation",
    badge: "Social Messaging",
    description: "Re-activating a cold enterprise account by profiling current hiring signals on LinkedIn.",
    dialogue: [
      { sender: "status", text: "LinkedIn Lead Scanner found hiring trigger (Role: VP of Sales, DelvaroCorp)", time: "0.0s" },
      { sender: "agent", text: "Hi Mark, saw Skynet is expanding its Outbound SDR fleet this quarter. Normally that means you're scaling outreach, but did you know a single autonomous agent can handle the outbound equivalent of 12 full-time SDRs at 97% lower cost?", time: "1.5s" },
      { sender: "lead", text: "We're actually running into heavy deliverability problems with cold outbound right now. Can your agents solve that?", time: "5.5s" },
      { sender: "agent", text: "Absolutely. We route everything via autonomous dynamic domain networks, sending highly contextual personalized pitches. No templated list blasts. Every output is uniquely researched in 3 seconds based on their open-source API telemetry.", time: "9.2s" },
      { sender: "lead", text: "That sounds interesting. Show me how the template research looks.", time: "14.1s" },
      { sender: "status", text: "Dispatched automated Figma proof-of-work dashboard mockup snapshot.", time: "16.8s" },
      { sender: "lead", text: "Okay, this is extremely custom. Let's do a quick discovery call next Tuesday.", time: "21.0s" }
    ] as DialogueItem[]
  }
];

export function DemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [dialogue, setDialogue] = useState<DialogueItem[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackIdx, setPlaybackIdx] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      resetSimulation();
    };
    window.addEventListener("open-demo-modal", handleOpen);
    return () => window.removeEventListener("open-demo-modal", handleOpen);
  }, []);

  const currentScenario = DEMO_SCENARIOS[selectedScenarioIdx];

  const resetSimulation = () => {
    setIsPlaying(false);
    setDialogue([]);
    setPlaybackIdx(0);
  };

  useEffect(() => {
    if (!isPlaying) return;

    if (playbackIdx < currentScenario.dialogue.length) {
      const timer = setTimeout(() => {
        setDialogue(prev => [...prev, currentScenario.dialogue[playbackIdx]]);
        setPlaybackIdx(prev => prev + 1);
      }, playbackIdx === 0 ? 500 : 2500); // Fast initial trace, then realistic natural breaks
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, playbackIdx, selectedScenarioIdx]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [dialogue]);

  const selectScenario = (idx: number) => {
    setSelectedScenarioIdx(idx);
    resetSimulation();
  };

  const startSimulation = () => {
    resetSimulation();
    setIsPlaying(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="w-full max-w-4xl relative z-10 glass-card rounded-3xl p-1 shadow-[0_0_80px_rgba(79,70,229,0.35)]"
          >
            <div className="bg-surface/90 rounded-[23px] overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-all cursor-pointer z-50"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid md:grid-cols-12 min-h-[500px]">
                {/* Left Controls & Selection */}
                <div className="md:col-span-5 bg-black/30 p-8 flex flex-col justify-between border-r border-white/5">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Ecosystem Trial</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">AI Agent Playbook</h3>
                    <p className="text-xs text-muted leading-relaxed mb-8">
                      Select an automated interaction pipeline scenario below, and launch the real-time response model trace.
                    </p>

                    <div className="space-y-3">
                      {DEMO_SCENARIOS.map((scenario, index) => {
                        const isSelected = selectedScenarioIdx === index;
                        return (
                          <button
                            key={index}
                            onClick={() => selectScenario(index)}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${
                              isSelected
                                ? "bg-indigo-600/15 border-indigo-500/40 text-white"
                                : "bg-white/[0.01] border-white/5 text-gray-400 hover:bg-white/5"
                            } cursor-pointer`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-bold">{scenario.title}</span>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/5 font-semibold">
                                {scenario.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-muted leading-normal">{scenario.description}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex gap-2">
                    <button
                      onClick={startSimulation}
                      disabled={isPlaying}
                      className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-indigo-500/10 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Run Playbook Trace
                    </button>
                    {(isPlaying || dialogue.length > 0) && (
                      <button
                        onClick={resetSimulation}
                        className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                      >
                        <Square className="w-4 h-4 fill-current" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Interactive Trace Logging Terminal */}
                <div className="md:col-span-7 bg-surface p-8 flex flex-col justify-between">
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                      <div className="flex items-center gap-2">
                        <Hexagon className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-mono font-semibold text-white">LIVE_STAGE_SIMULATOR</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isPlaying && (
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-mono text-emerald-400 tracking-widest font-bold">STREAM_ACTIVE</span>
                          </div>
                        )}
                        <Volume2 className={`w-4 h-4 ${isPlaying ? "text-indigo-400 animate-bounce" : "text-gray-500"}`} />
                      </div>
                    </div>

                    {/* Audio Spectrogram Wave Visualizer */}
                    {isPlaying && (
                      <div className="h-8 flex items-center justify-center gap-[4px] bg-black/20 rounded-lg mb-4 select-none px-4">
                        {Array.from({ length: 18 }).map((_, i) => {
                          const delay = (i * 0.1).toFixed(1);
                          return (
                            <motion.div
                              key={i}
                              animate={{ height: ["15%", "90%", "15%"] }}
                              transition={{
                                repeat: Infinity,
                                duration: 1.2,
                                delay: parseFloat(delay),
                                ease: "easeInOut"
                              }}
                              className="w-[3px] bg-gradient-to-t from-indigo-500 via-cyan-400 to-indigo-500 rounded-full"
                              style={{ height: "40%" }}
                            />
                          );
                        })}
                      </div>
                    )}

                    {/* Dialogue Feed */}
                    <div className="flex-1 bg-black/40 rounded-xl p-5 font-mono text-xs overflow-y-auto space-y-4 max-h-[280px]">
                      {dialogue.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-550 space-y-2">
                          <MessageSquare className="w-8 h-8 text-white/5" />
                          <p className="text-[11px]">Playbook trace container offline. Please trigger "Run Playbook Trace" to initiate the real-time flow experience.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {dialogue.map((item, idx) => {
                            if (item.sender === "status") {
                              return (
                                <div key={idx} className="text-[10px] text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-2 flex items-start gap-1.5 leading-snug">
                                  <span>[CRITICAL EVENT]</span>
                                  <span>{item.text}</span>
                                </div>
                              );
                            }
                            const isAgent = item.sender === "agent";
                            return (
                              <div key={idx} className={`flex flex-col ${isAgent ? "items-start" : "items-end"}`}>
                                <div className="flex items-center gap-1.5 mb-1 text-[10px] text-gray-500">
                                  <span>{isAgent ? "AETHER AGENT (99.8% human-match)" : "Prospect / Lead"}</span>
                                  <span>•</span>
                                  <span>{item.time}</span>
                                </div>
                                <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                                  isAgent 
                                    ? "bg-indigo-600/10 border border-indigo-500/25 text-indigo-100 rounded-tl-sm" 
                                    : "bg-white/[0.03] border border-white/5 text-gray-200 rounded-tr-sm"
                                }`}>
                                  {item.text}
                                </div>
                              </div>
                            );
                          })}
                          <div ref={terminalEndRef} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Trust indicator */}
                  <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 flex items-center gap-3 mt-4">
                    <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white leading-none">System Active</div>
                      <p className="text-[10px] text-muted leading-tight mt-0.5">Tested under extreme high deliverability throttling limits.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
