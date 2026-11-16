import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MARK II — Daniel Adepitan",
    short_name: "MARK II",
    description:
      "Interactive 3D portfolio of Daniel Adepitan, software developer in Lagos, Nigeria.",
    start_url: "/",
    display: "standalone",
    background_color: "#06070a",
    theme_color: "#06070a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
