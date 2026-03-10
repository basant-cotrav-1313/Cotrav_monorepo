// import React from 'react';
// import { ui, icons } from '@/index';

// interface BookNowLoaderProps {
//   step?: number;
// }

// export const BookNowLoader = ({ step = 1 }: BookNowLoaderProps) => {
//   const steps = [
//     { id: 1, label: 'Parsing booking data', icon: icons.FileText },
//     { id: 2, label: 'Fetching passenger details', icon: icons.Users },
//     { id: 3, label: 'Searching for your hotel', icon: icons.Search },
//     { id: 4, label: 'Retrieving hotel details', icon: icons.Building2 },
//     { id: 5, label: 'Loading hotel page', icon: icons.Sparkles },
//   ];

//   const progress = (step / steps.length) * 100;

//   return (
//     <div className="fixed inset-0 bg-linear-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center z-50 p-4">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0B5CAD] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//         <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#094B8A] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#2B78C2] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       <ui.Card className="max-w-md w-full shadow-2xl border-0 relative backdrop-blur-sm bg-white/95">
//         <ui.CardContent className="p-6">
//           {/* GIF and Header */}
//           <div className="text-center mb-6">
//             <div className="relative inline-block mb-4">
//               <div className="absolute inset-0 bg-linear-to-r from-[#0B5CAD] to-[#094B8A] rounded-full blur-lg opacity-40 animate-pulse"></div>
//               <div className="relative bg-white rounded-full p-2 shadow-lg">
//                 <img
//                   src="/gifs/cotravloader.gif"
//                   alt="Loading"
//                   className="w-16 h-16 object-contain"
//                 />
//               </div>
//             </div>
//             <h2 className="text-2xl font-bold bg-linear-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent mb-1">
//               Preparing Your Booking
//             </h2>
//             <p className="text-gray-600 text-xs">
//               Getting your hotel ready
//             </p>
//           </div>

//           {/* Progress Steps */}
//           <div className="space-y-2 mb-5">
//             {steps.map((item) => {
//               const isCompleted = item.id < step;
//               const isCurrent = item.id === step;
//               const IconComponent = item.icon;

//               return (
//                 <div
//                   key={item.id}
//                   className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
//                     isCurrent
//                       ? 'bg-linear-to-r from-[#0B5CAD]/10 to-[#094B8A]/10'
//                       : isCompleted
//                       ? 'bg-green-50/50'
//                       : 'bg-gray-50/50'
//                   }`}
//                 >
//                   {/* Step Indicator */}
//                   <div className="shrink-0">
//                     {isCompleted ? (
//                       <div className="w-8 h-8 rounded-full bg-linear-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-sm">
//                         <icons.CheckCircle2 className="w-5 h-5 text-white" />
//                       </div>
//                     ) : isCurrent ? (
//                       <div className="w-8 h-8 rounded-full bg-linear-to-r from-[#0B5CAD] to-[#094B8A] flex items-center justify-center shadow-sm animate-pulse">
//                         <icons.Loader2 className="w-5 h-5 text-white animate-spin" />
//                       </div>
//                     ) : (
//                       <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs font-semibold">
//                         {item.id}
//                       </div>
//                     )}
//                   </div>

//                   {/* Step Content */}
//                   <div className="flex-1 min-w-0 flex items-center gap-2">
//                     <IconComponent className={`w-4 h-4 shrink-0 ${
//                       isCurrent
//                         ? 'text-[#0B5CAD]'
//                         : isCompleted
//                         ? 'text-green-600'
//                         : 'text-gray-400'
//                     }`} />
//                     <p
//                       className={`text-xs font-medium transition-colors ${
//                         isCurrent
//                           ? 'text-gray-900 font-semibold'
//                           : isCompleted
//                           ? 'text-green-700'
//                           : 'text-gray-400'
//                       }`}
//                     >
//                       {item.label}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Progress Bar */}
//           <div className="space-y-2">
//             <div className="flex items-center justify-between text-xs mb-2">
//               <span className="text-gray-600 font-medium">
//                 Step {step} of {steps.length}
//               </span>
//               <span className="text-transparent bg-linear-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text font-semibold">
//                 {Math.round(progress)}% Complete
//               </span>
//             </div>
//             <ui.Progress value={progress} className="h-2 bg-gray-200 [&>div]:bg-linear-to-r [&>div]:from-[#0B5CAD] [&>div]:to-[#094B8A]"  />
//           </div>
//         </ui.CardContent>
//       </ui.Card>
//     </div>
//   );
// };


// import React, { useState, useEffect } from 'react';
// import { ui, icons } from '@/index';

// interface BookNowLoaderProps {
//   step?: number;
// }

// export const BookNowLoader = ({ step = 1 }: BookNowLoaderProps) => {
//   const [messageIndex, setMessageIndex] = useState(0);
//   const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  
//   const steps = [
//     { id: 1, label: 'Parsing booking data', icon: icons.FileText },
//     { id: 2, label: 'Fetching passenger details', icon: icons.Users },
//     { id: 3, label: 'Searching for your hotel', icon: icons.Search },
//     { id: 4, label: 'Retrieving hotel details', icon: icons.Building2 },
//     { id: 5, label: 'Loading hotel page', icon: icons.Sparkles },
//   ];

//   const messages = [
//     'Preparing your booking...',
//     'Processing details...',
//     'Finding your hotel...',
//     'Almost ready...',
//   ];

//   const progress = (step / steps.length) * 100;

//   // Step positions around the center (in a circle - 5 positions)
//   const stepPositions = [
//     { top: '10%', left: '50%', delay: 0 },      // Top
//     { top: '30%', left: '85%', delay: 200 },    // Top-right
//     { top: '70%', left: '85%', delay: 400 },    // Bottom-right
//     { top: '90%', left: '50%', delay: 600 },    // Bottom
//     { top: '50%', left: '15%', delay: 800 },    // Left
//   ];

//   // Rotate messages
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMessageIndex((prev) => (prev + 1) % messages.length);
//     }, 2500);
//     return () => clearInterval(interval);
//   }, []);

//   // Animate steps appearing
//   useEffect(() => {
//     stepPositions.forEach((_, index) => {
//       setTimeout(() => {
//         setVisibleSteps((prev) => [...prev, index]);
//       }, stepPositions[index].delay);
//     });
//   }, []);

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center z-50 p-4">
//       {/* Subtle background blobs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0B5CAD] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//         <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#094B8A] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animate-delay-2000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#2B78C2] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animate-delay-4000"></div>
//       </div>

//       <div className="max-w-lg w-full relative">
//         {/* Step Icons Container */}
//         <div className="relative h-96 flex items-center justify-center mb-8">
//           {/* Animated Step Icons */}
//           {stepPositions.map((pos, index) => {
//             const stepData = steps[index];
//             const IconComponent = stepData.icon;
//             const isCompleted = stepData.id < step;
//             const isCurrent = stepData.id === step;

//             return (
//               <div
//                 // key={index}
//                 key={`step-${index}`}
//                 className={`absolute transition-all duration-700 z-10 ${
//                   visibleSteps.includes(index)
//                     ? 'opacity-100 scale-100'
//                     : 'opacity-0 scale-50'
//                 }`}
//                 style={{
//                   top: pos.top,
//                   left: pos.left,
//                   transform: 'translate(-50%, -50%)',
//                 }}
//               >
//                 <div className="relative">
//                   {/* Glow effect */}
//                   <div className={`absolute inset-0 rounded-lg blur-md opacity-40 animate-pulse ${
//                     isCompleted ? 'bg-green-500' : isCurrent ? 'bg-[#0B5CAD]' : 'bg-gray-400'
//                   }`}></div>
//                   {/* Icon */}
//                   <div className={`relative bg-white p-3 rounded-lg shadow-lg border ${
//                     isCompleted 
//                       ? 'border-green-500/20' 
//                       : isCurrent 
//                       ? 'border-[#0B5CAD]/20' 
//                       : 'border-gray-300/20'
//                   }`}>
//                     {isCompleted ? (
//                       <icons.CheckCircle2 className="w-5 h-5 text-green-600" />
//                     ) : isCurrent ? (
//                       <IconComponent className="w-5 h-5 text-[#0B5CAD] animate-pulse" />
//                     ) : (
//                       <IconComponent className="w-5 h-5 text-gray-400" />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {/* Connecting Lines Animation - Gray dashed lines to ALL steps */}
//           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0">
//             {visibleSteps.map((stepIndex) => (
//               <line
//                 // key={stepIndex}
//                 key={`line-${stepIndex}`} 
//                 x1="50%"
//                 y1="50%"
//                 x2={stepPositions[stepIndex].left}
//                 y2={stepPositions[stepIndex].top}
//                 stroke="#9ca3af"
//                 strokeWidth="2"
//                 strokeDasharray="6 4"
//               />
//             ))}
//           </svg>

//           {/* Center CoTrav GIF */}
//           <div className="relative z-10">
//             {/* Outer glow ring */}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] rounded-full blur-2xl opacity-30 animate-pulse"></div>
            
//             {/* Rotating ring */}
//             <div className="absolute inset-0 animate-spin-slow">
//               <div className="w-full h-full rounded-full border-2 border-transparent border-t-[#0B5CAD] border-r-[#094B8A]"></div>
//             </div>

//             {/* GIF Container */}
//             <div className="relative bg-white rounded-full p-5 shadow-2xl border-2 border-[#0B5CAD]/20">
//               <img
//                 src="/gifs/cotravloader.gif"
//                 alt="Loading"
//                 className="w-24 h-24 object-contain"
//               />
//             </div>

//             {/* Progress ring */}
//             <svg className="absolute inset-0 w-full h-full -rotate-90">
//               <circle
//                 cx="50%"
//                 cy="50%"
//                 r="45%"
//                 stroke="rgba(120, 94, 247, 0.15)"
//                 strokeWidth="2"
//                 fill="none"
//               />
//               <circle
//                 cx="50%"
//                 cy="50%"
//                 r="45%"
//                 stroke="url(#progressGradient)"
//                 strokeWidth="2"
//                 fill="none"
//                 strokeDasharray={`${2 * Math.PI * 45}`}
//                 strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
//                 strokeLinecap="round"
//                 className="transition-all duration-500"
//               />
//               <defs>
//                 <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                   <stop offset="0%" stopColor="#0B5CAD" />
//                   <stop offset="100%" stopColor="#094B8A" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </div>
//         </div>

//         {/* Message */}
//         <div className="text-center mb-4">
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent mb-2">
//             Preparing Your Booking
//           </h2>
//           <div className="h-6 relative overflow-hidden">
//             {messages.map((message, index) => (
//               <p
//                 // key={index}
//                 key={`message-${index}`}
//                 className={`text-gray-600 text-sm absolute w-full transition-all duration-500 ${
//                   index === messageIndex
//                     ? 'opacity-100 translate-y-0'
//                     : 'opacity-0 translate-y-4'
//                 }`}
//               >
//                 {message}
//               </p>
//             ))}
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="space-y-2">
//           <ui.Progress 
//             value={progress} 
//             className="h-2 bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-[#0B5CAD] [&>div]:to-[#094B8A]" 
//           />
//           <div className="flex justify-between items-center text-xs">
//             <span className="text-gray-500">
//               Step {step} of {steps.length}
//             </span>
//             <span className="text-transparent bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text font-semibold">
//               {Math.round(progress)}%
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { ui, icons } from '@/index';

interface BookNowLoaderProps {
  step?: number;
}

// Move these outside the component
const steps = [
  { id: 1, label: 'Parsing booking data', icon: icons.FileText },
  { id: 2, label: 'Fetching passenger details', icon: icons.Users },
  { id: 3, label: 'Searching for your hotel', icon: icons.Search },
  { id: 4, label: 'Retrieving hotel details', icon: icons.Building2 },
  { id: 5, label: 'Loading hotel page', icon: icons.Sparkles },
];

const messages = [
  'Preparing your booking...',
  'Processing details...',
  'Finding your hotel...',
  'Almost ready...',
];

// Step positions around the center (in a circle - 5 positions)
const stepPositions = [
  { top: '10%', left: '50%', delay: 0 },      // Top
  { top: '30%', left: '85%', delay: 200 },    // Top-right
  { top: '70%', left: '85%', delay: 400 },    // Bottom-right
  { top: '90%', left: '50%', delay: 600 },    // Bottom
  { top: '50%', left: '15%', delay: 800 },    // Left
];

export const BookNowLoader = ({ step = 1 }: BookNowLoaderProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  const progress = (step / steps.length) * 100;

  // Rotate messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Animate steps appearing
  useEffect(() => {
    const timeouts: number[] = [];
    
    stepPositions.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setVisibleSteps((prev) => {
          // Only add if not already present
          if (!prev.includes(index)) {
            return [...prev, index];
          }
          return prev;
        });
      }, stepPositions[index].delay);
      
      timeouts.push(timeout);
    });
    
    // Cleanup timeouts on unmount
    return () => {
      timeouts.forEach(clearTimeout);
      setVisibleSteps([]); // Clear on unmount instead
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center z-50 p-4">
      {/* Subtle background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0B5CAD] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#094B8A] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animate-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#2B78C2] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animate-delay-4000"></div>
      </div>

      <div className="max-w-lg w-full relative">
        {/* Step Icons Container */}
        <div className="relative h-96 flex items-center justify-center mb-8">
          {/* Animated Step Icons */}
          {stepPositions.map((pos, index) => {
            const stepData = steps[index];
            const IconComponent = stepData.icon;
            const isCompleted = stepData.id < step;
            const isCurrent = stepData.id === step;

            return (
              <div
                key={`step-${index}`}
                className={`absolute transition-all duration-700 z-10 ${
                  visibleSteps.includes(index)
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-50'
                }`}
                style={{
                  top: pos.top,
                  left: pos.left,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-lg blur-md opacity-40 animate-pulse ${
                    isCompleted ? 'bg-green-500' : isCurrent ? 'bg-[#0B5CAD]' : 'bg-gray-400'
                  }`}></div>
                  {/* Icon */}
                  <div className={`relative bg-white p-3 rounded-lg shadow-lg border ${
                    isCompleted 
                      ? 'border-green-500/20' 
                      : isCurrent 
                      ? 'border-[#0B5CAD]/20' 
                      : 'border-gray-300/20'
                  }`}>
                    {isCompleted ? (
                      <icons.CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : isCurrent ? (
                      <IconComponent className="w-5 h-5 text-[#0B5CAD] animate-pulse" />
                    ) : (
                      <IconComponent className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Connecting Lines Animation - Gray dashed lines to ALL steps */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0">
            {visibleSteps.map((stepIndex) => (
              <line
                key={`line-${stepIndex}`} 
                x1="50%"
                y1="50%"
                x2={stepPositions[stepIndex].left}
                y2={stepPositions[stepIndex].top}
                stroke="#9ca3af"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            ))}
          </svg>

          {/* Center CoTrav GIF */}
          <div className="relative z-10">
            {/* Outer glow ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] rounded-full blur-2xl opacity-30 animate-pulse"></div>
            
            {/* Rotating ring */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="w-full h-full rounded-full border-2 border-transparent border-t-[#0B5CAD] border-r-[#094B8A]"></div>
            </div>

            {/* GIF Container */}
            <div className="relative bg-white rounded-full p-5 shadow-2xl border-2 border-[#0B5CAD]/20">
              <img
                src="/gifs/cotravloader.gif"
                alt="Loading"
                className="w-24 h-24 object-contain"
              />
            </div>

            {/* Progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="rgba(120, 94, 247, 0.15)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="url(#progressGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0B5CAD" />
                  <stop offset="100%" stopColor="#094B8A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent mb-2">
            Preparing Your Booking
          </h2>
          <div className="h-6 relative overflow-hidden">
            {messages.map((message, index) => (
              <p
                key={`message-${index}`}
                className={`text-gray-600 text-sm absolute w-full transition-all duration-500 ${
                  index === messageIndex
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {message}
              </p>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <ui.Progress 
            value={progress} 
            className="h-2 bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-[#0B5CAD] [&>div]:to-[#094B8A]" 
          />
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">
              Step {step} of {steps.length}
            </span>
            <span className="text-transparent bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};



// import React from 'react';

// interface BookNowLoaderProps {
//   step?: number;
// }

// export const BookNowLoader: React.FC<BookNowLoaderProps> = ({ step = 1 }) => {
//   // Messages based on step
//   const getMessage = () => {
//     if (step === 1) return 'Parsing booking data...';
//     if (step === 2) return 'Fetching passenger details...';
//     if (step === 3) return 'Searching for your hotel...';
//     if (step === 4) return 'Retrieving hotel details...';
//     return 'Loading hotel page...';
//   };

//   const progress = (step / 5) * 100;

//   return (
//     <div 
//       className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-gray-100"
//       style={{ 
//         // backgroundColor: 'rgba(0, 0, 0, 0.4)',
//         backdropFilter: 'blur(8px)',
//         WebkitBackdropFilter: 'blur(8px)'
//       }}
//     >
//       {/* Subtle background blobs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0B5CAD] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
//         <div 
//           className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#094B8A] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
//           style={{ animationDelay: '2s' }}
//         ></div>
//         <div 
//           className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-[#2B78C2] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
//           style={{ animationDelay: '4s' }}
//         ></div>
//       </div>

//       <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-12 flex flex-col items-center gap-6 max-w-md w-full relative overflow-hidden">
//         {/* Decorative top accent */}
//         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B5CAD] via-[#094B8A] to-[#2B78C2]"></div>

//         {/* GIF with rotating ring */}
//         <div className="relative">
//           {/* Rotating ring */}
//           <div className="absolute inset-0 -m-3">
//             <div className="w-full h-full rounded-full border-3 border-transparent border-t-[#0B5CAD] border-r-[#094B8A] animate-spin"></div>
//           </div>

//           {/* Pulsing glow */}
//           <div className="absolute inset-0 bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] rounded-full blur-xl opacity-20 animate-pulse"></div>

//           {/* GIF container */}
//           <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-full p-4 shadow-lg">
//             <img
//               src="/gifs/cotravloader.gif"
//               alt="Loading"
//               className="w-24 h-24 object-contain"
//             />
//           </div>
//         </div>

//         {/* Text content */}
//         <div className="text-center space-y-3 w-full">
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent">
//             Preparing Your Booking
//           </h2>
//           <p className="text-gray-600 text-sm font-medium">{getMessage()}</p>
//         </div>

//         {/* Progress bar */}
//         <div className="w-full space-y-2">
//           <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//             <div 
//               className="h-full bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] rounded-full transition-all duration-500 ease-out"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//           <div className="flex justify-between items-center text-xs">
//             <span className="text-gray-500">Step {step} of 5</span>
//             <span className="font-semibold bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent">
//               {Math.round(progress)}%
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
