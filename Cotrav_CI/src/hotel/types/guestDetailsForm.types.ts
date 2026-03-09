
// export interface GuestData {
//   title: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   contact_no: string;
//   pan?: string;
// }

// export interface GSTDetails {
//   gstNo: string;
//   cName: string;
//   cAddr: string;
//   contactNo: string;
//   email: string;
// }

export interface FormErrors {
  [key: number]: {
    firstName?: string;
    lastName?: string;
    email?: string;
    contact_no?: string;
    pan?: string;
  };
  gstNo?: string;
  cName?: string;
  cAddr?: string;
  contactNo?: string;
  email?: string;
}

export interface GuestDetailsFormProps {
  peopleData: GuestData[];
  gstDetails: GSTDetails;
  showGSTDetails: boolean;
  errors: FormErrors;
  // onGuestChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onGuestChange: <K extends keyof GuestData>(
  index: number,
  field: K,
  value: GuestData[K]
) => void;

  onGSTChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGSTToggle: (checked: boolean) => void;

  country_code: string;
  disableGuestFields?:boolean;
   disabled?: boolean;  // This will be for guest fields only
  disableGSTFields?: boolean; 
}


// types/form.types.ts

export interface GuestData {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  contact_no: string;
  pan: string;
  gender?: string;
  age?: number;
  isChild?: boolean;
}

export interface GSTDetails {
  gstNo: string;
  cName: string;
  cAddr: string;
  contactNo: string;
  email: string;
}


export interface GuestFormData {
  peopleData: GuestData[];
  gstDetails: GSTDetails | null;
}

export interface FormFieldError {
  field: string;
  message: string;
}

export type TitleOptions = 'Mr' | 'Mrs' | 'Ms' | 'Dr';

export interface SelectOption {
  value: string;
  label: string;
}

export const TITLE_OPTIONS: SelectOption[] = [
  { value: 'Mr', label: 'Mr' },
  { value: 'Mrs', label: 'Mrs' },
  { value: 'Ms', label: 'Ms' },
  { value: 'Dr', label: 'Dr' },
];
