import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Suspense, lazy, useState, useEffect, useRef } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Sparkles,
  Cloud,
  Cpu,
  Wrench,
  Rocket,
  ArrowRight,
  Star,
  TrendingUp,
  Mic,
  Award,
  Target,
  Network,
  Zap,
  Globe,
  Quote,
  Mail,
  Linkedin,
  Twitter,
  Check,
} from "lucide-react";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

import IntroLoader from "@/components/IntroLoader";
import CinematicIntro from "@/components/CinematicIntro";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import SmoothScroll from "@/components/SmoothScroll";
import Carousel from "@/components/Carousel";
import MagicBento from "@/components/MagicBento";
import TargetCursor from "@/components/TargetCursor";
import StatCard from "@/components/StatCard";
import CircularGallery from "@/components/CircularGallery";
import StarBorder from "@/components/StarBorder";
import BorderGlow from "@/components/BorderGlow";
const Hero3D = lazy(() => import("@/components/Hero3D"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexusCon Bengaluru '26 — India's Tech Community Converges" },
      {
        name: "description",
        content:
          "A premium conference experience focused on AI, Cloud, DevTools, and future technologies. June 2026, Bengaluru.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [showIntro, setShowIntro] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showIntro && contentRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(contentRef.current, 
          { y: 40, opacity: 0 },
          { 
            y: 0, 
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 98%",
              end: "top 70%",
              scrub: 1.5,
            }
          }
        );
      });
      return () => ctx.revert();
    }
  }, [showIntro]);

  return (
    <SmoothScroll>
      <TargetCursor targetSelector=".cursor-target" />
      <div id="top" className="relative min-h-screen overflow-x-hidden text-deep-violet">
        <div className="noise-overlay" />
        <AnimatePresence mode="wait">
          {showIntro ? (
            <IntroLoader key="intro" onComplete={() => setShowIntro(false)} />
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="relative"
            >
              <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <Suspense fallback={null}>
                  <Hero3D />
                </Suspense>
              </div>
              <CinematicIntro />
              <div 
                ref={contentRef} 
                className="relative z-10 overflow-hidden"
              >
                <div className="relative z-10">
                  <Nav />
                  <Hero />
                  <Overview />
                  
                  <section className="py-20 relative overflow-visible">
                    <div className="text-center mb-16 px-6">
                      <h2 className="text-[10px] font-black tracking-[0.8em] text-[#DE638A] uppercase mb-4 opacity-60">
                        THE NEXUS EXPERIENCE
                      </h2>
                      <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#DE638A]/40 to-transparent mx-auto" />
                    </div>
                    
                    <ScrollStack baseScale={0.85} itemDistance={150} blurAmount={8}>
                      <ScrollStackItem>
                        <div className="text-[10px] font-black tracking-[0.5em] text-[#DE638A] mb-8 uppercase opacity-60">
                          CHAPTER 01
                        </div>
                        <h3 className="text-4xl md:text-6xl font-black text-[#4A3267] mb-10 leading-[1.1] neon-white-soft">
                          A premium gathering...
                        </h3>
                        <p className="text-lg md:text-xl text-[#4A3267]/70 leading-relaxed max-w-3xl">
                          NexusCon is more than just a conference; it's a curated environment where elite practitioners converge to share high-signal architecture and engineering depth.
                        </p>
                      </ScrollStackItem>

                      <ScrollStackItem>
                        <div className="text-[10px] font-black tracking-[0.5em] text-[#DE638A] mb-8 uppercase opacity-60">
                          CHAPTER 02
                        </div>
                        <h3 className="text-4xl md:text-6xl font-black text-[#4A3267] mb-10 leading-[1.1] neon-white-soft">
                          Practitioners First
                        </h3>
                        <p className="text-lg md:text-xl text-[#4A3267]/70 leading-relaxed max-w-3xl">
                          Built for developers, AI practitioners, and cloud architects who are actually building the future. Every session is designed for technical depth over marketing fluff.
                        </p>
                      </ScrollStackItem>

                      <ScrollStackItem>
                        <div className="text-[10px] font-black tracking-[0.5em] text-[#DE638A] mb-8 uppercase opacity-60">
                          CHAPTER 03
                        </div>
                        <h3 className="text-4xl md:text-6xl font-black text-[#4A3267] mb-10 leading-[1.1] neon-white-soft">
                          Curated Excellence
                        </h3>
                        <p className="text-lg md:text-xl text-[#4A3267]/70 leading-relaxed max-w-3xl">
                          Every talk, workshop, and networking session is hand-picked to ensure maximum signal-to-noise ratio. We prioritize quality over sheer volume of attendees.
                        </p>
                      </ScrollStackItem>

                      <ScrollStackItem itemClassName="h-auto md:h-[600px]">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
                          <div className="flex-1 text-left max-w-[500px]">
                            <div className="text-[10px] font-black tracking-[0.5em] text-[#DE638A] mb-6 uppercase opacity-80">
                              THE COMMUNITY
                            </div>
                            <h3 className="text-4xl md:text-6xl font-black text-[#4A3267] mb-8 leading-[1.1] neon-white">
                              The Community
                            </h3>
                            <p className="text-lg text-[#4A3267]/70 leading-relaxed mb-12">
                              An elite group of practitioners across all domains of engineering. From startups to scale-ups, we gather the most ambitious builders in India.
                            </p>
                            <div className="flex gap-4">
                              <div className="px-7 py-3.5 rounded-full bg-[#4A3267] text-white font-bold text-[13px] shadow-xl shadow-[#4A3267]/20 uppercase tracking-wider">
                                7+ Roles
                              </div>
                              <div className="px-7 py-3.5 rounded-full bg-[#DE638A] text-white font-bold text-[13px] shadow-xl shadow-[#DE638A]/20 uppercase tracking-wider">
                                Elite Tier
                              </div>
                            </div>
                          </div>
                          <div className="w-full lg:w-[520px] flex justify-center items-center">
                            <Carousel baseWidth={460} />
                          </div>
                        </div>
                      </ScrollStackItem>
                    </ScrollStack>
                  </section>

                  <Stats />
                  <TrackRecord />
                  <Speakers />
                  <WhySponsor />
                  <Testimonials />
                  <Packages />
                  <FinalCTA />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}

/* ---------------- 1. HERO SECTION ---------------- */
function Hero() {
  const premiumEase = [0.22, 1, 0.36, 1];
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <section className="relative h-[100svh] overflow-hidden">
      {/* 🧊 Center Glass Card with floating oscillation & Parallax */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <motion.div
          style={{ y: y1, opacity, scale, willChange: "transform, opacity" }}
          initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
          animate={{ 
            opacity: 1, 
            y: [0, -15, 0], // Floating motion (will be added to parallax via style.y)
            filter: "blur(0px)" 
          }}
          transition={{ 
            opacity: { duration: 1.2, delay: 0.2 },
            filter: { duration: 1.0, delay: 0.2 },
            y: { 
              duration: 4, 
              ease: "easeInOut", 
              repeat: Infinity, 
              repeatType: "mirror" 
            }
          }}
          className="backdrop-blur-[20px] bg-white/25 border border-white/40 rounded-3xl shadow-[0_10px_40px_rgba(74,50,103,0.15)] p-8 md:p-14 w-full md:w-[70%] max-w-[900px] text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: premiumEase }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] bg-gradient-to-br from-[#DE638A] to-[#4A3267] bg-clip-text text-transparent pb-2 neon-white-soft"
          >
            NexusCon Bengaluru '26
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease: premiumEase }}
            className="mt-6 text-xl md:text-2xl font-semibold text-[#4A3267]"
          >
            Where India's Tech Community Converges
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.7, ease: premiumEase }}
            className="mt-4 text-base md:text-lg text-[#4A3267]/70 max-w-2xl mx-auto leading-relaxed"
          >
            A premium conference experience focused on AI, Cloud, DevTools, and future technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8, ease: premiumEase }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button asChild size="xl" className="cursor-target premium-animate bg-gradient-to-br from-[#DE638A] to-[#4A3267] text-white border-none shadow-[0_4px_20px_rgba(222,99,138,0.4)] hover:scale-105 hover:shadow-[0_12px_40px_rgba(222,99,138,0.6)] hover:-translate-y-1 transition-all duration-300 px-10 rounded-full font-bold uppercase tracking-wide text-sm relative overflow-hidden group">
              <a href="#waitlist">
                <span className="relative z-10">Join Waitlist</span>
                <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </a>
            </Button>
            <Button asChild variant="outline" size="xl" className="cursor-target premium-animate bg-white/30 backdrop-blur-md border-white/50 text-[#4A3267] hover:bg-white/50 hover:scale-105 hover:-translate-y-1 transition-all duration-300 px-10 rounded-full font-bold uppercase tracking-wide text-sm">
              <a href="#about">Explore Event</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


/* ---------------- 2. EVENT OVERVIEW ---------------- */
function Overview() {
  return (
    <section id="overview" className="py-24 md:py-40 relative">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#4A3267] neon-white">
            A focused day. <span className="text-[#DE638A]">Designed end-to-end.</span>
          </h2>
          <p className="mt-6 text-lg text-[#4A3267]/60 max-w-2xl mx-auto">
            We move beyond surface-level trends to real, deployable architecture. 
            NexusCon is built for the practitioner who values depth and genuine connection.
          </p>
        </Reveal>
      </div>

      <MagicBento />
    </section>
  );
}

/* ---------------- 3. ABOUT NEXUSCON ---------------- */
function About() {
  return (
    <section id="about" className="py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            A premium gathering of India’s <span className="text-gradient-primary">most ambitious builders.</span>
          </h2>
        </Reveal>

        <div className="space-y-16">
          {[
            { title: "Practitioners First", text: "Built for developers, AI practitioners, and cloud architects who are actually building the future." },
            { title: "Curated Excellence", text: "Every talk, workshop, and networking session is hand-picked to ensure maximum signal-to-noise ratio." },
            { title: "Future Focused", text: "From foundation models to distributed systems, we focus on the technologies that will define the next decade." },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-4">
                  <span className="h-px w-12 bg-gradient-primary opacity-30" />
                  {item.title}
                </h3>
                <p className="text-lg text-deep-violet/70 leading-relaxed pl-16">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 4. WHO WILL ATTEND ---------------- */
function Audience() {
  const audience = [
    "Software Engineers",
    "Cloud Architects",
    "AI/ML Practitioners",
    "CTOs / VPs of Engineering",
    "Product Managers",
    "Startup Founders",
    "Ambitious Students",
  ];
  return (
    <section id="audience" className="py-24 md:py-40 bg-soft-purple/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#4A3267]">
            A community of <span className="text-gradient-primary">elite practitioners.</span>
          </h2>
          <motion.div 
            style={{ x: -20 }}
            whileInView={{ x: 20 }}
            transition={{ repeat: Infinity, duration: 8, repeatType: "mirror", ease: "easeInOut" }}
            className="mt-4 h-1 w-32 bg-gradient-primary mx-auto opacity-20 rounded-full"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
          {audience.map((person, i) => (
            <Reveal key={person} delay={i * 0.05}>
              <div className="flex items-center gap-6 py-6 border-b border-deep-violet/5 hover:border-blush-pink/30 transition-colors group">
                <span className="text-4xl font-bold opacity-10 group-hover:opacity-30 transition-opacity">0{i+1}</span>
                <span className="text-xl md:text-2xl font-bold">{person}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 5. COMMUNITY REACH ---------------- */
function Stats() {
  const stats = [
    { value: 5000, suffix: "+", label: "LinkedIn followers" },
    { value: 13600, suffix: "+", label: "Meetup members" },
    { value: 3.1, suffix: "M", decimals: 1, label: "Total reach" },
    { value: 4.7, suffix: "/5", decimals: 1, label: "Attendee rating" },
  ];

  return (
    <section className="py-24 md:py-48 relative overflow-hidden">
      {/* Background Glows for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#DE638A]/5 to-[#4A3267]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#4A3267] neon-white-soft">
              A community that <span className="text-[#DE638A]">shows up.</span>
            </h2>
            <div className="mt-6 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#DE638A]/30 to-transparent mx-auto" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              delay={i * 0.08}
              value={
                <Counter 
                  to={s.value} 
                  suffix={s.suffix} 
                  decimals={s.decimals ?? 0} 
                />
              }
              label={s.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 6. TRACK RECORD ---------------- */
function TrackRecord() {
  const milestones = [
    { date: "2023-2025", title: "24+ Events Hosted", desc: "Consistent, high-quality technical programming across major Indian tech hubs." },
    { date: "Active Reach", title: "5,000+ Participants", desc: "A growing network of verified builders and industry leaders." },
    { date: "Expert Led", title: "MVP-led Sessions", desc: "Curated content delivered by Microsoft MVPs and Google Developer Experts." },
    { date: "Impact", title: "Strong Engagement", desc: "Industry-leading retention rates and community-driven growth." },
  ];
  return (
    <section className="py-24 md:py-40 bg-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-24">
            Years of <span className="text-gradient-primary">consistent building.</span>
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-deep-violet/20 to-transparent" />
          
          <div className="space-y-24">
            {milestones.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.1}>
                <div className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="absolute left-[-4px] md:left-1/2 md:ml-[-5px] w-[10px] h-[10px] rounded-full bg-blush-pink shadow-[0_0_15px_rgba(222,99,138,0.8)]" />
                  
                  <div className={`flex-1 md:w-1/2 ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    <div className="text-sm font-bold text-blush-pink mb-2">{m.date}</div>
                    <h3 className="text-3xl font-bold mb-4">{m.title}</h3>
                    <p className="text-lg text-deep-violet/70 leading-relaxed">{m.desc}</p>
                  </div>
                  <div className="flex-1 md:w-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 7. SPEAKERS ---------------- */
function Speakers() {
  const speakers = [
    { name: "Mohamed Azarudeen Z", role: "Cloud & DevOps Expert", image: "/azar.jpg" },
    { name: "Vinodh Kumar", role: "Solutions Architect", image: "/vinodh.jpg" },
    { name: "Speaker #03", role: "Coming Soon", image: "/tbd.jpg" },
    { name: "Speaker #04", role: "Coming Soon", image: "/tbd.jpg" },
  ];

  return (
    <section id="speakers" className="py-24 md:py-48 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#4A3267] neon-white-soft">
            Meet the <span className="text-[#DE638A]">voices</span> of NexusCon.
          </h2>
          <p className="mt-6 text-lg text-[#4A3267]/60 max-w-2xl mx-auto">
            A premium lineup of experts and practitioners shaping the future of Cloud, AI, and Distributed Systems.
          </p>
        </Reveal>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        {speakers.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -15, scale: 1.02 }}
              className="group relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl transition-all duration-500 group-hover:shadow-[#DE638A]/20">
                <img 
                  src={s.image} 
                  alt={s.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A3267] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-xs font-black tracking-widest text-[#DE638A] uppercase mb-2">Featured Speaker</div>
                  <h3 className="text-2xl font-bold text-white mb-1">{s.name}</h3>
                  <p className="text-white/60 font-medium text-sm">{s.role}</p>
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <div className="h-[600px] w-full relative opacity-40 hover:opacity-100 transition-opacity duration-1000">
        <CircularGallery 
          bend={2} 
          textColor="#4A3267" 
          borderRadius={0.1}
          items={[
            { image: "/azar.jpg", text: "Mohamed Azarudeen Z | Speaker" },
            { image: "/vinodh.jpg", text: "Vinodh Kumar | Speaker #HIRING" },
            { image: "/tbd.jpg", text: "Announcement | TBD" },
            { image: "/tbd.jpg", text: "Announcement | TBD" },
            { image: "/tbd.jpg", text: "Announcement | TBD" },
            { image: "/tbd.jpg", text: "Announcement | TBD" },
          ]}
        />
      </div>
    </section>
  );
}

/* ---------------- 8. WHY SPONSOR ---------------- */
function WhySponsor() {
  const reasons = [
    { title: "Premium Audience", desc: "Direct access to ~450 vetted decision-makers and senior engineers." },
    { title: "Proven Community", desc: "Leverage a community of 18,000+ members who trust our curation." },
    { title: "Full-Funnel Exposure", desc: "Brand presence from pre-event content to on-site activations." },
    { title: "Exclusive Positioning", desc: "Limited sponsor slots ensure stronger recall and a more premium on ground brand presence." },
    { title: "Community Trust", desc: "Align with a community-first organization built on practitioner value." },
    { title: "ROI-Focused", desc: "Lead generation, hiring visibility, product awareness, and long-tail brand equity from one event." },
  ];

  return (
    <section id="sponsor" className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F3D9E5, #EADCF5, #F7B9C4)' }}>
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-pattern" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-[10px] font-black tracking-[0.5em] text-[#4A3267]/60 mb-4 uppercase">
              WHY SPONSOR US
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#4A3267] leading-[1.1] max-w-3xl">
              Premium positioning with <span className="bg-gradient-to-r from-[#DE638A] to-[#6C63FF] bg-clip-text text-transparent">measurable outcomes.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <StarBorder 
                  color="#DE638A" 
                  speed="8s" 
                  thickness={2} 
                  className="w-full h-full"
                  innerClassName="bg-white/55 backdrop-blur-[20px]"
                >
                  <div className="group relative rounded-[24px] p-8 md:p-10 border border-white/40 shadow-[0_12px_40px_rgba(74,50,103,0.12)] hover:bg-white/70 hover:shadow-[0_20px_50px_rgba(74,50,103,0.18)] transition-all duration-500 cursor-target h-full overflow-hidden">
                    <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[#F7B9C4]/10 to-[#C6BADE]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="h-14 w-14 rounded-2xl bg-[#DE638A]/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#DE638A] transition-all duration-500">
                        <Sparkles className="h-7 w-7 text-[#DE638A] group-hover:text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-[#4A3267]">{r.title}</h3>
                      <p className="text-[#4A3267]/60 font-medium leading-relaxed">{r.desc}</p>
                    </div>

                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-5 w-5 text-[#DE638A] -rotate-45" />
                    </div>
                  </div>
                </StarBorder>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 9. TESTIMONIALS ---------------- */
function Testimonials() {
  const testimonials = [
    {
      name: "Prasanna V Nagarajan",
      role: "Principal Software Engineer, Solutions Engineering Team",
      text: "TechNexus excels at fostering a vibrant tech thought process, effectively bridging the gap between seasoned professionals and emerging talent. Their well-organized events make it an exceptional platform.",
      highlights: ["bridging the gap", "exceptional platform"]
    },
    {
      name: "Navaneethan Gopal",
      role: "Organizer – Azure Developer Community Tamil Nadu",
      text: "A vibrant community where Data and AI enthusiasts come together to share insights and drive innovation. An invaluable asset for anyone in the field.",
      highlights: ["drive innovation", "invaluable asset"]
    },
    {
      name: "Lakshit Pant",
      role: "Microsoft CPM – India",
      text: "Brilliant effort by community leaders. It's great to see so many experts involved, creating numerous opportunities for students and professionals to share ideas.",
      highlights: ["Brilliant effort", "share ideas"]
    },
    {
      name: "Prateek Singh",
      role: "Founder, Ganak AI Labs",
      text: "One of the most well-run, high-energy communities I've engaged with. Exceptional experience with a great turnout, curious minds, and thoughtful engagement.",
      highlights: ["high-energy", "Exceptional experience"]
    },
    {
      name: "Abhilekh Verma",
      role: "Founder – Abhilekh Verma Consultancy",
      text: "Excellent hospitality and a great community with top-notch networking opportunities. Highly recommended for everyone to be part of such a vibrant tech ecosystem.",
      highlights: ["top-notch networking", "vibrant tech ecosystem"]
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-32 md:py-48 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F3D9E5, #EADCF5, #F7B9C4)' }}>
      {/* Subtle Mesh Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-mesh" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <Reveal>
          <div className="mb-12">
            <Quote className="h-16 w-16 text-[#DE638A]/20 mx-auto animate-float-slow" />
          </div>

          <div className="relative glass-card border border-white/40 bg-white/40 backdrop-blur-[24px] rounded-[32px] p-10 md:p-16 min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-10"
              >
                <h2 className="text-2xl md:text-4xl font-semibold leading-[1.4] text-[#4A3267]">
                  “{testimonials[index].text.split(' ').map((word, i) => {
                    const isHighlighted = testimonials[index].highlights.some(h => 
                      h.toLowerCase().includes(word.toLowerCase().replace(/[.,“]/g, ''))
                    );
                    return (
                      <span key={i} className={isHighlighted ? "bg-gradient-to-r from-[#DE638A] to-[#6C63FF] bg-clip-text text-transparent font-bold" : ""}>
                        {word}{' '}
                      </span>
                    );
                  })}”
                </h2>

                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#DE638A] via-[#C6BADE] to-[#F7B9C4] p-[2px] shadow-lg">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#DE638A] font-black text-xl">
                      {testimonials[index].name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#4A3267]">{testimonials[index].name}</div>
                    <div className="text-[#4A3267]/60 font-medium tracking-tight mt-1">{testimonials[index].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-[#DE638A]' : 'w-2 bg-[#DE638A]/20'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 10. SPONSORSHIP PACKAGES ---------------- */
function Packages() {
  return (
    <section className="py-24 md:py-40 bg-white/30">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-24">
            Sponsorship <span className="text-gradient-primary">Packages.</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-12 items-stretch">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="h-full rounded-3xl p-1 bg-gradient-primary shadow-premium">
                <div className="h-full bg-white rounded-[calc(1.5rem+4px)] p-10 flex flex-col">
                  <div className="text-xs font-black tracking-[0.3em] text-blush-pink mb-4 uppercase">1 Slot Available</div>
                  <h3 className="text-4xl md:text-5xl font-black mb-8 text-deep-violet">Title Sponsor</h3>
                  <ul className="space-y-5 flex-1">
                    {[
                      "Premier keynote speaking slot",
                      "Exclusive title billing on all media",
                      "Largest premium booth footprint",
                      "Co-branded community content series",
                      "VIP speaker dinner access",
                      "Dedicated attendee data package"
                    ].map(perk => (
                      <li key={perk} className="flex items-start gap-4 font-medium text-deep-violet/80">
                        <Check className="h-5 w-5 text-blush-pink shrink-0 mt-0.5" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl p-1 bg-gradient-primary shadow-premium">
                <div className="h-full bg-white rounded-[calc(1.5rem+4px)] p-10 flex flex-col">
                  <div className="text-xs font-black tracking-[0.3em] text-blush-pink mb-4 uppercase">2 Slots Available</div>
                  <h3 className="text-4xl font-bold mb-8 text-deep-violet">Co-Sponsor</h3>
                  <div className="grid md:grid-cols-2 gap-8 flex-1">
                    <ul className="space-y-4">
                      {[
                        "Prominent logo recognition",
                        "Workshop or panel speaking slot",
                        "Dedicated prime booth space"
                      ].map(perk => (
                        <li key={perk} className="flex items-start gap-3 font-medium text-deep-violet/80">
                          <Check className="h-5 w-5 text-blush-pink shrink-0 mt-0.5" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-4">
                      {[
                        "Social media reach inclusion",
                        "Curated networking access",
                        "Post-event impact report"
                      ].map(perk => (
                        <li key={perk} className="flex items-start gap-3 font-medium text-deep-violet/80">
                          <Check className="h-5 w-5 text-blush-pink shrink-0 mt-0.5" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 11. FINAL CTA ---------------- */
function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="waitlist" className="py-32 md:py-64 relative overflow-hidden" ref={containerRef}>
      {/* Cinematic Portal Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-[#DE638A]/20 via-[#6C63FF]/10 to-transparent blur-[160px] rounded-full pointer-events-none animate-blob" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Copy */}
          <div className="lg:col-span-7 space-y-10">
            <Reveal>
              <div className="flex items-center gap-4">
                <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-[#4A3267]/80 uppercase flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DE638A] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DE638A]"></span>
                  </span>
                  RSVP UPDATES
                </div>
              </div>
              
              <h2 className="text-5xl md:text-8xl font-black text-[#4A3267] leading-[0.95] tracking-tighter mt-8">
                Your seat <br />
                at the <span className="bg-gradient-to-r from-[#DE638A] to-[#6C63FF] bg-clip-text text-transparent">Frontier.</span>
              </h2>
              
              <p className="text-xl text-[#4A3267]/70 max-w-lg leading-relaxed font-medium">
                NexusCon Bengaluru ‘26 is a curated experience. Join the priority list for exclusive registration access.
              </p>
            </Reveal>
          </div>

          {/* Right Side: Interactive Ticket Card */}
          <div className="lg:col-span-5 relative">
            <Reveal delay={0.2}>
              <div className="relative group">
                {/* Glow Background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#DE638A]/20 to-[#6C63FF]/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative glass-card border border-white/60 bg-white/40 backdrop-blur-[32px] rounded-[32px] p-8 md:p-12 shadow-[0_32px_80px_rgba(74,50,103,0.15)]">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="h-20 w-20 rounded-full bg-[#DE638A]/10 flex items-center justify-center mx-auto mb-6 text-[#DE638A]">
                        <Check className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-[#4A3267]">You're Confirmed.</h3>
                      <p className="text-[#4A3267]/60 font-mono text-sm uppercase tracking-widest">Priority Pass: #NX-2026-BGL</p>
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                      className="space-y-8"
                    >
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold text-[#4A3267]/80 uppercase tracking-[0.2em] ml-2">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Satoshi Nakamoto"
                            className="w-full bg-white/20 border border-white/40 px-6 py-4 rounded-2xl focus:outline-none font-mono text-sm text-[#4A3267] placeholder:text-[#4A3267]/50 focus:bg-white/60 focus:border-[#DE638A]/30 transition-all cursor-target"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold text-[#4A3267]/80 uppercase tracking-[0.2em] ml-2">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="satoshi@bitcoin.org"
                            className="w-full bg-white/20 border border-white/40 px-6 py-4 rounded-2xl focus:outline-none font-mono text-sm text-[#4A3267] placeholder:text-[#4A3267]/50 focus:bg-white/60 focus:border-[#DE638A]/30 transition-all cursor-target"
                          />
                        </div>
                      </div>

                      <button type="submit" className="w-full group/btn relative overflow-hidden rounded-2xl p-[1px] cursor-target">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#DE638A] via-[#6C63FF] to-[#DE638A] animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                        <div className="relative bg-[#4A3267] group-hover/btn:bg-transparent transition-colors duration-500 py-5 rounded-[15px] flex items-center justify-center gap-3">
                          <span className="text-white font-mono font-bold text-xs uppercase tracking-widest relative z-10">Notify for RSVP</span>
                          <ArrowRight className="h-4 w-4 text-white group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </button>

                      <p className="text-[9px] font-mono font-bold text-[#4A3267]/60 text-center uppercase tracking-tighter">
                        Priority access to workshops & early bird tiers.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  );
}

function Page() {
  return (
    <main className="bg-[#F3D9E5] selection:bg-[#DE638A] selection:text-white">
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>
      <TargetCursor />
      
      <div className="relative">
        <Hero />
        <Overview />
        <About />
        <Speakers />
        <WhySponsor />
        <Packages />
        <Testimonials />
        <FinalCTA />
      </div>
    </main>
  );
}
