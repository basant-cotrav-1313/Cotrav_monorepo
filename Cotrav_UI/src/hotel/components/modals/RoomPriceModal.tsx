
import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { icons, hotelTypes, dateFormatterUtils, hotelHooks } from '@/index';

// CRITICAL: Extract RoomRow as a separate memoized component
const RoomRow = React.memo<{
  room: hotelTypes.Room;
  index: number;
  isAdded: boolean;
  isExpanded: boolean;
  isPolicyExpanded: boolean;
  dayRates: hotelTypes.DayRate[];
  cancelPolicies: hotelTypes.CancellationPolicy[];
  firstDayBasePrice: number;
  onToggleRow: (bookingCode: string) => void;
  onTogglePolicy: (bookingCode: string) => void;
  onAddRoom: (room: hotelTypes.SelectedRoom) => void;
  onRemoveRoom: (bookingCode: string) => void;
  hotelData: {
    HotelCode: string;
    HotelName: string;
    CityName: string;
    Address: string;
    Source: string;
    Description?: string;
  };
}>(({
  room,
  index,
  isAdded,
  isExpanded,
  isPolicyExpanded,
  dayRates,
  cancelPolicies,
  firstDayBasePrice,
  onToggleRow,
  onTogglePolicy,
  onAddRoom,
  onRemoveRoom,
  hotelData
}) => {
  
  const handleAddRoom = useCallback(() => {
    onAddRoom({
      ...room,
      HotelCode: hotelData.HotelCode,
      HotelName: hotelData.HotelName,
      CityName: hotelData.CityName,
      Address: hotelData.Address,
      Source: hotelData.Source,
      Description: hotelData.Description,
      MealType: (room.MealType || 'N/A').replace(/_/g, ' '),
      numberOfNights: room.DayRates?.[0]?.length ?? 1,
    });
  }, [room, hotelData, onAddRoom]);

  const handleRemoveRoom = useCallback(() => {
    onRemoveRoom(room.BookingCode);
  }, [room.BookingCode, onRemoveRoom]);

  const handleToggleExpand = useCallback(() => {
    onToggleRow(room.BookingCode);
  }, [room.BookingCode, onToggleRow]);

  const handleTogglePolicy = useCallback(() => {
    onTogglePolicy(room.BookingCode);
  }, [room.BookingCode, onTogglePolicy]);

  return (
    <React.Fragment>
      <tr className={`border-t-2 border-gray-300 hover:bg-gray-50 transition-colors ${isAdded ? 'bg-green-50/50' : 'bg-white'}`}>
        {/* Room Details */}
        <td className="px-3 py-2.5 border-r-2 border-gray-300">
          <div className="flex items-start gap-2">
            {isAdded && (
              <div className="shrink-0 mt-0.5">
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                  <icons.Check size={10} className="text-white" />
                </div>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900 text-xs mb-0.5">
                {room.Name?.[0] || "N/A"}
              </h3>
              <p className="text-[10px] text-gray-500">{room.RoomType}</p>
            </div>
          </div>
        </td>

        {/* Meal Plan */}
        <td className="px-3 py-2.5 border-r-2 border-gray-300">
          <div className="flex items-center gap-1.5">
            <icons.UtensilsCrossed size={12} className="text-violet-600 shrink-0" />
            <span className="text-xs text-gray-700">
              {(room.MealType || 'N/A').replace(/_/g, ' ')}
            </span>
          </div>
        </td>

        {/* Inclusions */}
        <td className="px-3 py-2.5 border-r-2 border-gray-300">
          {room.Inclusion && room.Inclusion.length > 50 ? (
            <details className="cursor-pointer group">
              <summary className="text-xs text-violet-600 hover:text-violet-700 font-bold list-none flex items-center gap-1">
                View details
                <icons.ChevronDown size={12} className="transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-[12px] text-gray-600 mt-1.5 leading-relaxed">{room.Inclusion}</p>
            </details>
          ) : (
            <p className="text-xs text-gray-600">{room.Inclusion || 'Standard amenities'}</p>
          )}
        </td>

        {/* Base Price */}
        {/* <td className="px-3 py-2.5 border-r-2 border-gray-300 text-center">
          <div className="flex items-center justify-center gap-0.5">
            <icons.IndianRupee size={12} className="text-gray-600" />
            <span className="text-xs font-semibold text-gray-900">
              {firstDayBasePrice.toFixed(2)}
            </span>
          </div>
        </td> */}

        {/* Tax */}
        {/* <td className="px-3 py-2.5 border-r-2 border-gray-300 text-center">
          <div className="flex items-center justify-center gap-0.5">
            <icons.IndianRupee size={12} className="text-orange-600" />
            <span className="text-xs font-semibold text-orange-700">
              {(room.TotalTax || 0).toFixed(2)}
            </span>
          </div>
        </td> */}

        {/* Total Price */}
        <td className="px-3 py-2.5 border-r-2 border-gray-300 text-center bg-blue-50/50">
          <div className="flex items-center justify-center gap-0.5">
            <icons.IndianRupee size={14} className="text-violet-700" />
            <span className="text-sm font-bold text-violet-900">
              {room.TotalFare.toFixed(2)}
            </span>
          </div>
        </td>

        {/* Day Rates */}
        <td className="px-3 py-2.5 border-r-2 border-gray-300 text-center">
          {dayRates.length > 0 ? (
            <button
              onClick={handleToggleExpand}
              className="inline-flex items-center gap-1 text-xs text-[#0B5CAD] hover:text-[#073B6D] font-medium hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"
            >
              <icons.Calendar size={12} />
              Daywise Price
              <icons.ChevronDown
                size={12}
                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </td>

        {/* Cancellation */}
        <td className="px-3 py-2.5 border-r-2 border-gray-300 text-center">
          {cancelPolicies.length > 0 ? (
            <button
              onClick={handleTogglePolicy}
              className="inline-flex items-center gap-1 text-[12px] font-bold text-red-600 bg-red-50 px-4 py-2 rounded-md border border-red-200 hover:bg-red-100 transition-colors"
            >
              <icons.AlertCircle size={12} />
              Policy
              <icons.ChevronDown
                size={10}
                className={`transition-transform duration-300 ${isPolicyExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
              <icons.Check size={10} />
              Free
            </span>
          )}
        </td>

        {/* Action */}
        <td className="px-3 py-2.5">
          <div className="flex items-center justify-center gap-1.5">
            {isAdded ? (
              <>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-1 text-[10px] font-bold cursor-default"
                  disabled
                >
                  <icons.Check size={12} /> Added
                </button>
                <button
                  onClick={handleRemoveRoom}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors"
                >
                  <icons.X size={12} />
                </button>
              </>
            ) : (
              <button
                onClick={handleAddRoom}
                className="bg-[#0B5CAD] hover:bg-[#073B6D] text-white px-4 py-2 rounded-md flex items-center gap-1 transition-colors text-[12px] font-bold"
              >
                <icons.Plus size={12} /> Add
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* Expanded Row - Day Rates */}
      {isExpanded && (
        <tr className="bg-blue-50/30 border-t border-gray-200">
          <td colSpan={9} className="px-4 py-3">
            <h4 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
              <icons.Calendar size={12} className="text-violet-600" />
              Day-wise Rate Breakdown
            </h4>
            <div className="flex flex-wrap gap-2">
              {dayRates.map((d: hotelTypes.DayRate, i: number) => (
                <div
                  key={i}
                  className="bg-white px-2.5 py-1.5 rounded-lg border border-violet-200 shadow-sm"
                >
                  <div className="text-[9px] text-gray-500 mb-0.5 font-medium">
                    Day {i + 1}
                  </div>
                  <div className="flex items-center gap-0.5">
                    <icons.IndianRupee size={10} className="text-violet-600" />
                    <span className="text-xs font-bold text-gray-900">
                      {(d.BasePrice || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}

      {/* Expanded Row - Cancellation Policy */}
      {isPolicyExpanded && cancelPolicies.length > 0 && (
        <tr className="bg-red-50/30 border-t border-gray-200">
          <td colSpan={9} className="px-4 py-3">
            <h4 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
              <icons.AlertCircle size={12} className="text-red-600" />
              Cancellation Policy Details
            </h4>
            <div className="space-y-2">
              {cancelPolicies.map((c: hotelTypes.CancellationPolicy, i: number) => {
                const formattedDateTime = dateFormatterUtils.formatHotelDateTime(c.FromDate);

                return (
                  <div
                    key={i}
                    className="bg-white border-l-4 border-red-400 px-3 py-2 rounded shadow-sm"
                  >
                    <div className="font-semibold text-red-700 text-xs mb-0.5">
                      From {formattedDateTime}
                    </div>
                    <div className="text-xs text-gray-700">
                      {c.ChargeType === "Percentage"
                        ? `${c.CancellationCharge}% charge`
                        : `₹${c.CancellationCharge.toFixed(2)} charge`}
                    </div>
                  </div>
                );
              })}
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}, (prevProps, nextProps) => {
  // Only re-render if these specific props change
  return (
    prevProps.room.BookingCode === nextProps.room.BookingCode &&
    prevProps.isAdded === nextProps.isAdded &&
    prevProps.isExpanded === nextProps.isExpanded &&
    prevProps.isPolicyExpanded === nextProps.isPolicyExpanded
  );
});

RoomRow.displayName = 'RoomRow';

// ✅ Main Modal Component - Also memoized
export const RoomPriceModal = React.memo<hotelTypes.RoomPriceModalProps>(({
  isOpen,
  hotel,
  selectedRooms,
  onClose,
  onAddRoom,
  onRemoveRoom,
  onShare
}) => {

  const {
    expandedRows,
    expandedPolicies,
    toggleRowExpansion,
    togglePolicyExpansion,
    isClosing,
    handleClose,
    selectedRoomsTotal,
  } = hotelHooks.useRoomPriceModal(selectedRooms, onClose);

  const {
    getFirstDayBasePrice,
    getFlattenedDayRates,
  } = hotelHooks.useRoomRates();

  // ✅ Memoize rooms array
  const rooms = useMemo(() => hotel.Rooms ?? [], [hotel.Rooms]);

  // ✅ Memoize hotel data object to prevent recreation
  const hotelData = useMemo(() => ({
    HotelCode: hotel.HotelCode,
    HotelName: hotel.HotelName ?? 'Unknown Hotel',
    CityName: hotel.CityName ?? 'Unknown City',
    Address: hotel.Address ?? 'Address not available',
    Source: hotel.Source ?? 'Unknown',
    Description: hotel.Description,
  }), [hotel.HotelCode, hotel.HotelName, hotel.CityName, hotel.Address, hotel.Source, hotel.Description]);

  // ✅ Memoize handlers
  const handleShareClick = useCallback(() => {
    onShare();
  }, [onShare]);

  if (!isOpen || !hotel) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 bg-black/60 z-999 flex justify-center items-center pt-2 pb-2 overflow-auto"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: isClosing ? 0.95 : 1, opacity: isClosing ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="bg-white w-full max-w-350 max-h-fit h-fit rounded-2xl shadow-2xl overflow-hidden relative mx-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-[#0B5CAD] text-white px-4 py-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1">{hotel.HotelName}</h2>
              <p className="text-violet-100 text-sm mb-0">
                {hotel.CityName} • {rooms.length} rooms available
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <icons.X size={20} />
            </button>
          </div>

          {selectedRooms.length > 0 && (
            <div className="mt-1 flex items-center gap-1">
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full font-medium text-xs">
                {selectedRooms.length} room{selectedRooms.length > 1 ? 's' : ''} selected
              </span>
            </div>
          )}
        </div>

        {/* TABLE */}
        <div className="flex-1 overflow-hidden p-3">
          <div className="max-h-fit h-[70vh] overflow-x-auto overflow-y-auto rounded-xl border-2 border-gray-300 shadow-lg custom-scrollbar">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-linear-to-r from-gray-50 to-gray-100 z-10">
                <tr>
                  <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Room Details
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Meal Plan
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Inclusions
                  </th>
                  {/* <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Base Price
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Tax
                  </th> */}
                  <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Total Price
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Day Rates
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Cancellation
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room: hotelTypes.Room, index: number) => {
                  const dayRates = getFlattenedDayRates(room);
                  const cancelPolicies = room.CancelPolicies || [];
                  const isAdded = selectedRooms.some((r) => r.BookingCode === room.BookingCode);
                  const isExpanded = expandedRows[room.BookingCode];
                  const isPolicyExpanded = expandedPolicies[room.BookingCode];
                  const firstDayBasePrice = getFirstDayBasePrice(room);

                  return (
                    <RoomRow
                      key={room.BookingCode || index}
                      room={room}
                      index={index}
                      isAdded={isAdded}
                      isExpanded={isExpanded}
                      isPolicyExpanded={isPolicyExpanded}
                      dayRates={dayRates}
                      cancelPolicies={cancelPolicies}
                      firstDayBasePrice={firstDayBasePrice}
                      onToggleRow={toggleRowExpansion}
                      onTogglePolicy={togglePolicyExpansion}
                      onAddRoom={onAddRoom}
                      onRemoveRoom={onRemoveRoom}
                      hotelData={hotelData}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-white border-t-2 border-gray-300 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 shadow-lg">
          <div className="text-sm w-full sm:w-auto">
            {selectedRooms.length > 0 ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3">
                <span className="font-semibold text-gray-700 text-xs">
                  Selected: <span className="text-violet-600">{selectedRooms.length}</span>
                </span>
                {/* <span className="font-bold text-sm sm:text-base text-gray-900 flex items-center gap-0.5">
                  Total:
                  <icons.IndianRupee size={14} className="text-violet-600 sm:w-4 sm:h-4" />
                  <span className="text-violet-600">
                    {selectedRoomsTotal.toFixed(2)}
                  </span>
                </span> */}
              </div>
            ) : (
              <span className="text-gray-500 text-xs">No rooms selected</span>
            )}
          </div>
          <button
            onClick={handleShareClick}
            disabled={selectedRooms.length === 0}
            className={`w-full sm:w-auto flex items-center justify-center gap-1.5 font-semibold py-2 px-4 sm:px-5 rounded-lg transition-all shadow-md hover:shadow-lg text-xs sm:text-sm ${selectedRooms.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#0B5CAD] hover:bg-[#073B6D] text-white'
              }`}
          >
            <icons.Share2 size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Add to Share ({selectedRooms.length})</span>
            <span className="sm:hidden">Share ({selectedRooms.length})</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if these props change
  return (
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.hotel.HotelCode === nextProps.hotel.HotelCode &&
    prevProps.selectedRooms === nextProps.selectedRooms &&
    prevProps.onClose === nextProps.onClose &&
    prevProps.onAddRoom === nextProps.onAddRoom &&
    prevProps.onRemoveRoom === nextProps.onRemoveRoom &&
    prevProps.onShare === nextProps.onShare
  );
});

RoomPriceModal.displayName = 'RoomPriceModal';
