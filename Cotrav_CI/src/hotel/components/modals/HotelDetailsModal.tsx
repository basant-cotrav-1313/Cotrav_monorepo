
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hotelTypes, icons, dateFormatterUtils, timeFormatter } from '@/index';
import { Badge } from '@/components/ui/badge';
import { ImageIcon } from '@/components/icons';

interface HotelDetailsModalProps {
  isOpen: boolean;
  hotel: hotelTypes.Hotel;
  onClose: () => void;
  onViewImages?: (images: string[]) => void;
}

export const HotelDetailsModal: React.FC<HotelDetailsModalProps> = ({
  isOpen,
  hotel,
  onClose,
  onViewImages,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'facilities' | 'rooms' | 'attractions'>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Parse description sections
  const parseDescription = useCallback((description: string) => {
    const sections: Record<string, string> = {};
    const regex = /<p>(\w+)\s*:\s*([\s\S]*?)<\/p>/g;
    let match;

    while ((match = regex.exec(description)) !== null) {
      let content = match[2].trim();
      // Clean up excessive whitespace
      content = content.replace(/\s+/g, ' ').trim();
      sections[match[1]] = content;
    }

    return sections;
  }, []);

  const descriptionSections = parseDescription(hotel.Description || '');

  // Check if overview has any content
  const hasOverviewContent = Object.keys(descriptionSections).length > 0;

  // Render star rating
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, index) => (
      <icons.Star
        key={index}
        size={16}
        className={
          index < rating
            ? 'fill-yellow-400 stroke-yellow-400'
            : 'stroke-gray-300'
        }
      />
    ));

  // Handle image navigation
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (hotel.Images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (hotel.Images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring" as const, damping: 25, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" as const }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2, ease: "easeInOut" as const }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div 
            className="relative w-full max-w-7xl max-h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header - Compact */}
            <div className="relative bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] text-white px-6 py-4">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 hover:bg-white/20 rounded-full transition-colors z-10"
              >
                <icons.X size={20} />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{hotel.HotelName}</h2>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      {renderStars(hotel.HotelRating)}
                    </div>
                    <span className="text-white/70">•</span>
                    <div className="flex items-center gap-1.5">
                      <icons.MapPin size={14} />
                      <span>{hotel.CityName}, {hotel.CountryName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Split Layout */}
            <div className="flex-1 overflow-hidden flex">
              
              {/* LEFT SIDE - Image Gallery (Sticky) */}
              <div className="w-96 bg-gray-50 border-r border-gray-200 flex flex-col shrink-0">
                
                {/* Main Image with Navigation */}
                {hotel.Images && hotel.Images.length > 0 ? (
                  <div className="relative h-64 bg-gray-200">
                    <img
                      src={hotel.Images[currentImageIndex]}
                      alt={hotel.HotelName}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation arrows */}
                    {hotel.Images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-1.5 rounded-full shadow-lg transition-all"
                        >
                          <icons.ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-1.5 rounded-full shadow-lg transition-all"
                        >
                          <icons.ChevronRight size={20} />
                        </button>
                      </>
                    )}

                    {/* Image counter */}
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {currentImageIndex + 1} / {hotel.Images.length}
                    </div>

                    {/* View all photos button */}
                    {onViewImages && (
                      <button
                        onClick={() => onViewImages(hotel.Images || [])}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 transition-all text-sm"
                      >
                        <ImageIcon size={16} className="text-[#0B5CAD]" />
                        <span className="font-medium">View All {hotel.Images.length}</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="h-64 bg-gradient-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 flex items-center justify-center">
                    <icons.Building2 size={64} className="text-[#0B5CAD]/30" />
                  </div>
                )}

                {/* Key Information Cards */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  
                  {/* Check-in/out */}
                  {/* <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Check-in & Check-out</h4>
                    <div className="space-y-2">
                      <div className="bg-white border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-green-700 font-semibold text-sm mb-1">
                          <icons.Clock size={16} />
                          Check-in
                        </div>
                        <p className="text-gray-700 text-sm">{hotel.CheckInTime || 'Not specified'}</p>
                      </div>
                      <div className="bg-white border border-red-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-red-700 font-semibold text-sm mb-1">
                          <icons.Clock size={16} />
                          Check-out
                        </div>
                        <p className="text-gray-700 text-sm">{hotel.CheckOutTime || 'Not specified'}</p>
                      </div>
                    </div>
                  </div> */}

                  <div className="space-y-2">
  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Check-in & Check-out</h4>
  <div className="space-y-2">
    <div className="bg-white border border-green-200 rounded-lg p-3">
      <div className="flex items-center gap-2 text-green-700 font-semibold text-sm mb-1">
        <icons.Clock size={16} />
        Check-in
      </div>
      <p className="text-gray-700 text-sm">{timeFormatter.convertTo12Hour(hotel.CheckInTime) || 'Not specified'}</p>
    </div>
    <div className="bg-white border border-red-200 rounded-lg p-3">
      <div className="flex items-center gap-2 text-red-700 font-semibold text-sm mb-1">
        <icons.Clock size={16} />
        Check-out
      </div>
      <p className="text-gray-700 text-sm">{timeFormatter.convertTo12Hour(hotel.CheckOutTime) || 'Not specified'}</p>
    </div>
  </div>
</div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact</h4>
                    <div className="space-y-2">
                      {hotel.PhoneNumber && (
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-[#0B5CAD] text-xs mb-1">
                            <icons.Phone size={14} />
                            <span className="font-medium">Phone</span>
                          </div>
                          <p className="text-gray-700 text-sm">{hotel.PhoneNumber}</p>
                        </div>
                      )}
                      {hotel.Email && (
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-[#0B5CAD] text-xs mb-1">
                            <icons.Mail size={14} />
                            <span className="font-medium">Email</span>
                          </div>
                          <p className="text-gray-700 text-xs break-all">{hotel.Email}</p>
                        </div>
                      )}
                      {hotel.HotelWebsiteUrl && (
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-[#0B5CAD] text-xs mb-1">
                            <icons.Globe size={14} />
                            <span className="font-medium">Website</span>
                          </div>
                          <a
                            href={hotel.HotelWebsiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0B5CAD] hover:underline text-xs break-all"
                          >
                            Visit Website →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Address</h4>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <p className="text-gray-700 text-sm leading-relaxed">{hotel.Address}</p>
                      {hotel.PinCode && (
                        <p className="text-gray-600 text-xs mt-2">Postal Code: {hotel.PinCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - Detailed Content with Tabs */}
              <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* Tabs Navigation */}
                <div className="border-b border-gray-200 bg-white px-6">
                  <div className="flex gap-8">
                    {[
                      { id: 'overview', label: 'Overview', icon: icons.FileText },
                      { id: 'facilities', label: 'Facilities', icon: icons.Check },
                      { id: 'rooms', label: 'Rooms', icon: icons.Building2 },
                      { id: 'attractions', label: 'Attractions', icon: icons.MapPin },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`relative flex items-center gap-2 py-4 px-2 transition-all cursor-pointer ${
                          activeTab === tab.id
                            ? 'text-[#0B5CAD] font-semibold'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <tab.icon size={18} />
                        {tab.label}
                        {activeTab === tab.id && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B5CAD]"
                            layoutId="activeTab"
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                  <AnimatePresence mode="wait">
                    
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                      <motion.div 
                        key="overview"
                        className="space-y-6"
                        variants={tabContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {hasOverviewContent ? (
                          // Scenario 1: Structured sections exist
                          <>
                            {descriptionSections.HeadLine && (
                              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-r-lg p-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                  <icons.MapPin size={20} className="text-blue-600" />
                                  Location Highlights
                                </h3>
                                <p className="text-gray-700 leading-relaxed">{descriptionSections.HeadLine}</p>
                              </div>
                            )}

                            {descriptionSections.Location && (
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <icons.Info size={20} className="text-[#0B5CAD]" />
                                  About This Property
                                </h3>
                                <div 
                                  className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4 prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: descriptionSections.Location }}
                                />
                              </div>
                            )}

                            {descriptionSections.Rooms && (
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <icons.Building2 size={20} className="text-[#0B5CAD]" />
                                  Room Features
                                </h3>
                                <div 
                                  className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4 prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: descriptionSections.Rooms }}
                                />
                              </div>
                            )}

                            {descriptionSections.Dining && (
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <icons.Coffee size={20} className="text-[#0B5CAD]" />
                                  Dining Options
                                </h3>
                                <div 
                                  className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4 prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: descriptionSections.Dining }}
                                />
                              </div>
                            )}

                            {descriptionSections.CheckIn && (
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <icons.AlertCircle size={20} className="text-[#0B5CAD]" />
                                  Check-in Instructions
                                </h3>
                                <div 
                                  className="text-gray-700 leading-relaxed bg-yellow-50 border border-yellow-200 rounded-lg p-4 prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: descriptionSections.CheckIn }}
                                />
                              </div>
                            )}

                            {descriptionSections.Special && (
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <icons.Info size={20} className="text-[#0B5CAD]" />
                                  Special Instructions
                                </h3>
                                <div 
                                  className="text-gray-700 leading-relaxed bg-blue-50 border border-blue-200 rounded-lg p-4 prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: descriptionSections.Special }}
                                />
                              </div>
                            )}
                          </>
                        ) : hotel.Description ? (
                          // Scenario 2 & 3: Check if HTML or plain text
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <icons.Info size={20} className="text-[#0B5CAD]" />
                              About This Property
                            </h3>
                            {/(<([^>]+)>)/i.test(hotel.Description) ? (
                              // Scenario 2: Contains HTML - render with dangerouslySetInnerHTML
                              <div 
                                className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4 prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: hotel.Description }}
                              />
                            ) : (
                              // Scenario 3: Plain text - render normally
                              <div className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4 whitespace-pre-line">
                                {hotel.Description}
                              </div>
                            )}
                          </div>
                        ) : (
                          // Scenario 4: Empty state
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <icons.FileText size={48} className="text-gray-300 mb-4" />
                            <h4 className="text-lg font-semibold text-gray-600 mb-2">No Description Available</h4>
                            <p className="text-gray-500 text-sm">
                              Property details are currently not available. Please check the facilities and rooms tabs for more information.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Facilities Tab */}
                    {activeTab === 'facilities' && (
                      <motion.div 
                        key="facilities"
                        className="space-y-4"
                        variants={tabContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900">Hotel Facilities</h3>
                          <Badge variant="outline" className="bg-[#0B5CAD]/10 border-[#0B5CAD]/20 text-[#0B5CAD]">
                            {hotel.HotelFacilities?.length || 0} Amenities
                          </Badge>
                        </div>
                        {hotel.HotelFacilities && hotel.HotelFacilities.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {hotel.HotelFacilities.map((facility, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.02 }}
                                className="flex items-start gap-3 bg-white border border-gray-200 hover:border-[#0B5CAD]/30 hover:bg-[#0B5CAD]/5 p-3 rounded-lg transition-all"
                              >
                                <icons.Check size={18} className="text-green-600 shrink-0 mt-0.5" />
                                <span className="text-gray-700 text-sm leading-relaxed">{facility}</span>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <icons.Check size={48} className="text-gray-300 mb-4" />
                            <h4 className="text-lg font-semibold text-gray-600 mb-2">No Facilities Listed</h4>
                            <p className="text-gray-500 text-sm">
                              Facility information is currently not available for this property.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Rooms Tab */}
                    {activeTab === 'rooms' && (
                      <motion.div 
                        key="rooms"
                        className="space-y-4"
                        variants={tabContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900">Available Rooms</h3>
                          <Badge variant="outline" className="bg-[#0B5CAD]/10 border-[#0B5CAD]/20 text-[#0B5CAD]">
                            {hotel.Rooms?.length || 0} Options
                          </Badge>
                        </div>
                        {hotel.Rooms && hotel.Rooms.length > 0 ? (
                          hotel.Rooms.map((room, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="border-2 border-gray-200 rounded-xl p-5 hover:border-[#0B5CAD]/50 hover:shadow-lg transition-all bg-white"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                  <h4 className="font-bold text-lg text-gray-900 mb-3">
                                    {room.Name?.[0] || 'Room'}
                                  </h4>
                                  
                                  {/* Meal Type Badge */}
                                  {room.MealType && (
                                    <Badge className="bg-orange-500 text-white mb-3">
                                      <icons.Coffee size={12} className="mr-1" />
                                      {room.MealType.replace('_', ' ')}
                                    </Badge>
                                  )}

                                  {/* Inclusions */}
                                  {room.Inclusion && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                      {room.Inclusion.split(',').map((inc, i) => (
                                        <Badge
                                          key={i}
                                          variant="outline"
                                          className="bg-green-50 border-green-200 text-green-700"
                                        >
                                          <icons.Check size={12} className="mr-1" />
                                          {inc.trim()}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {/* Promotions */}
                                  {/* {room.RoomPromotion && room.RoomPromotion.length > 0 && (
                                    <div className="flex gap-2 flex-wrap">
                                      {room.RoomPromotion?.map((promo: any, i: number) => (
                                        <Badge key={i} className="bg-red-600 text-white">
                                          <icons.Tag size={12} className="mr-1" />
                                          {promo}
                                        </Badge>
                                      ))}
                                    </div>
                                  )} */}
                                </div>
                                
                                {/* Pricing */}
                                <div className="text-right bg-gradient-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 rounded-lg p-4 ml-4">
                                  <div className="text-xs text-gray-600 mb-1">Total Price</div>
                                  <div className="text-2xl font-bold text-[#0B5CAD] mb-1">
                                    ₹{Math.round(room.TotalFare).toLocaleString('en-IN')}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    + ₹{Math.round(room.TotalTax).toLocaleString('en-IN')} tax
                                  </div>
                                  <div className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-300">
                                    Total: ₹{Math.round(room.TotalFare + room.TotalTax).toLocaleString('en-IN')}
                                  </div>
                                </div>
                              </div>

                              {/* Cancellation Policy */}
                              {room.CancelPolicies && room.CancelPolicies.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <div className="flex items-start gap-3">
                                    <div className="flex items-center gap-2">
                                      {room.IsRefundable ? (
                                        <>
                                          <icons.Check size={16} className="text-green-600" />
                                          <span className="text-green-700 font-semibold text-sm">Refundable</span>
                                        </>
                                      ) : (
                                        <>
                                          <icons.X size={16} className="text-red-600" />
                                          <span className="text-red-700 font-semibold text-sm">Non-Refundable</span>
                                        </>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      {room.CancelPolicies.map((policy, i) => (
                                        <div key={i} className="text-xs text-gray-600 mb-1">
                                          From {dateFormatterUtils.formatHotelDateTime(policy.FromDate)}: {policy.CancellationCharge}% charge
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <icons.Building2 size={48} className="text-gray-300 mb-4" />
                            <h4 className="text-lg font-semibold text-gray-600 mb-2">No Rooms Available</h4>
                            <p className="text-gray-500 text-sm">
                              Room information is currently not available for this property.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Attractions Tab */}
                    {activeTab === 'attractions' && (
                      <motion.div 
                        key="attractions"
                        className="space-y-6"
                        variants={tabContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {/* Nearby Attractions */}
                        {hotel.Attractions && Object.keys(hotel.Attractions).length > 0 ? (
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-bold text-gray-900">Nearby Attractions</h3>
                              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                                {Object.keys(hotel.Attractions).length} Places
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {Object.entries(hotel.Attractions).map(([key, value]: [string, string], index: number) => (
                                <motion.div
                                  key={key}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.02 }}
                                  className="flex items-start gap-3 p-3 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-lg transition-all"
                                >
                                  <icons.MapPin size={16} className="text-blue-600 shrink-0 mt-1" />
                                  <span className="text-gray-700 text-sm leading-relaxed">{value}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <icons.MapPin size={48} className="text-gray-300 mb-4" />
                            <h4 className="text-lg font-semibold text-gray-600 mb-2">No Attractions Listed</h4>
                            <p className="text-gray-500 text-sm">
                              Nearby attraction information is currently not available for this property.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
