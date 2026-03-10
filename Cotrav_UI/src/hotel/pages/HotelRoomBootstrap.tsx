// import React from 'react';
// import { useBookNowInitializer } from '@/hotel/hooks/useBookNowInitializer';

// const HotelRoom: React.FC = () => {
//   const { loading, step } = useBookNowInitializer();

//   const getStepMessage = () => {
//     switch (step) {
//       case 1:
//         return "Parsing booking data...";
//       case 2:
//         return "Fetching passenger details...";
//       case 3:
//         return "Searching for your hotel...";
//       case 4:
//         return "Retrieving hotel details...";
//       case 5:
//         return "Loading hotel page...";
//       default:
//         return "Please wait...";
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B5CAD]/5 to-[#094B8A]/5">
//       {loading && (
//         <div className="text-center">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0B5CAD] mx-auto mb-6"></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="h-8 w-8 rounded-full bg-[#0B5CAD]/20"></div>
//             </div>
//           </div>
          
//           <div className="space-y-2">
//             <p className="text-xl font-semibold text-gray-800">
//               {getStepMessage()}
//             </p>
//             <p className="text-sm text-gray-500">
//               Step {step} of 5
//             </p>
//           </div>

//           {/* Progress bar */}
//           <div className="mt-6 w-64 mx-auto">
//             <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//               <div 
//                 className="h-full bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] transition-all duration-500 ease-out"
//                 style={{ width: `${(step / 5) * 100}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HotelRoom;

import React from 'react';
import { useBookNowInitializer } from '@/hotel/hooks/useBookNowInitializer';
import { components } from '@/index';

const HotelRoom: React.FC = () => {
  const { loading, step } = useBookNowInitializer();

  return (
    <>
      {loading && (
        <components.BookNowLoader step={step} />
      )}
    </>
  );
};

export default HotelRoom;
