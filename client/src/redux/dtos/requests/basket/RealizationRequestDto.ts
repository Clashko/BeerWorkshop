import { DiscountCalculatorType } from "../../../enums";
import { RealizationItemRequestDto } from "./RealizationItemRequestDto";

export interface RealizationRequestDto {
  products: RealizationItemRequestDto[];
  devices: RealizationItemRequestDto[];
  totalDiscount: number | null;
  discountCalculatorType: DiscountCalculatorType;
}
