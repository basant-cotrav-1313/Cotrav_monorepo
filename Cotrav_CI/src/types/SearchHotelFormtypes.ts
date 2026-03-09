// searchHotelFormTypes.ts

export interface CompanyDropdownProps {
  company: string;
  setCompany: (company: string) => void;
  companies: string[];
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  fetchCompanies: () => void;
  loading: boolean;
}

export interface DateSelectorProps {
  label: string;
  date: Date | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onChange: (date: Date | null) => void;
  minDate?: Date;
}

export interface FormFieldProps {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}