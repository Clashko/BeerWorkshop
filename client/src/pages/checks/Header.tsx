/* eslint-disable react-hooks/refs */
import {
  Button,
  Popover,
  Select,
  Typography,
} from "@material-tailwind/react";
import { BiRefresh } from "react-icons/bi";
import { DataGridQuickFilter, DataGridRef } from "../../components";
import { RefObject, useEffect, useState } from "react";
import { CheckResponseDto } from "../../redux/dtos/responses/checks/checkResponseDto";
import {
  PeriodType,
  PeriodTypeEnum,
  PeriodTypeOptions,
} from "../../redux/enums";
import DatePickerLib from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

interface Props {
  gridRef: RefObject<DataGridRef<CheckResponseDto> | null>;
  refreshChecks: (
    periodType: PeriodType,
    firstDate: Date,
    secondDate: Date | null
  ) => void;
}

export const Header = ({ gridRef, refreshChecks }: Props) => {
  const [periodType, setPeriodType] = useState<PeriodType>(0);
  const [firstDate, setFirstDate] = useState<Date>(new Date());
  const [secondDate, setSecondDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log(periodType);
  }, [periodType]);

  return (
    <div className="flex flex-row gap-4 items-center justify-between">
      <Typography type="h5" className="whitespace-nowrap">
        Чеки
      </Typography>

      <DataGridQuickFilter api={gridRef.current?.api ?? null} />

      <Popover>
        <Popover.Trigger as={Button} variant="ghost" size="md">
          <BiRefresh size={26} />
          Обновить
        </Popover.Trigger>
        <Popover.Content className="max-w-sm p-4 z-[9999] bg-surface border border-dashed border-secondary">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Typography type="small">Тип периода</Typography>
              <Select
                value={String(periodType)}
                onValueChange={(value) =>
                  setPeriodType(Number(value) as PeriodType)
                }
              >
                <Select.Trigger placeholder="Выберите тип периода" />
                <Select.List>
                  {PeriodTypeOptions.map(({ label, value }) => (
                    <Select.Option key={value} value={String(value)}>
                      {label}
                    </Select.Option>
                  ))}
                </Select.List>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Typography type="small">
                {periodType == 0 ? "За дату" : "Начальная дата"}
              </Typography>
              <DatePickerLib
                selected={firstDate}
                onChange={(date) => {
                  if (date != null) setFirstDate(date);
                }}
                dateFormat="dd.MM.yyyy"
                className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-black dark:text-white placeholder:text-foreground/60 bg-transparent ring-transparent border border-surface transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-error data-[success=true]:border-success select-none data-[shape=pill]:rounded-full text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-primary hover:ring-primary/10 focus:border-primary focus:ring-primary/10 peer"
              />
            </div>
            <div
              className={clsx("flex flex-col gap-2", {
                hidden: periodType == PeriodTypeEnum.Day,
                block: periodType == PeriodTypeEnum.Period,
              })}
            >
              <Typography type="small">Конечная дата</Typography>
              <DatePickerLib
                selected={secondDate}
                onChange={(date) => {
                  if (date != null) setSecondDate(date);
                }}
                dateFormat="dd.MM.yyyy"
                className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-black dark:text-white placeholder:text-foreground/60 bg-transparent ring-transparent border border-surface transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-error data-[success=true]:border-success select-none data-[shape=pill]:rounded-full text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-primary hover:ring-primary/10 focus:border-primary focus:ring-primary/10 peer"
              />
            </div>
            <Button
              variant="outline"
              onClick={() =>
                refreshChecks(
                  periodType,
                  firstDate,
                  periodType == 1 ? secondDate : null
                )
              }
            >
              Обновить
            </Button>
          </div>
          <Popover.Arrow />
        </Popover.Content>
      </Popover>
    </div>
  );
};
