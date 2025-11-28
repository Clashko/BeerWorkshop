import { Typography } from "@material-tailwind/react";
import { ProductsGrid } from "./ProductsGrid";
import { DevicesGrid } from "./DevicesGrid";
import { BasketGrid } from "./BasketGrid";
import { useState } from "react";
import { UnitOfMeasureType } from "../../redux/enums";

export interface BasketRow {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unitOfMeasure: UnitOfMeasureType;
  discount: number | null;
}

export const Sales = () => {
  const [basketProducts, setBasketProducts] = useState<BasketRow[]>([]);
  const [basketDevices, setBasketDevices] = useState<BasketRow[]>([]);

  return (
    <div className="h-full flex flex-col gap-2">
      <Typography type="h5">Корзина</Typography>
      <div className="h-full flex flex-row gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <ProductsGrid
            basketProducts={basketProducts}
            setBasketProducts={setBasketProducts}
          />
          <DevicesGrid
            basketDevices={basketDevices}
            setBasketDevices={setBasketDevices}
          />
        </div>
        <BasketGrid
          basketProducts={basketProducts}
          setBasketProducts={setBasketProducts}
          basketDevices={basketDevices}
          setBasketDevices={setBasketDevices}
        />
      </div>
    </div>
  );
};
