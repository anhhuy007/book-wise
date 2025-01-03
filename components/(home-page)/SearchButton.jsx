import React from "react";
import { Search } from "lucide-react";
import SearchBar from "@/components/(home-page)/SearchBar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function SearchButton() {
  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <div className="flex items-center justify-center p-3 rounded-lg border border-[var(--border)] transition-all transform hover:scale-105 cursor-pointer hover:bg-primary hover:text-primary-foreground">
            <Search size={20} />
          </div>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col items-center">
          <DrawerHeader>
            <DrawerTitle>Tìm kiếm</DrawerTitle>
          </DrawerHeader>
          <SearchBar />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SearchButton;
