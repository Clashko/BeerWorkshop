import { Card, Select, Typography } from "@material-tailwind/react";
import { ProductsGrid } from "./ProductsGrid";
import { DevicesGrid } from "./DevicesGrid";
import { BasketGrid } from "./BasketGrid";
import { useState } from "react";
import {
  BasketItemType,
  BasketItemTypeEnum,
  BasketItemTypeOptions,
  UnitOfMeasureType,
} from "../../redux/enums";

export interface BasketRow {
  id: string;
  name: string;
  quantity: number;
  price: number;
  pricePerQuantity: number;
  unitOfMeasure: UnitOfMeasureType;
  discount: number | null;
}

export const Sales = () => {
  const [basketProducts, setBasketProducts] = useState<BasketRow[]>([]);
  const [basketDevices, setBasketDevices] = useState<BasketRow[]>([]);

  const [type, setType] = useState<BasketItemType>(
    BasketItemTypeEnum.Product as BasketItemType
  );

  return (
    <div className="w-full h-full max-h-full flex flex-col gap-2">
      <Typography type="h5">Корзина</Typography>

      <div className="h-full max-h-full flex flex-col lg:flex-row gap-2 overflow-y-auto">
        <Card className="flex flex-col gap-2 w-full lg:w-1/2 min-h-[535px] lg:min-h-0 lg:h-full bg-surface p-2">
          <Select
            value={String(type)}
            onValueChange={(val) => setType(Number(val) as BasketItemType)}
          >
            <Select.Trigger className="px-2 py-1 border border-primary/50" />
            <Select.List>
              {BasketItemTypeOptions.map(({ label, value }) => (
                <Select.Option key={value} value={String(value)}>
                  {label}
                </Select.Option>
              ))}
            </Select.List>
          </Select>
          {type === BasketItemTypeEnum.Product && (
            <ProductsGrid
              basketProducts={basketProducts}
              setBasketProducts={setBasketProducts}
            />
          )}
          {type === BasketItemTypeEnum.Device && (
            <DevicesGrid
              basketDevices={basketDevices}
              setBasketDevices={setBasketDevices}
            />
          )}
        </Card>

        <Card className="flex flex-col gap-2 w-full lg:w-1/2 min-h-[535px] lg:min-h-0 lg:h-full bg-surface p-2">
          <BasketGrid
            basketProducts={basketProducts}
            setBasketProducts={setBasketProducts}
            basketDevices={basketDevices}
            setBasketDevices={setBasketDevices}
          />
        </Card>
      </div>
    </div>
  );
};
