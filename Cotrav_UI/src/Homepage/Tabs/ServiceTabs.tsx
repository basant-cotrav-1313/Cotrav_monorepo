import React from "react";

// Import SVG images as URL strings
import FlightIconDefault from "../../assets/images/Flight_01.svg";
import FlightIconHover from "../../assets/images/Flight_Hover.svg";
import HotelIconDefault from "../../assets/images/Hotel_01.svg";
import HotelIconHover from "../../assets/images/Hotel_Hover.svg";
import CabIconDefault from "../../assets/images/Cab_Black.svg";
import CabIconHover from "../../assets/images/Cab_Hover-03.svg";
import BusIconDefault from "../../assets/images/Bus_icon.svg";
import BusIconHover from "../../assets/images/Bus_Hover.svg";

interface TabsNavigationProps {
  activeTab: "flight" | "hotel" | "cab" | "bus";
  onTabChange: (tab: "flight" | "hotel" | "cab" | "bus") => void;
}

export const TabsNavigation: React.FC<TabsNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    {
      id: "flight",
      label: "Flight",
      defaultIcon: FlightIconDefault,
      hoverIcon: FlightIconHover,
    },
    {
      id: "hotel",
      label: "Hotel",
      defaultIcon: HotelIconDefault,
      hoverIcon: HotelIconHover,
    },
    {
      id: "cab",
      label: "Cab",
      defaultIcon: CabIconDefault,
      hoverIcon: CabIconHover,
    },
    {
      id: "bus",
      label: "Bus",
      defaultIcon: BusIconDefault,
      hoverIcon: BusIconHover,
    },
  ];

  return (
    <div className="px-3 py-2 md:px-4 md:py-3 border-b border-slate-200 bg-slate-50/80">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as any)}
          className={`
    flex items-center justify-center gap-2 px-4 py-3 md:px-5 md:py-3.5 rounded-xl border
    transition-all duration-200 text-sm md:text-base font-semibold
    ${
      activeTab === tab.id
        ? "bg-white border-slate-300 main_text_color shadow-sm"
        : "bg-white/40 border-transparent text-slate-600 hover:bg-white hover:border-slate-200"
    }
  `}
        >
          <img
            src={activeTab === tab.id ? tab.hoverIcon : tab.defaultIcon}
            // alt={`${tab.label} icon`}
            className="w-5 h-5"
          />
          <span>{tab.label}</span>
        </button>
      ))}
      </div>
    </div>
  );
};

