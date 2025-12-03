/* eslint-disable react-hooks/refs */
import { Button, Typography } from "@material-tailwind/react";
import { BiRefresh } from "react-icons/bi";
import {
  AllConfirmationDialog,
  DataGridQuickFilter,
  DataGridRef,
} from "../../components";
import { RefObject } from "react";
import { ExpiredInventoryRow } from "./Grid";
import { useDeleteExpiredProductsMutation } from "../../redux/api/writeOffApi";
import { toast } from "react-toastify";
import { ExpiringProductResponseDto } from "../../redux/dtos/responses/writeOff";
import { saveAs } from "file-saver";

interface Props {
  gridRef: RefObject<DataGridRef<ExpiredInventoryRow> | null>;
  data: ExpiringProductResponseDto[];
  refreshExpiredInventory: () => void;
}

export const Header = ({ gridRef, data, refreshExpiredInventory }: Props) => {
  const [deleteExpiredProduct, { isLoading }] =
    useDeleteExpiredProductsMutation();

  const handleDeleteExpiredProduct = () => {
    const ids = data.flatMap((d) => d.expiringItems.map((e) => e.id));
    deleteExpiredProduct(ids)
      .unwrap()
      .then((result) => {
        toast.info(result.message);
        handleSaveCheck(result.data.checkContent);
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

  const renderButtons = () => {
    return (
      <>
        {data.length > 0 && (
          <AllConfirmationDialog
            label="все продукты списания"
            isLoading={isLoading}
            deleteAction={handleDeleteExpiredProduct}
          />
        )}
        <Button
          variant="ghost"
          onClick={refreshExpiredInventory}
          className="p-2 sm:p-1"
        >
          <div className="flex flex-row gap-2 items-center text-foreground">
            <BiRefresh size={20} />
            <span className="hidden sm:block">Обновить</span>
          </div>
        </Button>
      </>
    );
  };

  return (
    <div className="w-full flex flex-col sm:flex-row gap-2 items-center">
      <div className="w-full sm:w-auto flex flex-row gap-2 justify-between">
        <Typography type="h5" className="whitespace-nowrap">
          Продукты на списание
        </Typography>
        <div className="flex sm:hidden flex-row gap-2">{renderButtons()}</div>
      </div>
      <DataGridQuickFilter api={gridRef.current?.api ?? null} />
      <div className="hidden sm:flex flex-row gap-2">{renderButtons()}</div>
    </div>
  );
};
