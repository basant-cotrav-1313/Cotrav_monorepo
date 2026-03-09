
// import React from 'react';
// import { ui, icons, guestDetailsTypes } from '@/index';

// export const GuestDetailsForm: React.FC<guestDetailsTypes.GuestDetailsFormProps> = ({
//   peopleData,
//   gstDetails,
//   showGSTDetails,
//   errors,
//   onGuestChange,
//   onGSTChange,
//   onGSTToggle,
//   disabled = false,
//   disableGuestFields=false,
//   disableGSTFields = false,
//   country_code,
// }) => {
//   return (
//     <div className="w-full">
//       <ui.Card className="border-2 border-[#0B5CAD]/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 py-0">
//         {/* Header */}
//         <ui.CardHeader className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-6 py-2.5 pb-1">
//           <div className="flex items-center justify-between">
//             <h5 className="text-white text-xl font-bold flex items-center gap-2">
//               <icons.User className="w-5 h-5" />
//               Guest Details
//             </h5>
//             <ui.Badge className="bg-white/20 backdrop-blur-sm text-white border-0 hover:bg-white/30">
//               {peopleData.length} Guest{peopleData.length > 1 ? 's' : ''}
//             </ui.Badge>
//           </div>
//         </ui.CardHeader>

//         <ui.CardContent className="p-6 space-y-5">
//           {/* Guest Forms */}
//           {peopleData.map((person, index) => (
//             <div
//               key={index}
//               className="bg-linear-to-br from-blue-50/50 to-blue-50/50 rounded-xl p-5 border-2 border-[#0B5CAD]/10 hover:border-[#0B5CAD]/30 transition-all duration-300"
//             >
//               {peopleData.length > 1 && (
//                 <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[#0B5CAD]/20">
//                   <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#0B5CAD] to-[#094B8A] text-white flex items-center justify-center text-sm font-bold shadow-md">
//                     {index + 1}
//                   </div>
//                   <h6 className="text-base font-bold text-gray-800">
//                     Passenger {index + 1}
//                   </h6>
//                 </div>
//               )}

//               {/* Name Row */}
//               <div className="grid grid-cols-12 gap-3 mb-4">
//                 <div className="col-span-12 sm:col-span-2">
//                   <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                     Title <span className="text-red-500">*</span>
//                   </ui.Label>
//                   <ui.Select 
//                     // disabled={disabled} 
//                     disabled={disableGuestFields} 
//                     value={person.title}
//                     onValueChange={(value) => onGuestChange(index, 'title', value)}
//                   >
//                     <ui.SelectTrigger className="w-full bg-white border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD]">
//                       <ui.SelectValue placeholder="Title" />
//                     </ui.SelectTrigger>
//                     <ui.SelectContent className=''>
//                       <ui.SelectItem value="Mr">Mr</ui.SelectItem>
//                       <ui.SelectItem value="Mrs">Mrs</ui.SelectItem>
//                       <ui.SelectItem value="Ms">Ms</ui.SelectItem>
//                     </ui.SelectContent>
//                   </ui.Select>
//                 </div>
//                 <div className="col-span-12 sm:col-span-5">
//                   <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                     First Name <span className="text-red-500">*</span>
//                   </ui.Label>
//                   <ui.Input
//                     type="text"
//                     // disabled={disabled}
//                     disabled={disableGuestFields}
//                     className={`text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] ${
//                       disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                     } ${errors[index]?.firstName ? 'border-red-400 bg-red-50' : ''}`}
//                     value={person.firstName}
//                     placeholder="Enter first name"
//                     onChange={(e) => onGuestChange(index, 'firstName', e.target.value)}
//                   />
//                   {errors[index]?.firstName && (
//                     <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                       <icons.AlertCircle size={12} />
//                       {errors[index].firstName}
//                     </p>
//                   )}
//                 </div>
//                 <div className="col-span-12 sm:col-span-5">
//                   <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                     Last Name <span className="text-red-500">*</span>
//                   </ui.Label>
//                   <ui.Input
//                     type="text"
//                     // disabled={disabled}
//                     disabled={disableGuestFields}
//                     className={`text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] ${
//                       disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                     } ${errors[index]?.lastName ? 'border-red-400 bg-red-50' : ''}`}
//                     value={person.lastName}
//                     placeholder="Enter last name"
//                     onChange={(e) => onGuestChange(index, 'lastName', e.target.value)}
//                   />
//                   {errors[index]?.lastName && (
//                     <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                       <icons.AlertCircle size={12} />
//                       {errors[index].lastName}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Email & Mobile Row */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
//                 <div>
//                   <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                     <icons.Mail size={12} className="text-[#0B5CAD]" />
//                     Email Address <span className="text-red-500">*</span>
//                   </ui.Label>
//                   <ui.Input
//                     type="email"
//                     // disabled={disabled}
//                     disabled={disableGuestFields}
//                     className={`text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] ${
//                       disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                     } ${errors[index]?.email ? 'border-red-400 bg-red-50' : ''}`}
//                     value={person.email}
//                     placeholder="your@email.com"
//                     onChange={(e) => onGuestChange(index, 'email', e.target.value)}
//                   />
//                   {!disabled && (
//                     <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
//                       <icons.Mail size={10} className="text-blue-500" />
//                       Booking voucher will be sent here
//                     </p>
//                   )}
//                   {errors[index]?.email && (
//                     <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                       <icons.AlertCircle size={12} />
//                       {errors[index].email}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                     <icons.Phone size={12} className="text-[#0B5CAD]" />
//                     Mobile Number <span className="text-red-500">*</span>
//                   </ui.Label>
//                   <ui.Input
//                     type="text"
//                     // disabled={disabled}
//                     disabled={disableGuestFields}
//                     className={`text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] ${
//                       disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                     } ${errors[index]?.contact_no ? 'border-red-400 bg-red-50' : ''}`}
//                     value={person.contact_no}
//                     placeholder="+91 98765 43210"
//                     onChange={(e) => onGuestChange(index, 'contact_no', e.target.value)}
//                   />
//                   {errors[index]?.contact_no && (
//                     <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                       <icons.AlertCircle size={12} />
//                       {errors[index].contact_no}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* PAN Field - ALWAYS ENABLED */}
//               {country_code !== "IN" && (
//               <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-lg p-4 border-2 border-orange-200 shadow-sm">
//                 <div className="flex items-center gap-2 mb-2">
//                   <icons.CreditCard size={16} className="text-orange-600" />
//                   <ui.Label className="text-xs font-bold text-gray-800 flex items-center gap-1">
//                     PAN Card Number <span className="text-red-600">*</span>
//                   </ui.Label>
//                 </div>
//                 <ui.Input
//                   type="text"
//                   className={`uppercase text-sm font-mono ${
//                     errors[index]?.pan
//                       ? 'border-red-400 bg-red-50 focus:border-red-500'
//                       : 'border-orange-300 bg-white focus:border-orange-400 focus:ring-orange-400'
//                   }`}
//                   placeholder="ABCDE1234F"
//                   value={person.pan || ''}
//                   onChange={(e) =>
//                     onGuestChange(index, 'pan', e.target.value.toUpperCase())
//                   }
//                   maxLength={10}
//                   disabled={false} // PAN is ALWAYS enabled
//                 />
//                 {errors[index]?.pan && (
//                   <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
//                     <icons.AlertCircle size={12} />
//                     {errors[index].pan}
//                   </p>
//                 )}
//                 {!errors[index]?.pan && (
//                   <p className="text-[10px] text-orange-700 mt-1.5 flex items-center gap-1 font-medium">
//                     <icons.AlertCircle size={10} />
//                     Required for International Bookings
//                   </p>
//                 )}
//               </div>
//               )}
//             </div>
//           ))}

//           {/* GST Section */}
//           <div className="bg-linear-to-br from-blue-50/50 to-indigo-50/50 rounded-xl p-5 border-2 border-blue-200/50 shadow-sm">
//             <div className="flex items-center gap-3 mb-4">
//               <ui.Checkbox
//                 id="gst-checkbox"
//                 checked={showGSTDetails}
//                 onCheckedChange={onGSTToggle}
//                 // disabled={disabled}
//                 className="border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD] text-white"
//               />
//               <ui.Label
//                 htmlFor="gst-checkbox"
//                 className="text-sm font-bold text-gray-800 cursor-pointer flex items-center gap-2"
//               >
//                 <icons.Building2 size={16} className="text-[#0B5CAD]" />
//                 I have a GST Number (Optional)
//               </ui.Label>
//             </div>

//             {showGSTDetails && (
//               <div className="space-y-3 animate-fadeIn bg-white rounded-lg p-4 border border-blue-200">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                   <div>
//                     <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                       <icons.CreditCard size={12} className="text-[#0B5CAD]" />
//                       GST Registration No. <span className="text-red-500">*</span>
//                     </ui.Label>
//                     <ui.Input
//                       type="text"
//                       name="gstNo"
//                       className={`text-sm uppercase font-mono ${
//                         errors.gstNo ? 'border-red-400 bg-red-50' : 'border-gray-300'
//                       } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
//                       placeholder="29ABCDE1234F1Z5"
//                       value={gstDetails.gstNo}
//                       onChange={onGSTChange}
//                       // disabled={disabled}
//                       disabled={disableGSTFields}
//                     />
//                     {errors.gstNo && (
//                       <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                         <icons.AlertCircle size={12} />
//                         {errors.gstNo}
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                       <icons.Building2 size={12} className="text-[#0B5CAD]" />
//                       Company Name <span className="text-red-500">*</span>
//                     </ui.Label>
//                     <ui.Input
//                       type="text"
//                       name="cName"
//                       className={`text-sm ${
//                         errors.cName ? 'border-red-400 bg-red-50' : 'border-gray-300'
//                       } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
//                       placeholder="Company Name"
//                       value={gstDetails.cName}
//                       onChange={onGSTChange}
//                       // disabled={disabled}
//                       disabled={disableGSTFields}
//                     />
//                     {errors.cName && (
//                       <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                         <icons.AlertCircle size={12} />
//                         {errors.cName}
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                       <icons.MapPin size={12} className="text-[#0B5CAD]" />
//                       Company Address <span className="text-red-500">*</span>
//                     </ui.Label>
//                     <ui.Input
//                       type="text"
//                       name="cAddr"
//                       className={`text-sm ${
//                         errors.cAddr ? 'border-red-400 bg-red-50' : 'border-gray-300'
//                       } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
//                       placeholder="Address"
//                       value={gstDetails.cAddr}
//                       onChange={onGSTChange}
//                       // disabled={disabled}
//                       disabled={disableGSTFields}
//                     />
//                     {errors.cAddr && (
//                       <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                         <icons.AlertCircle size={12} />
//                         {errors.cAddr}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <div>
//                     <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                       <icons.Phone size={12} className="text-[#0B5CAD]" />
//                       Contact Number <span className="text-red-500">*</span>
//                     </ui.Label>
//                     <ui.Input
//                       type="text"
//                       name="contactNo"
//                       className={`text-sm ${
//                         errors.contactNo ? 'border-red-400 bg-red-50' : 'border-gray-300'
//                       } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
//                       placeholder="Contact"
//                       value={gstDetails.contactNo}
//                       onChange={onGSTChange}
//                       // disabled={disabled}
//                       disabled={disableGSTFields}
//                       maxLength={10}
//                     />
//                     {errors.contactNo && (
//                       <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                         <icons.AlertCircle size={12} />
//                         {errors.contactNo}
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                       <icons.Mail size={12} className="text-[#0B5CAD]" />
//                       Company Email <span className="text-red-500">*</span>
//                     </ui.Label>
//                     <ui.Input
//                       type="email"
//                       name="email"
//                       className={`text-sm ${
//                         errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
//                       } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
//                       placeholder="company@email.com"
//                       value={gstDetails.email}
//                       onChange={onGSTChange}
//                       // disabled={disabled}
//                       disabled={disableGSTFields}
//                     />
//                     {errors.email && (
//                       <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                         <icons.AlertCircle size={12} />
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </ui.CardContent>
//       </ui.Card>
//     </div>
//   );
// };

// export default GuestDetailsForm;


// import React from 'react';
// import { ui, icons, guestDetailsTypes } from '@/index';
// import { GSTDetails } from '@/hotel/hooks/useHotelGst';

// // ─── Extended Props ───────────────────────────────────────────────────────────

// interface GuestDetailsFormProps extends guestDetailsTypes.GuestDetailsFormProps {
//   // GST data from useHotelGST hook
//   clientGST?: GSTDetails | null;
//   taxivaxiGST?: GSTDetails | null;
//   isClientGSTSelected?: boolean;
//   onClientGSTSelect?: (val: boolean) => void;
//   bothGSTEmpty?: boolean;

//   // Manual GST (replaces old gstDetails + onGSTChange + showGSTDetails + onGSTToggle)
//   // We keep the original prop names so nothing else breaks
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export const GuestDetailsForm: React.FC<GuestDetailsFormProps> = ({
//   peopleData,
//   gstDetails,
//   showGSTDetails,
//   errors,
//   onGuestChange,
//   onGSTChange,
//   onGSTToggle,
//   disabled = false,
//   disableGuestFields = false,
//   disableGSTFields = false,
//   country_code,

//   // New GST props
//   clientGST = null,
//   taxivaxiGST = null,
//   isClientGSTSelected = false,
//   onClientGSTSelect,
//   bothGSTEmpty = false,
// }) => {
//   return (
//     <div className="w-full">
//       <ui.Card className="border-2 border-[#0B5CAD]/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 py-0">

//         {/* ── Header ─────────────────────────────────────────────────────── */}
//         <ui.CardHeader className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-6 py-2.5 pb-1">
//           <div className="flex items-center justify-between">
//             <h5 className="text-white text-xl font-bold flex items-center gap-2">
//               <icons.User className="w-5 h-5" />
//               Guest Details
//             </h5>
//             <ui.Badge className="bg-white/20 backdrop-blur-sm text-white border-0 hover:bg-white/30">
//               {peopleData.length} Guest{peopleData.length > 1 ? 's' : ''}
//             </ui.Badge>
//           </div>
//         </ui.CardHeader>

//         <ui.CardContent className="p-6 space-y-5">

//           {/* ── Guest Forms ────────────────────────────────────────────────── */}
//           {peopleData.map((person, index) => (
//             <div
//               key={index}
//               className="bg-linear-to-br from-blue-50/50 to-blue-50/50 rounded-xl p-5 border-2 border-[#0B5CAD]/10 hover:border-[#0B5CAD]/30 transition-all duration-300"
//             >
//               {peopleData.length > 1 && (
//                 <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[#0B5CAD]/20">
//                   <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#0B5CAD] to-[#094B8A] text-white flex items-center justify-center text-sm font-bold shadow-md">
//                     {index + 1}
//                   </div>
//                   <h6 className="text-base font-bold text-gray-800">
//                     Passenger {index + 1}
//                   </h6>
//                 </div>
//               )}

//               {/* Name Row */}
//               <div className="grid grid-cols-12 gap-3 mb-4">
//                 <div className="col-span-12 sm:col-span-2">
//                   <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                     Title <span className="text-red-500">*</span>
//                   </ui.Label>
//                   <ui.Select
//                     disabled={disableGuestFields}
//                     value={person.title}
//                     onValueChange={(value) => onGuestChange(index, 'title', value)}
//                   >
//                     <ui.SelectTrigger className="w-full bg-white border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD]">
//                       <ui.SelectValue placeholder="Title" />
//                     </ui.SelectTrigger>
//                     <ui.SelectContent>
//                       <ui.SelectItem value="Mr">Mr</ui.SelectItem>
//                       <ui.SelectItem value="Mrs">Mrs</ui.SelectItem>
//                       <ui.SelectItem value="Ms">Ms</ui.SelectItem>
//                     </ui.SelectContent>
//                   </ui.Select>
//                 </div>
//                 <div className="col-span-12 sm:col-span-5">
//                   <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                     First Name <span className="text-red-500">*</span>
//                   </ui.Label>
//                   <ui.Input
//                     type="text"
//                     disabled={disableGuestFields}
//                     className={`text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] ${
//                       disableGuestFields ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                     } ${errors[index]?.firstName ? 'border-red-400 bg-red-50' : ''}`}
//                     value={person.firstName}
//                     placeholder="Enter first name"
//                     onChange={(e) => onGuestChange(index, 'firstName', e.target.value)}
//                   />
//                   {errors[index]?.firstName && (
//                     <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                       <icons.AlertCircle size={12} />
//                       {errors[index].firstName}
//                     </p>
//                   )}
//                 </div>
//                 <div className="col-span-12 sm:col-span-5">
//                   <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                     Last Name <span className="text-red-500">*</span>
//                   </ui.Label>
//                   <ui.Input
//                     type="text"
//                     disabled={disableGuestFields}
//                     className={`text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] ${
//                       disableGuestFields ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                     } ${errors[index]?.lastName ? 'border-red-400 bg-red-50' : ''}`}
//                     value={person.lastName}
//                     placeholder="Enter last name"
//                     onChange={(e) => onGuestChange(index, 'lastName', e.target.value)}
//                   />
//                   {errors[index]?.lastName && (
//                     <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                       <icons.AlertCircle size={12} />
//                       {errors[index].lastName}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Email & Mobile Row */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
//                 <div>
//                   <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                     <icons.Mail size={12} className="text-[#0B5CAD]" />
//                     Email Address <span className="text-red-500">*</span>
//                   </ui.Label>
//                   <ui.Input
//                     type="email"
//                     disabled={disableGuestFields}
//                     className={`text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] ${
//                       disableGuestFields ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                     } ${errors[index]?.email ? 'border-red-400 bg-red-50' : ''}`}
//                     value={person.email}
//                     placeholder="your@email.com"
//                     onChange={(e) => onGuestChange(index, 'email', e.target.value)}
//                   />
//                   {!disableGuestFields && (
//                     <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
//                       <icons.Mail size={10} className="text-blue-500" />
//                       Booking voucher will be sent here
//                     </p>
//                   )}
//                   {errors[index]?.email && (
//                     <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                       <icons.AlertCircle size={12} />
//                       {errors[index].email}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                     <icons.Phone size={12} className="text-[#0B5CAD]" />
//                     Mobile Number <span className="text-red-500">*</span>
//                   </ui.Label>
//                   <ui.Input
//                     type="text"
//                     disabled={disableGuestFields}
//                     className={`text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] ${
//                       disableGuestFields ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                     } ${errors[index]?.contact_no ? 'border-red-400 bg-red-50' : ''}`}
//                     value={person.contact_no}
//                     placeholder="+91 98765 43210"
//                     onChange={(e) => onGuestChange(index, 'contact_no', e.target.value)}
//                   />
//                   {errors[index]?.contact_no && (
//                     <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                       <icons.AlertCircle size={12} />
//                       {errors[index].contact_no}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* PAN Field — only for international */}
//               {country_code !== 'IN' && (
//                 <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-lg p-4 border-2 border-orange-200 shadow-sm">
//                   <div className="flex items-center gap-2 mb-2">
//                     <icons.CreditCard size={16} className="text-orange-600" />
//                     <ui.Label className="text-xs font-bold text-gray-800 flex items-center gap-1">
//                       PAN Card Number <span className="text-red-600">*</span>
//                     </ui.Label>
//                   </div>
//                   <ui.Input
//                     type="text"
//                     className={`uppercase text-sm font-mono ${
//                       errors[index]?.pan
//                         ? 'border-red-400 bg-red-50 focus:border-red-500'
//                         : 'border-orange-300 bg-white focus:border-orange-400 focus:ring-orange-400'
//                     }`}
//                     placeholder="ABCDE1234F"
//                     value={person.pan || ''}
//                     onChange={(e) => onGuestChange(index, 'pan', e.target.value.toUpperCase())}
//                     maxLength={10}
//                     disabled={false}
//                   />
//                   {errors[index]?.pan && (
//                     <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
//                       <icons.AlertCircle size={12} />
//                       {errors[index].pan}
//                     </p>
//                   )}
//                   {!errors[index]?.pan && (
//                     <p className="text-[10px] text-orange-700 mt-1.5 flex items-center gap-1 font-medium">
//                       <icons.AlertCircle size={10} />
//                       Required for International Bookings
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}

//           {/* ── GST Section ────────────────────────────────────────────────── */}
//           <div className="space-y-3">

//             {/* ── Case 5: Both APIs empty — advise user ────────────────────── */}
//             {bothGSTEmpty && (
//               <div className="flex items-start gap-3 bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
//                 <icons.AlertCircle size={18} className="text-amber-600 mt-0.5 shrink-0" />
//                 <div>
//                   <p className="text-sm font-semibold text-amber-800">GST Details Not Found</p>
//                   <p className="text-xs text-amber-700 mt-0.5">
//                     We couldn't find any GST details linked to your account. If you'd like GST billing,
//                     please enter your details using the option below.
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* ── Case 2 & 3: Client GST card (only when non-empty) ─────────── */}
//             {clientGST && (
//               <div
//                 className={`rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer ${
//                   isClientGSTSelected
//                     ? 'border-[#0B5CAD] bg-blue-50 shadow-md'
//                     : 'border-gray-200 bg-gray-50 hover:border-[#0B5CAD]/40'
//                 }`}
//                 onClick={() => onClientGSTSelect?.(!isClientGSTSelected)}
//               >
//                 <div className="flex items-start gap-3">
//                   <ui.Checkbox
//                     id="client-gst-checkbox"
//                     checked={isClientGSTSelected}
//                     onCheckedChange={(checked) => onClientGSTSelect?.(!!checked)}
//                     className="mt-0.5 border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD] text-white"
//                     onClick={(e) => e.stopPropagation()}
//                   />
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-2">
//                       <icons.Building2 size={15} className="text-[#0B5CAD] shrink-0" />
//                       <p className="text-sm font-bold text-gray-800 truncate">
//                         {clientGST.cName || 'Company GST'}
//                       </p>
//                       <ui.Badge className="ml-auto shrink-0 bg-purple-100 text-[#0B5CAD] border-0 text-[10px] font-semibold">
//                         Saved GST
//                       </ui.Badge>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-gray-600">
//                       <span className="flex items-center gap-1">
//                         <icons.CreditCard size={11} className="text-gray-400" />
//                         <span className="font-mono font-semibold">{clientGST.gstNo}</span>
//                       </span>
//                       {clientGST.email && (
//                         <span className="flex items-center gap-1 truncate">
//                           <icons.Mail size={11} className="text-gray-400 shrink-0" />
//                           {clientGST.email}
//                         </span>
//                       )}
//                       {clientGST.contactNo && (
//                         <span className="flex items-center gap-1">
//                           <icons.Phone size={11} className="text-gray-400" />
//                           {clientGST.contactNo}
//                         </span>
//                       )}
//                       {clientGST.cAddr && (
//                         <span className="flex items-center gap-1 truncate">
//                           <icons.MapPin size={11} className="text-gray-400 shrink-0" />
//                           {clientGST.cAddr}
//                         </span>
//                       )}
//                     </div>
//                     {isClientGSTSelected && (
//                       <p className="text-[10px] text-[#0B5CAD] font-semibold mt-2 flex items-center gap-1">
//                         <icons.CheckCircle size={11} />
//                         This GST will be used for billing
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* ── "I have a GST Number" manual entry ──────────────────────── */}
//             <div className="bg-linear-to-br from-blue-50/50 to-indigo-50/50 rounded-xl p-5 border-2 border-blue-200/50 shadow-sm">
//               <div className="flex items-center gap-3 mb-4">
//                 <ui.Checkbox
//                   id="gst-checkbox"
//                   checked={showGSTDetails}
//                   onCheckedChange={onGSTToggle}
//                   className="border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD] text-white"
//                 />
//                 <ui.Label
//                   htmlFor="gst-checkbox"
//                   className="text-sm font-bold text-gray-800 cursor-pointer flex items-center gap-2"
//                 >
//                   <icons.Building2 size={16} className="text-[#0B5CAD]" />
//                   I have a GST Number
//                   <span className="text-xs font-normal text-gray-500">(Optional)</span>
//                 </ui.Label>
//               </div>

//               {showGSTDetails && (
//                 <div className="space-y-3 animate-fadeIn bg-white rounded-lg p-4 border border-blue-200">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                     {/* GST Number */}
//                     <div>
//                       <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                         <icons.CreditCard size={12} className="text-[#0B5CAD]" />
//                         GST Registration No. <span className="text-red-500">*</span>
//                       </ui.Label>
//                       <ui.Input
//                         type="text"
//                         name="gstNo"
//                         className={`text-sm uppercase font-mono ${
//                           errors.gstNo ? 'border-red-400 bg-red-50' : 'border-gray-300'
//                         } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
//                         placeholder="29ABCDE1234F1Z5"
//                         value={gstDetails.gstNo}
//                         onChange={onGSTChange}
//                         disabled={disableGSTFields}
//                       />
//                       {errors.gstNo && (
//                         <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                           <icons.AlertCircle size={12} />
//                           {errors.gstNo}
//                         </p>
//                       )}
//                     </div>

//                     {/* Company Name */}
//                     <div>
//                       <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                         <icons.Building2 size={12} className="text-[#0B5CAD]" />
//                         Company Name <span className="text-red-500">*</span>
//                       </ui.Label>
//                       <ui.Input
//                         type="text"
//                         name="cName"
//                         className={`text-sm ${
//                           errors.cName ? 'border-red-400 bg-red-50' : 'border-gray-300'
//                         } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
//                         placeholder="Company Name"
//                         value={gstDetails.cName}
//                         onChange={onGSTChange}
//                         disabled={disableGSTFields}
//                       />
//                       {errors.cName && (
//                         <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                           <icons.AlertCircle size={12} />
//                           {errors.cName}
//                         </p>
//                       )}
//                     </div>

//                     {/* Company Address */}
//                     <div>
//                       <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                         <icons.MapPin size={12} className="text-[#0B5CAD]" />
//                         Company Address <span className="text-red-500">*</span>
//                       </ui.Label>
//                       <ui.Input
//                         type="text"
//                         name="cAddr"
//                         className={`text-sm ${
//                           errors.cAddr ? 'border-red-400 bg-red-50' : 'border-gray-300'
//                         } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
//                         placeholder="Address"
//                         value={gstDetails.cAddr}
//                         onChange={onGSTChange}
//                         disabled={disableGSTFields}
//                       />
//                       {errors.cAddr && (
//                         <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                           <icons.AlertCircle size={12} />
//                           {errors.cAddr}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {/* Contact Number */}
//                     <div>
//                       <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                         <icons.Phone size={12} className="text-[#0B5CAD]" />
//                         Contact Number <span className="text-red-500">*</span>
//                       </ui.Label>
//                       <ui.Input
//                         type="text"
//                         name="contactNo"
//                         className={`text-sm ${
//                           errors.contactNo ? 'border-red-400 bg-red-50' : 'border-gray-300'
//                         } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
//                         placeholder="Contact"
//                         value={gstDetails.contactNo}
//                         onChange={onGSTChange}
//                         disabled={disableGSTFields}
//                         maxLength={10}
//                       />
//                       {errors.contactNo && (
//                         <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                           <icons.AlertCircle size={12} />
//                           {errors.contactNo}
//                         </p>
//                       )}
//                     </div>

//                     {/* Company Email */}
//                     <div>
//                       <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
//                         <icons.Mail size={12} className="text-[#0B5CAD]" />
//                         Company Email <span className="text-red-500">*</span>
//                       </ui.Label>
//                       <ui.Input
//                         type="email"
//                         name="email"
//                         className={`text-sm ${
//                           errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
//                         } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
//                         placeholder="company@email.com"
//                         value={gstDetails.email}
//                         onChange={onGSTChange}
//                         disabled={disableGSTFields}
//                       />
//                       {errors.email && (
//                         <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                           <icons.AlertCircle size={12} />
//                           {errors.email}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* ── Active GST indicator (Cases 3 & 4) ────────────────────────
//                 Show only when no manual form and no client GST selected,
//                 but taxivaxi GST exists — so user knows what will be sent     */}
//             {!showGSTDetails && !isClientGSTSelected && taxivaxiGST && (
//               <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5">
//                 <icons.CheckCircle size={14} className="text-green-600 shrink-0" />
//                 <p className="text-xs text-green-700 font-medium">
//                   Default GST details will be used for this booking.
//                 </p>
//               </div>
//             )}

//           </div>
//           {/* end GST Section */}

//         </ui.CardContent>
//       </ui.Card>
//     </div>
//   );
// };

// export default GuestDetailsForm;

import React from 'react';
import { ui, icons, guestDetailsTypes } from '@/index';
import { GSTDetails, GSTSelection } from '@/hotel/hooks/useHotelGst';

// ─── Extended Props ───────────────────────────────────────────────────────────

interface GuestDetailsFormProps extends guestDetailsTypes.GuestDetailsFormProps {
  clientGST?:          GSTDetails | null;
  taxivaxiGST?:        GSTDetails | null;
  selectedGSTOption?:  GSTSelection;
  onGSTOptionSelect?:  (val: GSTSelection) => void;
  bothGSTEmpty?:       boolean;
}

// ─── GST Card ─────────────────────────────────────────────────────────────────

interface GSTCardProps {
  badge:      string;
  badgeColor: string;
  data:       GSTDetails;
  isSelected: boolean;
  onSelect:   () => void;
}

const GSTCard: React.FC<GSTCardProps> = ({ badge, badgeColor, data, isSelected, onSelect }) => (
  <div
    className={`rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer ${
      isSelected
        ? 'border-[#0B5CAD] bg-blue-50 shadow-md'
        : 'border-gray-200 bg-gray-50 hover:border-[#0B5CAD]/40'
    }`}
    onClick={onSelect}
  >
    <div className="flex items-start gap-3">

      {/* Radio circle */}
      <div
        className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
          isSelected ? 'border-[#0B5CAD]' : 'border-gray-300'
        }`}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-[#0B5CAD]" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">

        {/* Top row — company name + badge */}
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <p className="text-sm font-bold text-gray-800 leading-tight">
            {data.cName || 'Company GST'}
          </p>
          <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        </div>

        {/* Entity name — friendly subtitle */}
        {data.entityName && (
          <p className="text-xs text-gray-500 mb-2">{data.entityName}</p>
        )}

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2">

          {/* GST Number */}
          <div className="flex items-center gap-1.5">
            <icons.CreditCard size={12} className="text-[#0B5CAD] shrink-0" />
            <div>
              <p className="text-[10px] text-gray-400 leading-none">GST No.</p>
              <p className="text-xs font-mono font-semibold text-gray-700">{data.gstNo}</p>
            </div>
          </div>

          {/* PAN */}
          {data.pan && (
            <div className="flex items-center gap-1.5">
              <icons.FileText size={12} className="text-[#0B5CAD] shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 leading-none">PAN</p>
                <p className="text-xs font-mono font-semibold text-gray-700">{data.pan}</p>
              </div>
            </div>
          )}

          {/* Location */}
          {(data.city || data.state) && (
            <div className="flex items-center gap-1.5 sm:col-span-2">
              <icons.MapPin size={12} className="text-[#0B5CAD] shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 leading-none">Location</p>
                <p className="text-xs text-gray-700">
                  {[data.city, data.state].filter(Boolean).join(', ')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Selected indicator */}
        {isSelected && (
          <p className="text-[10px] text-[#0B5CAD] font-semibold mt-2.5 flex items-center gap-1">
            <icons.CheckCircle size={11} />
            This GST will be used for billing
          </p>
        )}
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const GuestDetailsForm: React.FC<GuestDetailsFormProps> = ({
  peopleData,
  gstDetails,
  showGSTDetails,
  errors,
  onGuestChange,
  onGSTChange,
  onGSTToggle,
  disabled = false,
  disableGuestFields = false,
  disableGSTFields = false,
  country_code,
  clientGST = null,
  taxivaxiGST = null,
  selectedGSTOption = null,
  onGSTOptionSelect,
  bothGSTEmpty = false,
}) => {
  return (
    <div className="w-full">
      <ui.Card className="border-2 border-[#0B5CAD]/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 py-0">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <ui.CardHeader className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-6 py-2.5 pb-1">
          <div className="flex items-center justify-between">
            <h5 className="text-white text-xl font-bold flex items-center gap-2">
              <icons.User className="w-5 h-5" />
              Guest Details
            </h5>
            <ui.Badge className="bg-white/20 backdrop-blur-sm text-white border-0 hover:bg-white/30">
              {peopleData.length} Guest{peopleData.length > 1 ? 's' : ''}
            </ui.Badge>
          </div>
        </ui.CardHeader>

        <ui.CardContent className="p-6 space-y-5">

          {/* ── Guest Forms ───────────────────────────────────────────────── */}
          {peopleData.map((person, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-blue-50/50 to-blue-50/50 rounded-xl p-5 border-2 border-[#0B5CAD]/10 hover:border-[#0B5CAD]/30 transition-all duration-300"
            >
              {peopleData.length > 1 && (
                <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[#0B5CAD]/20">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#0B5CAD] to-[#094B8A] text-white flex items-center justify-center text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                  <h6 className="text-base font-bold text-gray-800">Passenger {index + 1}</h6>
                </div>
              )}

              {/* Name Row */}
              <div className="grid grid-cols-12 gap-3 mb-4">
                <div className="col-span-12 sm:col-span-2">
                  <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    Title <span className="text-red-500">*</span>
                  </ui.Label>
                  <ui.Select
                    disabled={disableGuestFields}
                    value={person.title}
                    onValueChange={(value) => onGuestChange(index, 'title', value)}
                  >
                    <ui.SelectTrigger className="w-full bg-white border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD]">
                      <ui.SelectValue placeholder="Title" />
                    </ui.SelectTrigger>
                    <ui.SelectContent>
                      <ui.SelectItem value="Mr">Mr</ui.SelectItem>
                      <ui.SelectItem value="Mrs">Mrs</ui.SelectItem>
                      <ui.SelectItem value="Ms">Ms</ui.SelectItem>
                    </ui.SelectContent>
                  </ui.Select>
                </div>

                <div className="col-span-12 sm:col-span-5">
                  <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    First Name <span className="text-red-500">*</span>
                  </ui.Label>
                  <ui.Input
                    type="text"
                    disabled={disableGuestFields}
                    className={`text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] ${
                      disableGuestFields ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    } ${errors[index]?.firstName ? 'border-red-400 bg-red-50' : ''}`}
                    value={person.firstName}
                    placeholder="Enter first name"
                    onChange={(e) => onGuestChange(index, 'firstName', e.target.value)}
                  />
                  {errors[index]?.firstName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <icons.AlertCircle size={12} /> {errors[index].firstName}
                    </p>
                  )}
                </div>

                <div className="col-span-12 sm:col-span-5">
                  <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    Last Name <span className="text-red-500">*</span>
                  </ui.Label>
                  <ui.Input
                    type="text"
                    disabled={disableGuestFields}
                    className={`text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] ${
                      disableGuestFields ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    } ${errors[index]?.lastName ? 'border-red-400 bg-red-50' : ''}`}
                    value={person.lastName}
                    placeholder="Enter last name"
                    onChange={(e) => onGuestChange(index, 'lastName', e.target.value)}
                  />
                  {errors[index]?.lastName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <icons.AlertCircle size={12} /> {errors[index].lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Mobile Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div>
                  <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <icons.Mail size={12} className="text-[#0B5CAD]" />
                    Email Address <span className="text-red-500">*</span>
                  </ui.Label>
                  <ui.Input
                    type="email"
                    disabled={disableGuestFields}
                    className={`text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] ${
                      disableGuestFields ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    } ${errors[index]?.email ? 'border-red-400 bg-red-50' : ''}`}
                    value={person.email}
                    placeholder="your@email.com"
                    onChange={(e) => onGuestChange(index, 'email', e.target.value)}
                  />
                  {!disableGuestFields && (
                    <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                      <icons.Mail size={10} className="text-blue-500" />
                      Booking voucher will be sent here
                    </p>
                  )}
                  {errors[index]?.email && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <icons.AlertCircle size={12} /> {errors[index].email}
                    </p>
                  )}
                </div>

                <div>
                  <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <icons.Phone size={12} className="text-[#0B5CAD]" />
                    Mobile Number <span className="text-red-500">*</span>
                  </ui.Label>
                  <ui.Input
                    type="text"
                    disabled={disableGuestFields}
                    className={`text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] ${
                      disableGuestFields ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    } ${errors[index]?.contact_no ? 'border-red-400 bg-red-50' : ''}`}
                    value={person.contact_no}
                    placeholder="+91 98765 43210"
                    onChange={(e) => onGuestChange(index, 'contact_no', e.target.value)}
                  />
                  {errors[index]?.contact_no && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <icons.AlertCircle size={12} /> {errors[index].contact_no}
                    </p>
                  )}
                </div>
              </div>

              {/* PAN — international only */}
              {country_code !== 'IN' && (
                <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-lg p-4 border-2 border-orange-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <icons.CreditCard size={16} className="text-orange-600" />
                    <ui.Label className="text-xs font-bold text-gray-800 flex items-center gap-1">
                      PAN Card Number <span className="text-red-600">*</span>
                    </ui.Label>
                  </div>
                  <ui.Input
                    type="text"
                    className={`uppercase text-sm font-mono ${
                      errors[index]?.pan
                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                        : 'border-orange-300 bg-white focus:border-orange-400 focus:ring-orange-400'
                    }`}
                    placeholder="ABCDE1234F"
                    value={person.pan || ''}
                    onChange={(e) => onGuestChange(index, 'pan', e.target.value.toUpperCase())}
                    maxLength={10}
                    disabled={false}
                  />
                  {errors[index]?.pan && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                      <icons.AlertCircle size={12} /> {errors[index].pan}
                    </p>
                  )}
                  {!errors[index]?.pan && (
                    <p className="text-[10px] text-orange-700 mt-1.5 flex items-center gap-1 font-medium">
                      <icons.AlertCircle size={10} /> Required for International Bookings
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* ── GST Section ───────────────────────────────────────────────── */}
          <div className="space-y-3">

            {/* Section title */}
            <div className="flex items-center gap-2 pb-1 border-b border-gray-200">
              <icons.Building2 size={15} className="text-[#0B5CAD]" />
              <h6 className="text-sm font-bold text-gray-700">GST Billing Details</h6>
            </div>

            {/* Case: Both empty — block submission, force manual */}
            {bothGSTEmpty && (
              <div className="flex items-start gap-3 bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
                <icons.AlertCircle size={18} className="text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">GST Details Required</p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    No GST details found for your account. Please fill in your GST details below to proceed with the booking.
                  </p>
                </div>
              </div>
            )}

            {/* Taxivaxi GST card — Default */}
            {taxivaxiGST && (
              <GSTCard
                badge="Default"
                badgeColor="bg-purple-100 text-[#0B5CAD]"
                data={taxivaxiGST}
                isSelected={selectedGSTOption === 'taxivaxi'}
                onSelect={() => onGSTOptionSelect?.('taxivaxi')}
              />
            )}

            {/* Client GST card — Saved GST */}
            {clientGST && (
              <GSTCard
                badge="Saved GST"
                badgeColor="bg-blue-100 text-blue-700"
                data={clientGST}
                isSelected={selectedGSTOption === 'client'}
                onSelect={() => onGSTOptionSelect?.('client')}
              />
            )}

            {/* Manual GST — "I have a GST Number" */}
            <div className="bg-linear-to-br from-blue-50/50 to-indigo-50/50 rounded-xl p-5 border-2 border-blue-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ui.Checkbox
                  id="gst-checkbox"
                  checked={showGSTDetails}
                  onCheckedChange={onGSTToggle}
                  disabled={bothGSTEmpty && showGSTDetails}
                  className="border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD] text-white"
                />
                <ui.Label
                  htmlFor="gst-checkbox"
                  className="text-sm font-bold text-gray-800 cursor-pointer flex items-center gap-2"
                >
                  <icons.Building2 size={16} className="text-[#0B5CAD]" />
                  I have a GST Number
                  {bothGSTEmpty
                    ? <span className="text-xs font-semibold text-red-500">(Required)</span>
                    : <span className="text-xs font-normal text-gray-500">(Optional)</span>
                  }
                </ui.Label>
              </div>

              {showGSTDetails && (
                <div className="space-y-3 animate-fadeIn bg-white rounded-lg p-4 border border-blue-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                        <icons.CreditCard size={12} className="text-[#0B5CAD]" />
                        GST Registration No. <span className="text-red-500">*</span>
                      </ui.Label>
                      <ui.Input
                        type="text"
                        name="gstNo"
                        className={`text-sm uppercase font-mono ${
                          errors.gstNo ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
                        placeholder="29ABCDE1234F1Z5"
                        value={gstDetails.gstNo}
                        onChange={onGSTChange}
                        disabled={disableGSTFields}
                      />
                      {errors.gstNo && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <icons.AlertCircle size={12} /> {errors.gstNo}
                        </p>
                      )}
                    </div>

                    <div>
                      <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                        <icons.Building2 size={12} className="text-[#0B5CAD]" />
                        Company Name <span className="text-red-500">*</span>
                      </ui.Label>
                      <ui.Input
                        type="text"
                        name="cName"
                        className={`text-sm ${
                          errors.cName ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
                        placeholder="Company Name"
                        value={gstDetails.cName}
                        onChange={onGSTChange}
                        disabled={disableGSTFields}
                      />
                      {errors.cName && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <icons.AlertCircle size={12} /> {errors.cName}
                        </p>
                      )}
                    </div>

                    <div>
                      <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                        <icons.MapPin size={12} className="text-[#0B5CAD]" />
                        Company Address <span className="text-red-500">*</span>
                      </ui.Label>
                      <ui.Input
                        type="text"
                        name="cAddr"
                        className={`text-sm ${
                          errors.cAddr ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
                        placeholder="Address"
                        value={gstDetails.cAddr}
                        onChange={onGSTChange}
                        disabled={disableGSTFields}
                      />
                      {errors.cAddr && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <icons.AlertCircle size={12} /> {errors.cAddr}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                        <icons.Phone size={12} className="text-[#0B5CAD]" />
                        Contact Number <span className="text-red-500">*</span>
                      </ui.Label>
                      <ui.Input
                        type="text"
                        name="contactNo"
                        className={`text-sm ${
                          errors.contactNo ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
                        placeholder="Contact"
                        value={gstDetails.contactNo}
                        onChange={onGSTChange}
                        disabled={disableGSTFields}
                        maxLength={10}
                      />
                      {errors.contactNo && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <icons.AlertCircle size={12} /> {errors.contactNo}
                        </p>
                      )}
                    </div>

                    <div>
                      <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                        <icons.Mail size={12} className="text-[#0B5CAD]" />
                        Company Email <span className="text-red-500">*</span>
                      </ui.Label>
                      <ui.Input
                        type="email"
                        name="email"
                        className={`text-sm ${
                          errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        } focus:border-[#0B5CAD] focus:ring-[#0B5CAD]`}
                        placeholder="company@email.com"
                        value={gstDetails.email}
                        onChange={onGSTChange}
                        disabled={disableGSTFields}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <icons.AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
          {/* end GST Section */}

        </ui.CardContent>
      </ui.Card>
    </div>
  );
};

export default GuestDetailsForm;
