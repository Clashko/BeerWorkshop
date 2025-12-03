import { useEffect, useState } from "react";
import { useReadStatisticMutation } from "../../redux/api/statisticApi";
import { toast } from "react-toastify";
import { Button, Popover, Spinner, Typography } from "@material-tailwind/react";
import { BiRefresh } from "react-icons/bi";
import DatePickerLib from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Header = () => {
  const [read, { isLoading }] = useReadStatisticMutation();

  const now = new Date();

  const [firstDate, setFirstDate] = useState<Date>(
    new Date(now.getFullYear(), now.getMonth(), 1)
  );
  const [secondDate, setSecondDate] = useState<Date>(now);

  const handleRefreshStatistic = () => {
    read({ firstDate, secondDate })
      .unwrap()
      .then((result) => {
        toast.success(result.message);
      })
      .catch((error) => toast.error(error.data));
  };

  useEffect(() => {
    handleRefreshStatistic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-row gap-4 items-center justify-between">
      <Typography type="h5" className="whitespace-nowrap">
        Статистика
      </Typography>

      <Popover>
        <Popover.Trigger as={Button} variant="ghost" size="md" className="text-foreground">
          <BiRefresh size={26} />
          Обновить
        </Popover.Trigger>
        <Popover.Content className="max-w-sm p-4 z-[9999] bg-surface border border-dashed border-secondary">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Typography type="small">Начальная дата</Typography>
              <DatePickerLib
                selected={firstDate}
                onChange={(date) => {
                  if (date != null) setFirstDate(date);
                }}
                dateFormat="dd.MM.yyyy"
                className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-black dark:text-white placeholder:text-foreground/60 bg-transparent ring-transparent border border-surface transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-error data-[success=true]:border-success select-none data-[shape=pill]:rounded-full text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-primary hover:ring-primary/10 focus:border-primary focus:ring-primary/10 peer"
              />
            </div>
            <div className="flex flex-col gap-2">
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
              onClick={() => handleRefreshStatistic()}
              className="flex flex-row gap-2 items-center text-foreground"
            >
              {isLoading && <Spinner size="sm" />}
              Обновить
            </Button>
          </div>
          <Popover.Arrow />
        </Popover.Content>
      </Popover>
    </div>
  );
};
