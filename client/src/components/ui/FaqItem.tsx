import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqItem({
  q,
  a,
  index,
  defaultOpen = false,
}: {
  q: string;
  a: string;
  index?: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const numbered = index !== undefined;
  return (
    <div
      className={`border-b border-slate-200 last:border-0 transition-colors duration-200 ${open && numbered ? "bg-slate-50/60" : ""}`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-start justify-between text-left group ${numbered ? "px-4 py-5" : "py-4 focus-visible:outline-2 focus-visible:outline-offset-2"}`}
      >
        <span
          className={`flex items-start flex-1 min-w-0 ${numbered ? "gap-3 pr-4" : "pr-2"}`}
        >
          {numbered && (
            <span className="flex-shrink-0 text-[14px] font-black text-muted-foreground tracking-widest mt-0.5 w-5 text-right">
              {String(index).padStart(2, "0")}
            </span>
          )}
          <span
            className={`${numbered ? "text-[18px] font-bold" : "text-[16px] font-semibold"} leading-snug transition-colors duration-150 ${!numbered ? "text-navy group-hover:text-action-hover" : open ? "text-[#003366]" : "text-slate-800 group-hover:text-[#003366]"}`}
          >
            {q}
          </span>
        </span>
        <ChevronDown
          className={`flex-shrink-0 w-4 h-4 mt-1 transition-transform duration-300 ${open ? "rotate-180 text-[#003366]" : "text-muted-foreground group-hover:text-[#003366]"}`}
        />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className={numbered ? "pl-12 pr-4 pb-5" : "pt-1 pr-5 pb-5"}
      >
        <p className={numbered ? "text-sm text-muted-foreground leading-relaxed border-l-2 border-[#003366]/20 pl-4" : "max-w-[60ch] text-[16px] leading-relaxed text-slate-600"}>
          {a}
        </p>
      </div>
    </div>
  );
}
