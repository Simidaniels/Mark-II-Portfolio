"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Deterministic pseudo-random generator so server/client markup and
 * re-renders agree (no hydration surprises in R3F args).
 */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Slow drifting dust field in a spherical shell around the core. */
export function ParticleField({
  count = 240,
  reducedMotion = false,
}: {
  count?: number;
  reducedMotion?: boolean;
}) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const rand = mulberry32(20260101);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // shell between 1.9 and 5.2 radius
      const r = 1.9 + rand() * 3.3;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (reducedMotion || !points.current) return;
    points.current.rotation.y += delta * 0.018;
    points.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.05) * 0.08;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        sizeAttenuation
        color="#e8e4d8"
        transparent
        opacity={0.62}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
