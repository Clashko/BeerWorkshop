import { ProductType, UnitOfMeasureType } from "../../../enums";

export interface UpdateProductRequestDto {
  name: string;
  shortName: string;
  productType: ProductType;
  unitOfMeasure: UnitOfMeasureType;
}
