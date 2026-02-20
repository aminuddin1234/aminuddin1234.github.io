import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, Calendar } from "lucide-react";
import anime from "animejs";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedHiringType, setSelectedHiringType] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const headerTextRef = useRef<HTMLSpanElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  // Interactive hover effect for header
  useEffect(() => {
    if (!headerTextRef.current) return;
    headerTextRef.current.classList.add("hover-glow");
  }, []);

  // Anime.js: Contact info cards staggered entrance
  useEffect(() => {
    if (!contactInfoRef.current) return;

    const cards = contactInfoRef.current.querySelectorAll(".contact-card");
    anime.set(cards, { opacity: 0, translateX: -30 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cards,
              opacity: [0, 1],
              translateX: [-30, 0],
              delay: anime.stagger(150),
              duration: 800,
              easing: "easeOutExpo"
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(contactInfoRef.current);
    return () => observer.disconnect();
  }, []);

  // Anime.js: Contact icons pulse
  useEffect(() => {
    if (!contactInfoRef.current) return;

    const icons = contactInfoRef.current.querySelectorAll(".contact-icon");
    
    anime({
      targets: icons,
      scale: [1, 1.1, 1],
      duration: 2000,
      loop: true,
      delay: anime.stagger(300),
      easing: "easeInOutSine"
    });
  }, []);

  // Anime.js: Social links entrance
  useEffect(() => {
    if (!socialLinksRef.current) return;

    const links = socialLinksRef.current.querySelectorAll(".social-link");
    anime.set(links, { opacity: 0, scale: 0.8 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: links,
              opacity: [0, 1],
              scale: [0.8, 1],
              delay: anime.stagger(100),
              duration: 600,
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

  // Anime.js: Form fields entrance
  useEffect(() => {
    if (!formRef.current) return;

    const fields = formRef.current.querySelectorAll(".form-field");
    anime.set(fields, { opacity: 0, translateY: 20 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: fields,
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(80),
              duration: 600,
              easing: "easeOutExpo"
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  // Anime.js: Success animation when submitted
  useEffect(() => {
    if (isSubmitted && submitBtnRef.current) {
      anime({
        targets: submitBtnRef.current,
        scale: [1, 1.05, 1],
        duration: 500,
        easing: "easeOutElastic(1, .5)"
      });

      // Confetti-like particle effect
      anime({
        targets: ".success-particle",
        translateY: [-20, -60],
        translateX: () => anime.random(-30, 30),
        opacity: [1, 0],
        scale: [1, 0],
        duration: 1000,
        delay: anime.stagger(50),
        easing: "easeOutExpo"
      });
    }
  }, [isSubmitted]);

  // Anime.js: Social link hover
  const handleSocialHover = (element: HTMLAnchorElement) => {
    anime({
      targets: element,
      scale: 1.08,
      rotate: [0, 5, -5, 0],
      duration: 400,
      easing: "easeOutElastic(1, .6)"
    });
  };

  const handleSocialLeave = (element: HTMLAnchorElement) => {
    anime({
      targets: element,
      scale: 1,
      rotate: 0,
      duration: 300,
      easing: "easeOutExpo"
    });
  };

  // Anime.js: Calendar button hover
  const handleCalendarHover = (element: HTMLButtonElement) => {
    anime({
      targets: element,
      scale: 1.03,
      boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
      duration: 300,
      easing: "easeOutExpo"
    });
    const icon = element.querySelector("svg");
    if (icon) {
      anime({
        targets: icon,
        rotate: [0, 15, -15, 0],
        duration: 500,
        easing: "easeInOutSine"
      });
    }
  };

  const handleCalendarLeave = (element: HTMLButtonElement) => {
    anime({
      targets: element,
      scale: 1,
      boxShadow: "0 0 0 rgba(99, 102, 241, 0)",
      duration: 300,
      easing: "easeOutExpo"
    });
  };

  // Anime.js: Form field focus animation
  const handleFieldFocus = (element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
    anime({
      targets: element,
      boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
      duration: 300,
      easing: "easeOutExpo"
    });
  };

  const handleFieldBlur = (element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
    anime({
      targets: element,
      boxShadow: "0 0 0 rgba(99, 102, 241, 0)",
      duration: 300,
      easing: "easeOutExpo"
    });
  };

  const hiringTypes = [
    { id: "full-time", label: "Hiring for Data Analyst Position", projectSuggestion: "Check out my Household Income Analysis, Cafe Sales Dashboard, and Superstore Profit Dashboard - they demonstrate end-to-end analytics from raw data to business insights." },
    { id: "project", label: "Looking for Data Project Help", projectSuggestion: "I would love to help transform your data into actionable insights. My SQL Layoffs Analysis and Excel Bike Purchase Analysis showcase rapid insight generation." },
    { id: "insights", label: "Turn My Data into Business Insights", projectSuggestion: "My interactive dashboards (Power BI Sales Dashboard, Tableau Cafe Sales) showcase how I transform raw data into clear, actionable business recommendations." },
    { id: "networking", label: "Just want to connect", projectSuggestion: "Always happy to discuss analytics trends, data tools, or opportunities!" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHiringTypeChange = (typeId: string) => {
    setSelectedHiringType(typeId);
    const selected = hiringTypes.find(h => h.id === typeId);
    if (selected) {
      setFormData({
        ...formData,
        subject: selected.label,
        message: `Hi Amin,\n\nI am interested in: ${selected.label}\n\n${selected.projectSuggestion}\n\nLooking forward to connecting!`
      });
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/penang_ocean.png" 
          alt="Penang Ocean"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/70 via-[var(--bg-primary)]/50 to-[var(--bg-primary)]/70" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 w-full"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s <span ref={headerTextRef} className="gradient-text cursor-default will-change-transform">Connect</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-center w-full">
            Have a data challenge? Looking for a data analyst? Or just want to chat about analytics? I would love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div ref={contactInfoRef} className="space-y-6">
            <div className="contact-card bg-[var(--bg-card)]/25 backdrop-blur-sm rounded-xl p-6 border border-[var(--border-color)]/50 will-change-transform">
              <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="contact-icon w-12 h-12 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                    <Mail className="text-[var(--accent-primary)]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Email</p>
                    <p className="font-medium">amiamin987@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="contact-icon w-12 h-12 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                    <Phone className="text-[var(--accent-primary)]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Phone</p>
                    <p className="font-medium">+60 199383471</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="contact-icon w-12 h-12 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                    <MapPin className="text-[var(--accent-primary)]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Location</p>
                    <p className="font-medium">Malaysia (Open to Remote)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-card bg-[var(--bg-card)]/25 backdrop-blur-sm rounded-xl p-6 border border-[var(--border-color)]/50 will-change-transform">
              <h3 className="text-xl font-bold mb-6">Follow Me</h3>
              <div ref={socialLinksRef} className="flex gap-4">
                <a
                  href="https://github.com/aminuddin1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => handleSocialHover(e.currentTarget)}
                  onMouseLeave={(e) => handleSocialLeave(e.currentTarget)}
                  className="social-link flex items-center gap-3 px-4 py-3 bg-[var(--bg-secondary)]/25 backdrop-blur-sm rounded-lg hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all cursor-pointer will-change-transform"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammad-aminuddin-mab987"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => handleSocialHover(e.currentTarget)}
                  onMouseLeave={(e) => handleSocialLeave(e.currentTarget)}
                  className="social-link flex items-center gap-3 px-4 py-3 bg-[var(--bg-secondary)]/25 backdrop-blur-sm rounded-lg hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all cursor-pointer will-change-transform"
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Calendar Link */}
            <div className="contact-card bg-[var(--bg-card)]/25 backdrop-blur-sm rounded-xl p-6 border border-[var(--border-color)]/50 will-change-transform">
              <h3 className="text-xl font-bold mb-2">Let&apos;s Schedule a Data Chat</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Quick 15-minute call to discuss your data needs.
              </p>
              <button 
                onMouseEnter={(e) => handleCalendarHover(e.currentTarget)}
                onMouseLeave={(e) => handleCalendarLeave(e.currentTarget)}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Calendar size={18} />
                Book a Time Slot
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[var(--bg-card)]/30 backdrop-blur-sm rounded-xl p-6 border border-[var(--border-color)]/50">
            <h3 className="text-xl font-bold mb-6">Send a Message</h3>
            
            {/* Smart hiring type selector */}
            <div className="form-field mb-6">
              <label className="block text-sm font-medium mb-2">
                I am reaching out because...
              </label>
              <select
                value={selectedHiringType}
                onChange={(e) => handleHiringTypeChange(e.target.value)}
                onFocus={(e) => handleFieldFocus(e.currentTarget)}
                onBlur={(e) => handleFieldBlur(e.currentTarget)}
                className="w-full px-4 py-3 bg-[var(--bg-secondary)]/50 backdrop-blur-sm border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
              >
                <option value="">Select an option...</option>
                {hiringTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              {selectedHiringType && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-[var(--accent-primary)]"
                >
                  ✓ I have pre-filled relevant project suggestions for you
                </motion.p>
              )}
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-field will-change-transform">
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={(e) => handleFieldFocus(e.currentTarget)}
                    onBlur={(e) => handleFieldBlur(e.currentTarget)}
                    required
                    className="w-full px-4 py-3 bg-[var(--bg-secondary)]/50 backdrop-blur-sm border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                    placeholder="Your name"
                  />
                </div>
                <div className="form-field will-change-transform">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={(e) => handleFieldFocus(e.currentTarget)}
                    onBlur={(e) => handleFieldBlur(e.currentTarget)}
                    required
                    className="w-full px-4 py-3 bg-[var(--bg-secondary)]/50 backdrop-blur-sm border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="form-field will-change-transform">
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={(e) => handleFieldFocus(e.currentTarget)}
                  onBlur={(e) => handleFieldBlur(e.currentTarget)}
                    required
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)]/50 backdrop-blur-sm border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                  placeholder="What is this about?"
                />
              </div>

              <div className="form-field will-change-transform">
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={(e) => handleFieldFocus(e.currentTarget)}
                  onBlur={(e) => handleFieldBlur(e.currentTarget)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)]/50 backdrop-blur-sm border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                ref={submitBtnRef}
                type="submit"
                disabled={isSubmitted}
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  isSubmitted
                    ? "bg-green-500 text-white"
                    : "gradient-bg text-white hover:opacity-90"
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
