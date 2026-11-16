"use client";

/** Three-point cinematic stage lighting for the hero volume. */
export function StageLights() {
  return (
    <>
      {/* Key — warm, frontal-left */}
      {/* Key — warm, hard side-light for facet contrast */}
      <directionalLight position={[5.6, 1.6, 2.2]} intensity={2.1} color="#ffeecf" />
      {/* Rim — cool, rear-right for silhouette separation */}
      <directionalLight position={[-5, 2.4, -3.2]} intensity={1.35} color="#8fb0ff" />
      {/* Fill — soft bone from above */}
      <directionalLight position={[0, 6, 0.5]} intensity={0.32} color="#e8e4d8" />
      {/* Amber heart glow — seated outside the core's surface plane */}
      <pointLight position={[0.35, 0.6, 1.6]} intensity={1.4} distance={4.5} color="#f5c518" />
      <ambientLight intensity={0.16} color="#28303f" />
    </>
  );
}
