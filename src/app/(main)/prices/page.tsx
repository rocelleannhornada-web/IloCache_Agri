"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { crops, locations } from "@/lib/data";
import type { Location } from "@/lib/types";
import { useLocation } from "@/hooks/use-location";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

function getPriceColor(currentPrice: number, history: number[]) {
  if (history.length === 0) return "bg-gray-400";
  const avg = history.reduce((a, b) => a + b, 0) / history.length;
  const percentageDiff = ((currentPrice - avg) / avg) * 100;

  if (percentageDiff > 5) return "bg-red-500";
  if (percentageDiff < -5) return "bg-green-500";
  return "bg-yellow-500";
}

export default function PricesPage() {
  const { location, setLocation } = useLocation();

  const handleLocationChange = (value: string) => {
    setLocation(value as Location);
  };

  const filteredCrops = crops.map((crop) => {
    const priceInfo = crop.prices.find((p) => p.location === location);
    return { ...crop, priceInfo };
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold font-headline tracking-tight">
            Current Market Prices
          </h2>
          <p className="text-muted-foreground">
            Displaying prices for {location}. Last updated on{" "}
            {format(new Date(), "MMMM d, yyyy")}.
          </p>
        </div>
        <div className="w-full sm:w-auto">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCrops.map((crop) => (
          <Card key={crop.id} className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
              <crop.icon className="w-10 h-10 text-primary" />
              <div>
                <CardTitle className="font-headline text-lg">
                  {crop.name}
                </CardTitle>
                <CardDescription>per kilogram</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              {crop.priceInfo ? (
                <div className="text-4xl font-bold">
                  ₱{crop.priceInfo.currentPrice.toFixed(2)}
                </div>
              ) : (
                <div className="text-lg text-muted-foreground">
                  Not available
                </div>
              )}
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              {crop.priceInfo && (
                <>
                   <Badge variant="outline">
                    Updated {format(new Date(crop.priceInfo.lastUpdated), 'MMM d')}
                   </Badge>
                   <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Level</span>
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full",
                        getPriceColor(
                          crop.priceInfo.currentPrice,
                          crop.priceInfo.priceHistory
                        )
                      )}
                    ></div>
                   </div>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
