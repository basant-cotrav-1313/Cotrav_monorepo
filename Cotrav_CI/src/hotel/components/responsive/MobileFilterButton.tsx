import React from 'react';
import { motion } from 'framer-motion';
import { icons } from '@/index';

interface MobileFilterButtonProps {
  onClick: () => void;
  activeFilterCount: number;
}

export const MobileFilterButton: React.FC<MobileFilterButtonProps> = ({
  onClick,
  activeFilterCount,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="md:hidden fixed bottom-20 right-4 z-[55] bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 font-semibold text-sm hover:shadow-3xl hover:scale-105 active:scale-95 transition-all"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
      <span>Filters</span>
      {activeFilterCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white text-[#0B5CAD] text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center"
        >
          {activeFilterCount}
        </motion.span>
      )}
    </motion.button>
  );
};



