import type { LucideIcon } from "lucide-react";

export interface PriceInfo {
  location: Location;
  currentPrice: number;
  priceHistory: number[];
  lastUpdated: string;
}

export interface Crop {
  id: string;
  name: string;
  icon: LucideIcon;
  prices: PriceInfo[];
}

export type Location = "Nueva Ecija" | "Benguet" | "Cebu";
