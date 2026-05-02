import{r as z,S as L,P as R,W as T,a as W,b,M as j,B,c as F,d as Y,e as D,C as G,g as P,j as H}from"./index-DdKV7Uq-.js";function X(){const d=z.useRef(null);return z.useEffect(()=>{const i=d.current;if(!i)return;const m=i.clientWidth,x=i.clientHeight,r=new L,t=new R(60,m/x,.1,200);t.position.set(0,12,30),t.lookAt(0,0,0);const o=new T({antialias:!0,alpha:!0});o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setSize(m,x),o.setClearColor(0,0),i.appendChild(o.domElement);const k=120,S=60,p=new W(120,60,k,S),c=new b({transparent:!0,uniforms:{uTime:{value:0}},vertexShader:`
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
      `,fragmentShader:`
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
      `,wireframe:!0}),n=new j(p,c);n.rotation.x=-Math.PI*.32,n.position.y=-8,n.position.z=-10,r.add(n);const u=60,v=new B,s=new Float32Array(u*3);for(let e=0;e<u;e++)s[e*3]=(Math.random()-.5)*80,s[e*3+1]=(Math.random()-.5)*40,s[e*3+2]=(Math.random()-.5)*30;v.setAttribute("position",new F(s,3));const w=new Y({size:.15,color:"#DE638A",transparent:!0,opacity:.5}),l=new D(v,w);r.add(l);let h=0,f=0,y=0;const g=e=>{h=e.clientX/window.innerWidth*2-1,f=-(e.clientY/window.innerHeight)*2+1},E=()=>{y=window.scrollY};window.addEventListener("mousemove",g),window.addEventListener("scroll",E);const A=new G,C=()=>{const e=A.getElapsedTime();c.uniforms.uTime.value=e;const a=h*4,U=f*2+12-y*.01;t.position.x+=(a-t.position.x)*.05,t.position.y+=(U-t.position.y)*.05,t.lookAt(0,0,0),n.rotation.z=Math.sin(e*.05)*.03,n.position.y=-8+Math.cos(e*.1)*.5,l.rotation.y=e*.015,l.rotation.x=Math.sin(e*.02)*.08,o.render(r,t)};P.ticker.add(C);const M=()=>{const e=i.clientWidth,a=i.clientHeight;t.aspect=e/a,t.updateProjectionMatrix(),o.setSize(e,a)};return window.addEventListener("resize",M),()=>{P.ticker.remove(C),window.removeEventListener("resize",M),window.removeEventListener("mousemove",g),window.removeEventListener("scroll",E),p.dispose(),c.dispose(),v.dispose(),w.dispose(),o.dispose(),o.domElement.parentNode&&o.domElement.parentNode.removeChild(o.domElement)}},[]),H.jsx("div",{ref:d,className:"w-full h-full","aria-hidden":!0})}export{X as default};
