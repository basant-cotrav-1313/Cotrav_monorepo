
// import { ui, icons } from "@/index";
// import { City } from "@/common/hooks/useCities";
// import { useState } from "react";

// interface CitySelectorProps {
//   city: City | null;
//   setCity: (city: City | null) => void;
//   cities: City[];
//   showDropdown: boolean;
//   setShowDropdown: (show: boolean) => void;
//   loading: boolean;
// }

// export const CitySelector: React.FC<CitySelectorProps> = ({
//   city,
//   setCity,
//   cities,
//   showDropdown,
//   setShowDropdown,
//   loading,
// }) => {
//   const [searchValue, setSearchValue] = useState("");

//   const filteredCities = cities.filter((cityItem) =>
//     cityItem.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
//     cityItem.code?.toLowerCase().includes(searchValue.toLowerCase()) ||
//     cityItem.state?.toLowerCase().includes(searchValue.toLowerCase())
//   );

//   return (
//     <ui.Popover open={showDropdown} onOpenChange={setShowDropdown}>
//       <ui.PopoverTrigger asChild>
//         <button 
//           className="w-full h-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//           onClick={() => setShowDropdown(true)}
//         >
//           <div className="flex items-start gap-3">
//             <icons.MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//             <div className="flex-1 min-w-0">
//               <div className="text-xs text-gray-500 mb-1">City</div>
//               <div className="font-medium text-gray-900 truncate">
//                 {city ? (
//                   <span>{city.name}</span>
//                 ) : (
//                   <span className="text-gray-400 font-normal">Select city</span>
//                 )}
//               </div>
//               {city?.state && (
//                 <div className="text-xs text-gray-500 truncate mt-0.5">
//                   {city.state}
//                   {city.code && ` (${city.code})`}
//                 </div>
//               )}
//             </div>
//           </div>
//         </button>
//       </ui.PopoverTrigger>
//       <ui.PopoverContent className="w-80 p-0 border-0 shadow-xl" align="start">
//         <ui.Command className="bg-white">
//           <ui.CommandInput 
//             placeholder="Search city..." 
//             value={searchValue}
//             onValueChange={setSearchValue}
//           />
//           <ui.CommandList className="custom-scrollbar max-h-80">
//             <ui.CommandEmpty>
//               {loading ? (
//                 <div className="flex items-center justify-center py-6">
//                   <div className="flex flex-col items-center gap-2">
//                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0B5CAD]"></div>
//                     <span className="text-sm text-gray-500">Loading cities...</span>
//                   </div>
//                 </div>
//               ) : (
//                 "No city found."
//               )}
//             </ui.CommandEmpty>
//             <ui.CommandGroup>
//               {!loading && filteredCities.map((cityItem) => {
//                 const isSelected = city?.id === cityItem.id;
//                 return (
               

//                 <ui.CommandItem
//   key={cityItem.id}
//   value={cityItem.name}
//   onSelect={() => {
//     setCity(cityItem);
//     setShowDropdown(false);
//     setSearchValue("");
//   }}
//   className="
//     group
//     cursor-pointer
//     rounded-md
//     px-3 py-2
//     transition-colors
//     text-sm
//     hover:bg-[#0B5CAD]/5
//     data-[selected=true]:bg-[#0B5CAD]/10
//     data-[selected=true]:text-[#0B5CAD]
//   "
// >
//   <div className="flex items-start gap-2 w-full">
//     <icons.MapPin
//       className={`
//         w-4 h-4 mt-0.5 flex-shrink-0
//         ${isSelected ? 'text-[#0B5CAD]' : 'text-gray-400'}
//         group-hover:text-red-500
//       `}
//     />
//     <div className="flex flex-col flex-1 min-w-0">
//       <span className="font-semibold truncate">
//         {cityItem.name}
//         {cityItem.code && ` (${cityItem.code})`}
//       </span>
//       {cityItem.state && (
//         <span className="text-xs text-gray-500 truncate">
//           {cityItem.state}
//         </span>
//       )}
//     </div>
//   </div>
// </ui.CommandItem>

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
// import { City } from "@/common/hooks/useCities";
// import { useState, useRef } from "react";

// interface CitySelectorProps {
//   city: City | null;
//   setCity: (city: City | null) => void;
//   cities: City[];
//   showDropdown: boolean;
//   setShowDropdown: (show: boolean) => void;
//   loading: boolean;
// }

// export const CitySelector: React.FC<CitySelectorProps> = ({
//   city,
//   setCity,
//   cities,
//   showDropdown,
//   setShowDropdown,
//   loading,
// }) => {
//   const [searchValue, setSearchValue] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);

//   const filteredCities = cities.filter(
//     (cityItem) =>
//       cityItem.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
//       cityItem.code?.toLowerCase().includes(searchValue.toLowerCase()) ||
//       cityItem.state?.toLowerCase().includes(searchValue.toLowerCase())
//   );

//   // ✅ Reset search + close in one place — no useEffect needed
//   const handleOpenChange = (open: boolean) => {
//     if (!open) setSearchValue("");
//     setShowDropdown(open);
//   };

//   const handleSelect = (cityItem: City) => {
//     setCity(cityItem);
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
//             <icons.MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//             <div className="flex-1 min-w-0">
//               <div className="text-xs text-gray-500 mb-1">City</div>
//               <div className="font-medium text-gray-900 truncate">
//                 {city ? (
//                   <span>{city.name}</span>
//                 ) : (
//                   <span className="text-gray-400 font-normal">Select city</span>
//                 )}
//               </div>
//               {city?.state && (
//                 <div className="text-xs text-gray-500 truncate mt-0.5">
//                   {city.state}
//                   {city.code && ` (${city.code})`}
//                 </div>
//               )}
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
//               placeholder="Search city..."
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
//               <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-200 border-t-[#0B5CAD]" />
//               <span className="text-sm text-gray-500">Loading cities...</span>
//             </div>
//           ) : filteredCities.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-8">
//               <icons.MapPin className="w-10 h-10 text-gray-300 mb-2" />
//               <p className="text-sm font-medium text-gray-900">No cities found</p>
//               <p className="text-xs text-gray-500 mt-1">Try a different search</p>
//             </div>
//           ) : (
//             filteredCities.map((cityItem) => {
//               const isSelected = city?.id === cityItem.id;
//               return (
//                 <button
//                   key={cityItem.id}
//                   onClick={() => handleSelect(cityItem)}
//                   className={`
//                     w-full flex items-start gap-2.5 px-3 py-2.5 rounded-lg mb-0.5
//                     text-left transition-colors duration-100
//                     ${isSelected
//                       ? "bg-[#0B5CAD]/10 text-[#0B5CAD]"
//                       : "hover:bg-gray-50 text-gray-900"
//                     }
//                   `}
//                 >
//                   <icons.MapPin
//                     className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
//                       isSelected ? "text-[#0B5CAD]" : "text-gray-400"
//                     }`}
//                   />
//                   <div className="flex flex-col flex-1 min-w-0">
//                     <span className="font-medium text-sm truncate">
//                       {cityItem.name}
//                       {cityItem.code && (
//                         <span className="font-normal text-gray-500 ml-1">
//                           ({cityItem.code})
//                         </span>
//                       )}
//                     </span>
//                     {cityItem.state && (
//                       <span className="text-xs text-gray-500 truncate">
//                         {cityItem.state}
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
import { City } from "@/common/hooks/useCities";

interface CitySelectorProps {
  city: City | null;
  setCity: (city: City | null) => void;
  cities: City[];
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  loading: boolean;
}

export const CitySelector: React.FC<CitySelectorProps> = ({
  city,
  setCity,
  cities,
  showDropdown,
  setShowDropdown,
  loading,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCities = cities.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      c.code?.toLowerCase().includes(searchValue.toLowerCase()) ||
      c.state?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleOpen = () => {
    setShowDropdown(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleClose = () => {
    setShowDropdown(false);
    setSearchValue("");
  };

  const handleSelect = (cityItem: City) => {
    setCity(cityItem);
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
        className="w-full h-full px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={showDropdown ? handleClose : handleOpen}
      >
        <div className="flex items-start gap-3">
          <icons.MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-gray-500 mb-1">City</div>
            <div className="text-sm font-medium text-gray-900 truncate">
              {city
                ? <span>{city.name}</span>
                : <span className="text-sm text-gray-400 font-normal">Select city</span>
              }
            </div>
            {city?.state && (
              <div className="text-xs text-gray-500 truncate mt-0.5">
                {city.state}{city.code && ` (${city.code})`}
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
                placeholder="Search city..."
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
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-200 border-t-[#0B5CAD]" />
                <span className="text-sm text-gray-500">Loading cities...</span>
              </div>
            ) : filteredCities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <icons.MapPin className="w-10 h-10 text-gray-300 mb-2" />
                <p className="text-sm font-medium text-gray-900">No cities found</p>
                <p className="text-xs text-gray-500 mt-1">Try a different search</p>
              </div>
            ) : (
              filteredCities.map((cityItem) => {
                const isSelected = city?.id === cityItem.id;
                return (
                  <button
                    key={cityItem.id}
                    onClick={() => handleSelect(cityItem)}
                    className={`
                      w-full flex items-start gap-2.5 px-3 py-2.5 rounded-lg mb-0.5
                      text-left transition-colors duration-100
                      ${isSelected
                        ? "bg-[#0B5CAD]/10 text-[#0B5CAD]"
                        : "hover:bg-gray-50 text-gray-900"
                      }
                    `}
                  >
                    <icons.MapPin
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        isSelected ? "text-[#0B5CAD]" : "text-gray-400"
                      }`}
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-medium text-sm truncate">
                        {cityItem.name}
                        {cityItem.code && (
                          <span className="font-normal text-gray-500 ml-1">
                            ({cityItem.code})
                          </span>
                        )}
                      </span>
                      {cityItem.state && (
                        <span className="text-xs text-gray-500 truncate">
                          {cityItem.state}
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

