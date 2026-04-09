import type { FieldConfig, FormState } from "../types/advancedSearch.types";

type Props = {
  field: FieldConfig;
  value: string;
  onChange: (key: keyof FormState, value: string) => void;
};

const SearchField = ({ field, value, onChange }: Props) => (
  <div className={field.widthClass ?? "w-40"}>
    <label className="mb-1 block text-[11px] font-semibold text-slate-700">
      {field.label}
    </label>
    <input
      type={field.type ?? "text"}
      value={value}
      onChange={(e) => onChange(field.key, e.target.value)}
      placeholder={field.placeholder ?? field.label}
      className="h-8 w-full rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-700 placeholder:text-slate-400 focus:border-[#003F74] focus:outline-none"
    />
  </div>
);

export default SearchField;