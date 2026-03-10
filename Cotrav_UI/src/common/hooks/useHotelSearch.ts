
// import { useState } from "react";
// import { useCompany, Company } from "@/common/hooks/useCompany";
// import { useCities, City } from "@/common/hooks/useCities";

// export const useHotelSearch = () => {
//   // Company
//   const [company, setCompany] = useState<Company | null>(null);
//   const { companies, loading: loadingCompanies, error: companiesError } = useCompany();
//   const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

//   // City - now using City type
//   const [city, setCity] = useState<City | null>(null);
//   const { cities, loading: loadingCities, error: citiesError } = useCities();
//   const [showCityDropdown, setShowCityDropdown] = useState(false);

//   // Dates
//   const [checkInDate, setCheckInDate] = useState<Date | null>(null);
//   const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const handleCheckInChange = (date: Date | null) => {
//     setCheckInDate(date);
//     if (date && checkOutDate && date >= checkOutDate) {
//       setCheckOutDate(null);
//     }
//   };

//   // Guests
//   const [rooms, setRooms] = useState("1");
//   const [adults, setAdults] = useState("1");
//   const [children, setChildren] = useState("0");
//   const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

//   const getSearchData = () => ({
//     company: company?.corporate_name || company?.short_name || null,
//     companyId: company?.id || null,
//     city: city?.name || null,
//     cityId: city?.id || null,
//     cityCode: city?.code || null,
//     checkInDate: checkInDate?.toISOString(),
//     checkOutDate: checkOutDate?.toISOString(),
//     rooms: parseInt(rooms),
//     adults: parseInt(adults),
//     children: parseInt(children),
//   });

//   // const resetForm = () => {
//   //   setCompany(null);
//   //   setCity(null);
//   //   setCheckInDate(null);
//   //   setCheckOutDate(null);
//   //   setRooms("1");
//   //   setAdults("2");
//   //   setChildren("0");
//   // };

//   return {
//     // Company
//     company,
//     setCompany,
//     companies,
//     showCompanyDropdown,
//     setShowCompanyDropdown,
//     loadingCompanies,
//     companiesError,

//     // City
//     city,
//     setCity,
//     cities,
//     showCityDropdown,
//     setShowCityDropdown,
//     loadingCities,
//     citiesError,

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
//     // resetForm,
//   };
// };


import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCompany, Company } from "@/common/hooks/useCompany";
import { useCities, City } from "@/common/hooks/useCities";
import * as hotelApi from "@/hotel/api/hotel.api";

// Types for search results
interface HotelSearchItem {
  HotelCode: string;
  Rooms?: any[];
  // ... other fields from search API
}

interface Hotel {
  HotelCode: string;
  // ... other fields from details API
}

interface HotelSearchParams {
  corporate_name?: string;
  city_name?: string;
  CityCode: string;
  checkIn: string;
  checkOut: string;
  Rooms: number;
  Adults: number;
  Children: number;
  ChildAge: number[];
}

export const useHotelSearch = () => {
  const navigate = useNavigate();

  // Company
  const [company, setCompany] = useState<Company | null>(null);
  const { companies, loading: loadingCompanies, error: companiesError } = useCompany();
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

  // City
  const [city, setCity] = useState<City | null>(null);
  const { cities, loading: loadingCities, error: citiesError } = useCities();
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Dates
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleCheckInChange = (date: Date | null) => {
    setCheckInDate(date);
    if (date && checkOutDate && date >= checkOutDate) {
      setCheckOutDate(null);
    }
  };

  // Guests
  const [rooms, setRooms] = useState("1");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  // Search state
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Build rooms array for API (handles max 8 adults, 4 children per room)
  const buildRoomsArray = useCallback((
    totalAdults: number,
    totalChildren: number,
    ages: number[]
  ) => {
    let remainingAdults = totalAdults;
    let remainingChildren = totalChildren;
    let remainingAges = [...ages];

    const roomsArray: { Adults: number; Children: number; ChildrenAges: number[] | null }[] = [];
    const maxAdultsPerRoom = 8;
    const maxChildrenPerRoom = 4;

    while (remainingAdults > 0 || remainingChildren > 0) {
      const allocatedAdults = Math.min(remainingAdults, maxAdultsPerRoom);
      const allocatedChildren = Math.min(remainingChildren, maxChildrenPerRoom);
      const allocatedAges = remainingAges.slice(0, allocatedChildren);

      roomsArray.push({
        Adults: allocatedAdults,
        Children: allocatedChildren,
        ChildrenAges: allocatedAges.length > 0 ? allocatedAges : null,
      });

      remainingAdults -= allocatedAdults;
      remainingChildren -= allocatedChildren;
      remainingAges = remainingAges.slice(allocatedChildren);
    }

    return roomsArray;
  }, []);

  // Validate form before search
  const validateForm = useCallback((): string | null => {
    if (!city) {
      return "Please select a city";
    }

    if (!city.tbo_city_code || city.tbo_city_code.trim() === "" || city.tbo_city_code === "0") {
      return "Invalid city selected. Please select again.";
    }

    if (!checkInDate) {
      return "Please select check-in date";
    }

    if (!checkOutDate) {
      return "Please select check-out date";
    }

    if (checkInDate < today) {
      return "Check-in date cannot be in the past";
    }

    if (checkOutDate <= checkInDate) {
      return "Check-out date must be after check-in date";
    }

    const childrenCount = parseInt(children);
    if (childrenCount > 0 && childrenAges.some(age => age === 0)) {
      return "Please select age for all children";
    }

    return null;
  }, [city, checkInDate, checkOutDate, today, children, childrenAges]);

  // Main search execution function
  const executeSearch = useCallback(async () => {
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setSearchError(validationError);
      return;
    }

    setSearching(true);
    setSearchError(null);

    try {
      // Build search params
      const searchParams: HotelSearchParams = {
        corporate_name: company?.corporate_name || company?.short_name || undefined,
        city_name: city!.name,
        // CityCode: city!.code,
        CityCode: city!.tbo_city_code,
        checkIn: checkInDate!.toISOString(),
        checkOut: checkOutDate!.toISOString(),
        Rooms: parseInt(rooms),
        Adults: parseInt(adults),
        Children: parseInt(children),
        ChildAge: childrenAges,
      };

      console.log("🔍 Starting hotel search with params:", searchParams);

      // Step 1: Get hotel codes for the city
      console.log(`🏨 Fetching hotel codes for city: ${searchParams.CityCode}`);
      const codesResponse = await hotelApi.getHotelCodes(searchParams.CityCode.trim());
      const codesData = codesResponse.data;

      if (codesData.Status?.Code !== 200) {
        throw new Error(codesData.Status?.Description || "Failed to fetch hotel codes");
      }

      const hotels = codesData.Hotels ?? [];
      if (!hotels.length) {
        throw new Error(`No hotels found in ${searchParams.city_name}`);
      }

      console.log(`✅ Found ${hotels.length} hotels in ${searchParams.city_name}`);

      // Step 2: Search for availability
      const hotelCodes = hotels.map((h: { HotelCode: string }) => h.HotelCode);
      
      const formattedCheckIn = checkInDate!.toISOString().split('T')[0];
      const formattedCheckOut = checkOutDate!.toISOString().split('T')[0];

      const roomsArray = buildRoomsArray(
        parseInt(adults),
        parseInt(children),
        childrenAges
      );

      const searchRequestBody = {
        CheckIn: formattedCheckIn,
        CheckOut: formattedCheckOut,
        HotelCodes: hotelCodes.toString(),
        GuestNationality: "IN",
        PaxRooms: roomsArray,
        ResponseTime: 23.0,
        IsDetailedResponse: true,
        Filters: {
          Refundable: false,
          NoOfRooms: 0,
          MealType: 0,
          OrderBy: 0,
          StarRating: 0,
          HotelName: null,
        },
      };

      console.log("🔍 Searching for available hotels...");
      const searchResponse = await hotelApi.searchHotels(searchRequestBody);
      const searchData = searchResponse.data;

      if (searchData.Status?.Code !== 200) {
        throw new Error(searchData.Status?.Description || "Hotel search failed");
      }

      const availableHotels: HotelSearchItem[] = searchData.HotelResult ?? [];
      console.log(`✅ Found ${availableHotels.length} hotels with availability`);

      if (availableHotels.length === 0) {
        throw new Error("No hotels available for your selected dates");
      }

      // Step 3: Fetch hotel details for available hotels
      const availableHotelCodes = availableHotels
        .map(h => h.HotelCode?.toString())
        .filter(Boolean);

      console.log(`📋 Fetching details for ${availableHotelCodes.length} hotels`);
      const detailsResponse = await hotelApi.getHotelDetails(
        availableHotelCodes.join(",")
      );

      const detailsData = detailsResponse.data;

      if (detailsData.Status?.Code !== 200) {
        throw new Error(detailsData.Status?.Description || "Failed to fetch hotel details");
      }

      const hotelDetails: Hotel[] = detailsData.HotelDetails ?? [];

      if (hotelDetails.length === 0) {
        throw new Error("No hotel details available");
      }

      console.log(`✅ Successfully fetched ${hotelDetails.length} hotel details`);

      // Step 4: Store in sessionStorage
      sessionStorage.setItem("hotelData_header", JSON.stringify(searchParams));
      sessionStorage.setItem("hotelSearchData", JSON.stringify({ hotelcityList: availableHotels }));
      sessionStorage.setItem("hotelDetails", JSON.stringify(hotelDetails));

      console.log("✅ Search completed successfully. Navigating to results...");

      // Step 5: Navigate to results page
      navigate("/hotel-search");

    } catch (error: any) {
      console.error("❌ Hotel search error:", error);
      setSearchError(error.message || "An error occurred during search. Please try again.");
    } finally {
      setSearching(false);
    }
  }, [
    city,
    checkInDate,
    checkOutDate,
    rooms,
    adults,
    children,
    childrenAges,
    company,
    validateForm,
    buildRoomsArray,
    navigate,
  ]);

  // Helper to get current form data
  const getSearchData = () => ({
    company: company?.corporate_name || company?.short_name || null,
    companyId: company?.id || null,
    city: city?.name || null,
    cityId: city?.id || null,
    // cityCode: city?.code || null,
    cityCode: city?.tbo_city_code || null,
    checkInDate: checkInDate?.toISOString() || null,
    checkOutDate: checkOutDate?.toISOString() || null,
    rooms: parseInt(rooms),
    adults: parseInt(adults),
    children: parseInt(children),
    childrenAges,
  });

  const resetForm = () => {
    setCompany(null);
    setCity(null);
    setCheckInDate(null);
    setCheckOutDate(null);
    setRooms("1");
    setAdults("1");
    setChildren("0");
    setChildrenAges([]);
    setSearchError(null);
  };

  return {
    // Company
    company,
    setCompany,
    companies,
    showCompanyDropdown,
    setShowCompanyDropdown,
    loadingCompanies,
    companiesError,

    // City
    city,
    setCity,
    cities,
    showCityDropdown,
    setShowCityDropdown,
    loadingCities,
    citiesError,

    // Dates
    checkInDate,
    checkOutDate,
    handleCheckInChange,
    setCheckOutDate,
    today,

    // Guests
    rooms,
    setRooms,
    adults,
    setAdults,
    children,
    setChildren,
    childrenAges,
    setChildrenAges,
    showGuestsDropdown,
    setShowGuestsDropdown,

    // Search
    searching,
    searchError,
    executeSearch,

    // Helpers
    getSearchData,
    resetForm,
  };
};