"use client";

import { createContext, useState, useMemo, type ReactNode } from "react";
import type { Location } from "@/lib/types";
import { locations } from "@/lib/data";

interface LocationContextType {
  location: Location;
  setLocation: (location: Location) => void;
}

export const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>(locations[0]);

  const value = useMemo(() => ({ location, setLocation }), [location]);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}
