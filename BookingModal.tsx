import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar as CalendarIcon, Clock, Users, ArrowRight, CheckCircle2, DollarSign, Loader2 } from "lucide-react";

import { Logo } from "./Logo";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

export function openBookingModal() {
  window.dispatchEvent(new CustomEvent("open-booking-modal"));
}

export function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(2);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    revenue: 250000,
    primaryChallenge: "Inbound Lead Response"
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { getValidToken } = useGoogleAuth(["https://www.googleapis.com/auth/calendar.events"]);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStep(2);
      setSubmitError(null);
    };
    window.addEventListener("open-booking-modal", handleOpen);
    return () => window.removeEventListener("open-booking-modal", handleOpen);
  }, []);

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const baseTimeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  // Dynamic calendar logic
  const [viewDate, setViewDate] = useState(new Date());
  const now = new Date();
  
  const currentMonthIndex = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const monthYearString = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const monthString = viewDate.toLocaleDateString('en-US', { month: 'long' });

  const numDaysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const daysInMonth = Array.from({ length: numDaysInMonth }, (_, i) => i + 1);
  
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();
  const startDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // 0 = Monday
  const blankDays = Array.from({ length: startDayOffset }, () => null);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  // Fetch availability when date changes
  useEffect(() => {
    if (!selectedDate) return;

    const fetchAvailability = async () => {
      setIsFetchingSlots(true);
      try {
        // Try to fetch real availability using the Google Calendar Free/Busy API
        const dateObj = new Date(currentYear, currentMonthIndex, selectedDate);
        const timeMin = new Date(dateObj.setHours(0, 0, 0, 0)).toISOString();
        const timeMax = new Date(dateObj.setHours(23, 59, 59, 999)).toISOString();

        // Check if we have an OAuth token, otherwise this might fail without an API key
        let token = null;
        try {
          const geckoWindow = window as any;
          if (geckoWindow.geckoPlatform?.getOAuthToken) {
            const resp = await geckoWindow.geckoPlatform.getOAuthToken(["https://www.googleapis.com/auth/calendar.events"]);
            token = resp.token;
          }
        } catch (e) {
           // Ignore silent auth failure
        }

        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };
        if (token) {
           headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            timeMin,
            timeMax,
            items: [{ id: "james@delvaroservices.com" }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const busySlots = data.calendars["james@delvaroservices.com"]?.busy || [];
          
          // Filter out busy slots
          const freeSlots = baseTimeSlots.filter(time => {
            const isPM = time.includes("PM");
            let [hours, minutes] = time.split(" ")[0].split(":").map(Number);
            if (isPM && hours !== 12) hours += 12;
            if (!isPM && hours === 12) hours = 0;
            
            const slotStart = new Date(currentYear, currentMonthIndex, selectedDate, hours, minutes).getTime();
            const slotEnd = slotStart + 30 * 60000;

            const isBusy = busySlots.some((busy: any) => {
              const busyStart = new Date(busy.start).getTime();
              const busyEnd = new Date(busy.end).getTime();
              return (slotStart < busyEnd && slotEnd > busyStart);
            });
            return !isBusy;
          });
          setAvailableSlots(freeSlots);
        } else {
          // Fallback if API fails (e.g. no auth or no public access)
          setAvailableSlots(baseTimeSlots);
        }
      } catch (err) {
        console.error("Failed to fetch availability:", err);
        setAvailableSlots(baseTimeSlots);
      } finally {
        setIsFetchingSlots(false);
      }
    };

    fetchAvailability();
  }, [selectedDate, currentMonthIndex, currentYear]);
  
  const handleNextStep = () => {
    if (step === 2 && (!selectedDate || !selectedTime)) {
      return; // Ensure date and time chosen
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const token = await getValidToken();

      // Convert the selected time to a Date object using current month/year
      const isPM = selectedTime?.includes("PM");
      const [timeStr] = selectedTime?.split(" ") || ["09:00"];
      let [hours, minutes] = timeStr.split(":").map(Number);
      
      if (isPM && hours !== 12) hours += 12;
      if (!isPM && hours === 12) hours = 0;

      const dateObj = new Date(currentYear, currentMonthIndex, selectedDate || now.getDate(), hours, minutes);
      const endObj = new Date(dateObj.getTime() + 30 * 60000); // 30 minutes duration

      const startDateTime = dateObj.toISOString();
      const endDateTime = endObj.toISOString();

      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          summary: `Free Strategy Session - ${formData.company}`,
          description: `Booking from Delvaro Lead Generation AI Agency\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nRevenue: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(formData.revenue)}`,
          start: { dateTime: startDateTime },
          end: { dateTime: endDateTime },
          attendees: [{ email: formData.email }, { email: "james@delvaroservices.com" }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create calendar event');
      }

      setStep(4); // Go to Success Step
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred while booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          {/* Overlay background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={`w-full max-w-4xl max-h-[90vh] flex flex-col relative z-10 glass-card rounded-3xl p-1 shadow-[0_0_80px_rgba(79,70,229,0.3)] transition-all duration-300`}
          >
            <div className="bg-surface/95 rounded-[23px] overflow-y-auto overflow-x-hidden relative flex-1">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-all cursor-pointer z-50"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid md:grid-cols-12 min-h-[500px]">
                {/* Left side informational card */}
                <div className="md:col-span-4 bg-black/40 p-8 flex flex-col justify-between border-r border-white/5">
                  <div>
                    <div className="mb-8 scale-75 origin-left">
                      <Logo />
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2 leading-tight">Free Strategy Session</h4>
                    <p className="text-xs text-muted leading-relaxed">
                      Map exactly how to add 10 to 15 booked clients to your pipeline next month
                    </p>
                  </div>

                  <div className="space-y-4 pt-8 border-t border-white/5 text-[11px] text-gray-400">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-indigo-400" />
                      <span>30-Minute Call</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-indigo-400" />
                      <span>Led by Solutions Engineer</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <DollarSign className="w-4 h-4 text-indigo-400" />
                      <span>100% Free Baseline Audit</span>
                    </div>
                  </div>
                </div>

                {/* Right side interactions */}
                <div className="md:col-span-8 p-8 flex flex-col justify-center relative">
                  <AnimatePresence mode="wait">
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex-1 flex flex-col justify-between h-full"
                      >
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex flex-col gap-3 mb-6">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-bold text-white tracking-tight">Select Date & Time</h3>
                              <span className="text-[10px] font-mono text-indigo-400 font-semibold tracking-wider">STEP 1/2</span>
                            </div>
                          </div>

                          <div className="flex-grow">
                            <div className="mb-6">
                              <div className="text-xs font-semibold text-gray-400 mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="w-3.5 h-3.5 text-indigo-400" />
                                  <span>{monthYearString}</span>
                                </div>
                                <div className="flex gap-2 relative z-20">
                                  <button type="button" onClick={handlePrevMonth} disabled={viewDate.getFullYear() < now.getFullYear() || (viewDate.getFullYear() === now.getFullYear() && viewDate.getMonth() <= now.getMonth())} className="p-1 hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer pointer-events-auto">
                                    <ArrowRight className="w-3 h-3 rotate-180" />
                                  </button>
                                  <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-white/10 rounded cursor-pointer pointer-events-auto">
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              <div className="grid grid-cols-7 gap-2 text-center font-mono text-[10px] mb-2 text-muted">
                                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                              </div>
                              <div className="grid grid-cols-7 gap-2">
                                {blankDays.map((_, i) => <div key={`blank-${i}`} />)}
                                {daysInMonth.map(day => {
                                  const dayOfWeek = (day + startDayOffset - 1) % 7;
                                  const isPast = (currentYear === now.getFullYear() && currentMonthIndex === now.getMonth() && day < now.getDate()) || (currentYear < now.getFullYear() || (currentYear === now.getFullYear() && currentMonthIndex < now.getMonth()));
                                  const isSelected = selectedDate === day;
                                  const isDisabled = isPast;
                                  
                                  return (
                                    <button
                                      key={day}
                                      type="button"
                                      disabled={isDisabled}
                                      onClick={() => setSelectedDate(day)}
                                      className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium font-mono transition-colors ${
                                        isSelected
                                          ? "bg-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                                          : isDisabled
                                          ? "text-stone-750 cursor-not-allowed opacity-20"
                                          : "bg-white/[0.03] border border-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20"
                                      }`}
                                    >
                                      {day}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="mb-6">
                              <span className="text-xs font-semibold text-gray-400 block mb-3">Available Slots (UTC):</span>
                              <div className="flex flex-wrap gap-2">
                                {isFetchingSlots ? (
                                  <div className="flex items-center gap-2 text-xs text-gray-400 py-2">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    <span>Syncing with James' calendar...</span>
                                  </div>
                                ) : !selectedDate ? (
                                  <div className="text-xs text-gray-500 py-2">Select a date to view availability</div>
                                ) : availableSlots.length === 0 ? (
                                  <div className="text-xs text-red-400 py-2">No availability on this date</div>
                                ) : (
                                  availableSlots.map(time => {
                                    const isTimeSelected = selectedTime === time;
                                    return (
                                      <button
                                        key={time}
                                        type="button"
                                        onClick={() => setSelectedTime(time)}
                                        className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                                          isTimeSelected
                                            ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                                            : "bg-white/[0.03] border border-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20"
                                        }`}
                                      >
                                        {time}
                                      </button>
                                    );
                                  })
                                )}
                              </div>
                            </div>

                            <div className="pt-6 mt-auto border-t border-white/5 flex justify-end items-center">
                              <button
                                type="button"
                                onClick={handleNextStep}
                                disabled={!selectedDate || !selectedTime}
                                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 hover:scale-102 active:scale-98 text-white px-6 py-3 rounded-xl font-bold text-xs tracking-wide flex items-center gap-1.5 transition-all cursor-pointer"
                              >
                                Continue
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex-1 flex flex-col justify-between h-full"
                      >
                        <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-8">
                              <h3 className="text-lg font-bold text-white font-sans tracking-tight">Business Profile</h3>
                              <span className="text-[10px] font-mono text-indigo-400 font-semibold tracking-wider">STEP 2/2</span>
                            </div>

                            <div className="space-y-5">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="text-[10px] tracking-wide uppercase font-bold text-gray-400">FullName</label>
                                  <input
                                    type="text"
                                    required
                                    placeholder="Sarah Connor"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:bg-white/[0.05] transition-all"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[10px] tracking-wide uppercase font-bold text-gray-400">Work Email</label>
                                  <input
                                    type="email"
                                    required
                                    placeholder="sarah@skynet.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:bg-white/[0.05] transition-all"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] tracking-wide uppercase font-bold text-gray-400">Company Name</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Skynet Technologies"
                                  value={formData.company}
                                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                                  className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:bg-white/[0.05] transition-all"
                                />
                              </div>

                              <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-3 flex flex-col justify-center" id="revenue-bracket-container">
                                  <label className="text-[10px] tracking-wide uppercase font-bold text-gray-400">Revenue</label>
                                  <div className="relative pt-6 pb-2 px-1">
                                    <div 
                                      className="absolute top-0 transform -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none transition-all duration-75"
                                      style={{ 
                                        left: `calc(${([50000, 100000, 250000, 500000, 1000000].indexOf(formData.revenue) / 4) * 100}% - ${([50000, 100000, 250000, 500000, 1000000].indexOf(formData.revenue) / 4) * 16}px + 8px)`
                                      }}
                                    >
                                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(formData.revenue)}{formData.revenue >= 1000000 ? '+' : ''}
                                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-indigo-600"></div>
                                    </div>
                                    <input
                                      type="range"
                                      min="0"
                                      max="4"
                                      step="1"
                                      value={[50000, 100000, 250000, 500000, 1000000].indexOf(formData.revenue)}
                                      onChange={e => {
                                        const steps = [50000, 100000, 250000, 500000, 1000000];
                                        setFormData({ ...formData, revenue: steps[Number(e.target.value)] });
                                      }}
                                      className="w-full h-1.5 bg-stone-900 border border-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-indigo-400 hover:[&::-webkit-slider-thumb]:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 [&::-webkit-slider-thumb]:transition-transform"
                                    />
                                    <div className="flex justify-between text-[9px] text-gray-500 font-mono mt-2 px-1">
                                      <span>$50k</span>
                                      <span>$100k</span>
                                      <span>$250k</span>
                                      <span>$500k</span>
                                      <span>$1M+</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="pt-6 mt-8 border-t border-white/5">
                            {submitError && (
                              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400">
                                {submitError}
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <button
                                type="button"
                                onClick={() => setStep(2)}
                                disabled={isSubmitting}
                                className="text-xs font-medium text-gray-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                              >
                                Back to Calendar
                              </button>
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-indigo-600 hover:bg-indigo-500 hover:scale-102 active:scale-98 text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                              >
                                {isSubmitting ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Booking...
                                  </>
                                ) : (
                                  <>
                                    Confirm Session
                                    <CheckCircle2 className="w-4 h-4" />
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10 flex flex-col items-center justify-center h-full"
                      >
                        <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Strategy Call Scheduled!</h3>
                        <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed mb-8">
                          Thank you, <span className="text-white font-medium">{formData.name}</span>! Your session for {formData.company || 'your business'} is hard-booked on <br/><span className="text-indigo-300 font-mono font-bold text-base mt-2 inline-block">{monthString} {selectedDate}, {currentYear} at {selectedTime}</span>.
                        </p>
                        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl max-w-sm mx-auto text-left text-sm text-gray-400 space-y-2 w-full">
                          <div className="text-white font-bold mb-2 uppercase tracking-wide text-xs">Next Steps</div>
                          <div className="flex gap-2 items-start"><div className="text-indigo-400">1.</div><div>Check your inbox for the calendar meeting credentials.</div></div>
                          <div className="flex gap-2 items-start"><div className="text-indigo-400">2.</div><div>Have current revenue metrics handy.</div></div>
                          <div className="flex gap-2 items-start"><div className="text-indigo-400">3.</div><div>Access our system sandbox if provided.</div></div>
                        </div>

                        <button
                          onClick={() => setIsOpen(false)}
                          className="mt-10 text-sm font-medium py-3 px-8 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                        >
                          Dismiss
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

