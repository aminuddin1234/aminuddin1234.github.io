import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronDown, ChevronUp, BarChart3, Database, Code, Presentation, Lightbulb } from "lucide-react";
import { projects, filterOptions } from "../data/projects";
import AnimatedText from "./AnimatedText";
import anime from "animejs";

interface Project {
  id: number;
  title: string;
  description: string;
  tools: string[];
  domain: string;
  situation: string;
  task: string;
  analysis: string;
  result: string;
  learning: string;
  metrics?: { label: string; value: string }[];
  github?: string;
  liveLink?: string;
}

interface ProjectsProps {}

export default function Projects({}: ProjectsProps) {
  const [activeTool, setActiveTool] = useState("All");
  const [activeDomain, setActiveDomain] = useState("All");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const toolFiltersRef = useRef<HTMLDivElement>(null);
  const domainFiltersRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const glowingTextRef = useRef<HTMLSpanElement>(null);

  // Anime.js: Staggered filter buttons entrance
  useEffect(() => {
    if (!toolFiltersRef.current) return;
    const buttons = toolFiltersRef.current.querySelectorAll("button");
    
    anime.set(buttons, { opacity: 0, scale: 0.8, translateY: 20 });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: buttons,
              opacity: [0, 1],
              scale: [0.8, 1],
              translateY: [20, 0],
              delay: anime.stagger(50),
              duration: 600,
              easing: "easeOutElastic(1, .6)"
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(toolFiltersRef.current);
    return () => observer.disconnect();
  }, []);

  // Anime.js: Domain filters entrance
  useEffect(() => {
    if (!domainFiltersRef.current) return;
    const buttons = domainFiltersRef.current.querySelectorAll("button");
    
    anime.set(buttons, { opacity: 0, scale: 0.8 });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: buttons,
              opacity: [0, 1],
              scale: [0.8, 1],
              delay: anime.stagger(40, { start: 200 }),
              duration: 500,
              easing: "easeOutBack"
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(domainFiltersRef.current);
    return () => observer.disconnect();
  }, []);

  // Anime.js: Glowing text animation for "Projects" title
  useEffect(() => {
    if (!glowingTextRef.current) return;

    const textElement = glowingTextRef.current;
    
    // Initial state
    anime.set(textElement, {
      textShadow: "0 0 0px rgba(99, 102, 241, 0)"
    });

    // Continuous glow pulse animation
    anime({
      targets: textElement,
      textShadow: [
        "0 0 5px rgba(99, 102, 241, 0.3), 0 0 10px rgba(99, 102, 241, 0.2), 0 0 15px rgba(99, 102, 241, 0.1)",
        "0 0 20px rgba(99, 102, 241, 0.8), 0 0 40px rgba(99, 102, 241, 0.6), 0 0 60px rgba(99, 102, 241, 0.4)",
        "0 0 10px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3), 0 0 30px rgba(99, 102, 241, 0.2)",
        "0 0 5px rgba(99, 102, 241, 0.3), 0 0 10px rgba(99, 102, 241, 0.2), 0 0 15px rgba(99, 102, 241, 0.1)"
      ],
      duration: 3000,
      loop: true,
      easing: "easeInOutSine"
    });

    // Optional: Add color pulse as well
    anime({
      targets: textElement,
      color: [
        "rgb(99, 102, 241)",
        "rgb(139, 92, 246)",
        "rgb(99, 102, 241)"
      ],
      duration: 4000,
      loop: true,
      easing: "easeInOutQuad"
    });
  }, []);

  const filteredProjects = projects.filter((project) => {
    try {
      const toolMatch = activeTool === "All" || project.tools.some(t => t.toLowerCase().includes(activeTool.toLowerCase()));
      const domainMatch = activeDomain === "All" || project.domain === activeDomain;
      return toolMatch && domainMatch;
    } catch (error) {
      console.error("Error filtering projects:", error);
      return false;
    }
  });

  return (
    <section id="projects" className="section relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/penang_midnight.png" 
          alt="Penang Midnight"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)]/50 via-[var(--bg-secondary)]/50 to-[var(--bg-secondary)]/80" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <AnimatedText
              text="Featured "
              animation="letterByLetter"
              delay={200}
              duration={500}
              className="inline-block"
            />
            <span 
              ref={glowingTextRef}
              className="gradient-text inline-block cursor-default"
            >
              <AnimatedText
                text="Projects"
                animation="wave"
                delay={800}
                duration={600}
                loop={true}
                className="inline-block"
              />
            </span>
          </h2>
          <p className="text-[var(--text-secondary)] text-center w-full">
            Interactive case studies demonstrating end-to-end analytical workflows. 
            Each project tells a story from raw data to actionable insights.
          </p>
        </motion.div>

        {/* Filters */}
        <div ref={toolFiltersRef} className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {filterOptions.tools.map((tool) => (
              <button
                key={tool}
                onClick={() => setActiveTool(tool)}
                className={`filter-btn px-6 py-3 rounded-full text-base font-medium transition-all ${
                  activeTool === tool
                    ? "bg-[var(--accent-primary)] text-[var(--bg-primary)]"
                    : "bg-[var(--bg-card)]/55 backdrop-blur-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        <div ref={domainFiltersRef} className="flex flex-wrap justify-center gap-3 mb-16">
          {filterOptions.domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setActiveDomain(domain)}
              className={`filter-btn px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeDomain === domain
                  ? "bg-[var(--accent-secondary)] text-white"
                  : "bg-[var(--bg-card)]/55 backdrop-blur-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={projectsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedProject === project.id}
              onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="empty-state text-center py-12">
            <p className="text-[var(--text-secondary)]">No projects match the selected filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function ProjectCard({ project, index, isExpanded, onToggle }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const starSectionRef = useRef<HTMLDivElement>(null);
  const hasAnimatedMetrics = useRef(false);

  const getToolIcon = (tool: string) => {
    const toolLower = tool.toLowerCase();
    if (toolLower.includes("python") || toolLower.includes("pandas") || toolLower.includes("scikit")) return <Code size={14} />;
    if (toolLower.includes("sql")) return <Database size={14} />;
    if (toolLower.includes("power bi") || toolLower.includes("tableau")) return <Presentation size={14} />;
    return <BarChart3 size={14} />;
  };

  // Anime.js: Card entrance animation
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    anime.set(card, { opacity: 0, translateY: 40, rotateX: -10 });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: card,
              opacity: [0, 1],
              translateY: [40, 0],
              rotateX: [-10, 0],
              duration: 800,
              delay: index * 100,
              easing: "easeOutExpo"
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(card);
    return () => observer.disconnect();
  }, [index]);

  // Anime.js: Metrics counter animation
  useEffect(() => {
    if (!metricsRef.current || !project.metrics || hasAnimatedMetrics.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedMetrics.current) {
            hasAnimatedMetrics.current = true;
            const metricValues = metricsRef.current?.querySelectorAll(".metric-value");
            if (metricValues) {
              anime({
                targets: metricValues,
                scale: [0.5, 1],
                opacity: [0, 1],
                delay: anime.stagger(100, { start: 300 }),
                duration: 600,
                easing: "easeOutElastic(1, .5)"
              });
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    
    observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, [project.metrics]);

  // Anime.js: STAR-L section sequential reveal
  useEffect(() => {
    if (!starSectionRef.current || !isExpanded) return;
    
    const sections = starSectionRef.current.querySelectorAll(".star-section");
    anime({
      targets: sections,
      opacity: [0, 1],
      translateX: [-20, 0],
      delay: anime.stagger(80),
      duration: 500,
      easing: "easeOutExpo"
    });
    
    // Animate the letter badges
    const badges = starSectionRef.current.querySelectorAll(".star-badge");
    anime({
      targets: badges,
      scale: [0, 1],
      rotate: [-180, 0],
      delay: anime.stagger(100),
      duration: 800,
      easing: "easeOutElastic(1, .5)"
    });
  }, [isExpanded]);

  // Anime.js: Card hover effect
  const handleCardHover = useCallback(() => {
    if (!cardRef.current) return;
    anime({
      targets: cardRef.current,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(99, 102, 241, 0.2)",
      duration: 300,
      easing: "easeOutExpo"
    });
  }, []);

  const handleCardLeave = useCallback(() => {
    if (!cardRef.current) return;
    anime({
      targets: cardRef.current,
      scale: 1,
      boxShadow: "0 0 0 rgba(99, 102, 241, 0)",
      duration: 300,
      easing: "easeOutExpo"
    });
  }, []);

  // Anime.js: Tool badge hover
  const handleToolHover = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1.15,
      rotate: [0, 5, -5, 0],
      duration: 400,
      easing: "easeOutElastic(1, .6)"
    });
  }, []);

  const handleToolLeave = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1,
      rotate: 0,
      duration: 200,
      easing: "easeOutExpo"
    });
  }, []);

        return (
    <div
      ref={cardRef}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
      className="project-card bg-[var(--bg-card)]/55 backdrop-blur-sm rounded-xl overflow-hidden border border-[var(--border-color)]/50 cursor-pointer"
    >
      {/* Project Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-[var(--text-primary)]">{project.title}</h3>
          <span className="px-2 py-1 bg-[var(--bg-secondary)]/55 backdrop-blur-sm rounded text-xs text-[var(--accent-primary)]">
            {project.domain}
          </span>
        </div>

        <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tools */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tools.map((tool) => (
            <span
              key={tool}
              onMouseEnter={handleToolHover}
              onMouseLeave={handleToolLeave}
              className="tool-badge flex items-center gap-1 px-2 py-1 bg-[var(--bg-secondary)]/55 backdrop-blur-sm rounded text-xs text-[var(--text-secondary)] cursor-pointer"
            >
              {getToolIcon(tool)}
              {tool}
            </span>
          ))}
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div ref={metricsRef} className="grid grid-cols-3 gap-2 mb-4">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center p-2 bg-[var(--bg-secondary)]/55 backdrop-blur-sm rounded">
                <p className="metric-value text-lg font-bold text-[var(--accent-primary)]">{metric.value}</p>
                <p className="text-xs text-[var(--text-secondary)]">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Expand Button */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              View Details
            </>
          )}
        </button>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[var(--border-color)]"
          >
            <div className="p-6 space-y-5">
              {/* STAR-L Method */}
              <div ref={starSectionRef} className="space-y-5">
                {/* Situation */}
                <div className="star-section space-y-2">
                  <h4 className="text-sm font-semibold text-[var(--accent-primary)] flex items-center gap-2">
                    <span className="star-badge w-6 h-6 rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] flex items-center justify-center text-xs">
                      S
                    </span>
                    Situation
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1 pl-8">
                    {project.situation}
                  </p>
                </div>

                {/* Task */}
                <div className="star-section space-y-2">
                  <h4 className="text-sm font-semibold text-[var(--accent-primary)] flex items-center gap-2">
                    <span className="star-badge w-6 h-6 rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] flex items-center justify-center text-xs">
                      T
                    </span>
                    Task
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1 pl-8">
                    {project.task}
                  </p>
                </div>

                {/* Analysis */}
                <div className="star-section space-y-2">
                  <h4 className="text-sm font-semibold text-[var(--accent-primary)] flex items-center gap-2">
                    <span className="star-badge w-6 h-6 rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] flex items-center justify-center text-xs">
                      A
                    </span>
                    Analysis
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1 pl-8">
                    {project.analysis}
                  </p>
                </div>

                {/* Result */}
                <div className="star-section space-y-2">
                  <h4 className="text-sm font-semibold text-[var(--accent-primary)] flex items-center gap-2">
                    <span className="star-badge w-6 h-6 rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] flex items-center justify-center text-xs">
                      R
                    </span>
                    Result
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1 pl-8">
                    {project.result}
                  </p>
                </div>

                {/* Learning */}
                <div className="star-section space-y-2">
                  <h4 className="text-sm font-semibold text-[var(--accent-secondary)] flex items-center gap-2">
                    <Lightbulb size={14} />
                    Learning
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1 pl-8">
                    {project.learning}
                  </p>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex gap-3 pt-4 border-t border-[var(--border-color)]">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--bg-secondary)]/55 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--accent-primary)] text-[var(--bg-primary)] rounded-lg text-sm font-medium hover:opacity-90 transition-all"
                  >
                    <ExternalLink size={16} />
                    View Dashboard
                  </a>
                )}
              </div>
            </div>
                    </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
