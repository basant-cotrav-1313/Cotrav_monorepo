
import { useState, useMemo, useCallback, useEffect } from 'react';
import * as hotelApi from '@/hotel/api/hotel.api'
import * as peopleApi from '@/hotel/api/people.api'
import * as formTypes from '@/hotel/types/form.types'
import * as hotelUtils from '@/hotel/utils/hotel.utils'
import * as hotelTypes from '@/hotel/types/hotel'


export const useHotelBootstrap = () => {
  const [loader, setLoader] = useState(false);
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);

  const [hotelDetails, setHotelDetails] = useState<hotelTypes.Hotel[]>(() => {
    const storedData = sessionStorage.getItem('hotelDetails');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [searchParams, setSearchParams] = useState<hotelTypes.HotelSearchParams | null>(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    return storedParams ? JSON.parse(storedParams) : null;
  });

  const [hotelSearchData, setHotelSearchData] = useState<{ hotelcityList?: hotelTypes.HotelSearchItem[] }>(() =>
    JSON.parse(sessionStorage.getItem('hotelSearchData') || '{}')
  );

  const combinedHotels = useMemo(() => {
    const hotelcityList: hotelTypes.HotelSearchItem[] = hotelSearchData.hotelcityList ?? [];
    
    return hotelDetails.map((hotel) => {
      const matchedHotel = hotelcityList.find(
        (item) => item.HotelCode === hotel.HotelCode
      );
      
      return {
        ...hotel,
        ...matchedHotel,
        Rooms: matchedHotel?.Rooms || hotel.Rooms || [],
      };
    });
  }, [hotelDetails, hotelSearchData]);

  useEffect(() => {
    if (combinedHotels.length > 0) {
      console.log('=== COMBINED HOTELS CHECK ===');
      console.log('Total hotels:', combinedHotels.length);
      console.log('First hotel:', combinedHotels[0]);
      console.log('First hotel Rooms:', combinedHotels[0]?.Rooms);
      console.log('Rooms count:', combinedHotels[0]?.Rooms?.length);
    }
  }, [combinedHotels]);

  // Cities
  const [cities, setCities] = useState<formTypes.City[]>([]);

  const [city, setCity] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.city_name || '';
    }
    return '';
  });

  const [selectedCityCode, setSelectedCityCode] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.CityCode || '';
    }
    return '';
  });

  const [showDropdown2, setShowDropdown2] = useState(false);

  // Companies
  const [companies, setCompanies] = useState<string[]>([]);

  const [company, setCompany] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.corporate_name || '';
    }
    return '';
  });

  const [showDropdown, setShowDropdown] = useState(false);

  // Dates
  const [checkInDate, setCheckInDate] = useState<Date | null>(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.checkIn ? new Date(params.checkIn) : null;
    }
    return null;
  });

  const [bookNow, setBookNow] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.booknow || '';
    }
    return null;
  });
  
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.checkOut ? new Date(params.checkOut) : null;
    }
    return null;
  });

  const [isCheckInOpen, setCheckInIsOpen] = useState(false);
  const [isCheckOutOpen, setCheckOutIsOpen] = useState(false);

  // Rooms & Guests
  const [roomCount, setRoomCount] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.Rooms || 1;
    }
    return 1;
  });

  const [roomadultCount, setRoomAdultCount] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.Adults || 1;
    }
    return 1;
  });

  const [roomchildCount, setRoomChildCount] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.Children || 0;
    }
    return 0;
  });
  
  const [childrenAges, setChildrenAges] = useState<number[]>(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.ChildAge || [];
    }
    return [];
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // -----------------------------
  // Helper Functions
  // -----------------------------

  const buildRoomsArray = useCallback((
    adults: number,
    children: number,
    childrenAges: number[]
  ) => {
    let remainingAdults = adults;
    let remainingChildren = children;
    let remainingChildrenAges = [...childrenAges];

    const roomsArray: { Adults: number; Children: number; ChildrenAges: number[] | null }[] = [];
    const maxAdultsPerRoom = 8;
    const maxChildrenPerRoom = 4;

    while (remainingAdults > 0 || remainingChildren > 0) {
      const allocatedAdults = Math.min(remainingAdults, maxAdultsPerRoom);
      const allocatedChildren = Math.min(remainingChildren, maxChildrenPerRoom);
      const allocatedChildrenAges = remainingChildrenAges.slice(0, allocatedChildren);

      roomsArray.push({
        Adults: allocatedAdults,
        Children: allocatedChildren,
        ChildrenAges: allocatedChildrenAges.length > 0 ? allocatedChildrenAges : null,
      });

      remainingAdults -= allocatedAdults;
      remainingChildren -= allocatedChildren;
      remainingChildrenAges = remainingChildrenAges.slice(allocatedChildren);
    }

    return roomsArray;
  }, []);

  // -----------------------------
  // API Functions
  // -----------------------------

  const handleSelection = useCallback((
    type: 'adults' | 'children' | 'rooms',
    value: number
  ) => {
    let newRoomAdultCount = roomadultCount;
    let newRoomChildCount = roomchildCount;
    let newRoomCount = roomCount;

    if (type === 'adults') {
      newRoomAdultCount = value;
      setRoomAdultCount(value);
    } else if (type === 'children') {
      newRoomChildCount = value;
      setRoomChildCount(value);

      setChildrenAges((prevAges) => {
        if (value > prevAges.length) {
          return [...prevAges, ...new Array(value - prevAges.length).fill(0)];
        } else {
          return prevAges.slice(0, value);
        }
      });
    } else if (type === 'rooms') {
      newRoomCount = value;
      setRoomCount(value);
    }

    const totalAdults = parseInt(String(newRoomAdultCount)) || 0;
    const totalChildren = parseInt(String(newRoomChildCount)) || 0;
    const selectedRooms = parseInt(String(newRoomCount)) || 0;

    const requiredRooms = hotelUtils.calculateRequiredRooms(totalAdults, totalChildren);

    if (selectedRooms < requiredRooms) {
      setErrorMessage(
        `Minimum ${requiredRooms} rooms required based on your selection.`
      );
    } else {
      setErrorMessage('');
    }
  }, [roomadultCount, roomchildCount, roomCount]);

  const handleChildAgeChange = useCallback((index: number, age: number) => {
    const updatedAges = [...childrenAges];
    updatedAges[index] = age;
    setChildrenAges(updatedAges);
  }, [childrenAges]);

  const handleApply = useCallback(() => {
    const totalAdults = parseInt(String(roomadultCount)) || 0;
    const totalChildren = parseInt(String(roomchildCount)) || 0;
    const selectedRooms = parseInt(String(roomCount)) || 0;

    const requiredRooms = hotelUtils.calculateRequiredRooms(totalAdults, totalChildren);

    if (selectedRooms !== requiredRooms) {
      setErrorMessage(
        `Minimum ${requiredRooms} rooms required based on your selection.`
      );
      return;
    }

    if (totalChildren > 0 && childrenAges.some((age) => age === 0)) {
      setErrorMessage('Please specify ages for all children');
      return;
    }

    setErrorMessage('');
    setIsDropdownOpen(false);
  }, [roomadultCount, roomchildCount, roomCount, childrenAges]);

  const fetchCompanies = useCallback(async () => {
    if (companies.length > 0) {
      console.log(`✅ Companies already loaded (${companies.length} companies)`);
      return;
    }
    
    setCompaniesLoading(true);
    try {
      const response = await peopleApi.getCompanies<formTypes.CompaniesApiResponse>();
      if (response.data.success === '1' && Array.isArray(response.data.response.Companies)) {
        setCompanies(response.data.response.Companies.map((c: { corporate_name: string }) => c.corporate_name));
        console.log(`✅ Loaded ${response.data.response.Companies.length} companies`);
      } else {
        throw new Error('Failed to fetch companies');
      }
    } catch (error: unknown) {
      console.error('Fetch Companies Error:', error);
      throw error;
    } finally {
      setCompaniesLoading(false);
    }
  }, [companies.length]);

  const fetchCities = useCallback(async (): Promise<formTypes.City[]> => {
    // If already loaded, return cached cities
    if (cities.length > 0) {
      console.log(`✅ Cities already loaded (${cities.length} cities)`);
      return cities;
    }
    
    setCitiesLoading(true);
    try {
      const response = await hotelApi.getCities();
      const data = response.data;
      if (data.success === '1' && Array.isArray(data.response?.Cities)) {
        const loadedCities = data.response.Cities;
        setCities(loadedCities);
        console.log(`✅ Loaded ${loadedCities.length} cities`);
        console.log(loadedCities);
        return loadedCities;
      } else {
        throw new Error(data?.Status?.Description || 'Failed to fetch cities');
      }
    } catch (error: unknown) {
      console.error('Fetch Cities Error:', error);
      throw error;
    } finally {
      setCitiesLoading(false);
    }
  }, [cities]);

  // -----------------------------
  // Complete initialization and search flow
  // -----------------------------

  const initializeAndSearch = useCallback(async (
    params: hotelTypes.HotelSearchParams,
    citiesList?: formTypes.City[]
  ) => {
    setLoader(true);
    
    try {
      // Use provided cities or fall back to state
      const availableCities = citiesList || cities;
      
      console.log(`Starting initialization for: ${params.city_name}`);
      console.log(`CityCode received: "${params.CityCode}"`);
      console.log(`Available cities: ${availableCities.length}`);

      // Step 1: Set all state from params
      setSearchParams(params);
      setCity(params.city_name || '');
      setSelectedCityCode(params.CityCode || '');
      if (params.checkIn) setCheckInDate(new Date(params.checkIn));
      if (params.checkOut) setCheckOutDate(new Date(params.checkOut));
      setRoomCount(params.Rooms || 1);
      setRoomAdultCount(params.Adults || 1);
      setRoomChildCount(params.Children || 0);
      setChildrenAges(params.ChildAge || []);

      // Step 2: Validate and fix CityCode if needed
      if (!params.CityCode?.trim() || params.CityCode === "0") {
        console.log(`Invalid CityCode detected: "${params.CityCode}". Attempting lookup for city: ${params.city_name}`);
        
        if (params.city_name && availableCities.length > 0) {
          // Try exact match first
          let matchedCity = availableCities.find(
            c => c.name?.toLowerCase() === params.city_name?.toLowerCase()
          );
          
          if (matchedCity?.city_code) {
            params.CityCode = matchedCity.city_code;
            setSelectedCityCode(matchedCity.city_code);
            console.log(`Found exact match - ${params.city_name}: ${matchedCity.city_code}`);
            console.log(`Full city object:`, matchedCity);
          } else {
            // If exact match not found, try partial match
            console.log(`Exact match not found, trying partial match...`);
            matchedCity = availableCities.find(
              c => {
                const cityName = c.name?.toLowerCase() || '';
                const searchName = params.city_name?.toLowerCase() || '';
                return cityName.includes(searchName) || searchName.includes(cityName);
              }
            );
            
            if (matchedCity?.city_code) {
              params.CityCode = matchedCity.city_code;
              setSelectedCityCode(matchedCity.city_code);
              console.log(`✅ Found partial match - "${params.city_name}" matched with "${matchedCity.name}": ${matchedCity.city_code}`);
            } else {
              // Log available cities for debugging
              console.error(`❌ No match found for "${params.city_name}"`);
              console.log('Available cities (first 10):', availableCities.slice(0, 10).map(c => c.name));
              throw new Error(`Could not find a valid city code for "${params.city_name}". Please select the city again.`);
            }
          }
        } else {
          if (!params.city_name) {
            throw new Error('City name is required.');
          }
          if (availableCities.length === 0) {
            throw new Error('Cities data not loaded. Please refresh and try again.');
          }
          throw new Error('Valid city code is required. Please select a city.');
        }
      } else {
        console.log(`✅ Valid CityCode provided: ${params.CityCode}`);
      }
      
      if (!params.checkIn || !params.checkOut) {
        throw new Error('Check-in and check-out dates are required');
      }

      // Step 3: Fetch hotel codes
      console.log(`🏨 Fetching hotel codes for city: ${params.CityCode}`);
      const codesResponse = await hotelApi.getHotelCodes(params.CityCode.trim());
      const codesData = codesResponse.data;

      if (codesData.Status?.Code !== 200) {
        throw new Error(codesData.Status?.Description || 'Failed to fetch hotel codes');
      }

      const hotels = codesData.Hotels ?? [];
      if (!hotels.length) {
        throw new Error(`No hotels found for ${params.city_name || 'this city'}`);
      }

      console.log(`✅ Found ${hotels.length} hotels for ${params.city_name}`);

      // Step 4: Search hotels with the codes
      const codes = hotels.map((h: { HotelCode: string}) => h.HotelCode);
      
      const formattedCheckInDate = new Date(params.checkIn).toISOString().split('T')[0];
      const formattedCheckOutDate = new Date(params.checkOut).toISOString().split('T')[0];

      const roomsArray = buildRoomsArray(
        params.Adults || 1,
        params.Children || 0,
        params.ChildAge || []
      );

      const requestBody = {
        CheckIn: formattedCheckInDate,
        CheckOut: formattedCheckOutDate,
        HotelCodes: codes.toString(),
        GuestNationality: 'IN',
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

      console.log('🔍 Searching hotels...');
      const response = await hotelApi.searchHotels(requestBody);
      const data = response.data;

      if (data.Status?.Code !== 200) {
        throw new Error(data.Status?.Description || 'Hotel search failed');
      }

      // Step 5: Fetch and store hotel details
      const searchHotels = data.HotelResult ?? [];
      console.log(`✅ Search returned ${searchHotels.length} hotels`);
      
      const hotelCodesForDetails = searchHotels
        .map((h: { HotelCode?: string}) => h.HotelCode?.toString())
        .filter(Boolean);

      if (hotelCodesForDetails.length > 0) {
        console.log(`📋 Fetching details for ${hotelCodesForDetails.length} hotels`);
        const detailsResponse = await hotelApi.getHotelDetails(
          hotelCodesForDetails.join(',')
        );

        const detailsData = detailsResponse.data;

        if (detailsData.Status?.Code !== 200) {
          throw new Error(
            detailsData.Status?.Description || 'Failed to fetch hotel details'
          );
        }

        const details = detailsData.HotelDetails ?? [];
        
        if (details.length === 0) {
          throw new Error('No hotel details returned from API');
        }

        console.log(`✅ Successfully fetched ${details.length} hotel details`);
        setHotelDetails(details);
        sessionStorage.setItem("hotelDetails", JSON.stringify(details));
      } else {
        throw new Error('No hotel codes available for fetching details');
      }

      // Step 6: Store search results
      const payload = { hotelcityList: searchHotels };
      sessionStorage.setItem('hotelSearchData', JSON.stringify(payload));
      setHotelSearchData(payload);

      // Update sessionStorage with corrected CityCode
      sessionStorage.setItem("hotelData_header", JSON.stringify(params));

      console.log('✅ Hotel search completed successfully');
      return { success: true };
      
    } catch (error: unknown) {
      console.error('❌ Hotel initialization error:', error);
      throw error;
    } finally {
      setLoader(false);
    }
  }, [cities, buildRoomsArray]);

  // Keep the original handleSubmitForm for manual searches (uses state)
  const handleSubmitForm = useCallback(async () => {
    if (!searchParams) {
      throw new Error('Hotel search not initialized yet');
    }
    
    await initializeAndSearch(searchParams);
  }, [searchParams, initializeAndSearch]);

  return {
    loader,
    companiesLoading,
    citiesLoading,
    hotelDetails,
    combinedHotels,
    searchParams,
    cities,
    city,
    setCity,
    selectedCityCode,
    setSelectedCityCode,
    showDropdown2,
    setShowDropdown2,
    companies,
    company,
    setCompany,
    showDropdown,
    bookNow, 
    setBookNow,
    setShowDropdown,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    isCheckInOpen,
    setCheckInIsOpen,
    isCheckOutOpen,
    setCheckOutIsOpen,
    roomCount,
    roomadultCount,
    roomchildCount,
    childrenAges,
    isDropdownOpen,
    setIsDropdownOpen,
    errorMessage,
    handleSubmitForm,
    fetchCompanies,
    fetchCities,
    handleSelection,
    handleChildAgeChange,
    handleApply,
    initializeAndSearch,
  };
};
