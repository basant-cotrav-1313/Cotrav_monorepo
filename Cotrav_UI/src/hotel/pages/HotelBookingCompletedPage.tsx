
// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// import {
//   BookingHeader,
//   BookingConfirmationCard,
//   ImportantInfoSection,
//   BookingPriceSummary,
// } from '@/hotel/components';
// import { peopleApi } from '@/index';

// interface BookingDetails {
//   BookingId: string;
//   HotelName: string;
//   StarRating: number;
//   AddressLine1: string;
//   AddressLine2?: string;
//   CheckInDate: string;
//   CheckOutDate: string;
//   Rooms: Array<{
//     RoomTypeName: string;
//     Amenities?: string[];
//     CancellationPolicy?: string;
//     CancelPolicies?: any;
//   }>;
//   RateConditions?: string[];
// }

// const HotelBookingCompletedPage: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   const {
//     bookingData,
//     detailsData,
//     personData,
//     hotelsData,
//     paymentRequired,
//     hotelBooking,
//   } = location.state || {};

//   const [loader, setLoader] = useState(false);
//   const hasFetched = useRef(false);

//   const bookingDetails: BookingDetails | undefined = 
//     detailsData?.GetBookingDetailResult || 
//     detailsData?.error?.GetBookingDetailResult ||
//     detailsData?.BookResult ||
//     detailsData?.error?.BookResult;

//   const searchParams = JSON.parse(sessionStorage.getItem('hotelData_header') || '{}');

//   // All hooks must be called before any early returns
//   useEffect(() => {
//     console.log('🔍 DEBUG - Location State:', location.state);
//     console.log('🔍 DEBUG - detailsData:', detailsData);
//     console.log('🔍 DEBUG - bookingDetails:', bookingDetails);
//     console.log('🔍 DEBUG - hotelsData:', hotelsData);
//     console.log('🔍 DEBUG - hotelBooking:', hotelBooking);
//   }, [location.state, detailsData, bookingDetails, hotelsData, hotelBooking]);

//   useEffect(() => {
//     const assignBooking = async () => {
//       if (hasFetched.current || !bookingDetails) return;
//       hasFetched.current = true;

//       try {
//         if (!searchParams.booking_id || !hotelsData?.[0]) {
//           console.log('⚠️ Missing searchParams.booking_id or hotelsData');
//           return;
//         }

//         const access_token = sessionStorage.getItem('access_token');
//         if (!access_token) {
//           console.log('⚠️ Missing access_token');
//           return;
//         }

//         const inclusion = hotelsData[0].Inclusion || '';
//         const mealType = hotelsData[0].MealType || '';
//         const dailyBreakfast = inclusion.toLowerCase().includes('breakfast') ? '1' : '0';
//         const mealPlan = mealType.toLowerCase() === 'breakfast' ? '1' : '0';
//         const priceBreakup = hotelsData[0].Rooms[0].PriceBreakUp?.[0];
        
//         const payload = {
//           access_token,
//           assigned_hotel: hotelsData[0].HotelName,
//           booking_id: searchParams.booking_id,
//           assigned_hotel_address: hotelsData[0].Address,
//           assigned_room_type: hotelsData[0].Rooms[0].Name[0],
//           daily_breakfast: dailyBreakfast,
//           meal_plan: mealPlan,
//           portal_used: 'sbt',
//           is_prepaid_booking: '0',
//           is_ac_room: '0',
//           hotel_id: hotelsData[0].HotelCode,
//           room_price: priceBreakup?.RoomRate?.toString() || '',
//           vendor_taxable_amount: priceBreakup?.RoomRate?.toString() || '',
//           vendor_amount_paid_to: hotelsData[0].Rooms[0].TotalFare,
//           vendor_tax_paid_to: '0',
//           vendor_room_nights: hotelsData[0].Rooms[0].DayRates[0].length.toString(),
//           commission_earned: '',
//           vendor_invoice_comment: 'NA',
//           is_vendor_gst_applicable: '1',
//           booking_detail_result: JSON.stringify(bookingDetails),
//           cancellation_policies: JSON.stringify(bookingDetails.Rooms[0]?.CancelPolicies || []),
//           Booking_id: bookingDetails.BookingId,
//           EndUserIp: bookingData.endUserIp,
//           TokenId: bookingData.tokenId,
//           BookingMode: '5',
//           RequestType: '4',
//         };

//         const { data } = await peopleApi.assignSBTHotelBooking(payload);
        
//         if (data.success === '0') {
//           throw new Error(data.error || 'Failed to assign booking');
//         }
//         console.log('✅ Booking assigned successfully:', data);
//       } catch (error) {
//         console.error('❌ Error assigning booking:', error);
//       }
//     };

//     assignBooking();
//   }, [hotelsData, bookingDetails, searchParams, bookingData]);

//   // Now safe to do early return after all hooks
//   if (!bookingDetails) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center space-y-4">
//           <p className="text-gray-500 text-lg">No booking details available</p>
//           <button
//             onClick={() => navigate('/')}
//             className="px-6 py-2 bg-[#0B5CAD] text-white rounded-lg hover:bg-[#094B8A] transition-colors"
//           >
//             Return to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const calculateNights = (checkIn: string, checkOut: string) => {
//     if (!checkIn || !checkOut) return 0;
//     const checkInDate = new Date(checkIn);
//     const checkOutDate = new Date(checkOut);
//     const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   };

//   const basePrice = Number(
//     hotelBooking?.[0]?.Rooms?.[0]?.DayRates?.flat()?.reduce(
//       (total: number, rate: any) => total + (rate?.BasePrice || 0),
//       0
//     )
//   ) || 0;

//   const taxAmount = hotelBooking?.[0]?.Rooms?.[0]?.TotalTax || 0;
//   const totalAmount = hotelBooking?.[0]?.Rooms?.[0]?.NetAmount || 0;
//   const nights = calculateNights(
//     bookingDetails?.CheckInDate || '',
//     bookingDetails?.CheckOutDate || ''
//   );

//   const dummyRateConditions: string[] = [
//     'Free cancellation up to 24 hours before check-in',
//     'No refund for no-show',
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-50">
//       <BookingHeader
//         bookingId={bookingDetails.BookingId}
//         title="Your booking is confirmed"
//         subtitle="No need to call for hotel information"
//         status="confirmed"
//       />

//       {loader && (
//         <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-xl flex items-center gap-4">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B5CAD]" />
//             <p className="text-gray-600 text-lg">Processing...</p>
//           </div>
//         </div>
//       )}
      
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="flex-1 space-y-6">
//             <BookingConfirmationCard
//               bookingDetails={bookingDetails}
//               hotelImages={hotelsData?.[0]?.Images || []}
//               hotelMap={hotelsData?.[0]?.Map}
//               onViewMap={() => {
//                 if (!hotelsData?.[0]?.Map) return;
//                 const [lat, lng] = hotelsData[0].Map.split('|');
//                 const hotelName = hotelsData[0].HotelName || hotelsData[0].Name || 'Hotel';
//                 window.open(
//                   `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelName)}&query_place_id=${lat},${lng}`,
//                   '_blank'
//                 );
//               }}
//             />

//             <ImportantInfoSection
//               rateConditions={bookingDetails?.RateConditions ?? dummyRateConditions}
//               previewCount={4}
//             />
//           </div>

//           <div className="lg:w-96">
//             <div className="lg:sticky lg:top-6">
//               <BookingPriceSummary
//                 basePrice={basePrice}
//                 taxAmount={taxAmount}
//                 totalAmount={totalAmount}
//                 nights={nights}
//                 showBreakdown={true}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelBookingCompletedPage;



import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  BookingHeader,
  BookingConfirmationCard,
  ImportantInfoSection,
  BookingPriceSummary,
} from '@/hotel/components';
import { peopleApi } from '@/index';

interface BookingDetails {
  BookingId: string;
  HotelName: string;
  StarRating: number;
  AddressLine1: string;
  AddressLine2?: string;
  CheckInDate: string;
  CheckOutDate: string;
  Rooms: Array<{
    RoomTypeName: string;
    Amenities?: string[];
    CancellationPolicy?: string;
    CancelPolicies?: any;
  }>;
  RateConditions?: string[];
}

const HotelBookingCompletedPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    bookingData,
    detailsData,
    personData,
    hotelsData,
    paymentRequired,
    hotelBooking,
    pricing, // ✅ Add pricing from location state
  } = location.state || {};

  const [loader, setLoader] = useState(false);
  const hasFetched = useRef(false);

  const bookingDetails: BookingDetails | undefined = 
    detailsData?.GetBookingDetailResult || 
    detailsData?.error?.GetBookingDetailResult ||
    detailsData?.BookResult ||
    detailsData?.error?.BookResult;

  const searchParams = JSON.parse(sessionStorage.getItem('hotelData_header') || '{}');

  // All hooks must be called before any early returns
  useEffect(() => {
    console.log('🔍 DEBUG - Location State:', location.state);
    console.log('🔍 DEBUG - detailsData:', detailsData);
    console.log('🔍 DEBUG - bookingDetails:', bookingDetails);
    console.log('🔍 DEBUG - hotelsData:', hotelsData);
    console.log('🔍 DEBUG - hotelBooking:', hotelBooking);
    console.log('🔍 DEBUG - pricing:', pricing); // ✅ Log pricing
  }, [location.state, detailsData, bookingDetails, hotelsData, hotelBooking, pricing]);

  

  useEffect(() => {
    const assignBooking = async () => {
      if (hasFetched.current || !bookingDetails) return;
      hasFetched.current = true;

      try {
        if (!searchParams.booking_id || !hotelsData?.[0]) {
          console.log('⚠️ Missing searchParams.booking_id or hotelsData');
          return;
        }

        const access_token = sessionStorage.getItem('access_token');
        if (!access_token) {
          console.log('⚠️ Missing access_token');
          return;
        }

        const appliedMarkup = pricing?.totalMarkup || 0;

        const inclusion = hotelsData[0].Inclusion || '';
        const mealType = hotelsData[0].MealType || '';
        const dailyBreakfast = inclusion.toLowerCase().includes('breakfast') ? '1' : '0';
        const mealPlan = mealType.toLowerCase() === 'breakfast' ? '1' : '0';
        const priceBreakup = hotelsData[0].Rooms[0].PriceBreakUp?.[0];
        
        const payload = {
          access_token,
          assigned_hotel: hotelsData[0].HotelName,
          booking_id: searchParams.booking_id,
          assigned_hotel_address: hotelsData[0].Address,
          assigned_room_type: hotelsData[0].Rooms[0].Name[0],
          daily_breakfast: dailyBreakfast,
          meal_plan: mealPlan,
          portal_used: 'sbt',
          is_prepaid_booking: '0',
          is_ac_room: '0',
          hotel_id: hotelsData[0].HotelCode,
          room_price: priceBreakup?.RoomRate?.toString() || '',
          vendor_taxable_amount: priceBreakup?.RoomRate?.toString() || '',
          vendor_amount_paid_to: hotelsData[0].Rooms[0].TotalFare,
          vendor_tax_paid_to: '0',
          vendor_room_nights: hotelsData[0].Rooms[0].DayRates[0].length.toString(),
          commission_earned: '',
          vendor_invoice_comment: 'NA',
          is_vendor_gst_applicable: '1',
          booking_detail_result: JSON.stringify(bookingDetails),
          cancellation_policies: JSON.stringify(bookingDetails.Rooms[0]?.CancelPolicies || []),
          Booking_id: bookingDetails.BookingId,
          EndUserIp: bookingData.endUserIp,
          TokenId: bookingData.tokenId,
          BookingMode: '5',
          RequestType: '4',
          applied_markup: appliedMarkup.toString()
        };

        console.log("Last Booking Payload", payload)

        const { data } = await peopleApi.assignSBTHotelBooking(payload);
        
        if (data.success === '0') {
          throw new Error(data.error || 'Failed to assign booking');
        }
        console.log('✅ Booking assigned successfully:', data);
      } catch (error) {
        console.error('❌ Error assigning booking:', error);
      }
    };

    assignBooking();
  }, [hotelsData, bookingDetails, searchParams, bookingData, pricing]);

  // Now safe to do early return after all hooks
  if (!bookingDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <p className="text-gray-500 text-lg">No booking details available</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-[#0B5CAD] text-white rounded-lg hover:bg-[#094B8A] transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const calculateNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const basePrice = Number(
    hotelBooking?.[0]?.Rooms?.[0]?.DayRates?.flat()?.reduce(
      (total: number, rate: any) => total + (rate?.BasePrice || 0),
      0
    )
  ) || 0;

  const taxAmount = hotelBooking?.[0]?.Rooms?.[0]?.TotalTax || 0;
  const totalAmount = hotelBooking?.[0]?.Rooms?.[0]?.NetAmount || 0;
  const nights = calculateNights(
    bookingDetails?.CheckInDate || '',
    bookingDetails?.CheckOutDate || ''
  );

  const dummyRateConditions: string[] = [
    'Free cancellation up to 24 hours before check-in',
    'No refund for no-show',
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-50">
      <BookingHeader
        bookingId={bookingDetails.BookingId}
        title="Your booking is confirmed"
        subtitle="No need to call for hotel information"
        status="confirmed"
      />

      {loader && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl flex items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B5CAD]" />
            <p className="text-gray-600 text-lg">Processing...</p>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <BookingConfirmationCard
              bookingDetails={bookingDetails}
              hotelImages={hotelsData?.[0]?.Images || []}
              hotelMap={hotelsData?.[0]?.Map}
              onViewMap={() => {
                if (!hotelsData?.[0]?.Map) return;
                const [lat, lng] = hotelsData[0].Map.split('|');
                const hotelName = hotelsData[0].HotelName || hotelsData[0].Name || 'Hotel';
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelName)}&query_place_id=${lat},${lng}`,
                  '_blank'
                );
                
              }}
              guestCount={personData?.length}
            />

            <ImportantInfoSection
              rateConditions={bookingDetails?.RateConditions ?? dummyRateConditions}
              previewCount={4}
            />
          </div>

          <div className="lg:w-96">
            <div className="lg:sticky lg:top-6">
              <BookingPriceSummary
                basePrice={basePrice}
                taxAmount={taxAmount}
                totalAmount={totalAmount}
                nights={nights}
                showBreakdown={true}
                pricing={pricing} // ✅ Pass pricing to component
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingCompletedPage;
