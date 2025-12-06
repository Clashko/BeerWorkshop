import { Button, Popover, Select, Typography } from "@material-tailwind/react";
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
import { GridApi } from "ag-grid-community";
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
  const [tabLock, setTabLock] = useState(true);

  const [periodType, setPeriodType] = useState<PeriodType>(0);
  const [firstDate, setFirstDate] = useState<Date>(new Date());
  const [secondDate, setSecondDate] = useState<Date>(new Date());

  const [api, setApi] = useState<GridApi<CheckResponseDto> | null>(null);

  useEffect(() => {
    if (gridRef.current?.api) {
      setApi(gridRef.current.api);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridRef.current]);

  const renderButtons = () => {
    return (
      <Popover placement="bottom-end">
        <Popover.Trigger as={Button} variant="ghost" className="p-2 sm:p-1">
          <div className="flex flex-row gap-2 items-center text-foreground">
            <BiRefresh size={20} />
            <span className="hidden sm:block">Обновить</span>
          </div>
        </Popover.Trigger>
        <Popover.Content className="max-w-sm p-4 z-[9999] bg-surface border border-dashed border-secondary">
          <div
            className="flex flex-col gap-4"
            onMouseDown={() => setTabLock(false)}
            onKeyDown={() => setTabLock(false)}
          >
            <div className="flex flex-col gap-2">
              <Typography type="small">Тип периода</Typography>
              <Select
                value={String(periodType)}
                tabIndex={tabLock ? -1 : 0}
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
                tabIndex={tabLock ? -1 : 0}
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
                tabIndex={tabLock ? -1 : 0}
                className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-black dark:text-white placeholder:text-foreground/60 bg-transparent ring-transparent border border-surface transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-error data-[success=true]:border-success select-none data-[shape=pill]:rounded-full text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-primary hover:ring-primary/10 focus:border-primary focus:ring-primary/10 peer"
              />
            </div>
            <Button
              variant="outline"
              className="text-foreground"
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
    );
  };

  return (
    <div className="w-full flex flex-col sm:flex-row gap-2 items-center">
      <div className="w-full sm:w-auto flex flex-row gap-2 justify-between">
        <Typography type="h5">Чеки</Typography>
        <div className="flex sm:hidden flex-row gap-2">{renderButtons()}</div>
      </div>
      <DataGridQuickFilter api={api} />
      <div className="hidden sm:flex flex-row gap-2">{renderButtons()}</div>
    </div>
  );
};
