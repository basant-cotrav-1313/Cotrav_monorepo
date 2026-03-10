
import React, { useState, useMemo } from 'react';
import { hotelTypes, icons, ui, cleanTextArray } from '@/index';


export const ImportantInfoSection: React.FC<hotelTypes.ImportantInfoSectionProps> = ({
  rateConditions,
  previewCount = 4,
  className = '',
}) => {
  const [showModal, setShowModal] = useState(false);

  const { cleanedConditions, previewConditions, hasMore } = useMemo(() => {
    if (!rateConditions || rateConditions.length === 0) {
      return {
        cleanedConditions: [],
        previewConditions: [],
        hasMore: false,
      };
    }

    const cleaned = cleanTextArray(rateConditions);

    return {
      cleanedConditions: cleaned,
      previewConditions: cleaned.slice(0, previewCount),
      hasMore: cleaned.length > previewCount,
    };
  }, [rateConditions, previewCount]);

  // Safe early return AFTER hooks
  if (cleanedConditions.length === 0) {
    return null;
  }

  // // Get preview conditions
  // const previewConditions = rateConditions.slice(0, previewCount);
  // const hasMore = rateConditions.length > previewCount;
  // const cleanedConditions = cleanRateConditions(rateConditions);

  // Don't render if no conditions
  if (!rateConditions || rateConditions.length === 0) {
    return null;
  }

  return (
    <>
      <ui.Card className={`py-0 border-gray-200 shadow-lg overflow-hidden ${className} `}>
        <ui.CardContent className="p-6 space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-linear-to-br from-[#0B5CAD] to-[#073B6D] rounded-lg flex items-center justify-center shrink-0">
              <icons.Info className="w-4 h-4 text-white" />
            </div>
            <h5 className="text-xl font-semibold text-gray-900">
              Important Information
            </h5>
          </div>

          {/* Preview List */}
          <ul className="space-y-2">
            {previewConditions.map((condition, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="text-[#0B5CAD] font-bold mt-0.5 shrink-0">
                  •
                </span>
                <span className="leading-relaxed">{condition}</span>
              </li>
            ))}
          </ul>

          {/* View More Button */}
          {hasMore && (
            <ui.Button
              variant="ghost"
              className="text-[#0B5CAD] text-sm font-semibold hover:text-[#073B6D] hover:bg-blue-50 transition-colors flex items-center gap-1 group p-0 h-auto mt-3"
              onClick={() => setShowModal(true)}
            >
              <span>View More</span>
              <icons.ChevronRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </ui.Button>
          )}
        </ui.CardContent>
      </ui.Card>

      {/* Full Details Modal */}
      {/* <ui.Dialog open={showModal} onOpenChange={setShowModal}>
        <ui.DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-gray-100 border-0 custom-scrollbar">
          <ui.DialogHeader>
            <ui.DialogTitle className="flex items-center gap-2">
              <icons.Info className="w-5 h-5 text-[#0B5CAD]" />
              All Hotel Rules & Conditions
            </ui.DialogTitle>
          </ui.DialogHeader>
          <div className="mt-4">
            <ul className="space-y-2">
              {cleanedConditions.map((condition, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="text-[#0B5CAD] font-bold mt-0.5 shrink-0">
                    •
                  </span>
                  <span className="leading-relaxed">{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </ui.DialogContent>
      </ui.Dialog> */}


      <ui.Dialog open={showModal} onOpenChange={setShowModal}>
  <ui.DialogContent className="max-w-3xl max-h-[90vh] p-0 gap-0 overflow-hidden bg-white border-none shadow-2xl [&>button]:hidden flex flex-col">
    {/* Fixed Header */}
    <ui.DialogHeader className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] px-5 py-3 shrink-0">
      <div className="flex items-center justify-between">
        <ui.DialogTitle className="flex items-center gap-2 text-white text-xl font-bold">
          <icons.Info className="w-5 h-5" />
          All Hotel Rules & Conditions
        </ui.DialogTitle>
        <button
          onClick={() => setShowModal(false)}
          className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
        >
          <icons.X size={20} />
        </button>
      </div>
    </ui.DialogHeader>
    
    {/* Scrollable Content */}
    <div className="overflow-y-auto flex-1 min-h-0 p-6 bg-gray-50 custom-scrollbar">
      <ul className="space-y-2">
        {cleanedConditions.map((condition, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-gray-700"
          >
            <span className="text-[#0B5CAD] font-bold mt-0.5 shrink-0">
              •
            </span>
            <span className="leading-relaxed">{condition}</span>
          </li>
        ))}
      </ul>
    </div>
  </ui.DialogContent>
</ui.Dialog>
    </>
  );
};

export default ImportantInfoSection;
