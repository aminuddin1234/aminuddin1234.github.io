import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Folder, User, Mail, BarChart3 } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "hero",     label: "Home",     icon: Home },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "skills",   label: "Skills",   icon: BarChart3 },
  { id: "about",    label: "About",    icon: User },
  { id: "contact",  label: "Contact",  icon: Mail },
];

/** Renders <Label/> tag style — no infinite textShadow animation (too heavy on mobile) */
const renderLabel = (label: string) => (
  <span className="inline-block">
    <span className="text-[#a855f7]">&lt;</span>
    {label}
    <span className="text-[#a855f7]">/&gt;</span>
  </span>
);

// Heartbeat SVG paths (desktop only — hidden on mobile)
const flatLine = "M0,50 L800,50";
const waves = [
  "M0,50 L80,50 C85,50 88,48 90,45 C95,38 100,25 105,35 C110,45 115,50 120,50 C125,50 128,48 130,42 C135,32 140,15 145,25 C150,38 155,48 160,50 L800,50",
  "M0,50 L220,50 C225,50 228,48 230,45 C235,38 240,25 245,35 C250,45 255,50 260,50 C265,50 268,48 270,42 C275,32 280,15 285,25 C290,38 295,48 300,50 L800,50",
  "M0,50 L360,50 C365,50 368,48 370,45 C375,38 380,25 385,35 C390,45 395,50 400,50 C405,50 408,48 410,42 C415,32 420,15 425,25 C430,38 435,48 440,50 L800,50",
];
const waveColors = ["#00ff88", "#56acf4", "#ff6b9d"];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when user scrolls (common UX expectation)
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [isMobileMenuOpen]);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0a0a0a]/92 backdrop-blur-md border-b border-[#00ff88]/25 py-3"
            : "py-4 sm:py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between relative">

          {/* Heartbeat waves — desktop only, 3 instead of 5 to save GPU */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden items-center justify-center hidden md:flex">
            <svg viewBox="0 0 800 100" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                {waveColors.map((color, i) => (
                  <linearGradient key={i} id={`wg${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor={color} stopOpacity="0" />
                    <stop offset="45%"  stopColor={color} stopOpacity="0.75" />
                    <stop offset="55%"  stopColor={color} stopOpacity="0.75" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                  </linearGradient>
                ))}
              </defs>
              {waves.map((wave, i) => (
                <motion.path
                  key={i}
                  d={flatLine}
                  fill="none"
                  stroke={`url(#wg${i})`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{
                    opacity: [0, 0.5, 0.7, 0.3, 0],
                    d: [flatLine, flatLine, wave, wave, flatLine],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    times: [0, 0.1, 0.4, 0.7, 1],
                    ease: "linear",
                    delay: i * 1.4,
                  }}
                />
              ))}
            </svg>
          </div>

          {/* Logo */}
          <button
            onClick={() => handleNavigate("hero")}
            className="text-xl sm:text-2xl font-bold font-mono text-[#00ff88] relative z-10 tracking-wider min-h-[44px] flex items-center"
            aria-label="Go to top"
          >
            <span className="text-[#a855f7]">&lt;</span>
            My Portfolio
            <span className="text-[#a855f7]">/&gt;</span>
            {/* Blinking cursor — CSS only, no JS */}
            <span
              className="ml-1 inline-block w-2.5 h-5 bg-[#00ff88]"
              style={{ animation: "blink 1s step-end infinite" }}
              aria-hidden
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 relative z-10 font-mono text-sm">
            <span className="text-[#00ff88] mr-2 select-none">$</span>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors duration-200 font-mono min-h-[36px] ${
                  activeSection === item.id
                    ? "bg-[#00ff88] text-[#0a0a0a] border-[#00ff88]"
                    : "text-[#00ff88] border-[#00ff88]/40 hover:border-[#00ff88] hover:bg-[#00ff88]/10"
                }`}
              >
                {renderLabel(item.label)}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 relative z-10 text-[#00ff88] min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
            />

            {/* Slide-in drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[85vw] bg-[#0a0a0a] border-l border-[#00ff88]/30 md:hidden flex flex-col"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a3a1a]">
                <span className="font-mono text-[#00ff88] text-sm">
                  <span className="opacity-60 mr-1">$</span> menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-[#00ff88] min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-lg border text-base font-medium transition-colors duration-200 font-mono text-left min-h-[52px] touch-manipulation ${
                      activeSection === item.id
                        ? "bg-[#00ff88] text-[#0a0a0a] border-[#00ff88]"
                        : "text-[#00ff88] border-[#00ff88]/30 hover:border-[#00ff88] active:bg-[#00ff88]/10"
                    }`}
                  >
                    <span className="text-xs opacity-50 w-5 shrink-0">[{index + 1}]</span>
                    <item.icon size={18} aria-hidden />
                    {renderLabel(item.label)}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}