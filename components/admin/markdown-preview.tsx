"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownPreview({ children }: { children: string }) {
  return <div className="prose max-w-none rounded-lg border border-[#e0e5df] bg-[#fafbf9] p-4 text-sm"><ReactMarkdown remarkPlugins={[remarkGfm]}>{children || "Preview will appear here as you write."}</ReactMarkdown></div>;
}
