
import React, { useState } from 'react';
import { ui, icons, bookingTypes, modals } from '@/index';

export const BookingConfirmationCard: React.FC<bookingTypes.BookingConfirmationCardProps> = ({
  bookingDetails,
  hotelImages = [],
  hotelMap,
  onViewMap,
  guestCount,
  className = '',
}) => {
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDate = (date: string) => {
    const d = new Date(date);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <icons.Star
            key={index}
            size={16}
            className={`transition-all ${
              index < rating 
                ? 'fill-yellow-400 stroke-yellow-500' 
                : 'fill-gray-200 stroke-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const parseCancellationPolicy = (policy: string) => {
    if (!policy) return [];
    return policy
      .split('#^#')[1]
      ?.split('|')
      .filter((line) => line && !line.includes('#!#'))
      .map((line) => line.trim()) || [];
  };

  const nights = calculateNights(bookingDetails.CheckInDate, bookingDetails.CheckOutDate);
  const selectedRoom = bookingDetails.Rooms[selectedRoomIndex];

  return (
    <>
      <ui.Card className={`overflow-hidden border-2 border-[#0B5CAD]/20 py-0 bg-white ${className}`}>
        <ui.CardContent className="p-0">
          {/* Top Section with Image and Hotel Details */}
          <div className="relative">
            {/* Hero Image Section */}
            {hotelImages[0] && (
              <div className="relative h-72 overflow-hidden">
                <img
                  src={hotelImages[0]}
                  alt="Hotel"
                  className="w-full h-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Floating Info Card on Image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {bookingDetails.HotelName}
                        </h2>
                        <div className="flex items-center gap-3 mb-3">
                          {renderStars(bookingDetails.StarRating)}
                          <span className="text-sm font-semibold text-gray-700">
                            {bookingDetails.StarRating} Star
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-gray-600">
                          <icons.MapPin size={16} className="shrink-0 mt-0.5 text-[#0B5CAD]" />
                          <span className="text-sm leading-snug">
                            {bookingDetails.AddressLine1} {bookingDetails.AddressLine2}
                          </span>
                        </div>
                      </div>
                      
                      {/* View Map Button */}
                      {hotelMap && (
                        <ui.Button
                          onClick={onViewMap}
                          size="sm"
                          className="bg-[#0B5CAD] hover:bg-[#094B8A] text-white shadow-lg shrink-0"
                        >
                          <icons.Navigation size={14} className="mr-1.5" />
                          Map
                        </ui.Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Check-in/Check-out Timeline */}
          <div className="px-6 py-6 bg-gradient-to-br from-blue-50 via-blue-50 to-pink-50">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0B5CAD] via-blue-400 to-[#0B5CAD]" />
                
                <div className="relative grid grid-cols-3 gap-4">
                  {/* Check-in */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border-4 border-[#0B5CAD] mb-3">
                      <icons.LogIn size={24} className="text-[#0B5CAD]" />
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Check-in
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {formatDate(bookingDetails.CheckInDate)}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">2:00 PM</p>
                  </div>

                  {/* Duration */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0B5CAD] to-[#094B8A] rounded-full shadow-lg mb-3">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white leading-none">{nights}</p>
                        <p className="text-[10px] text-white/90 uppercase font-semibold">
                          {nights === 1 ? 'Night' : 'Nights'}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-[#0B5CAD] mt-2">
                      Your Stay Duration
                    </p>
                  </div>

                  {/* Check-out */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border-4 border-[#0B5CAD] mb-3">
                      <icons.LogOut size={24} className="text-[#0B5CAD]" />
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Check-out
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {formatDate(bookingDetails.CheckOutDate)}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">11:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Room Details Section */}
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <icons.Bed className="text-[#0B5CAD]" size={24} />
              Room Details
            </h3>

            {bookingDetails.Rooms.map((room, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-[#0B5CAD]/50 hover:shadow-lg transition-all duration-300"
              >
                {/* Room Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white p-5 border-b-2 border-gray-200 hover:border-b-[#0B5CAD]/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#0B5CAD]/10 rounded-lg">
                          <icons.Home size={20} className="text-[#0B5CAD]" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {room.RoomTypeName || 'Standard Room'}
                        </h4>
                      </div>

                      {/* Meal Badge */}
                      {room.MealType && (
                        <ui.Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200">
                          <icons.Coffee size={14} className="mr-1" />
                          {room.MealType === 'Room_Only'
                            ? 'Room Only'
                            : room.MealType === 'BreakFast'
                              ? 'Breakfast Included'
                              : room.MealType}
                        </ui.Badge>
                      )}
                    </div>

                    {/* Room Count Badge */}
                    <div className="px-4 py-2 bg-[#0B5CAD] text-white rounded-xl font-bold text-sm shadow-md">
                      Room {index + 1}
                    </div>
                  </div>
                </div>

                {/* Room Content */}
                <div className="p-5 space-y-4">
                  {/* Amenities Grid */}
                  {room.Amenities && room.Amenities.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-3">Room Amenities:</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {room.Amenities.slice(0, 6).map((amenity, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg"
                          >
                            <div className="w-1.5 h-1.5 bg-[#0B5CAD] rounded-full" />
                            <span className="truncate">{amenity}</span>
                          </div>
                        ))}
                      </div>
                      
                      {room.Amenities.length > 6 && (
                        <ui.Button
                          variant="link"
                          size="sm"
                          className="text-[#0B5CAD] hover:text-[#094B8A] p-0 h-auto mt-2 font-semibold"
                          onClick={() => {
                            setSelectedRoomIndex(index);
                            setShowAmenitiesModal(true);
                          }}
                        >
                          + {room.Amenities.length - 6} more amenities
                          <icons.ChevronRight size={16} className="ml-1" />
                        </ui.Button>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {room.CancellationPolicy && (
                      <ui.Button
                        variant="outline"
                        size="sm"
                        className="border-[#0B5CAD] text-[#0B5CAD] hover:bg-[#0B5CAD] hover:text-white transition-all"
                        onClick={() => {
                          setSelectedRoomIndex(index);
                          setShowCancellationModal(true);
                        }}
                      >
                        <icons.FileText size={14} className="mr-1.5" />
                        Cancellation Policy
                      </ui.Button>
                    )}
                    
                    {room.Amenities && room.Amenities.length > 6 && (
                      <ui.Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setSelectedRoomIndex(index);
                          setShowAmenitiesModal(true);
                        }}
                      >
                        <icons.Sparkles size={14} className="mr-1.5" />
                        View All Amenities
                      </ui.Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Info Bar */}
          <div className="bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6 text-white">
                <div className="flex items-center gap-2">
                  <icons.Bed size={20} />
                  <div>
                    <p className="text-xs opacity-90">Total Rooms</p>
                    <p className="text-lg font-bold">{bookingDetails.Rooms.length}</p>
                  </div>
                </div>
                {/* <div className="h-10 w-px bg-white/30" />
                <div className="flex items-center gap-2">
                  <icons.Users size={20} />
                  <div>
                    <p className="text-xs opacity-90">Guests</p>
                    <p className="text-lg font-bold">{bookingDetails.Rooms.length * 2}</p>
                  </div>
                </div> */}

                 {guestCount && (
  <>
    <div className="h-10 w-px bg-white/30" />
    <div className="flex items-center gap-2">
      <icons.Users size={20} />
      <div>
        <p className="text-xs opacity-90">Guests</p>
        <p className="text-lg font-bold">{guestCount}</p>
      </div>
    </div>
  </>
)}
              </div>

             
              
              <div className="flex items-center gap-2 text-white">
                <icons.Info size={16} className="opacity-75" />
                <p className="text-sm opacity-90">Confirmation sent to your email</p>
              </div>
            </div>
          </div>
        </ui.CardContent>
      </ui.Card>

      {/* Amenities Modal - Using your existing component */}
      {selectedRoom?.Amenities && (
        <modals.AmenitiesModal
          isOpen={showAmenitiesModal}
          onClose={() => setShowAmenitiesModal(false)}
          facilities={selectedRoom.Amenities}
          hotelName={selectedRoom.RoomTypeName}
        />
      )}

      {/* Enhanced Cancellation Policy Modal */}
      {/* <ui.Dialog open={showCancellationModal} onOpenChange={setShowCancellationModal}>
        <ui.DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-100 border-0">
          <ui.DialogHeader>
            <ui.DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl">
                <icons.FileText className="w-6 h-6 text-white" />
              </div>
              Cancellation Policy
            </ui.DialogTitle>
            <p className="text-gray-600 text-sm mt-2">
              Important information about cancellation terms
            </p>
          </ui.DialogHeader>
          
          <div className="space-y-3 mt-6">
            {parseCancellationPolicy(selectedRoom?.CancellationPolicy || '').map((line, idx) => (
              <div
                key={idx}
                className="flex gap-4 items-start p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border-l-4 border-emerald-500 hover:shadow-md transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 mt-0.5">
                  <icons.Check size={14} className="text-white" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed flex-1">{line}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex gap-3">
              <icons.Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                Please read the cancellation policy carefully. Refunds are subject to the terms mentioned above.
              </p>
            </div>
          </div>
        </ui.DialogContent>
      </ui.Dialog> */}


      <ui.Dialog open={showCancellationModal} onOpenChange={setShowCancellationModal}>
  <ui.DialogContent className="max-w-2xl max-h-[90vh] p-0 gap-0 overflow-hidden bg-white border-none shadow-2xl [&>button]:hidden flex flex-col">
    {/* Fixed Header */}
    <ui.DialogHeader className="bg-linear-to-r from-emerald-500 to-green-600 px-4 py-3 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <ui.DialogTitle className="text-2xl font-bold flex items-center gap-3 text-white">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <icons.FileText className="w-6 h-6 text-white" />
            </div>
            Cancellation Policy
          </ui.DialogTitle>
          <p className="text-white/90 text-sm">
            Important information about cancellation terms
          </p>
        </div>
        <button
          onClick={() => setShowCancellationModal(false)}
          className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 shrink-0 ml-4"
        >
          <icons.X size={20} />
        </button>
      </div>
    </ui.DialogHeader>
    
    {/* Scrollable Content */}
    <div className="overflow-y-auto flex-1 min-h-0 p-6 bg-gray-50 space-y-3">
      {parseCancellationPolicy(selectedRoom?.CancellationPolicy || '').map((line, idx) => (
        <div
          key={idx}
          className="flex gap-4 items-start p-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-xl border-l-4 border-emerald-500 hover:shadow-md transition-all"
        >
          <div className="w-6 h-6 rounded-full bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 mt-0.5">
            <icons.Check size={14} className="text-white" />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed flex-1">{line}</p>
        </div>
      ))}
      
      {/* Info Box at bottom of scrollable area */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex gap-3">
          <icons.Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            Please read the cancellation policy carefully. Refunds are subject to the terms mentioned above.
          </p>
        </div>
      </div>
    </div>
  </ui.DialogContent>
</ui.Dialog>
    </>
  );
};

export default BookingConfirmationCard;
