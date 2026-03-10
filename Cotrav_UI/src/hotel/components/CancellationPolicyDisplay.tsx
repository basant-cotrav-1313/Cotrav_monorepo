
// import React from 'react';
// import { CancellationPolicy } from '../types/hotel';
// import { formatCancelPolicies } from '../utils/hotel.utils';
// import { icons } from '@/index';

// interface CancellationPolicyDisplayProps {
//   policies: CancellationPolicy[];
//   mealType?: string;
//   isRefundable?: boolean;
// }

// const CancellationPolicyDisplay: React.FC<CancellationPolicyDisplayProps> = ({
//   policies,
//   // mealType,
//   // isRefundable,
// }) => {
//   const formattedPolicies = formatCancelPolicies(policies);

  
//   // Non-cancellable
//   if (formattedPolicies.length === 0) {
//     return (
//       <div className="text-xs text-red-600 flex items-center gap-2">
//         <icons.X className="w-4 h-4" />
//         Non Cancellable
//       </div>
//     );
//   }

//   return (
//     <div className="text-xs text-green-700 space-y-1">
//       {formattedPolicies.map((policy, index) => {
//         const CheckIcon = icons.Check;

//         return (
//           <div key={index} className="flex items-start gap-2">
//             <CheckIcon className="w-4 h-4 text-green-700 mt-0.5" />
//             <span>{policy}</span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default CancellationPolicyDisplay;

import React, { useState } from 'react';
import { CancellationPolicy } from '../types/hotel';
import { icons } from '@/index';

interface CancellationPolicyDisplayProps {
  policies: CancellationPolicy[];
  mealType?: string;
  isRefundable?: boolean;
}

interface ProcessedPolicy {
  FromDate: string;
  ChargeType: string;
  CancellationCharge: number;
  isFreeCancel: boolean;
  isFullCharge: boolean;
}

const CancellationPolicyDisplay: React.FC<CancellationPolicyDisplayProps> = ({
  policies,
  isRefundable,
}) => {
  const [showAllPolicies, setShowAllPolicies] = useState(false);

  // Process and sort policies
  const cancellationPolicies: ProcessedPolicy[] = Array.isArray(policies)
    ? policies
        .map((policy) => ({
          ...policy,
          isFreeCancel: policy.ChargeType === 'Fixed' && policy.CancellationCharge === 0,
          isFullCharge: policy.ChargeType === 'Percentage' && policy.CancellationCharge === 100,
        }))
        .sort((a, b) => {
          const dateA = new Date(a.FromDate.split(' ')[0].split('-').reverse().join('-'));
          const dateB = new Date(b.FromDate.split(' ')[0].split('-').reverse().join('-'));
          return dateA.getTime() - dateB.getTime();
        })
    : [];

  // Get primary policy (first one)
  const primaryPolicy = cancellationPolicies[0];

  // Format policy text
  const formatPolicyText = (policy: ProcessedPolicy) => {
    // Parse date from DD-MM-YYYY format
    const [datePart] = policy.FromDate.split(' ');
    const [day, month, year] = datePart.split('-');
    const date = new Date(`${year}-${month}-${day}`).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    if (policy.isFreeCancel) {
      return `Free cancellation until ${date}`;
    }

    if (policy.isFullCharge) {
      return `No refund after ${date} (100% charge)`;
    }

    if (policy.ChargeType === 'Percentage') {
      return `${policy.CancellationCharge}% cancellation fee from ${date}`;
    }

    if (policy.ChargeType === 'Fixed') {
      return `₹${policy.CancellationCharge} cancellation fee from ${date}`;
    }

    return `Cancellation charge applies from ${date}`;
  };

  // If no policies, don't render anything
  if (!primaryPolicy) {
    return null;
  }

  return (
    <div>
      <div
        className={`rounded-lg border-2 overflow-hidden transition-all duration-300 ${
          primaryPolicy.isFreeCancel
            ? 'border-green-200'
            : primaryPolicy.isFullCharge
            ? 'border-red-200'
            : 'border-amber-200'
        }`}
      >
        <div
          className={`flex items-start gap-2 px-3 py-2.5 cursor-pointer ${
            primaryPolicy.isFreeCancel
              ? 'bg-green-50 active:bg-green-100'
              : primaryPolicy.isFullCharge
              ? 'bg-red-50 active:bg-red-100'
              : 'bg-amber-50 active:bg-amber-100'
          }`}
          onClick={() => cancellationPolicies.length > 1 && setShowAllPolicies(!showAllPolicies)}
        >
          {primaryPolicy.isFreeCancel ? (
            <icons.CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
          ) : primaryPolicy.isFullCharge ? (
            <icons.XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          ) : (
            <icons.AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-700 mb-0.5">
              {primaryPolicy.isFreeCancel
                ? 'Free Cancellation'
                : isRefundable
                ? 'Partial Refund'
                : 'Non-Refundable'}
            </p>
            <p className="text-xs text-gray-600">
              {formatPolicyText(primaryPolicy)}
            </p>
          </div>
          {cancellationPolicies.length > 1 && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-gray-500 font-medium">
                +{cancellationPolicies.length - 1}
              </span>
              <icons.ChevronDown
                className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-300 ${
                  showAllPolicies ? 'rotate-180' : ''
                }`}
              />
            </div>
          )}
        </div>

        {showAllPolicies && cancellationPolicies.length > 1 && (
          <div className="bg-white border-t-2 border-gray-100 animate-in slide-in-from-top-2 duration-300">
            {cancellationPolicies.slice(1).map((policy, i) => (
              <div
                key={`cancel-policy-${i}`}
                className="flex items-start gap-2 px-3 py-2.5 border-b last:border-b-0 border-gray-100"
              >
                {policy.isFreeCancel ? (
                  <icons.CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                ) : policy.isFullCharge ? (
                  <icons.XCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <icons.AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-xs text-gray-700">
                    {formatPolicyText(policy)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CancellationPolicyDisplay;
