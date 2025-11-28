/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectProps } from "@material-tailwind/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export interface IOption {
  label: string;
  value: any;
}

export const DebouncedSelect = ({
  initialValue,
  onChange,
  debounce = 500,
  className,
  options,
  ...props
}: {
  initialValue: any;
  onChange: (updater: any) => void;
  debounce?: number;
  options: IOption[];
} & Omit<SelectProps, "onChange">) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearInterval(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Select value={value} onValueChange={(e) => setValue(e)}>
      <Select.Trigger placeholder="Поиск..." className={clsx("py-1 px-2", className)} {...props} />
      <Select.List>
        <Select.Option value={undefined}>Все...</Select.Option>
        {options.map(({ label, value }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select.List>
    </Select>
  );
};
