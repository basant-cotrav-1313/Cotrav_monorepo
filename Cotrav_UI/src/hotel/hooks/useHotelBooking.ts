
// import { useState, useLayoutEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { alertUtils, hotelApi, bookingTypes } from '@/index';

// export const useHotelBooking = ({
//   hotel,
//   selectedRoom,
//   searchParams,
// }: bookingTypes.UseHotelBookingProps) => {
//   const navigate = useNavigate();

//   const [loader, setLoader] = useState(false);
//   const [hotelBooking, setHotelBooking] = useState<any[]>([]);
//   const [netAmount, setNetAmount] = useState<number>(0);
//   const [bookingStatus, setBookingStatus] =
//     useState<bookingTypes.BookingStatus | null>(null);

//   /* -------------------------------------------------------
//      🔁 NORMALIZER (IMPORTANT)
//   ------------------------------------------------------- */
//   const normalizeResponse = (data: any) =>
//     data?.GetBookingDetailResult ||
//     data?.error?.GetBookingDetailResult ||
//     data?.BookResult ||
//     data?.error?.BookResult;

//   /* -------------------------------------------------------
//      🔹 PRE-BOOKING
//   ------------------------------------------------------- */
//   useLayoutEffect(() => {
//     if (!hotel || !selectedRoom?.BookingCode) {
//       console.error('Hotel or BookingCode is missing!');
//       return;
//     }

//     const fetchPreBooking = async () => {
//       setLoader(true);

//       try {
//         const response = await hotelApi.preBookHotel(
//           selectedRoom.BookingCode
//         );
//         const data = response.data;

//         console.log('📦 PRE-BOOK RESPONSE:', data);

//         if (data?.Status?.Code !== 200) {
//           throw new Error(
//             data?.Status?.Description || 'Pre-booking failed'
//           );
//         }

//         const result = data?.HotelResult || [];
//         setHotelBooking(result);

//         const amount = result?.[0]?.Rooms?.[0]?.NetAmount || 0;
//         setNetAmount(amount);
//       } catch (error: any) {
//         console.error('❌ PRE-BOOK ERROR:', error);
//         await alertUtils.showErrorAlert(
//           'Error',
//           error.message || 'Failed to fetch hotel details'
//         );
//         navigate('/');
//       } finally {
//         setLoader(false);
//       }
//     };

//     fetchPreBooking();
//   }, [hotel, selectedRoom, navigate]);

//   /* -------------------------------------------------------
//      🔹 COMBINED HOTELS
//   ------------------------------------------------------- */
//   const combinedHotels = useMemo(() => {
//     if (!hotel && hotelBooking.length === 0) return [];

//     const hotelArray = hotel ? [hotel] : [];

//     return [...hotelArray, ...hotelBooking].reduce((acc, curr) => {
//       const index = acc.findIndex(
//         (item) => item.HotelCode === curr.HotelCode
//       );

//       if (index >= 0) {
//         acc[index] = { ...acc[index], ...curr };
//       } else {
//         acc.push(curr);
//       }
//       return acc;
//     }, [] as any[]);
//   }, [hotel, hotelBooking]);

//   /* -------------------------------------------------------
//      🔹 PROCESS BOOKING
//   ------------------------------------------------------- */
//   const processBooking = async (
//     payload: bookingTypes.BookingPayload
//   ) => {
//     setLoader(true);
//     // alertUtils.showLoadingAlert('Processing your booking...');

//     try {
//       /* -------- SUBMIT BOOKING -------- */
//       const bookingResponse =
//         await hotelApi.submitHotelBooking(payload);
//       const bookingData = bookingResponse.data;

//       console.log('📬 BOOKING RESPONSE:', bookingData);

//       const bookResult = normalizeResponse(bookingData);

//       if (!bookResult || bookResult?.Error?.ErrorCode !== 0) {
//         throw new Error(
//           bookResult?.Error?.ErrorMessage || 'Booking failed'
//         );
//       }

//       const bookingResult: bookingTypes.BookingResult = {
//         bookingId: bookResult.BookingId,
//         traceId: bookResult.TraceId,
//         tokenId: bookingData.tokenid,
//         endUserIp: bookingData.enduserip,
//       };

//       /* -------- GET BOOKING DETAILS -------- */
//       const detailsResponse =
//         await hotelApi.getBookingDetails({
//           EndUserIp: bookingResult.endUserIp,
//           TokenId: bookingResult.tokenId,
//           BookingId: String(bookingResult.bookingId),
//         });

//       const bookingDetails = detailsResponse.data;
//       console.log(
//         '📋 BOOKING DETAILS RESPONSE:',
//         bookingDetails
//       );

//       const bookingDetailResult =
//         normalizeResponse(bookingDetails);

//       if (!bookingDetailResult) {
//         throw new Error(
//           'Invalid booking details response'
//         );
//       }

//       const status = bookingDetailResult.Status;
//       setBookingStatus(status);

//       alertUtils.closeAlert();

//       return handleBookingStatus(
//         status,
//         bookingResult,
//         bookingDetails
//       );
//     } catch (error: any) {
//       alertUtils.closeAlert();
//       console.error('❌ BOOKING ERROR:', error);

//       await alertUtils.showErrorAlert(
//         'Booking Failed',
//         error.message || 'Something went wrong'
//       );
//       throw error;
//     } finally {
//       setLoader(false);
//     }
//   };

//   /* -------------------------------------------------------
//      🔹 HANDLE BOOKING STATUS
//   ------------------------------------------------------- */
//   const handleBookingStatus = async (
//     status: bookingTypes.BookingStatus,
//     bookingResult: bookingTypes.BookingResult,
//     bookingDetails: any
//   ) => {
//     const bookingDetailResult =
//       normalizeResponse(bookingDetails);

//     const errorMessage =
//       bookingDetailResult?.Error?.ErrorMessage ||
//       'Unknown error';

//     switch (status) {
//       case bookingTypes.BookingStatus.Confirmed:
//         console.log('✅ BOOKING CONFIRMED');
//         return {
//           success: true,
//           bookingResult,
//           bookingDetails,
//         };

//       case bookingTypes.BookingStatus.BookFailed:
//         throw new Error(`Booking failed: ${errorMessage}`);

//       case bookingTypes.BookingStatus.VerifyPrice:
//         throw new Error(
//           `Price verification needed: ${errorMessage}`
//         );

//       case bookingTypes.BookingStatus.Cancelled:
//         throw new Error(
//           `Booking cancelled: ${errorMessage}`
//         );

//       default:
//         throw new Error(
//           `Unexpected booking status: ${status}`
//         );
//     }
//   };

//   /* -------------------------------------------------------
//      🔹 NAVIGATION
//   ------------------------------------------------------- */
//   const navigateAfterBooking = (
//     bookingResult: bookingTypes.BookingResult,
//     bookingDetails: any,
//     peopleData: any[]
//   ) => {
//     const paymentType = searchParams?.is_self_payment;

//     const state = {
//       bookingData: bookingResult,
//       detailsData: bookingDetails,
//       personData: peopleData,
//       hotelsData: combinedHotels,
//       hotelBooking,
//     };

//     if (paymentType === '1') {
//       navigate('/HotelPayment', {
//         state: { ...state, paymentRequired: true },
//       });
//     } else {
//       navigate('/HotelBookingCompleted', {
//         state: { ...state, paymentRequired: false },
//       });
//     }
//   };

//   return {
//     loader,
//     hotelBooking,
//     netAmount,
//     bookingStatus,
//     combinedHotels,
//     processBooking,
//     navigateAfterBooking,
//   };
// };



import { useState, useLayoutEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as bookingTypes from '@/hotel/types/booking.types'
import * as hotelApi from '@/hotel/api/hotel.api'
import * as alertUtils from '@/hotel/utils/alert.utils'

export const useHotelBooking = ({
  hotel,
  selectedRoom,
  searchParams,
  pricing, // ✅ ADD: Accept pricing from HotelBookingPage
}: bookingTypes.UseHotelBookingProps) => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [hotelBooking, setHotelBooking] = useState<any[]>([]);
  const [netAmount, setNetAmount] = useState<number>(0);
  const [bookingStatus, setBookingStatus] =
    useState<bookingTypes.BookingStatus | null>(null);

  /* -------------------------------------------------------
     🔁 NORMALIZER (IMPORTANT)
  ------------------------------------------------------- */
  const normalizeResponse = (data: any) =>
    data?.GetBookingDetailResult ||
    data?.error?.GetBookingDetailResult ||
    data?.BookResult ||
    data?.error?.BookResult;

  /* -------------------------------------------------------
     🔹 PRE-BOOKING
  ------------------------------------------------------- */
  useLayoutEffect(() => {
    if (!hotel || !selectedRoom?.BookingCode) {
      console.error('Hotel or BookingCode is missing!');
      return;
    }

    const fetchPreBooking = async () => {
      setLoader(true);

      try {
        const response = await hotelApi.preBookHotel(
          selectedRoom.BookingCode
        );
        const data = response.data;

        console.log('📦 PRE-BOOK RESPONSE:', data);

        if (data?.Status?.Code !== 200) {
          throw new Error(
            data?.Status?.Description || 'Pre-booking failed'
          );
        }

        const result = data?.HotelResult || [];
        setHotelBooking(result);

        const amount = result?.[0]?.Rooms?.[0]?.NetAmount || 0;
        setNetAmount(amount);
      } catch (error: any) {
        console.error('❌ PRE-BOOK ERROR:', error);
        await alertUtils.showErrorAlert(
          'Error',
          error.message || 'Failed to fetch hotel details'
        );
        navigate('/');
      } finally {
        setLoader(false);
      }
    };

    fetchPreBooking();
  }, [hotel, selectedRoom, navigate]);

  /* -------------------------------------------------------
     🔹 COMBINED HOTELS
  ------------------------------------------------------- */
  const combinedHotels = useMemo(() => {
    if (!hotel && hotelBooking.length === 0) return [];

    const hotelArray = hotel ? [hotel] : [];

    return [...hotelArray, ...hotelBooking].reduce((acc, curr) => {
      const index = acc.findIndex(
        (item: any) => item.HotelCode === curr.HotelCode
      );

      if (index >= 0) {
        acc[index] = { ...acc[index], ...curr };
      } else {
        acc.push(curr);
      }
      return acc;
    }, [] as any[]);
  }, [hotel, hotelBooking]);

  /* -------------------------------------------------------
     🔹 PROCESS BOOKING
  ------------------------------------------------------- */
  const processBooking = async (
    payload: bookingTypes.BookingPayload
  ) => {
    setLoader(true);
    // alertUtils.showLoadingAlert('Processing your booking...');

    try {
      /* -------- SUBMIT BOOKING -------- */
      const bookingResponse =
        await hotelApi.submitHotelBooking(payload);
      const bookingData = bookingResponse.data;

      console.log('📬 BOOKING RESPONSE:', bookingData);

      const bookResult = normalizeResponse(bookingData);

      if (!bookResult || bookResult?.Error?.ErrorCode !== 0) {
        throw new Error(
          bookResult?.Error?.ErrorMessage || 'Booking failed'
        );
      }

      const bookingResult: bookingTypes.BookingResult = {
        bookingId: bookResult.BookingId,
        traceId: bookResult.TraceId,
        tokenId: bookingData.tokenid,
        endUserIp: bookingData.enduserip,
      };

      /* -------- GET BOOKING DETAILS -------- */
      const detailsResponse =
        await hotelApi.getBookingDetails({
          EndUserIp: bookingResult.endUserIp,
          TokenId: bookingResult.tokenId,
          BookingId: String(bookingResult.bookingId),
        });

      const bookingDetails = detailsResponse.data;
      console.log(
        '📋 BOOKING DETAILS RESPONSE:',
        bookingDetails
      );

      const bookingDetailResult =
        normalizeResponse(bookingDetails);

      if (!bookingDetailResult) {
        throw new Error(
          'Invalid booking details response'
        );
      }

      const status = bookingDetailResult.Status;
      setBookingStatus(status);

      alertUtils.closeAlert();

      return handleBookingStatus(
        status,
        bookingResult,
        bookingDetails
      );
    } catch (error: any) {
      alertUtils.closeAlert();
      console.error('❌ BOOKING ERROR:', error);

      await alertUtils.showErrorAlert(
        'Booking Failed',
        error.message || 'Something went wrong'
      );
      throw error;
    } finally {
      setLoader(false);
    }
  };

  /* -------------------------------------------------------
     🔹 HANDLE BOOKING STATUS
  ------------------------------------------------------- */
  const handleBookingStatus = async (
    status: bookingTypes.BookingStatus,
    bookingResult: bookingTypes.BookingResult,
    bookingDetails: any
  ) => {
    const bookingDetailResult =
      normalizeResponse(bookingDetails);

    const errorMessage =
      bookingDetailResult?.Error?.ErrorMessage ||
      'Unknown error';

    switch (status) {
      case bookingTypes.BookingStatus.Confirmed:
        console.log('✅ BOOKING CONFIRMED');
        return {
          success: true,
          bookingResult,
          bookingDetails,
        };

      case bookingTypes.BookingStatus.BookFailed:
        throw new Error(`Booking failed: ${errorMessage}`);

      case bookingTypes.BookingStatus.VerifyPrice:
        throw new Error(
          `Price verification needed: ${errorMessage}`
        );

      case bookingTypes.BookingStatus.Cancelled:
        throw new Error(
          `Booking cancelled: ${errorMessage}`
        );

      default:
        throw new Error(
          `Unexpected booking status: ${status}`
        );
    }
  };

  /* -------------------------------------------------------
     🔹 NAVIGATION
  ------------------------------------------------------- */
  const navigateAfterBooking = (
    bookingResult: bookingTypes.BookingResult,
    bookingDetails: any,
    peopleData: any[]
  ) => {
    const paymentType = searchParams?.is_self_payment;

    const state = {
      bookingData: bookingResult,
      detailsData: bookingDetails,
      personData: peopleData,
      hotelsData: combinedHotels,
      hotelBooking,
      pricing, // ✅ ADD: Pass pricing to next page
    };

    // if (paymentType === '1') {
    if (paymentType) {
      navigate('/HotelPayment', {
        state: { ...state, paymentRequired: true },
      });
    } else {
      navigate('/HotelBookingCompleted', {
        state: { ...state, paymentRequired: false },
      });
    }
  };

  return {
    loader,
    hotelBooking,
    netAmount,
    bookingStatus,
    combinedHotels,
    processBooking,
    navigateAfterBooking,
  };
};

