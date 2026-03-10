import { useState, useCallback } from 'react';

export const useExpandedRows = () => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [expandedPolicies, setExpandedPolicies] = useState<Record<string, boolean>>({});

  const toggleRowExpansion = useCallback((code: string) => {
    setExpandedRows(prev => ({ ...prev, [code]: !prev[code] }));
  }, []);

  const togglePolicyExpansion = useCallback((code: string) => {
    setExpandedPolicies(prev => ({ ...prev, [code]: !prev[code] }));
  }, []);

  return {
    expandedRows,
    expandedPolicies,
    toggleRowExpansion,
    togglePolicyExpansion,
  };
};

