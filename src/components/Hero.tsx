import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedText from "./AnimatedText";
import anime from "animejs";
import TypingCodeBlock from "./TypingCodeBlock";
import styled from "styled-components";

interface HeroProps {
  onNavigate: (section: string) => void;
}

// Generating Loader Component for "I turn raw data into"
const GeneratingLoader = () => {
  return (
    <StyledGeneratingWrapper>
      <div className="loader-wrapper">
        <span className="loader-letter">I</span>
        <span className="loader-letter" style={{width: '0.4em'}}> </span>
        <span className="loader-letter">t</span>
        <span className="loader-letter">u</span>
        <span className="loader-letter">r</span>
        <span className="loader-letter">n</span>
        <span className="loader-letter" style={{width: '0.4em'}}> </span>
        <span className="loader-letter">r</span>
        <span className="loader-letter">a</span>
        <span className="loader-letter">w</span>
        <span className="loader-letter" style={{width: '0.4em'}}> </span>
        <span className="loader-letter">d</span>
        <span className="loader-letter">a</span>
        <span className="loader-letter">t</span>
        <span className="loader-letter">a</span>
        <span className="loader-letter" style={{width: '0.4em'}}> </span>
                <span className="loader-letter">i</span>
        <span className="loader-letter">n</span>
        <span className="loader-letter">t</span>
        <span className="loader-letter">o</span>
        {/* Colorful light bars */}
        <div className="light-bar bar-1" />
        <div className="light-bar bar-2" />
        <div className="light-bar bar-3" />
        <div className="light-bar bar-4" />
        <div className="light-bar bar-5" />
        <div className="light-bar bar-6" />
      </div>
    </StyledGeneratingWrapper>
  );
};

const StyledGeneratingWrapper = styled.div`
  .loader-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 60px;
    width: auto;
    font-family: "Poppins", sans-serif;
    font-size: 0.89em;
    font-weight: 600;
    user-select: none;
    color: #fff;
    overflow: hidden;
  }
  
  /* Colorful light bars */
  .light-bar {
    position: absolute;
    top: 0;
    height: 100%;
    width: 40px;
    border-radius: 20px;
    mix-blend-mode: screen;
    filter: blur(8px);
    opacity: 0.9;
  }
  
  .light-bar.bar-1 {
    background: linear-gradient(90deg, #ff6b6b, #ff8e53);
    animation: sweep-1 2s ease-in-out infinite;
  }
  .light-bar.bar-2 {
    background: linear-gradient(90deg, #4ecdc4, #44a3aa);
    animation: sweep-2 2.5s ease-in-out infinite;
    animation-delay: 0.3s;
  }
  .light-bar.bar-3 {
    background: linear-gradient(90deg, #a29bfe, #6c5ce7);
    animation: sweep-3 1.8s ease-in-out infinite;
    animation-delay: 0.6s;
  }
  .light-bar.bar-4 {
    background: linear-gradient(90deg, #fd79a8, #e84393);
    animation: sweep-4 2.2s ease-in-out infinite;
    animation-delay: 0.9s;
  }
  .light-bar.bar-5 {
    background: linear-gradient(90deg, #ffeaa7, #fdcb6e);
    animation: sweep-5 1.9s ease-in-out infinite;
    animation-delay: 1.2s;
  }
  .light-bar.bar-6 {
    background: linear-gradient(90deg, #00b894, #00cec9);
    animation: sweep-6 2.3s ease-in-out infinite;
    animation-delay: 1.5s;
  }
  
  @keyframes sweep-1 {
    0%, 100% { left: -50px; opacity: 0; }
    10%, 90% { opacity: 0.8; }
    50% { left: calc(100% + 50px); opacity: 0; }
  }
  @keyframes sweep-2 {
    0%, 100% { left: -50px; opacity: 0; }
    10%, 90% { opacity: 0.7; }
    50% { left: calc(100% + 50px); opacity: 0; }
  }
  @keyframes sweep-3 {
    0%, 100% { left: -50px; opacity: 0; }
    10%, 90% { opacity: 0.85; }
    50% { left: calc(100% + 50px); opacity: 0; }
  }
  @keyframes sweep-4 {
    0%, 100% { left: -50px; opacity: 0; }
    10%, 90% { opacity: 0.75; }
    50% { left: calc(100% + 50px); opacity: 0; }
  }
  @keyframes sweep-5 {
    0%, 100% { left: -50px; opacity: 0; }
    10%, 90% { opacity: 0.8; }
    50% { left: calc(100% + 50px); opacity: 0; }
  }
  @keyframes sweep-6 {
    0%, 100% { left: -50px; opacity: 0; }
    10%, 90% { opacity: 0.7; }
    50% { left: calc(100% + 50px); opacity: 0; }
  }
  
    .loader-letter {
    display: inline-block;
    opacity: 0.35;
    z-index: 2;
    animation: letter-glow 3s infinite ease-in-out;
  }
  
  .loader-letter:nth-child(1) { animation-delay: 0s; }
  .loader-letter:nth-child(2) { animation-delay: 0.1s; }
  .loader-letter:nth-child(3) { animation-delay: 0.2s; }
  .loader-letter:nth-child(4) { animation-delay: 0.3s; }
  .loader-letter:nth-child(5) { animation-delay: 0.4s; }
  .loader-letter:nth-child(6) { animation-delay: 0.5s; }
  .loader-letter:nth-child(7) { animation-delay: 0.6s; }
  .loader-letter:nth-child(8) { animation-delay: 0.7s; }
  .loader-letter:nth-child(9) { animation-delay: 0.8s; }
  .loader-letter:nth-child(10) { animation-delay: 0.9s; }
  .loader-letter:nth-child(11) { animation-delay: 1.0s; }
  .loader-letter:nth-child(12) { animation-delay: 1.1s; }
  .loader-letter:nth-child(13) { animation-delay: 1.2s; }
  .loader-letter:nth-child(14) { animation-delay: 1.3s; }
  .loader-letter:nth-child(15) { animation-delay: 1.4s; }
  .loader-letter:nth-child(16) { animation-delay: 1.5s; }
  .loader-letter:nth-child(17) { animation-delay: 1.6s; }
  .loader-letter:nth-child(18) { animation-delay: 1.7s; }
  .loader-letter:nth-child(19) { animation-delay: 1.8s; }
  
  @keyframes letter-glow {
    0%, 30% {
      opacity: 0.35;
      text-shadow: none;
    }
    35%, 45% {
      opacity: 1;
      text-shadow: 
        0 0 10px currentColor,
        0 0 20px currentColor,
        0 0 30px currentColor;
    }
    55%, 100% {
      opacity: 0.35;
      text-shadow: none;
    }
  }
  
      .loader-letter { color: #ffffff; }
  `;

// Capybara Loader - REMOVED (unused)

export default function Hero({ onNavigate }: HeroProps) {
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  

  // Floating background elements animation
  useEffect(() => {
    if (!floatingElementsRef.current) return;

    const blurs = floatingElementsRef.current.querySelectorAll(".floating-blur");

    blurs.forEach((blur, index) => {
      anime({
        targets: blur,
        translateX: [
          { value: index === 0 ? 30 : -30, duration: 3000 },
          { value: index === 0 ? -30 : 30, duration: 3000 }
        ],
        translateY: [
          { value: index === 0 ? -20 : 20, duration: 2500 },
          { value: index === 0 ? 20 : -20, duration: 2500 }
        ],
        scale: [
          { value: 1.1, duration: 2000 },
          { value: 1, duration: 2000 }
        ],
        loop: true,
        direction: "alternate",
        easing: "easeInOutSine"
      });
    });
  }, []);

  // CTA button pulse animation
  useEffect(() => {
    if (!ctaRef.current) return;

    const primaryBtn = ctaRef.current.querySelector(".btn-primary");
    if (primaryBtn) {
      anime({
        targets: primaryBtn,
        boxShadow: [
          "0 0 0 0 rgba(99, 102, 241, 0.4)",
          "0 0 0 15px rgba(99, 102, 241, 0)",
        ],
        loop: true,
        duration: 1500,
        easing: "easeOutExpo"
      });
    }
  }, []);

  // Anime.js: Greeting wave animation
  useEffect(() => {
    if (!greetingRef.current) return;

    anime({
      targets: greetingRef.current,
      translateY: [-5, 5, -5],
      duration: 3000,
      loop: true,
      easing: "easeInOutSine"
    });

    // Wave hand emoji animation
    anime({
      targets: greetingRef.current,
      rotate: [0, 15, -10, 15, 0],
      duration: 1500,
      loop: true,
      delay: 500,
      easing: "easeInOutSine"
    });
  }, []);

      // Interactive hover effect for headline - no heavy animations
  useEffect(() => {
    if (!headlineRef.current) return;

    const gradientText = headlineRef.current.querySelector(".gradient-text");
    if (gradientText) {
      // Add a subtle hover glow effect via CSS
      gradientText.classList.add("hover-glow");
    }
  }, []);

    // Anime.js: Arrow bounce animation
  useEffect(() => {
    if (!arrowRef.current) return;

    anime({
      targets: arrowRef.current,
      translateX: [0, 5, 0],
      duration: 1000,
      loop: true,
      easing: "easeInOutSine"
    });
  }, []);

  // Anime.js: Scroll indicator enhanced animation
  useEffect(() => {
    if (!scrollIndicatorRef.current) return;

    const outerRing = scrollIndicatorRef.current;
    const innerDot = scrollIndicatorRef.current.querySelector(".scroll-dot");

    // Outer ring pulse
    anime({
      targets: outerRing,
      borderColor: [
        "rgba(156, 163, 175, 0.5)",
        "rgba(99, 102, 241, 0.8)",
        "rgba(156, 163, 175, 0.5)"
      ],
      duration: 2000,
      loop: true,
      easing: "easeInOutSine"
    });

    // Inner dot glow
    if (innerDot) {
      anime({
        targets: innerDot,
        boxShadow: [
          "0 0 5px rgba(99, 102, 241, 0.5)",
          "0 0 15px rgba(99, 102, 241, 0.8)",
          "0 0 5px rgba(99, 102, 241, 0.5)"
        ],
        duration: 1500,
        loop: true,
        easing: "easeInOutSine"
      });
    }
  }, []);

  // Anime.js: Floating particles background
  useEffect(() => {
    if (!particlesRef.current) return;

    const particles = particlesRef.current.querySelectorAll(".particle");
    
    particles.forEach((particle, index) => {
      anime({
        targets: particle,
        translateY: [
          { value: -30, duration: 2000 + index * 500 },
          { value: 30, duration: 2000 + index * 500 }
        ],
        translateX: [
          { value: index % 2 === 0 ? 20 : -20, duration: 2500 },
          { value: index % 2 === 0 ? -20 : 20, duration: 2500 }
        ],
        opacity: [
          { value: 0.3, duration: 1500 },
          { value: 0.7, duration: 1500 },
          { value: 0.3, duration: 1500 }
        ],
        scale: [
          { value: 1.2, duration: 2000 },
          { value: 0.8, duration: 2000 },
          { value: 1, duration: 2000 }
        ],
        loop: true,
        delay: index * 300,
        easing: "easeInOutSine"
      });
    });
  }, []);

  return (
    <section id="hero" className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Penang Blueprint Image - Blended Background */}
        <img 
          src="/penang_blueprint.png" 
          alt="Penang Blueprint"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten"
        />
        
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)] opacity-70" />
        
        {/* Decorative blurs with anime.js floating animation */}
        <div ref={floatingElementsRef}>
          <div className="floating-blur absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent-primary)] rounded-full opacity-10 blur-3xl will-change-transform" />
          <div className="floating-blur absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent-secondary)] rounded-full opacity-10 blur-3xl will-change-transform" />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(42,42,58,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(42,42,58,0.3)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

        
        
        {/* Floating particles */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="particle absolute top-1/4 left-1/3 w-2 h-2 bg-[var(--accent-primary)] rounded-full opacity-50 will-change-transform" />
          <div className="particle absolute top-1/2 left-1/4 w-3 h-3 bg-[var(--accent-secondary)] rounded-full opacity-40 will-change-transform" />
          <div className="particle absolute top-3/4 left-2/3 w-2 h-2 bg-[var(--accent-primary)] rounded-full opacity-60 will-change-transform" />
          <div className="particle absolute top-1/3 left-3/4 w-2 h-2 bg-[var(--accent-secondary)] rounded-full opacity-50 will-change-transform" />
          <div className="particle absolute top-2/3 left-1/5 w-3 h-3 bg-[var(--accent-primary)] rounded-full opacity-40 will-change-transform" />
          <div className="particle absolute top-1/5 left-1/2 w-2 h-2 bg-[var(--accent-secondary)] rounded-full opacity-50 will-change-transform" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
                          <div className="flex items-center gap-4 mb-4">
                <p ref={greetingRef} className="text-[var(--accent-primary)] font-medium inline-block will-change-transform">
                  👋 Hello, I'm Aminuddin!
                </p>
                </div>
          </motion.div>

          {/* Animated headline with animejs */}
        <div ref={headlineRef} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <GeneratingLoader />
          <span className="gradient-text ml-2 inline-block hover:scale-105 transition-transform duration-300 cursor-default">
            <AnimatedText
              text="Business Insights"
                animation="wave"
                delay={1200}
                duration={800}
                loop={true}
                className="inline-block"
              />
            </span>
                    </div>

          {/* Mac Preview Card */}
          <motion.div
            className="w-full max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="card bg-black border border-[#0d1117] rounded-xl p-6 shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <h3 className="text-[20px] font-bold text-[#e6e6ef] mb-4">Data Analyst Portfolio</h3>
          <p className="text-[#b0b0b0] text-[15px] leading-relaxed mb-7">
            <span className="text-[#e6b566] font-medium">Full-stack Data Analytics: From SQL queries to Executive Dashboards.</span>
            
          </p>
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="text-[12px] bg-[#0d1117] rounded px-3 py-2 text-[#dcdcdc]">SQL </span>
          <span className="text-[12px] bg-[#0d1117] rounded px-3 py-2 text-[#dcdcdc]">Excel</span>
          <span className="text-[12px] bg-[#0d1117] rounded px-3 py-2 text-[#dcdcdc]">Python </span>
          <span className="text-[12px] bg-[#0d1117] rounded px-3 py-2 text-[#dcdcdc]"> BI Tools</span>
        </div>
        <div className="bg-[rgba(13,17,23,0.5)] rounded-lg p-5 font-mono text-[14px] leading-relaxed border border-[#333] h-[350px] overflow-auto text-[#dcdcdc]">
          <TypingCodeBlock />
                </div>
      </div>
      </motion.div>
    </div>

          {/* CTA Buttons with anime.js pulse */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate("projects")}
              className="btn-primary flex items-center gap-2"
            >
              View My Work 
              <ArrowRight ref={arrowRef} size={18} className="will-change-transform" />
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="btn-secondary flex items-center gap-2"
            >
              Get In Touch
            </button>
          </div>

          
        </div>

        {/* Scroll indicator */}
        <motion.div
          ref={scrollIndicatorRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-[var(--text-secondary)] flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="scroll-dot w-1 h-3 bg-[var(--accent-primary)] rounded-full mt-2 will-change-transform"
            />
                    </motion.div>
        </motion.div>
    </section>
  );
}
