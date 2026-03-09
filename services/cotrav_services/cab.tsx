import CompanyDropdown from "../components/CompanyDropdown";

const Cab: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg pt-6 pb-12 px-6">
      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border rounded-xl overflow-visible">
        {/* COMPANY */}
        <CompanyDropdown
          onSelect={(company) => {
            // console.log("Selected company:", company);
          }}
        />
        {/* City */}
        <div className="p-4 border-r relative">
          <p className="text-[10px] font-medium text-gray-500">City</p>
          <p className="text-sm font-medium text-gray-900">Delhi (DEL)</p>
          <p className="text-sm text-gray-500">
            Indira Gandhi International Airport
          </p>
        </div>

        {/* CHECK-IN */}
        <div className="p-4 border-r">
          <p className="text-[10px] font-medium text-gray-500">Check-In</p>
          <p className="text-sm font-medium text-gray-900">Dubai (DXB)</p>
          <p className="text-sm text-gray-500">Dubai International Airport</p>
        </div>

        {/* CHECK-OUT */}
        <div className="p-4 border-r">
          <p className="text-[10px] font-medium text-gray-500">Check-Out</p>
          <p className="text-sm font-medium text-gray-900">16/12/2025</p>
        </div>

        {/* ROOM & GUESTS */}
        <div className="p-4 border-r">
          <p className="text-[10px] font-medium text-gray-500">Room & Guests</p>
          <p className="text-sm text-gray-400">1 Room, 2 Adults, 0 Children</p>
        </div>
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

export default Cab;

