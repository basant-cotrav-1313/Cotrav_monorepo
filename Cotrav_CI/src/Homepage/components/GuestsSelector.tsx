

// import { ui, icons } from "@/index";

// interface GuestsSelectorProps {
//   rooms: string;
//   setRooms: (rooms: string) => void;
//   adults: string;
//   setAdults: (adults: string) => void;
//   children: string;
//   setChildren: (children: string) => void;
//   showDropdown: boolean;
//   setShowDropdown: (show: boolean) => void;
// }

// export const GuestsSelector: React.FC<GuestsSelectorProps> = ({
//   rooms,
//   setRooms,
//   adults,
//   setAdults,
//   children,
//   setChildren,
//   showDropdown,
//   setShowDropdown,
// }) => {
//   const incrementValue = (value: string, setValue: (val: string) => void, max: number) => {
//     const num = parseInt(value);
//     if (num < max) setValue((num + 1).toString());
//   };

//   const decrementValue = (value: string, setValue: (val: string) => void, min: number) => {
//     const num = parseInt(value);
//     if (num > min) setValue((num - 1).toString());
//   };

//   return (
//     <ui.Popover open={showDropdown} onOpenChange={setShowDropdown}>
//       <ui.PopoverTrigger asChild>
//         <button className="w-full h-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
//           <div className="flex items-start gap-3">
//             <icons.Users className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//             <div className="flex-1 min-w-0">
//               <div className="text-xs text-gray-500 mb-1">Rooms & Guests</div>
//               <div className="flex flex-col">
//                 <span className="font-bold text-gray-900 truncate">
//                   {rooms} Room{parseInt(rooms) > 1 ? "s" : ""}
//                 </span>
//                 <span className="text-xs text-gray-500 truncate">
//                   {adults} Adult{parseInt(adults) > 1 ? "s" : ""}
//                   {parseInt(children) > 0 ? `, ${children} Child${parseInt(children) > 1 ? "ren" : ""}` : ""}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </button>
//       </ui.PopoverTrigger>
//       <ui.PopoverContent
//         className="w-80 p-5 border-0 shadow-xl"
//         align="start"
//       >
//         <div className="space-y-5">
//           {/* Rooms */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-[#7B61FF]/10 flex items-center justify-center">
//                 <icons.Home className="w-5 h-5 text-[#7B61FF]" />
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-gray-900">Rooms</p>
//                 <p className="text-xs text-gray-500">Number of rooms</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <ui.Button
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8 rounded-full border-2 hover:border-[#7B61FF] hover:bg-[#7B61FF]/5"
//                 onClick={() => decrementValue(rooms, setRooms, 1)}
//                 disabled={parseInt(rooms) <= 1}
//               >
//                 <icons.Minus className="h-4 w-4" />
//               </ui.Button>
//               <span className="w-8 text-center font-bold text-lg">{rooms}</span>
//               <ui.Button
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8 rounded-full border-2 hover:border-[#7B61FF] hover:bg-[#7B61FF]/5"
//                 onClick={() => incrementValue(rooms, setRooms, 10)}
//                 disabled={parseInt(rooms) >= 10}
//               >
//                 <icons.Plus className="h-4 w-4" />
//               </ui.Button>
//             </div>
//           </div>

//           <div className="border-t"></div>

//           {/* Adults */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
//                 <icons.User className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-gray-900">Adults</p>
//                 <p className="text-xs text-gray-500">Ages 18 or above</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <ui.Button
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8 rounded-full border-2 hover:border-blue-600 hover:bg-blue-50"
//                 onClick={() => decrementValue(adults, setAdults, 1)}
//                 disabled={parseInt(adults) <= 1}
//               >
//                 <icons.Minus className="h-4 w-4" />
//               </ui.Button>
//               <span className="w-8 text-center font-bold text-lg">{adults}</span>
//               <ui.Button
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8 rounded-full border-2 hover:border-blue-600 hover:bg-blue-50"
//                 onClick={() => incrementValue(adults, setAdults, 10)}
//                 disabled={parseInt(adults) >= 10}
//               >
//                 <icons.Plus className="h-4 w-4" />
//               </ui.Button>
//             </div>
//           </div>

//           <div className="border-t"></div>

//           {/* Children */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
//                 <icons.Baby className="w-5 h-5 text-pink-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-gray-900">Children</p>
//                 <p className="text-xs text-gray-500">Ages 0-17</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <ui.Button
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8 rounded-full border-2 hover:border-pink-600 hover:bg-pink-50"
//                 onClick={() => decrementValue(children, setChildren, 0)}
//                 disabled={parseInt(children) <= 0}
//               >
//                 <icons.Minus className="h-4 w-4" />
//               </ui.Button>
//               <span className="w-8 text-center font-bold text-lg">{children}</span>
//               <ui.Button
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8 rounded-full border-2 hover:border-pink-600 hover:bg-pink-50"
//                 onClick={() => incrementValue(children, setChildren, 10)}
//                 disabled={parseInt(children) >= 10}
//               >
//                 <icons.Plus className="h-4 w-4" />
//               </ui.Button>
//             </div>
//           </div>
//         </div>

//         <div className="mt-5 pt-4 border-t">
//           <ui.Button
//             className="w-full bg-[#7B61FF] hover:bg-[#6a52e0] text-white"
//             onClick={() => setShowDropdown(false)}
//           >
//             Done
//           </ui.Button>
//         </div>
//       </ui.PopoverContent>
//     </ui.Popover>
//   );
// };


// import { ui, icons } from "@/index";

// interface CounterRowProps {
//   icon: React.ReactNode;
//   iconBg: string;
//   iconColor: string;
//   label: string;
//   sublabel: string;
//   value: string;
//   min: number;
//   max: number;
//   onIncrement: () => void;
//   onDecrement: () => void;
// }

// // ? Declared OUTSIDE the parent component — no "created during render" error
// const CounterRow: React.FC<CounterRowProps> = ({
//   icon,
//   iconBg,
//   iconColor,
//   label,
//   sublabel,
//   value,
//   min,
//   max,
//   onIncrement,
//   onDecrement,
// }) => (
//   <div className="flex items-center justify-between">
//     <div className="flex items-center gap-3">
//       <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center`}>
//         <span className={iconColor}>{icon}</span>
//       </div>
//       <div>
//         <p className="text-sm font-semibold text-gray-900">{label}</p>
//         <p className="text-xs text-gray-500">{sublabel}</p>
//       </div>
//     </div>
//     <div className="flex items-center gap-3">
//       <button
//         onClick={onDecrement}
//         disabled={parseInt(value) <= min}
//         className="h-8 w-8 rounded-full border-2 border-gray-200 flex items-center justify-center
//           transition-all hover:border-gray-400 hover:bg-gray-50
//           disabled:opacity-30 disabled:cursor-not-allowed"
//       >
//         <icons.Minus className="h-3.5 w-3.5 text-gray-600" />
//       </button>
//       <span className="w-6 text-center font-bold text-base tabular-nums">{value}</span>
//       <button
//         onClick={onIncrement}
//         disabled={parseInt(value) >= max}
//         className="h-8 w-8 rounded-full border-2 border-gray-200 flex items-center justify-center
//           transition-all hover:border-gray-400 hover:bg-gray-50
//           disabled:opacity-30 disabled:cursor-not-allowed"
//       >
//         <icons.Plus className="h-3.5 w-3.5 text-gray-600" />
//       </button>
//     </div>
//   </div>
// );

// interface GuestsSelectorProps {
//   rooms: string;
//   setRooms: (rooms: string) => void;
//   adults: string;
//   setAdults: (adults: string) => void;
//   children: string;
//   setChildren: (children: string) => void;
//   showDropdown: boolean;
//   setShowDropdown: (show: boolean) => void;
// }

// export const GuestsSelector: React.FC<GuestsSelectorProps> = ({
//   rooms,
//   setRooms,
//   adults,
//   setAdults,
//   children,
//   setChildren,
//   showDropdown,
//   setShowDropdown,
// }) => {
//   const inc = (value: string, setValue: (v: string) => void, max: number) => {
//     const n = parseInt(value);
//     if (n < max) setValue((n + 1).toString());
//   };

//   const dec = (value: string, setValue: (v: string) => void, min: number) => {
//     const n = parseInt(value);
//     if (n > min) setValue((n - 1).toString());
//   };

//   return (
//     <ui.Popover open={showDropdown} onOpenChange={setShowDropdown}>
//       <ui.PopoverTrigger asChild>
//         <button className="w-full h-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
//           <div className="flex items-start gap-3">
//             <icons.Users className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//             <div className="flex-1 min-w-0">
//               <div className="text-xs text-gray-500 mb-1">Rooms & Guests</div>
//               <div className="flex flex-col">
//                 <span className="font-bold text-gray-900 truncate">
//                   {rooms} Room{parseInt(rooms) > 1 ? "s" : ""}
//                 </span>
//                 <span className="text-xs text-gray-500 truncate">
//                   {adults} Adult{parseInt(adults) > 1 ? "s" : ""}
//                   {parseInt(children) > 0
//                     ? `, ${children} Child${parseInt(children) > 1 ? "ren" : ""}`
//                     : ""}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </button>
//       </ui.PopoverTrigger>

//       <ui.PopoverContent className="w-80 p-5 border-0 shadow-xl rounded-xl" align="start">
//         <p className="text-sm font-semibold text-gray-900 mb-4">Rooms & Guests</p>

//         <div className="space-y-4">
//           <CounterRow
//             icon={<icons.Home className="w-5 h-5" />}
//             iconBg="bg-[#7B61FF]/10"
//             iconColor="text-[#7B61FF]"
//             label="Rooms"
//             sublabel="Number of rooms"
//             value={rooms}
//             min={1}
//             max={10}
//             onIncrement={() => inc(rooms, setRooms, 10)}
//             onDecrement={() => dec(rooms, setRooms, 1)}
//           />

//           <div className="border-t border-gray-100" />

//           <CounterRow
//             icon={<icons.User className="w-5 h-5" />}
//             iconBg="bg-blue-50"
//             iconColor="text-blue-600"
//             label="Adults"
//             sublabel="Ages 18 or above"
//             value={adults}
//             min={1}
//             max={10}
//             onIncrement={() => inc(adults, setAdults, 10)}
//             onDecrement={() => dec(adults, setAdults, 1)}
//           />

//           <div className="border-t border-gray-100" />

//           <CounterRow
//             icon={<icons.Baby className="w-5 h-5" />}
//             iconBg="bg-pink-50"
//             iconColor="text-pink-600"
//             label="Children"
//             sublabel="Ages 0–17"
//             value={children}
//             min={0}
//             max={10}
//             onIncrement={() => inc(children, setChildren, 10)}
//             onDecrement={() => dec(children, setChildren, 0)}
//           />
//         </div>

//         <div className="mt-5 pt-4 border-t border-gray-100">
//           <ui.Button
//             className="w-full bg-[#7B61FF] hover:bg-[#6a52e0] text-white font-semibold"
//             onClick={() => setShowDropdown(false)}
//           >
//             Done
//           </ui.Button>
//         </div>
//       </ui.PopoverContent>
//     </ui.Popover>
//   );
// };


// import { useRef, useEffect } from "react";
// import { icons } from "@/index";
// import { ui } from "@/index";

// // -- CounterRow declared at module level — no "created during render" error --
// interface CounterRowProps {
//   icon: React.ReactNode;
//   iconBg: string;
//   iconColor: string;
//   label: string;
//   sublabel: string;
//   value: string;
//   min: number;
//   max: number;
//   onIncrement: () => void;
//   onDecrement: () => void;
// }

// const CounterRow: React.FC<CounterRowProps> = ({
//   icon, iconBg, iconColor, label, sublabel,
//   value, min, max, onIncrement, onDecrement,
// }) => (
//   <div className="flex items-center justify-between">
//     <div className="flex items-center gap-3">
//       <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center`}>
//         <span className={iconColor}>{icon}</span>
//       </div>
//       <div>
//         <p className="text-sm font-semibold text-gray-900">{label}</p>
//         <p className="text-xs text-gray-500">{sublabel}</p>
//       </div>
//     </div>
//     <div className="flex items-center gap-3">
//       <button
//         onClick={onDecrement}
//         disabled={parseInt(value) <= min}
//         className="h-8 w-8 rounded-full border-2 border-gray-200 flex items-center justify-center
//           transition-colors hover:border-gray-400 hover:bg-gray-50
//           disabled:opacity-30 disabled:cursor-not-allowed"
//       >
//         <icons.Minus className="h-3.5 w-3.5 text-gray-600" />
//       </button>
//       <span className="w-6 text-center font-bold text-base tabular-nums">{value}</span>
//       <button
//         onClick={onIncrement}
//         disabled={parseInt(value) >= max}
//         className="h-8 w-8 rounded-full border-2 border-gray-200 flex items-center justify-center
//           transition-colors hover:border-gray-400 hover:bg-gray-50
//           disabled:opacity-30 disabled:cursor-not-allowed"
//       >
//         <icons.Plus className="h-3.5 w-3.5 text-gray-600" />
//       </button>
//     </div>
//   </div>
// );

// // -- Main component --
// interface GuestsSelectorProps {
//   rooms: string;
//   setRooms: (v: string) => void;
//   adults: string;
//   setAdults: (v: string) => void;
//   children: string;
//   setChildren: (v: string) => void;
//   showDropdown: boolean;
//   setShowDropdown: (v: boolean) => void;
// }

// export const GuestsSelector: React.FC<GuestsSelectorProps> = ({
//   rooms, setRooms,
//   adults, setAdults,
//   children, setChildren,
//   showDropdown, setShowDropdown,
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const inc = (val: string, set: (v: string) => void, max: number) => {
//     const n = parseInt(val);
//     if (n < max) set((n + 1).toString());
//   };
//   const dec = (val: string, set: (v: string) => void, min: number) => {
//     const n = parseInt(val);
//     if (n > min) set((n - 1).toString());
//   };

//   // Close on outside click — no Radix overhead
//   useEffect(() => {
//     if (!showDropdown) return;
//     const onOutsideClick = (e: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", onOutsideClick, true);
//     return () => document.removeEventListener("mousedown", onOutsideClick, true);
//   }, [showDropdown]);

//   return (
//     <div ref={containerRef} className="relative w-full h-full">

//       {/* -- Trigger -- */}
//       <button
//         className="w-full h-full px-4 py-3 text-left hover:bg-gray-50 transition-colors rounded-r-lg cursor-pointer"
//         onClick={() => setShowDropdown(!showDropdown)}
//       >
//         <div className="flex items-start gap-3">
//           <icons.Users className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//           <div className="flex-1 min-w-0">
//             <div className="text-xs text-gray-500 mb-1">Rooms & Guests</div>
//             <span className="font-bold text-gray-900 block truncate">
//               {rooms} Room{parseInt(rooms) > 1 ? "s" : ""}
//             </span>
//             <span className="text-xs text-gray-500 truncate block">
//               {adults} Adult{parseInt(adults) > 1 ? "s" : ""}
//               {parseInt(children) > 0
//                 ? `, ${children} Child${parseInt(children) > 1 ? "ren" : ""}`
//                 : ""}
//             </span>
//           </div>
//           <icons.ChevronDown
//             className={`w-4 h-4 text-gray-400 mt-1 flex-shrink-0 transition-transform duration-150 ${
//               showDropdown ? "rotate-180" : ""
//             }`}
//           />
//         </div>
//       </button>

//       {/* -- Dropdown panel — plain div, zero Radix, opens instantly -- */}
//       {showDropdown && (
//         <div className="absolute top-full left-0 z-50 mt-1 w-80 bg-white rounded-xl
//           shadow-xl shadow-black/10 border border-gray-100 p-5">

//           <p className="text-sm font-semibold text-gray-900 mb-4">Rooms & Guests</p>

//           <div className="space-y-4">
//             <CounterRow
//               icon={<icons.Home className="w-5 h-5" />}
//               iconBg="bg-[#7B61FF]/10"
//               iconColor="text-[#7B61FF]"
//               label="Rooms"
//               sublabel="Number of rooms"
//               value={rooms}
//               min={1} max={10}
//               onIncrement={() => inc(rooms, setRooms, 10)}
//               onDecrement={() => dec(rooms, setRooms, 1)}
//             />

//             <div className="border-t border-gray-100" />

//             <CounterRow
//               icon={<icons.User className="w-5 h-5" />}
//               iconBg="bg-blue-50"
//               iconColor="text-blue-600"
//               label="Adults"
//               sublabel="Ages 18 or above"
//               value={adults}
//               min={1} max={10}
//               onIncrement={() => inc(adults, setAdults, 10)}
//               onDecrement={() => dec(adults, setAdults, 1)}
//             />

//             <div className="border-t border-gray-100" />

//             <CounterRow
//               icon={<icons.Baby className="w-5 h-5" />}
//               iconBg="bg-pink-50"
//               iconColor="text-pink-600"
//               label="Children"
//               sublabel="Ages 0–17"
//               value={children}
//               min={0} max={10}
//               onIncrement={() => inc(children, setChildren, 10)}
//               onDecrement={() => dec(children, setChildren, 0)}
//             />
//           </div>

//           <div className="mt-5 pt-4 border-t border-gray-100">
//             <ui.Button
//               className="w-full bg-[#7B61FF] hover:bg-[#6a52e0] text-white font-semibold"
//               onClick={() => setShowDropdown(false)}
//             >
//               Done
//             </ui.Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


import { useRef, useEffect } from "react";
import { icons } from "@/index";
import { ui } from "@/index";

// -- CounterRow declared at module level — no "created during render" error --
interface CounterRowProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  sublabel: string;
  value: string;
  min: number;
  max: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CounterRow: React.FC<CounterRowProps> = ({
  icon, iconBg, iconColor, label, sublabel,
  value, min, max, onIncrement, onDecrement,
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{sublabel}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={onDecrement}
        disabled={parseInt(value) <= min}
        className="h-8 w-8 rounded-full border-2 border-gray-200 flex items-center justify-center
          transition-colors hover:border-gray-400 hover:bg-gray-50
          disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <icons.Minus className="h-3.5 w-3.5 text-gray-600" />
      </button>
      <span className="w-6 text-center font-medium text-base tabular-nums">{value}</span>
      <button
        onClick={onIncrement}
        disabled={parseInt(value) >= max}
        className="h-8 w-8 rounded-full border-2 border-gray-200 flex items-center justify-center
          transition-colors hover:border-gray-400 hover:bg-gray-50
          disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <icons.Plus className="h-3.5 w-3.5 text-gray-600" />
      </button>
    </div>
  </div>
);

// -- Main component --
interface GuestsSelectorProps {
  rooms: string;
  setRooms: (v: string) => void;
  adults: string;
  setAdults: (v: string) => void;
  children: string;
  setChildren: (v: string) => void;
  childrenAges: number[];
  setChildrenAges: (ages: number[]) => void;
  showDropdown: boolean;
  setShowDropdown: (v: boolean) => void;
}

export const GuestsSelector: React.FC<GuestsSelectorProps> = ({
  rooms, setRooms,
  adults, setAdults,
  children, setChildren,
  childrenAges, setChildrenAges,
  showDropdown, setShowDropdown,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const inc = (val: string, set: (v: string) => void, max: number) => {
    const n = parseInt(val);
    if (n < max) set((n + 1).toString());
  };
  
  const dec = (val: string, set: (v: string) => void, min: number) => {
    const n = parseInt(val);
    if (n > min) set((n - 1).toString());
  };

  // Handle children count changes - auto-adjust ages array
  const handleChildrenIncrement = () => {
    const currentCount = parseInt(children);
    if (currentCount < 40) {
      setChildren((currentCount + 1).toString());
      // Add a new age slot (default 0 - not selected)
      setChildrenAges([...(childrenAges || []), 0]);
    }
  };

  const handleChildrenDecrement = () => {
    const currentCount = parseInt(children);
    if (currentCount > 0) {
      setChildren((currentCount - 1).toString());
      // Remove the last age
      setChildrenAges((childrenAges || []).slice(0, -1));
    }
  };

  // Handle age change for specific child
  const handleAgeChange = (index: number, age: number) => {
    const newAges = [...(childrenAges || [])];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  // Validation: check if all children have ages selected
  const allAgesSelected = parseInt(children) === 0 || (childrenAges || []).every(age => age > 0);
  const hasChildren = parseInt(children) > 0;

  // Close on outside click
  useEffect(() => {
    if (!showDropdown) return;
    const onOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick, true);
    return () => document.removeEventListener("mousedown", onOutsideClick, true);
  }, [showDropdown]);

  return (
    <div ref={containerRef} className="relative w-full h-full">

      {/* -- Trigger -- */}
      <button
        className="w-full h-full px-4 py-3 text-left hover:bg-gray-50 transition-colors rounded-r-lg cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="flex items-start gap-3">
          <icons.Users className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-gray-500 mb-1">Rooms & Guests</div>
            <span className="font-medium text-gray-900 block truncate">
              {rooms} Room{parseInt(rooms) > 1 ? "s" : ""}
            </span>
            <span className="text-[11px] text-gray-500 truncate block">
              {adults} Adult{parseInt(adults) > 1 ? "s" : ""}
              {parseInt(children) > 0
                ? `, ${children} Child${parseInt(children) > 1 ? "ren" : ""}`
                : ""}
            </span>
          </div>
          <icons.ChevronDown
            className={`w-4 h-4 text-gray-400 mt-1 flex-shrink-0 transition-transform duration-150 ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* -- Dropdown panel -- */}
      {showDropdown && (
        // <div className="absolute top-full left-0 z-50 mt-1 w-[28rem] bg-white rounded-xl
        //   shadow-xl shadow-black/10 border border-gray-100 p-5 max-h-[32rem] overflow-y-auto custom-scrollbar">
        <div className="absolute top-full left-0 z-50 mt-1 w-[28rem] bg-white rounded-xl
  shadow-xl shadow-black/10 border border-gray-100 p-5">

          <p className="text-sm font-medium text-gray-900 mb-4">Rooms & Guests</p>

          <div className="space-y-4">
            <CounterRow
              icon={<icons.Home className="w-5 h-5" />}
              iconBg="bg-[#7B61FF]/10"
              iconColor="text-[#7B61FF]"
              label="Rooms"
              sublabel="Number of rooms"
              value={rooms}
              min={1} max={10}
              onIncrement={() => inc(rooms, setRooms, 10)}
              onDecrement={() => dec(rooms, setRooms, 1)}
            />

            <div className="border-t border-gray-100" />

            <CounterRow
              icon={<icons.User className="w-5 h-5" />}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              label="Adults"
              sublabel="Ages 18 or above"
              value={adults}
              min={1} max={10}
              onIncrement={() => inc(adults, setAdults, 10)}
              onDecrement={() => dec(adults, setAdults, 1)}
            />

            <div className="border-t border-gray-100" />

            <CounterRow
              icon={<icons.Baby className="w-5 h-5" />}
              iconBg="bg-pink-50"
              iconColor="text-pink-600"
              label="Children"
              sublabel="Ages 0–17"
              value={children}
              min={0} max={40}
              onIncrement={handleChildrenIncrement}
              onDecrement={handleChildrenDecrement}
            />

            {/* -- Children Ages Section -- */}
            {hasChildren && (
              <>
                <div className="border-t border-gray-100" />
                
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-900">Children Ages</p>
                  
                  {/* Grid layout - 2 columns */}
                  {/* <div className="grid grid-cols-2 gap-3"> */}
                  <div className="grid grid-cols-2 gap-3 max-h-[10rem] overflow-y-auto custom-scrollbar pr-2">
                    {Array.from({ length: parseInt(children) }).map((_, index) => (
                      <div key={index} className="flex flex-col gap-1.5">
                        <label className="text-xs text-gray-600 font-medium">
                          Child {index + 1}
                        </label>
                        <select
                          value={(childrenAges || [])[index] || 0}
                          onChange={(e) => handleAgeChange(index, parseInt(e.target.value))}
                          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors
                            ${(childrenAges || [])[index] === 0 
                              ? 'border-red-300 bg-red-50' 
                              : 'border-gray-200 bg-white'
                            }
                            hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7B61FF]/20 focus:border-[#7B61FF]`}
                        >
                          <option value={0} disabled>Select age</option>
                          {Array.from({ length: 18 }).map((_, age) => (
                            <option key={age} value={age}>
                              {age} {age === 1 ? 'year' : 'years'}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  {/* Error message */}
                  {!allAgesSelected && (
                    <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                      <icons.AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Please select age for all children</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <ui.Button
              className="w-full bg-[#0B5CAD] hover:bg-[#094B8A] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setShowDropdown(false)}
              disabled={!allAgesSelected}
            >
              Done
            </ui.Button>
          </div>
        </div>
      )}
    </div>
  );
};

