/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  Button,
  Typography,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { CgClose } from "react-icons/cg";
import { CheckResponseDto } from "../../redux/dtos/responses/checks/checkResponseDto";
import { FaRegEye } from "react-icons/fa";
import { TransactionType, TransactionTypeDisplay } from "../../redux/enums";
import { CheckItemResponseDto } from "../../redux/dtos/responses/checks/checkItemResponseDto";
import { ColDef } from "ag-grid-community";
import { DataGrid } from "../../components";

interface Props {
  check: CheckResponseDto;
}

export const ViewCheckInfo = ({ check }: Props) => {
  const columns: ColDef<CheckItemResponseDto>[] = [
    {
      colId: "name",
      headerName: "Наименование",
      valueGetter: (params: any) => params.data.name,
      minWidth: 230,
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Количество",
      valueGetter: (params: any) => params.data.quantity,
      sortable: true,
      minWidth: 200,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Цена",
      valueGetter: (params: any) => params.data.price,
      sortable: true,
      minWidth: 200,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Скидка",
      valueGetter: (params: any) => params.data.discount,
      sortable: true,
      minWidth: 200,
      filter: "agTextColumnFilter",
    },
  ];

  return (
    <Dialog>
      <Dialog.Trigger as={Button} variant="ghost" color="info" size="sm">
        <FaRegEye size={20} />
      </Dialog.Trigger>
      <Dialog.Overlay className="bg-surface-dark/70">
        <Dialog.Content className="flex flex-col gap-4 text-foreground">
          <div className="flex flex-row justify-between items-center gap-4">
            <Typography type="h6">Информация о чеке</Typography>
            <Dialog.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              isCircular
            >
              <CgClose size={16} />
            </Dialog.DismissTrigger>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Typography type="small">Номер транзакции:</Typography>
              <Typography type="small">{check.orderNumber}</Typography>
            </div>
            <div className="flex flex-row gap-2">
              <Typography type="small">Тип транзакции:</Typography>
              <Typography type="small">
                {
                  TransactionTypeDisplay[
                    check.transactionType as TransactionType
                  ]
                }
              </Typography>
            </div>
            <div className="flex flex-row gap-2">
              <Typography type="small">Дата транзакции:</Typography>
              <Typography type="small">
                {new Date(check.transactionDate).toLocaleDateString("ru-RU")}
              </Typography>
            </div>
            <div className="flex flex-row gap-2">
              <Typography type="small">Общая сумма:</Typography>
              <Typography type="small">{check.totalAmount}</Typography>
            </div>
          </div>
          <Card className="bg-surface h-[300px] ag-theme-material">
            <DataGrid data={check.checkItems} columns={columns} />
          </Card>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};
