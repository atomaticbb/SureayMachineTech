import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border-b border-slate-200 last:border-0 transition-colors duration-200 ${open ? "bg-slate-50/60" : ""}`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between py-5 text-left px-4 group"
      >
        <div className="flex items-start gap-3 pr-4 flex-1 min-w-0">
          <span className="flex-shrink-0 text-[11px] font-black text-slate-300 tracking-widest mt-0.5 w-5 text-right">
            {String(index).padStart(2, "0")}
          </span>
          <span
            className={`text-[15px] font-bold leading-snug transition-colors duration-150 ${open ? "text-[#003366]" : "text-slate-800 group-hover:text-[#003366]"}`}
          >
            {q}
          </span>
        </div>
        <ChevronDown
          className={`flex-shrink-0 w-4 h-4 mt-1 transition-transform duration-300 ${open ? "rotate-180 text-[#003366]" : "text-slate-400 group-hover:text-[#003366]"}`}
        />
      </button>
      {open && (
        <div className="pl-12 pr-4 pb-5">
          <p className="text-sm text-slate-500 leading-relaxed border-l-2 border-[#003366]/20 pl-4">
            {a}
          </p>
        </div>
      )}
    </div>
  );
}
