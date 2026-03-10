// // src/hotel/components/HotelImportantInfo.tsx

// import React from 'react';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Info, ChevronRight } from 'lucide-react';

// interface HotelImportantInfoProps {
//   rateConditions: string[];
//   onViewMore: () => void;
//   previewCount?: number;
//   className?: string;
// }

// export const HotelImportantInfo: React.FC<HotelImportantInfoProps> = ({
//   rateConditions,
//   onViewMore,
//   previewCount = 4,
//   className = '',
// }) => {
//   const stripHtmlTags = (html: string) => {
//     const textarea = document.createElement('textarea');
//     textarea.innerHTML = html;
//     const decodedHtml = textarea.value;
//     return decodedHtml.replace(/<\/?[^>]+(>|$)/g, '');
//   };

//   const previewConditions = rateConditions.slice(0, previewCount);
//   const hasMore = rateConditions.length > previewCount;

//   return (
//     <div className={`w-full ${className}`}>
//       <ui.Card className="border-purple-100 shadow-xl overflow-hidden py-0">
//         {/* Header */}
//         <ui.CardHeader className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] px-4 py-3">
//           <h5 className="text-white text-lg font-bold flex items-center gap-2">
//             <icons.Info className="w-5 h-5" />
//             Important Information
//           </h5>
//         </ui.CardHeader>

//         <ui.CardContent className="p-4 md:p-5 space-y-3">
//           {/* Display Preview Conditions */}
//           {previewConditions.length > 0 ? (
//             <ul className="space-y-2">
//               {previewConditions.map((condition, index) => (
//                 <li
//                   key={index}
//                   className="flex items-start gap-2 text-sm text-gray-700"
//                 >
//                   <span className="text-[#0B5CAD] font-bold mt-0.5 shrink-0">
//                     •
//                   </span>
//                   <span>{stripHtmlTags(condition)}</span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-sm text-gray-500 text-center py-4">
//               No important information available
//             </p>
//           )}

//           {/* View More Button */}
//           {hasMore && (
//             <Button
//               variant="ghost"
//               className="text-[#0B5CAD] text-sm font-semibold hover:text-[#073B6D] hover:bg-blue-50 transition-colors flex items-center gap-1 group p-0"
//               onClick={onViewMore}
//             >
//               <span>View More</span>
//               <icons.ChevronRight
//                 size={16}
//                 className="transform group-hover:translate-x-1 transition-transform"
//               />
//             </Button>
//           )}
//         </ui.CardContent>
//       </ui.Card>
//     </div>
//   );
// };

// export default HotelImportantInfo;


// src/hotel/components/HotelImportantInfo.tsx


import React, { useState } from 'react';
import { ui, icons, hotelTypes } from '@/index';
import { HotelImportantInfoModal } from './modals/HotelImportantInfoModal';

export const HotelImportantInfo: React.FC<hotelTypes.HotelImportantInfoProps> = ({
  rateConditions,
  previewCount = 4,
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stripHtmlTags = (html: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    const decodedHtml = textarea.value;
    return decodedHtml.replace(/<\/?[^>]+(>|$)/g, '');
  };

  const previewConditions = rateConditions.slice(0, previewCount);
  const hasMore = rateConditions.length > previewCount;

  return (
    <>
      <div className={`w-full ${className}`}>
        <ui.Card className="border-purple-100 shadow-xl overflow-hidden py-0">
          {/* Header */}
          <ui.CardHeader className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] px-4 py-2.5 pb-0">
            <h5 className="text-white text-lg font-bold flex items-center gap-2">
              <icons.Info className="w-5 h-5" />
              Important Information
            </h5>
          </ui.CardHeader>

          <ui.CardContent className="p-4 md:p-5 space-y-4">
            {/* Display Preview Conditions */}
            {previewConditions.length > 0 ? (
              <ul className="space-y-2.5">
                {previewConditions.map((condition, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700 pl-1"
                  >
                    <span className="text-[#0B5CAD] font-bold mt-0.5 shrink-0">
                      •
                    </span>
                    <span className="leading-relaxed">{stripHtmlTags(condition)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No important information available
              </p>
            )}

            {/* Enhanced View More Button */}
            {hasMore && (
              <div className="pt-3 border-t border-gray-100">
                <ui.Button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative w-full sm:w-auto bg-linear-to-r from-[#0B5CAD] to-[#073B6D] hover:from-[#6a4fd7] hover:to-[#052A4F] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 overflow-hidden"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  
                  {/* Content */}
                  <icons.Sparkles className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">View All {rateConditions.length} Conditions</span>
                  <icons.ChevronRight
                    className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
                  />
                </ui.Button>
              </div>
            )}
          </ui.CardContent>
        </ui.Card>
      </div>

      {/* Import and use the separate modal component */}
      <HotelImportantInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rateConditions={rateConditions}
      />
    </>
  );
};

export default HotelImportantInfo;
