"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { expertiseCategories } from "@/data/expertise";
import { ParticleField } from "@/three/objects/particle-field";

const STEEL = new THREE.Color("#171b23");
const ACCENT = new THREE.Color("#f5c518");
const RADIUS = 2.05;

/** Arrange five nodes in a slightly tilted ring facing the camera. */
const nodePositions: [number, number, number][] = expertiseCategories.map((_, i) => {
  const angle = (i / expertiseCategories.length) * Math.PI * 2 + Math.PI / 2;
  return [Math.cos(angle) * RADIUS, Math.sin(angle) * RADIUS * 0.82, 0];
});

function NodeGeometry({ id }: { id: string }) {
  switch (id) {
    case "frontend":
      return <icosahedronGeometry args={[0.34, 0]} />;
    case "backend":
      return <boxGeometry args={[0.46, 0.46, 0.46]} />;
    case "databases":
      return <cylinderGeometry args={[0.26, 0.26, 0.46, 8]} />;
    case "infrastructure":
      return <torusGeometry args={[0.28, 0.11, 8, 20]} />;
    default:
      return <coneGeometry args={[0.3, 0.5, 6]} />;
  }
}

function SatelliteNode({
  id,
  position,
  selected,
  onSelect,
}: {
  id: string;
  position: [number, number, number];
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const mesh = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion() ?? false;

  useFrame((state, delta) => {
    if (!mesh.current || reduced) return;
    const target = selected ? 1.45 : hovered ? 1.18 : 1;
    const current = mesh.current.scale.x;
    const next = THREE.MathUtils.damp(current, target, 8, delta);
    mesh.current.scale.setScalar(next);
    mesh.current.rotation.y += delta * (selected ? 1.1 : 0.35);
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.16;
  });

  const handle = (e: ThreeEvent<MouseEvent | PointerEvent>) => {
    e.stopPropagation();
    onSelect(id);
  };

  return (
    <group position={position}>
      <group
        ref={mesh}
        onClick={handle}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
      >
        <mesh>
          <NodeGeometry id={id} />
          <meshStandardMaterial
            color={selected ? "#241d05" : STEEL}
            emissive={selected || hovered ? ACCENT : "#0b0d11"}
            emissiveIntensity={selected ? 1.5 : hovered ? 0.9 : 0.4}
            flatShading
            metalness={0.75}
            roughness={0.3}
          />
        </mesh>
        {/* invisible larger hit target for touch */}
        <mesh visible={false} onClick={handle}>
          <sphereGeometry args={[0.55, 8, 8]} />
          <meshBasicMaterial />
        </mesh>
      </group>
    </group>
  );
}

function Universe({
  selected,
  onSelect,
  simplified,
  reduced,
}: {
  selected: string;
  onSelect: (id: string) => void;
  simplified: boolean;
  reduced: boolean;
}) {
  const root = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!root.current || reduced) return;
    root.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.32;
  });

  const linePoints = useMemo(
    () => nodePositions.map((p) => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...p)]),
    []
  );

  return (
    <group ref={root}>
      {/* Central engineering core */}
      <mesh>
        <icosahedronGeometry args={[0.52, 1]} />
        <meshStandardMaterial
          color="#141821"
          emissive={ACCENT}
          emissiveIntensity={1.15}
          metalness={0.85}
          roughness={0.25}
          flatShading
        />
      </mesh>
      <mesh scale={1.6}>
        <icosahedronGeometry args={[0.52, 0]} />
        <meshBasicMaterial color="#ece9e2" wireframe transparent opacity={0.12} />
      </mesh>

      {linePoints.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={expertiseCategories[i].id === selected ? "#f5c518" : "#3a4150"}
          lineWidth={expertiseCategories[i].id === selected ? 1.6 : 1}
          transparent
          opacity={expertiseCategories[i].id === selected ? 0.95 : 0.65}
        />
      ))}

      {expertiseCategories.map((cat, i) => (
        <SatelliteNode
          key={cat.id}
          id={cat.id}
          position={nodePositions[i]}
          selected={cat.id === selected}
          onSelect={onSelect}
        />
      ))}

      {!simplified && <ParticleField count={70} reducedMotion={reduced} />}
    </group>
  );
}

export default function ExpertiseScene({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const reduced = useReducedMotion() ?? false;
  const simplified = useMediaQuery("(max-width: 768px)");

  return (
    <Canvas
      dpr={simplified ? [1, 1.5] : [1, 2]}
      gl={{ antialias: !simplified, alpha: true, powerPreference: "high-performance", stencil: false }}
      camera={{ position: [0, 0.1, 5.6], fov: 44 }}
      frameloop={reduced ? "demand" : "always"}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.35} color="#2c3342" />
      <directionalLight position={[4, 3.5, 5]} intensity={1.25} color="#fff2d9" />
      <directionalLight position={[-4.5, 1.5, -3]} intensity={0.7} color="#8fb0ff" />
      <pointLight position={[0, 0, 0]} intensity={9} distance={6.5} color="#f5c518" />
      <Universe selected={selected} onSelect={onSelect} simplified={simplified} reduced={reduced} />
    </Canvas>
  );
}
