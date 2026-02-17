import { useEffect, useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  animation?: "letterByLetter" | "wordByWord" | "wave" | "fadeInUp";
  delay?: number;
  duration?: number;
  loop?: boolean;
}

export default function AnimatedText({
  text,
  className = "",
  animation = "letterByLetter",
  delay = 0,
  duration = 800,
  loop = false,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Clear and set initial state
    container.innerHTML = "";
    container.style.visibility = "hidden";

    // Dynamic import for animejs
    import("animejs").then((anime) => {
      container.style.visibility = "visible";

      switch (animation) {
        case "letterByLetter":
          text.split("").forEach((letter) => {
            const span = document.createElement("span");
            span.textContent = letter === " " ? "\u00A0" : letter;
            span.style.display = "inline-block";
            span.style.opacity = "0";
            span.style.transform = "translateY(20px)";
            container.appendChild(span);
          });
          anime.default({
            targets: container.querySelectorAll("span"),
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(40, { start: delay }),
            duration: duration,
            easing: "easeOutExpo"
          });
          break;

        case "wordByWord":
          text.split(" ").forEach((word) => {
            const span = document.createElement("span");
            span.textContent = word + " ";
            span.style.display = "inline-block";
            span.style.opacity = "0";
            span.style.transform = "translateX(-20px)";
            container.appendChild(span);
          });
          anime.default({
            targets: container.querySelectorAll("span"),
            opacity: [0, 1],
            translateX: [-20, 0],
            delay: anime.stagger(100, { start: delay }),
            duration: duration,
            easing: "easeOutExpo"
          });
          break;

        case "wave":
          text.split("").forEach((letter) => {
            const span = document.createElement("span");
            span.textContent = letter === " " ? "\u00A0" : letter;
            span.style.display = "inline-block";
            container.appendChild(span);
          });
          anime.default({
            targets: container.querySelectorAll("span"),
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(30, { start: delay }),
            duration: duration,
            easing: "easeOutElastic(1, .5)"
          });
          if (loop) {
            setTimeout(() => {
              anime.default({
                targets: container.querySelectorAll("span"),
                translateY: [-5, 5],
                direction: "alternate",
                loop: true,
                delay: anime.stagger(50),
                duration: 600,
                easing: "easeInOutSine"
              });
            }, delay + duration);
          }
          break;

        case "fadeInUp":
        default:
          container.textContent = text;
          container.style.opacity = "0";
          anime.default({
            targets: container,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: delay,
            duration: duration,
            easing: "easeOutExpo"
          });
          break;
      }
    }).catch((err) => {
      // Fallback: show text without animation
      console.warn("Animejs failed to load:", err);
      container.style.visibility = "visible";
      container.textContent = text;
    });
  }, [text, animation, delay, duration, loop]);

  return <span ref={containerRef} className={className} />;
}