/**
 * Global site configuration.
 * NOTE: Social/project URLs that are not yet verified live in `links-pending`
 * placeholders and are rendered as disabled until filled in — never faked.
 */

export const site = {
  name: "MARK II",
  owner: "Daniel Adepitan",
  handle: "DANNY / MARK II",
  role: "Software Developer",
  location: "Lagos, Nigeria",
  tagline: "I build digital experiences beyond the ordinary.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://simidaniels.vercel.app",
  email: "simidaniels0506@gmail.com",
  phone: "+234 913 999 8795",
  availability: "Available for select opportunities",
} as const;

export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Simidaniels",
    handle: "@Simidaniels",
  },
  {
    label: "LinkedIn",
    // TODO(owner): replace with the verified LinkedIn profile URL.
    href: null as string | null,
    handle: "pending",
  },
  {
    label: "Email",
    href: "mailto:simidaniels0506@gmail.com",
    handle: "simidaniels0506@gmail.com",
  },
] as const;

export const navSections = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Expertise", href: "/#expertise", id: "expertise" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;
