import { Input } from "@material-tailwind/react";
import { GridApi } from "ag-grid-community";
import clsx from "clsx";

interface DataGridQuickFilterProps {
  api: GridApi | null;
  className?: string;
}

export const DataGridQuickFilter = ({
  api,
  className = "",
}: DataGridQuickFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    api?.setGridOption("quickFilterText", e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="Быстрый поиск..."
      onChange={handleChange}
      className={clsx("w-full px-2 py-1", className)}
    />
  );
};
