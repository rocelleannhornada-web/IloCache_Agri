"use server";

import { generatePriceAlerts } from "@/ai/flows/generate-price-alerts";
import { crops } from "@/lib/data";
import type { Location } from "@/lib/types";

export async function getPriceAlertsAction(location: Location) {
  try {
    const crop = crops[Math.floor(Math.random() * crops.length)];
    const priceInfo = crop.prices.find((p) => p.location === location);

    if (!priceInfo) {
      return {
        alertMessage: `No price data available for ${crop.name} in ${location}.`,
        isAlertWarranted: false,
      };
    }

    // Use 90% of current price as a simple dynamic threshold for demonstration
    const priceThreshold = priceInfo.currentPrice * 0.9;

    const input = {
      location,
      crop: crop.name,
      currentPrice: priceInfo.currentPrice,
      historicalPrices: priceInfo.priceHistory,
      priceThreshold: priceThreshold,
    };

    const result = await generatePriceAlerts(input);
    return result;
  } catch (error) {
    console.error(error);
    return {
      alertMessage: "An error occurred while generating the price alert.",
      isAlertWarranted: false,
    };
  }
}
