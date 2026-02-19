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

// Capybara Loader Component
const CapybaraLoader = () => {
  return (
    <StyledWrapper>
      <div className="capybaraloader">
        <div className="capybara">
          <div className="capyhead">
            <div className="capyear">
              <div className="capyear2" />
            </div>
            <div className="capyear" />
            <div className="capymouth">
              <div className="capylips" />
              <div className="capylips" />
            </div>
            <div className="capyeye" />
            <div className="capyeye" />
          </div>
          <div className="capyleg" />
          <div className="capyleg2" />
          <div className="capyleg2" />
          <div className="capy" />
        </div>
        <div className="loader">
          <div className="loaderline" />
        </div>
        {/* Walking animation container */}
        <div className="walking-capy">
          <div className="capybara-walk">
            <div className="capy-body">
              <div className="capy-head">
                <div className="capy-ear" />
                <div className="capy-ear" />
                <div className="capy-eye" />
                <div className="capy-eye" />
                <div className="capy-nose" />
              </div>
              <div className="capy-legs">
                <div className="capy-leg" />
                <div className="capy-leg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .capybaraloader {
    width: 14em;
    height: 10em;
    position: relative;
    z-index: 1;
    --color: rgb(204, 125, 45);
    --color2: rgb(83, 56, 28);
    transform: scale(0.75);
  }
  .capybara {
    width: 100%;
    height: 7.5em;
    position: relative;
    z-index: 1;
  }
  .loader {
    width: 100%;
    height: 2.5em;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }
  .capy {
    width: 85%;
    height: 100%;
    background: linear-gradient(var(--color), 90%, var(--color2));
    border-radius: 45%;
    position: relative;
    z-index: 1;
    animation: movebody 1s linear infinite;
  }
  .capyhead {
    width: 7.5em;
    height: 7em;
    bottom: 0em;
    right: 0em;
    position: absolute;
    background-color: var(--color);
    z-index: 3;
    border-radius: 3.5em;
    box-shadow: -1em 0em var(--color2);
    animation: movebody 1s linear infinite;
  }
  .capyear {
    width: 2em;
    height: 2em;
    background: linear-gradient(-45deg, var(--color), 90%, var(--color2));
    top: 0em;
    left: 0em;
    border-radius: 100%;
    position: absolute;
    overflow: hidden;
    z-index: 3;
  }
  .capyear:nth-child(2) {
    left: 5em;
    background: linear-gradient(25deg, var(--color), 90%, var(--color2));
  }
  .capyear2 {
    width: 100%;
    height: 1em;
    background-color: var(--color2);
    bottom: 0em;
    left: 0.5em;
    border-radius: 100%;
    position: absolute;
    transform: rotate(-45deg);
  }
  .capymouth {
    width: 3.5em;
    height: 2em;
    background-color: var(--color2);
    position: absolute;
    bottom: 0em;
    left: 2.5em;
    border-radius: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.5em;
  }
  .capylips {
    width: 0.25em;
    height: 0.75em;
    border-radius: 100%;
    transform: rotate(-45deg);
    background-color: var(--color);
  }
  .capylips:nth-child(2) {
    transform: rotate(45deg);
  }
  .capyeye {
    width: 2em;
    height: 0.5em;
    background-color: var(--color2);
    position: absolute;
    bottom: 3.5em;
    left: 1.5em;
    border-radius: 5em;
    transform: rotate(45deg);
  }
  .capyeye:nth-child(4) {
    transform: rotate(-45deg);
    left: 5.5em;
    width: 1.75em;
  }
  .capyleg {
    width: 6em;
    height: 5em;
    bottom: 0em;
    left: 0em;
    position: absolute;
    background: linear-gradient(var(--color), 95%, var(--color2));
    z-index: 2;
    border-radius: 2em;
    animation: movebody 1s linear infinite;
  }
  .capyleg2 {
    width: 1.75em;
    height: 3em;
    bottom: 0em;
    left: 3.25em;
    position: absolute;
    background: linear-gradient(var(--color), 80%, var(--color2));
    z-index: 2;
    border-radius: 0.75em;
    box-shadow: inset 0em -0.5em var(--color2);
    animation: moveleg 1s linear infinite;
  }
  .capyleg2:nth-child(3) {
    width: 1.25em;
    left: 0.5em;
    height: 2em;
    animation: moveleg2 1s linear infinite 0.075s;
  }
  @keyframes moveleg {
    0% {
      transform: rotate(-45deg) translateX(-5%);
    }
    50% {
      transform: rotate(45deg) translateX(5%);
    }
    100% {
      transform: rotate(-45deg) translateX(-5%);
    }
  }
  @keyframes moveleg2 {
    0% {
      transform: rotate(45deg);
    }
    50% {
      transform: rotate(-45deg);
    }
    100% {
      transform: rotate(45deg);
    }
  }
  @keyframes movebody {
    0% {
      transform: translateX(0%);
    }
    50% {
      transform: translateX(2%);
    }
    100% {
      transform: translateX(0%);
    }
  }
    .loaderline {
    width: 50em;
    height: 0.5em;
    border-top: 0.5em dashed var(--color2);
    animation: moveline 10s linear infinite;
  }
  @keyframes moveline {
    0% {
      transform: translateX(0%);
      opacity: 0%;
    }
    5% {
      opacity: 100%;
    }
    95% {
      opacity: 100%;
    }
    100% {
      opacity: 0%;
      transform: translateX(-70%);
    }
  }
  
  /* Walking Capybara on code preview */
  .walking-capy {
    position: absolute;
    top: -30px;
    left: 0;
    width: 100%;
    overflow: hidden;
  }
  
  .capybara-walk {
    display: flex;
    animation: walkAcross 8s linear infinite;
  }
  
  .capy-body {
    width: 50px;
    height: 30px;
    background: linear-gradient(135deg, #cc7d2d 0%, #53381c 100%);
    border-radius: 15px;
    position: relative;
    flex-shrink: 0;
  }
  
  .capy-head {
    position: absolute;
    right: -15px;
    top: 0;
    width: 22px;
    height: 20px;
    background: linear-gradient(135deg, #cc7d2d 0%, #53381c 100%);
    border-radius: 10px;
  }
  
  .capy-ear {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #53381c;
    border-radius: 50%;
    top: -3px;
  }
  
  .capy-ear:first-child {
    left: 2px;
  }
  
  .capy-ear:last-child {
    right: 2px;
  }
  
  .capy-eye {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #1a1a1a;
    border-radius: 50%;
    top: 6px;
  }
  
  .capy-eye:first-child {
    left: 4px;
  }
  
  .capy-eye:last-child {
    right: 4px;
  }
  
  .capy-nose {
    position: absolute;
    right: -3px;
    top: 8px;
    width: 5px;
    height: 4px;
    background: #3d2814;
    border-radius: 2px;
  }
  
  .capy-legs {
    position: absolute;
    bottom: -8px;
    left: 5px;
    display: flex;
    gap: 20px;
  }
  
  .capy-leg {
    width: 8px;
    height: 10px;
    background: #53381c;
    border-radius: 4px;
    animation: legMove 0.5s ease-in-out infinite alternate;
  }
  
  .capy-leg:last-child {
    animation-delay: 0.25s;
  }
  
  @keyframes walkAcross {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(200px);
    }
  }
  
  @keyframes legMove {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-3px);
    }
  }
`;

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

  // Anime.js: Headline glow pulse
  useEffect(() => {
    if (!headlineRef.current) return;

    const gradientText = headlineRef.current.querySelector(".gradient-text");
    if (gradientText) {
      anime({
        targets: gradientText,
        textShadow: [
          "0 0 10px rgba(99, 102, 241, 0.3), 0 0 20px rgba(139, 92, 246, 0.2)",
          "0 0 25px rgba(99, 102, 241, 0.5), 0 0 50px rgba(139, 92, 246, 0.4)",
          "0 0 10px rgba(99, 102, 241, 0.3), 0 0 20px rgba(139, 92, 246, 0.2)"
        ],
        duration: 2500,
        loop: true,
        easing: "easeInOutSine"
      });
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
          <div className="floating-blur absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent-primary)] rounded-full opacity-10 blur-3xl" />
          <div className="floating-blur absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent-secondary)] rounded-full opacity-10 blur-3xl" />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(42,42,58,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(42,42,58,0.3)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

        
        
        {/* Floating particles */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="particle absolute top-1/4 left-1/3 w-2 h-2 bg-[var(--accent-primary)] rounded-full opacity-50" />
          <div className="particle absolute top-1/2 left-1/4 w-3 h-3 bg-[var(--accent-secondary)] rounded-full opacity-40" />
          <div className="particle absolute top-3/4 left-2/3 w-2 h-2 bg-[var(--accent-primary)] rounded-full opacity-60" />
          <div className="particle absolute top-1/3 left-3/4 w-2 h-2 bg-[var(--accent-secondary)] rounded-full opacity-50" />
          <div className="particle absolute top-2/3 left-1/5 w-3 h-3 bg-[var(--accent-primary)] rounded-full opacity-40" />
          <div className="particle absolute top-1/5 left-1/2 w-2 h-2 bg-[var(--accent-secondary)] rounded-full opacity-50" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
                          <div className="flex items-center gap-4 mb-4">
                <p ref={greetingRef} className="text-[var(--accent-primary)] font-medium inline-block">
                  👋 Hello, I'm Aminuddin!
                </p>
                {/* Capybara beside greeting */}
                <div className="hidden md:block">
                  <CapybaraLoader />
                </div>
              </div>
          </motion.div>

          {/* Animated headline with animejs */}
          <div ref={headlineRef} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <AnimatedText
              text="I turn raw data into"
              animation="letterByLetter"
              delay={300}
              duration={600}
              className="inline-block"
            />
            <span className="gradient-text ml-2">
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

           
                {/* Mac Preview */}
      <div className="w-full max-w-3xl mx-auto">
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
    </div>

          {/* CTA Buttons with anime.js pulse */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate("projects")}
              className="btn-primary flex items-center gap-2"
            >
              View My Work 
              <ArrowRight ref={arrowRef} size={18} />
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
          transition={{ delay: 1 }}
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
              className="scroll-dot w-1 h-3 bg-[var(--accent-primary)] rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
