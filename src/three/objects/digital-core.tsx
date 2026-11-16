"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = new THREE.Color("#f5c518");
const STEEL = new THREE.Color("#151a23");

/**
 * The MARK II Digital Core — a faceted graphite heart wrapped in a
 * blueprint wireframe shell, orbited by two instrumented rings carrying
 * satellite nodes. Pointer-reactive with heavily damped motion.
 */
export function DigitalCore({
  reducedMotion = false,
  simplified = false,
}: {
  reducedMotion?: boolean;
  simplified?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Group>(null);
  const ringB = useRef<THREE.Group>(null);
  const coreMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const pointer = useThree((s) => s.pointer);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;

    // Damped pointer parallax — the core leans toward the cursor.
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        pointer.x * 0.42 + t * 0.06,
        2.4,
        delta
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -pointer.y * 0.28,
        2.4,
        delta
      );
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.1;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.075;

    if (coreMaterial.current) {
      coreMaterial.current.emissiveIntensity =
        0.1 + Math.sin(t * 1.15) * 0.05;
    }
  });

  const core = (
    <group ref={group} position={[0.35, 0, 0]}>
      {/* Faceted graphite heart */}
      <mesh castShadow={false}>
        <icosahedronGeometry args={[1.02, 0]} />
        <meshStandardMaterial
          ref={coreMaterial}
          color={STEEL}
          metalness={0.08}
          roughness={0.62}
          emissive={ACCENT}
          emissiveIntensity={0.1}
          flatShading
        />
      </mesh>

      {/* Blueprint wireframe shell */}
      <mesh scale={1.32}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#ece9e2"
          wireframe
          transparent
          opacity={simplified ? 0.08 : 0.13}
        />
      </mesh>

      {/* Amber kernel */}
      <mesh scale={0.42}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#2a2108"
          emissive={ACCENT}
          emissiveIntensity={1.8}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Ring A — equatorial, amber */}
      <group ref={ringA} rotation={[Math.PI / 2.35, 0.35, 0]}>
        <mesh>
          <torusGeometry args={[1.78, simplified ? 0.012 : 0.016, 8, simplified ? 48 : 96]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={1.15}
            metalness={0.15}
            roughness={0.4}
          />
        </mesh>
        {/* Satellite nodes ride the ring */}
        {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((a, i) => (
          <mesh
            key={i}
            position={[Math.cos(a) * 1.78, Math.sin(a) * 1.78, 0]}
          >
            <octahedronGeometry args={[0.085, 0]} />
            <meshStandardMaterial
              color="#101318"
              emissive={ACCENT}
              emissiveIntensity={0.9}
              metalness={0.25}
              roughness={0.4}
              flatShading
            />
          </mesh>
        ))}
      </group>

      {/* Ring B — polar, bone */}
      <group ref={ringB} rotation={[Math.PI / 1.7, -0.55, 0.4]}>
        <mesh>
          <torusGeometry args={[2.32, simplified ? 0.008 : 0.011, 8, simplified ? 40 : 80]} />
          <meshStandardMaterial
            color="#e8e4d8"
            emissive="#e8e4d8"
            emissiveIntensity={0.4}
            metalness={0.15}
            roughness={0.45}
            transparent
            opacity={0.85}
          />
        </mesh>
        {[0.6, 0.6 + Math.PI].map((a, i) => (
          <mesh
            key={i}
            position={[Math.cos(a) * 2.32, Math.sin(a) * 2.32, 0]}
          >
            <sphereGeometry args={[0.062, 16, 16]} />
            <meshStandardMaterial
              color="#0d0f14"
              emissive="#9fb6ff"
              emissiveIntensity={1.1}
              roughness={0.35}
              metalness={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );

  if (reducedMotion) return core;
  return (
    <Float speed={1.35} rotationIntensity={0.18} floatIntensity={0.55} floatingRange={[-0.12, 0.12]}>
      {core}
    </Float>
  );
}
