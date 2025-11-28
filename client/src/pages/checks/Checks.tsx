import { useEffect, useRef } from "react";
import { DataGridRef } from "../../components";
import { CheckResponseDto } from "../../redux/dtos/responses/checks/checkResponseDto";
import { useReadChecksMutation } from "../../redux/api/checksApi";
import { useAppSelector } from "../../redux/store/store";
import { selectChecks } from "../../redux/features/checksSlice";
import { toast } from "react-toastify";
import { Header } from "./Header";
import { Grid } from "./Grid";
import { PeriodType } from "../../redux/enums";

export const Checks = () => {
  const gridRef = useRef<DataGridRef<CheckResponseDto>>(null);

  const [read, { isLoading }] = useReadChecksMutation();

  const checks = useAppSelector(selectChecks);

  useEffect(() => {
    refreshChecks(0, new Date(), null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshChecks = (
    periodType: PeriodType,
    firstDate: Date,
    secondDate: Date | null
  ) => {
    read({
      periodType: periodType,
      firstDate: firstDate,
      secondDate: secondDate,
    })
      .unwrap()
      .then((result) => toast.info(result.message))
      .catch((error) => toast.error(error.data));
  };

  return (
    <div className="h-full flex flex-col gap-2">
      <Header gridRef={gridRef} refreshChecks={refreshChecks} />

      <Grid gridRef={gridRef} data={checks} isLoading={isLoading} />
    </div>
  );
};
