import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
    camera.position.set(0, 12, 30);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ─── Wave Mesh (fills entire background) ───
    const cols = 120;
    const rows = 60;
    const geometry = new THREE.PlaneGeometry(120, 60, cols, rows);
    
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;

        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vUv = uv;
          float elevation = snoise(uv * 4.0 + uTime * 0.15) * 3.0;
          elevation += snoise(uv * 8.0 - uTime * 0.08) * 1.0;
          vElevation = elevation;
          
          vec3 newPos = position;
          newPos.z += elevation;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          // Blend from lavender (#C6BADE) to pink (#DE638A) to violet (#4A3267)
          vec3 lavender = vec3(0.776, 0.729, 0.871);
          vec3 pink = vec3(0.871, 0.388, 0.541);
          vec3 violet = vec3(0.290, 0.196, 0.404);
          vec3 softPink = vec3(0.969, 0.725, 0.769);
          
          float t = smoothstep(-3.0, 3.0, vElevation);
          vec3 color = mix(mix(lavender, softPink, t), mix(pink, violet, t), vUv.x * 0.7 + vUv.y * 0.3);
          
          // Opacity: stronger in center-right, fading at edges
          float edgeFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
          edgeFade *= smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
          
          gl_FragColor = vec4(color, 0.35 * edgeFade);
        }
      `,
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.32;
    mesh.position.y = -8;
    mesh.position.z = -10;
    scene.add(mesh);

    // ─── Floating Particles ───
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 80;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      color: "#DE638A",
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ─── Mouse & Scroll Parallax ───
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    // ─── Animation Loop ───
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;

      // Premium smoothed parallax
      const targetCamX = mouseX * 4;
      const targetCamY = mouseY * 2 + 12 - (scrollY * 0.01);
      
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Subtle mesh drift
      mesh.rotation.z = Math.sin(t * 0.05) * 0.03;
      mesh.position.y = -8 + Math.cos(t * 0.1) * 0.5;

      // Particle float
      particles.rotation.y = t * 0.015;
      particles.rotation.x = Math.sin(t * 0.02) * 0.08;

      renderer.render(scene, camera);
    };
    
    gsap.ticker.add(animate);

    // ─── Resize ───
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(animate);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      geometry.dispose();
      material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" aria-hidden />;
}
