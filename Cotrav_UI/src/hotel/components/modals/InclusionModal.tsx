import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ui, icons } from '@/index';

interface InclusionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: any;
  hotel: any;
}

export const InclusionModal: React.FC<InclusionModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
  hotel,
}) => {
  // Parse inclusion string into array
  const parseInclusions = (inclusionString: string) => {
    if (!inclusionString) return [];
    return inclusionString.split(',').map(item => item.trim());
  };

  // Categorize hotel facilities
  const categorizeFacilities = (facilities: string[]) => {
    const categories: { [key: string]: string[] } = {
      'Accessibility': [],
      'Dining & Food': [],
      'Wellness & Spa': [],
      'Business & Meetings': [],
      'Parking & Transport': [],
      'General Amenities': [],
    };

    facilities.forEach(facility => {
      const lowerFacility = facility.toLowerCase();
      
      if (lowerFacility.includes('wheelchair') || lowerFacility.includes('accessible')) {
        categories['Accessibility'].push(facility);
      } else if (lowerFacility.includes('restaurant') || lowerFacility.includes('coffee') || 
                 lowerFacility.includes('bar') || lowerFacility.includes('breakfast') ||
                 lowerFacility.includes('dining')) {
        categories['Dining & Food'].push(facility);
      } else if (lowerFacility.includes('spa') || lowerFacility.includes('fitness') ||
                 lowerFacility.includes('pool') || lowerFacility.includes('gym')) {
        categories['Wellness & Spa'].push(facility);
      } else if (lowerFacility.includes('business') || lowerFacility.includes('meeting') ||
                 lowerFacility.includes('conference')) {
        categories['Business & Meetings'].push(facility);
      } else if (lowerFacility.includes('parking') || lowerFacility.includes('airport') ||
                 lowerFacility.includes('transportation')) {
        categories['Parking & Transport'].push(facility);
      } else {
        categories['General Amenities'].push(facility);
      }
    });

    // Remove empty categories
    return Object.entries(categories).filter(([_, items]) => items.length > 0);
  };

  const roomInclusions = parseInclusions(selectedRoom?.Inclusion || '');
  const roomPromotions = selectedRoom?.RoomPromotion || [];
  const hotelFacilities = hotel?.HotelFacilities || [];
  const categorizedFacilities = categorizeFacilities(hotelFacilities);

  // Get icon for category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Accessibility':
        return <icons.Accessibility className="text-[#0B5CAD]" size={20} />;
      case 'Dining & Food':
        return <icons.Utensils className="text-[#0B5CAD]" size={20} />;
      case 'Wellness & Spa':
        return <icons.Sparkles className="text-[#0B5CAD]" size={20} />;
      case 'Business & Meetings':
        return <icons.Briefcase className="text-[#0B5CAD]" size={20} />;
      case 'Parking & Transport':
        return <icons.Car className="text-[#0B5CAD]" size={20} />;
      default:
        return <icons.Star className="text-[#0B5CAD]" size={20} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0B5CAD] to-[#073B6D] px-6 py-4 text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <icons.X size={24} />
                </button>
                <h2 className="text-2xl font-bold">Room Inclusions & Amenities</h2>
                <p className="text-white/90 text-sm">
                  {Array.isArray(selectedRoom?.Name) ? selectedRoom.Name[0] : selectedRoom?.Name}
                </p>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 custom-scrollbar">
                {/* Room Inclusions */}
                {roomInclusions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <icons.Check className="text-green-600" size={24} />
                      <h3 className="text-xl font-bold text-gray-900">Included with Your Room</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {roomInclusions.map((inclusion, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                          className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                        >
                          <icons.Check size={16} className="text-green-600 shrink-0" />
                          <span className="text-sm text-gray-800">{inclusion}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Meal Type */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <icons.Utensils className="text-[#0B5CAD]" size={24} />
                    <h3 className="text-xl font-bold text-gray-900">Meal Plan</h3>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-800">
                      {selectedRoom?.MealType === 'Room_Only'
                        ? 'Room Only - No Meals Included'
                        : selectedRoom?.MealType === 'BreakFast'
                        ? 'Breakfast Included'
                        : selectedRoom?.MealType || 'Not specified'}
                    </p>
                  </div>
                </motion.div>

                {/* Room Promotions */}
                {roomPromotions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <icons.Gift className="text-[#0B5CAD]" size={24} />
                      <h3 className="text-xl font-bold text-gray-900">Special Offers</h3>
                    </div>
                    <div className="space-y-2">
                      {roomPromotions.map((promo: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-purple-200"
                        >
                          <icons.Gift size={16} className="text-[#0B5CAD] shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-800">{promo}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Hotel Facilities */}
                {categorizedFacilities.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <icons.Building className="text-[#0B5CAD]" size={24} />
                      <h3 className="text-xl font-bold text-gray-900">Hotel Facilities</h3>
                    </div>
                    <div className="space-y-6">
                      {categorizedFacilities.map(([category, facilities], categoryIndex) => (
                        <motion.div
                          key={category}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 + categoryIndex * 0.1 }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            {getCategoryIcon(category)}
                            <h4 className="text-lg font-semibold text-gray-800">{category}</h4>
                            <ui.Badge className="bg-[#0B5CAD]/10 text-[#0B5CAD] border-0 ml-2">
                              {facilities.length}
                            </ui.Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {facilities.map((facility, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + categoryIndex * 0.1 + index * 0.02 }}
                                className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <icons.Check size={14} className="text-[#0B5CAD] shrink-0" />
                                <span className="text-xs text-gray-700 line-clamp-2">{facility}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Empty State */}
                {roomInclusions.length === 0 && 
                 roomPromotions.length === 0 && 
                 hotelFacilities.length === 0 && (
                  <div className="text-center py-12">
                    <icons.Info className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">No additional information available</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {/* <div className="border-t border-gray-200 p-4 bg-gray-50">
                <ui.Button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-[#0B5CAD] to-[#073B6D] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white"
                >
                  Close
                </ui.Button>
              </div> */}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InclusionModal;
