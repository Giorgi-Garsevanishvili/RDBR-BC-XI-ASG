"use client";
import { useState, useRef, useEffect } from "react";
import ArrowDownIcon from "../ui/ArrowDownIcon";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
  { value: "title_asc", label: "Title: A-Z" },
];

function SortDropdown({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="h-12.25 w-fit cursor-pointer flex stroke-grayscale-500 justify-center text-body-sm items-center gap-2 bg-grayscale-50 border border-grayscale-100 rounded-[10px] px-5 py-1.75"
      >
        <span className="text-body-sm text-grayscale-500 shrink-0">Sort By:</span>
        <span className="text-body-sm text-[#4F46E5] shrink-0">{selected.label}</span>
        <ArrowDownIcon />
      </button>

      {open && (
        <div className="absolute right-0 overflow-hidden w-58.5 h-fit bg-white rounded-[10px] shadow-lg border border-grayscale-100 z-50">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`w-full h-11.25 cursor-pointer text-left gap-2.5 px-5 py-2.5 text-body-sm transition-colors
                ${value === option.value
                  ? "bg-[#DDDBFA] text-[#4F46E5]"
                  : "text-grayscale-500 hover:bg-[#e7e6f8]"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortDropdown