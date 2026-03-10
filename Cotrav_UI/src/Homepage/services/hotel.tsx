
// import { ui, icons } from "@/index";
// import { CompanyDropdown } from "@/Homepage/components/HCompanyDropdown";
// import { CombinedDateSelector } from "@/Homepage/components/CombinedDateSelector";
// import { CitySelector } from "@/Homepage/components/CitySelector";
// import { GuestsSelector } from "@/Homepage/components/GuestsSelector";
// import { useHotelSearch } from "@/common/hooks/useHotelSearch";

// const Hotel: React.FC = () => {
//   const {
//     // Company
//     company,
//     setCompany,
//     companies,
//     showCompanyDropdown,
//     setShowCompanyDropdown,
//     loadingCompanies,

//     // City
//     city,
//     setCity,
//     cities,
//     showCityDropdown,
//     setShowCityDropdown,
//     loadingCities,

//     // Dates
//     checkInDate,
//     checkOutDate,
//     handleCheckInChange,
//     setCheckOutDate,
//     today,

//     // Guests
//     rooms,
//     setRooms,
//     adults,
//     setAdults,
//     children,
//     setChildren,
//     showGuestsDropdown,
//     setShowGuestsDropdown,

//     // Helpers
//     getSearchData,
//     resetForm,
//   } = useHotelSearch();

//   const handleSearch = () => {
//     const searchData = getSearchData();
//     console.log("Search initiated with data:", searchData);

//     // Validate required fields
//     if (!company) {
//       alert("Please select a company");
//       return;
//     }
//     if (!city) {
//       alert("Please select a city");
//       return;
//     }
//     if (!checkInDate) {
//       alert("Please select check-in date");
//       return;
//     }
//     if (!checkOutDate) {
//       alert("Please select check-out date");
//       return;
//     }

//     // Your search API call here
//   };

//   return (
//     <div className="w-full">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         {/* Form Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-300 rounded-lg overflow-hidden">
//           {/* COMPANY */}
//           <div className="border-r border-gray-300 last:border-r-0">
//             <CompanyDropdown
//               company={company}
//               setCompany={setCompany}
//               companies={companies}
//               showDropdown={showCompanyDropdown}
//               setShowDropdown={setShowCompanyDropdown}
//               loading={loadingCompanies}
//             />
//           </div>

//           {/* CITY */}
//           <div className="border-r border-gray-300 last:border-r-0">
//             <CitySelector
//               city={city}
//               setCity={setCity}
//               cities={cities}
//               showDropdown={showCityDropdown}
//               setShowDropdown={setShowCityDropdown}
//               loading={loadingCities}
//             />
//           </div>

//           {/* COMBINED CHECK-IN/CHECK-OUT */}
//           <div className="border-r border-gray-300 last:border-r-0 col-span-1">
//             <CombinedDateSelector
//               checkInDate={checkInDate}
//               checkOutDate={checkOutDate}
//               onCheckInChange={handleCheckInChange}
//               onCheckOutChange={setCheckOutDate}
//               minCheckInDate={today}
//               minCheckOutDate={checkInDate || today}
//             />
//           </div>

//           {/* ROOM & GUESTS */}
//           <div>
//             <GuestsSelector
//               rooms={rooms}
//               setRooms={setRooms}
//               adults={adults}
//               setAdults={setAdults}
//               children={children}
//               setChildren={setChildren}
//               showDropdown={showGuestsDropdown}
//               setShowDropdown={setShowGuestsDropdown}
//             />
//           </div>
//         </div>

//         {/* Search Button */}
//         <div className="mt-6 flex justify-center">
//           <ui.Button
//             size="lg"
//             className="bg-[#0B5CAD] hover:bg-[#094B8A] text-white px-12 py-6 rounded-full font-bold text-base shadow-lg"
//             onClick={handleSearch}
//           >
//             <icons.Search className="w-5 h-5 mr-2" />
//             SEARCH
//           </ui.Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hotel;


// import { ui, icons } from "@/index";
// import { CompanyDropdown } from "@/Homepage/components/HCompanyDropdown";
// import { CombinedDateSelector } from "@/Homepage/components/CombinedDateSelector";
// import { CitySelector } from "@/Homepage/components/CitySelector";
// import { GuestsSelector } from "@/Homepage/components/GuestsSelector";
// import { useHotelSearch } from "@/common/hooks/useHotelSearch";

// const Hotel: React.FC = () => {
//   const {
//     company, setCompany, companies,
//     showCompanyDropdown, setShowCompanyDropdown, loadingCompanies,
//     city, setCity, cities,
//     showCityDropdown, setShowCityDropdown, loadingCities,
//     checkInDate, checkOutDate, handleCheckInChange, setCheckOutDate, today,
//     rooms, setRooms, adults, setAdults, children, setChildren,
//     showGuestsDropdown, setShowGuestsDropdown,
//     getSearchData,
//   } = useHotelSearch();

//   const handleSearch = () => {
//     const searchData = getSearchData();
//     console.log("Search initiated with data:", searchData);
//     if (!company)      { alert("Please select a company");      return; }
//     if (!city)         { alert("Please select a city");         return; }
//     if (!checkInDate)  { alert("Please select check-in date");  return; }
//     if (!checkOutDate) { alert("Please select check-out date"); return; }
//   };

//   return (
//     <div className="w-full">
//       <div className="bg-white rounded-lg shadow-md p-6 relative pb-12">

//         {/*
//           ✅ Fix 1 — removed `overflow-hidden`: it was clipping the absolute-positioned
//              dropdown panels, making them appear to "delete" sibling cells.

//           ✅ Fix 2 — added `relative`: gives absolute children a positioning ancestor
//              so they don't escape to the viewport edge.
//         */}
//         <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-gray-300 rounded-lg">

//           {/* COMPANY
//               ✅ Fix 3 — overflow-visible on each cell so the dropdown
//                  panel overflows the cell boundary without being clipped */}
//           <div className="border-r border-gray-300 overflow-visible">
//             <CompanyDropdown
//               company={company}
//               setCompany={setCompany}
//               companies={companies}
//               showDropdown={showCompanyDropdown}
//               setShowDropdown={setShowCompanyDropdown}
//               loading={loadingCompanies}
//             />
//           </div>

//           {/* CITY */}
//           <div className="border-r border-gray-300 overflow-visible first:rounded-l-lg ">
//             <CitySelector
//               city={city}
//               setCity={setCity}
//               cities={cities}
//               showDropdown={showCityDropdown}
//               setShowDropdown={setShowCityDropdown}
//               loading={loadingCities}
//             />
//           </div>

//           {/* COMBINED CHECK-IN / CHECK-OUT */}
//           <div className="border-r border-gray-300 overflow-visible">
//             <CombinedDateSelector
//               checkInDate={checkInDate}
//               checkOutDate={checkOutDate}
//               onCheckInChange={handleCheckInChange}
//               onCheckOutChange={setCheckOutDate}
//               minCheckInDate={today}
//               minCheckOutDate={checkInDate || today}
//             />
//           </div>

//           {/* ROOM & GUESTS */}
//           <div className="overflow-visible last:rounded-r-lg">
//             <GuestsSelector
//               rooms={rooms}
//               setRooms={setRooms}
//               adults={adults}
//               setAdults={setAdults}
//               children={children}
//               setChildren={setChildren}
//               showDropdown={showGuestsDropdown}
//               setShowDropdown={setShowGuestsDropdown}
//             />
//           </div>

//         </div>

//         {/* Search Button */}
//         {/* <div className="mt-6 flex justify-center"> */}
//         <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 ">
//           <ui.Button
//             size="lg"
//             className="bg-[#0B5CAD] hover:bg-[#094B8A] text-white px-12 py-6 rounded-full font-bold text-base shadow-lg"
//             onClick={handleSearch}
//           >
//             <icons.Search className="w-5 h-5 mr-2" />
//             SEARCH
//           </ui.Button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Hotel;


import { ui, icons } from "@/index";
import { CompanyDropdown } from "@/Homepage/components/HCompanyDropdown";
import { CombinedDateSelector } from "@/Homepage/components/CombinedDateSelector";
import { CitySelector } from "@/Homepage/components/CitySelector";
import { GuestsSelector } from "@/Homepage/components/GuestsSelector";
import { useHotelSearch } from "@/common/hooks/useHotelSearch";

const Hotel: React.FC = () => {
  const {
    // Company
    company, setCompany, companies,
    showCompanyDropdown, setShowCompanyDropdown, loadingCompanies,
    
    // City
    city, setCity, cities,
    showCityDropdown, setShowCityDropdown, loadingCities,
    
    // Dates
    checkInDate, checkOutDate, handleCheckInChange, setCheckOutDate, today,
    
    // Guests
    rooms, setRooms, adults, setAdults, children, setChildren,
    childrenAges, setChildrenAges,  // ✅ NEW - needed for GuestsSelector
    showGuestsDropdown, setShowGuestsDropdown,
    
    // Search
    searching, searchError, executeSearch,  // ✅ NEW - search functionality
  } = useHotelSearch();

  const handleSearch = async () => {
    // Execute the search - validation is handled inside executeSearch
    await executeSearch();
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md p-6 relative pb-12">

        {/* Error Message */}
        {searchError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <icons.AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-red-700">{searchError}</span>
          </div>
        )}

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-gray-300 rounded-lg">

          {/* COMPANY */}
          <div className="border-r border-gray-300 overflow-visible">
            <CompanyDropdown
              company={company}
              setCompany={setCompany}
              companies={companies}
              showDropdown={showCompanyDropdown}
              setShowDropdown={setShowCompanyDropdown}
              loading={loadingCompanies}
            />
          </div>

          {/* CITY */}
          <div className="border-r border-gray-300 overflow-visible first:rounded-l-lg">
            <CitySelector
              city={city}
              setCity={setCity}
              cities={cities}
              showDropdown={showCityDropdown}
              setShowDropdown={setShowCityDropdown}
              loading={loadingCities}
            />
          </div>

          {/* COMBINED CHECK-IN / CHECK-OUT */}
          <div className="border-r border-gray-300 overflow-visible">
            <CombinedDateSelector
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onCheckInChange={handleCheckInChange}
              onCheckOutChange={setCheckOutDate}
              minCheckInDate={today}
              minCheckOutDate={checkInDate || today}
            />
          </div>

          {/* ROOM & GUESTS - ✅ NOW WITH CHILDREN AGES */}
          <div className="overflow-visible last:rounded-r-lg">
            <GuestsSelector
              rooms={rooms}
              setRooms={setRooms}
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              childrenAges={childrenAges}
              setChildrenAges={setChildrenAges}
              showDropdown={showGuestsDropdown}
              setShowDropdown={setShowGuestsDropdown}
            />
          </div>

        </div>

        {/* Search Button */}
        <div className="mt-6 flex justify-center">
          <ui.Button
            size="lg"
            className="bg-[#0B5CAD] hover:bg-[#094B8A] text-white px-12 py-6 rounded-full font-bold text-base shadow-lg
               disabled:cursor-not-allowed disabled:opacity-100"
              //  disabled:opacity-50
            onClick={handleSearch}
            disabled={searching}
          >
            {searching ? (
              <>
                <svg className="animate-spin w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                SEARCHING...
              </>
            ) : (
              <>
                <icons.Search className="w-5 h-5 mr-2" />
                SEARCH
              </>
            )}
          </ui.Button>
        </div>

      </div>
    </div>
  );
};

export default Hotel;

