import React from "react";

interface FormFieldProps {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  icon: Icon, 
  children 
}) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-gray-500 flex items-center gap-1">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </label>
      {children}
    </div>
  );
};
