import React from 'react';
import { AlertTriangle, X, Check } from 'lucide-react';

interface MarkupConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  priceData: any; // or create a specific type for your price data
}

// interface ValidationError {
//   rowIndex: number;
//   basePrice: number;
//   editedPrice: number;
//   difference: number;
//   hotelName?: string;  
//   roomType?: string;    
//   mealPlan?: string;
// }

interface ValidationError {
  rowIndex: number;
  basePrice: number;
  basePerNightPrice: number;  // ← ADD
  editedPrice: number;
  editedTotalPrice: number;   // ← ADD
  difference: number;
  hotelName?: string;         // ← ADD
  roomType?: string;          // ← ADD
  mealPlan?: string;          // ← ADD
}

interface PriceValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  validationErrors: ValidationError[];
}

// ✅ 1. Markup Confirmation Modal
export const MarkupConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  priceData
}: MarkupConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border-2 border-orange-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">No Markup Applied</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            You haven't added any markup to the room prices. The email will show the original prices without any markup.
          </p>

          {/* Price Breakdown */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Rooms:</span>
              <span className="font-semibold text-gray-900">{priceData?.roomCount || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Original Total:</span>
              <span className="font-semibold text-gray-900">₹{priceData?.originalTotal?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Markup:</span>
              <span className="font-bold text-orange-600">₹0.00</span>
            </div>
            <div className="border-t-2 border-orange-300 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900">Final Total:</span>
                <span className="font-bold text-lg text-gray-900">₹{priceData?.originalTotal?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
            💡 <strong>Tip:</strong> You can add markup to increase room prices before sending the email.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-5 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all shadow-md cursor-pointer"
          >
            <Check className="w-4 h-4 inline mr-2" />
            Yes, Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ 2. Price Validation Error Modal
export const PriceValidationModal = ({
  isOpen,
  onClose,
  validationErrors
}: PriceValidationModalProps) => {
  if (!isOpen || !validationErrors || validationErrors.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border-2 border-red-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">Invalid Price Detected</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-gray-700 font-medium">
            The edited price cannot be less than the base price. Please correct the following:
          </p>

          {/* Error List */}
          <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
            {validationErrors.map((error: ValidationError, index) => (
              <div key={index} className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-2">
                    {/* <p className="font-semibold text-red-900">Room {error.rowIndex + 1}</p>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Price:</span>
                        <span className="font-semibold text-gray-900">₹{error.basePrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Edited Price:</span>
                        <span className="font-semibold text-red-600">₹{error.editedPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-red-300 pt-1 mt-1">
                        <span className="text-gray-600">Difference:</span>
                        <span className="font-bold text-red-700">-₹{Math.abs(error.difference).toFixed(2)}</span>
                      </div>
                    </div> */}


                    <p className="font-semibold text-red-900">{error.hotelName}</p>
                    <p className="text-sm text-red-700">{error.roomType} | {error.mealPlan}</p>
                    <div className="flex justify-between">
                      <span>Base Per Night Price:</span>
                      <span>₹{error.basePerNightPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Edited Per Night Price:</span>
                      <span className="text-red-600">₹{error.editedPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difference:</span>
                      <span>-₹{Math.abs(error.difference).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-900">
              <p className="font-semibold mb-1">⚠️ Price Rule:</p>
              <p>The edited price must be <strong>equal to or greater than</strong> the base price. You can increase the price but cannot reduce it below the original amount.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all shadow-md"
          >
            OK, I'll Fix It
          </button>
        </div>
      </div>
    </div>
  );
};

export default { MarkupConfirmationModal, PriceValidationModal };
