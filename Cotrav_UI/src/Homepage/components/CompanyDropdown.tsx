import { useState, useMemo, useEffect, useRef } from "react";
import { useCompany, Company } from "@/common/hooks/useCompany";

type Props = {
  onSelect: (company: Company) => void;
};

const CompanyDropdown = ({ onSelect }: Props) => {
  const { companies, loading } = useCompany();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Company | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Create ref for the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter companies based on search term
  const filteredCompanies = useMemo(() => {
    if (!searchTerm.trim()) return companies;
    
    const term = searchTerm.toLowerCase();
    return companies.filter(company => 
      company.corporate_name.toLowerCase().includes(term) ||
      (company.short_name && company.short_name.toLowerCase().includes(term))
    );
  }, [companies, searchTerm]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
        setSearchTerm("");
      }
    };

    // Add event listener when dropdown is open
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input when dropdown opens
      if (searchInputRef.current) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Handle keyboard events (Escape to close)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleSelect = (company: Company) => {
    setSelected(company);
    onSelect(company);
    setOpen(false);
    setSearchTerm(""); // Clear search on selection
  };

  return (
    <div className="relative p-4 border-r" ref={dropdownRef}>
      <p className="text-[10px] font-medium text-gray-500">COMPANY</p>

      <div
        onClick={() => {
          setOpen(!open);
          setSearchTerm(""); // Clear search when toggling
        }}
        className="text-sm font-medium text-gray-900 outline-none cursor-pointer bg-transparentr"
      >
        {selected ? selected.corporate_name : <span className="text-sm text-gray-400">Select Company</span>}
      </div>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl z-50 max-h-80 overflow-hidden flex flex-col border border-gray-200">
          {/* Search Input */}
          <div className="p-3 border-b">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex-1 overflow-auto">
            {loading && (
              <p className="px-4 py-2 text-sm text-gray-400">Loading...</p>
            )}

            {!loading && filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  onClick={() => handleSelect(company)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <div className="font-medium">{company.corporate_name}</div>
                  {company.short_name && (
                    <div className="text-xs text-gray-500">{company.short_name}</div>
                  )}
                </div>
              ))
            ) : (
              !loading && (
                <p className="px-4 py-2 text-sm text-gray-400">
                  {searchTerm.trim() ? "No matching companies found" : "No companies available"}
                </p>
              )
            )}
          </div>
          
          {/* Optional: Show clear button when search is active */}
          {searchTerm.trim() && (
            <div className="p-2 border-t">
              <button
                onClick={() => setSearchTerm("")}
                className="w-full text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyDropdown;

