import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Expertise } from "@/components/sections/expertise";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Resume } from "@/components/sections/resume";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <Experience />
      <Resume />
      <Contact />
    </>
  );
}
