"use client";
import { ThemeProvider } from "@/components/theme-provider";
import React, { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default Providers;
