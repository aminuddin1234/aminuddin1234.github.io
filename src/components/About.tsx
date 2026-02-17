import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Users,
  TrendingUp,
  Target,
  Calendar,
  Download,
} from "lucide-react";
import anime from "animejs";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);
  const decorativeBlursRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bioCardsRef = useRef<HTMLDivElement>(null);
  const skillsListRef = useRef<HTMLUListElement>(null);
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

  // Anime.js: Stats counter and entrance animation
  useEffect(() => {
    if (!statsRef.current) return;

    const statCards = statsRef.current.querySelectorAll(".stat-card");
    
    anime.set(statCards, {
      opacity: 0,
      scale: 0.8,
      translateY: 20
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Staggered entrance
            anime({
              targets: statCards,
              opacity: [0, 1],
              scale: [0.8, 1],
              translateY: [20, 0],
              delay: anime.stagger(100),
              duration: 800,
              easing: "easeOutElastic(1, .5)"
            });

            // Counter animation for stat values
            statCards.forEach((card) => {
              const valueEl = card.querySelector(".stat-value");
              if (valueEl) {
                const text = valueEl.textContent || "";
                const numMatch = text.match(/\d+/);
                if (numMatch) {
                  const targetNum = parseInt(numMatch[0]);
                  const suffix = text.replace(/\d+/, "");
                  
                  const obj = { value: 0 };
                  anime({
                    targets: obj,
                    value: targetNum,
                    round: 1,
                    duration: 2000,
                    delay: 400,
                    easing: "easeOutExpo",
                    update: function() {
                      valueEl.textContent = Math.round(obj.value) + suffix;
                    }
                  });
                }
              }
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
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

  // Anime.js: Skills list staggered reveal
  useEffect(() => {
    if (!skillsListRef.current) return;

    const items = skillsListRef.current.querySelectorAll("li");
    
    anime.set(items, {
      opacity: 0,
      translateX: -20
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: items,
              opacity: [0, 1],
              translateX: [-20, 0],
              delay: anime.stagger(80),
              duration: 600,
              easing: "easeOutExpo"
            });

            // Animate bullet points
            const bullets = skillsListRef.current?.querySelectorAll(".bullet-arrow");
            if (bullets) {
              anime({
                targets: bullets,
                translateX: [-10, 0],
                opacity: [0, 1],
                delay: anime.stagger(80, { start: 100 }),
                duration: 400,
                easing: "easeOutExpo"
              });
            }

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(skillsListRef.current);
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
                    <span className="text-6xl">👨‍💻</span>
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

          {/* Bio & Philosophy */}
          <div ref={bioCardsRef} className="flex-1 space-y-6">
            <div className="bio-card bg-[var(--bg-card)]/15 backdrop-blur-sm rounded-xl p-6 border border-[var(--border-color)]/50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="text-[var(--accent-primary)]" />
                My Analytical Philosophy
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                "
                <span className="text-[var(--text-primary)] font-medium">
                  I believe clean data &gt; complex models.
                </span>
                " In a world obsessed with sophisticated algorithms, I focus on
                the fundamentals: understanding the data, the business question,
                and delivering actionable insights that stakeholders can
                actually use.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Every analysis starts with a question, not a tool. Whether it is
                predicting churn, optimizing inventory, or identifying revenue
                opportunities, I approach each problem with curiosity and rigor.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, label: "Projects Completed", value: "10+" },
                { icon: Users, label: "Happy Stakeholders", value: "10+" },
                { icon: TrendingUp, label: "Business Impact", value: "RM 4k+" },
                { icon: Calendar, label: "Years Experience", value: "2+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="stat-card bg-[var(--bg-card)]/15 backdrop-blur-sm rounded-xl p-4 border border-[var(--border-color)]/50"
                >
                  <stat.icon                    className="text-[var(--accent-primary)] mb-2"
                    size={24}
                  />
                  <p className="stat-value text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* What I bring */}
            <div className="bio-card bg-[var(--bg-card)]/15 backdrop-blur-sm rounded-xl p-6 border border-[var(--border-color)]/50">
              <h4 className="font-semibold mb-3">What I Bring to Your Team:</h4>
              <ul ref={skillsListRef} className="space-y-2 text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="bullet-arrow text-[var(--accent-primary)]">▸</span>
                  Strong SQL and Python for data manipulation and analysis
                </li>
                <li className="flex items-start gap-2">
                  <span className="bullet-arrow text-[var(--accent-primary)]">▸</span>
                  Interactive dashboard development (Power BI, Tableau)
                </li>
                <li className="flex items-start gap-2">
                  <span className="bullet-arrow text-[var(--accent-primary)]">▸</span>
                  Machine learning for predictive analytics
                </li>
                <li className="flex items-start gap-2">
                  <span className="bullet-arrow text-[var(--accent-primary)]">▸</span>
                  Business acumen to translate data into decisions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
