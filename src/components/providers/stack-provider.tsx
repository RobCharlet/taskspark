"use client";

import { ReactNode } from "react";
import { StackProvider, StackTheme } from "@stackframe/stack";

import { stackClientApp } from "@/stack/client";

type StackProvidersProps = {
  children: ReactNode;
};

export function StackProviders({ children }: StackProvidersProps) {
  return (
    <StackProvider app={stackClientApp}>
      <StackTheme>{children}</StackTheme>
    </StackProvider>
  );
}
