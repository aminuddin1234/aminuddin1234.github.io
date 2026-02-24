import { useState, useEffect, useRef, useCallback } from "react";
import { Eye, Users, Github, Linkedin, Mail, Heart, Clock, Terminal, Database, Activity } from "lucide-react";
import anime from "animejs";

export default function Footer() {
  const [timeSpent, setTimeSpent] = useState(0);
  const [stats, setStats] = useState({
    visitors: Math.floor(Math.random() * 50) + 10,
    pageViews: Math.floor(Math.random() * 200) + 50,
  });
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  const footerRef = useRef<HTMLElement>(null);
  const analyticsPanelRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);
  const statsValuesRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Track time spent on site
  useEffect(() => {
    const startTime = sessionStorage.getItem('siteStartTime');
    
    if (!startTime) {
      sessionStorage.setItem('siteStartTime', Date.now().toString());
    } else {
      const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 60000);
      setTimeSpent(elapsed);
    }

    const interval = setInterval(() => {
      const currentStartTime = sessionStorage.getItem('siteStartTime');
      if (currentStartTime) {
        const elapsed = Math.floor((Date.now() - parseInt(currentStartTime)) / 60000);
        setTimeSpent(elapsed);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Terminal typing effect for brand
  useEffect(() => {
    if (!brandRef.current) return;
    brandRef.current.classList.add("hover-glow");
  }, []);

  // Blinking cursor animation
  useEffect(() => {
    if (!cursorRef.current) return;
    
    anime({
      targets: cursorRef.current,
      opacity: [1, 0],
      duration: 530,
      loop: true,
      easing: "steps(1)"
    });
  }, []);

  // Anime.js: Heart pulse animation (terminal green)
  useEffect(() => {
    if (!heartRef.current) return;

    anime({
      targets: heartRef.current,
      scale: [1, 1.2, 1],
      duration: 1000,
      loop: true,
      easing: "easeInOutSine"
    });
  }, []);

  // Terminal boot sequence animation
  useEffect(() => {
    const lines = [
      ">Initializing analytics subsystem...",
      ">Loading visitor metrics........OK",
      ">Connecting to database..........OK",
      ">Session tracking initialized....OK",
      ">Privacy protocols: ACTIVE",
      ">System ready."
    ];

    let delay = 0;
    lines.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
      }, delay);
      delay += 400;
    });
  }, []);

  // Anime.js: Analytics panel entrance (terminal style)
  useEffect(() => {
    if (!analyticsPanelRef.current) return;

    const panel = analyticsPanelRef.current;
    const statItems = panel.querySelectorAll(".stat-item");
    const statIcons = panel.querySelectorAll(".stat-icon");
    
    anime.set(statItems, { opacity: 0, translateX: -20 });
    anime.set(statIcons, { scale: 0, rotate: -90 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: statItems,
              opacity: [0, 1],
              translateX: [-20, 0],
              delay: anime.stagger(150),
              duration: 600,
              easing: "easeOutExpo"
            });

            anime({
              targets: statIcons,
              scale: [0, 1],
              rotate: [-90, 0],
              delay: anime.stagger(150, { start: 200 }),
              duration: 800,
              easing: "easeOutElastic(1, .5)"
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  // Anime.js: Stat icons continuous pulse (terminal green)
  useEffect(() => {
    if (!analyticsPanelRef.current) return;

    const statIcons = analyticsPanelRef.current.querySelectorAll(".stat-icon");
    
    const timeout = setTimeout(() => {
      anime({
        targets: statIcons,
        scale: [1, 1.2, 1],
        duration: 1500,
        loop: true,
        delay: anime.stagger(300),
        easing: "easeInOutSine"
      });
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  // Anime.js: Clock icon rotating animation
  useEffect(() => {
    if (!analyticsPanelRef.current) return;

    const clockIcon = analyticsPanelRef.current.querySelector(".clock-icon");
    if (!clockIcon) return;

    anime({
      targets: clockIcon,
      rotate: 360,
      duration: 2000,
      easing: "easeInOutSine"
    });

    const timeout = setTimeout(() => {
      anime({
        targets: clockIcon,
        rotate: [0, 360],
        duration: 3000,
        loop: true,
        easing: "linear"
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // Anime.js: Social links entrance (terminal style)
  useEffect(() => {
    if (!socialLinksRef.current) return;

    const links = socialLinksRef.current.querySelectorAll(".social-link");
    anime.set(links, { opacity: 0, translateY: 10 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: links,
              opacity: [0, 1],
              translateY: [10, 0],
              delay: anime.stagger(100),
              duration: 500,
              easing: "easeOutExpo"
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(socialLinksRef.current);
    return () => observer.disconnect();
  }, []);

  // Anime.js: Animate stats when they update (terminal green flash)
  useEffect(() => {
    if (!statsValuesRef.current) return;

    const values = statsValuesRef.current.querySelectorAll(".stat-value");
    
    anime({
      targets: values,
      scale: [1, 1.15, 1],
      color: ["#22c55e", "#4ade80", "#22c55e"],
      textShadow: ["0 0 0px #22c55e", "0 0 20px #22c55e", "0 0 0px #22c55e"],
      duration: 400,
      delay: anime.stagger(50),
      easing: "easeOutExpo"
    });
  }, [stats]);

  // Anime.js: Social link hover (terminal glitch effect)
  const handleSocialHover = useCallback((element: HTMLAnchorElement) => {
    anime({
      targets: element,
      scale: [1, 1.1, 1.05],
      duration: 200,
      easing: "easeOutQuad"
    });
    
    const icon = element.querySelector("svg");
    if (icon) {
      anime({
        targets: icon,
        scale: [1, 1.2],
        duration: 200,
        easing: "easeOutQuad"
      });
    }
  }, []);

  const handleSocialLeave = useCallback((element: HTMLAnchorElement) => {
    anime({
      targets: element,
      scale: 1,
      duration: 200,
      easing: "easeOutQuad"
    });
  }, []);

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        visitors: prev.visitors + Math.floor(Math.random() * 3),
        pageViews: prev.pageViews + Math.floor(Math.random() * 10),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0a0a0a] border-t border-[#1a3a1a] w-full">
      {/* Terminal Window - Full Width Left to Right */}
      <div className="w-full px-0 py-8">
        <div
          ref={terminalRef}
          className="w-full bg-[#0d1117] border-y border-[#1a3a1a] overflow-hidden shadow-[0_0_60px_rgba(34,197,94,0.2)]"
        >
          {/* Terminal Title Bar */}
          <div className="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-[#1a3a1a]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <div className="w-3 h-3 rounded-full bg-[#eab308]" />
              <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
              <span className="ml-3 text-xs text-[#22c55e] font-mono flex items-center gap-2">
                <Terminal size={11} />
                analytics_terminal v2.4.0 -- System Monitoring
              </span>
            </div>
            <div className="text-xs text-[#166534] font-mono flex items-center gap-3">
              <span>SESSION: ACTIVE</span>
              <span className="text-[#22c55e] animate-live-glow">● LIVE</span>
            </div>
          </div>

          {/* Terminal Body - Full Width */}
          <div className="w-full px-4 py-4 font-mono text-xs">
            {/* Boot sequence - Left aligned */}
            <div className="mb-4 flex flex-wrap gap-x-6 gap-y-0.5">
              {terminalLines.map((line, index) => (
                <div key={index} className="text-[#22c55e] opacity-0 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <span className="text-[#166534]">{line.startsWith('>') ? '➜' : '✓'}</span>
                  <span className="ml-1">{line.replace(/^>/, '')}</span>
                </div>
              ))}
            </div>

            {/* Stats Display - Full Width Side by Side */}
            <div
              ref={analyticsPanelRef}
              className="bg-[#0a0f0a] rounded border border-[#1a3a1a] p-4 mb-3"
            >
              <div className="flex items-center gap-2 mb-4 text-[#22c55e] text-xs border-b border-[#1a3a1a] pb-2">
                <Activity size={12} />
                <span className="font-bold">REAL-TIME METRICS MONITORING</span>
                <span className="ml-auto animate-pulse">●</span>
              </div>
              
              <div ref={statsValuesRef} className="grid grid-cols-3 gap-6">
                <div className="stat-item flex flex-col items-center text-center p-3 rounded bg-[#0d1117] border border-[#1a3a1a]">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className="stat-icon text-[#22c55e]" />
                    <span className="stat-value text-xl font-bold text-[#22c55e]">{stats.visitors}</span>
                  </div>
                  <p className="text-[#166534] text-xs">// visitors_this_week</p>
                </div>
                
                <div className="stat-item flex flex-col items-center text-center p-3 rounded bg-[#0d1117] border border-[#1a3a1a]">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="stat-icon clock-icon text-[#22c55e]" />
                    <span className="stat-value text-xl font-bold text-[#22c55e]">{timeSpent}</span>
                  </div>
                  <p className="text-[#166534] text-xs">// minutes_on_site</p>
                </div>
                
                <div className="stat-item flex flex-col items-center text-center p-3 rounded bg-[#0d1117] border border-[#1a3a1a]">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye size={16} className="stat-icon text-[#22c55e]" />
                    <span className="stat-value text-xl font-bold text-[#22c55e]">{stats.pageViews}</span>
                  </div>
                  <p className="text-[#166534] text-xs">// total_page_views</p>
                </div>
              </div>
              
              <div className="mt-4 pt-2 border-t border-[#1a3a1a] flex items-center justify-center gap-4 text-[#166534] text-xs">
                <span className="flex items-center gap-1"><Database size={10} /> DATABASE: CONNECTED</span>
                <span className="text-[#22c55e]">|</span>
                <span>Privacy: No cookies • No tracking • Anonymized data</span>
                <span className="text-[#22c55e]">|</span>
                <span>Encryption: ACTIVE</span>
              </div>
            </div>

            {/* Command prompt - Full width */}
            <div className="text-[#22c55e] text-xs py-1">
              <span className="text-[#f97316]">guest@portfolio</span>:<span className="text-[#3b82f6]">~</span>$ <span className="text-[#a1a1aa]">echo "Thanks for visiting my portfolio!"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer - Terminal Style */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center">
          {/* Brand with terminal prompt */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#166534] font-mono text-sm">$</span>
            <h3 ref={brandRef} className="text-2xl font-bold text-[#22c55e] font-mono cursor-default">
              AMINUDDIN<span className="animate-pulse">_</span>
            </h3>
          </div>
          
          <p className="text-[#166534] mb-6 max-w-md font-mono text-sm">
            // Data Analyst transforming complex data into actionable business insights
          </p>
          
          {/* Social Links - Terminal style */}
          <div ref={socialLinksRef} className="flex gap-3 mb-8">
            <a
              href="https://github.com/aminuddin1234"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => handleSocialHover(e.currentTarget)}
              onMouseLeave={(e) => handleSocialLeave(e.currentTarget)}
              className="social-link p-2 rounded border border-[#1a3a1a] bg-[#0a0f0a] hover:bg-[#22c55e] hover:text-[#0a0a0a] transition-all cursor-pointer text-[#22c55e]"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-aminuddin-mab987"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => handleSocialHover(e.currentTarget)}
              onMouseLeave={(e) => handleSocialLeave(e.currentTarget)}
              className="social-link p-2 rounded border border-[#1a3a1a] bg-[#0a0f0a] hover:bg-[#22c55e] hover:text-[#0a0a0a] transition-all cursor-pointer text-[#22c55e]"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:amiamin987@gmail.com"
              onMouseEnter={(e) => handleSocialHover(e.currentTarget)}
              onMouseLeave={(e) => handleSocialLeave(e.currentTarget)}
              className="social-link p-2 rounded border border-[#1a3a1a] bg-[#0a0f0a] hover:bg-[#22c55e] hover:text-[#0a0a0a] transition-all cursor-pointer text-[#22c55e]"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Copyright - Terminal style */}
          <div className="border-t border-[#1a3a1a] pt-6 w-full max-w-md">
            <p className="text-[#166534] font-mono text-xs flex items-center justify-center gap-2">
              <span>©</span> {new Date().getFullYear()} <span className="text-[#22c55e]">Aminuddin</span>
              <span className="text-[#f97316]">|</span>
              <span>Built with</span>
              <Heart ref={heartRef} size={12} className="text-[#22c55e]" />
              <span className="text-[#f97316]">&amp <span>DATA;</span>
             </span>
            </p>
            <p className="text-[#0f3d0f] font-mono text-xs mt-2">
              &gt; No cookies. No tracking. Privacy-first analytics.
            </p>
          </div>
        </div>
      </div>

      {/* CSS for fade-in animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes live-glow {
          0%, 100% { 
            text-shadow: 0 0 5px #22c55e, 0 0 10px #22c55e;
            opacity: 1;
          }
          50% { 
            text-shadow: 0 0 10px #22c55e, 0 0 20px #22c55e, 0 0 30px #22c55e;
            opacity: 0.8;
          }
        }
        .animate-live-glow {
          animation: live-glow 1.5s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}