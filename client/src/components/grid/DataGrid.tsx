import { useThemeMode } from "../../utils/ThemeMode";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  DateFilterModule,
  NumberFilterModule,
  TextFilterModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  ColDef,
  themeMaterial,
  GridApi,
} from "ag-grid-community";
import { forwardRef, Ref, useImperativeHandle, useRef } from "react";
//import "./datagrid.module.css";

ModuleRegistry.registerModules([
  AllCommunityModule,
  DateFilterModule,
  NumberFilterModule,
  TextFilterModule,
  ClientSideRowModelModule,
]);

interface Props<TData> {
  columns: ColDef<TData>[];
  data: TData[];
  isLoading?: boolean;
}

export interface DataGridRef<TData> {
  api: GridApi<TData> | null;
}

// Внутренняя generic-функция (generic сохраняется)
function DataGridInner<TData>(
  { data, columns, isLoading }: Props<TData>,
  ref: Ref<DataGridRef<TData>>
) {
  const { themeMode } = useThemeMode();

  const myTheme = themeMaterial.withParams({
    fontFamily: "inherit",
    fontSize: "inherit",
    headerRowBorder: false,
    iconSize: 20,
    rowBorder: false,
    spacing: 4,
    wrapperBorder: false,
    accentColor: themeMode === "light" ? "#2196F3" : "#1D63C5",
    backgroundColor: themeMode === "light" ? "#F2F2F2" : "#0A1624",
    browserColorScheme: themeMode === "light" ? "light" : "dark",
    chromeBackgroundColor: themeMode === "light" ? "#F2F2F2" : "#0A1624",
    foregroundColor: themeMode === "light" ? "#0D3B66" : "#95AFCF",
    headerTextColor: themeMode === "light" ? "#0D3B66" : "#95AFCF",
    headerBackgroundColor: themeMode === "light" ? "#E0E0E0" : "#12263A",
    oddRowBackgroundColor: themeMode === "light" ? "#E0E0E0" : "#081220",
  });

  const gridRef = useRef<AgGridReact<TData>>(null);

  useImperativeHandle(ref, () => ({
    api: gridRef.current?.api ?? null,
  }));

  const enhancedColumnDefs = columns.map((col) => ({
    ...col,
    cellClass: `flex items-center ${col.cellClass || ""}`,
  }));

  return (
    <AgGridReact<TData>
      ref={gridRef}
      theme={myTheme}
      rowData={data}
      columnDefs={enhancedColumnDefs}
      loading={isLoading}
      groupDisplayType="multipleColumns"
      animateRows
      defaultColDef={{
        flex: 1,
        resizable: false,
        sortable: true,
        filter: true,
      }}
      onGridReady={(params) => {
        const col = params.api.getColumn("actions");
        if (col) params.api.autoSizeColumns([col.getId()]);

        const namecol = params.api.getColumn("name");
        if (namecol) params.api.autoSizeColumns([namecol.getId()]);

        const shortnamecol = params.api.getColumn("shortName");
        if (shortnamecol) params.api.autoSizeColumns([shortnamecol.getId()]);
      }}
      onFirstDataRendered={(params) => {
        const col = params.api.getColumn("actions");
        if (col) params.api.autoSizeColumns([col.getId()]);

        const namecol = params.api.getColumn("name");
        if (namecol) params.api.autoSizeColumns([namecol.getId()]);

        const shortnamecol = params.api.getColumn("shortName");
        if (shortnamecol) params.api.autoSizeColumns([shortnamecol.getId()]);
      }}
      onRowDataUpdated={(params) => {
        const col = params.api.getColumn("actions");
        if (col) params.api.autoSizeColumns([col.getId()]);

        const namecol = params.api.getColumn("name");
        if (namecol) params.api.autoSizeColumns([namecol.getId()]);

        const shortnamecol = params.api.getColumn("shortName");
        if (shortnamecol) params.api.autoSizeColumns([shortnamecol.getId()]);
      }}
      onModelUpdated={(params) => {
        const col = params.api.getColumn("actions");
        if (col) params.api.autoSizeColumns([col.getId()]);

        const namecol = params.api.getColumn("name");
        if (namecol) params.api.autoSizeColumns([namecol.getId()]);

        const shortnamecol = params.api.getColumn("shortName");
        if (shortnamecol) params.api.autoSizeColumns([shortnamecol.getId()]);
      }}
      enableCellSpan
      localeText={{
        filterOoo: "Фильтр...",
        loadingOoo: "Идет запрос данных...",
        noRowsToShow: "Данные отсутствуют",
        dateFormat: "dd.MM.yyyy",
        page: "Страница",
        more: "Ещё",
        to: "по",
        of: "из",
        next: "Следующая",
        last: "Последняя",
        first: "Первая",
        previous: "Предыдущая",
        equals: "Равно",
        notEqual: "Не равно",
        before: "До",
        after: "После",
        lessThan: "Меньше",
        greaterThan: "Больше",
        lessThanOrEqual: "Меньше или равно",
        greaterThanOrEqual: "Больше или равно",
        inRange: "В диапазоне",
        contains: "Содержит",
        notContains: "Не содержит",
        startsWith: "Начинается с",
        endsWith: "Заканчивается на",
        blank: "Пусто",
        notBlank: "Не пусто",
        applyFilter: "Применить фильтр",
        clearFilter: "Очистить фильтр",
        resetFilter: "Сбросить фильтр",
        cancel: "Отмена",
      }}
    />
  );
}

// Оборачиваем и явно «поднимаем» generic наружу
export const DataGrid = forwardRef(DataGridInner) as <TData>(
  props: Props<TData> & { ref?: Ref<DataGridRef<TData>> }
) => React.ReactElement;
