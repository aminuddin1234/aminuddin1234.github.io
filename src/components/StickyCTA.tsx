import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

interface StickyCTAProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const ctaMessages: Record<string, string> = {
  hero:     "View My Projects →",
  projects: "Check Out My Skills →",
  skills:   "Learn More About Me →",
  about:    "Get In Touch →",
  contact:  "View My Projects →",
};

const nextSection: Record<string, string> = {
  hero:     "projects",
  projects: "skills",
  skills:   "about",
  about:    "contact",
  contact:  "projects",
};

export default function StickyCTA({ activeSection, onNavigate }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let raf: number | null = null;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const current = window.scrollY;
        if (current > lastScrollY.current && current > 300) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        lastScrollY.current = current;
        raf = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (activeSection === "contact") return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="sticky-cta"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          /* Safe-area inset so the pill sits above the iOS home indicator */
          className="fixed bottom-0 left-0 right-0 z-40 flex justify-center"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <motion.div
            whileTap={{ scale: 0.96 }}
            className="glass rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-3 sm:gap-4 shadow-lg shadow-[var(--accent-primary)]/20 max-w-[90vw]"
          >
            <button
              onClick={() => onNavigate(nextSection[activeSection] ?? "projects")}
              className="flex items-center gap-2 text-xs sm:text-sm font-medium whitespace-nowrap min-h-[36px] touch-manipulation"
            >
              <span className="truncate max-w-[180px] sm:max-w-none">
                {ctaMessages[activeSection] ?? ctaMessages.hero}
              </span>
              <ArrowRight size={15} className="text-[var(--accent-primary)] shrink-0" aria-hidden />
            </button>

            {/* Divider */}
            <span className="w-px h-5 bg-[var(--border-color)] shrink-0" aria-hidden />

            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 hover:bg-[var(--bg-secondary)] rounded-full transition-colors shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center touch-manipulation"
              aria-label="Dismiss"
            >
              <X size={15} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}