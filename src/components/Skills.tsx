import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { tools, skills } from "../data/skills";

interface Skill {
  name: string;
  category: "beginner" | "intermediate";
  projects: string[];
}

interface SkillsProps {}

export default function Skills({}: SkillsProps) {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const skillsListRef = useRef<HTMLDivElement>(null);
  const toolsGridRef = useRef<HTMLDivElement>(null);

  // Anime.js: Staggered skill cards entrance with elastic bounce
  useEffect(() => {
    if (!skillsListRef.current) return;

    const skillCards = skillsListRef.current.querySelectorAll(".skill-card");
    
    anime.set(skillCards, {
      opacity: 0,
      translateY: 30,
      scale: 0.9
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: skillCards,
              opacity: [0, 1],
              translateY: [30, 0],
              scale: [0.9, 1],
              delay: anime.stagger(80),
              duration: 800,
              easing: "easeOutElastic(1, .6)"
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(skillsListRef.current);

    return () => observer.disconnect();
  }, []);

  // Anime.js: Tech stack orbital/rotating entrance
  useEffect(() => {
    if (!toolsGridRef.current) return;

    const toolItems = toolsGridRef.current.querySelectorAll(".tool-item");
    
    anime.set(toolItems, {
      opacity: 0,
      scale: 0,
      rotate: -180
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: toolItems,
              opacity: [0, 1],
              scale: [0, 1],
              rotate: [-180, 0],
              delay: anime.stagger(60),
              duration: 1000,
              easing: "easeOutElastic(1, .5)"
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(toolsGridRef.current);

    return () => observer.disconnect();
  }, []);

  // Anime.js: Card hover animation
  const handleSkillHover = (skill: Skill, cardElement: HTMLDivElement) => {
    setHoveredSkill(skill);

    // Card glow pulse
    anime({
      targets: cardElement,
      boxShadow: [
        "0 0 0 0 rgba(99, 102, 241, 0)",
        "0 0 20px 5px rgba(99, 102, 241, 0.3)",
        "0 0 10px 2px rgba(99, 102, 241, 0.2)"
      ],
      duration: 600,
      easing: "easeOutExpo"
    });
  };

  const handleSkillLeave = (cardElement: HTMLDivElement) => {
    setHoveredSkill(null);
    anime({
      targets: cardElement,
      boxShadow: "0 0 0 0 rgba(99, 102, 241, 0)",
      duration: 400,
      easing: "easeOutExpo"
    });
  };

  // Anime.js: Tool item hover effect
  const handleToolHover = (element: HTMLDivElement) => {
    anime({
      targets: element,
      scale: 1.15,
      rotate: [0, 5, -5, 0],
      duration: 400,
      easing: "easeOutElastic(1, .6)"
    });

    anime({
      targets: element.querySelector(".tool-icon"),
      scale: 1.3,
      rotate: "1turn",
      duration: 600,
      easing: "easeOutExpo"
    });
  };

  const handleToolLeave = (element: HTMLDivElement) => {
    anime({
      targets: element,
      scale: 1,
      rotate: 0,
      duration: 300,
      easing: "easeOutExpo"
    });

    anime({
      targets: element.querySelector(".tool-icon"),
      scale: 1,
      rotate: "0turn",
      duration: 300,
      easing: "easeOutExpo"
    });
  };

  return (
    <section id="skills" ref={sectionRef} className="section relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/penang_neon_cyberpunk.png" 
          alt="Penang Neon"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/50 via-[var(--bg-primary)]/50 to-[var(--bg-primary)]/70" />
        
        {/* Floating particles background */}
        <div className="floating-particles absolute inset-0 pointer-events-none" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-center w-full">
            Honest skill assessment backed by real-world project experience.
            Hover to see related projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-[var(--bg-card)]/35 backdrop-blur-sm rounded-2xl p-8 border border-[var(--border-color)]/50">
              <RadarChart skills={skills} hoveredSkill={hoveredSkill} />
            </div>
          </motion.div>

          {/* Skills List with Anime.js */}
          <div ref={skillsListRef} className="space-y-4">
            {skills.map((skill) => (
              <div
    key={skill.name}
    className="skill-card p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] transition-colors cursor-pointer will-change-transform"
    onMouseEnter={(e) => handleSkillHover(skill, e.currentTarget)}
    onMouseLeave={(e) => handleSkillLeave(e.currentTarget)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-lg">{skill.name}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                      skill.category === 'intermediate' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                      'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[var(--text-secondary)] text-sm">
                    <span className="text-[var(--accent-primary)] font-medium">{skill.projects.length}</span>
                    <span>projects</span>
                  </div>
                </div>
                {hoveredSkill?.name === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 pt-3 border-t border-[var(--border-color)]"
                  >
                    <div className="text-xs text-[var(--text-secondary)] mb-1">
                      <span className="text-[var(--accent-primary)] font-medium">Projects: </span>
                      {skill.projects.join(", ")}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tools Grid with Anime.js */}
        <div className="mt-16 pb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Tech <span className="gradient-text">Stack</span>
          </h3>
          <div ref={toolsGridRef} className="flex flex-wrap justify-center gap-4">
            {tools.map((tool) => (
              <div
    key={tool.name}
    className="tool-item flex items-center gap-2 px-4 py-3 bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors cursor-pointer will-change-transform"
    onMouseEnter={(e) => handleToolHover(e.currentTarget)}
    onMouseLeave={(e) => handleToolLeave(e.currentTarget)}
              >
                <span className="tool-icon text-2xl inline-block">{tool.icon}</span>
                <span className="font-medium">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface RadarChartProps {
  skills: Skill[];
  hoveredSkill: Skill | null;
}

function RadarChart({ skills, hoveredSkill }: RadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const polygonRef = useRef<SVGPolygonElement>(null);
  const pointsRef = useRef<SVGGElement>(null);
  const size = 400;
  const center = size / 2;
  const maxRadius = 150;
  const levels = 5;
  
  const angleStep = (2 * Math.PI) / skills.length;
  
  const getPoint = (index: number, radius: number) => {
    const angle = -Math.PI / 2 + index * angleStep;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const getPolygonPoints = (level: number) => {
    return skills
      .map((_, i) => {
        const point = getPoint(i, (maxRadius * level) / levels);
        return `${point.x},${point.y}`;
      })
      .join(" ");
  };

  const getCategoryValue = (category: Skill['category']) => {
    switch (category) {
      case 'intermediate': return 0.7;
      case 'beginner': return 0.35;
      default: return 0.5;
    }
  };

  const getDataPoints = () => {
    return skills.map((skill, i) => {
      const radius = getCategoryValue(skill.category) * maxRadius;
      const point = getPoint(i, radius);
      const isHovered = hoveredSkill?.name === skill.name;
      return (
        <g key={skill.name}>
          {/* Glow ring */}
          <circle
            className="glow-ring"
            cx={point.x}
            cy={point.y}
            r={isHovered ? 12 : 8}
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="1.5"
            opacity={isHovered ? 0.6 : 0}
          />
          <circle
            className="data-point"
            data-index={i}
            cx={point.x}
            cy={point.y}
            r={isHovered ? 8 : 5}
            fill={isHovered ? "var(--accent-primary)" : "var(--accent-secondary)"}
          />
          {isHovered && (
            <text
              x={point.x}
              y={point.y - 15}
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="12"
              fontWeight="bold"
            >
              {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
            </text>
          )}
        </g>
      );
    });
  };

  const getDataPolygon = () => {
    const points = skills
      .map((skill, i) => {
        const radius = getCategoryValue(skill.category) * maxRadius;
        const point = getPoint(i, radius);
        return `${point.x},${point.y}`;
      })
      .join(" ");
    return points;
  };

  // Anime.js: Creative radar chart entrance animation
  useEffect(() => {
    if (!svgRef.current || !polygonRef.current || !pointsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate polygon stroke drawing (dashoffset)
            const polygon = polygonRef.current;
            if (polygon) {
              const length = polygon.getTotalLength?.() || 1000;
              anime.set(polygon, { strokeDasharray: length, strokeDashoffset: length });
              anime({
                targets: polygon,
                strokeDashoffset: [length, 0],
                duration: 1500,
                easing: "easeInOutQuad"
              });
            }

            // Animate polygon fill fade in
            anime({
              targets: polygonRef.current,
              fillOpacity: [0, 0.25],
              delay: 800,
              duration: 800,
              easing: "easeOutQuad"
            });

            // Animate data points with ripple effect
            const dataPoints = pointsRef.current?.querySelectorAll(".data-point") || [];
            anime({
              targets: dataPoints,
              opacity: [0, 1],
              scale: [0, 1.5, 1],
              delay: anime.stagger(80, { start: 500 }),
              duration: 600,
              easing: "easeOutElastic(1, .6)"
            });

            // Animate axis lines drawing from center
            const axisLines = svgRef.current?.querySelectorAll(".axis-line") || [];
            anime({
              targets: axisLines,
              strokeDashoffset: [100, 0],
              delay: anime.stagger(50),
              duration: 400,
              easing: "easeOutQuad"
            });

            // Continuous floating/breathing animation on polygon
            setTimeout(() => {
              anime({
                targets: polygonRef.current,
                scale: [1, 1.02, 1],
                fillOpacity: [0.25, 0.35, 0.25],
                duration: 3000,
                loop: true,
                easing: "easeInOutSine"
              });
            }, 2000);

            // Rotating sweep line effect
            const sweepLine = svgRef.current?.querySelector(".sweep-line");
            if (sweepLine) {
              anime({
                targets: sweepLine,
                rotate: 360,
                duration: 8000,
                loop: true,
                easing: "linear"
              });
            }

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(svgRef.current);

    return () => observer.disconnect();
  }, []);

  // Anime.js: Highlight animation on hover with glow effect
  useEffect(() => {
    if (!pointsRef.current) return;

    const dataPoints = pointsRef.current.querySelectorAll(".data-point");
    const glowRings = pointsRef.current.querySelectorAll(".glow-ring");
    
    dataPoints.forEach((point, index) => {
      const isHovered = hoveredSkill?.name === skills[index].name;
      if (isHovered) {
        anime({
          targets: point,
          scale: 1.8,
          duration: 300,
          easing: "easeOutExpo"
        });
      } else {
        anime({
          targets: point,
          scale: 1,
          duration: 300,
          easing: "easeOutExpo"
        });
      }
    });

    // Animate glow rings separately
    glowRings.forEach((ring, index) => {
      const isHovered = hoveredSkill?.name === skills[index].name;
      if (ring) {
        anime({
          targets: ring,
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.5 : 1,
          duration: 300,
          easing: "easeOutExpo"
        });
      }
    });
  }, [hoveredSkill, skills]);

  const axisLabels = skills.map((skill, i) => {
    const point = getPoint(i, maxRadius + 30);
    const isHovered = hoveredSkill?.name === skill.name;
    return (
      <text
        key={skill.name}
        x={point.x}
        y={point.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={isHovered ? "var(--accent-primary)" : "var(--text-secondary)"}
        fontSize="12"
        fontWeight={isHovered ? "bold" : "normal"}
        className="transition-colors"
      >
        {skill.name}
      </text>
    );
  });

  return (
    <svg ref={svgRef} width={size} height={size} className="mx-auto">
      {/* Background circles */}
      {Array.from({ length: levels }).map((_, i) => (
        <polygon
          key={i}
          points={getPolygonPoints(i + 1)}
          fill="none"
          stroke="var(--border-color)"
          strokeWidth="1"
          opacity={0.5}
        />
      ))}

      {/* Axis lines with animation class */}
      {skills.map((_, i) => {
        const point = getPoint(i, maxRadius);
        return (
          <line
            key={i}
            className="axis-line"
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="var(--border-color)"
            strokeWidth="1"
            strokeDasharray="100"
            strokeDashoffset="100"
            opacity="0.5"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        ref={polygonRef}
        points={getDataPolygon()}
        fill="var(--accent-primary)"
        fillOpacity="0"
        stroke="var(--accent-primary)"
        strokeWidth="2"
      />

      {/* Sweep line effect */}
      <g className="sweep-line" style={{ transformOrigin: `${center}px ${center}px` }}>
        <line
          x1={center}
          y1={center}
          x2={center}
          y2={maxRadius + 20}
          stroke="var(--accent-secondary)"
          strokeWidth="1"
          opacity="0.3"
          strokeDasharray="4 4"
        />
      </g>

      {/* Data points */}
      <g ref={pointsRef}>{getDataPoints()}</g>

      {/* Labels */}
      {axisLabels}
    </svg>
  );
}
