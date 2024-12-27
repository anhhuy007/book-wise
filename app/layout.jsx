"use client";

import "./globals.css";
import SideNav, { ExpandedButton } from "@/components/(home-page)/SideNav";
import TopNav from "@/components/(home-page)/TopNav";
import { Separator } from "@/components/ui/separator";
import { SideNavProvider } from "@/contexts/SideNavContext";
import { useSideNav } from "@/contexts/SideNavContext";
import Footer from "@/components/(home-page)/Footer";
import { Toaster } from "react-hot-toast";
import { ChevronsLeft } from "lucide-react";
import { expandedButton } from "@/components/(home-page)/SideNav";

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
  const { expanded, setExpanded } = useSideNav();

  return (
    <div className="flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" flex-none sticky top-0 z-40 ">
        <TopNav />
        <Separator />
      </div>
      <div className="flex-1 flex">
        <div className="flex-none flex flex-col">
          <ExpandedButton />
          <SideNav />
        </div>
        <div
          className={`flex-1 mt-12 transition-all duration-300 ${
            expanded ? "md:ml-64" : "md:ml-20"
          }`}
        >
          <main className="p-2 md:p-6">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
