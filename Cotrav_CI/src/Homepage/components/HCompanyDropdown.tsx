

// import { ui, icons } from "@/index";
// import { Company } from "@/common/hooks/useCompany";
// import { useState } from "react";

// interface CompanyDropdownProps {
//   company: Company | null;
//   setCompany: (company: Company | null) => void;
//   companies: Company[];
//   showDropdown: boolean;
//   setShowDropdown: (show: boolean) => void;
//   loading: boolean;
// }

// export const CompanyDropdown: React.FC<CompanyDropdownProps> = ({
//   company,
//   setCompany,
//   companies,
//   showDropdown,
//   setShowDropdown,
//   loading
// }) => {
//   const [searchValue, setSearchValue] = useState("");

//   const filteredCompanies = companies.filter((comp) =>
//     comp.corporate_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
//     comp.short_name?.toLowerCase().includes(searchValue.toLowerCase())
//   );

//   return (
//     <ui.Popover open={showDropdown} onOpenChange={setShowDropdown}>
//       <ui.PopoverTrigger asChild>
//         <button 
//           className="w-full h-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//           onClick={() => setShowDropdown(true)}
//         >
//           <div className="flex items-start gap-3">
//             <icons.Building2 className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//             <div className="flex-1 min-w-0">
//               <div className="text-xs text-gray-500 mb-1">Company</div>
//               <div className="font-medium text-gray-900 truncate">
//                 {company ? (
//                   <span>{company.short_name || company.corporate_name}</span>
//                 ) : (
//                   <span className="text-gray-400 font-normal">Select company</span>
//                 )}
//               </div>
//               {company?.corporate_name && company.short_name !== company.corporate_name && (
//                 <div className="text-xs text-gray-500 truncate mt-0.5">
//                   {company.corporate_name}
//                 </div>
//               )}
//             </div>
//           </div>
//         </button>
//       </ui.PopoverTrigger>
//       <ui.PopoverContent className="w-80 p-0 border-0 shadow-xl rounded-xl" align="start">
//         <ui.Command className="bg-white rounded-xl overflow-hidden">
//           <div className="px-3 pt-3 pb-2">
//             <div className="relative">
//               <icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <ui.CommandInput 
//                 placeholder="Search company..." 
//                 value={searchValue}
//                 onValueChange={setSearchValue}
//                 className="pl-9 mb-1 h-9 bg-transparent border-0 focus:ring-2 focus:ring-[#0B5CAD]/20"
//               />
//             </div>
//           </div>
//           <ui.CommandList className="custom-scrollbar max-h-80 p-2">
//             <ui.CommandEmpty>
//               {loading ? (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="flex flex-col items-center gap-2">
//                     <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-[#0B5CAD]"></div>
//                     <span className="text-sm text-gray-500">Loading companies...</span>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-8">
//                   <icons.Building2 className="w-10 h-10 text-gray-300 mb-2" />
//                   <p className="text-sm text-gray-900">No companies found</p>
//                   <p className="text-xs text-gray-500 mt-1">Try a different search</p>
//                 </div>
//               )}
//             </ui.CommandEmpty>
//             <ui.CommandGroup>
//               {!loading && filteredCompanies.map((comp) => {
//                 const isSelected = company?.id === comp.id;
//                 return (
//                   <ui.CommandItem
//                     key={comp.id}
//                     value={comp.corporate_name}
//                     onSelect={() => {
//                       setCompany(comp);
//                       setShowDropdown(false);
//                       setSearchValue("");
//                     }}
//                     className={`
//                       cursor-pointer px-3 py-2 rounded-lg mb-1
//                       transition-colors
//                       ${isSelected 
//                         ? 'bg-[#0B5CAD]/10 hover:bg-[#0B5CAD]/15' 
//                         : 'hover:bg-gray-50'
//                       }
//                     `}
//                   >
//                     <div className="flex items-start gap-3 flex-1">
//                       <icons.Building2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isSelected ? 'text-[#0B5CAD]' : 'text-gray-400'}`} />
//                       <div className="flex flex-col flex-1 min-w-0">
//                         <span className={`font-semibold truncate ${isSelected ? 'text-[#0B5CAD]' : 'text-gray-900'}`}>
//                           {comp.short_name || comp.corporate_name}
//                         </span>
//                         {comp.short_name && comp.short_name !== comp.corporate_name && (
//                           <span className="text-xs text-gray-500 truncate">
//                             {comp.corporate_name}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </ui.CommandItem>
//                 );
//               })}
//             </ui.CommandGroup>
//           </ui.CommandList>
//         </ui.Command>
//       </ui.PopoverContent>
//     </ui.Popover>
//   );
// };

// import { ui, icons } from "@/index";
// import { Company } from "@/common/hooks/useCompany";
// import { useState, useRef } from "react";

// interface CompanyDropdownProps {
//   company: Company | null;
//   setCompany: (company: Company | null) => void;
//   companies: Company[];
//   showDropdown: boolean;
//   setShowDropdown: (show: boolean) => void;
//   loading: boolean;
// }

// export const CompanyDropdown: React.FC<CompanyDropdownProps> = ({
//   company,
//   setCompany,
//   companies,
//   showDropdown,
//   setShowDropdown,
//   loading,
// }) => {
//   const [searchValue, setSearchValue] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);

//   const filteredCompanies = companies.filter(
//     (comp) =>
//       comp.corporate_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
//       comp.short_name?.toLowerCase().includes(searchValue.toLowerCase())
//   );

//   // ✅ Reset search + close in one place — no useEffect needed
//   const handleOpenChange = (open: boolean) => {
//     if (!open) setSearchValue("");
//     setShowDropdown(open);
//   };

//   const handleSelect = (comp: Company) => {
//     setCompany(comp);
//     setSearchValue("");
//     setShowDropdown(false);
//   };

//   return (
//     <ui.Popover open={showDropdown} onOpenChange={handleOpenChange}>
//       <ui.PopoverTrigger asChild>
//         <button
//           className="w-full h-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//           onClick={() => setShowDropdown(true)}
//         >
//           <div className="flex items-start gap-3">
//             <icons.Building2 className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//             <div className="flex-1 min-w-0">
//               <div className="text-xs text-gray-500 mb-1">Company</div>
//               <div className="font-medium text-gray-900 truncate">
//                 {company ? (
//                   <span>{company.short_name || company.corporate_name}</span>
//                 ) : (
//                   <span className="text-gray-400 font-normal">Select company</span>
//                 )}
//               </div>
//               {company?.corporate_name &&
//                 company.short_name !== company.corporate_name && (
//                   <div className="text-xs text-gray-500 truncate mt-0.5">
//                     {company.corporate_name}
//                   </div>
//                 )}
//             </div>
//           </div>
//         </button>
//       </ui.PopoverTrigger>

//       <ui.PopoverContent
//         className="w-80 p-0 border-0 shadow-xl rounded-xl overflow-hidden"
//         align="start"
//         // ✅ Auto-focus the input once the popover finishes animating in
//         onOpenAutoFocus={(e) => {
//           e.preventDefault();
//           inputRef.current?.focus();
//         }}
//       >
//         {/* Search */}
//         <div className="px-3 pt-3 pb-2 border-b border-gray-100">
//           <div className="relative">
//             <icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//             <input
//               ref={inputRef}
//               type="text"
//               placeholder="Search company..."
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//               className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none
//                 focus:ring-2 focus:ring-[#0B5CAD]/25 focus:border-[#0B5CAD]/50
//                 transition-all placeholder:text-gray-400"
//             />
//           </div>
//         </div>

//         {/* List */}
//         <div className="max-h-72 overflow-y-auto custom-scrollbar p-2">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-8 gap-2">
//               <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-[#0B5CAD]" />
//               <span className="text-sm text-gray-500">Loading companies...</span>
//             </div>
//           ) : filteredCompanies.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-8">
//               <icons.Building2 className="w-10 h-10 text-gray-300 mb-2" />
//               <p className="text-sm font-medium text-gray-900">No companies found</p>
//               <p className="text-xs text-gray-500 mt-1">Try a different search</p>
//             </div>
//           ) : (
//             filteredCompanies.map((comp) => {
//               const isSelected = company?.id === comp.id;
//               return (
//                 <button
//                   key={comp.id}
//                   onClick={() => handleSelect(comp)}
//                   className={`
//                     w-full flex items-start gap-3 px-3 py-2.5 rounded-lg mb-0.5
//                     text-left transition-colors duration-100
//                     ${isSelected
//                       ? "bg-[#0B5CAD]/10 text-[#0B5CAD]"
//                       : "hover:bg-gray-50 text-gray-900"
//                     }
//                   `}
//                 >
//                   <icons.Building2
//                     className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
//                       isSelected ? "text-[#0B5CAD]" : "text-gray-400"
//                     }`}
//                   />
//                   <div className="flex flex-col flex-1 min-w-0">
//                     <span className="font-medium text-sm truncate">
//                       {comp.short_name || comp.corporate_name}
//                     </span>
//                     {comp.short_name && comp.short_name !== comp.corporate_name && (
//                       <span className="text-xs text-gray-500 truncate">
//                         {comp.corporate_name}
//                       </span>
//                     )}
//                   </div>
//                   {isSelected && (
//                     <icons.Check className="w-4 h-4 text-[#0B5CAD] mt-0.5 flex-shrink-0" />
//                   )}
//                 </button>
//               );
//             })
//           )}
//         </div>
//       </ui.PopoverContent>
//     </ui.Popover>
//   );
// };


import { useState, useRef, useEffect } from "react";
import { icons } from "@/index";
import { Company } from "@/common/hooks/useCompany";

interface CompanyDropdownProps {
  company: Company | null;
  setCompany: (company: Company | null) => void;
  companies: Company[];
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  loading: boolean;
}

export const CompanyDropdown: React.FC<CompanyDropdownProps> = ({
  company,
  setCompany,
  companies,
  showDropdown,
  setShowDropdown,
  loading,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCompanies = companies.filter(
    (comp) =>
      comp.corporate_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      comp.short_name?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleOpen = () => {
    setShowDropdown(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleClose = () => {
    setShowDropdown(false);
    setSearchValue("");
  };

  const handleSelect = (comp: Company) => {
    setCompany(comp);
    handleClose();
  };

  // Close on outside click — no Radix focus trap overhead
  useEffect(() => {
    if (!showDropdown) return;
    const onOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", onOutsideClick, true);
    return () => document.removeEventListener("mousedown", onOutsideClick, true);
  }, [showDropdown]);

  return (
    <div ref={containerRef} className="relative w-full h-full">

      {/* ── Trigger ── */}
      <button
        className="w-full h-full px-4 py-3 text-left hover:bg-gray-50 transition-colors rounded-l-lg cursor-pointer"
        onClick={showDropdown ? handleClose : handleOpen}
      >
        <div className="flex items-start gap-3">
          <icons.Building2 className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-gray-500 mb-1">Company</div>
            <div className="text-sm font-medium text-gray-900 truncate">
              {company
                ? <span>{company.short_name || company.corporate_name}</span>
                : <span className="text-sm text-gray-400 font-normal">Select company</span>
              }
            </div>
            {company?.corporate_name && company.short_name !== company.corporate_name && (
              <div className="text-xs text-gray-500 truncate mt-0.5">
                {company.corporate_name}
              </div>
            )}
          </div>
          <icons.ChevronDown
            className={`w-4 h-4 text-gray-400 mt-1 flex-shrink-0 transition-transform duration-150 ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* ── Dropdown panel — plain div, zero Radix, opens instantly ── */}
      {showDropdown && (
        <div className="absolute top-full left-0 z-50 mt-1 w-80 bg-white rounded-xl
          shadow-xl shadow-black/10 border border-gray-100 overflow-hidden">

          {/* Search input */}
          <div className="px-3 pt-3 pb-2 border-b border-gray-100">
            <div className="relative">
              <icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search company..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200
                  rounded-lg outline-none focus:ring-2 focus:ring-[#0B5CAD]/25
                  focus:border-[#0B5CAD]/50 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* List */}
          <div className="max-h-72 overflow-y-auto custom-scrollbar p-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-[#0B5CAD]" />
                <span className="text-sm text-gray-500">Loading companies...</span>
              </div>
            ) : filteredCompanies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <icons.Building2 className="w-10 h-10 text-gray-300 mb-2" />
                <p className="text-sm font-medium text-gray-900">No companies found</p>
                <p className="text-xs text-gray-500 mt-1">Try a different search</p>
              </div>
            ) : (
              filteredCompanies.map((comp) => {
                const isSelected = company?.id === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => handleSelect(comp)}
                    className={`
                      w-full flex items-start gap-3 px-3 py-2.5 rounded-lg mb-0.5
                      text-left transition-colors duration-100
                      ${isSelected
                        ? "bg-[#0B5CAD]/10 text-[#0B5CAD]"
                        : "hover:bg-gray-50 text-gray-900"
                      }
                    `}
                  >
                    <icons.Building2
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        isSelected ? "text-[#0B5CAD]" : "text-gray-400"
                      }`}
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-medium text-sm truncate">
                        {comp.short_name || comp.corporate_name}
                      </span>
                      {comp.short_name && comp.short_name !== comp.corporate_name && (
                        <span className="text-xs text-gray-500 truncate">
                          {comp.corporate_name}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <icons.Check className="w-4 h-4 text-[#0B5CAD] mt-0.5 flex-shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

