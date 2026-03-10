import { useState } from "@/index";
import CompanyDropdown from "../components/CompanyDropdown";
import DatePickerBox from "../components/DatePickerBox";

const Bus: React.FC = () => {
  const today = new Date();
  const [travelDate, setTravelDate] = useState<Date | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-lg pt-6 pb-12 px-6">
      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border rounded-xl overflow-visible">
        {/* COMPANY */}
        <CompanyDropdown
          onSelect={(company) => {
            // console.log("Selected company:", company);
          }}
        />

        {/* from City */}
        <div className="p-4 border-r relative">
          <p className="text-[10px] font-medium text-gray-500">City</p>
          <p className="text-sm font-medium text-gray-900">Delhi (DEL)</p>
          <p className="text-sm text-gray-500">
            Indira Gandhi International Airport
          </p>
        </div>
        {/* To City */}
        <div className="p-4 border-r relative">
          <p className="text-[10px] font-medium text-gray-500">City</p>
          <p className="text-sm font-medium text-gray-900">Delhi (DEL)</p>
          <p className="text-sm text-gray-500">
            Indira Gandhi International Airport
          </p>
        </div>
      
        {/* Travel Date */}
          <DatePickerBox
          label="Travel Date"
          value={travelDate}
          onChange={(date) => {
            setTravelDate(date);
            // setBookingType("return");
          }}
          minDate={today ?? undefined}
          // disabled={!departureDate || bookingType === "one-way"}
        />
  
      </div>

      {/* BUTTON ROW (NORMAL FLOW) */}
      <div className="mt-6 flex justify-center">
        <button className="bg-[#0B5CAD] hover:bg-[#094B8A] text-white px-14 py-4 rounded-full font-semibold shadow-xl tracking-wide">
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default Bus;

