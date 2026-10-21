export type ProjectStatus = "draft" | "published";

export type SocialLink = { id: string; label: string; url: string };
export type ExternalLink = { id: string; label: string; url: string };

export type CaseStudyBlock =
  | { id: string; type: "markdown"; markdown: string }
  | { id: string; type: "image"; mediaId: string; caption?: string }
  | { id: string; type: "gallery"; mediaIds: string[]; caption?: string }
  | { id: string; type: "video"; url: string; caption?: string }
  | { id: string; type: "embed"; url: string; title?: string };

export type ExperienceItem = { id: string; role: string; organisation: string; dates: string; summary: string };
export type EducationItem = { id: string; credential: string; institution: string; dates: string; detail?: string };
export type SkillGroup = { id: string; category: string; items: string[] };
export type CertificationItem = { id: string; title: string; issuer: string; date: string; url?: string };

export type SectionVisibility = { about: boolean; skills: boolean; timeline: boolean; projects: boolean; notes: boolean; contact: boolean };

export type SiteLabels = {
  nav: { home: string; projects: string; notes: string; cv: string };
  hero: { workCta: string; cvCta: string; availability: string };
  home: { about: string; skills: string; timeline: string; featuredProjects: string; latestNotes: string; contact: string; viewAllProjects: string; viewAllNotes: string; emptyProjects: string; emptyNotes: string; featuredHeading: string; notesHeading: string };
  projects: { eyebrow: string; heading: string; intro: string; filters: string; all: string; noResults: string; viewProject: string; domains: string; tools: string; cardLabel: string; selected: string };
  project: { back: string; links: string; domain: string; tools: string; date: string };
  notes: { eyebrow: string; heading: string; intro: string; read: string; noResults: string; video: string };
  cv: { eyebrow: string; heading: string; download: string; experience: string; education: string; skills: string; certifications: string };
  contact: { eyebrow: string; heading: string; intro: string; email: string };
  notFound: { eyebrow: string; heading: string; action: string };
  footer: { note: string; admin: string };
};

export type AppSettings = {
  id: string; name: string; tagline: string; heroHeading: string; heroIntro: string; aboutMarkdown: string; contactEmail: string;
  socialLinks: SocialLink[]; sectionVisibility: SectionVisibility; labels: SiteLabels; updatedAt: Date;
};

export const DEFAULT_VISIBILITY: SectionVisibility = { about: true, skills: true, timeline: true, projects: true, notes: true, contact: true };
export const DEFAULT_LABELS: SiteLabels = {
  nav: { home: "Home", projects: "Projects", notes: "Notes", cv: "CV" },
  hero: { workCta: "Explore selected work", cvCta: "Download CV", availability: "Open to thoughtful data work" },
  home: { about: "Profile", skills: "Core capabilities", timeline: "Career timeline", featuredProjects: "Selected work", latestNotes: "From the notes", contact: "Let’s connect", viewAllProjects: "View all projects", viewAllNotes: "Read all notes", emptyProjects: "Selected work will appear here soon.", emptyNotes: "New notes are in progress.", featuredHeading: "Work with a decision at the centre.", notesHeading: "A notebook for the work." },
  projects: { eyebrow: "Portfolio", heading: "Projects shaped by questions, not just dashboards.", intro: "A growing collection of analysis, systems thinking, and decision-ready reporting.", filters: "Filter work", all: "All work", noResults: "No projects match those filters yet.", viewProject: "Read case study", domains: "Domains", tools: "Tools", cardLabel: "Case study", selected: "Selected" },
  project: { back: "All projects", links: "Project links", domain: "Domain", tools: "Tools", date: "Published" },
  notes: { eyebrow: "Journal", heading: "Notes from the practice.", intro: "Monthly recaps, research trails, and small observations from working with data.", read: "Read note", noResults: "No published notes yet.", video: "Watch / view source" },
  cv: { eyebrow: "Curriculum vitae", heading: "Experience built around useful clarity.", download: "Download PDF", experience: "Experience", education: "Education", skills: "Skills", certifications: "Certifications" },
  contact: { eyebrow: "Contact", heading: "Have a data question worth exploring?", intro: "I’m always interested in purposeful collaborations and conversations.", email: "Send an email" },
  notFound: { eyebrow: "404", heading: "This page has moved on.", action: "Return home" },
  footer: { note: "A living record of analytical work.", admin: "Admin" },
};

export function newId(prefix = "item") { return `${prefix}_${crypto.randomUUID()}`; }
