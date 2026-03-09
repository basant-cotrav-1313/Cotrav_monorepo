
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { hotelApi, peopleApi } from "@/index";
import * as hotelApi from '@/hotel/api/hotel.api'
import * as peopleApi from '@/hotel/api/people.api'

interface BookNowData {
  request_type: string;
  admin_id: string;
  booking_id: number;
  option_id?: number;
  hotel_code: number;
  is_self_payment: string;
  city: string;
  city_name: string;
  meal_plan: string;
  room_type_name: string;
  room_count: number;
  corporate_name: string;
  state: string;
  checkindate: string;
  checkoutdate: string;
  PassengerADT: string;
  Passengerchild: number;
  Passengerchildage: string;
  spoc_name: string;
  approver1_email: string;
  approver2_email: string;
  access_token: string;
  passengerIds: string[];
  updated_markup: string;
  markup: string;
  base_fare: number[];
  // total_fare: number;
  total_fare: string;
  country_code: string;
  passengerDetailsArray?: string;
}

export const useBookNowInitializer = () => {
  const initializedRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent double execution in React StrictMode
    if (initializedRef.current) return;
    initializedRef.current = true;

    const initialize = async () => {
      const params = new URLSearchParams(window.location.search);
      const rawData = params.get("taxivaxidata");

      console.log("🚀 Book Now - Raw URL data:", rawData);

      if (!rawData) {
        await Swal.fire({
          icon: "error",
          title: "Missing Data",
          text: "No hotel booking data found in URL",
          confirmButtonText: "Go Back"
        });
        navigate("/");
        setLoading(false);
        return;
      }

      try {
        // Step 1: Parse URL data
        setStep(1);
        const bookNowData: BookNowData = JSON.parse(decodeURIComponent(rawData));
        console.log("📋 Book Now data parsed:", bookNowData);

        // Store access token
        if (bookNowData.access_token) {
          sessionStorage.setItem("access_token", bookNowData.access_token);
        }

        // Step 2: Fetch people details
        setStep(2);
        console.log("⏳ Fetching people details...");

        if (bookNowData.passengerIds && bookNowData.passengerIds.length > 0) {
          try {
            const peopleResponse = await peopleApi.fetchPeopleDetails(
              bookNowData.passengerIds.filter(Boolean)
            );
            console.log("✅ People data fetched:", peopleResponse.data);
            sessionStorage.setItem("peopleData", JSON.stringify(peopleResponse.data));
          } catch (error) {
            console.error("❌ Failed to fetch people data:", error);
            // Continue anyway - people data is not critical for hotel search
          }
        }

        // Step 3: Search for the specific hotel
        setStep(3);
        console.log(`🔍 Searching for hotel code: ${bookNowData.hotel_code}`);

        const checkInDate = new Date(bookNowData.checkindate).toISOString().split('T')[0];
        const checkOutDate = new Date(bookNowData.checkoutdate).toISOString().split('T')[0];

        const searchPayload = {
          CheckIn: checkInDate,
          CheckOut: checkOutDate,
          HotelCodes: String(bookNowData.hotel_code),
          GuestNationality: "IN",
          PaxRooms: [
            {
              Adults: parseInt(bookNowData.PassengerADT) || 1,
              Children: bookNowData.Passengerchild || 0,
              ChildrenAges:
                bookNowData.Passengerchild > 0 && bookNowData.Passengerchildage !== "null"
                  ? JSON.parse(bookNowData.Passengerchildage)
                  : null,
            },
          ],
          ResponseTime: 23.0,
          IsDetailedResponse: true,
          Filters: {
            Refundable: false,
            NoOfRooms: 0,
            MealType: bookNowData.meal_plan || 0,
            OrderBy: 0,
            StarRating: 0,
            HotelName: null,
          },
        };

        console.log("📤 Search payload:", searchPayload);

        const searchResponse = await hotelApi.searchHotels(searchPayload);
        const searchData = searchResponse.data;

        console.log("📥 Search response:", searchData);

        if (searchData.Status?.Code !== 200) {
          throw new Error(searchData.Status?.Description || "Hotel search failed");
        }

        const hotelResult = searchData.HotelResult?.[0];

        if (!hotelResult) {
          throw new Error("No hotel found with the given code");
        }

        console.log("✅ Hotel search result:", hotelResult);

        // Step 4: Fetch detailed hotel information
        setStep(4);
        console.log("📋 Fetching hotel details...");

        const detailsResponse = await hotelApi.getHotelDetails(
          String(bookNowData.hotel_code)
        );
        const detailsData = detailsResponse.data;

        if (detailsData.Status?.Code !== 200) {
          throw new Error(detailsData.Status?.Description || "Failed to fetch hotel details");
        }

        const hotelDetails = detailsData.HotelDetails?.[0];

        if (!hotelDetails) {
          throw new Error("No hotel details returned");
        }

        console.log("✅ Hotel details fetched:", hotelDetails);

        // Step 5: Merge search result with details
        setStep(5);
        console.log("🔗 Merging hotel data...");

        const mergedHotelData = {
          ...hotelResult,
          ...hotelDetails,
        };

        console.log("✅ Merged hotel data:", mergedHotelData);

        // Store data in sessionStorage
        const searchParams = {
          checkIn: bookNowData.checkindate,
          checkOut: bookNowData.checkoutdate,
          Rooms: String(bookNowData.room_count || 1),
          Adults: bookNowData.PassengerADT,
          Children: bookNowData.Passengerchild,
          ChildAge: bookNowData.Passengerchildage !== "null"
            ? JSON.parse(bookNowData.Passengerchildage)
            : [],
          CityCode: bookNowData.city,
          city_name: bookNowData.city_name,
          spoc_name: bookNowData.spoc_name,
          approver1_email: bookNowData.approver1_email,
          approver2_email: bookNowData.approver2_email,
          corporate_name: bookNowData.corporate_name,
          booking_id: bookNowData.booking_id,
          admin_id: bookNowData.admin_id,
          is_self_payment: bookNowData.is_self_payment,
          booknow: "1",
           markup: bookNowData.markup,
          base_fare: bookNowData.base_fare,
          total_fare: bookNowData.total_fare,
          option_id: bookNowData.option_id,
          hotel_code: bookNowData.hotel_code,
          meal_plan: bookNowData.meal_plan,
          room_type_name: bookNowData.room_type_name,
          state: bookNowData.state,
          country_code: bookNowData.country_code,
          request_type: bookNowData.request_type,
          passengerDetailsArray: bookNowData.passengerDetailsArray,  
          passengerIds: bookNowData.passengerIds, 

        };

        sessionStorage.setItem("hotelData_header", JSON.stringify(searchParams));
        sessionStorage.setItem(
          "hotelSearchData",
          JSON.stringify({ hotelcityList: [hotelResult] })
        );
        sessionStorage.setItem("mergedHotelData", JSON.stringify(mergedHotelData));

        // console.log("✅ All steps completed!");

        // // Small delay to show step 5 completion before navigating
        // await new Promise(resolve => setTimeout(resolve, 800));

        // setLoading(false);

        // navigate("/HotelDetail", {
        //   state: {
        //     hotel: mergedHotelData,
        //     taxivaxi: bookNowData,
        //     fromBookNow: true, // Important flag!
        //   },
        // });








        // NEW CODE - BOOK NOW MARKUP FLOW
        console.log("✅ All steps completed!");

// ✅ Calculate pricing with markup (even if 0)

let pricing = null;

// if (bookNowData.updated_markup !== undefined && bookNowData.updated_markup !== null) {
if (bookNowData.markup !== undefined && bookNowData.markup !== null) {
  const checkIn = new Date(bookNowData.checkindate);
  const checkOut = new Date(bookNowData.checkoutdate);
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  
  // const totalMarkup = parseFloat(bookNowData.updated_markup) || 0;
  const totalMarkup = parseFloat(bookNowData.markup) || 0;
  // const totalFare = mergedHotelData.Rooms?.[0]?.TotalFare || 0;
  const totalFare = parseFloat(bookNowData.total_fare) || mergedHotelData.Rooms?.[0]?.TotalFare || 0;
  const markupPerNight = nights > 0 ? totalMarkup / nights : 0;
  
  pricing = {
    totalFare: totalFare,
    totalMarkup: totalMarkup,
    nights: nights,
    markupPerNight: markupPerNight,
  };
  
  console.log("✅ Pricing calculated:", pricing);
}

// Small delay to show step 5 completion before navigating
await new Promise(resolve => setTimeout(resolve, 800));

setLoading(false);

navigate("/HotelDetail", {
  state: {
    hotel: mergedHotelData,
    taxivaxi: bookNowData,
    fromBookNow: true, // Important flag!
    pricing: pricing,  // ✅ ADD THIS
  },
});

      } catch (error: unknown) {
        console.error("❌ Book Now initialization failed:", error);
        setLoading(false);

        let errorMessage = "Failed to load hotel booking";

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        await Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: errorMessage,
          confirmButtonText: "Go Back",
        });

        navigate("/");
      }
    };

    initialize();
  }, [navigate]);

  return { loading, step };
};
