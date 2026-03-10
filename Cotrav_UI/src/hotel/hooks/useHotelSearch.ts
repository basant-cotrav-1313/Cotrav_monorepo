import { useState } from 'react';

export const useHotelSearch = () => {
  // Company
  const [company, setCompany] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [companiesLoading, setCompaniesLoading] = useState<boolean>(false);
  const [citiesLoading, setCitiesLoading] = useState<boolean>(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const loading = false;

  const fetchCompanies = async () => {
  setCompaniesLoading(true);
  await Promise.resolve();
  setCompaniesLoading(false);
};


  // City
  const [city, setCity] = useState<any>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [selectedCityCode, setSelectedCityCode] = useState<string>('');

  const fetchCities = async () => {
  setCitiesLoading(true);
  await Promise.resolve();
  setCitiesLoading(false);
};

  // Dates
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  const [isCheckInOpen, setCheckInIsOpen] = useState(false);
  const [isCheckOutOpen, setCheckOutIsOpen] = useState(false);

  // Rooms & guests
  const [roomCount, setRoomCount] = useState<number>(1);
  const [roomadultCount, setRoomAdultCount] = useState<number>(1);
  const [roomchildCount, setRoomChildCount] = useState<number>(0);
  const [childrenAges, setChildrenAges] = useState<number[]>([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');


  // Handlers (no-op)
  const handleSubmitForm = () => {};
  const handleSelection = () => {};
  const handleChildAgeChange = () => {};
  const handleApply = () => {};

  return {
    // company
    company,
    setCompany,
    companies,
    showDropdown,
    setShowDropdown,
    fetchCompanies,
    loading,

    // city
    city,
    setCity,
    cities,
    showDropdown2,
    setShowDropdown2,
    fetchCities,
    selectedCityCode,
    setSelectedCityCode,

    // dates
    checkInDate,
    setCheckInDate,
    isCheckInOpen,
    setCheckInIsOpen,

    checkOutDate,
    setCheckOutDate,
    isCheckOutOpen,
    setCheckOutIsOpen,

    // rooms & guests
    roomCount,
    roomadultCount,
    roomchildCount,
    childrenAges,
    isDropdownOpen,
    setIsDropdownOpen,
    errorMessage,

    // actions
    handleSubmitForm,
    handleSelection,
    handleChildAgeChange,
    handleApply,
    companiesLoading,
  citiesLoading,
  };
};

