import {
  Button,
  Checkbox,
  Dialog,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { CgAdd, CgClose } from "react-icons/cg";
import { useState } from "react";
import { UnitOfMeasureTableDisplay } from "../../redux/enums";
import clsx from "clsx";
import { BasketRow } from "./Sales";
import { DeviceInventoryRow } from "../devicesInventory/Grid";

interface Props {
  device: DeviceInventoryRow;
  addDevice: (row: BasketRow) => void;
}

export const AddDeviceDialog = ({ device, addDevice }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [useDiscount, setUseDiscount] = useState(false);

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue <= device.item.quantity) {
      setQuantity(newValue);
    }
  };

  const handleChangeDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue <= 100) {
      setDiscount(newValue);
    }
  };

  const handleAddDevice = () => {
    if (quantity > 0) {
      addDevice({
        id: device.item.id,
        name: device.device.name,
        quantity: quantity,
        unitOfMeasure: 0,
        price: device.item.retailPrice,
        pricePerQuantity: 1,
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
              Добавление расходника: {device.device.name}
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
              Добавить "{device.device.name}" в количестве:
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
              {UnitOfMeasureTableDisplay[0]}
            </Typography>
          </div>
          <div className="flex flex-row gap-4 items-center px-4">
            <Checkbox
              id={`${device.item.id}-discount-checkbox`}
              checked={useDiscount}
              onChange={(value) => {
                setUseDiscount(Boolean(value.target.checked));
              }}
            >
              <Checkbox.Indicator />
            </Checkbox>
            <Typography
              as="label"
              htmlFor={`${device.item.id}-discount-checkbox`}
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
                handleAddDevice();
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
