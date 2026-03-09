
// import React, { useState, useMemo } from 'react';
// import { icons, amenitiesUtils } from '@/index';

// interface AmenitiesModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   facilities: string[];
//   hotelName?: string;
// }

// export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({
//   isOpen,
//   onClose,
//   facilities,
//   hotelName
// }) => {
//   const [searchQuery, setSearchQuery] = useState('');

// const categorizedAmenities = useMemo(
//   () => amenitiesUtils.categorizeAmenities(facilities),
//   [facilities]
// );


//   // Filter amenities based on search
//   const filteredAmenities = useMemo(() => {
//     if (!searchQuery.trim()) return categorizedAmenities;

//     const query = searchQuery.toLowerCase();
//     return categorizedAmenities
//       .map(([category, data]) => ({
//         category,
//         data: {
//           ...data,
//           items: data.items.filter(item => item.toLowerCase().includes(query))
//         }
//       }))
//       .filter(({ data }) => data.items.length > 0)
//       .map(({ category, data }) => [category, data] as [string, typeof data]);
//   }, [categorizedAmenities, searchQuery]);


//   // Move the early return AFTER all hooks
//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 "
//       onClick={onClose}
//     >
//       <div 
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-6 py-5">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h2 className="text-2xl font-bold text-white">Hotel Amenities & Facilities</h2>
//               {hotelName && (
//                 <p className="text-purple-100 text-sm mt-1">{hotelName}</p>
//               )}
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white/20 rounded-full transition-colors"
//               aria-label="Close"
//             >
//               <icons.X size={24} className="text-white" />
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="relative bg-white rounded-lg max-w-sm">
//             <icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search amenities..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 rounded-xl border-0 focus:ring-2 focus:ring-purple-300 outline-none text-gray-700 placeholder-gray-400"
//             />
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
//           {filteredAmenities.length === 0 ? (
//             <div className="text-center py-12">
//               <icons.Search size={48} className="text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500 text-lg">No amenities found matching "{searchQuery}"</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {filteredAmenities.map(([category, data]) => {
//                 const IconComponent = data.icon;
//                 return (
//                   <div key={category} className="bg-linear-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className={`p-2.5 bg-linear-to-br ${data.color} rounded-lg shadow-sm`}>
//                         <IconComponent size={20} className="text-white" />
//                       </div>
//                       <h3 className="text-base font-bold text-gray-800 flex-1">{category}</h3>
//                       <span className="text-xs font-semibold text-white bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-2.5 py-1 rounded-full shadow-sm">
//                         {data.items.length}
//                       </span>
//                     </div>
//                     <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
//                       {data.items.map((item, index) => (
//                         <div
//                           key={index}
//                           className="flex items-start gap-2 text-sm text-gray-700 p-2 rounded-lg hover:bg-blue-50 transition-colors group"
//                         >
//                           <icons.CheckCircle2 
//                             size={16} 
//                             className="text-green-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" 
//                           />
//                           <span className="leading-relaxed">{item}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {/* <div className="border-t bg-linear-to-r from-gray-50 to-white px-6 py-4 flex items-center justify-between">
//           <p className="text-sm text-gray-600">
//             {searchQuery ? (
//               <>
//                 Showing <span className="font-semibold text-purple-600">{filteredCount}</span> of{' '}
//                 <span className="font-semibold text-gray-800">{totalCount}</span> amenities
//               </>
//             ) : (
//               <>
//                 Total: <span className="font-semibold text-gray-800">{totalCount}</span> amenities available
//               </>
//             )}
//           </p>
//           <button
//             onClick={onClose}
//             className="px-6 py-2.5 bg-linear-to-r from-[#0B5CAD] to-[#094B8A] hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
//           >
//             Close
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// };



// import React, { useState, useMemo } from 'react';
// import { icons, amenitiesUtils } from '@/index';
// import { motion, AnimatePresence } from 'framer-motion';

// interface AmenitiesModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   facilities: string[];
//   hotelName?: string;
// }

// export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({
//   isOpen,
//   onClose,
//   facilities,
//   hotelName,
// }) => {
//     console.log("icons",icons);

//   const [searchQuery, setSearchQuery] = useState('');

//   const categorizedAmenities = useMemo(
//     () => amenitiesUtils.categorizeAmenities(facilities),
//     [facilities]
//   );

//   const filteredAmenities = useMemo(() => {
//     if (!searchQuery.trim()) return categorizedAmenities;

//     const query = searchQuery.toLowerCase();
//     return categorizedAmenities
//       .map(([category, data]) => ({
//         category,
//         data: {
//           ...data,
//           items: data.items.filter(item =>
//             item.toLowerCase().includes(query)
//           ),
//         },
//       }))
//       .filter(({ data }) => data.items.length > 0)
//       .map(({ category, data }) => [category, data] as [string, typeof data]);
//   }, [categorizedAmenities, searchQuery]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//           onClick={onClose}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.2, ease: 'easeOut' }}
//         >
//           <motion.div
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             transition={{ duration: 0.25, ease: 'easeOut' }}
//           >
//             {/* Header */}
//             <div className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-6 py-5">
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <h2 className="text-2xl font-bold text-white">
//                     Hotel Amenities & Facilities
//                   </h2>
//                   {hotelName && (
//                     <p className="text-purple-100 text-sm mt-1">
//                       {hotelName}
//                     </p>
//                   )}
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="p-2 hover:bg-white/20 rounded-full transition-colors"
//                   aria-label="Close"
//                 >
//                   <icons.X size={24} className="text-white cursor-pointer" />
//                 </button>
//               </div>

//               {/* Search Bar */}
//               <div className="relative bg-white rounded-lg max-w-sm">
//                 <icons.Search
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search amenities..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 rounded-xl border-0 focus:ring-2 focus:ring-purple-300 outline-none text-gray-700 placeholder-gray-400"
//                 />
//               </div>
//             </div>

//             {/* Content */}
//             <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
//               {filteredAmenities.length === 0 ? (
//                 <div className="text-center py-12">
//                   <icons.Search
//                     size={48}
//                     className="text-gray-300 mx-auto mb-4"
//                   />
//                   <p className="text-gray-500 text-lg">
//                     No amenities found matching "{searchQuery}"
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   {filteredAmenities.map(([category, data]) => {
//                     const IconComponent = data.icon;
//                     return (
//                       <div
//                         key={category}
//                         className="bg-linear-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
//                       >
//                         <div className="flex items-center gap-3 mb-4">
//                           <div
//                             className={`p-2.5 bg-linear-to-br ${data.color} rounded-lg shadow-sm`}
//                           >
//                             <IconComponent
//                               size={20}
//                               className="text-white"
//                             />
//                           </div>
//                           <h3 className="text-base font-bold text-gray-800 flex-1">
//                             {category}
//                           </h3>
//                           <span className="text-xs font-semibold text-white bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-2.5 py-1 rounded-full shadow-sm">
//                             {data.items.length}
//                           </span>
//                         </div>

//                         <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
//                           {data.items.map((item, index) => (
//                             <div
//                               key={index}
//                               className="flex items-start gap-2 text-sm text-gray-700 p-2 rounded-lg hover:bg-blue-50 transition-colors group"
//                             >
//                               <icons.CheckCircle2
//                                 size={16}
//                                 className="text-green-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
//                               />
//                               <span className="leading-relaxed">
//                                 {item}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };




// import React, { useState, useMemo } from 'react';
// import { icons, amenitiesUtils } from '@/index';
// import { motion, AnimatePresence } from 'framer-motion';

// interface AmenitiesModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   facilities: string[];
//   hotelName?: string;
// }

// export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({
//   isOpen,
//   onClose,
//   facilities,
//   hotelName,
// }) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   // Categorize amenities
//   const categorizedAmenities = useMemo(
//     () => amenitiesUtils.categorizeAmenities(facilities),
//     [facilities]
//   );

//   // Filter amenities by search
//   const filteredAmenities = useMemo(() => {
//     if (!searchQuery.trim()) return categorizedAmenities;

//     const query = searchQuery.toLowerCase();
//     return categorizedAmenities
//       .map(([category, data]) => ({
//         category,
//         data: {
//           ...data,
//           items: data.items.filter(item =>
//             item.toLowerCase().includes(query)
//           ),
//         },
//       }))
//       .filter(({ data }) => data.items.length > 0)
//       .map(({ category, data }) => [category, data] as [string, typeof data]);
//   }, [categorizedAmenities, searchQuery]);

//   // Fallback icon
//   const FALLBACK_ICON = icons.Info;
//   const CheckIcon = icons.CheckCircle2 ?? FALLBACK_ICON;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//           onClick={onClose}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.2, ease: 'easeOut' }}
//         >
//           <motion.div
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             transition={{ duration: 0.25, ease: 'easeOut' }}
//           >
//             {/* Header */}
//             <div className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-6 py-5">
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <h2 className="text-2xl font-bold text-white">
//                     Hotel Amenities & Facilities
//                   </h2>
//                   {hotelName && (
//                     <p className="text-purple-100 text-sm mt-1">
//                       {hotelName}
//                     </p>
//                   )}
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="p-2 hover:bg-white/20 rounded-full transition-colors"
//                   aria-label="Close"
//                 >
//                   {icons.X ? (
//                     <icons.X size={24} className="text-white cursor-pointer" />
//                   ) : (
//                     <FALLBACK_ICON size={24} className="text-white" />
//                   )}
//                 </button>
//               </div>

//               {/* Search Bar */}
//               <div className="relative bg-white rounded-lg max-w-sm">
//                 {icons.Search ? (
//                   <icons.Search
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                 ) : (
//                   <FALLBACK_ICON
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                 )}
//                 <input
//                   type="text"
//                   placeholder="Search amenities..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 rounded-xl border-0 focus:ring-2 focus:ring-purple-300 outline-none text-gray-700 placeholder-gray-400"
//                 />
//               </div>
//             </div>

//             {/* Content */}
//             <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
//               {filteredAmenities.length === 0 ? (
//                 <div className="text-center py-12">
//                   {icons.Search ? (
//                     <icons.Search
//                       size={48}
//                       className="text-gray-300 mx-auto mb-4"
//                     />
//                   ) : (
//                     <FALLBACK_ICON
//                       size={48}
//                       className="text-gray-300 mx-auto mb-4"
//                     />
//                   )}
//                   <p className="text-gray-500 text-lg">
//                     No amenities found matching "{searchQuery}"
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   {filteredAmenities.map(([category, data]) => {
//                     const IconComponent = data.icon || FALLBACK_ICON;

//                     return (
//                       <div
//                         key={category}
//                         className="bg-linear-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
//                       >
//                         <div className="flex items-center gap-3 mb-4">
//                           <div
//                             className={`p-2.5 bg-linear-to-br ${data.color} rounded-lg shadow-sm`}
//                           >
//                             <IconComponent size={20} className="text-white" />
//                           </div>
//                           <h3 className="text-base font-bold text-gray-800 flex-1">
//                             {category}
//                           </h3>
//                           <span className="text-xs font-semibold text-white bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-2.5 py-1 rounded-full shadow-sm">
//                             {data.items.length}
//                           </span>
//                         </div>

//                         <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
//                           {data.items.map((item, index) => (
//                             <div
//                               key={index}
//                               className="flex items-start gap-2 text-sm text-gray-700 p-2 rounded-lg hover:bg-blue-50 transition-colors group"
//                             >
//                               <CheckIcon
//   size={16}
//   className="text-green-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
// />
//                               <span className="leading-relaxed">{item}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

import React, { useState, useMemo } from 'react';
import { icons, amenitiesUtils } from '@/index';
import { motion, AnimatePresence } from 'framer-motion';

interface AmenitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  facilities: string[];
  hotelName?: string;
}

export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({
  isOpen,
  onClose,
  facilities,
  hotelName,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Categorize amenities
  const categorizedAmenities = useMemo(
    () => amenitiesUtils.categorizeAmenities(facilities),
    [facilities]
  );

  // Filter amenities by search
  const filteredAmenities = useMemo(() => {
    if (!searchQuery.trim()) return categorizedAmenities;

    const query = searchQuery.toLowerCase();
    return categorizedAmenities
      .map(([category, data]) => ({
        category,
        data: {
          ...data,
          items: data.items.filter(item =>
            item.toLowerCase().includes(query)
          ),
        },
      }))
      .filter(({ data }) => data.items.length > 0)
      .map(({ category, data }) => [category, data] as [string, typeof data]);
  }, [categorizedAmenities, searchQuery]);

  // Fallback icon
  const FALLBACK_ICON = icons.Info;
  const CheckIcon = icons.CheckCircle2 ?? FALLBACK_ICON;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Header - Compact */}
            <div className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1 min-w-0 pr-3">
                  <h2 className="text-2xl font-bold text-white truncate">
                    Hotel Amenities & Facilities
                  </h2>
                  {hotelName && (
                    <p className="text-purple-100 text-xs mt-0.5 truncate">
                      {hotelName}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors shrink-0"
                  aria-label="Close"
                >
                  {icons.X ? (
                    <icons.X size={20} className="text-white cursor-pointer" />
                  ) : (
                    <FALLBACK_ICON size={20} className="text-white" />
                  )}
                </button>
              </div>

              {/* Search Bar - Compact */}
              <div className="relative bg-white rounded-lg">
                {icons.Search ? (
                  <icons.Search
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                ) : (
                  <FALLBACK_ICON
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                )}
                <input
                  type="text"
                  placeholder="Search amenities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border-0 focus:ring-2 focus:ring-purple-300 outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Content - Compact */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {filteredAmenities.length === 0 ? (
                <div className="text-center py-8">
                  {icons.Search ? (
                    <icons.Search
                      size={40}
                      className="text-gray-300 mx-auto mb-3"
                    />
                  ) : (
                    <FALLBACK_ICON
                      size={40}
                      className="text-gray-300 mx-auto mb-3"
                    />
                  )}
                  <p className="text-gray-500 text-sm">
                    No amenities found matching "{searchQuery}"
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {filteredAmenities.map(([category, data]) => {
                    const IconComponent = data.icon || FALLBACK_ICON;

                    return (
                      <div
                        key={category}
                        className="bg-linear-to-br from-gray-50 to-white rounded-lg p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-2 mb-2.5">
                          <div
                            className={`p-1.5 bg-linear-to-br ${data.color} rounded-md shadow-sm`}
                          >
                            <IconComponent size={16} className="text-white" />
                          </div>
                          <h3 className="text-sm font-bold text-gray-800 flex-1 truncate">
                            {category}
                          </h3>
                          <span className="text-[10px] font-semibold text-white bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-2 py-0.5 rounded-full shadow-sm">
                            {data.items.length}
                          </span>
                        </div>

                        <div className="space-y-1 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                          {data.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-1.5 text-xs text-gray-700 p-1.5 rounded-md hover:bg-blue-50 transition-colors group m-0"
                            >
                              <CheckIcon
                                size={14}
                                className="text-green-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                              />
                              <span className="leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
