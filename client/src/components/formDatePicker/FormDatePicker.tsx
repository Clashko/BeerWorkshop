/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@material-tailwind/react";
import DatePickerLib from "react-datepicker";
import { Control, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  id: string;
  name: string;
  label: string;
  control: Control<any>;
  placeholder?: string;
  withTime?: boolean;
}

export const FormDatePicker = ({
  id,
  name,
  label,
  control,
  placeholder = "Выберите дату",
  withTime = false
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <Typography as="label" htmlFor={id} type="small">
            {label}
          </Typography>
          <DatePickerLib
            id={id}
            selected={field.value}
            onChange={field.onChange}
            dateFormat={withTime ? "dd.MM.yyyy HH:mm": "dd.MM.yyyy"}
            placeholderText={placeholder}
            showTimeInput={withTime}
            className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-black dark:text-white placeholder:text-foreground/60 bg-transparent ring-transparent border border-surface transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-error data-[success=true]:border-success select-none data-[shape=pill]:rounded-full text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-primary hover:ring-primary/10 focus:border-primary focus:ring-primary/10 peer"
          />
          <Typography color="error" type="small">
            {fieldState.error?.message}
          </Typography>
        </div>
      )}
    />
  );
};
