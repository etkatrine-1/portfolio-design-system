"use client";

import { useRef, useEffect, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { vertexShader, fragmentShader } from "@/shaders/heroNoise";

gsap.registerPlugin(ScrollTrigger);

// Convert hex to normalized RGB vec3
function hexToVec3(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

function NoisePlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const mouseCurrent = useRef({ x: 0.5, y: 0.5 });
  const scrollProgress = useRef(0);
  const { size } = useThree();

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uScrollProgress: { value: 0 },
      uColorAcid: { value: new THREE.Vector3(...hexToVec3("#C8FF00")) },
      uColorMist: { value: new THREE.Vector3(...hexToVec3("#A78BFA")) },
      uColorBase: { value: new THREE.Vector3(...hexToVec3("#0E0E0E")) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      mouseTarget.current.x = e.clientX / window.innerWidth;
      mouseTarget.current.y = 1.0 - e.clientY / window.innerHeight;
    },
    [prefersReducedMotion]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // ScrollTrigger for fade-out
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "100vh top",
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });
    return () => trigger.kill();
  }, []);

  // Update resolution on resize
  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;

    if (!prefersReducedMotion) {
      mat.uniforms.uTime.value += delta;
    }

    // Lerp mouse
    mouseCurrent.current.x +=
      (mouseTarget.current.x - mouseCurrent.current.x) * 0.05;
    mouseCurrent.current.y +=
      (mouseTarget.current.y - mouseCurrent.current.y) * 0.05;

    mat.uniforms.uMouse.value.set(
      mouseCurrent.current.x,
      mouseCurrent.current.y
    );
    mat.uniforms.uScrollProgress.value = scrollProgress.current;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fade in after hero TextReveal (~0.8s)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, delay: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0 }}
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ alpha: true, antialias: false }}
        camera={{ position: [0, 0, 1] }}
      >
        <NoisePlane />
      </Canvas>
    </div>
  );
}
