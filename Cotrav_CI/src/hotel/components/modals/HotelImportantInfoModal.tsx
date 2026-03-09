import React from 'react';
import { X, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { hotelTypes } from '@/index';


export const HotelImportantInfoModal: React.FC<hotelTypes.HotelImportantInfoModalProps> = ({
  isOpen,
  onClose,
  rateConditions,
}) => {
  const stripHtmlTags = (html: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    const decodedHtml = textarea.value;
    return decodedHtml.replace(/<\/?[^>]+(>|$)/g, '');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] px-5 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white text-2xl font-bold">Important Information</h2>
                    <p className="text-purple-100 text-sm ">
                      {rateConditions.length} conditions to review
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="space-y-3">
                {rateConditions.map((condition, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="flex items-start gap-3 p-4 bg-linear-to-br from-blue-50 to-blue-50 rounded-xl border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all group"
                  >
                    <div className="mt-0.5 shrink-0">
                      <div className="p-1.5 bg-linear-to-r from-[#0B5CAD] to-[#073B6D] rounded-lg">
                        <Info className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {stripHtmlTags(condition)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer - No border-t */}
            <div className="bg-linear-to-b from-gray-50 to-gray-100 px-6 py-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Please read all conditions before proceeding
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-linear-to-r from-[#0B5CAD] to-[#094B8A] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
