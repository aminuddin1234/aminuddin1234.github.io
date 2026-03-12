import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

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
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-[var(--bg-secondary)]" />

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
