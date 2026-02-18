import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Download,
} from "lucide-react";
import anime from "animejs";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);
  const decorativeBlursRef = useRef<HTMLDivElement>(null);
  const bioCardsRef = useRef<HTMLDivElement>(null);
  const headerTextRef = useRef<HTMLSpanElement>(null);
  const profileCircleRef = useRef<HTMLDivElement>(null);

  // Anime.js: Header text glow animation
  useEffect(() => {
    if (!headerTextRef.current) return;

    anime({
      targets: headerTextRef.current,
      textShadow: [
        "0 0 5px rgba(99, 102, 241, 0.3)",
        "0 0 20px rgba(99, 102, 241, 0.6)",
        "0 0 30px rgba(139, 92, 246, 0.4)",
        "0 0 5px rgba(99, 102, 241, 0.3)"
      ],
      duration: 3000,
      loop: true,
      easing: "easeInOutSine"
    });
  }, []);

  // Anime.js: Profile card breathing/floating animation
  useEffect(() => {
    if (!profileCardRef.current) return;

    anime({
      targets: profileCardRef.current,
      translateY: [-5, 5, -5],
      duration: 4000,
      loop: true,
      easing: "easeInOutSine"
    });
  }, []);

  // Anime.js: Decorative blurs orbital animation
  useEffect(() => {
    if (!decorativeBlursRef.current) return;

    const blurs = decorativeBlursRef.current.querySelectorAll(".decorative-blur");
    
    blurs.forEach((blur, index) => {
      anime({
        targets: blur,
        translateX: index === 0 ? [-20, 20, -20] : [20, -20, 20],
        translateY: index === 0 ? [20, -20, 20] : [-20, 20, -20],
        scale: [1, 1.2, 1],
        duration: 5000 + index * 1000,
        loop: true,
        easing: "easeInOutSine",
        delay: index * 500
      });
    });
  }, []);

  // Anime.js: Profile circle pulse
  useEffect(() => {
    if (!profileCircleRef.current) return;

    anime({
      targets: profileCircleRef.current,
      boxShadow: [
        "0 0 0 0 rgba(99, 102, 241, 0.4)",
        "0 0 0 15px rgba(99, 102, 241, 0)",
        "0 0 0 0 rgba(99, 102, 241, 0)"
      ],
      duration: 2000,
      loop: true,
      easing: "easeOutExpo"
    });
  }, []);

  // Anime.js: Bio cards sequential entrance
  useEffect(() => {
    if (!bioCardsRef.current) return;

    const cards = bioCardsRef.current.querySelectorAll(".bio-card");
    
    anime.set(cards, {
      opacity: 0,
      translateX: 30,
      rotateY: -5
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cards,
              opacity: [0, 1],
              translateX: [30, 0],
              rotateY: [-5, 0],
              delay: anime.stagger(150),
              duration: 800,
              easing: "easeOutExpo"
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(bioCardsRef.current);
    return () => observer.disconnect();
  }, []);

  // Anime.js: Download button hover effect
  const handleDownloadHover = (element: HTMLButtonElement) => {
    anime({
      targets: element,
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)",
      duration: 300,
      easing: "easeOutExpo"
    });
    
    // Animate the icon
    const icon = element.querySelector("svg");
    if (icon) {
      anime({
        targets: icon,
        translateY: [0, 3, 0],
        duration: 600,
        easing: "easeInOutSine"
      });
    }
  };

  const handleDownloadLeave = (element: HTMLButtonElement) => {
    anime({
      targets: element,
      scale: 1,
      boxShadow: "0 0 0 rgba(99, 102, 241, 0)",
      duration: 300,
      easing: "easeOutExpo"
    });
  };

  return (
    <section id="about" ref={sectionRef} className="section relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/penang_noir.png" 
          alt="Penang Noir"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)]/60 via-[var(--bg-secondary)]/50 to-[var(--bg-secondary)]/70" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span ref={headerTextRef} className="gradient-text cursor-default">Me</span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Profile Card - Centered on mobile, left side on desktop */}
          <div className="w-full lg:w-auto flex justify-center">
            <div
              ref={profileCardRef}
              className="relative"
            >
              {/* Decorative elements with anime.js */}
              <div ref={decorativeBlursRef}>
                <div className="decorative-blur absolute -top-4 -left-4 w-24 h-24 bg-[var(--accent-primary)] rounded-full opacity-20 blur-2xl" />
                <div className="decorative-blur absolute -bottom-4 -right-4 w-24 h-24 bg-[var(--accent-secondary)] rounded-full opacity-20 blur-2xl" />
              </div>

              {/* Profile card */}
              <div className="relative bg-[var(--bg-card)]/5 backdrop-blur-sm rounded-2xl p-8 border border-[var(--border-color)]/35 flex flex-col items-center">
                {/* Profile Circle */}
                <div 
                  ref={profileCircleRef}
                  className="w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-[var(--accent-primary)] p-1"
                >
                  <div className="w-full h-full rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                                        <img
                      src="/Aminuddin_pic.png"
                      alt="Aminuddin Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    Muhammad Aminuddin
                  </h3>
                  <p className="text-[var(--accent-primary)] font-medium mb-4">
                    Data Analyst
                  </p>
                  <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-[250px] mx-auto">
                    Transforming complex data into actionable business insights
                  </p>
                </div>

                {/* Resume Download Button - Centered */}
                <button 
                  onMouseEnter={(e) => handleDownloadHover(e.currentTarget)}
                  onMouseLeave={(e) => handleDownloadLeave(e.currentTarget)}
                  className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl"
                >
                  <Download size={18} />
                  Download Resume
                </button>
              </div>
            </div>
          </div>

          {/* Experience & Certifications */}
          <div ref={bioCardsRef} className="flex-1 space-y-6">
            {/* Experience 1: Mas Awana */}
            <div className="bio-card bg-[var(--bg-card)]/15 backdrop-blur-sm rounded-xl p-6 border border-[var(--border-color)]/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-[var(--bg-secondary)]">
                  <img src="/logo_mas.png" alt="Mas Awana Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Section Leader – Warehouse Operations</h3>
                  <p className="text-[var(--accent-primary)] font-medium">Mas Awana Services Sdn Bhd — Penang International Airport</p>
                  <p className="text-[var(--text-secondary)] text-sm">May 2024 – Dec 2025</p>
                </div>
              </div>
              <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-primary)]">▸</span>
                  Led time-sensitive logistics operations while ensuring 100% compliance with IATA regulations for Dangerous Goods handling.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-primary)]">▸</span>
                  Used Excel-based WMS to track real-time inventory, generate reports, and enforce FIFO/FEFO stock rotation.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-primary)]">▸</span>
                  Optimized warehouse layout for fast-moving items, reducing picker travel time and increasing throughput.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-primary)]">▸</span>
                  Managed a 60% surge in shipment volume during peak season while maintaining a 99.9% in-stock rate.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-primary)]">▸</span>
                  Maintained 90% inventory accuracy through regular cycle counts and audits.
                </li>
              </ul>
            </div>

            

            {/* Experience 2: Resonac */}
            <div className="bio-card bg-[var(--bg-card)]/15 backdrop-blur-sm rounded-xl p-6 border border-[var(--border-color)]/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-[var(--bg-secondary)]">
                  <img src="/logo_res.png" alt="Resonac Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Quality Control Specialist</h3>
                  <p className="text-[var(--accent-primary)] font-medium">Resonac Materials Malaysia — Perai, Penang</p>
                  <p className="text-[var(--text-secondary)] text-sm">Jun 2020 – Apr 2024</p>
                </div>
              </div>
              <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-primary)]">▸</span>
                  Conducted 100% quality testing on production samples to ensure product conformity.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-primary)]">▸</span>
                  Documented non-conformances and generated weekly reports to support root-cause analysis.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-primary)]">▸</span>
                  Streamlined inter-departmental handoffs by managing final sample approvals and clear communication channels.
                </li>
              </ul>
            </div>

            {/* Certifications */}
            <div className="bio-card bg-[var(--bg-card)]/15 backdrop-blur-sm rounded-xl p-6 border border-[var(--border-color)]/50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="text-[var(--accent-primary)]" />
                Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "Google", cert: "Advanced Data Analytics" },
                  { name: "Nexperts Academy", cert: "AI & ML Bootcamp" },
                  { name: "EMC", cert: "Certificate In Artificial Intelligence (MBOT)" },
                  { name: "365DataScience", cert: "Certificate in Power BI & SQL" },
                ].map((cert) => (
                  <div key={cert.name} className="bg-[var(--bg-secondary)]/30 rounded-lg p-3 border border-[var(--border-color)]/30">
                    <p className="text-[var(--accent-primary)] font-semibold text-sm">{cert.name}</p>
                    <p className="text-[var(--text-secondary)] text-xs">{cert.cert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
