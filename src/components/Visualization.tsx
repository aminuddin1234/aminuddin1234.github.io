"use client";

import {useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 30 + Math.random() * 60,
        length: height * 2.5,
        angle: angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.12 + Math.random() * 0.16,
        hue: 190 + Math.random() * 70,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
    };
}

function BeamsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const frameSkipRef = useRef(0);
    const MAX_BEAMS = 12;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

            beamsRef.current = Array.from({ length: MAX_BEAMS }, () =>
                createBeam(canvas.width, canvas.height)
            );
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        function resetBeam(beam: Beam, index: number, totalBeams: number) {
            if (!canvas) return beam;

            const column = index % 3;
            const spacing = canvas.width / 3;

            beam.y = canvas.height + 100;
            beam.x =
                column * spacing +
                spacing / 2 +
                (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 100 + Math.random() * 100;
            beam.speed = 0.5 + Math.random() * 0.4;
            beam.hue = 190 + (index * 70) / totalBeams;
            beam.opacity = 0.15 + Math.random() * 0.1;
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

            gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`);
            gradient.addColorStop(
                0.1,
                `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`
            );
            gradient.addColorStop(
                0.4,
                `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`
            );
            gradient.addColorStop(
                0.6,
                `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`
            );
            gradient.addColorStop(
                0.9,
                `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`
            );
            gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function animate() {
            if (!canvas || !ctx) return;

            frameSkipRef.current++;
            if (frameSkipRef.current % 2 !== 0) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = "blur(25px)";

            const totalBeams = beamsRef.current.length;
            beamsRef.current.forEach((beam, index) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;

                if (beam.y + beam.length < -100) {
                    resetBeam(beam, index, totalBeams);
                }

                drawBeam(ctx, beam);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ filter: "blur(10px)" }}
        />
    );
}

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const column1Images: GalleryImage[] = [
  {
    src: "/PKT_vis1.png",
    alt: "PKT Visualization 1",
    title: "PKT Analysis",
    description: "Data insights visualization",
  },
  {
    src: "/PKT_vis2.png",
    alt: "PKT Visualization 2",
    title: "PKT Trends",
    description: "Trend analysis dashboard",
  },
  {
    src: "/PKT_vis3.png",
    alt: "PKT Visualization 3",
    title: "PKT Metrics",
    description: "Performance metrics view",
  },
];

const column2Images: GalleryImage[] = [
  {
    src: "/PKT_vis4.png",
    alt: "PKT Visualization 4",
    title: "PKT Overview",
    description: "Comprehensive data view",
  },
  {
    src: "/Sales_Dashboard.png",
    alt: "Sales Dashboard",
    title: "Sales Dashboard",
    description: "Sales performance metrics",
  },
  {
    src: "/Superstore_profit_report.png",
    alt: "Superstore Profit",
    title: "Superstore Profit",
    description: "Profit analysis visualization",
  },
];

const column3Images: GalleryImage[] = [
  {
    src: "/Tableau_vis1.png",
    alt: "Tableau Visualization 1",
    title: "Tableau Analysis",
    description: "Interactive data exploration",
  },
  {
    src: "/Tableau_vis2.png",
    alt: "Tableau Visualization 2",
    title: "Tableau Insights",
    description: "Business intelligence view",
  },
];

const GalleryCard = ({ image }: { image: GalleryImage }) => (
  <a
    href="#"
    className="relative block overflow-hidden group cursor-pointer bg-[#1a1a1a]"
    style={{ marginBottom: "12px" }}
  >
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
      className="w-full h-auto block transition-all duration-700 group-hover:scale-110"
    />
    <div
      className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%)",
      }}
    >
      <div className="transform translate-y-5 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-lg font-bold mb-1 text-white">{image.title}</h3>
        <p className="text-sm opacity-90 text-white">{image.description}</p>
      </div>
    </div>
  </a>
);

const ScrollColumn = ({
  images,
  direction = "normal",
  duration = 70,
}: {
  images: GalleryImage[];
  direction?: "normal" | "reverse";
  duration?: number;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...images, ...images, ...images, ...images];

  return (
    <div
      className="h-full overflow-hidden relative"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        ref={trackRef}
        className="flex flex-col"
        style={{
          animation: `scrollVertical ${duration}s linear infinite`,
          animationDirection: direction,
        }}
      >
        {duplicatedImages.map((image, index) => (
          <GalleryCard key={`${image.alt}-${index}`} image={image} />
        ))}
      </div>
    </div>
  );
};

export default function Visualization() {
  return (
    <>
      <style>{`
        @keyframes scrollVertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
      <section id="visualization" className="section relative overflow-hidden">
        {/* Animated Beams Background */}
        <div className="absolute inset-0 z-0 bg-[var(--bg-secondary)]" />
        <BeamsBackground />
        <motion.div
            className="absolute inset-0 z-[1] bg-[var(--bg-secondary)]/30"
            animate={{
                opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
            }}
            style={{
                backdropFilter: "blur(50px)",
            }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <AnimatedText
                text="Data "
                animation="letterByLetter"
                delay={200}
                duration={500}
                className="inline-block"
              />
              <span className="gradient-text inline-block">
                <AnimatedText
                  text="Visualization"
                  animation="wave"
                  delay={800}
                  duration={600}
                  loop={true}
                  className="inline-block"
                />
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] text-center w-full max-w-2xl mx-auto">
              A collection of visual stories and data-driven designs. Exploring
              the intersection of aesthetics and analytics through immersive
              imagery.
            </p>
          </motion.div>

          {/* Masonry Gallery */}
          <div className="w-full max-w-[90%] mx-auto">
            <div
              className="grid overflow-hidden h-[300px] md:h-[600px]"
              style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}
            >
              <ScrollColumn images={column1Images} direction="normal" duration={70} />
              <ScrollColumn images={column2Images} direction="reverse" duration={70} />
              <ScrollColumn images={column3Images} direction="normal" duration={70} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
