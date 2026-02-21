import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Folder, User, Mail, BarChart3 } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "skills", label: "Skills", icon: BarChart3 },
  { id: "about", label: "About", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
];

// Multiple heartbeat waves across the navbar
const flatLine = "M0,50 L800,50";

// Multiple wave patterns for continuous heartbeat feel
const wave1 = "M0,50 L80,50 C85,50 88,48 90,45 C95,38 100,25 105,35 C110,45 115,50 120,50 C125,50 128,48 130,42 C135,32 140,15 145,25 C150,38 155,48 160,50 L800,50";
const wave2 = "M0,50 L220,50 C225,50 228,48 230,45 C235,38 240,25 245,35 C250,45 255,50 260,50 C265,50 268,48 270,42 C275,32 280,15 285,25 C290,38 295,48 300,50 L800,50";
const wave3 = "M0,50 L360,50 C365,50 368,48 370,45 C375,38 380,25 385,35 C390,45 395,50 400,50 C405,50 408,48 410,42 C415,32 420,15 425,25 C430,38 435,48 440,50 L800,50";
const wave4 = "M0,50 L500,50 C505,50 508,48 510,45 C515,38 520,25 525,35 C530,45 535,50 540,50 C545,50 548,48 550,42 C555,32 560,15 565,25 C570,38 575,48 580,50 L800,50";
const wave5 = "M0,50 L640,50 C645,50 648,48 650,45 C655,38 660,25 665,35 C670,45 675,50 680,50 C685,50 688,48 690,42 C695,32 700,15 705,25 C710,38 715,48 720,50 L800,50";

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass py-3" : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between relative">
          {/* Multiple Heartbeat Waves */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <svg 
              viewBox="0 0 800 100" 
              preserveAspectRatio="none" 
              className="w-full h-full"
              style={{ minHeight: '100%' }}
            >
              <defs>
                {/* Gradient for each wave */}
                <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00ff88" stopOpacity="0" />
                  <stop offset="40%" stopColor="#00ff88" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#00ff88" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#56acf4" stopOpacity="0" />
                  <stop offset="40%" stopColor="#56acf4" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#56acf4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#56acf4" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0" />
                  <stop offset="40%" stopColor="#ff6b9d" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#ff6b9d" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="waveGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffd93d" stopOpacity="0" />
                  <stop offset="40%" stopColor="#ffd93d" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#ffd93d" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffd93d" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="waveGrad5" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                  <stop offset="40%" stopColor="#a855f7" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#a855f7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Reference lines */}
              <line x1="0" y1="35" x2="800" y2="35" stroke="#333" strokeWidth="0.3" opacity="0.3" />
              <line x1="0" y1="65" x2="800" y2="65" stroke="#333" strokeWidth="0.3" opacity="0.3" />
              
              {/* Wave 1 - Green */}
              <motion.path
                d={flatLine}
                fill="none"
                stroke="url(#waveGrad1)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 0.3, 0.3, 1, 1, 0],
                  opacity: [0, 0.4, 0.5, 0.7, 0.3, 0],
                  d: [flatLine, flatLine, flatLine, wave1, wave1, flatLine]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  times: [0, 0.1, 0.3, 0.45, 0.7, 1],
                  ease: "linear"
                }}
              />
              
              {/* Wave 2 - Blue */}
              <motion.path
                d={flatLine}
                fill="none"
                stroke="url(#waveGrad2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 0.3, 0.3, 1, 1, 0],
                  opacity: [0, 0.4, 0.5, 0.7, 0.3, 0],
                  d: [flatLine, flatLine, flatLine, wave2, wave2, flatLine]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  times: [0, 0.1, 0.3, 0.45, 0.7, 1],
                  ease: "linear",
                  delay: 1
                }}
              />
              
              {/* Wave 3 - Pink */}
              <motion.path
                d={flatLine}
                fill="none"
                stroke="url(#waveGrad3)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 0.3, 0.3, 1, 1, 0],
                  opacity: [0, 0.4, 0.5, 0.7, 0.3, 0],
                  d: [flatLine, flatLine, flatLine, wave3, wave3, flatLine]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  times: [0, 0.1, 0.3, 0.45, 0.7, 1],
                  ease: "linear",
                  delay: 2
                }}
              />
              
              {/* Wave 4 - Yellow */}
              <motion.path
                d={flatLine}
                fill="none"
                stroke="url(#waveGrad4)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 0.3, 0.3, 1, 1, 0],
                  opacity: [0, 0.4, 0.5, 0.7, 0.3, 0],
                  d: [flatLine, flatLine, flatLine, wave4, wave4, flatLine]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  times: [0, 0.1, 0.3, 0.45, 0.7, 1],
                  ease: "linear",
                  delay: 3
                }}
              />
              
              {/* Wave 5 - Purple */}
              <motion.path
                d={flatLine}
                fill="none"
                stroke="url(#waveGrad5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 0.3, 0.3, 1, 1, 0],
                  opacity: [0, 0.4, 0.5, 0.7, 0.3, 0],
                  d: [flatLine, flatLine, flatLine, wave5, wave5, flatLine]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  times: [0, 0.1, 0.3, 0.45, 0.7, 1],
                  ease: "linear",
                  delay: 4
                }}
              />
            </svg>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("hero")}
            className="text-2xl font-bold gradient-text relative z-10"
          >
            My Portfolio
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 relative z-10">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-[var(--accent-primary)] text-[var(--bg-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 relative z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)] pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-6 py-4 rounded-lg text-lg font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-[var(--accent-primary)] text-[var(--bg-primary)]"
                      : "bg-[var(--bg-card)] text-[var(--text-primary)]"
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
