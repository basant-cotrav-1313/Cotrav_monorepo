import { useState, useCallback, useMemo } from 'react';
// import { hotelTypes } from '@/index';
import * as hotelTypes from '@/hotel/types/hotel'

export const useRoomPriceModal = (
  selectedRooms: hotelTypes.SelectedRoom[],
  onClose: () => void
) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [expandedPolicies, setExpandedPolicies] = useState<Record<string, boolean>>({});
  const [isClosing, setIsClosing] = useState(false);

  const toggleRowExpansion = useCallback((code: string) => {
    setExpandedRows(prev => ({ ...prev, [code]: !prev[code] }));
  }, []);

  const togglePolicyExpansion = useCallback((code: string) => {
    setExpandedPolicies(prev => ({ ...prev, [code]: !prev[code] }));
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 150);
  }, [onClose]);

  const selectedRoomsTotal = useMemo(
    () => selectedRooms.reduce((sum, r) => sum + r.TotalFare, 0),
    [selectedRooms]
  );

  return {
    expandedRows,
    expandedPolicies,
    toggleRowExpansion,
    togglePolicyExpansion,
    isClosing,
    handleClose,
    selectedRoomsTotal,
  };
};

