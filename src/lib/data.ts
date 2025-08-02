import type { Crop, Location } from "./types";
import { Wheat, Carrot, Leaf, Sprout } from "lucide-react";

export const locations: Location[] = ["Nueva Ecija", "Benguet", "Cebu"];

export const crops: Crop[] = [
  {
    id: "rice",
    name: "Rice",
    icon: Wheat,
    prices: [
      {
        location: "Nueva Ecija",
        currentPrice: 25,
        priceHistory: [24, 24.5, 24.2, 25, 25.1, 24.8, 25],
        lastUpdated: "2024-06-29T08:00:00Z",
      },
      {
        location: "Benguet",
        currentPrice: 28,
        priceHistory: [27, 27.5, 28, 28.2, 27.9, 28.1, 28],
        lastUpdated: "2024-06-29T08:00:00Z",
      },
      {
        location: "Cebu",
        currentPrice: 30,
        priceHistory: [29, 29.5, 29.8, 30, 30.1, 29.9, 30],
        lastUpdated: "2024-06-29T08:00:00Z",
      },
    ],
  },
  {
    id: "corn",
    name: "Corn",
    icon: Carrot,
    prices: [
      {
        location: "Nueva Ecija",
        currentPrice: 15,
        priceHistory: [14, 14.2, 14.5, 14.8, 15, 15.1, 15],
        lastUpdated: "2024-06-29T08:00:00Z",
      },
      {
        location: "Benguet",
        currentPrice: 18,
        priceHistory: [17, 17.5, 17.8, 18, 18.2, 17.9, 18],
        lastUpdated: "2024-06-29T08:00:00Z",
      },
      {
        location: "Cebu",
        currentPrice: 20,
        priceHistory: [19, 19.5, 19.8, 20, 20.1, 19.9, 20],
        lastUpdated: "2024-06-29T08:00:00Z",
      },
    ],
  },
  {
    id: "onion",
    name: "Onion",
    icon: Leaf,
    prices: [
      {
        location: "Nueva Ecija",
        currentPrice: 70,
        priceHistory: [80, 78, 75, 72, 70, 71, 70],
        lastUpdated: "2024-06-29T08:00:00Z",
      },
      {
        location: "Benguet",
        currentPrice: 80,
        priceHistory: [75, 78, 82, 85, 83, 81, 80],
        lastUpdated: "2024-06-29T08:00:00Z",
      },
      {
        location: "Cebu",
        currentPrice: 90,
        priceHistory: [85, 88, 89, 92, 91, 90, 90],
        lastUpdated: "2024-06-29T08:00:00Z",
      },
    ],
  },
  {
    id: "vegetables",
    name: "Mixed Vegetables",
    icon: Sprout,
    prices: [
      {
        location: "Nueva Ecija",
        currentPrice: 40,
        priceHistory: [38, 39, 40, 41, 40.5, 40, 40],
        lastUpdated: "2024-06-29T08:00:00Z",
      },
      {
        location: "Benguet",
        currentPrice: 35,
        priceHistory: [32, 33, 34, 35, 36, 35.5, 35],
        lastUpdated: "2024-06-29T08:00:00Z",
      },
      {
        location: "Cebu",
        currentPrice: 45,
        priceHistory: [42, 43, 44, 45, 46, 45.5, 45],
        lastUpdated: "2024-06-29T08:00:00Z",
      },
    ],
  },
];
