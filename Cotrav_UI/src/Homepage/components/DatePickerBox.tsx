import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
};

const DatePickerBox = ({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  disabled,
}: Props) => {
  return (
    <div className="relative p-4 border-r">
      <p className="text-[10px] font-medium text-gray-500">{label}</p>

      <DatePicker
        selected={value}
        onChange={(date: Date | null) => date && onChange(date)}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        dateFormat="dd/MM/yyyy"

        /* ?? KEY PROPS */
        popperPlacement="bottom-start"
        wrapperClassName="relative"
        popperClassName="z-50"

        /* INPUT */
        customInput={
          <button
            type="button"
            className={`text-sm font-medium text-left w-full ${
              disabled
                ? "text-gray-400 cursor-not-allowed"
                : value
                  ? "text-gray-900 cursor-pointer"
                  : "text-gray-400 cursor-pointer"
            }`}
          >
            {value ? format(value, "dd/MM/yyyy") : "Select date"}
          </button>
        }

        /* CALENDAR STYLING */
        calendarClassName="bg-white rounded-xl shadow-xl p-2 border"

        dayClassName={() =>
          "w-9 h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
        }
      />
    </div>
  );
};

export default DatePickerBox;
