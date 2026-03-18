"use client";

import { ClickSpark } from "@/components/ClickSpark";

export function ClickSparkWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClickSpark
      sparkColor="#ccff00"
      sparkSize={10}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
    >
      {children}
    </ClickSpark>
  );
}
