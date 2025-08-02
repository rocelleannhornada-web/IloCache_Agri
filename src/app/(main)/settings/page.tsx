"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from "@/hooks/use-location";
import { locations } from "@/lib/data";
import type { Location } from "@/lib/types";

export default function SettingsPage() {
  const { location, setLocation } = useLocation();

  const handleLocationChange = (value: string) => {
    setLocation(value as Location);
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Settings</CardTitle>
          <CardDescription>
            Manage your application preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location">Default Location</Label>
            <p className="text-sm text-muted-foreground">
              This will be the default location for price checks and trends.
            </p>
            <Select onValueChange={handleLocationChange} defaultValue={location}>
              <SelectTrigger id="location" className="w-full sm:w-[240px]">
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
        </CardContent>
      </Card>
    </div>
  );
}
