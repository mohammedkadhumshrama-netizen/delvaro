import { motion, AnimatePresence } from "motion/react";
import { Hexagon, ChevronRight, Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import { useEffect, useState } from "react";

import { ScrollProgress } from "./ScrollProgress";
import { openBookingModal } from "./BookingModal";

import { Logo } from "./Logo";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Services", href: "#services" },
  { name: "Solutions", href: "#solutions" },
  { name: "Why Us", href: "#why-us" },
  { name: "Case Studies", href: "#case-studies" },
  { name: "Contact", href: "mailto:james@delvaroservices.com" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-surface/75 backdrop-blur-md border-white/5 shadow-2xl" : "bg-transparent py-2"
        )}
      >
        <ScrollProgress />
        
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={openBookingModal}
              className="px-5 py-2.5 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all flex items-center gap-1 group text-sm cursor-pointer"
            >
              Book Free Session
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 bg-surface/95 border-b border-white/5 backdrop-blur-xl z-40 p-6 md:hidden flex flex-col gap-6"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-300 hover:text-white py-1 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="pt-4 border-t border-white/5">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full text-center py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg cursor-pointer"
              >
                Book Free Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
