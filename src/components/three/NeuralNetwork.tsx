"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type * as THREE from "three";

const PARTICLE_COUNT = 180;
const CONNECTION_DIST = 180;

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const startTime = useRef(0);
  const pauseOffset = useRef(0);
  const pauseStart = useRef(0);
  const runningRef = useRef(true);
  const resizeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const needsReset = useRef(false);

  const [particles] = useState(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return { pos, sz };
  });

  useEffect(() => {
    startTime.current = performance.now();

    function onPointerMove(e: { clientX: number; clientY: number }) {
      if (!runningRef.current) return;
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    function pause() {
      if (!runningRef.current) return;
      runningRef.current = false;
      pauseStart.current = performance.now();
    }

    function resume() {
      if (runningRef.current) return;
      pauseOffset.current += performance.now() - pauseStart.current;
      runningRef.current = true;
      needsReset.current = true;
      if (meshRef.current) {
        const geo = meshRef.current.geometry;
        const pos = particles.pos;
        const array = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < pos.length; i++) {
          array[i] = pos[i];
        }
        geo.attributes.position.needsUpdate = true;
        if (geo.attributes.size) geo.attributes.size.needsUpdate = true;
      }
    }

    function onVisibilityChange() {
      if (document.hidden) pause();
      else resume();
    }

    function onBlur() { pause(); }
    function onFocus() { resume(); }
    function onPageHide() { pause(); }
    function onPageShow() { resume(); }

    function onResize() {
      pause();
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => {
        resume();
      }, 200);
    }

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer.current);
    };
  }, [particles.pos]);

  useFrame(() => {
    if (!meshRef.current || !runningRef.current) return;
    const positionsAttr = meshRef.current.geometry.attributes.position;
    const array = positionsAttr.array as Float32Array;
    const time = (performance.now() - startTime.current - pauseOffset.current) / 1000;
    const mx = mouseRef.current.x * 0.5;
    const my = mouseRef.current.y * 0.3;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      array[idx + 1] += Math.sin(time * 0.3 + i) * 0.001;
      array[idx] += Math.cos(time * 0.2 + i) * 0.001;
      array[idx] += mx * 0.002;
      array[idx + 1] += my * 0.002;
      if (Math.abs(array[idx]) > 5) array[idx] *= -0.9;
      if (Math.abs(array[idx + 1]) > 5) array[idx + 1] *= -0.9;
    }
    positionsAttr.needsUpdate = true;
    needsReset.current = false;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.pos, 3] as [Float32Array, number]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[particles.sz, 1] as [Float32Array, number]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.5}
        color="#00E5FF"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={2}
      />
    </points>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const [linePos] = useState(() => {
    const pts: number[] = [];
    const nodes: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
        z: (Math.random() - 0.5) * 4,
      });
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECTION_DIST) {
          pts.push(nodes[i].x, nodes[i].y, nodes[i].z);
          pts.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    return new Float32Array(pts);
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePos, 3] as [Float32Array, number]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00E5FF" transparent opacity={0.08} />
    </lineSegments>
  );
}

function WebGLGuard() {
  const { gl, invalidate, scene } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    function onContextLost(e: Event) {
      e.preventDefault();
    }

    function onContextRestored() {
      scene.traverse((obj) => {
        if (!("geometry" in obj)) return;
        const geo = (obj as THREE.Mesh | THREE.Points | THREE.LineSegments).geometry;
        if (geo) {
          for (const key in geo.attributes) {
            geo.attributes[key].needsUpdate = true;
          }
        }
      });
      invalidate();
      requestAnimationFrame(() => invalidate());
    }

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
    };
  }, [gl, invalidate, scene]);

  return null;
}

function Scene() {
  return (
    <>
      <WebGLGuard />
      <ParticleField />
      <ConnectionLines />
    </>
  );
}

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl") || c.getContext("webgl2"));
  } catch {
    return false;
  }
}

export default function NeuralNetwork() {
  const prefersMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;

  if (prefersMotion || (typeof window !== "undefined" && !hasWebGL())) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
