import { useState, useRef, useEffect } from "react";

export interface FlightAirport {
  id: string;
  city: string;
  code: string;
  airport_name: string;
  country?: string;
}

interface AirportSelectorProps {
  label: string;
  airport: FlightAirport | null;
  setAirport: (airport: FlightAirport | null) => void;
  airports: FlightAirport[];
  loading: boolean;
  placeholder?: string;
}

const AirportSelector: React.FC<AirportSelectorProps> = ({
  label,
  airport,
  setAirport,
  airports,
  loading,
  placeholder = "Enter City",
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = search.trim()
    ? airports.filter(
        (a) =>
          a.city?.toLowerCase().includes(search.toLowerCase()) ||
          a.code?.toLowerCase().includes(search.toLowerCase()) ||
          a.airport_name?.toLowerCase().includes(search.toLowerCase())
      )
    : airports.slice(0, 6);

  const handleSelect = (a: FlightAirport) => {
    setAirport(a);
    setSearch("");
    setOpen(false);
  };

  const handleFocus = () => {
    setSearch("");
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", onOutside, true);
    return () => document.removeEventListener("mousedown", onOutside, true);
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-full h-full px-4 py-3">
      <p className="text-[10px] font-semibold text-gray-500 tracking-wide mb-1">{label}</p>

      <input
        ref={inputRef}
        type="text"
        value={open ? search : (airport ? airport.city : "")}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={handleFocus}
        placeholder={placeholder}
        className="w-full text-sm font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none bg-transparent"
      />

      {airport && !open && (
        <p className="text-xs text-gray-400 truncate mt-0.5">
          {airport.airport_name}
        </p>
      )}

      {open && (
        <div className="absolute left-0 top-full z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-200 border-t-[#0B5CAD]" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-6 text-center text-sm text-gray-500">No airports found</div>
          ) : (
            <>
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">
                  Popular Cities
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filtered.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => handleSelect(a)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 text-left"
                  >
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-bold text-gray-900 truncate">{a.city}</span>
                      <span className="text-xs text-[#0B5CAD] truncate mt-0.5">{a.airport_name}</span>
                    </div>
                    <span className="ml-3 text-sm font-bold text-gray-700 flex-shrink-0">{a.code}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AirportSelector;
