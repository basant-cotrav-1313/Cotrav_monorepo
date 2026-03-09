
// import { ui, icons, } from "@/index";
// import { DateSelectorProps } from '@/types/SearchHotelFormtypes'

// // export const DateSelector: React.FC<searchHotelFormTypes.DateSelectorProps> = ({
// export const DateSelector: React.FC<DateSelectorProps> = ({
//   label,
//   date,
//   isOpen,
//   setIsOpen,
//   onChange,
//   minDate,
// }) => {
//   return (
//     <ui.FormField label={label} icon={icons.CalendarDays}>
//       <ui.Popover open={isOpen} onOpenChange={setIsOpen}>
//         <ui.PopoverTrigger asChild>
//           <ui.Button
//             variant="outline"
//             className="
          
//               w-full justify-between h-11
//               bg-gray-300
//               border-gray-200
//               hover:bg-gray-50
//               focus-visible:ring-2
//               focus-visible:ring-[#785ef7]/40
//               focus-visible:ring-offset-2
//             "
//           >
//             <span className="font-semibold">
//               {date
//                 ? date.toLocaleDateString("en-GB")
//                 : `Select ${label.toLowerCase()}`}
//             </span>
//             <icons.Calendar className="ml-2 h-4 w-4 opacity-50" />
//           </ui.Button>
//         </ui.PopoverTrigger>

//         <ui.PopoverContent
//           align="start"
//           className="
//             w-auto p-0
//             border-0
//             bg-white
//             rounded-xl
//             shadow-xl shadow-black/15
//           "
//         >
//           <ui.Calendar
//             mode="single"
//             selected={date ?? undefined}
//             onSelect={(selected) => {
//               onChange(selected ?? null);
//               setIsOpen(false);
//             }}
//             disabled={minDate ? { before: minDate } : undefined}
//             initialFocus
//             className="
//                [&_.rdp-day]:cursor-pointer
//               [&_.rdp-day:hover]:bg-[#785ef7]/5
//               [&_.rdp-day_selected]:bg-[#785ef7]
//               [&_.rdp-day_selected]:text-white
//               [&_.rdp-day_selected:hover]:bg-[#785ef7]
//               [&_.rdp-day_today]:border-[#785ef7]
//             "
//           />
//         </ui.PopoverContent>
//       </ui.Popover>
//     </ui.FormField>
//   );
// };

import { ui, icons } from "@/index";
import { DateSelectorProps } from '@/types/SearchHotelFormtypes';

export const DateSelector: React.FC<DateSelectorProps> = ({
  label,
  date,
  isOpen,
  setIsOpen,
  onChange,
  minDate,
}) => {
  return (
    <ui.Popover open={isOpen} onOpenChange={setIsOpen}>
      <ui.PopoverTrigger asChild>
        <button className="w-full h-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-3">
            <icons.CalendarDays className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">{label}</div>
              {date ? (
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900">
                    {date.toLocaleDateString("en-US", { 
                      day: "2-digit",
                      month: "short" 
                    })}
                  </span>
                  <span className="text-xs text-gray-500">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                </div>
              ) : (
                <span className="text-gray-400">Select date</span>
              )}
            </div>
          </div>
        </button>
      </ui.PopoverTrigger>

      <ui.PopoverContent
        align="start"
        className="w-auto p-0 border-0 bg-white rounded-xl shadow-xl"
      >
        <ui.Calendar
          mode="single"
          selected={date ?? undefined}
          onSelect={(selected) => {
            onChange(selected ?? null);
            setIsOpen(false);
          }}
          disabled={minDate ? { before: minDate } : undefined}
          initialFocus
          className="
            [&_.rdp-day]:cursor-pointer
            [&_.rdp-day:hover]:bg-[#0B5CAD]/5
            [&_.rdp-day_selected]:bg-[#0B5CAD]
            [&_.rdp-day_selected]:text-white
            [&_.rdp-day_selected:hover]:bg-[#0B5CAD]
            [&_.rdp-day_today]:border-[#0B5CAD]
          "
        />
      </ui.PopoverContent>
    </ui.Popover>
  );
};

