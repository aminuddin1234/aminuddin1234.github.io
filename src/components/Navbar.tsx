import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Folder, User, Mail, BarChart3 } from "lucide-react";
import anime from "animejs";

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

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Flying animals refs
  const birdRef = useRef<HTMLDivElement>(null);
  const butterflyRef = useRef<HTMLDivElement>(null);
  const beeRef = useRef<HTMLDivElement>(null);
  const snakeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Flying animals animations - within navbar only
  useEffect(() => {
    const navbarWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    
    // Bird flying from left (My Portfolio) to right (nav items)
    if (birdRef.current) {
      anime({
        targets: birdRef.current,
        translateX: [
          { value: 180, duration: 0 }, // Start near "My Portfolio"
          { value: navbarWidth - 300, duration: 8000, easing: 'linear' } // Fly to nav items area
        ],
        translateY: [
          { value: 0, duration: 200 },
          { value: -8, duration: 200 },
          { value: 0, duration: 200 },
          { value: 8, duration: 200 }
        ],
        loop: true,
        delay: 1000
      });

      // Wing flap animation
      const birdEmoji = birdRef.current.querySelector('.bird-emoji');
      if (birdEmoji) {
        anime({
          targets: birdEmoji,
          rotate: [-8, 8, -8],
          duration: 150,
          loop: true,
          easing: 'easeInOutSine'
        });
      }
    }

    // Butterfly fluttering across navbar
    if (butterflyRef.current) {
      anime({
        targets: butterflyRef.current,
        translateX: [
          { value: 150, duration: 0 },
          { value: navbarWidth - 250, duration: 10000, easing: 'easeInOutSine' }
        ],
        translateY: [
          { value: 0, duration: 300 },
          { value: -12, duration: 300 },
          { value: 0, duration: 300 },
          { value: 12, duration: 300 }
        ],
        scaleX: [
          { value: 1, duration: 0 },
          { value: -1, duration: 0, delay: 5000 }
        ],
        loop: true,
        delay: 3000
      });
    }

    // Bee buzzing in navbar
    if (beeRef.current) {
      anime({
        targets: beeRef.current,
        translateX: [
          { value: navbarWidth - 200, duration: 0 },
          { value: 200, duration: 6000, easing: 'linear' }
        ],
        translateY: [
          { value: 0, duration: 100 },
          { value: -6, duration: 100 },
          { value: 6, duration: 100 },
          { value: -3, duration: 100 },
          { value: 3, duration: 100 },
          { value: 0, duration: 100 }
        ],
        loop: true,
        delay: 5000
      });
    }

    // Snake slithering at top - realistic snake movement with sine wave
    if (snakeRef.current) {
      // Horizontal movement from left to right
      anime({
        targets: snakeRef.current,
        translateX: [
          { value: -50, duration: 0 },
          { value: navbarWidth - 100, duration: 12000, easing: 'linear' }
        ],
        loop: true,
        delay: 0
      });

      // Sine wave vertical motion for slithering effect
      const snakeBody = snakeRef.current.querySelector('.snake-body');
      if (snakeBody) {
        anime({
          targets: snakeBody,
          translateY: [
            { value: 0, duration: 0 },
            { value: -6, duration: 150, easing: 'easeInOutSine' },
            { value: 0, duration: 150, easing: 'easeInOutSine' },
            { value: 6, duration: 150, easing: 'easeInOutSine' },
            { value: 0, duration: 150, easing: 'easeInOutSine' }
          ],
          rotate: [
            { value: -5, duration: 150, easing: 'easeInOutSine' },
            { value: 5, duration: 300, easing: 'easeInOutSine' },
            { value: -5, duration: 300, easing: 'easeInOutSine' },
            { value: 5, duration: 300, easing: 'easeInOutSine' }
          ],
          loop: true,
          easing: 'easeInOutSine'
        });
      }
    }
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
          {/* Flying Animals within Navbar */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Snake slithering at the very top */}
            <div 
              ref={snakeRef}
              className="absolute -top-1 left-0 text-2xl will-change-transform z-20"
              style={{ transformOrigin: 'center center' }}
            >
              <span className="snake-body inline-block" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))' }}>🐍</span>
            </div>

            {/* Flying Bird - flies from My Portfolio to Nav Items */}
            <div 
              ref={birdRef}
              className="absolute top-1/2 -translate-y-1/2 left-0 text-2xl will-change-transform"
              style={{ transformOrigin: 'center center' }}
            >
              <span className="bird-emoji inline-block">🐦</span>
            </div>

            {/* Fluttering Butterfly */}
            <div 
              ref={butterflyRef}
              className="absolute top-1/3 left-0 text-xl will-change-transform"
              style={{ transformOrigin: 'center center' }}
            >
              <span className="inline-block">🦋</span>
            </div>

            {/* Buzzing Bee */}
            <div 
              ref={beeRef}
              className="absolute top-2/3 left-0 text-xl will-change-transform"
              style={{ transformOrigin: 'center center' }}
            >
              <span className="inline-block">🐝</span>
            </div>
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
          <div className="hidden md:flex items-center gap-2">
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
            className="md:hidden p-2"
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
