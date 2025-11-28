import { PeriodType } from "../../../enums";

export interface ReadChecksRequestDto {
  periodType: PeriodType;
  firstDate: Date;
  secondDate: Date | null;
}
