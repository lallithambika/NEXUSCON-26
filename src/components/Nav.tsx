import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

const navItems = [
  { href: "#top", label: "Home" },
  { href: "#overview", label: "Overview" },
  { href: "#about", label: "About" },
  { href: "#speakers", label: "Speakers" },
  { href: "#sponsor", label: "Sponsor" },
];

export default function Nav() {
  const navRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // Active Section Tracking
    const sections = navItems.map(item => item.href.substring(1));
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0% -70% 0%',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    if (mobileOpen) {
      gsap.set(menu, { display: "block" });
      gsap.fromTo(menu, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" });
    } else {
      gsap.to(menu, { opacity: 0, y: -10, duration: 0.2, ease: "power3.in", onComplete: () => gsap.set(menu, { display: "none" }) });
    }
  }, [mobileOpen]);

  return (
    <div ref={navRef} className="fixed top-5 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-2rem)] max-w-5xl">
      <nav
        className="flex items-center justify-between px-3 py-2 rounded-full border border-white/30 shadow-[0_8px_32px_rgba(74,50,103,0.15)] bg-white/40 backdrop-blur-xl"
      >
        {/* Logo Section */}
        <a href="#top" className="flex items-center gap-2.5 flex-shrink-0 group px-2">
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white shadow-md ring-2 ring-white/40 group-hover:scale-105 transition-transform duration-300">
            <img
              src="/logo.png"
              alt="TechNexus Community"
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                if (target.parentElement) {
                  target.parentElement.style.background = "linear-gradient(135deg, #DE638A, #4A3267)";
                  target.parentElement.innerHTML = `<span style="color:white;font-weight:900;font-size:0.9rem;display:flex;align-items:center;justify-content:center;width:100%;height:100%">N</span>`;
                }
              }}
            />
          </div>
          <div className="leading-tight hidden sm:block">
            <div className="font-black text-sm tracking-tight text-[#4A3267]">TECHNEXUS</div>
            <div className="font-bold text-[8px] tracking-[0.2em] text-[#DE638A] uppercase">Community</div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-[#4A3267]/5 rounded-full p-1 relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-5 py-2 text-[11px] font-bold transition-all duration-500 rounded-full uppercase tracking-widest ${
                  isActive ? "text-white" : "text-[#4A3267]/60 hover:text-[#4A3267]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-br from-[#DE638A] to-[#4A3267] rounded-full -z-10 shadow-lg shadow-[#DE638A]/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <a
            href="/prospectus.pdf"
            download
            className="hidden lg:flex items-center px-5 py-2.5 rounded-full border border-[#4A3267]/20 text-[#4A3267] font-mono font-bold text-[10px] uppercase tracking-widest hover:bg-[#4A3267] hover:text-white transition-all duration-300"
          >
            Download Prospectus
          </a>
          <a
            href="#waitlist"
            className="hidden md:flex items-center px-6 py-2.5 rounded-full bg-[#4A3267] text-white font-bold text-[10px] uppercase tracking-widest hover:bg-[#DE638A] hover:scale-105 transition-all duration-300"
          >
            Join Waitlist
          </a>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full bg-[#4A3267]/10"
          >
            <span className={`block w-5 h-0.5 bg-[#4A3267] rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#4A3267] rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#4A3267] rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="hidden absolute top-[calc(100%+0.75rem)] left-0 right-0 p-3 rounded-[2rem] border border-white/30 shadow-2xl bg-white/80 backdrop-blur-2xl"
      >
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`px-5 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-colors ${
                activeSection === item.href.substring(1) ? "bg-[#4A3267] text-white" : "text-[#4A3267] hover:bg-white/40"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-5 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-br from-[#DE638A] to-[#4A3267] text-center uppercase tracking-widest"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </div>
  );
}

