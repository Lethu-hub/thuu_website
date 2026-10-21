"use client";

import { useMemo, useState } from "react";
import type { projects } from "@/lib/db/schema";
import type { MediaAsset } from "@/lib/db/data";
import type { SiteLabels } from "@/lib/types";
import { ProjectCard } from "./project-card";

type Item = { project: typeof projects.$inferSelect; asset?: MediaAsset };

export function ProjectFilter({ items, labels }: { items: Item[]; labels: SiteLabels["projects"] }) {
  const domains = [...new Set(items.flatMap(({ project }) => project.domainTags))].sort();
  const tools = [...new Set(items.flatMap(({ project }) => project.toolTags))].sort();
  const [domain, setDomain] = useState("");
  const [tool, setTool] = useState("");
  const filtered = useMemo(() => items.filter(({ project }) => (!domain || project.domainTags.includes(domain)) && (!tool || project.toolTags.includes(tool))), [items, domain, tool]);
  const selectClass = "select max-w-full bg-white text-sm sm:w-auto";
  return <>
    <section aria-label={labels.filters} className="mb-10 grid gap-3 border-y border-[#d9ddd5] py-4 sm:flex sm:items-center">
      <p className="mr-2 text-[.68rem] font-bold tracking-[.12em] text-moss uppercase">{labels.filters}</p>
      <select aria-label={labels.domains} className={selectClass} value={domain} onChange={(event) => setDomain(event.target.value)}><option value="">{labels.all} · {labels.domains}</option>{domains.map((tag) => <option key={tag}>{tag}</option>)}</select>
      <select aria-label={labels.tools} className={selectClass} value={tool} onChange={(event) => setTool(event.target.value)}><option value="">{labels.all} · {labels.tools}</option>{tools.map((tag) => <option key={tag}>{tag}</option>)}</select>
      {(domain || tool) && <button className="text-left text-sm font-bold text-moss underline underline-offset-4 sm:ml-auto" onClick={() => { setDomain(""); setTool(""); }}>{labels.all}</button>}
    </section>
    {filtered.length ? <div className="grid gap-5 md:grid-cols-2">{filtered.map((item) => <ProjectCard key={item.project.id} {...item} actionLabel={labels.viewProject} cardLabel={labels.cardLabel} selectedLabel={labels.selected} />)}</div> : <p className="border border-dashed border-[#cbd5cb] px-6 py-12 text-center text-muted">{labels.noResults}</p>}
  </>;
}
