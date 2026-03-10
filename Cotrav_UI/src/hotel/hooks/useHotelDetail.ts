
// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// // import { hotelDetailsTypes, hotelTypes } from '@/index';
// import * as hotelTypes from '@/hotel/types/hotel'
// import * as hotelDetailsTypes from '@/hotel/types/hotelDetail.types'


// interface UseHotelDetailProps {
//   hotel: hotelTypes.Hotel;
//   taxivaxi?: hotelDetailsTypes.TaxivaxiData;
//   fromBookNow?: boolean;
//   pricing?: {  
//     clientPrice: number;
//     totalFare: number;
//     nights: number;
//     markupPerNight: number;
//     totalMarkup: number;
//   } | null;
// }

// export const useHotelDetail = ({
//   hotel,
//   taxivaxi = {},
//   fromBookNow = false,
//   pricing = null, 
// }: UseHotelDetailProps) => {
//   const navigate = useNavigate();

//   // -------------------- State --------------------
//   const [showModal2, setShowModal2] = useState(false);
//   const [showModal3, setShowModal3] = useState(false);
//   const [showHeader, setShowHeader] = useState(false);
//   const [activeSection, setActiveSection] =
//     useState<hotelDetailsTypes.SectionKey>('overview');
//   const [showRates, setShowRates] = useState(false);
//   const [showInfo, setShowInfo] = useState(true);

//   // -------------------- Refs --------------------
//   const overviewRef = useRef<HTMLDivElement | null>(null);
//   const roomsRef = useRef<HTMLDivElement | null>(null);
//   const locationRef = useRef<HTMLDivElement | null>(null);
//   const mapSectionRef = useRef<HTMLDivElement | null>(null);

//   // -------------------- Rooms Logic --------------------
//   const hotelRooms = hotel?.Rooms || [];

//   const filteredRooms = hotelRooms.filter((room) => {
//     const matchHotel =
//       Number(taxivaxi.hotel_code) === Number(hotel.HotelCode);

//     const matchMeal =
//       taxivaxi.meal_plan?.toLowerCase() ===
//       room.MealType?.toLowerCase();

//     const matchRoomName =
//       Array.isArray(room.Name) &&
//       room.Name.some((nm) =>
//         nm
//           .toLowerCase()
//           .includes(taxivaxi.room_type_name?.toLowerCase() || '')
//       );

//     return matchHotel && matchMeal && matchRoomName;
//   });

//   const displayRoom: hotelDetailsTypes.DisplayRoom | undefined = fromBookNow
//     ? hotelRooms[0]
//     : filteredRooms[0];

//   // -------------------- Scroll Spy --------------------
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       setShowHeader(scrollY > 200);

//       const sectionOffsets: Record<hotelDetailsTypes.SectionKey, number> = {
//         overview: overviewRef.current?.offsetTop ?? 0,
//         rooms: roomsRef.current?.offsetTop ?? 0,
//         location: locationRef.current?.offsetTop ?? 0,
//       };

//       const scrollPosition = scrollY + 100;
//       let current: hotelDetailsTypes.SectionKey = 'overview';

//       (Object.keys(sectionOffsets) as hotelDetailsTypes.SectionKey[]).forEach(
//         (section) => {
//           if (scrollPosition >= sectionOffsets[section]) {
//             current = section;
//           }
//         }
//       );

//       setActiveSection(current);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // -------------------- Scroll Helpers --------------------
//   const scrollToSection = (section: hotelDetailsTypes.SectionKey) => {
//     const refMap: Record<
//       hotelDetailsTypes.SectionKey,
//       React.RefObject<HTMLElement | null>
//     > = {
//       overview: overviewRef,
//       rooms: roomsRef,
//       location: locationRef,
//     };

//     const sectionRef = refMap[section];

//     if (sectionRef.current) {
//       window.scrollTo({
//         top: sectionRef.current.offsetTop - 80,
//         behavior: 'smooth',
//       });
//       setShowHeader(false);
//     }
//   };

//   const scrollToMap = () => {
//     mapSectionRef.current?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     });
//   };

//   // -------------------- Navigation --------------------
//   const handleSelectRoom = (room: hotelTypes.Room) => {
//     const completeHotelData = {
//       ...hotel,
//       Address: hotel.Address || hotel.CityName || '',
//       RateConditions: hotel.RateConditions || [],
//     };

//     const completeRoomData = {
//       ...room,
//       Name: room.Name || 'Standard Room',
//       MealType: room.MealType || 'Room_Only',
//       Inclusion: room.Inclusion || '',
//       CancelPolicies: room.CancelPolicies || [],
//     };

//     navigate('/HotelBooking', {
//       state: {
//         selectedRoom: completeRoomData,
//         hotel: completeHotelData,
//         pricing: pricing,
//       },
//     });
//   };

//   const handleNavigateHome = () => navigate('/');
//   const handleNavigateSearch = () => navigate('/SearchHotel');

//   // -------------------- Map --------------------
//   const getMapCenter = (): { lat: number; lng: number } => {
//     if (!hotel.Map) return { lat: 0, lng: 0 };
//     const [lat, lng] = hotel.Map.split('|').map(Number);
//     return { lat, lng };
//   };

//   // -------------------- Exposed API --------------------
//   return {
//     // State
//     showModal2,
//     setShowModal2,
//     showModal3,
//     setShowModal3,
//     showHeader,
//     activeSection,
//     showRates,
//     setShowRates,
//     showInfo,
//     setShowInfo,

//     // Refs
//     overviewRef,
//     roomsRef,
//     locationRef,
//     mapSectionRef,

//     // Data
//     displayRoom,
//     filteredRooms,
//     hotelRooms,

//     // Functions
//     scrollToSection,
//     scrollToMap,
//     handleSelectRoom,
//     handleNavigateHome,
//     handleNavigateSearch,
//     getMapCenter,
//   };
// };



import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import * as hotelTypes from '@/hotel/types/hotel'
import * as hotelDetailsTypes from '@/hotel/types/hotelDetail.types'

interface UseHotelDetailProps {
  hotel: hotelTypes.Hotel;
  taxivaxi?: hotelDetailsTypes.TaxivaxiData;
  fromBookNow?: boolean;
  pricing?: {  
    clientPrice: number;
    totalFare: number;
    nights: number;
    markupPerNight: number;
    totalMarkup: number;
  } | null;
}

export const useHotelDetail = ({
  hotel,
  taxivaxi = {},
  fromBookNow = false,
  pricing = null, 
}: UseHotelDetailProps) => {
  const navigate = useNavigate();

  // -------------------- State --------------------
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [activeSection, setActiveSection] =
    useState<hotelDetailsTypes.SectionKey>('overview');
  const [showRates, setShowRates] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  // -------------------- Refs --------------------
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const roomsRef = useRef<HTMLDivElement | null>(null);
  const locationRef = useRef<HTMLDivElement | null>(null);
  const mapSectionRef = useRef<HTMLDivElement | null>(null);

  // -------------------- Rooms Logic --------------------
  const hotelRooms = hotel?.Rooms || [];

  const filteredRooms = hotelRooms.filter((room) => {
    const matchHotel =
      Number(taxivaxi.hotel_code) === Number(hotel.HotelCode);

    const matchMeal =
      taxivaxi.meal_plan?.toLowerCase() ===
      room.MealType?.toLowerCase();

    const matchRoomName =
      Array.isArray(room.Name) &&
      room.Name.some((nm) =>
        nm
          .toLowerCase()
          .includes(taxivaxi.room_type_name?.toLowerCase() || '')
      );

    return matchHotel && matchMeal && matchRoomName;
  });

  // const displayRoom: hotelDetailsTypes.DisplayRoom | undefined = fromBookNow
  //   ? hotelRooms[0]
  //   : filteredRooms[0];

  const displayRoom: hotelDetailsTypes.DisplayRoom | undefined = fromBookNow
  ? filteredRooms[0] ?? hotelRooms[0]   // BookNow flow → try to match room, fallback to first
  : hotelRooms[0];                       // Search flow  → just show first room

  // -------------------- Scroll Spy --------------------
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowHeader(scrollY > 200);

      // Use mapSectionRef instead of locationRef
      const overviewTop = overviewRef.current?.offsetTop ?? 0;
      const roomsTop = roomsRef.current?.offsetTop ?? 0;
      const mapTop = mapSectionRef.current?.offsetTop ?? 0;

      const scrollPosition = scrollY + 100;

      // Determine active section based on scroll position
      if (roomsRef.current && scrollPosition >= roomsTop && scrollPosition < mapTop) {
        setActiveSection('rooms');
      } else if (scrollPosition >= mapTop) {
        setActiveSection('location');
      } else {
        setActiveSection('overview');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call immediately to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // -------------------- Scroll Helpers --------------------
  const scrollToSection = (section: hotelDetailsTypes.SectionKey) => {
    const refMap: Record<hotelDetailsTypes.SectionKey, React.RefObject<HTMLDivElement | null>> = {
      overview: overviewRef,
      rooms: roomsRef,
      location: mapSectionRef, // Changed from locationRef to mapSectionRef
    };

    const sectionRef = refMap[section];

    if (sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // -------------------- Navigation --------------------
  const handleSelectRoom = (room: hotelTypes.Room, finalPricing?: any) => {
    const completeHotelData = {
      ...hotel,
      Address: hotel.Address || hotel.CityName || '',
      RateConditions: hotel.RateConditions || [],
    };

    const completeRoomData = {
      ...room,
      Name: room.Name || 'Standard Room',
      MealType: room.MealType || 'Room_Only',
      Inclusion: room.Inclusion || '',
      CancelPolicies: room.CancelPolicies || [],
    };

    navigate('/HotelBooking', {
      state: {
        selectedRoom: completeRoomData,
        hotel: completeHotelData,
        // pricing: pricing,
        pricing: finalPricing ?? pricing,
      },
    });
  };

  const handleNavigateHome = () => navigate('/');
  const handleNavigateSearch = () => navigate('/SearchHotel');

  // -------------------- Map --------------------
  const getMapCenter = (): { lat: number; lng: number } => {
    if (!hotel.Map) return { lat: 0, lng: 0 };
    const [lat, lng] = hotel.Map.split('|').map(Number);
    return { lat, lng };
  };

  // -------------------- Exposed API --------------------
  return {
    // State
    showModal2,
    setShowModal2,
    showModal3,
    setShowModal3,
    showHeader,
    activeSection,
    showRates,
    setShowRates,
    showInfo,
    setShowInfo,

    // Refs
    overviewRef,
    roomsRef,
    locationRef,
    mapSectionRef,

    // Data
    displayRoom,
    filteredRooms,
    hotelRooms,

    // Functions
    scrollToSection,
    scrollToMap,
    handleSelectRoom,
    handleNavigateHome,
    handleNavigateSearch,
    getMapCenter,
  };
};
