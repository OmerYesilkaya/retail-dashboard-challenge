"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/Chart";
import { api } from "@/trpc/react";

const chartConfig = {
  price: {
    label: "Price",
    color: "#2563eb",
  },
  quantity_in_stock: {
    label: "Stock",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

// TODO(omer): Improve chart UI/visuals
export function DashboardProductChart() {
  const [data] = api.product.getMostRecent.useSuspenseQuery({ limit: 10 });

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[300px] w-full max-w-[50%]"
    >
      <BarChart accessibilityLayer data={data}>
        <Bar dataKey="price" fill="var(--color-price)" radius={4} />
        <Bar
          dataKey="quantity_in_stock"
          fill="var(--color-quantity_in_stock)"
          radius={4}
        />
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => (value as string).slice(0, 10) + "..."}
        />
      </BarChart>
    </ChartContainer>
  );
}
