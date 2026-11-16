"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DigitalCore } from "@/three/objects/digital-core";
import { ParticleField } from "@/three/objects/particle-field";
import { StageLights } from "@/three/lights/stage-lights";

/**
 * Full-bleed 3D volume behind the hero copy.
 * Mobile: simplified geometry/particle budget. Reduced motion: static frame.
 */
export default function HeroScene() {
  const reducedMotion = useReducedMotion() ?? false;
  const simplified = useMediaQuery("(max-width: 768px)");

  return (
    <Canvas
      dpr={simplified ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: !simplified,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0.35, 6.4], fov: 42, near: 0.1, far: 40 }}
      frameloop={reducedMotion ? "demand" : "always"}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <fog attach="fog" args={["#06070a", 7, 13.5]} />
      <StageLights />
      <ParticleField count={simplified ? 90 : 240} reducedMotion={reducedMotion} />
      <DigitalCore reducedMotion={reducedMotion} simplified={simplified} />
    </Canvas>
  );
}
