import { useState } from "react";
import type { FormState } from "../types/advancedSearch.types";
import { INITIAL_FILTERS } from "../constants/advancedSearch.constants";

export const useAdvancedSearch = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState<FormState>(INITIAL_FILTERS);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(INITIAL_FILTERS);

  const toggleAdvancedFilters = () => setShowAdvancedFilters((prev) => !prev);

  return {
    filters,
    showAdvancedFilters,
    setField,
    clearFilters,
    toggleAdvancedFilters,
  };
};