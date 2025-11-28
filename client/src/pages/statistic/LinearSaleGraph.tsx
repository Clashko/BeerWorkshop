import { selectProductsStatistic } from "../../redux/features/statisticSlice";
import { useAppSelector } from "../../redux/store/store";
import { Chart } from "../../components";

const getMondayFirstWeekday = (date: Date) => {
  const jsDay = date.getDay(); // 0=Вс ... 6=Сб
  return jsDay === 0 ? 6 : jsDay - 1;
};

const formatDateKey = (date: Date) => {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
};

export const LinearSaleGraph = () => {
  const productStatistic = useAppSelector(selectProductsStatistic);

  const countsByWeekday = Array.from({ length: 7 }, () => 0);
  const distinctDatesByWeekday: Array<Set<string>> = Array.from(
    { length: 7 },
    () => new Set<string>()
  );

  productStatistic.forEach((row) => {
    const date = new Date(row.transactionDate);
    const wd = getMondayFirstWeekday(date);
    const dateKey = formatDateKey(date);

    countsByWeekday[wd] += 1; // каждая строка = 1 продажа
    distinctDatesByWeekday[wd].add(dateKey);
  });

  const dayNames = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  const data = dayNames.map((name, idx) => {
    const daysCount = distinctDatesByWeekday[idx].size || 1;
    const avgSales = countsByWeekday[idx] / daysCount;
    return { day: name, avgSales };
  });

  return (
    <Chart
      data={data}
      type="bar"
      xKey="day"
      yKey="avgSales"
      yName="Среднее количество продаж"
      title="Среднее количество продаж по дням"
      className="w-1/2"
    />
  );
};
