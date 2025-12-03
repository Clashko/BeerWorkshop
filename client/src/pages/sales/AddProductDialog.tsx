import {
  Button,
  Checkbox,
  Dialog,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { CgAdd, CgClose } from "react-icons/cg";
import { InventoryRow } from "../productsInventory/Grid";
import { useState } from "react";
import { UnitOfMeasureTableDisplay } from "../../redux/enums";
import clsx from "clsx";
import { BasketRow } from "./Sales";

interface Props {
  product: InventoryRow;
  addProduct: (row: BasketRow) => void;
}

export const AddProductDialog = ({ product, addProduct }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [useDiscount, setUseDiscount] = useState(false);

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue <= product.item.quantity) {
      setQuantity(newValue);
    }
  };

  const handleChangeDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue <= 100) {
      setDiscount(newValue);
    }
  };

  const handleAddProduct = () => {
    if (quantity > 0) {
      addProduct({
        id: product.item.id,
        name: product.product.name,
        quantity: quantity,
        unitOfMeasure: product.product.unitOfMeasure,
        price: product.item.retailPrice,
        pricePerQuantity: product.item.pricePerQuantity,
        discount: useDiscount ? discount : null,
      });
    }
  };

  return (
    <Dialog>
      <Dialog.Trigger as={Button} variant="ghost" color="success" size="sm">
        <CgAdd size={20} />
      </Dialog.Trigger>
      <Dialog.Overlay className="bg-surface-dark/70">
        <Dialog.Content className="flex flex-col gap-4 text-foreground !w-auto !max-w-none">
          <div className="flex flex-row justify-between items-center gap-4">
            <Typography type="h6">
              Добавление продукта: {product.product.name}
            </Typography>
            <Dialog.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              isCircular
            >
              <CgClose size={16} />
            </Dialog.DismissTrigger>
          </div>
          <div className="flex flex-row gap-4 items-center px-4">
            <Typography className="whitespace-nowrap">
              Добавить "{product.product.name}" в количестве:
            </Typography>
            <div className="w-20">
              <Input
                size="sm"
                type="number"
                step="any"
                value={quantity}
                onChange={handleChangeQuantity}
              />
            </div>
            <Typography className="whitespace-nowrap">
              {UnitOfMeasureTableDisplay[product.product.unitOfMeasure]}
            </Typography>
          </div>
          <div className="flex flex-row gap-4 items-center px-4">
            <Checkbox
              id={`${product.item.id}-discount-checkbox`}
              checked={useDiscount}
              onChange={(value) => {
                setUseDiscount(Boolean(value.target.checked));
              }}
            >
              <Checkbox.Indicator />
            </Checkbox>
            <Typography
              as="label"
              htmlFor={`${product.item.id}-discount-checkbox`}
              className="cursor-pointer whitespace-nowrap"
            >
              Добавить скидку?
            </Typography>
            <div className={clsx("w-20", { hidden: !useDiscount })}>
              <Input
                size="sm"
                type="number"
                step="any"
                value={discount}
                onChange={handleChangeDiscount}
              />
            </div>
            <Typography
              className={clsx("whitespace-nowrap", { hidden: !useDiscount })}
            >
              %
            </Typography>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Dialog.DismissTrigger
              as={Button}
              variant="ghost"
              color="success"
              onClick={() => {
                handleAddProduct();
              }}
            >
              Добавить
            </Dialog.DismissTrigger>
            <Dialog.DismissTrigger as={Button} variant="ghost" color="error">
              Отмена
            </Dialog.DismissTrigger>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};
