"use client";

import { useRef, useState } from "react";
import { FileUp, Image as ImageIcon, LoaderCircle, Paperclip, X } from "lucide-react";

type MediaAsset = { id: string; url: string; filename: string; mimeType: string; altText: string; size: number };

export function MediaPicker({ initialAssets, value, onChange, multiple = false, accept = "image/*", label = "Choose media" }: { initialAssets: MediaAsset[]; value: string[]; onChange: (ids: string[]) => void; multiple?: boolean; accept?: string; label?: string }) {
  const [assets, setAssets] = useState(initialAssets);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const uploads = async (files: FileList | File[]) => {
    if (!files.length) return;
    setUploading(true); setError("");
    try {
      const created: MediaAsset[] = [];
      for (const file of Array.from(files)) {
        const form = new FormData(); form.append("file", file); form.append("altText", file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
        const response = await fetch("/api/admin/media", { method: "POST", body: form });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "The upload did not finish.");
        created.push(payload);
      }
      setAssets((current) => [...created, ...current]);
      onChange(multiple ? [...value, ...created.map((asset) => asset.id)] : [created[created.length - 1].id]);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "The upload did not finish."); }
    finally { setUploading(false); }
  };
  const toggle = (id: string) => {
    if (multiple) onChange(value.includes(id) ? value.filter((current) => current !== id) : [...value, id]);
    else onChange(value[0] === id ? [] : [id]);
  };
  const fileAssets = assets.filter((asset) => accept.includes("pdf") ? asset.mimeType === "application/pdf" : asset.mimeType.startsWith("image/"));
  return <div className="space-y-3"><input ref={input} type="file" className="hidden" accept={accept} multiple={multiple} onChange={(event) => event.target.files && uploads(event.target.files)} /><div onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); uploads(event.dataTransfer.files); }} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-[#b9c8b9] bg-[#f6faf5] p-3"><div className="flex items-center gap-2 text-xs font-semibold text-[#58705e]">{accept.includes("pdf") ? <Paperclip size={16} /> : <ImageIcon size={16} />}<span>{label}</span></div><button type="button" onClick={() => input.current?.click()} className="admin-button-secondary">{uploading ? <LoaderCircle size={14} className="animate-spin" /> : <FileUp size={14} />}{uploading ? "Uploading" : "Upload"}</button></div>{error && <p className="text-xs font-semibold text-[#a33e39]">{error}</p>}{value.length > 0 && <div className="flex flex-wrap gap-2">{value.map((id) => { const asset = assets.find((item) => item.id === id); if (!asset) return null; return <div className="relative h-16 w-20 overflow-hidden rounded border border-[#cfd8ce] bg-white" key={id}>{asset.mimeType.startsWith("image/") ? <img src={asset.url} alt={asset.altText} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center px-1 text-center text-[9px] font-bold text-moss">PDF</div>}<button type="button" aria-label="Remove selected file" onClick={() => onChange(value.filter((current) => current !== id))} className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-[#142018] text-white"><X size={12} /></button></div>; })}</div>}<div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-5">{fileAssets.map((asset) => { const selected = value.includes(asset.id); return <button type="button" onClick={() => toggle(asset.id)} className={`relative aspect-square overflow-hidden rounded border-2 text-left transition ${selected ? "border-moss ring-2 ring-lime" : "border-transparent hover:border-[#9dad9e]"}`} key={asset.id}>{asset.mimeType.startsWith("image/") ? <img src={asset.url} alt={asset.altText || asset.filename} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center bg-[#eef4ec] p-2 text-center text-[10px] font-bold text-moss">{asset.filename}</div>}{selected && <span className="absolute inset-x-0 bottom-0 bg-moss/90 px-1 py-1 text-center text-[9px] font-bold text-white">Selected</span>}</button>; })}</div>{!fileAssets.length && <p className="text-xs text-[#718076]">Upload a file above to start your reusable library.</p>}</div>;
}
