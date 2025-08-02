'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating intelligent, location-based price alerts for farmers.
 *
 * The flow analyzes price trends and thresholds to identify profitable selling opportunities.
 * It exports the `generatePriceAlerts` function, the `GeneratePriceAlertsInput` type, and the `GeneratePriceAlertsOutput` type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the generatePriceAlerts function
const GeneratePriceAlertsInputSchema = z.object({
  location: z.string().describe('The location for which to generate price alerts (e.g., Nueva Ecija, Baguio, Cebu).'),
  crop: z.string().describe('The crop for which to generate price alerts (e.g., rice, corn, onions).'),
  currentPrice: z.number().describe('The current price of the crop in the specified location.'),
  historicalPrices: z.array(z.number()).describe('An array of historical prices for the crop in the specified location.'),
  priceThreshold: z.number().describe('The price threshold above which an alert should be generated.'),
});
export type GeneratePriceAlertsInput = z.infer<typeof GeneratePriceAlertsInputSchema>;

// Define the output schema for the generatePriceAlerts function
const GeneratePriceAlertsOutputSchema = z.object({
  alertMessage: z.string().describe('The generated price alert message.'),
  isAlertWarranted: z.boolean().describe('Whether or not an alert is warranted based on the price trends and threshold.'),
});
export type GeneratePriceAlertsOutput = z.infer<typeof GeneratePriceAlertsOutputSchema>;

// Define the generatePriceAlerts function
export async function generatePriceAlerts(input: GeneratePriceAlertsInput): Promise<GeneratePriceAlertsOutput> {
  return generatePriceAlertsFlow(input);
}

// Define the prompt for generating price alerts
const generatePriceAlertsPrompt = ai.definePrompt({
  name: 'generatePriceAlertsPrompt',
  input: {schema: GeneratePriceAlertsInputSchema},
  output: {schema: GeneratePriceAlertsOutputSchema},
  prompt: `You are an AI assistant that generates price alerts for farmers.

  You will be provided with the location, crop, current price, historical prices, and a price threshold.
  Your task is to analyze the price trends and determine if an alert should be generated.

  Consider the following factors when generating the alert:
  - Is the current price above the price threshold?
  - Is the current price significantly higher than the historical prices?
  - Is the price trend increasing?

  If an alert is warranted, generate an informative and helpful alert message for the farmer.
  Otherwise, indicate that no alert is warranted.

  Location: {{{location}}}
  Crop: {{{crop}}}
  Current Price: {{{currentPrice}}}
  Historical Prices: {{{historicalPrices}}}
  Price Threshold: {{{priceThreshold}}}

  Based on this information, determine if an alert is warranted and generate an appropriate alert message.
  Ensure that the alert message includes the relevant information, such as the crop, location, and current price.
  If no alert is warranted, return a message indicating that the price is within the normal range.
  Set the isAlertWarranted field to true if an alert is warranted, and false otherwise.
  `,
});

// Define the Genkit flow for generating price alerts
const generatePriceAlertsFlow = ai.defineFlow(
  {
    name: 'generatePriceAlertsFlow',
    inputSchema: GeneratePriceAlertsInputSchema,
    outputSchema: GeneratePriceAlertsOutputSchema,
  },
  async input => {
    const {output} = await generatePriceAlertsPrompt(input);
    return output!;
  }
);
