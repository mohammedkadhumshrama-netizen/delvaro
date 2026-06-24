import { motion } from "motion/react";

export function SocialProof() {
  return (
    <section className="h-auto md:h-32 py-8 md:py-0 bg-surface border-y border-white/5 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-wrap md:flex-nowrap items-center gap-8 lg:gap-16">
        <div className="flex flex-col">
          <div className="text-3xl font-bold font-mono text-white">500K+</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Leads Generated</div>
        </div>
        <div className="hidden md:block h-12 w-px bg-white/10"></div>
        <div className="flex flex-col">
          <div className="text-3xl font-bold font-mono text-white">12,000+</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Meetings Booked</div>
        </div>
        <div className="hidden md:block h-12 w-px bg-white/10"></div>
        <div className="flex flex-col">
          <div className="text-3xl font-bold font-mono text-white">98%</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Success Rate</div>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">System Status</span>
              <span className="text-xs text-green-400 font-medium">Operational</span>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>
      </div>
    </section>
  );
}
