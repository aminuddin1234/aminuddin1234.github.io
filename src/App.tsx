import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import StickyCTA from "./components/StickyCTA";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleNavigate = (section: string) => {
    try {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(section);
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      try {
        const sections = ["hero", "projects", "skills", "about", "contact"];
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
              setActiveSection(section);
              break;
            }
          }
        }
      } catch (error) {
        console.error("Scroll handler error:", error);
      }
    };

    window.addEventListener("scroll", handleScroll);
    setIsLoaded(true);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-[var(--text-secondary)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      <ScrollProgress activeSection={activeSection} />
      
      <main>
        <Hero onNavigate={handleNavigate} />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      
      <Footer />
      <StickyCTA activeSection={activeSection} onNavigate={handleNavigate} />
    </div>
  );
}
