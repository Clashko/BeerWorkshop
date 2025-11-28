import { ProductType, UnitOfMeasureType } from "../../../enums";

export interface ProductResponseDto {
  id: string;
  name: string;
  shortName: string;
  productType: ProductType;
  unitOfMeasure: UnitOfMeasureType;
}
