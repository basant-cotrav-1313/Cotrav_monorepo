import { ui, icons } from "@/index";
import { useState } from "react";

interface CombinedDateSelectorProps {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  onCheckInChange: (date: Date | null) => void;
  onCheckOutChange: (date: Date | null) => void;
  minCheckInDate: Date;
  minCheckOutDate: Date;
}

export const CombinedDateSelector: React.FC<CombinedDateSelectorProps> = ({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
  minCheckInDate,
  minCheckOutDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"checkin" | "checkout">("checkin");

  const handleDateSelect = (date: Date | undefined) => {
    if (activeTab === "checkin") {
      onCheckInChange(date || null);
      // Auto switch to checkout after selecting check-in
      if (date) {
        setActiveTab("checkout");
      }
    } else {
      onCheckOutChange(date || null);
      // Close after selecting checkout
      if (date) {
        setIsOpen(false);
      }
    }
  };

  // const formatDate = (date: Date | null) => {
  //   if (!date) return null;
  //   return {
  //     day: date.toLocaleDateString("en-US", { day: "2-digit" }),
  //     month: date.toLocaleDateString("en-US", { month: "short" }),
  //     weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
  //   };
  // };

  const formatDate = (date: Date | null) => {
  if (!date) return null;
  return {
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    month: date.toLocaleDateString("en-US", { month: "short" }),
    year: date.getFullYear().toString().slice(-2), // Get last 2 digits of year
    weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
  };
};

  const checkInFormatted = formatDate(checkInDate);
  const checkOutFormatted = formatDate(checkOutDate);

  return (
    <ui.Popover open={isOpen} onOpenChange={setIsOpen}>
      <ui.PopoverTrigger asChild>
        <button 
          className="w-full h-full text-left hover:bg-gray-50 transition-colors flex cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {/* Check-In Section */}
          <div 
            className="flex-1 px-4 py-3 border-r border-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("checkin");
              setIsOpen(true);
            }}
          >
            <div className="flex items-start gap-3">
              <icons.CalendarDays className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-[10px] text-gray-500 mb-1">Check-In</div>
                {/* {checkInFormatted ? (
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {checkInFormatted.day} {checkInFormatted.month}
                    </span>
                    <span className="text-xs text-gray-500">
                      {checkInFormatted.weekday}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400">Select date</span>
                )} */}

                {checkInFormatted ? (
  <div className="flex flex-col">
    <div className="flex items-baseline gap-1">
      <span className="font-medium text-base text-gray-900">
        {checkInFormatted.day}
      </span>
      <span className="text-[11px] text-gray-600 font-medium">
        {checkInFormatted.month} '{checkInFormatted.year}
      </span>
    </div>
    <span className="text-xs text-gray-500">
      {checkInFormatted.weekday}
    </span>
  </div>
) : (
  <span className="text-sm text-gray-400">Select date</span>
)}
              </div>
            </div>
          </div>

          {/* Check-Out Section */}
          <div 
            className="flex-1 px-4 py-3"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("checkout");
              setIsOpen(true);
            }}
          >
            <div className="flex items-start gap-3">
              <icons.CalendarDays className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-[10px] text-gray-500 mb-1">Check-Out</div>
                {/* {checkOutFormatted ? (
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {checkOutFormatted.day} {checkOutFormatted.month}
                    </span>
                    <span className="text-xs text-gray-500">
                      {checkOutFormatted.weekday}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400">Select date</span>
                )} */}

                {checkOutFormatted ? (
  <div className="flex flex-col">
    <div className="flex items-baseline gap-1">
      <span className="font-medium text-base text-gray-900">
        {checkOutFormatted.day}
      </span>
      <span className="text-[11px] text-gray-600 font-medium">
        {checkOutFormatted.month} '{checkOutFormatted.year}
      </span>
    </div>
    <span className="text-xs text-gray-500">
      {checkOutFormatted.weekday}
    </span>
  </div>
) : (
  <span className="text-sm text-gray-400">Select date</span>
)}
              </div>
            </div>
          </div>
        </button>
      </ui.PopoverTrigger>

      <ui.PopoverContent
        align="start"
        className="w-auto p-0 border-0 bg-white rounded-xl shadow-xl"
      >
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "checkin"
                ? "text-[#0B5CAD] border-b-2 border-[#0B5CAD]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("checkin")}
          >
            Check-In
          </button>
          <button
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "checkout"
                ? "text-[#0B5CAD] border-b-2 border-[#0B5CAD]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("checkout")}
          >
            Check-Out
          </button>
        </div>

        {/* Calendar */}
        <div className="p-2">
          <ui.Calendar
            mode="single"
            selected={activeTab === "checkin" ? (checkInDate ?? undefined) : (checkOutDate ?? undefined)}
            onSelect={handleDateSelect}
            disabled={activeTab === "checkin" 
              ? { before: minCheckInDate }
              : { before: minCheckOutDate }
            }
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
        </div>
      </ui.PopoverContent>
    </ui.Popover>
  );
};

