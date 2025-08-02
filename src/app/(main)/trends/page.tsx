"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { crops, locations } from "@/lib/data";
import type { Location, Crop } from "@/lib/types";
import { useLocation } from "@/hooks/use-location";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

const chartConfig = {
  price: {
    label: "Price (₱)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function TrendsPage() {
  const { location, setLocation } = useLocation();
  const [selectedCropId, setSelectedCropId] = React.useState<string>(crops[0].id);

  const handleLocationChange = (value: string) => {
    setLocation(value as Location);
  };

  const handleCropChange = (value: string) => {
    setSelectedCropId(value);
  };
  
  const selectedCrop = crops.find(c => c.id === selectedCropId);
  const priceInfo = selectedCrop?.prices.find(p => p.location === location);

  const chartData = priceInfo?.priceHistory.map((price, index) => ({
    day: `Day ${index + 1}`,
    price: price,
  })) || [];

  const trend = React.useMemo(() => {
    if (!priceInfo || priceInfo.priceHistory.length < 2) {
      return { Icon: Minus, text: "Stable", color: "text-muted-foreground" };
    }
    const firstPrice = priceInfo.priceHistory[0];
    const lastPrice = priceInfo.priceHistory[priceInfo.priceHistory.length - 1];
    if (lastPrice > firstPrice) {
      return { Icon: ArrowUp, text: "Prices are rising", color: "text-green-600" };
    }
    if (lastPrice < firstPrice) {
      return { Icon: ArrowDown, text: "Prices are dropping", color: "text-red-600" };
    }
    return { Icon: Minus, text: "Prices are stable", color: "text-muted-foreground" };
  }, [priceInfo]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold font-headline tracking-tight">
            Price Trends
          </h2>
          <p className="text-muted-foreground">
            7-day price history for crops in your selected region.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select onValueChange={handleCropChange} defaultValue={selectedCropId}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map((crop) => (
                <SelectItem key={crop.id} value={crop.id}>
                  {crop.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleLocationChange} defaultValue={location}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            {selectedCrop?.icon && <selectedCrop.icon className="w-6 h-6" />}
            {selectedCrop?.name} Price Trend in {location}
          </CardTitle>
          <CardDescription>Past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          {priceInfo ? (
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="hsl(var(--foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--foreground))" fontSize={12} domain={['dataMin - 2', 'dataMax + 2']}/>
                <Tooltip
                  content={<ChartTooltipContent indicator="dot" />}
                  cursor={{
                    stroke: "hsl(var(--accent))",
                    strokeWidth: 2,
                    strokeDasharray: "3 3",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "hsl(var(--accent))" }}
                  activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ChartContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground">
              No price data available for this selection.
            </div>
          )}
        </CardContent>
        <CardFooter>
            <div className={`flex items-center gap-2 text-sm font-medium ${trend.color}`}>
                <trend.Icon className="w-4 h-4" />
                <span>{trend.text}</span>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
