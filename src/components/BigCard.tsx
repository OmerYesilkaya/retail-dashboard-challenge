"use client";

import NumberFlow, { type Format } from "@number-flow/react";

const EASING_FUNCTION = "cubic-bezier(0, 0, 0.2, 1)";

type Props = {
  label: string;
  value: number;
  format: Format;
};

export function BigCard({ label, value, format }: Props) {
  return (
    <div>
      <h4>{label}</h4>
      <NumberFlow
        value={value}
        format={format}
        locales="en-US"
        transformTiming={{
          duration: 700,
          easing: EASING_FUNCTION,
        }}
        spinTiming={{
          duration: 700,
          easing: EASING_FUNCTION,
        }}
        opacityTiming={{ duration: 350, easing: "ease-out" }}
      />
    </div>
  );
}
