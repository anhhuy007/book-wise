"use client";

import "./globals.css";
import SideNav from "@/components/(home-page)/SideNav";
import TopNav from "@/components/(home-page)/TopNav";
import { Separator } from "@/components/ui/separator";
import { SideNavProvider } from "@/contexts/SideNavContext";
import { useSideNav } from "@/contexts/SideNavContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background ">
        <SideNavProvider>
          <LayoutContent>{children}</LayoutContent>
        </SideNavProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children }) {
  const { expanded } = useSideNav();

  return (
    <div className="flex flex-col">
      <div className="h-24 flex-none sticky top-0 z-40 bg-background">
        <TopNav />
        <Separator />
      </div>
      <div className="flex flex-row-ml-0 float-left">
        <SideNav />
        <div
          className={`flex flex-row flex-1 transition-all duration-300 ${
            expanded ? "ml-64" : "ml-20"
          }`}
        >
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
