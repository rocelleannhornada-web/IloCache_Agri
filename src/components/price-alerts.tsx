"use client";

import * as React from "react";
import { Bell, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocation } from "@/hooks/use-location";
import { getPriceAlertsAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Alert {
  message: string;
  isWarranted: boolean;
  timestamp: Date;
}

export function PriceAlerts() {
  const { location } = useLocation();
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();
  const [alerts, setAlerts] = React.useState<Alert[]>([]);

  const handleGenerateAlert = () => {
    startTransition(async () => {
      const result = await getPriceAlertsAction(location);
      if (result) {
        setAlerts((prev) => [
          {
            message: result.alertMessage,
            isWarranted: result.isAlertWarranted,
            timestamp: new Date(),
          },
          ...prev,
        ]);
        if (!result.isWarranted) {
            toast({
                title: "No Urgent Price Changes",
                description: result.alertMessage,
            });
        }
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {alerts.filter(a => a.isWarranted).length > 0 && (
             <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent/80"></span>
            </span>
          )}
          <span className="sr-only">Open price alerts</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Price Alerts</h4>
            <p className="text-sm text-muted-foreground">
              Notifications for {location}
            </p>
          </div>
          <Button onClick={handleGenerateAlert} disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Generate New Alert
          </Button>
          <div className="grid gap-2 max-h-64 overflow-y-auto">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`text-sm p-2 rounded-md ${
                    alert.isWarranted
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-secondary"
                  }`}
                >
                  <p className="font-semibold">{alert.isWarranted ? "Alert!" : "Info"}</p>
                  <p>{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No alerts yet. Generate one to get started.
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
