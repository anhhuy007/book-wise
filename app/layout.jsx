"use client";

import "./globals.css";
import SideNav from "@/components/(home-page)/SideNav";
import TopNav from "@/components/(home-page)/TopNav";
import { Separator } from "@/components/ui/separator";
import { SideNavProvider } from "@/contexts/SideNavContext";
import { useSideNav } from "@/contexts/SideNavContext";
import Footer from "@/components/(home-page)/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background">
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
    <div className="flex min-h-screen">
      <div className="flex-none">
        <SideNav />
      </div>
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          expanded ? "ml-64" : "ml-20"
        }`}
      >
        <div className="h-24 flex-none sticky top-0 z-40 bg-background">
          <TopNav />
          <Separator />
        </div>
        <main className="flex-1 p-2 md:p-6 mb-20">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
