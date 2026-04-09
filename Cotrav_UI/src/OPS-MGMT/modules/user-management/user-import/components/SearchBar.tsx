"use client";

import { useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchBar = ({ value, onChange, placeholder = "Search users…" }: Props) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={`
        relative flex items-center h-9 w-60
        rounded-xl border bg-white
        shadow-sm transition-all duration-200
        ${
          focused
            ? "border-[#0B0E2D] shadow-[0_0_0_3px_rgba(11,14,45,0.08)]"
            : "border-slate-200 hover:border-slate-300"
        }
      `}
    >
      {/* Search icon */}
      <span
        className={`
          absolute left-2.5 flex items-center pointer-events-none
          transition-colors duration-200
          ${focused ? "text-[#0B0E2D]" : "text-slate-400"}
        `}
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
        >
          <circle cx="11" cy="11" r="6" />
          <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
        </svg>
      </span>

      {/* Input */}
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="
          w-full h-full bg-transparent
          pl-8 pr-7
          text-xs text-slate-700 placeholder:text-slate-400
          rounded-xl outline-none
          [&::-webkit-search-cancel-button]:hidden
        "
      />

      {/* Clear button — only when there's text */}
      {value && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()} // keep focus on input
          onClick={handleClear}
          className="
            absolute right-2 flex items-center justify-center
            h-4 w-4 rounded-full
            bg-slate-200 hover:bg-slate-300
            text-slate-500 hover:text-slate-700
            transition-colors duration-150
          "
          aria-label="Clear search"
        >
          <svg className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M2 2l8 8M10 2l-8 8" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;