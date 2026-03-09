
// import { useState, useCallback, useMemo, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// // import { hotelTypes, hotelUtils, hotelApi } from '@/index';
// import * as hotelTypes from '@/hotel/types/hotel'
// import * as hotelUtils from '@/hotel/utils/hotel.utils'
// import * as hotelApi from '@/hotel/api/hotel.api'

// export const useHotelShare = (searchParams: hotelTypes.HotelSearchParams | null) => {
//   const navigate = useNavigate();
//   const [selectedRooms, setSelectedRooms] = useState<hotelTypes.SelectedRoom[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Email preview modal state
//   const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
//   const [emailPreviewData, setEmailPreviewData] = useState<any>(null);
//   const [emailHtmlContent, setEmailHtmlContent] = useState('');

//   // Warning modals state
//   const [showMarkupWarning, setShowMarkupWarning] = useState(false);
//   const [markupWarningData, setMarkupWarningData] = useState<any>(null);

//   const [toEmail, setToEmail] = useState('');
//   const [toEmailList, setToEmailList] = useState<string[]>([]);

//   const [ccEmail, setCcEmail] = useState('');
//   const [ccEmailList, setCcEmailList] = useState<string[]>([]);

//   const [errors, setErrors] = useState<hotelTypes.ShareFormErrors>({});

//   const initialFormData = useMemo(() => ({
//     bookingId: searchParams?.booking_id || '',
//     // referenceNo: searchParams?.reference_no || '',
//     clientName: searchParams?.corporate_name || '',
//     spocName: searchParams?.spoc_name || '',
//     spocEmail: hotelUtils.cleanEmails(
//       [searchParams?.approver1, searchParams?.approver2]
//         .filter((e) => e)
//         .join(', ')
//     ),
//     markup: '',
//     remark: '',
//   }), [searchParams]);

//   useEffect(() => {
//   if (searchParams?.cc_emails) {
//     const emails = searchParams.cc_emails
//       .split(',')
//       .map(email => email.trim().toLowerCase())
//       .filter(email => email && hotelUtils.validateEmail(email));
//     setCcEmailList(emails);
//   }
// }, [searchParams?.cc_emails]);

//   const [formData, setFormData] = useState<hotelTypes.ShareFormData>(initialFormData);

//   // ✅ OPTIMIZED: Stable handleChange with no setTimeout
//   const handleChange = useCallback((
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // ✅ Clear errors immediately when user types
//     setErrors((prev) => {
//       if (prev[name as keyof hotelTypes.ShareFormErrors]) {
//         const newErrors = { ...prev };
//         delete newErrors[name as keyof hotelTypes.ShareFormErrors];
//         return newErrors;
//       }
//       return prev;
//     });
//   }, []); // ✅ Empty deps - completely stable!

//   const handleAddEmail = useCallback((
//     email: string,
//     field: 'toEmail' | 'ccEmail'
//   ) => {
//     const trimmedEmail = email.trim().toLowerCase();
//     if (!trimmedEmail) return;

//     if (!hotelUtils.validateEmail(trimmedEmail)) {
//       setErrors((prev) => ({ ...prev, [field]: 'Invalid email format' }));
//       return;
//     }

//     if (field === 'toEmail') {
//       setToEmailList((currentList) => {
//         if (currentList.map((e) => e.toLowerCase()).includes(trimmedEmail)) {
//           setErrors((prev) => ({ ...prev, [field]: 'Email already added' }));
//           return currentList;
//         }
//         return [...currentList, trimmedEmail];
//       });
//       setToEmail('');
//     } else {
//       setCcEmailList((currentList) => {
//         if (currentList.map((e) => e.toLowerCase()).includes(trimmedEmail)) {
//           setErrors((prev) => ({ ...prev, [field]: 'Email already added' }));
//           return currentList;
//         }
//         return [...currentList, trimmedEmail];
//       });
//       setCcEmail('');
//     }

//     setErrors((prev) => {
//       const newErrors = { ...prev };
//       delete newErrors[field];
//       return newErrors;
//     });
//   }, []);

//   const handleDeleteEmail = useCallback((email: string, field: 'toEmail' | 'ccEmail') => {
//     if (field === 'toEmail') {
//       setToEmailList((prev) => prev.filter((e) => e !== email));
//     } else {
//       setCcEmailList((prev) => prev.filter((e) => e !== email));
//     }
//   }, []);

//   const handleApproverEmailBlur = useCallback(() => {
//     setFormData((prev) => {
//       if (!prev.spocEmail) return prev;

//       const originalEmails = prev.spocEmail
//         .split(',')
//         .map((email) => email.trim().toLowerCase())
//         .filter((email) => email);

//       const validEmails = originalEmails.filter((email) =>
//         hotelUtils.validateEmail(email)
//       );
//       const uniqueEmails = [...new Set(validEmails)];

//       const hasDuplicates = originalEmails.length !== uniqueEmails.length;
//       const hasInvalidEmails = originalEmails.length !== validEmails.length;

//       if (hasDuplicates || hasInvalidEmails) {
//         let errorMessage = '';
//         if (hasDuplicates && hasInvalidEmails) {
//           errorMessage = 'Duplicate and invalid emails have been removed';
//         } else if (hasDuplicates) {
//           errorMessage = 'Duplicate emails have been removed';
//         } else {
//           errorMessage = 'Invalid emails have been removed';
//         }

//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           spocEmail: errorMessage,
//         }));

//         setTimeout(() => {
//           setErrors((prevErrors) => {
//             const newErrors = { ...prevErrors };
//             delete newErrors.spocEmail;
//             return newErrors;
//           });
//         }, 2000);
//       }

//       return {
//         ...prev,
//         spocEmail: uniqueEmails.join(', '),
//       };
//     });
//   }, []);

//   const prepareShareOptions = useCallback((): any[] => {
//     if (!selectedRooms || selectedRooms.length === 0) return [];

//     const markupAmount = parseFloat(formData.markup) || 0;

//     const grouped = Object.values(
//       selectedRooms.reduce<Record<string, any>>(
//         (acc, room) => {
//           const hotelCode = room.HotelCode;
//           const key = hotelCode;

//           if (!acc[key]) {
//             acc[key] = {
//               hotel_code: hotelCode,
//               booking_code: room.BookingCode,
//               hotel_name: room.HotelName,
//               hotel_address: room.Address,
//               city: room.CityName,
//               source: room.Source ?? 'Unknown',
//               Rooms: [],
//             };
//           }

//           const originalFare = Number(room.TotalFare || 0);
//           // const fareWithMarkup = originalFare + markupAmount;
//           const numberOfNights = room.numberOfNights ?? 1;
//           const totalMarkup = markupAmount * numberOfNights;      // ← 100 × 3 = 300
//           const fareWithMarkup = originalFare + totalMarkup;      // ← 3000 + 300 = 3300
//           const perNightFare = fareWithMarkup / numberOfNights; 

//           acc[key].Rooms.push({
//             RoomType: Array.isArray(room.Name) ? room.Name[0] : room.Name,
//             MealPlan: room.MealType || null,
//             BaseFare: room.DayRates
//               ? JSON.stringify(room.DayRates.flat().map((d) => d.BasePrice))
//               : null,
//             TotalFare: fareWithMarkup,
//             Tax: Number(room.TotalTax || 0),
//             markup: markupAmount.toString(),
//             total_markup:(markupAmount * numberOfNights).toString(),
//             base_price: originalFare.toString(),
//             updated_total_price: fareWithMarkup.toString(),
//             per_night_price: perNightFare.toString(),      // ← 1100 (new field)
//             numberOfNights: numberOfNights,               // ← 3 (for reference)
//           });

//           return acc;
//         }, {})
//     );

//     return grouped;
//   }, [selectedRooms, formData.markup]);

//   const handleShareOptions = useCallback(() => {
//     if (!selectedRooms || selectedRooms.length === 0) return;
//     setIsModalOpen(true);
//   }, [selectedRooms]);

//   const proceedToPreview = useCallback(async () => {
//     if (!searchParams || !selectedRooms || selectedRooms.length === 0) return;

//     setIsLoading(true);

//     const shareOptions = prepareShareOptions();

//     const basePrices = shareOptions.flatMap(hotel => 
//       hotel.Rooms.map( (room: any) => parseFloat(room.base_price))
//     );


//     const extractedBookingId = searchParams.booking_id?.replace(/\D/g, '') || ''; 

//     const requestBody = {
//       Options: shareOptions,
//       additional_email: toEmailList,
//       approver_email: hotelUtils.cleanEmails(formData.spocEmail).split(', '),
//       cc_email: ccEmailList,
//       remark: formData.remark?.trim() || 'N/A',
//       admin_id: searchParams.admin_id,
//       // booking_id: searchParams.booking_id,
//       booking_id: extractedBookingId,
//       checkin_date: searchParams.checkIn,
//       checkout_date: searchParams.checkOut,
//       no_of_seats: searchParams.Adults || 1,
//       city: searchParams.city_name || '',
//       flag: "",
//       htmlContent: "",
//     };

//     console.log("")

//     try {
//       const response = await hotelApi.shareHotelOptions(requestBody);
//       const data = response.data;

//       if (data.success === '1') {
//         setIsModalOpen(false);
//         setEmailHtmlContent(data.data);
//         setEmailPreviewData({
//           bookingId: searchParams.booking_id,
//           city: searchParams.city_name,
//           checkIn: searchParams.checkIn,
//           checkOut: searchParams.checkOut,
//           remark: formData.remark?.trim() || 'N/A',
//           hotels: shareOptions,
//           basePrices: basePrices,
//         });
//         setIsPreviewModalOpen(true);
//       } else {
//         await Swal.fire({
//           title: 'Error!',
//           text: 'Failed to generate email preview',
//           icon: 'error',
//           confirmButtonText: 'OK',
//         });
//       }
//     } catch (error) {
//       console.error('Error generating preview:', error);
//       await Swal.fire({
//         title: 'Error!',
//         text: 'Failed to generate email preview',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [searchParams, selectedRooms, prepareShareOptions, toEmailList, formData, ccEmailList]);

//   const handleSubmit = useCallback(async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!searchParams) {
//       await Swal.fire({
//         title: 'Error!',
//         text: 'Search parameters not available',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       });
//       return;
//     }

//     if (!selectedRooms || selectedRooms.length === 0) {
//       await Swal.fire({
//         title: 'No Rooms Selected',
//         text: 'Please select at least one room to share',
//         icon: 'warning',
//         confirmButtonText: 'OK',
//       });
//       return;
//     }

//     const markupValue = parseFloat(formData.markup) || 0;
    
//     if (markupValue === 0) {
//       const totalPrice = selectedRooms.reduce((sum, room) => sum + Number(room.TotalFare || 0), 0);
      
//       setMarkupWarningData({
//         roomCount: selectedRooms.length,
//         originalTotal: totalPrice,
//       });
//       setIsModalOpen(false);
//       setShowMarkupWarning(true);
//       return;
//     }

//     await proceedToPreview();
//   }, [searchParams, selectedRooms, formData.markup, proceedToPreview]);

//   const handleMarkupConfirm = useCallback(async () => {
//     setShowMarkupWarning(false);
//     await proceedToPreview();
//   }, [proceedToPreview]);

//   const handleMarkupCancel = useCallback(() => {
//     setShowMarkupWarning(false);
//     setIsModalOpen(true);
//   }, []);

// //   const handleConfirmAndSendEmail = useCallback(async (editedHtmlContent: string, editedPrices: any[] | null) => {
// //     if (!searchParams) return;

// //     setIsLoading(true);

// //     let shareOptions;
    
// //     if (editedPrices && editedPrices.length > 0) {
// //       const grouped = Object.values(
// //         selectedRooms.reduce<Record<string, any>>(
// //           (acc, room, roomIndex) => {
// //             const hotelCode = room.HotelCode;
// //             const key = hotelCode;

// //             if (!acc[key]) {
// //               acc[key] = {
// //                 hotel_code: hotelCode,
// //                 booking_code: room.BookingCode,
// //                 hotel_name: room.HotelName,
// //                 hotel_address: room.Address,
// //                 city: room.CityName,
// //                 source: room.Source ?? 'Unknown',
// //                 Rooms: [],
// //               };
// //             }

// //             const editedData = editedPrices[roomIndex];
// //             const basePrice = editedData ? editedData.basePrice : Number(room.TotalFare || 0);
// //             const totalPrice = editedData ? editedData.editedPrice : Number(room.TotalFare || 0);
// //             const markup = editedData ? editedData.newMarkup : 0;

// //             acc[key].Rooms.push({
// //               RoomType: Array.isArray(room.Name) ? room.Name[0] : room.Name,
// //               MealPlan: room.MealType || null,
// //               BaseFare: room.DayRates
// //                 ? JSON.stringify(room.DayRates.flat().map((d) => d.BasePrice))
// //                 : null,
// //               TotalFare: totalPrice,
// //               Tax: Number(room.TotalTax || 0),
// //               markup: markup.toFixed(2),
// //               base_price: basePrice.toFixed(2),
// //               updated_total_price: totalPrice.toFixed(2),
// //             });

// //             return acc;
// //           }, {})
// //       );
      
// //       shareOptions = grouped;
// //     } else {
// //       shareOptions = prepareShareOptions();
// //     }

// //     const extractedBookingId = searchParams.booking_id?.replace(/\D/g, '') || '';

// //     const requestBody = {
// //       Options: shareOptions,
// //       additional_email: toEmailList,
// //       approver_email: hotelUtils.cleanEmails(formData.spocEmail).split(', '),
// //       cc_email: ccEmailList,
// //       remark: formData.remark?.trim() || 'N/A',
// //       admin_id: searchParams.admin_id,
// //       // booking_id: searchParams.booking_id,
// //       booking_id: extractedBookingId,
// //       checkin_date: searchParams.checkIn,
// //       checkout_date: searchParams.checkOut,
// //       no_of_seats: searchParams.Adults || 1,
// //       city: searchParams.city_name || '',
// //       flag: "send",
// //       htmlContent: editedHtmlContent,
// //     };

// //     try {
// //       const response = await hotelApi.shareHotelOptions(requestBody);
// //       const data = response.data;

// //       // if (data.success === '1') {
// //       //   setIsPreviewModalOpen(false);
// //       //   setSelectedRooms([]);

// //       //   await Swal.fire({
// //       //     title: 'Mail Sent',
// //       //     text: 'Mail Sent Successfully',
// //       //     imageUrl: 'https://cdn-icons-png.flaticon.com/512/845/845646.png',
// //       //     imageWidth: 75,
// //       //     imageHeight: 75,
// //       //     confirmButtonText: 'OK',
// //       //   });
// //       // } 

// //       // ✅ THE BEST IMPLEMENTATION
// // if (data.success === '1') {
// //   setIsPreviewModalOpen(false);
// //   setSelectedRooms([]);

// //   await Swal.fire({
// //     title: 'Email Sent Successfully!',
// //     text: 'Hotel options have been shared with the client.',
// //     imageUrl: 'https://cdn-icons-png.flaticon.com/512/845/845646.png',
// //     imageWidth: 75,
// //     imageHeight: 75,
// //     confirmButtonText: 'Go to Homepage',
// //     confirmButtonColor: '#0B5CAD',
// //     timer: 5000,
// //     timerProgressBar: true,
// //     allowOutsideClick: false,
// //   });

// //   navigate('/');
// // }
// //  else {
// //         await Swal.fire({
// //           title: 'Error!',
// //           text: data.message || 'Failed to send email. Please try again.',
// //           icon: 'error',
// //           confirmButtonText: 'OK',
// //         });
// //       }
// //     } catch (error) {
// //       console.error('Error sending email:', error);
// //       await Swal.fire({
// //         title: 'Error!',
// //         text: 'Failed to send email. Please try again.',
// //         icon: 'error',
// //         confirmButtonText: 'OK',
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, [searchParams, selectedRooms, toEmailList, formData, ccEmailList, prepareShareOptions]);


// const handleConfirmAndSendEmail = useCallback(async (editedHtmlContent: string, editedPrices: any[] | null) => {
//     if (!searchParams) return;

//     setIsLoading(true);

//     let shareOptions;
    
//     if (editedPrices && editedPrices.length > 0) {
//       // ✅ NEW: Build shareOptions using edited per-night prices
//       const grouped = Object.values(
//         selectedRooms.reduce<Record<string, any>>(
//           (acc, room, roomIndex) => {
//             const hotelCode = room.HotelCode;
//             const key = hotelCode;

//             if (!acc[key]) {
//               acc[key] = {
//                 hotel_code: hotelCode,
//                 booking_code: room.BookingCode,
//                 hotel_name: room.HotelName,
//                 hotel_address: room.Address,
//                 city: room.CityName,
//                 source: room.Source ?? 'Unknown',
//                 Rooms: [],
//               };
//             }

//             const editedData = editedPrices[roomIndex];
            
//             if (editedData) {
//               // ✅ Use edited values from EmailPreviewModal
//               const basePrice = editedData.basePrice;
//               const totalPrice = editedData.editedPrice; // This is the calculated total
//               const perNightPrice = editedData.perNightPrice; // This is the edited per-night price
//               const numberOfNights = editedData.numberOfNights;
//               const markup = editedData.newMarkup;

//               acc[key].Rooms.push({
//                 RoomType: Array.isArray(room.Name) ? room.Name[0] : room.Name,
//                 MealPlan: room.MealType || null,
//                 BaseFare: room.DayRates
//                   ? JSON.stringify(room.DayRates.flat().map((d) => d.BasePrice))
//                   : null,
//                 TotalFare: totalPrice,
//                 Tax: Number(room.TotalTax || 0),
//                 markup: (markup / numberOfNights).toFixed(2), // Per-night markup
//                 total_markup: markup.toFixed(2), // Total markup
//                 base_price: basePrice.toFixed(2),
//                 updated_total_price: totalPrice.toFixed(2),
//                 per_night_price: perNightPrice.toFixed(2), // ✅ Send edited per-night price
//                 numberOfNights: numberOfNights,
//               });
//             } else {
//               // Fallback to original values
//               const originalFare = Number(room.TotalFare || 0);
//               const numberOfNights = room.numberOfNights ?? 1;
              
//               acc[key].Rooms.push({
//                 RoomType: Array.isArray(room.Name) ? room.Name[0] : room.Name,
//                 MealPlan: room.MealType || null,
//                 BaseFare: room.DayRates
//                   ? JSON.stringify(room.DayRates.flat().map((d) => d.BasePrice))
//                   : null,
//                 TotalFare: originalFare,
//                 Tax: Number(room.TotalTax || 0),
//                 markup: '0',
//                 total_markup: '0',
//                 base_price: originalFare.toFixed(2),
//                 updated_total_price: originalFare.toFixed(2),
//                 per_night_price: (originalFare / numberOfNights).toFixed(2),
//                 numberOfNights: numberOfNights,
//               });
//             }

//             return acc;
//           }, {})
//       );
      
//       shareOptions = grouped;
//     } else {
//       shareOptions = prepareShareOptions();
//     }

//     const extractedBookingId = searchParams.booking_id?.replace(/\D/g, '') || '';

//     const requestBody = {
//       Options: shareOptions,
//       additional_email: toEmailList,
//       approver_email: hotelUtils.cleanEmails(formData.spocEmail).split(', '),
//       cc_email: ccEmailList,
//       remark: formData.remark?.trim() || 'N/A',
//       admin_id: searchParams.admin_id,
//       booking_id: extractedBookingId,
//       checkin_date: searchParams.checkIn,
//       checkout_date: searchParams.checkOut,
//       no_of_seats: searchParams.Adults || 1,
//       city: searchParams.city_name || '',
//       flag: "send",
//       htmlContent: editedHtmlContent,
//     };

//     try {
//       const response = await hotelApi.shareHotelOptions(requestBody);
//       const data = response.data;

//       if (data.success === '1') {
//         setIsPreviewModalOpen(false);
//         setSelectedRooms([]);

//         await Swal.fire({
//           title: 'Email Sent Successfully!',
//           text: 'Hotel options have been shared with the client.',
//           imageUrl: 'https://cdn-icons-png.flaticon.com/512/845/845646.png',
//           imageWidth: 75,
//           imageHeight: 75,
//           confirmButtonText: 'Go to Homepage',
//           confirmButtonColor: '#0B5CAD',
//           timer: 5000,
//           timerProgressBar: true,
//           allowOutsideClick: false,
//         });

//         navigate('/');
//       } else {
//         await Swal.fire({
//           title: 'Error!',
//           text: data.message || 'Failed to send email. Please try again.',
//           icon: 'error',
//           confirmButtonText: 'OK',
//         });
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//       await Swal.fire({
//         title: 'Error!',
//         text: 'Failed to send email. Please try again.',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [searchParams, selectedRooms, toEmailList, formData, ccEmailList, prepareShareOptions, navigate]);

//   const handleCancel = useCallback(() => {
//     setIsModalOpen(false);
//   }, []);

//   const handleClosePreview = useCallback(() => {
//     setIsPreviewModalOpen(false);
//     setEmailPreviewData(null);
//     setEmailHtmlContent('');
//   }, []);

//   const addRoom = useCallback((room: hotelTypes.SelectedRoom) => {
//     setSelectedRooms((prev) => [...prev, room]);
//   }, []);

//   const removeRoom = useCallback((bookingCode: string) => {
//     setSelectedRooms((prev) =>
//       prev.filter((r) => r.BookingCode !== bookingCode)
//     );
//   }, []);

//   const isRoomSelected = useCallback((bookingCode: string) => {
//     return selectedRooms.some((r) => r.BookingCode === bookingCode);
//   }, [selectedRooms]);

//   // ✅ OPTIMIZED: Stable setters with useCallback
//   const stableSetToEmail = useCallback((val: string) => setToEmail(val), []);
//   const stableSetCcEmail = useCallback((val: string) => setCcEmail(val), []);

//   return {
//     selectedRooms,
//     isModalOpen,
//     isLoading,
//     toEmail,
//     setToEmail: stableSetToEmail,
//     toEmailList,
//     ccEmail,
//     setCcEmail: stableSetCcEmail,
//     ccEmailList,
//     errors,
//     formData,
//     handleChange,
//     handleAddEmail,
//     handleDeleteEmail,
//     handleApproverEmailBlur,
//     handleShareOptions,
//     handleSubmit,
//     handleCancel,
//     addRoom,
//     removeRoom,
//     isRoomSelected,
//     isPreviewModalOpen,
//     emailPreviewData,
//     emailHtmlContent,
//     handleClosePreview,
//     handleConfirmAndSendEmail,
//     showMarkupWarning,
//     setShowMarkupWarning,
//     markupWarningData,
//     handleMarkupConfirm,
//     handleMarkupCancel,
//   };
// };



import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as hotelTypes from '@/hotel/types/hotel'
import * as hotelUtils from '@/hotel/utils/hotel.utils'
import * as hotelApi from '@/hotel/api/hotel.api'

export const useHotelShare = (searchParams: hotelTypes.HotelSearchParams | null) => {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState<hotelTypes.SelectedRoom[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Email preview modal state
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [emailPreviewData, setEmailPreviewData] = useState<any>(null);
  const [emailHtmlContent, setEmailHtmlContent] = useState('');

  // Warning modals state
  const [showMarkupWarning, setShowMarkupWarning] = useState(false);
  const [markupWarningData, setMarkupWarningData] = useState<any>(null);

  const [toEmail, setToEmail] = useState('');
  const [toEmailList, setToEmailList] = useState<string[]>([]);

  const [ccEmail, setCcEmail] = useState('');
  const [ccEmailList, setCcEmailList] = useState<string[]>([]);

  const [errors, setErrors] = useState<hotelTypes.ShareFormErrors>({});

  const initialFormData = useMemo(() => ({
    bookingId: searchParams?.booking_id || '',
    clientName: searchParams?.corporate_name || '',
    spocName: searchParams?.spoc_name || '',
    spocEmail: hotelUtils.cleanEmails(
      [searchParams?.approver1, searchParams?.approver2]
        .filter((e) => e)
        .join(', ')
    ),
    markup: '',
    remark: '',
  }), [searchParams]);

  useEffect(() => {
    if (searchParams?.cc_emails) {
      const emails = searchParams.cc_emails
        .split(',')
        .map(email => email.trim().toLowerCase())
        .filter(email => email && hotelUtils.validateEmail(email));
      setCcEmailList(emails);
    }
  }, [searchParams?.cc_emails]);

  const [formData, setFormData] = useState<hotelTypes.ShareFormData>(initialFormData);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      if (prev[name as keyof hotelTypes.ShareFormErrors]) {
        const newErrors = { ...prev };
        delete newErrors[name as keyof hotelTypes.ShareFormErrors];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const handleAddEmail = useCallback((
    email: string,
    field: 'toEmail' | 'ccEmail'
  ) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) return;

    if (!hotelUtils.validateEmail(trimmedEmail)) {
      setErrors((prev) => ({ ...prev, [field]: 'Invalid email format' }));
      return;
    }

    if (field === 'toEmail') {
      setToEmailList((currentList) => {
        if (currentList.map((e) => e.toLowerCase()).includes(trimmedEmail)) {
          setErrors((prev) => ({ ...prev, [field]: 'Email already added' }));
          return currentList;
        }
        return [...currentList, trimmedEmail];
      });
      setToEmail('');
    } else {
      setCcEmailList((currentList) => {
        if (currentList.map((e) => e.toLowerCase()).includes(trimmedEmail)) {
          setErrors((prev) => ({ ...prev, [field]: 'Email already added' }));
          return currentList;
        }
        return [...currentList, trimmedEmail];
      });
      setCcEmail('');
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const handleDeleteEmail = useCallback((email: string, field: 'toEmail' | 'ccEmail') => {
    if (field === 'toEmail') {
      setToEmailList((prev) => prev.filter((e) => e !== email));
    } else {
      setCcEmailList((prev) => prev.filter((e) => e !== email));
    }
  }, []);

  const handleApproverEmailBlur = useCallback(() => {
    setFormData((prev) => {
      if (!prev.spocEmail) return prev;

      const originalEmails = prev.spocEmail
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter((email) => email);

      const validEmails = originalEmails.filter((email) =>
        hotelUtils.validateEmail(email)
      );
      const uniqueEmails = [...new Set(validEmails)];

      const hasDuplicates = originalEmails.length !== uniqueEmails.length;
      const hasInvalidEmails = originalEmails.length !== validEmails.length;

      if (hasDuplicates || hasInvalidEmails) {
        let errorMessage = '';
        if (hasDuplicates && hasInvalidEmails) {
          errorMessage = 'Duplicate and invalid emails have been removed';
        } else if (hasDuplicates) {
          errorMessage = 'Duplicate emails have been removed';
        } else {
          errorMessage = 'Invalid emails have been removed';
        }

        setErrors((prevErrors) => ({
          ...prevErrors,
          spocEmail: errorMessage,
        }));

        setTimeout(() => {
          setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.spocEmail;
            return newErrors;
          });
        }, 2000);
      }

      return {
        ...prev,
        spocEmail: uniqueEmails.join(', '),
      };
    });
  }, []);

  const prepareShareOptions = useCallback((): any[] => {
    if (!selectedRooms || selectedRooms.length === 0) return [];

    const markupAmount = parseFloat(formData.markup) || 0;

    const grouped = Object.values(
      selectedRooms.reduce<Record<string, any>>(
        (acc, room) => {
          const hotelCode = room.HotelCode;
          const key = hotelCode;

          if (!acc[key]) {
            acc[key] = {
              hotel_code: hotelCode,
              booking_code: room.BookingCode,
              hotel_name: room.HotelName,
              hotel_address: room.Address,
              city: room.CityName,
              source: room.Source ?? 'Unknown',
              Rooms: [],
            };
          }

          const originalFare = Number(room.TotalFare || 0);
          const numberOfNights = room.numberOfNights ?? 1;
          const totalMarkup = markupAmount * numberOfNights;
          const fareWithMarkup = originalFare + totalMarkup;
          const perNightFare = fareWithMarkup / numberOfNights;

          acc[key].Rooms.push({
            RoomType: Array.isArray(room.Name) ? room.Name[0] : room.Name,
            MealPlan: room.MealType || null,
            BaseFare: room.DayRates
              ? JSON.stringify(room.DayRates.flat().map((d) => d.BasePrice))
              : null,
            TotalFare: fareWithMarkup,
            Tax: Number(room.TotalTax || 0),
            markup: markupAmount.toString(),
            total_markup: (markupAmount * numberOfNights).toString(),
            base_price: originalFare.toString(),
            updated_total_price: fareWithMarkup.toString(),
            per_night_price: perNightFare.toString(),
            numberOfNights: numberOfNights,
            CancelPolicies: room.CancelPolicies ?? [],
            CancellationSummary: hotelUtils.getCancellationSummary(room.CancelPolicies ?? []),
          });

          return acc;
        }, {})
    );

    return grouped;
  }, [selectedRooms, formData.markup]);

  const handleShareOptions = useCallback(() => {
    if (!selectedRooms || selectedRooms.length === 0) return;
    setIsModalOpen(true);
  }, [selectedRooms]);

  const proceedToPreview = useCallback(async () => {
    if (!searchParams || !selectedRooms || selectedRooms.length === 0) return;

    setIsLoading(true);

    const shareOptions = prepareShareOptions();

    // ✅ FIX: Flatten shareOptions in exact order backend will render HTML
    // shareOptions[hotelIndex].Rooms[roomIndex] → flatIndex
    // This guarantees basePrices[i] matches HTML priceIndex i
    const basePrices = shareOptions.flatMap((hotel: any) =>
      hotel.Rooms.map((room: any) => parseFloat(room.base_price))
    );

    const extractedBookingId = searchParams.booking_id?.replace(/\D/g, '') || '';

    const requestBody = {
      Options: shareOptions,
      additional_email: toEmailList,
      approver_email: hotelUtils.cleanEmails(formData.spocEmail).split(', '),
      cc_email: ccEmailList,
      remark: formData.remark?.trim() || 'N/A',
      admin_id: searchParams.admin_id,
      booking_id: extractedBookingId,
      checkin_date: searchParams.checkIn,
      checkout_date: searchParams.checkOut,
      no_of_seats: searchParams.Adults || 1,
      city: searchParams.city_name || '',
      flag: '',
      htmlContent: '',
    };

    try {
      const response = await hotelApi.shareHotelOptions(requestBody);
      const data = response.data;

      if (data.success === '1') {
        setIsModalOpen(false);
        setEmailHtmlContent(data.data);
        setEmailPreviewData({
          bookingId: searchParams.booking_id,
          city: searchParams.city_name,
          checkIn: searchParams.checkIn,
          checkOut: searchParams.checkOut,
          remark: formData.remark?.trim() || 'N/A',

          // ✅ KEY: Store shareOptions exactly as sent to backend
          // This preserves the exact hotel/room order backend used
          // to generate the HTML — used in 2nd call to maintain order
          hotels: shareOptions,

          // ✅ basePrices flattened in same order as HTML render
          // basePrices[0] = 1st price in HTML, [1] = 2nd price etc.
          basePrices: basePrices,
        });
        setIsPreviewModalOpen(true);
      } else {
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to generate email preview',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error generating preview:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to generate email preview',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, selectedRooms, prepareShareOptions, toEmailList, formData, ccEmailList]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchParams) {
      await Swal.fire({
        title: 'Error!',
        text: 'Search parameters not available',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!selectedRooms || selectedRooms.length === 0) {
      await Swal.fire({
        title: 'No Rooms Selected',
        text: 'Please select at least one room to share',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    const markupValue = parseFloat(formData.markup) || 0;

    if (markupValue === 0) {
      const totalPrice = selectedRooms.reduce((sum, room) => sum + Number(room.TotalFare || 0), 0);

      setMarkupWarningData({
        roomCount: selectedRooms.length,
        originalTotal: totalPrice,
      });
      setIsModalOpen(false);
      setShowMarkupWarning(true);
      return;
    }

    await proceedToPreview();
  }, [searchParams, selectedRooms, formData.markup, proceedToPreview]);

  const handleMarkupConfirm = useCallback(async () => {
    setShowMarkupWarning(false);
    await proceedToPreview();
  }, [proceedToPreview]);

  const handleMarkupCancel = useCallback(() => {
    setShowMarkupWarning(false);
    setIsModalOpen(true);
  }, []);

  const handleConfirmAndSendEmail = useCallback(async (
    editedHtmlContent: string,
    editedPrices: any[] | null
  ) => {
    if (!searchParams) return;

    setIsLoading(true);

    // ✅ CORE FIX:
    // Always use emailPreviewData.hotels as the base for Options[]
    // This is the EXACT same shareOptions sent in the 1st call
    // so hotel/room order is guaranteed to match HTML render order
    const originalShareOptions: any[] = emailPreviewData?.hotels || [];

    let shareOptions;

    if (editedPrices && editedPrices.length > 0) {
      // ✅ Apply edited prices using flatIndex
      // flatIndex is calculated the same way as priceIndex in makeTableEditable()
      // so editedPrices[flatIndex] always maps to the correct hotel room
      shareOptions = originalShareOptions.map((hotel: any, hotelIndex: number) => ({
        ...hotel,
        Rooms: hotel.Rooms.map((room: any, roomIndex: number) => {

          // ✅ Calculate flatIndex:
          // Sum of all rooms in previous hotels + current roomIndex
          // This matches exactly how priceIndex++ works in makeTableEditable()
          const flatIndex = originalShareOptions
            .slice(0, hotelIndex)
            .reduce((sum: number, h: any) => sum + h.Rooms.length, 0) + roomIndex;

          const editedData = editedPrices[flatIndex];

          if (editedData) {
            // ✅ Return room with edited prices applied
            return {
              ...room, // keep BaseFare, Tax, etc.
              TotalFare: editedData.editedPrice,
              per_night_price: editedData.perNightPrice.toFixed(2),
              updated_total_price: editedData.editedPrice.toFixed(2),
              markup: editedData.numberOfNights > 0
                ? (editedData.newMarkup / editedData.numberOfNights).toFixed(2)
                : '0',
              total_markup: editedData.newMarkup.toFixed(2),
              base_price: editedData.basePrice.toFixed(2),
              numberOfNights: editedData.numberOfNights,
            };
          }

          // ✅ No edit for this room — return original as-is
          return room;
        }),
      }));

    } else {
      // ✅ No edits at all — use original shareOptions exactly
      shareOptions = originalShareOptions;
    }

    const extractedBookingId = searchParams.booking_id?.replace(/\D/g, '') || '';

    const requestBody = {
      Options: shareOptions,
      additional_email: toEmailList,
      approver_email: hotelUtils.cleanEmails(formData.spocEmail).split(', '),
      cc_email: ccEmailList,
      remark: formData.remark?.trim() || 'N/A',
      admin_id: searchParams.admin_id,
      booking_id: extractedBookingId,
      checkin_date: searchParams.checkIn,
      checkout_date: searchParams.checkOut,
      no_of_seats: searchParams.Adults || 1,
      city: searchParams.city_name || '',
      flag: 'send',
      htmlContent: editedHtmlContent,
    };

    try {
      const response = await hotelApi.shareHotelOptions(requestBody);
      const data = response.data;

      if (data.success === '1') {
        setIsPreviewModalOpen(false);
        setSelectedRooms([]);

        await Swal.fire({
          title: 'Email Sent Successfully!',
          text: 'Hotel options have been shared with the client.',
          imageUrl: 'https://cdn-icons-png.flaticon.com/512/845/845646.png',
          imageWidth: 75,
          imageHeight: 75,
          confirmButtonText: 'Go to Homepage',
          confirmButtonColor: '#0B5CAD',
          timer: 5000,
          timerProgressBar: true,
          allowOutsideClick: false,
        });

        navigate('/');
      } else {
        await Swal.fire({
          title: 'Error!',
          text: data.message || 'Failed to send email. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to send email. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    searchParams,
    emailPreviewData,  // ✅ needed for emailPreviewData.hotels
    toEmailList,
    formData,
    ccEmailList,
    navigate,
  ]);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleClosePreview = useCallback(() => {
    setIsPreviewModalOpen(false);
    setEmailPreviewData(null);
    setEmailHtmlContent('');
  }, []);

  const addRoom = useCallback((room: hotelTypes.SelectedRoom) => {
    setSelectedRooms((prev) => [...prev, room]);
  }, []);

  const removeRoom = useCallback((bookingCode: string) => {
    setSelectedRooms((prev) =>
      prev.filter((r) => r.BookingCode !== bookingCode)
    );
  }, []);

  const isRoomSelected = useCallback((bookingCode: string) => {
    return selectedRooms.some((r) => r.BookingCode === bookingCode);
  }, [selectedRooms]);

  const stableSetToEmail = useCallback((val: string) => setToEmail(val), []);
  const stableSetCcEmail = useCallback((val: string) => setCcEmail(val), []);

  return {
    selectedRooms,
    isModalOpen,
    isLoading,
    toEmail,
    setToEmail: stableSetToEmail,
    toEmailList,
    ccEmail,
    setCcEmail: stableSetCcEmail,
    ccEmailList,
    errors,
    formData,
    handleChange,
    handleAddEmail,
    handleDeleteEmail,
    handleApproverEmailBlur,
    handleShareOptions,
    handleSubmit,
    handleCancel,
    addRoom,
    removeRoom,
    isRoomSelected,
    isPreviewModalOpen,
    emailPreviewData,
    emailHtmlContent,
    handleClosePreview,
    handleConfirmAndSendEmail,
    showMarkupWarning,
    setShowMarkupWarning,
    markupWarningData,
    handleMarkupConfirm,
    handleMarkupCancel,
  };
};
