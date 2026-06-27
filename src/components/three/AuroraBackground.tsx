"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5)) * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 uv = vUv;
  vec2 p = uv - 0.5;
  p.x *= aspect;

  float time = uTime * 0.035;

  vec2 q = vec2(p.x * 1.2 + time * 0.08, p.y * 0.4 + time * 0.04);
  float n1 = fbm(q);

  vec2 r = vec2(p.x * 2.2 - time * 0.06, p.y * 0.3 + time * 0.05 + n1 * 0.15);
  float n2 = fbm(r);

  vec2 s = vec2(p.x * 0.6 + time * 0.025, p.y * 0.25 - time * 0.03);
  float n3 = fbm(s);

  float pattern = n1 * 0.5 + n2 * 0.35 + n3 * 0.15;

  float vertGrad = 1.0 - uv.y * 0.6;

  vec3 deep = vec3(0.0, 0.15, 0.45);
  vec3 cyan = vec3(0.0, 0.9, 1.0);
  vec3 accent = vec3(0.4, 0.96, 1.0);

  vec3 color = mix(deep, cyan, pattern);
  color = mix(color, accent, n2 * 0.3);

  float dist = distance(uv, uMouse);
  float mouseGlow = exp(-dist * 4.5) * 0.3;
  color += vec3(0.0, 0.65, 1.0) * mouseGlow;

  float vignette = 1.0 - length(p / vec2(aspect * 0.75, 0.75));
  vignette = clamp(vignette, 0.0, 1.0);
  color *= (vignette * 0.9 + 0.1);

  float alpha = pattern * 0.18 * vertGrad + mouseGlow * 0.18;
  alpha *= vignette;
  alpha = clamp(alpha, 0.0, 0.22);

  gl_FragColor = vec4(color, alpha);
}
`;

function AuroraPlane() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const target = useRef({ x: 0.5, y: 0.5 });
  const isTouch = useRef(false);

  const { viewport, size } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1, 1) },
  }), []);

  useEffect(() => {
    isTouch.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.uniforms.uTime.value = clock.elapsedTime;
    ref.current.uniforms.uResolution.value.set(size.width, size.height);

    if (!isTouch.current) {
      target.current.x = pointer.x * 0.5 + 0.5;
      target.current.y = pointer.y * 0.5 + 0.5;
      mouse.current.x += (target.current.x - mouse.current.x) * 0.03;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.03;
      ref.current.uniforms.uMouse.value.set(mouse.current.x, 1.0 - mouse.current.y);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={ref}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function AuroraBackground() {
  const [mounted, setMounted] = useState(false);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasRM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hasGL = false;
    try {
      const c = document.createElement("canvas");
      hasGL = !!(c.getContext("webgl") || c.getContext("webgl2"));
    } catch {}
    setCanRender(!hasRM && hasGL);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />;
  }

  if (!canRender) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, premultipliedAlpha: false }}
        camera={{ position: [0, 0, 1], fov: 60, near: 0.1, far: 10 }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener("webglcontextlost", (e: Event) => {
            e.preventDefault();
          });
          gl.domElement.addEventListener("webglcontextrestored", () => {
            gl.setClearColor(0x000000, 0);
          });
        }}
      >
        <AuroraPlane />
      </Canvas>
    </div>
  );
}
