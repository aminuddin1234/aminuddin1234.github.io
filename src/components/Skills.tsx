import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { tools, skills } from "../data/skills";

interface Skill {
  name: string;
  level: number;
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

  // Anime.js: Progress bar animation on hover
  const handleSkillHover = (skill: Skill, cardElement: HTMLDivElement) => {
    setHoveredSkill(skill);
    
    const progressBar = cardElement.querySelector(".progress-fill");
    if (progressBar) {
      anime({
        targets: progressBar,
        scaleX: [1, 1.02, 1],
        duration: 400,
        easing: "easeInOutQuad"
      });
    }

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
            Technical proficiency backed by real-world project experience.
            Hover over skills to see proof projects.
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
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{skill.name}</span>
                  <span className="text-[var(--accent-primary)] font-bold">{skill.level}%</span>
                </div>
                <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div
                    className="progress-fill h-full gradient-bg rounded-full origin-left"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                {hoveredSkill?.name === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-[var(--text-secondary)]"
                  >
                    <span className="text-[var(--accent-primary)]">Proof: </span>
                    {skill.projects.join(", ")}
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

  const getDataPoints = () => {
    return skills.map((skill, i) => {
      const radius = (skill.level / 100) * maxRadius;
      const point = getPoint(i, radius);
      const isHovered = hoveredSkill?.name === skill.name;
      return (
        <g key={skill.name}>
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
              {skill.level}%
            </text>
          )}
        </g>
      );
    });
  };

  const getDataPolygon = () => {
    const points = skills
      .map((skill, i) => {
        const radius = (skill.level / 100) * maxRadius;
        const point = getPoint(i, radius);
        return `${point.x},${point.y}`;
      })
      .join(" ");
    return points;
  };

  // Anime.js: Radar chart entrance animation
  useEffect(() => {
    if (!svgRef.current || !polygonRef.current || !pointsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate polygon drawing
            anime({
              targets: polygonRef.current,
              opacity: [0, 1],
              scale: [0.5, 1],
              duration: 1200,
              easing: "easeOutElastic(1, .5)"
            });

            // Animate data points with stagger
            const dataPoints = pointsRef.current?.querySelectorAll(".data-point") || [];
            anime({
              targets: dataPoints,
              opacity: [0, 1],
              scale: [0, 1],
              delay: anime.stagger(50, { start: 400 }),
              duration: 600,
              easing: "easeOutElastic(1, .8)"
            });

            // Continuous pulse animation on data points
            setTimeout(() => {
              anime({
                targets: dataPoints,
                scale: [
                  { value: 1, duration: 1000 },
                  { value: 1.3, duration: 500 },
                  { value: 1, duration: 1000 }
                ],
                loop: true,
                easing: "easeInOutSine"
              });
            }, 1500);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(svgRef.current);

    return () => observer.disconnect();
  }, []);

  // Anime.js: Highlight animation on hover
  useEffect(() => {
    if (!pointsRef.current) return;

    const dataPoints = pointsRef.current.querySelectorAll(".data-point");
    dataPoints.forEach((point, index) => {
      const isHovered = hoveredSkill?.name === skills[index].name;
      if (isHovered) {
        anime({
          targets: point,
          scale: 1.6,
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

      {/* Axis lines */}
      {skills.map((_, i) => {
        const point = getPoint(i, maxRadius);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="var(--border-color)"
            strokeWidth="1"
            opacity="0.5"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        ref={polygonRef}
        points={getDataPolygon()}
        fill="var(--accent-primary)"
        fillOpacity="0.2"
        stroke="var(--accent-primary)"
        strokeWidth="2"
      />

      {/* Data points */}
      <g ref={pointsRef}>{getDataPoints()}</g>

      {/* Labels */}
      {axisLabels}
    </svg>
  );
}
