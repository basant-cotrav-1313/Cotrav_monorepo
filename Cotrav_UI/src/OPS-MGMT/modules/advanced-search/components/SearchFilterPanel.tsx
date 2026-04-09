import type { FormState } from "../types/advancedSearch.types";
import { SERVICE_CONFIG } from "../constants/advancedSearch.constants";
import SearchField from "./SearchField";

type Props = {
  filters: FormState;
  showAdvancedFilters: boolean;
  onFieldChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onClear: () => void;
  onToggleAdvanced: () => void;
};

const SearchFilterPanel = ({
  filters,
  showAdvancedFilters,
  onFieldChange,
  onClear,
  onToggleAdvanced,
}: Props) => {
  const activeConfig = SERVICE_CONFIG[filters.service];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-black uppercase tracking-wide text-slate-600">
          Advanced Search
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-expanded={showAdvancedFilters}
            onClick={onToggleAdvanced}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100"
          >
            {showAdvancedFilters ? "Less filters" : "More filters"}
          </button>
          <button
            type="button"
            onClick={onClear}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Row 1 — service selector + primary fields */}
      <div className="mt-2 flex flex-wrap items-end gap-2">
        <div className="w-28">
          <label className="mb-1 block text-[11px] font-semibold text-slate-700">
            Service
          </label>
          <select
            value={filters.service}
            onChange={(e) => onFieldChange("service", e.target.value as FormState["service"])}
            className="h-8 w-full rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-700 focus:border-[#003F74] focus:outline-none"
          >
            <option value="Taxi">Taxi</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Flight">Flight</option>
            <option value="Hotel">Hotel</option>
          </select>
        </div>

        {activeConfig.row1.map((field) => (
          <SearchField
            key={field.key}
            field={field}
            value={filters[field.key]}
            onChange={onFieldChange}
          />
        ))}

        <div className="ml-auto">
          <button
            type="button"
            className="h-8 rounded-md bg-[#003F74] px-3 text-xs font-semibold text-white hover:bg-[#003563]"
          >
            Search
          </button>
        </div>
      </div>

      {/* Row 2 — advanced fields */}
      {showAdvancedFilters && (
        <div className="mt-2 border-t border-slate-200 pt-2">
          <div className="flex flex-wrap items-end gap-2">
            {activeConfig.row2.map((field) => (
              <SearchField
                key={field.key}
                field={field}
                value={filters[field.key]}
                onChange={onFieldChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilterPanel;