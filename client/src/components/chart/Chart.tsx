/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@material-tailwind/react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import clsx from "clsx";
import { useThemeMode } from "../../utils/ThemeMode";

interface Props {
  data: any[];
  title?: string;
  type: "pie" | "line" | "bar" | "area" | "scatter"; // можно расширять
  xKey?: string; // для линейных/бар‑графиков
  yKey?: string; // для линейных/бар‑графиков
  angleKey?: string; // для donut
  yName?: string;
  labelKey?: string; // для donut
  className?: string;
}

export const Chart = ({
  data,
  title,
  type,
  xKey,
  yKey,
  angleKey,
  yName,
  labelKey,
  className,
}: Props) => {
  const themeMode = useThemeMode();

  const series: any =
    type === "pie"
      ? {
          type: "pie",
          angleKey: angleKey || "value",
          legendItemKey: labelKey || "name",
          label: {
            color: themeMode.themeMode === "light" ? "#0D3B66" : "#95AFCF",
          },
        }
      : {
          type,
          xKey: xKey || "x",
          yKey: yKey || "y",
          yName: yName || yKey || "",
        };

  const options: AgChartOptions = {
    data,
    title: title
      ? {
          text: title,
          color: themeMode.themeMode === "light" ? "#0D3B66" : "#95AFCF",
          fontSize: 20,
        }
      : undefined,
    series: [series],
    background: { fill: "transparent" },
    legend: {
      position: "bottom",
      item: {
        label: {
          fontSize: 16,
          color: themeMode.themeMode === "light" ? "#0D3B66" : "#95AFCF",
        },
      },
    },
    axes: [
      {
        type: "category",
        position: "bottom",
        label: {
          color: themeMode.themeMode === "light" ? "#0D3B66" : "#95AFCF",
        },
      },
      {
        type: "number",
        position: "left",
        label: {
          color: themeMode.themeMode === "light" ? "#0D3B66" : "#95AFCF",
        },
      },
    ],
  };

  return (
    <Card className={clsx("bg-surface p-4", className)}>
      <AgCharts options={options} style={{ width: "100%" }} />
    </Card>
  );
};
