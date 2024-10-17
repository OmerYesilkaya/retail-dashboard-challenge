"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/Chart";
import { api } from "@/trpc/react";

const chartConfig = {
  product_count: {
    label: "Count",
    color: "#ff6919",
  },
} satisfies ChartConfig;

// TODO(omer): Improve chart UI/visuals
export function CategoryStockChart() {
  const [data] = api.category.getAll.useSuspenseQuery();

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border p-10">
      <h4 className="flex w-full items-center justify-between text-xl font-semibold">
        Stock by Category
      </h4>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={data}>
          <Bar
            dataKey="product_count"
            fill="var(--color-product_count)"
            radius={4}
          />
          <CartesianGrid vertical={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            dataKey="product_count"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
