import { lazy } from "react";

export const FinancialManagementBox = lazy(
  () => import("./FinancialManagementBox")
);

export const FinancialTable = lazy(() => import("./FinancialTabel"));

export const FinancialBar = lazy(() => import("./FinancialBar"));
