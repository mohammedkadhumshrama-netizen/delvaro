import { motion } from "motion/react";
import { ArrowRight, BarChart3, LineChart, MessageSquare, PhoneCall, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { openBookingModal } from "./BookingModal";
import { openDemoModal } from "./DemoModal";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Background ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl flex flex-col gap-8 z-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full w-fit">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400">The Revenue OS for Enterprise</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-bold tracking-tighter text-white leading-[0.9]">
            Build an <span className="gradient-text-accent text-glow">AI Sales Machine</span>
          </h1>
          
          <p className="text-lg text-gray-400 leading-relaxed font-light max-w-[480px]">
            Autonomous lead generation, intelligent voice agents, and high-converting funnels that scale your revenue 24/7—humanized by intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button 
              onClick={openBookingModal}
              className="w-full sm:w-auto h-14 px-8 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2 group transition-all cursor-pointer"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={openDemoModal}
              className="w-full sm:w-auto h-14 px-8 border border-white/10 bg-white/5 backdrop-blur-md rounded-xl font-bold hover:bg-white/10 text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Watch Ecosystem Demo
            </button>
          </div>


        </motion.div>

        {/* Right 3D Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:h-[600px] hidden sm:flex items-center justify-center pointer-events-none"
        >
          {/* Main Dashboard Card */}
          <motion.div
            style={{
              x: mousePosition.x * 0.5,
              y: mousePosition.y * 0.5,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[340px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden flex flex-col z-20"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm font-semibold tracking-wide flex items-center gap-2 text-indigo-400">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                LIVE AGENT ACTIVITY
              </div>
              <div className="text-[10px] text-gray-500">SYNCED 2M AGO</div>
            </div>
            
            {/* Simulated Chart Bars */}
            <div className="flex items-end gap-2 h-32 mb-6">
              <div className="flex-1 bg-white/5 rounded-t-sm h-[40%]" />
              <div className="flex-1 bg-white/10 rounded-t-sm h-[65%]" />
              <div className="flex-1 bg-indigo-500/40 rounded-t-sm h-[90%]" />
              <div className="flex-1 bg-white/5 rounded-t-sm h-[30%]" />
              <div className="flex-1 bg-cyan-400/40 rounded-t-sm h-[75%]" />
              <div className="flex-1 bg-white/10 rounded-t-sm h-[50%]" />
              <div className="flex-1 bg-indigo-400/20 rounded-t-sm h-[85%]" />
              <div className="flex-1 bg-white/10 rounded-t-sm h-[60%]" />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xs text-gray-400">Conversations</div>
                <div className="text-2xl font-bold font-mono text-white">14,208</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xs text-gray-400">Meetings Booked</div>
                <div className="text-2xl font-bold font-mono text-cyan-400">+382</div>
              </div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            style={{ x: mousePosition.x * -0.8, y: mousePosition.y * -0.8 }}
            className="absolute top-10 left-0 w-44 p-4 bg-[#111113] border border-white/10 rounded-xl shadow-xl z-30"
            animate={{ y: [0, -10, 0], rotate: [6, 6, 6] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-[10px] font-bold text-white">AI VOICE AGENT</span>
            </div>
            <div className="text-xs text-gray-300 italic">"Yes, we can definitely schedule that call for 2PM..."</div>
          </motion.div>

          <motion.div
            style={{ x: mousePosition.x * 1.2, y: mousePosition.y * 1.2 }}
            className="absolute bottom-10 left-10 w-48 p-4 bg-[#111113] border border-white/10 rounded-xl shadow-xl z-30"
            animate={{ y: [0, 10, 0], rotate: [-3, -3, -3] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-gray-400">REVENUE ATTRIBUTION</span>
              <span className="text-[10px] text-green-400 font-bold">+18%</span>
            </div>
            <div className="text-lg font-bold text-white">$82,490.00</div>
          </motion.div>

          {/* Abstract Grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:20px_20px] opacity-40 z-0" />
        </motion.div>
      </div>
    </section>
  );
}
