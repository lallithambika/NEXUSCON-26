import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextType from "./ui/TextType";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Global GSAP optimizations
    gsap.ticker.fps(60);
    gsap.ticker.lagSmoothing(1000, 16);

    // GSAP Scroll Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Longer pin for more fluid motion
        scrub: 2.5,   // Higher scrub for "Apple-like" momentum
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(titleRef.current, {
      y: -200,
      opacity: 0,
      scale: 0.85,
      filter: "blur(10px)",
      duration: 1,
      ease: "power3.inOut"
    })
    .to(scrollIndicatorRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
    }, 0)
    .to(canvasRef.current, {
      scale: 1.4,
      opacity: 0.3,
      filter: "blur(25px)",
      duration: 2,
      ease: "power2.inOut"
    }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#F3D9E5]"
    >
      {/* 3D Background */}
      <div ref={canvasRef} className="absolute inset-0 z-0">
        <CityBackground />
      </div>

      {/* Clean Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-[#F3D9E5]/30 via-transparent to-[#F3D9E5]/50" />

      {/* Centered Content */}
      <div 
        ref={titleRef}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <h1 className="text-8xl md:text-[14rem] font-black leading-none tracking-tighter text-white neon-white">
            NEXUSCON
          </h1>
          <div className="text-2xl md:text-5xl font-black tracking-[0.5em] text-white/90 uppercase neon-white-soft">
            BENGALURU ’26
          </div>
          <div className="pt-10">
            <TextType 
              text="WHERE INDIA’S TECH COMMUNITY CONVERGES"
              className="text-sm md:text-base font-bold tracking-[0.6em] text-white uppercase neon-white-soft"
              typingSpeed={50}
              showCursor={false}
              loop={false}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-black tracking-[0.6em] text-white/60 uppercase">Scroll Down</span>
        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-14 w-px bg-white/40"
        />
      </div>
    </section>
  );
}

function CityBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 80);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const colors = {
      violet: 0x4A3267,
      pink: 0xDE638A,
      lavender: 0xC6BADE,
      softPink: 0xF7B9C4,
      bg: 0xF3D9E5,
      window: 0xFFD966
    };

    scene.fog = new THREE.Fog(colors.bg, 15, 100);

    // Emissive Map Generator (White windows on Black background)
    const createEmissiveMap = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.fillStyle = '#000000'; // Black background = no emission
      ctx.fillRect(0, 0, 128, 128);
      
      ctx.fillStyle = '#ffffff'; // White = full emission
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 12; j++) {
          if (Math.random() > 0.4) {
            ctx.fillRect(i * 20 + 8, j * 10 + 4, 12, 4);
          }
        }
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = 16;
      return texture;
    };

    const emissiveMap = createEmissiveMap();

    // Ground
    const groundGeo = new THREE.PlaneGeometry(800, 800);
    const groundMat = new THREE.MeshStandardMaterial({ 
      color: colors.bg,
      roughness: 1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const cityGroup = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);

    const getWeightedColor = () => {
      const r = Math.random();
      if (r < 0.6) return colors.lavender;
      if (r < 0.85) return colors.violet;
      return colors.pink;
    };
    
    for (let i = 0; i < 500; i++) {
      const h = Math.random() * 25 + 5;
      const w = Math.random() * 5 + 2;
      const d = Math.random() * 5 + 2;
      const color = getWeightedColor();

      const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.5,
        metalness: 0.1,
        emissive: colors.window,
        emissiveIntensity: Math.random() * 0.4 + 0.2,
        emissiveMap: emissiveMap,
      });

      if (material.emissiveMap) {
        material.emissiveMap = material.emissiveMap.clone(); // Clone to vary repeat
        material.emissiveMap.repeat.set(w, h / 2);
        material.emissiveMap.needsUpdate = true;
      }

      const building = new THREE.Mesh(boxGeo, material);
      building.scale.set(w, h, d);
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * 120;
      const bx = Math.cos(angle) * radius;
      const bz = Math.sin(angle) * radius;
      
      if (Math.abs(bx) < 20) {
        building.position.x = bx + (bx > 0 ? 20 : -20);
      } else {
        building.position.x = bx;
      }
      
      building.position.y = h / 2;
      building.position.z = bz;
      building.rotation.y = (Math.random() - 0.5) * 0.15;
      
      cityGroup.add(building);
    }
    scene.add(cityGroup);

    // Layering for parallax
    const fgGroup = new THREE.Group();
    const bgGroup = new THREE.Group();
    cityGroup.children.forEach((b) => {
      if (b.position.z > 20) fgGroup.add(b);
      else bgGroup.add(b);
    });
    scene.add(fgGroup, bgGroup);

    // Bright Premium Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.0); // Brighter ambient
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffffff, 1.5); // Very bright sun
    sun.position.set(100, 100, 50);
    scene.add(sun);

    const hemiLight = new THREE.HemisphereLight(0xffffff, colors.bg, 0.5);
    scene.add(hemiLight);

    const animate = (time: number) => {
      const elapsed = time * 0.001; // gsap ticker gives time in ms
      const scroll = window.scrollY / window.innerHeight;
      
      // Smooth camera base motion
      camera.position.z = 80 - (elapsed * 2) - (scroll * 12);
      camera.position.y = 15 + Math.sin(elapsed * 0.4) * 1.5 - (scroll * 6);
      
      if (camera.position.z < -60) camera.position.z = 80;
      
      // Parallax layers
      fgGroup.position.z = -scroll * 30;
      bgGroup.position.z = -scroll * 10;
      
      camera.lookAt(0, 5 - scroll * 5, -50);

      renderer.render(scene, camera);
    };
    
    gsap.ticker.add(animate);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(animate);
      window.removeEventListener("resize", handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      boxGeo.dispose();
      groundGeo.dispose();
      if (emissiveMap) emissiveMap.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
