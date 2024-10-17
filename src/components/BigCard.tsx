"use client";

import NumberFlow, { type Format } from "@number-flow/react";

const EASING_FUNCTION = "cubic-bezier(0, 0, 0.2, 1)";

type Props = {
  label: string;
  icon: JSX.Element;
  value: number;
  format: Format;
};

export function BigCard({ label, icon, value, format }: Props) {
  return (
    <div className="w-full rounded-md border border-slate-300 px-10 py-8 shadow-md">
      <h4 className="flex w-full items-center justify-between text-xl font-semibold">
        {label} {icon}
      </h4>
      <NumberFlow
        className="text-2xl font-bold"
        value={value}
        format={format}
        locales="en-US"
        transformTiming={{
          duration: 1500,
          easing: EASING_FUNCTION,
        }}
        spinTiming={{
          duration: 1500,
          easing: EASING_FUNCTION,
        }}
        opacityTiming={{ duration: 350, easing: "ease-out" }}
      />
    </div>
  );
}
