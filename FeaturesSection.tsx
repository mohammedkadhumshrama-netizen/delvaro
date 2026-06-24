import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Activity, Brain, Calendar, CheckSquare, MessageSquare, PhoneCall, Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Logo } from "./Logo";

const features = [
  { icon: Brain, title: "AI Qualification", desc: "Automated logic to score and rank inbound leads." },
  { icon: PhoneCall, title: "Human-like Calls", desc: "Voice agents capable of natural, dynamic conversation." },
  { icon: Activity, title: "Real-time Analytics", desc: "Deep insights into conversion metrics and funnel flow." },
  { icon: Calendar, title: "Calendar Booking", desc: "Frictionless scheduling directly into your CRM." },
  { icon: CheckSquare, title: "Smart Follow-up", desc: "Automated nurturing sequences that never sleep." },
  { icon: MessageSquare, title: "Chat AI", desc: "Instant responses across web, SMS, and social." },
];

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Founder & CEO",
    company: "ScaleVector",
    feedback: "Before Delvaro, our sales team was drowning in unqualified inbound leads. Now, their automated qualification and native voice outreach system schedules and confirms strategy sessions on autopilot. Outbound conversion is up 240%!",
    rating: 5,
    avatar: "SJ",
    accent: "from-purple-500 to-indigo-600"
  },
  {
    name: "Marcus Chen",
    role: "Chief Operating Officer",
    company: "Aether Logistics",
    feedback: "Implementing the custom conversational voice receptionist has been a complete game-changer. We've captured over 85 additional high-ticket bookings in just 30 days. It feels warm, authentic, and integrates seamlessly with HubSpot.",
    rating: 5,
    avatar: "MC",
    accent: "from-cyan-500 to-blue-600"
  },
  {
    name: "Elena Rostova",
    role: "VP of Business Development",
    company: "FintechFlow",
    feedback: "We solved our speed-to-lead latency entirely. Within 2 minutes of a user showing intent, Delvaro's intelligent system qualifies and books them directly on the calendar. An absolute marvel of revenue engineering.",
    rating: 5,
    avatar: "ER",
    accent: "from-emerald-500 to-teal-600"
  }
];

export function FeaturesSection() {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview(prev => (prev + 1) % reviews.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Sticky Text & Feature List */}
          <div className="lg:sticky lg:top-32 relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Precision Engineered Infrastructure.
            </h2>
            <p className="text-lg text-muted font-light mb-12">
              Every node of our system is designed to convert attention into booked revenue.
            </p>

            <div className="space-y-8">
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Large Visuals - Visual Workflow and Reviews Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[800px] rounded-3xl glass border border-white/10 p-6 flex flex-col gap-6 relative overflow-hidden"
          >
            {/* Visual Decorative Background */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex-1 rounded-2xl bg-black/40 border border-white/5 p-6 flex flex-col justify-center items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
                  <Calendar className="w-8 h-8 text-emerald-400 relative z-10" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Automated Booking</h3>
                <p className="text-gray-400 text-sm max-w-[240px] font-light leading-relaxed">
                  We handle the conversations and put qualified meetings directly on your calendar.
                </p>
              </div>
            </div>

            <div className="flex-1 rounded-2xl bg-gradient-to-br from-surface to-black/40 border border-white/5 relative flex flex-col justify-between p-6">
              {/* Review Header with Stars and Title */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold">Client Success Verified</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Dynamic Review text area */}
              <div className="relative my-4 flex-1 flex flex-col justify-center">
                <Quote className="absolute -top-3 -left-2 w-8 h-8 text-white/[0.03] rotate-180 pointer-events-none" />
                <p className="text-gray-300 text-sm font-light leading-relaxed pl-4 relative z-10 italic">
                  "{reviews[activeReview].feedback}"
                </p>
              </div>

              {/* Author details with profile circle and controls */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${reviews[activeReview].accent} flex items-center justify-center font-bold text-white text-xs tracking-wider shadow-md`}>
                    {reviews[activeReview].avatar}
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold leading-none mb-1">{reviews[activeReview].name}</h4>
                    <p className="text-[10px] text-gray-400 font-light leading-tight">
                      {reviews[activeReview].role}, <span className="text-indigo-400 font-medium">{reviews[activeReview].company}</span>
                    </p>
                  </div>
                </div>

                {/* Dot selectors / buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setActiveReview(prev => (prev - 1 + reviews.length) % reviews.length)}
                    className="p-1 rounded-lg border border-white/5 hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-1">
                    {reviews.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveReview(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${activeReview === idx ? "bg-indigo-500 w-3" : "bg-white/20"}`}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveReview(prev => (prev + 1) % reviews.length)}
                    className="p-1 rounded-lg border border-white/5 hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
