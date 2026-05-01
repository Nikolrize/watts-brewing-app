"use client";

import { ReactNode } from "react";
import CustomHeader from "./custom-header";

export default function CustomHeaderWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomHeader />
      {children}
    </>
  );
}
