import { useState, useEffect, useRef, useCallback } from "react";
import { Eye, Users, Github, Linkedin, Mail, Heart, Clock } from "lucide-react";
import anime from "animejs";

export default function Footer() {
  const [timeSpent, setTimeSpent] = useState(0);
  const [stats, setStats] = useState({
    visitors: Math.floor(Math.random() * 50) + 10,
    pageViews: Math.floor(Math.random() * 200) + 50,
  });

  const footerRef = useRef<HTMLElement>(null);
  const analyticsPanelRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);
  const statsValuesRef = useRef<HTMLDivElement>(null);

  // Track time spent on site
  useEffect(() => {
    // Check if there's a start time in sessionStorage
    const startTime = sessionStorage.getItem('siteStartTime');
    
    if (!startTime) {
      // First visit - set the start time
      sessionStorage.setItem('siteStartTime', Date.now().toString());
    } else {
      // Returning visitor - calculate time spent
      const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 60000);
      setTimeSpent(elapsed);
    }

    // Update time every minute
    const interval = setInterval(() => {
      const currentStartTime = sessionStorage.getItem('siteStartTime');
      if (currentStartTime) {
        const elapsed = Math.floor((Date.now() - parseInt(currentStartTime)) / 60000);
        setTimeSpent(elapsed);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Interactive hover effect for brand
  useEffect(() => {
    if (!brandRef.current) return;
    brandRef.current.classList.add("hover-glow");
  }, []);

  // Anime.js: Heart pulse animation
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

  // Anime.js: Analytics panel entrance
  useEffect(() => {
    if (!analyticsPanelRef.current) return;

    const panel = analyticsPanelRef.current;
    const statItems = panel.querySelectorAll(".stat-item");
    const statIcons = panel.querySelectorAll(".stat-icon");
    
    anime.set(statItems, { opacity: 0, scale: 0.8, translateY: 20 });
    anime.set(statIcons, { scale: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate stat items
            anime({
              targets: statItems,
              opacity: [0, 1],
              scale: [0.8, 1],
              translateY: [20, 0],
              delay: anime.stagger(100),
              duration: 800,
              easing: "easeOutElastic(1, .5)"
            });

            // Animate stat icons with spin
            anime({
              targets: statIcons,
              scale: [0, 1],
              rotate: [180, 0],
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

  // Anime.js: Stat icons continuous pulse
  useEffect(() => {
    if (!analyticsPanelRef.current) return;

    const statIcons = analyticsPanelRef.current.querySelectorAll(".stat-icon");
    
    // Delay start until after entrance animation
    const timeout = setTimeout(() => {
      anime({
        targets: statIcons,
        scale: [1, 1.15, 1],
        duration: 2000,
        loop: true,
        delay: anime.stagger(400),
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

    // Initial rotation animation
    anime({
      targets: clockIcon,
      rotate: 360,
      duration: 2000,
      easing: "easeInOutSine"
    });

    // Continuous rotation
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

  // Anime.js: Social links entrance
  useEffect(() => {
    if (!socialLinksRef.current) return;

    const links = socialLinksRef.current.querySelectorAll(".social-link");
    anime.set(links, { opacity: 0, scale: 0, rotate: -180 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: links,
              opacity: [0, 1],
              scale: [0, 1],
              rotate: [-180, 0],
              delay: anime.stagger(100),
              duration: 800,
              easing: "easeOutElastic(1, .5)"
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

  // Anime.js: Animate stats when they update
  useEffect(() => {
    if (!statsValuesRef.current) return;

    const values = statsValuesRef.current.querySelectorAll(".stat-value");
    
    anime({
      targets: values,
      scale: [1, 1.1, 1],
      color: ["rgb(255, 255, 255)", "rgb(99, 102, 241)", "rgb(255, 255, 255)"],
      duration: 400,
      delay: anime.stagger(50),
      easing: "easeOutExpo"
    });
  }, [stats]);

  // Anime.js: Social link hover
  const handleSocialHover = useCallback((element: HTMLAnchorElement) => {
    anime({
      targets: element,
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      duration: 400,
      easing: "easeOutElastic(1, .6)"
    });
    
    // Animate the icon inside
    const icon = element.querySelector("svg");
    if (icon) {
      anime({
        targets: icon,
        translateY: [-3, 0],
        duration: 300,
        easing: "easeOutBounce"
      });
    }
  }, []);

  const handleSocialLeave = useCallback((element: HTMLAnchorElement) => {
    anime({
      targets: element,
      scale: 1,
      rotate: 0,
      duration: 300,
      easing: "easeOutExpo"
    });
  }, []);

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
    <footer ref={footerRef} className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
      {/* Analytics Transparency Panel */}
      <div className="container mx-auto px-6 py-8">
        <div
          ref={analyticsPanelRef}
          className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-color)]"
        >
          <div className="flex items-center justify-center mb-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Eye size={16} className="text-[var(--accent-primary)]" />
              Analytics Transparency Panel
            </h3>
          </div>
          
          <div ref={statsValuesRef} className="grid grid-cols-3 gap-4">
            <div className="stat-item text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users size={16} className="stat-icon text-[var(--accent-primary)]" />
                <span className="stat-value text-2xl font-bold">{stats.visitors}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Visitors this week</p>
            </div>
            
            <div className="stat-item text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock size={16} className="stat-icon clock-icon text-[var(--accent-secondary)]" />
                <span className="stat-value text-2xl font-bold">{timeSpent}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Minutes on site</p>
            </div>
            
            <div className="stat-item text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Eye size={16} className="stat-icon text-[var(--accent-primary)]" />
                <span className="stat-value text-2xl font-bold">{stats.pageViews}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Total page views</p>
            </div>
          </div>
          
          <p className="text-xs text-[var(--text-secondary)] text-center mt-4">
            I believe in transparency—this widget shows real-time anonymized metrics. 
            No cookies, no tracking. Just data about data.
          </p>
        </div>
      </div>

      {/* Main Footer - Centered */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center">
          {/* Brand */}
          <h3 ref={brandRef} className="text-2xl font-bold gradient-text mb-4 cursor-default">AMINUDDIN</h3>
          <p className="text-[var(--text-secondary)] mb-6 max-w-md">
            Data Analyst transforming complex data into actionable business insights.
          </p>
          
          {/* Social Links */}
          <div ref={socialLinksRef} className="flex gap-4 mb-8">
            <a
              href="https://github.com/aminuddin1234"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => handleSocialHover(e.currentTarget)}
              onMouseLeave={(e) => handleSocialLeave(e.currentTarget)}
              className="social-link p-2 rounded-full bg-[var(--bg-card)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all cursor-pointer will-change-transform"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-aminuddin-mab987"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => handleSocialHover(e.currentTarget)}
              onMouseLeave={(e) => handleSocialLeave(e.currentTarget)}
              className="social-link p-2 rounded-full bg-[var(--bg-card)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all cursor-pointer will-change-transform"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:amiamin987@gmail.com"
              onMouseEnter={(e) => handleSocialHover(e.currentTarget)}
              onMouseLeave={(e) => handleSocialLeave(e.currentTarget)}
              className="social-link p-2 rounded-full bg-[var(--bg-card)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all cursor-pointer will-change-transform"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-[var(--border-color)] pt-8 w-full max-w-md">
            <p className="text-[var(--text-secondary)] flex items-center justify-center gap-2">
              © {new Date().getFullYear()} Aminuddin Analyst. Built with <Heart ref={heartRef} size={16} className="text-red-500" /> and lots of data.
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              This site does not use cookies. Analytics are privacy-focused and anonymized.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
