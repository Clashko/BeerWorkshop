import { ProductType, UnitOfMeasureType } from "../../../enums";

export interface CreateProductRequestDto {
  name: string;
  shortName: string;
  productType: ProductType;
  unitOfMeasure: UnitOfMeasureType;
}
