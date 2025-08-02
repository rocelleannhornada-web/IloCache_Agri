"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { List, Settings, TrendingUp } from "lucide-react";
import { Logo } from "@/components/logo";
import { PriceAlerts } from "@/components/price-alerts";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/prices", icon: List, label: "Check Prices" },
  { href: "/trends", icon: TrendingUp, label: "Price Trends" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Logo className="w-8 h-8 text-primary" />
              <div className="flex flex-col">
                <h1 className="font-headline font-bold text-lg text-primary-foreground">
                  AgriPrice
                </h1>
                <p className="text-xs text-muted-foreground">Watch</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} passHref>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={item.label}
                      className="font-headline"
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
            <h1 className="text-xl font-bold font-headline text-center flex-1">
              {navItems.find((item) => item.href === pathname)?.label}
            </h1>
            <PriceAlerts />
          </header>
          <main className="p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
