"use client";

import { LocationContext } from "@/components/location-provider";
import { useContext } from "react";

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
