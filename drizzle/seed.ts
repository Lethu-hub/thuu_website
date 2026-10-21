import { config } from "dotenv";
config({ path: ".env.local" });
import { db } from "../lib/db";
import { cvProfiles, projects, siteSettings } from "../lib/db/schema";
import { DEFAULT_LABELS, DEFAULT_VISIBILITY } from "../lib/types";

const projectId = "project_healthcare_warehousing";

async function seed() {
  const database = db();

  await database
    .insert(siteSettings)
    .values({
      id: "site",
      name: "[Full name]",
      tagline: "[Data Analyst & BI — SQL, Power BI, Tableau, Python]",
      heroHeading: "[I turn complex data into decisions people can use.]",
      heroIntro: "[Use this space to introduce your analytical focus, the problems you care about, and the value you bring to teams.]",
      aboutMarkdown: "## [Your analytical point of view]\n\n[Write your career narrative here. This supports Markdown, so you can use headings, links, lists, and emphasis.]\n\n- [Role, company, date]\n- [Education or certification]\n- [A strength or outcome you are known for]",
      contactEmail: "[email]",
      socialLinks: [
        { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/your-profile" },
        { id: "github", label: "GitHub", url: "https://github.com/your-profile" },
        { id: "youtube", label: "YouTube", url: "https://youtube.com/@your-channel" },
        { id: "tiktok", label: "TikTok", url: "https://tiktok.com/@your-profile" }
      ],
      sectionVisibility: DEFAULT_VISIBILITY,
      labels: DEFAULT_LABELS,
    })
    .onConflictDoNothing();

  await database
    .insert(cvProfiles)
    .values({
      id: "cv",
      summary: "[A concise professional summary. Update this in Admin → CV.]",
      experience: [
        { id: "experience_1", role: "[Role]", organisation: "[Company]", dates: "[Month YYYY — Present]", summary: "[Add measurable scope, outcomes, and responsibilities.]" }
      ],
      education: [
        { id: "education_1", credential: "[Qualification]", institution: "[Institution]", dates: "[Year — Year]", detail: "[Optional distinction or focus]" }
      ],
      skills: [
        { id: "skills_1", category: "Analytics", items: ["[SQL]", "[Power BI]", "[Tableau]", "[Python]"] }
      ],
      certifications: [
        { id: "certification_1", title: "[Certification]", issuer: "[Issuer]", date: "[Year]", url: "" }
      ],
      pdfMediaId: null,
    })
    .onConflictDoNothing();

  await database
    .insert(projects)
    .values({
      id: projectId,
      title: "Healthcare Warehousing Analytics",
      slug: "healthcare-warehousing-analytics",
      summary: "A case-study framework for making inventory, fulfilment, and service-level decisions visible.",
      domainTags: ["Healthcare", "Operations"],
      toolTags: ["SQL", "Power BI", "Python"],
      status: "draft",
      featured: "false",
      projectDate: "2026-10-18",
      heroMediaId: null,
      links: [],
      blocks: [
        { id: "block_problem", type: "markdown", markdown: "## The problem\n\nDescribe the operational question, who needed an answer, and why it mattered." },
        { id: "block_data", type: "markdown", markdown: "## The data\n\nOutline the source systems, grain, quality checks, and any sensitive-data considerations." },
        { id: "block_approach", type: "markdown", markdown: "## The approach\n\nExplain the logic, metrics, modelling choices, and dashboard design decisions." },
        { id: "block_insights", type: "markdown", markdown: "## Insights\n\nShare the patterns that changed the conversation. Add screenshots, charts, or a walkthrough video below." },
        { id: "block_impact", type: "markdown", markdown: "## Business impact\n\nConnect the work to decisions, outcomes, adoption, or the next best action." }
      ],
      sortOrder: 0,
    })
    .onConflictDoNothing();

  console.log("Seeded editable site settings, CV profile, and draft healthcare project.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
