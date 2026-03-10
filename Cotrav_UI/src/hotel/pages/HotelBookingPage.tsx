
// // import { reactLog } from "@/hotel/utils/logs/reactLogger";
// import React, { useState, useMemo, useEffect } from 'react';
// import { useLocation, } from 'react-router-dom';
// import { ui, components, guestDetailsTypes, hotelHooks, modals } from '@/index';
// import { v4 as uuidv4 } from "uuid";
// import axios from 'axios';

// const HotelBookingPage: React.FC = () => {

//   const logSessionId =
//     sessionStorage.getItem("logSessionId") || uuidv4();

//   sessionStorage.setItem("logSessionId", logSessionId);

//   const location = useLocation();


//   const { selectedRoom, hotel, pricing } = location.state || {};
//   const searchParams = JSON.parse(sessionStorage.getItem('hotelData_header') || '{}');

//   console.log("Slelected : ", selectedRoom)

//   // Booking hook
//   const {
//     loader: bookingLoader,
//     hotelBooking: _hotelBooking,
//     netAmount,
//     combinedHotels,
//     processBooking,
//     navigateAfterBooking,
//   } = hotelHooks.useHotelBooking({
//     hotel,
//     selectedRoom,
//     searchParams,
//     pricing,
//   });

//   // ✅ Employee data state
//   // const [employeeData, setEmployeeData] = useState<any>(null);

//   const [employeeData, setEmployeeData] = useState<any[]>([]);
  
//   const [employeeLoading, setEmployeeLoading] = useState(false);

//   // Guest details state - Initialize with empty data first
//   // const [peopleData, setPeopleData] = useState([
//   //   {
//   //     title: 'Mr',
//   //     firstName: '',
//   //     lastName: '',
//   //     email: '',
//   //     contact_no: '',
//   //     pan: '',
//   //   },
//   // ]);

//   const [peopleData, setPeopleData] = useState(() => {
//   const passengerArray = JSON.parse(searchParams.passengerDetailsArray || '[]');
//   const count = Array.isArray(passengerArray) ? passengerArray.length : 1;
  
//   return Array(count).fill(null).map(() => ({
//     title: 'Mr',
//     firstName: '',
//     lastName: '',
//     email: '',
//     contact_no: '',
//     pan: '',
//   }));
// });

//   // GST details state
//   const [gstDetails, setGstDetails] = useState({
//     gstNo: '',
//     cName: '',
//     cAddr: '',
//     contactNo: '',
//     email: '',
//   });

//   const [showGSTDetails, setShowGSTDetails] = useState(false);
//   const [errors, setErrors] = useState<any>({});
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [showInclusionModal, setShowInclusionModal] = useState(false);


//   // ✅ Fetch employee details on mount
//   useEffect(() => {
//     const fetchEmployeeDetails = async () => {
//       try {
//         const passengerDetailsArray = searchParams.passengerDetailsArray;

//         if (!passengerDetailsArray) {
//           console.log('No passengerDetailsArray found');
//           return;
//         }

//         // let employeeId: string;
//         let employeeIds: string[];

//         try {
//           const parsed = JSON.parse(passengerDetailsArray);
//           employeeIds = Array.isArray(parsed) ? parsed : [parsed];
//         } catch {
//           employeeIds = [String(passengerDetailsArray)];
//         }

//         if (!employeeIds) {
//           console.log('No employee ID found');
//           return;
//         }

        
//         console.log('Fetching employee details for IDs:', employeeIds);


//         setEmployeeLoading(true);

//         const payload = new URLSearchParams();
//         // payload.append('employee_id[]', employeeId);
//         employeeIds.forEach(id => {
//         payload.append('employee_id[]', String(id));
//         });

//         //         reactLog("EMPLOYEE_API_REQUEST", {
//         //   sessionId: logSessionId,
//         //   api: "/api/flights/employeeByTaxivaxi",
//         //   employeeId,
//         // });

//         const response = await axios.post(
//           'https://demo.taxivaxi.com/api/flights/employeeByTaxivaxi',
//           payload,
//           {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//             },
//           }
//         );

//         //         reactLog("EMPLOYEE_API_RESPONSE", {
//         //   sessionId: logSessionId,
//         //   api: "/api/flights/employeeByTaxivaxi",
//         //   response: response.data,
//         // });

//         console.log('Employee data received:', response.data);

//         // Extract the first employee from the result array
//         if (response.data?.success === "1" && response.data?.result) {
//   setEmployeeData(response.data.result); // Store entire array
// }

//       } catch (error) {

//         //         reactLog("EMPLOYEE_API_ERROR", {
//         //   sessionId: logSessionId,
//         //   api: "/api/flights/employeeByTaxivaxi",
//         //   error: axios.isAxiosError(error)
//         //     ? {
//         //         status: error.response?.status,
//         //         data: error.response?.data,
//         //       }
//         //     : String(error),
//         // });


//         if (axios.isAxiosError(error)) {
//           console.error('Axios error fetching employee details:', {
//             message: error.message,
//             status: error.response?.status,
//             data: error.response?.data,
//           });
//         } else {
//           console.error('Error fetching employee details:', error);
//         }
//       } finally {
//         setEmployeeLoading(false);
//       }
//     };

//     fetchEmployeeDetails();
//   }, [searchParams.passengerDetailsArray]);

 


// useEffect(() => {
//   if (employeeData && employeeData.length > 0) {
//     setPeopleData(employeeData.map((employee, index) => {
//       const fullName = employee.people_name || '';
//       const nameParts = fullName.trim().split(' ');
//       let firstName = nameParts[0] || '';
//       let lastName = nameParts.slice(1).join(' ') || '';

//       // ✅ Handle empty first name or last name
//       if (!firstName && lastName) {
//         // If first name is empty but last name exists, copy last name to first name
//         firstName = lastName;
//       } else if (firstName && !lastName) {
//         // If last name is empty but first name exists, copy first name to last name
//         lastName = firstName;
//       } else if (!firstName && !lastName) {
//         // If both are empty, use full name as fallback
//         firstName = fullName.trim() || 'Guest';
//         lastName = fullName.trim() || 'Guest';
//       }

//       let title = 'Mr';
//       if (employee.gender === 'Female') {
//         title = 'Ms';
//       } else if (employee.gender === 'Male') {
//         title = 'Mr';
//       }

//       return {
//         title: title,
//         firstName: firstName,
//         lastName: lastName,
//         email: employee.people_email || searchParams.approver1 || '',
//         contact_no: employee.people_contact || '',
//         pan: '',
//       };
//     }));

//     console.log('Auto-filled data for', employeeData.length, 'passengers');
//   }
// }, [employeeData, searchParams.approver1]);

// console.log("Data aaa gayay: ",peopleData)

//   // Calculate nights
//   // const nights = useMemo(() => {
//   //   if (searchParams.checkIn && searchParams.checkOut) {
//   //     const checkIn = new Date(searchParams.checkIn);
//   //     const checkOut = new Date(searchParams.checkOut);
//   //     const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
//   //     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   //   }
//   //   return 0;
//   // }, [searchParams.checkIn, searchParams.checkOut]);

//   // Calculate nights
// const nights = useMemo(() => {
//   return selectedRoom?.DayRates?.[0]?.length || 0;
// }, [selectedRoom]);

//   // Extract check-in and check-out times
//   const { checkInTime, checkOutTime } = useMemo(() => {
//     const conditions = hotel?.RateConditions || [];

//     const checkInCondition = conditions.find((condition: string) =>
//       condition.includes('CheckIn Time-Begin:') || condition.includes('Check-In Time')
//     );
//     const checkOutCondition = conditions.find((condition: string) =>
//       condition.includes('CheckOut Time:') || condition.includes('Check-Out Time')
//     );

//     return {
//       checkInTime: checkInCondition
//         ? checkInCondition.replace(/CheckIn Time-Begin:|Check-In Time:/gi, '').trim()
//         : '',
//       checkOutTime: checkOutCondition
//         ? checkOutCondition.replace(/CheckOut Time:|Check-Out Time:/gi, '').trim()
//         : '',
//     };
//   }, [hotel?.RateConditions]);

// // This is ONLY for displaying to user, NOT for API
// // const finalTotalPrice = useMemo(() => {
// //   if (!pricing) {
// //     return netAmount;
// //   }
  
// //   // Display price with markup
// //   return netAmount + pricing.totalMarkup;
// // }, [pricing, netAmount]);

// const finalTotalPrice = useMemo(() => {
//   if (!pricing) return netAmount;
//   return pricing.totalFare;  // ✅ already includes GST calculated in HotelDetailPage
// }, [pricing, netAmount]);

//   // Handlers
//   const handleGuestChange = <K extends keyof guestDetailsTypes.GuestData>(
//     index: number,
//     field: K,
//     value: guestDetailsTypes.GuestData[K]
//   ) => {
//     setPeopleData((prev) =>
//       prev.map((person, i) =>
//         i === index ? { ...person, [field]: value } : person
//       )
//     );

//     setErrors((prev: any) => {
//       const copy = { ...prev };
//       if (copy[index]) {
//         copy[index][field] = '';
//       }
//       return copy;
//     });
//   };

//   // const handleGSTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const { name, value } = e.target;
//   //   setGstDetails((prev) => ({ ...prev, [name]: value }));

//   //   setErrors((prev: any) => ({
//   //     ...prev,
//   //     [name]: value.trim() ? '' : prev[name],
//   //   }));
//   // };

//   const handleGSTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value } = e.target;
  
//   // ✅ Special handling for contactNo - only allow numbers and max 10 digits
//   if (name === 'contactNo') {
//     // Remove all non-digit characters
//     const numericValue = value.replace(/\D/g, '');
    
//     // Limit to 10 digits
//     const limitedValue = numericValue.slice(0, 10);
    
//     setGstDetails((prev) => ({ ...prev, [name]: limitedValue }));
    
//     // Clear error if valid
//     setErrors((prev: any) => ({
//       ...prev,
//       [name]: limitedValue.length === 10 ? '' : prev[name],
//     }));
//   } else {
//     // For other fields, handle normally
//     setGstDetails((prev) => ({ ...prev, [name]: value }));
    
//     setErrors((prev: any) => ({
//       ...prev,
//       [name]: value.trim() ? '' : prev[name],
//     }));
//   }
// };

//   const validateForm = () => {
//     const newErrors: any = {};

//     // Validate people data
//     peopleData.forEach((person, index) => {
//       const personErrors: any = {};
//       if (!person.firstName) personErrors.firstName = 'First name is required.';
//       if (!person.lastName) personErrors.lastName = 'Last name is required.';
//       if (!person.email) {
//         personErrors.email = 'Email is required.';
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email)) {
//         personErrors.email = 'Invalid email format.';
//       }
//       if (!person.contact_no) {
//         personErrors.contact_no = 'Contact number is required.';
//       } else {
//         const phoneNumberOnly = person.contact_no.replace(/\D/g, '').slice(-10);
//         if (phoneNumberOnly.length !== 10) {
//           personErrors.contact_no = 'Contact number must be 10 digits.';
//         }
//       }

//       // if (!person.pan) {
//       //   personErrors.pan = 'PAN is required for international bookings.';
//       // } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(person.pan)) {
//       //   personErrors.pan = 'Invalid PAN format (e.g., ABCDE1234F).';
//       // }

//       if (searchParams.country_code !== "IN") {
//         if (!person.pan) {
//           personErrors.pan = 'PAN is required for international bookings.';
//         } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(person.pan)) {
//           personErrors.pan = 'Invalid PAN format (e.g., ABCDE1234F).';
//         }
//       }

//       if (Object.keys(personErrors).length > 0) {
//         newErrors[index] = personErrors;
//       }
//     });

//     // Validate GST details if enabled
//     if (showGSTDetails) {
//       if (!gstDetails.gstNo) {
//         newErrors.gstNo = 'GST Number is required.';
//       } else if (!/^[0-9A-Z]{15}$/i.test(gstDetails.gstNo)) {
//         newErrors.gstNo = 'Invalid GST Number. Must be 15 alphanumeric characters.';
//       }
//       if (!gstDetails.cName) newErrors.cName = 'Company Name is required.';
//       if (!gstDetails.cAddr) newErrors.cAddr = 'Company Address is required.';

//         if (!gstDetails.contactNo) {
//     newErrors.contactNo = 'Contact Number is required.';
//   } else if (!/^\d{10}$/.test(gstDetails.contactNo)) {
//     newErrors.contactNo = 'Contact Number must be exactly 10 digits.';
//   }

  
//       if (!gstDetails.email) {
//         newErrors.email = 'Email is required.';
//       } else if (!/^\S+@\S+\.\S+$/.test(gstDetails.email)) {
//         newErrors.email = 'Invalid email format.';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validateForm()) {
//       //     reactLog("FORM_VALIDATION_FAILED", {
//       //   sessionId: logSessionId,
//       //   errors,
//       // });
//       return;
//     }
//     setShowConfirmModal(true);
//   };

//   // Handle confirm booking
//   const handleConfirmBooking = async () => {
//     setShowConfirmModal(false);

//     console.log('📤 SENDING NetAmount to API:', finalTotalPrice);
// console.log('Type of NetAmount:', typeof finalTotalPrice);

//     try {
//       const payload = {
//         BookingCode: selectedRoom.BookingCode,
//         IsVoucherBooking: true,
//         GuestNationality: 'IN',
//         EndUserIp: '192.168.11.120',
//         RequestedBookingMode: 5,
//         NetAmount: netAmount,
//         HotelRoomsDetails: [
//           {
//             HotelPassenger: peopleData.map((passenger) => {
//               const phoneDigits = passenger.contact_no?.replace(/\D/g, '') || '';
//               const phoneNumber = phoneDigits.slice(-10);

//               return {
//                 Title: passenger.title || 'Mr',
//                 FirstName: passenger.firstName,
//                 LastName: passenger.lastName,
//                 Email: passenger.email || null,
//                 PaxType: 1,
//                 LeadPassenger: true,
//                 Age: 0,
//                 PassportNo: null,
//                 PassportIssueDate: null,
//                 PassportExpDate: null,
//                 Phoneno: phoneNumber || null,
//                 PaxId: 0,
//                 GSTCompanyAddress: gstDetails?.cAddr || null,
//                 GSTCompanyContactNumber: gstDetails?.contactNo || null,
//                 GSTCompanyName: gstDetails?.cName || null,
//                 GSTNumber: gstDetails?.gstNo || null,
//                 GSTCompanyEmail: gstDetails?.email || null,
//                 // PAN: passenger.pan || 'GPHPB7680K',
//                 PAN: searchParams.country_code === "IN" ? null : (passenger.pan || null),
//               };
//             }),
//           },
//         ],
//       };

//       console.log('═══════════════════════════════════════');
//       console.log('🚀 BOOKING PAYLOAD BEING SENT:');
//       console.log('═══════════════════════════════════════');
//       console.log('Full Payload:', JSON.stringify(payload, null, 2));
//       console.log('───────────────────────────────────────');
//       console.log('Employee Data (from API):', employeeData);
//       console.log('───────────────────────────────────────');
//       console.log('People Data (Form State):', peopleData);
//       console.log('───────────────────────────────────────');
//       console.log('GST Details:', gstDetails);
//       console.log('═══════════════════════════════════════');

//       //       reactLog("HOTEL_BOOKING_REQUEST", {
//       //   sessionId: logSessionId,
//       //   bookingCode: selectedRoom.BookingCode,
//       //   payload: {
//       //     ...payload,
//       //     HotelRoomsDetails: "MASKED", // avoid heavy data
//       //   },
//       // });

//       const result = await processBooking(payload);

//       //       reactLog("HOTEL_BOOKING_SUCCESS", {
//       //   sessionId: logSessionId,
//       //   bookingResult: result.bookingResult,
//       // });


//       if (result.success) {
//         navigateAfterBooking(
//           result.bookingResult,
//           result.bookingDetails,
//           peopleData
//         );
//       }
//     } catch (error) {
//       console.error('Booking failed:', error);
//       //       reactLog("HOTEL_BOOKING_FAILED", {
//       //   sessionId: logSessionId,
//       //   error: String(error),
//       // });
//     }
//   };

//   if (!hotel || !selectedRoom) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-500">No hotel data available</p>
//       </div>
//     );
//   }

//   const currentHotel = combinedHotels.length > 0 ? combinedHotels[0] : hotel;

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-50">
//       {/* Header */}
//       <div className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] py-6">
//         <div className="max-w-7xl mx-auto px-4">
//           <h1 className="text-2xl font-bold text-white">Review your Booking</h1>
//         </div>
//       </div>

//       {/* Loading Screen */}
//       {(bookingLoader || employeeLoading) && (
//         <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-xl p-12 flex flex-col items-center gap-6 max-w-sm w-full">
//             <img
//               src="/gifs/cotravloader.gif"
//               alt="Loading"
//               className="w-24 h-24 object-contain"
//             />
//             <div className="text-center space-y-2">
//               <p className="text-gray-900 text-xl font-semibold">
//                 {employeeLoading
//                   ? 'Loading Employee Details'
//                   : netAmount === 0
//                     ? 'Retrieving Details'
//                     : 'Processing Booking'}
//               </p>
//               <p className="text-gray-500 text-sm">Please wait a moment</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <modals.BookingConfirmationModal
//         isOpen={showConfirmModal}
//         onClose={() => setShowConfirmModal(false)}
//         onConfirm={handleConfirmBooking}
//         hotelData={{
//           name: currentHotel.HotelName,
//           address: currentHotel.Address
//         }}
//         roomData={{
//           name: Array.isArray(selectedRoom.Name) ? selectedRoom.Name[0] : selectedRoom.Name,
//           mealType: selectedRoom.MealType
//         }}
//         // guestData={{

//         //   title: peopleData[0]?.title,
//         //   firstName: peopleData[0]?.firstName,
//         //   lastName: peopleData[0]?.lastName,
//         //   email: peopleData[0]?.email,
//         //   contact_no: peopleData[0]?.contact_no,
//         // }}

//         guestData={peopleData}  
//         bookingDetails={{
//           // netAmount: netAmount,
//           netAmount: finalTotalPrice,
//           nights: nights,
//           checkIn: searchParams.checkIn,
//           checkOut: searchParams.checkOut
//         }}
//         isLoading={bookingLoader}
//         room={selectedRoom} 
//         pricing={pricing}
//       />

//       <modals.InclusionModal
//   isOpen={showInclusionModal}
//   onClose={() => setShowInclusionModal(false)}
//   selectedRoom={selectedRoom}
//   hotel={currentHotel}
// />

//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left Column - Main Content */}
//           <div className="bg-white pt-0 pb-4 px-4 flex-1 space-y-6">
//             {/* Hotel Booking Summary */}
//             <components.HotelBookingSummary
//               hotelName={currentHotel.HotelName}
//               hotelRating={currentHotel.HotelRating}
//               address={currentHotel.Address}
//               selectedRoom={selectedRoom}
//               searchParams={searchParams}
//               nights={nights}
//               checkInTime={checkInTime}
//               checkOutTime={checkOutTime}
//               onSeeInclusion={() => setShowInclusionModal(true)}
//             />

//             {/* Important Information */}
//             <components.HotelImportantInfo
//               rateConditions={currentHotel.RateConditions || []}
//               previewCount={4}
//             />

//             {/* Guest Details Form - ✅ All fields disabled except PAN */}
//             <components.GuestDetailsForm
//               peopleData={peopleData}
//               gstDetails={gstDetails}
//               showGSTDetails={showGSTDetails}
//               errors={errors}
//               onGuestChange={handleGuestChange}
//               onGSTChange={handleGSTChange}
//               onGSTToggle={setShowGSTDetails}
//               // disabled={true} // All fields disabled except PAN
//               disableGuestFields={true}  // Only guest fields disabled (except PAN)
//   disableGSTFields={false}   // GST fields should be editable

//               country_code={searchParams.country_code}
//             />

//             {/* Submit Button */}
//             <div className="flex justify-end">
//               <ui.Button
//                 onClick={handleSubmit}
//                 disabled={bookingLoader || employeeLoading}
//                 className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {bookingLoader ? 'Processing...' : 'Confirm Booking'}
//               </ui.Button>
//             </div>
//           </div>

//           {/* Right Column - Price Breakdown (Sticky) */}
//           <div className="lg:w-96">
//             <div className="lg:sticky lg:top-6">
//               <components.PriceSummary room={selectedRoom} nights={nights} pricing={pricing} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelBookingPage;



// // import { reactLog } from "@/hotel/utils/logs/reactLogger";
// import React, { useState, useMemo, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { ui, components, guestDetailsTypes, hotelHooks, modals } from '@/index';
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';
// import { useHotelGST } from '@/hotel/hooks/useHotelGst'; // ✅ NEW

// const HotelBookingPage: React.FC = () => {

//   const logSessionId = sessionStorage.getItem('logSessionId') || uuidv4();
//   sessionStorage.setItem('logSessionId', logSessionId);

//   const location = useLocation();
//   const { selectedRoom, hotel, pricing } = location.state || {};
//   const searchParams = JSON.parse(sessionStorage.getItem('hotelData_header') || '{}');

//   console.log('Selected : ', selectedRoom);

//   // ── Booking hook ────────────────────────────────────────────────────────────
//   const {
//     loader: bookingLoader,
//     hotelBooking: _hotelBooking,
//     netAmount,
//     combinedHotels,
//     processBooking,
//     navigateAfterBooking,
//   } = hotelHooks.useHotelBooking({
//     hotel,
//     selectedRoom,
//     searchParams,
//     pricing,
//   });

//   // ── GST hook ────────────────────────────────────────────────────────────────
//   // ✅ All GST logic lives in useHotelGST — just pass searchParams
//   const {
//     taxivaxiGST,
//     clientGST,
//     isClientGSTSelected,
//     showManualGSTForm,
//     manualGSTDetails,
//     gstLoading,
//     bothEmpty: bothGSTEmpty,
//     setIsClientGSTSelected,
//     setShowManualGSTForm,
//     handleManualGSTChange,
//     resolvedGST,              // ✅ Final GST to send — already resolved by priority
//   } = useHotelGST(searchParams);

//   // ── Employee data state ─────────────────────────────────────────────────────
//   const [employeeData, setEmployeeData] = useState<any[]>([]);
//   const [employeeLoading, setEmployeeLoading] = useState(false);

//   // ── Guest details state ─────────────────────────────────────────────────────
//   const [peopleData, setPeopleData] = useState(() => {
//     const passengerArray = JSON.parse(searchParams.passengerDetailsArray || '[]');
//     const count = Array.isArray(passengerArray) ? passengerArray.length : 1;

//     return Array(count).fill(null).map(() => ({
//       title: 'Mr',
//       firstName: '',
//       lastName: '',
//       email: '',
//       contact_no: '',
//       pan: '',
//     }));
//   });

//   // ── Form UI state ───────────────────────────────────────────────────────────
//   const [errors, setErrors] = useState<any>({});
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [showInclusionModal, setShowInclusionModal] = useState(false);

//   // ── Fetch employee details on mount ────────────────────────────────────────
//   useEffect(() => {
//     const fetchEmployeeDetails = async () => {
//       try {
//         const passengerDetailsArray = searchParams.passengerDetailsArray;

//         if (!passengerDetailsArray) {
//           console.log('No passengerDetailsArray found');
//           return;
//         }

//         let employeeIds: string[];
//         try {
//           const parsed = JSON.parse(passengerDetailsArray);
//           employeeIds = Array.isArray(parsed) ? parsed : [parsed];
//         } catch {
//           employeeIds = [String(passengerDetailsArray)];
//         }

//         if (!employeeIds) {
//           console.log('No employee ID found');
//           return;
//         }

//         console.log('Fetching employee details for IDs:', employeeIds);
//         setEmployeeLoading(true);

//         const payload = new URLSearchParams();
//         employeeIds.forEach((id) => {
//           payload.append('employee_id[]', String(id));
//         });

//         const response = await axios.post(
//           'https://demo.taxivaxi.com/api/flights/employeeByTaxivaxi',
//           payload,
//           { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//         );

//         console.log('Employee data received:', response.data);

//         if (response.data?.success === '1' && response.data?.result) {
//           setEmployeeData(response.data.result);
//         }
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           console.error('Axios error fetching employee details:', {
//             message: error.message,
//             status: error.response?.status,
//             data: error.response?.data,
//           });
//         } else {
//           console.error('Error fetching employee details:', error);
//         }
//       } finally {
//         setEmployeeLoading(false);
//       }
//     };

//     fetchEmployeeDetails();
//   }, [searchParams.passengerDetailsArray]);

//   // ── Auto-fill guest form from employee data ─────────────────────────────────
//   useEffect(() => {
//     if (employeeData && employeeData.length > 0) {
//       setPeopleData(
//         employeeData.map((employee) => {
//           const fullName = employee.people_name || '';
//           const nameParts = fullName.trim().split(' ');
//           let firstName = nameParts[0] || '';
//           let lastName = nameParts.slice(1).join(' ') || '';

//           if (!firstName && lastName) {
//             firstName = lastName;
//           } else if (firstName && !lastName) {
//             lastName = firstName;
//           } else if (!firstName && !lastName) {
//             firstName = fullName.trim() || 'Guest';
//             lastName = fullName.trim() || 'Guest';
//           }

//           let title = 'Mr';
//           if (employee.gender === 'Female') title = 'Ms';
//           else if (employee.gender === 'Male') title = 'Mr';

//           return {
//             title,
//             firstName,
//             lastName,
//             email: employee.people_email || searchParams.approver1 || '',
//             contact_no: employee.people_contact || '',
//             pan: '',
//           };
//         })
//       );

//       console.log('Auto-filled data for', employeeData.length, 'passengers');
//     }
//   }, [employeeData, searchParams.approver1]);

//   // ── Calculate nights ────────────────────────────────────────────────────────
//   const nights = useMemo(() => {
//     return selectedRoom?.DayRates?.[0]?.length || 0;
//   }, [selectedRoom]);

//   // ── Extract check-in / check-out times ──────────────────────────────────────
//   const { checkInTime, checkOutTime } = useMemo(() => {
//     const conditions = hotel?.RateConditions || [];

//     const checkInCondition = conditions.find((condition: string) =>
//       condition.includes('CheckIn Time-Begin:') || condition.includes('Check-In Time')
//     );
//     const checkOutCondition = conditions.find((condition: string) =>
//       condition.includes('CheckOut Time:') || condition.includes('Check-Out Time')
//     );

//     return {
//       checkInTime: checkInCondition
//         ? checkInCondition.replace(/CheckIn Time-Begin:|Check-In Time:/gi, '').trim()
//         : '',
//       checkOutTime: checkOutCondition
//         ? checkOutCondition.replace(/CheckOut Time:|Check-Out Time:/gi, '').trim()
//         : '',
//     };
//   }, [hotel?.RateConditions]);

//   // ── Final display price ─────────────────────────────────────────────────────
//   const finalTotalPrice = useMemo(() => {
//     if (!pricing) return netAmount;
//     return pricing.totalFare;
//   }, [pricing, netAmount]);

//   // ── Handlers ────────────────────────────────────────────────────────────────
//   const handleGuestChange = <K extends keyof guestDetailsTypes.GuestData>(
//     index: number,
//     field: K,
//     value: guestDetailsTypes.GuestData[K]
//   ) => {
//     setPeopleData((prev) =>
//       prev.map((person, i) => (i === index ? { ...person, [field]: value } : person))
//     );

//     setErrors((prev: any) => {
//       const copy = { ...prev };
//       if (copy[index]) copy[index][field] = '';
//       return copy;
//     });
//   };

//   // ── Validate form ───────────────────────────────────────────────────────────
//   const validateForm = () => {
//     const newErrors: any = {};

//     // Guest fields
//     peopleData.forEach((person, index) => {
//       const personErrors: any = {};
//       if (!person.firstName) personErrors.firstName = 'First name is required.';
//       if (!person.lastName) personErrors.lastName = 'Last name is required.';
//       if (!person.email) {
//         personErrors.email = 'Email is required.';
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email)) {
//         personErrors.email = 'Invalid email format.';
//       }
//       if (!person.contact_no) {
//         personErrors.contact_no = 'Contact number is required.';
//       } else {
//         const phoneNumberOnly = person.contact_no.replace(/\D/g, '').slice(-10);
//         if (phoneNumberOnly.length !== 10) {
//           personErrors.contact_no = 'Contact number must be 10 digits.';
//         }
//       }

//       if (searchParams.country_code !== 'IN') {
//         if (!person.pan) {
//           personErrors.pan = 'PAN is required for international bookings.';
//         } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(person.pan)) {
//           personErrors.pan = 'Invalid PAN format (e.g., ABCDE1234F).';
//         }
//       }

//       if (Object.keys(personErrors).length > 0) {
//         newErrors[index] = personErrors;
//       }
//     });

//     // Manual GST validation — only when user opened the manual form
//     if (showManualGSTForm) {
//       if (!manualGSTDetails.gstNo) {
//         newErrors.gstNo = 'GST Number is required.';
//       } else if (!/^[0-9A-Z]{15}$/i.test(manualGSTDetails.gstNo)) {
//         newErrors.gstNo = 'Invalid GST Number. Must be 15 alphanumeric characters.';
//       }
//       if (!manualGSTDetails.cName) newErrors.cName = 'Company Name is required.';
//       if (!manualGSTDetails.cAddr) newErrors.cAddr = 'Company Address is required.';
//       if (!manualGSTDetails.contactNo) {
//         newErrors.contactNo = 'Contact Number is required.';
//       } else if (!/^\d{10}$/.test(manualGSTDetails.contactNo)) {
//         newErrors.contactNo = 'Contact Number must be exactly 10 digits.';
//       }
//       if (!manualGSTDetails.email) {
//         newErrors.email = 'Email is required.';
//       } else if (!/^\S+@\S+\.\S+$/.test(manualGSTDetails.email)) {
//         newErrors.email = 'Invalid email format.';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validateForm()) return;
//     setShowConfirmModal(true);
//   };

//   // ── Confirm booking ─────────────────────────────────────────────────────────
//   const handleConfirmBooking = async () => {
//     setShowConfirmModal(false);

//     console.log('📤 SENDING NetAmount to API:', finalTotalPrice);
//     console.log('📤 RESOLVED GST being sent:', resolvedGST);

//     try {
//       const payload = {
//         BookingCode: selectedRoom.BookingCode,
//         IsVoucherBooking: true,
//         GuestNationality: 'IN',
//         EndUserIp: '192.168.11.120',
//         RequestedBookingMode: 5,
//         NetAmount: netAmount,
//         HotelRoomsDetails: [
//           {
//             HotelPassenger: peopleData.map((passenger) => {
//               const phoneDigits = passenger.contact_no?.replace(/\D/g, '') || '';
//               const phoneNumber = phoneDigits.slice(-10);

//               return {
//                 Title: passenger.title || 'Mr',
//                 FirstName: passenger.firstName,
//                 LastName: passenger.lastName,
//                 Email: passenger.email || null,
//                 PaxType: 1,
//                 LeadPassenger: true,
//                 Age: 0,
//                 PassportNo: null,
//                 PassportIssueDate: null,
//                 PassportExpDate: null,
//                 Phoneno: phoneNumber || null,
//                 PaxId: 0,
//                 // ✅ Use resolvedGST from hook — handles all 5 cases automatically
//                 GSTCompanyAddress:       resolvedGST?.cAddr      || null,
//                 GSTCompanyContactNumber: resolvedGST?.contactNo  || null,
//                 GSTCompanyName:          resolvedGST?.cName      || null,
//                 GSTNumber:               resolvedGST?.gstNo      || null,
//                 GSTCompanyEmail:         resolvedGST?.email      || null,
//                 PAN: searchParams.country_code === 'IN' ? null : (passenger.pan || null),
//               };
//             }),
//           },
//         ],
//       };

//       console.log('═══════════════════════════════════════');
//       console.log('🚀 BOOKING PAYLOAD BEING SENT:');
//       console.log(JSON.stringify(payload, null, 2));
//       console.log('═══════════════════════════════════════');

//       const result = await processBooking(payload);

//       if (result.success) {
//         navigateAfterBooking(result.bookingResult, result.bookingDetails, peopleData);
//       }
//     } catch (error) {
//       console.error('Booking failed:', error);
//     }
//   };

//   // ── Guard ───────────────────────────────────────────────────────────────────
//   if (!hotel || !selectedRoom) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-500">No hotel data available</p>
//       </div>
//     );
//   }

//   const currentHotel = combinedHotels.length > 0 ? combinedHotels[0] : hotel;

//   // ── Render ──────────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-50">

//       {/* Header */}
//       <div className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] py-6">
//         <div className="max-w-7xl mx-auto px-4">
//           <h1 className="text-2xl font-bold text-white">Review your Booking</h1>
//         </div>
//       </div>

//       {/* Loading Screen */}
//       {(bookingLoader || employeeLoading || gstLoading) && (
//         <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-xl p-12 flex flex-col items-center gap-6 max-w-sm w-full">
//             <img
//               src="/gifs/cotravloader.gif"
//               alt="Loading"
//               className="w-24 h-24 object-contain"
//             />
//             <div className="text-center space-y-2">
//               <p className="text-gray-900 text-xl font-semibold">
//                 {employeeLoading
//                   ? 'Loading Employee Details'
//                   : gstLoading
//                     ? 'Loading GST Details'
//                     : netAmount === 0
//                       ? 'Retrieving Details'
//                       : 'Processing Booking'}
//               </p>
//               <p className="text-gray-500 text-sm">Please wait a moment</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       <modals.BookingConfirmationModal
//         isOpen={showConfirmModal}
//         onClose={() => setShowConfirmModal(false)}
//         onConfirm={handleConfirmBooking}
//         hotelData={{
//           name: currentHotel.HotelName,
//           address: currentHotel.Address,
//         }}
//         roomData={{
//           name: Array.isArray(selectedRoom.Name) ? selectedRoom.Name[0] : selectedRoom.Name,
//           mealType: selectedRoom.MealType,
//         }}
//         guestData={peopleData}
//         bookingDetails={{
//           netAmount: finalTotalPrice,
//           nights,
//           checkIn: searchParams.checkIn,
//           checkOut: searchParams.checkOut,
//         }}
//         isLoading={bookingLoader}
//         room={selectedRoom}
//         pricing={pricing}
//       />

//       {/* Inclusion Modal */}
//       <modals.InclusionModal
//         isOpen={showInclusionModal}
//         onClose={() => setShowInclusionModal(false)}
//         selectedRoom={selectedRoom}
//         hotel={currentHotel}
//       />

//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex flex-col lg:flex-row gap-6">

//           {/* Left Column */}
//           <div className="bg-white pt-0 pb-4 px-4 flex-1 space-y-6">

//             {/* Hotel Booking Summary */}
//             <components.HotelBookingSummary
//               hotelName={currentHotel.HotelName}
//               hotelRating={currentHotel.HotelRating}
//               address={currentHotel.Address}
//               selectedRoom={selectedRoom}
//               searchParams={searchParams}
//               nights={nights}
//               checkInTime={checkInTime}
//               checkOutTime={checkOutTime}
//               onSeeInclusion={() => setShowInclusionModal(true)}
//             />

//             {/* Important Information */}
//             <components.HotelImportantInfo
//               rateConditions={currentHotel.RateConditions || []}
//               previewCount={4}
//             />

//             {/* Guest Details Form */}
//             <components.GuestDetailsForm
//               peopleData={peopleData}
//               // ── Manual GST props (unchanged interface) ──
//               gstDetails={manualGSTDetails}
//               showGSTDetails={showManualGSTForm}
//               onGSTChange={handleManualGSTChange}
//               onGSTToggle={setShowManualGSTForm}
//               // ── New GST props from useHotelGST ──────────
//               clientGST={clientGST}
//               taxivaxiGST={taxivaxiGST}
//               isClientGSTSelected={isClientGSTSelected}
//               onClientGSTSelect={setIsClientGSTSelected}
//               bothGSTEmpty={bothGSTEmpty}
//               // ── Rest ────────────────────────────────────
//               errors={errors}
//               onGuestChange={handleGuestChange}
//               disableGuestFields={true}
//               disableGSTFields={false}
//               country_code={searchParams.country_code}
//             />

//             {/* Submit Button */}
//             <div className="flex justify-end">
//               <ui.Button
//                 onClick={handleSubmit}
//                 disabled={bookingLoader || employeeLoading || gstLoading}
//                 className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {bookingLoader ? 'Processing...' : 'Confirm Booking'}
//               </ui.Button>
//             </div>
//           </div>

//           {/* Right Column — Price Breakdown (Sticky) */}
//           <div className="lg:w-96">
//             <div className="lg:sticky lg:top-6">
//               <components.PriceSummary room={selectedRoom} nights={nights} pricing={pricing} />
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelBookingPage;



import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ui, components, guestDetailsTypes, hotelHooks, modals } from '@/index';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useHotelGST } from '@/hotel/hooks/useHotelGst'; // ✅ NEW

const HotelBookingPage: React.FC = () => {

  const logSessionId = sessionStorage.getItem('logSessionId') || uuidv4();
  sessionStorage.setItem('logSessionId', logSessionId);

  const location = useLocation();
  const { selectedRoom, hotel, pricing } = location.state || {};
  const searchParams = JSON.parse(sessionStorage.getItem('hotelData_header') || '{}');

  console.log('Selected : ', selectedRoom);

  // ── Booking hook ────────────────────────────────────────────────────────────
  const {
    loader: bookingLoader,
    hotelBooking: _hotelBooking,
    netAmount,
    combinedHotels,
    processBooking,
    navigateAfterBooking,
  } = hotelHooks.useHotelBooking({
    hotel,
    selectedRoom,
    searchParams,
    pricing,
  });

  // ── GST hook ────────────────────────────────────────────────────────────────
  const {
    taxivaxiGST,
    clientGST,
    selectedGSTOption,
    showManualGSTForm,
    manualGSTDetails,
    gstLoading,
    bothEmpty: bothGSTEmpty,
    setSelectedGSTOption,
    setShowManualGSTForm,
    handleManualGSTChange,
    resolvedGST,
  } = useHotelGST(searchParams);

  // ── Employee data ────────────────────────────────────────────────────────────
  const [employeeData, setEmployeeData] = useState<any[]>([]);
  const [employeeLoading, setEmployeeLoading] = useState(false);

  // ── Guest details ────────────────────────────────────────────────────────────
  const [peopleData, setPeopleData] = useState(() => {
    const passengerArray = JSON.parse(searchParams.passengerDetailsArray || '[]');
    const count = Array.isArray(passengerArray) ? passengerArray.length : 1;
    return Array(count).fill(null).map(() => ({
      title: 'Mr',
      firstName: '',
      lastName: '',
      email: '',
      contact_no: '',
      pan: '',
    }));
  });

  const [errors, setErrors]                     = useState<any>({});
  const [showConfirmModal, setShowConfirmModal]  = useState(false);
  const [showInclusionModal, setShowInclusionModal] = useState(false);

  // ── Fetch employee details ───────────────────────────────────────────────────
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const passengerDetailsArray = searchParams.passengerDetailsArray;
        if (!passengerDetailsArray) return;

        let employeeIds: string[];
        try {
          const parsed = JSON.parse(passengerDetailsArray);
          employeeIds = Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          employeeIds = [String(passengerDetailsArray)];
        }

        setEmployeeLoading(true);

        const payload = new URLSearchParams();
        employeeIds.forEach((id) => payload.append('employee_id[]', String(id)));

        const response = await axios.post(
          'https://demo.taxivaxi.com/api/flights/employeeByTaxivaxi',
          payload,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        if (response.data?.success === '1' && response.data?.result) {
          setEmployeeData(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching employee details:', error);
      } finally {
        setEmployeeLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [searchParams.passengerDetailsArray]);

  // ── Auto-fill guest form ─────────────────────────────────────────────────────
  useEffect(() => {
    if (employeeData?.length > 0) {
      setPeopleData(
        employeeData.map((employee) => {
          const fullName  = employee.people_name || '';
          const nameParts = fullName.trim().split(' ');
          let firstName   = nameParts[0] || '';
          let lastName    = nameParts.slice(1).join(' ') || '';

          if (!firstName && lastName)       { firstName = lastName; }
          else if (firstName && !lastName)  { lastName = firstName; }
          else if (!firstName && !lastName) { firstName = lastName = fullName.trim() || 'Guest'; }

          return {
            title:      employee.gender === 'Female' ? 'Ms' : 'Mr',
            firstName,
            lastName,
            email:      employee.people_email    || searchParams.approver1 || '',
            contact_no: employee.people_contact  || '',
            pan:        '',
          };
        })
      );
    }
  }, [employeeData, searchParams.approver1]);

  // ── Nights ───────────────────────────────────────────────────────────────────
  const nights = useMemo(() => selectedRoom?.DayRates?.[0]?.length || 0, [selectedRoom]);

  // ── Check-in / Check-out times ───────────────────────────────────────────────
  const { checkInTime, checkOutTime } = useMemo(() => {
    const conditions = hotel?.RateConditions || [];
    const checkInCondition  = conditions.find((c: string) => c.includes('CheckIn Time-Begin:')  || c.includes('Check-In Time'));
    const checkOutCondition = conditions.find((c: string) => c.includes('CheckOut Time:')        || c.includes('Check-Out Time'));
    return {
      checkInTime:  checkInCondition  ? checkInCondition.replace(/CheckIn Time-Begin:|Check-In Time:/gi, '').trim()  : '',
      checkOutTime: checkOutCondition ? checkOutCondition.replace(/CheckOut Time:|Check-Out Time:/gi, '').trim()     : '',
    };
  }, [hotel?.RateConditions]);

  // ── Display price ────────────────────────────────────────────────────────────
  const finalTotalPrice = useMemo(() => {
    if (!pricing) return netAmount;
    return pricing.totalFare;
  }, [pricing, netAmount]);

  // ── Guest change handler ─────────────────────────────────────────────────────
  const handleGuestChange = <K extends keyof guestDetailsTypes.GuestData>(
    index: number,
    field: K,
    value: guestDetailsTypes.GuestData[K]
  ) => {
    setPeopleData((prev) =>
      prev.map((person, i) => (i === index ? { ...person, [field]: value } : person))
    );
    setErrors((prev: any) => {
      const copy = { ...prev };
      if (copy[index]) copy[index][field] = '';
      return copy;
    });
  };

  // ── Validate ─────────────────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors: any = {};

    // Guest fields
    peopleData.forEach((person, index) => {
      const personErrors: any = {};
      if (!person.firstName) personErrors.firstName = 'First name is required.';
      if (!person.lastName)  personErrors.lastName  = 'Last name is required.';
      if (!person.email) {
        personErrors.email = 'Email is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email)) {
        personErrors.email = 'Invalid email format.';
      }
      if (!person.contact_no) {
        personErrors.contact_no = 'Contact number is required.';
      } else if (person.contact_no.replace(/\D/g, '').slice(-10).length !== 10) {
        personErrors.contact_no = 'Contact number must be 10 digits.';
      }
      if (searchParams.country_code !== 'IN') {
        if (!person.pan) {
          personErrors.pan = 'PAN is required for international bookings.';
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(person.pan)) {
          personErrors.pan = 'Invalid PAN format (e.g., ABCDE1234F).';
        }
      }
      if (Object.keys(personErrors).length > 0) newErrors[index] = personErrors;
    });

    // ── GST validation ───────────────────────────────────────────────────────
    // Case: both empty — manual form is required
    if (bothGSTEmpty && !manualGSTDetails.gstNo.trim()) {
      newErrors.gstRequired = 'Please fill in GST details to proceed.';
    }

    // Case: manual form is open — validate it fully
    if (showManualGSTForm) {
      if (!manualGSTDetails.gstNo) {
        newErrors.gstNo = 'GST Number is required.';
      } else if (!/^[0-9A-Z]{15}$/i.test(manualGSTDetails.gstNo)) {
        newErrors.gstNo = 'Invalid GST Number. Must be 15 alphanumeric characters.';
      }
      if (!manualGSTDetails.cName) newErrors.cName = 'Company Name is required.';
      if (!manualGSTDetails.cAddr) newErrors.cAddr = 'Company Address is required.';
      if (!manualGSTDetails.contactNo) {
        newErrors.contactNo = 'Contact Number is required.';
      } else if (!/^\d{10}$/.test(manualGSTDetails.contactNo)) {
        newErrors.contactNo = 'Contact Number must be exactly 10 digits.';
      }
      if (!manualGSTDetails.email) {
        newErrors.email = 'Email is required.';
      } else if (!/^\S+@\S+\.\S+$/.test(manualGSTDetails.email)) {
        newErrors.email = 'Invalid email format.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    // ✅ Temporary GST test log — remove after testing
    console.log('🧪 GST TEST — Selected option:', selectedGSTOption);
    console.log('🧪 GST TEST — Resolved GST:', resolvedGST);
    setShowConfirmModal(true);
  };

  // ── Confirm booking ──────────────────────────────────────────────────────────
  // const handleConfirmBooking = async () => {
  //   setShowConfirmModal(false);

  //   console.log('📤 Resolved GST being sent:', resolvedGST);
  //   console.log('📤 Selected GST option:', selectedGSTOption);

  //   try {
  //     const payload = {
  //       BookingCode: selectedRoom.BookingCode,
  //       IsVoucherBooking: true,
  //       GuestNationality: 'IN',
  //       EndUserIp: '192.168.11.120',
  //       RequestedBookingMode: 5,
  //       NetAmount: netAmount,
  //       HotelRoomsDetails: [
  //         {
  //           HotelPassenger: peopleData.map((passenger) => {
  //             const phoneNumber = passenger.contact_no?.replace(/\D/g, '').slice(-10) || '';
  //             return {
  //               Title:        passenger.title || 'Mr',
  //               FirstName:    passenger.firstName,
  //               LastName:     passenger.lastName,
  //               Email:        passenger.email     || null,
  //               PaxType:      1,
  //               LeadPassenger: true,
  //               Age:          0,
  //               PassportNo:   null,
  //               PassportIssueDate: null,
  //               PassportExpDate:   null,
  //               Phoneno:      phoneNumber || null,
  //               PaxId:        0,
  //               // ✅ resolvedGST handles all 5 cases automatically
  //               GSTCompanyAddress:       resolvedGST?.cAddr      || null,
  //               GSTCompanyContactNumber: resolvedGST?.contactNo  || null,
  //               GSTCompanyName:          resolvedGST?.cName      || null,
  //               GSTNumber:               resolvedGST?.gstNo      || null,
  //               GSTCompanyEmail:         resolvedGST?.email      || null,
  //               PAN: searchParams.country_code === 'IN' ? null : (passenger.pan || null),
  //             };
  //           }),
  //         },
  //       ],
  //     };

  //     console.log('🚀 BOOKING PAYLOAD:', JSON.stringify(payload, null, 2));
  //     // return;

  //     const result = await processBooking(payload);
  //     if (result.success) {
  //       navigateAfterBooking(result.bookingResult, result.bookingDetails, peopleData);
  //     }
  //   } catch (error) {
  //     console.error('Booking failed:', error);
  //   }
  // };


  const handleConfirmBooking = async () => {
  setShowConfirmModal(false);

  // ✅ Check if selected GST (taxivaxi/client) has all required fields
  const hasAllGSTFields =
    resolvedGST?.gstNo?.trim() &&
    resolvedGST?.cName?.trim() &&
    resolvedGST?.cAddr?.trim() &&
    resolvedGST?.contactNo?.trim() &&
    resolvedGST?.email?.trim();

  // ✅ Either send complete GST or send all null — never partial
  const gstPayload = hasAllGSTFields ? {
    GSTCompanyAddress:       resolvedGST!.cAddr,
    GSTCompanyContactNumber: resolvedGST!.contactNo,
    GSTCompanyName:          resolvedGST!.cName,
    GSTNumber:               resolvedGST!.gstNo,
    GSTCompanyEmail:         resolvedGST!.email,
  } : {
    GSTCompanyAddress:       null,
    GSTCompanyContactNumber: null,
    GSTCompanyName:          null,
    GSTNumber:               null,
    GSTCompanyEmail:         null,
  };

  try {
    const payload = {
      BookingCode: selectedRoom.BookingCode,
      IsVoucherBooking: true,
      GuestNationality: 'IN',
      EndUserIp: '192.168.11.120',
      RequestedBookingMode: 5,
      NetAmount: netAmount,
      HotelRoomsDetails: [
        {
          HotelPassenger: peopleData.map((passenger) => {
            const phoneNumber = passenger.contact_no?.replace(/\D/g, '').slice(-10) || '';
            return {
              Title:             passenger.title || 'Mr',
              FirstName:         passenger.firstName,
              LastName:          passenger.lastName,
              Email:             passenger.email || null,
              PaxType:           1,
              LeadPassenger:     true,
              Age:               0,
              PassportNo:        null,
              PassportIssueDate: null,
              PassportExpDate:   null,
              Phoneno:           phoneNumber || null,
              PaxId:             0,
              ...gstPayload, // ✅ all fields or all null
              PAN: searchParams.country_code === 'IN' ? null : (passenger.pan || null),
            };
          }),
        },
      ],
    };

    const result = await processBooking(payload);
    if (result.success) {
      navigateAfterBooking(result.bookingResult, result.bookingDetails, peopleData);
    }
  } catch (error) {
    console.error('Booking failed:', error);
  }
};

  // ── Guard ────────────────────────────────────────────────────────────────────
  if (!hotel || !selectedRoom) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No hotel data available</p>
      </div>
    );
  }

  const currentHotel = combinedHotels.length > 0 ? combinedHotels[0] : hotel;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-50">

      {/* Header */}
      <div className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">Review your Booking</h1>
        </div>
      </div>

      {/* Loading Screen */}
      {(bookingLoader || employeeLoading || gstLoading) && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-12 flex flex-col items-center gap-6 max-w-sm w-full">
            <img src="/gifs/cotravloader.gif" alt="Loading" className="w-24 h-24 object-contain" />
            <div className="text-center space-y-2">
              <p className="text-gray-900 text-xl font-semibold">
                {employeeLoading
                  ? 'Loading Employee Details'
                  : gstLoading
                    ? 'Loading GST Details'
                    : netAmount === 0
                      ? 'Retrieving Details'
                      : 'Processing Booking'}
              </p>
              <p className="text-gray-500 text-sm">Please wait a moment</p>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <modals.BookingConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmBooking}
        hotelData={{ name: currentHotel.HotelName, address: currentHotel.Address }}
        roomData={{
          name: Array.isArray(selectedRoom.Name) ? selectedRoom.Name[0] : selectedRoom.Name,
          mealType: selectedRoom.MealType,
        }}
        guestData={peopleData}
        bookingDetails={{ netAmount: finalTotalPrice, nights, checkIn: searchParams.checkIn, checkOut: searchParams.checkOut }}
        isLoading={bookingLoader}
        room={selectedRoom}
        pricing={pricing}
      />

      {/* Inclusion Modal */}
      <modals.InclusionModal
        isOpen={showInclusionModal}
        onClose={() => setShowInclusionModal(false)}
        selectedRoom={selectedRoom}
        hotel={currentHotel}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left Column */}
          <div className="bg-white pt-0 pb-4 px-4 flex-1 space-y-6">

            <components.HotelBookingSummary
              hotelName={currentHotel.HotelName}
              hotelRating={currentHotel.HotelRating}
              address={currentHotel.Address}
              selectedRoom={selectedRoom}
              searchParams={searchParams}
              nights={nights}
              checkInTime={checkInTime}
              checkOutTime={checkOutTime}
              onSeeInclusion={() => setShowInclusionModal(true)}
            />

            <components.HotelImportantInfo
              rateConditions={currentHotel.RateConditions || []}
              previewCount={4}
            />

            {/* Guest Details + GST */}
            <components.GuestDetailsForm
              peopleData={peopleData}
              // ── Manual GST (existing interface — unchanged) ──
              gstDetails={manualGSTDetails}
              showGSTDetails={showManualGSTForm}
              onGSTChange={handleManualGSTChange}
              onGSTToggle={setShowManualGSTForm}
              // ── New GST props from useHotelGST ───────────────
              taxivaxiGST={taxivaxiGST}
              clientGST={clientGST}
              selectedGSTOption={selectedGSTOption}
              onGSTOptionSelect={setSelectedGSTOption}
              bothGSTEmpty={bothGSTEmpty}
              // ── Rest ─────────────────────────────────────────
              errors={errors}
              onGuestChange={handleGuestChange}
              disableGuestFields={true}
              disableGSTFields={false}
              country_code={searchParams.country_code}
            />

            {/* Submit */}
            <div className="flex justify-end">
              <ui.Button
                onClick={handleSubmit}
                disabled={bookingLoader || employeeLoading || gstLoading}
                className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoader ? 'Processing...' : 'Confirm Booking'}
              </ui.Button>
            </div>
          </div>

          {/* Right Column — Price Breakdown */}
          <div className="lg:w-96">
            <div className="lg:sticky lg:top-6">
              <components.PriceSummary room={selectedRoom} nights={nights} pricing={pricing} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HotelBookingPage;
