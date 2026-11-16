"use client";

/** Three-point cinematic stage lighting for the hero volume. */
export function StageLights() {
  return (
    <>
      {/* Key — warm, frontal-left */}
      <directionalLight position={[4.5, 3.2, 4.5]} intensity={1.15} color="#fff2d9" />
      {/* Rim — cool, rear-right for silhouette separation */}
      <directionalLight position={[-5, 2.2, -3.5]} intensity={0.85} color="#8fb0ff" />
      {/* Fill — soft bone from above */}
      <directionalLight position={[0, 6, 0.5]} intensity={0.32} color="#e8e4d8" />
      {/* Amber heart glow */}
      <pointLight position={[0.35, 0, 0]} intensity={14} distance={7.5} color="#f5c518" />
      <ambientLight intensity={0.16} color="#28303f" />
    </>
  );
}
