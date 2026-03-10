
import React from 'react';
import { icons, ui } from '@/index';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hotelData: {
    name: string;
    address: string;
  };
  roomData: {
    name: string;
    mealType: string;
  };
  guestData: {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    contact_no: string;
  }[];
  bookingDetails: {
    netAmount: number;
    nights: number;
    checkIn?: string;
    checkOut?: string;
  };
  isLoading?: boolean;
  room?: any;

  pricing?: {
    clientPrice: number;
    totalFare: number;
    nights: number;
    markupPerNight: number;
    totalMarkup: number;
    totalTax: number;
    gstRate: number;
  } | null;
  MealType?: string;
  CancellationPolicy?: string;
}

const BookingConfirmModal: React.FC<BookingConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  hotelData,
  roomData,
  guestData,
  bookingDetails,
  isLoading = false,
  room,
  pricing,
  MealType,
  CancellationPolicy
}) => {
  const { netAmount, nights, checkIn, checkOut } = bookingDetails;

  console.log("Guest Data", guestData)
  // Format date nicely
  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Format phone number
  const formatPhone = (phone: string) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    const last10 = cleaned.slice(-10);
    if (last10.length === 10) {
      return `+91 ${last10.slice(0, 5)} ${last10.slice(5)}`;
    }
    return phone;
  };

  // Calculate final total with markup (same as PriceSummary logic)
  // const finalTotal = pricing ? room.TotalFare + pricing.totalMarkup : room.TotalFare;
  // With this (mirrors PriceSummary exactly):
  const finalTotal = pricing
    ? pricing.totalFare + pricing.totalTax   // Client Price + GST
    : room.TotalFare;                        // fallback: vendor price only

  return (
    <AnimatePresence>
      {isOpen && (
        <ui.Dialog open={isOpen} onOpenChange={onClose}>
          <ui.DialogContent className="max-w-xl w-full max-h-full p-0 gap-0 overflow-hidden bg-white border-none shadow-2xl [&>button]:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="w-full flex flex-col max-h-[96vh]"
            >
              {/* Header with Gradient */}
              <div className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                <div className="relative flex items-start justify-between">
                  <ui.DialogHeader className="space-y-1 flex-1 pr-4 min-w-0 gap-0">
                    <ui.DialogTitle className="text-xl font-bold text-white">
                      Confirm Your Booking
                    </ui.DialogTitle>
                    <ui.DialogDescription className="text-purple-100 text-sm">
                      Review details before proceeding
                    </ui.DialogDescription>
                  </ui.DialogHeader>

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  >
                    <icons.X size={20} />
                  </button>
                </div>
              </div>

              {/* Content - Compact Layout */}
              <div className="p-5 space-y-3 overflow-x-hidden overflow-y-auto flex-1 min-h-0 custom-scrollbar">
                {/* Hotel Info - Compact */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-linear-to-br from-blue-50 to-purple-100/50 p-3.5 rounded-xl border border-purple-200/50 shadow-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="bg-[#0B5CAD] p-1.5 rounded-lg shrink-0">
                      <icons.Building2 size={16} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-sm mb-0.5 wrap-break-word">{hotelData.name}</p>
                      <div className="flex items-start gap-1">
                        <icons.MapPin size={12} className="text-gray-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-600 wrap-break-word line-clamp-2">{hotelData.address}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Room & Dates Info - Compact Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-linear-to-br from-blue-50 to-blue-100/50 p-3 rounded-xl border border-blue-200/50"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="bg-blue-500 p-1 rounded">
                        <icons.Users size={14} className="text-white" />
                      </div>
                      <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Room</p>
                    </div>
                    <p className="font-semibold text-gray-800 text-sm leading-tight wrap-break-word line-clamp-2 mb-0.5">{roomData.name}</p>
                    <p className="text-xs text-gray-600 mt-0.5 wrap-break-word">{roomData.mealType}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-linear-to-br from-green-50 to-green-100/50 p-3 rounded-xl border border-green-200/50"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="bg-green-500 p-1 rounded">
                        <icons.Calendar size={14} className="text-white" />
                      </div>
                      <p className="text-xs font-medium text-green-600 uppercase tracking-wide">Stay</p>
                    </div>
                    <p className="font-semibold text-gray-800 text-sm mb-0.5">{nights} Night{nights > 1 ? 's' : ''}</p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {checkIn && checkOut ? `${formatDate(checkIn)} - ${formatDate(checkOut)}` : 'Dates confirmed'}
                    </p>
                  </motion.div>
                </div>

                {/* Guest Info - Compact */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-linear-to-br from-amber-50 to-amber-100/50 p-3.5 rounded-xl border border-amber-200/50"
                >
                  <p className="text-xs font-medium text-amber-600 mb-2 uppercase tracking-wide">Primary Guest</p>
                  <div className="flex items-start gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {guestData.firstName?.[0]}{guestData.lastName?.[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-800 text-sm wrap-break-word">
                        {guestData.title}. {guestData.firstName} {guestData.lastName}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <icons.Mail size={12} className="text-gray-400 shrink-0" />
                        <p className="text-xs text-gray-600 break-all">{guestData.email}</p>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <icons.Phone size={12} className="text-gray-400 shrink-0" />
                        <p className="text-xs text-gray-600">{formatPhone(guestData.contact_no)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div> */}


                {/* Guest Info - Show All Guests */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-linear-to-br from-amber-50 to-amber-100/50 p-3.5 rounded-xl border border-amber-200/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                      {guestData.length > 1 ? 'Guests' : 'Primary Guest'}
                    </p>
                    {guestData.length > 1 && (
                      <ui.Badge className="bg-amber-500 text-white text-xs">
                        {guestData.length} Guests
                      </ui.Badge>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {guestData.map((guest, index) => (
                      <div key={index} className="flex items-start gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {guest.firstName?.[0]}{guest.lastName?.[0]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-gray-800 text-sm wrap-break-word">
                              {guest.title}. {guest.firstName} {guest.lastName}
                            </p>
                            {/* {index === 0 && (
              <ui.Badge variant="outline" className="text-[10px] px-1.5 py-0 border-amber-300 text-amber-700">
                Primary
              </ui.Badge>
            )} */}
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <icons.Mail size={12} className="text-gray-400 shrink-0" />
                            <p className="text-xs text-gray-600 break-all">{guest.email}</p>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <icons.Phone size={12} className="text-gray-400 shrink-0" />
                            <p className="text-xs text-gray-600">{formatPhone(guest.contact_no)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Total Amount - Compact */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                  className="bg-linear-to-br from-[#0B5CAD] to-[#073B6D] p-4 rounded-xl shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2 mb-1">
                        <icons.CreditCard size={16} className="text-purple-200 shrink-0" />
                        <p className="text-xs font-medium text-purple-200 uppercase tracking-wide">Total Amount</p>
                      </div>
                      {/* <p className="text-2xl font-bold text-white wrap-break-word">₹{netAmount.toLocaleString()}</p>
                      <p className="text-xs text-purple-200 mt-0.5">
                        ₹{Math.round(netAmount / nights).toLocaleString()} per night
                      </p> */}
                      <p className="text-2xl font-bold text-white wrap-break-word">
                        ₹{finalTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-purple-200 mt-0.5">
                        ₹{(finalTotal / nights).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per night
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <icons.Check size={24} className="text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Info Alert - Compact */}
                {/* <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <ui.Alert className="bg-linear-to-r from-blue-50 to-indigo-50 border-blue-200/50 py-2.5 px-3 flex gap-2">
                    <icons.AlertCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <ui.AlertDescription className="text-xs text-blue-900 leading-relaxed">    
                      Review all details carefully. Changes after confirmation may incur charges.
                    </ui.AlertDescription>
                  </ui.Alert>
                </motion.div> */}
              </div>

              {/* Footer Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <ui.DialogFooter className="p-4 bg-gray-50 border-t border-gray-200 flex flex-row gap-3">
                  <ui.Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 border-2 border-gray-300 bg-white hover:bg-white hover:border-gray-400 font-semibold py-2.5 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </ui.Button>
                  <ui.Button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="flex-1 bg-linear-to-r from-[#0B5CAD] to-[#073B6D] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white font-semibold shadow-lg hover:shadow-xl py-2.5 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    <icons.Check size={18} />
                    {isLoading ? 'Processing...' : 'Confirm Booking'}
                  </ui.Button>
                </ui.DialogFooter>
              </motion.div>
            </motion.div>
          </ui.DialogContent>
        </ui.Dialog>
      )}
    </AnimatePresence>
  );
};

export default BookingConfirmModal;
