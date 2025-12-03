/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Typography,
  Card,
  IconButton,
  Checkbox,
  Input,
  Select,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { BasketRow } from "./Sales";
import {
  BasketItemType,
  BasketItemTypeDisplay,
  BasketItemTypeEnum,
  DiscountCalculatorType,
  DiscountCalculatorTypeEnum,
  DiscountCalculatorTypeOptions,
  UnitOfMeasureTableDisplay,
  UnitOfMeasureType,
} from "../../redux/enums";
import { ColDef } from "ag-grid-community";
import { CgRemove } from "react-icons/cg";
import { DataGrid } from "../../components";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRealizeMutation } from "../../redux/api/basketApi";
import {
  RealizationItemRequestDto,
  RealizationRequestDto,
} from "../../redux/dtos/requests/basket";
import { toast } from "react-toastify";
import saveAs from "file-saver";
import { removeProductInventoryItemQuantity } from "../../redux/features/productsInventorySlice";
import { removeDeviceInventoryItemQuantity } from "../../redux/features/devicesInventorySlice";
import { useAppDispatch } from "../../redux/store/store";

interface BasketGridRow {
  itemType: BasketItemType;
  id: string;
  name: string;
  quantity: number;
  unitOfMeasure: UnitOfMeasureType;
  price: number;
  pricePerQuantity: number;
  discount: number | null;
}

interface Props {
  basketProducts: BasketRow[];
  setBasketProducts: React.Dispatch<React.SetStateAction<BasketRow[]>>;
  basketDevices: BasketRow[];
  setBasketDevices: React.Dispatch<React.SetStateAction<BasketRow[]>>;
}

export const BasketGrid = ({
  basketProducts,
  setBasketProducts,
  basketDevices,
  setBasketDevices,
}: Props) => {
  const [realize, { isLoading }] = useRealizeMutation();
  const dispatch = useAppDispatch();

  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [useTotalDiscount, setUseTotalDiscount] = useState<boolean>(false);
  const [discountCalculatorType, setDiscountCalculatorType] =
    useState<DiscountCalculatorType>(0);

  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleChangeDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue <= 100) {
      setTotalDiscount(newValue);
    }
  };

  const rows: BasketGridRow[] = [
    ...basketProducts.flatMap((p) => ({
      itemType: BasketItemTypeEnum.Product as BasketItemType,
      id: p.id,
      name: p.name,
      quantity: p.quantity,
      unitOfMeasure: p.unitOfMeasure,
      price: p.price,
      pricePerQuantity: p.pricePerQuantity,
      discount: p.discount,
    })),
    ...basketDevices.flatMap((p) => ({
      itemType: BasketItemTypeEnum.Device as BasketItemType,
      id: p.id,
      name: p.name,
      quantity: p.quantity,
      unitOfMeasure: p.unitOfMeasure,
      price: p.price,
      pricePerQuantity: p.pricePerQuantity,
      discount: p.discount,
    })),
  ];

  const columns: ColDef<BasketGridRow>[] = [
    {
      headerName: "Тип",
      valueGetter: ({ data }) => BasketItemTypeDisplay[data!.itemType],
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
      },
      spanRows: true,
      filter: "agTextColumnFilter",
      minWidth: 140,
    },
    {
      colId: "name",
      headerName: "Наименование",
      valueGetter: ({ data }) => data!.name,
      sortable: true,
      filter: "agTextColumnFilter",
      minWidth: 160,
    },
    {
      headerName: "Количество",
      valueGetter: ({ data }) => {
        return `${data!.quantity} ${
          UnitOfMeasureTableDisplay[data!.unitOfMeasure]
        }`;
      },
      sortable: true,
      filter: "agTextColumnFilter",
      minWidth: 140,
    },
    {
      headerName: "Цена",
      valueGetter: ({ data }) => data!.price,
      sortable: true,
      filter: "agNumberColumnFilter",
      minWidth: 100,
    },
    {
      headerName: "Цена за",
      valueGetter: ({ data }) => {
        return `${data!.pricePerQuantity} ${
          UnitOfMeasureTableDisplay[data!.unitOfMeasure]
        }`;
      },
      sortable: true,
      filter: "agTextColumnFilter",
      minWidth: 140,
    },
    {
      headerName: "Скидка",
      valueGetter: ({ data }) => {
        if (
          data == undefined ||
          data?.discount == null ||
          data.discount == undefined
        ) {
          return null;
        }

        return `${data.discount}%`;
      },
      sortable: true,
      filter: "agTextColumnFilter",
      minWidth: 110,
    },
    {
      colId: "actions",
      headerName: "",
      cellRenderer: (params: any) => {
        return (
          <IconButton
            variant="ghost"
            color="error"
            onClick={() =>
              params.data.itemType == 0
                ? handleDeleteProduct(params.data.id)
                : handleDeleteDevice(params.data.id)
            }
          >
            <CgRemove size={16} />
          </IconButton>
        );
      },
      flex: 0,
      sortable: false,
      filter: false,
    },
  ];

  const calculateTotalAmount = (rows: BasketRow[]): number =>
    rows.reduce((sum, row) => {
      const discountFactor = row.discount ? 1 - row.discount / 100 : 1;
      const rowTotal = (row.quantity / row.pricePerQuantity) * row.price;
      const rowTotalWithDiscount =
        (row.quantity / row.pricePerQuantity) * row.price * discountFactor;
      return (
        sum +
        (useTotalDiscount
          ? discountCalculatorType == DiscountCalculatorTypeEnum.FullDiscount ||
            discountCalculatorType ==
              DiscountCalculatorTypeEnum.OnlyItemDiscount
            ? rowTotalWithDiscount
            : rowTotal
          : rowTotalWithDiscount)
      );
    }, 0);

  useEffect(() => {
    const productsAmount = calculateTotalAmount(basketProducts);
    const devicesAmount = calculateTotalAmount(basketDevices);

    let result = productsAmount + devicesAmount;

    if (
      useTotalDiscount &&
      (discountCalculatorType == DiscountCalculatorTypeEnum.FullDiscount ||
        discountCalculatorType == DiscountCalculatorTypeEnum.OnlyTotalDiscount)
    ) {
      const discountFactor = totalDiscount ? 1 - totalDiscount / 100 : 1;
      result = result * discountFactor;
    }

    setTotalAmount(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    basketProducts,
    basketDevices,
    totalDiscount,
    discountCalculatorType,
    useTotalDiscount,
  ]);

  const handleDeleteProduct = (id: string) => {
    setBasketProducts(basketProducts.filter((bp) => bp.id != id));
  };

  const handleDeleteDevice = (id: string) => {
    setBasketDevices(basketDevices.filter((bd) => bd.id != id));
  };

  const handleRealize = () => {
    const products: RealizationItemRequestDto[] = basketProducts.flatMap(
      (p) => ({
        id: p.id,
        quantity: p.quantity,
        discountPercent: p.discount,
      })
    );
    const devices: RealizationItemRequestDto[] = basketDevices.flatMap((p) => ({
      id: p.id,
      quantity: p.quantity,
      discountPercent: p.discount,
    }));
    const realizationDto: RealizationRequestDto = {
      products: products,
      devices: devices,
      totalDiscount: totalDiscount,
      discountCalculatorType: discountCalculatorType,
    };
    realize(realizationDto)
      .unwrap()
      .then((result) => {
        toast.success(result.message);
        handleSaveCheck(result.data.checkContent);
        handleRemoveItemQuantity();
        setBasketProducts([]);
        setBasketDevices([]);
        setTotalDiscount(0);
        setUseTotalDiscount(false);
        setDiscountCalculatorType(0);
      })
      .catch((error) => toast.error(error.data));
  };

  const handleSaveCheck = (content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const lines = content.split("\n");
    const typeLine = lines[5].trim();
    const numberLine = lines[6].trim();
    const match = numberLine.match(/№\s*(\d+)/);
    let name = "";
    if (typeLine === "Списание") name = "WriteOff";
    else if (typeLine === "Приход") name = "Arrival";
    else name = "Sale";
    let number = 1;
    if (match) number = Number(match[1]);
    saveAs(blob, `${name} №${number}.txt`);
  };

  const handleRemoveItemQuantity = () => {
    rows.flatMap((row) => {
      if (row.itemType === BasketItemTypeEnum.Product) {
        dispatch(
          removeProductInventoryItemQuantity({
            id: row.id,
            quantity: row.quantity,
          })
        );
      } else {
        dispatch(
          removeDeviceInventoryItemQuantity({
            id: row.id,
            quantity: row.quantity,
          })
        );
      }
    });
  };

  return (
    <div className="h-full w-full flex flex-col gap-2">
      <div className="w-full p-2 flex flex-row justify-between">
        <Typography type="lead">Корзина</Typography>

        <div className="flex flex-row gap-2 items-center">
          <Checkbox
            id="totalDiscount"
            checked={useTotalDiscount}
            className="border-primary"
            onChange={(value) => {
              setUseTotalDiscount(Boolean(value.target.checked));
            }}
          >
            <Checkbox.Indicator />
          </Checkbox>
          <Typography
            as="label"
            htmlFor="totalDiscount"
            className="cursor-pointer whitespace-nowrap"
          >
            Добавить общую скидку?
          </Typography>
        </div>
      </div>
      <Card className="h-full border-surface-light text-sm ag-theme-material">
        <DataGrid data={rows} columns={columns} />
      </Card>
      <div
        className={clsx(
          "w-full flex flex-col gap-2 items-start justify-center",
          {
            hidden: !useTotalDiscount,
          }
        )}
      >
        <div className="flex flex-row gap-2 items-center">
          <Typography className="whitespace-nowrap">Общая скидка: </Typography>
          <div className="w-20">
            <Input
              type="number"
              className="border-primary px-2 py-1"
              value={totalDiscount}
              onChange={handleChangeDiscount}
            />
          </div>
          <Typography className="whitespace-nowrap">%</Typography>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <Typography className="whitespace-nowrap">
            Тип калькуляции скидки:
          </Typography>
          <Select
            size="sm"
            value={String(discountCalculatorType)}
            onValueChange={(val) =>
              setDiscountCalculatorType(Number(val) as DiscountCalculatorType)
            }
          >
            <Select.Trigger className="border-primary whitespace-nowrap px-2 py-1" />
            <Select.List>
              {DiscountCalculatorTypeOptions.map(({ label, value }) => (
                <Select.Option key={value} value={String(value)}>
                  {label}
                </Select.Option>
              ))}
            </Select.List>
          </Select>
        </div>
      </div>
      <Button
        className="mt-0 flex flex-row gap-2 items-center"
        onClick={handleRealize}
      >
        {isLoading && <Spinner size="sm" />}
        Рассчитать - Итоговая сумма: {totalAmount.toFixed(2)}
      </Button>
    </div>
  );
};
