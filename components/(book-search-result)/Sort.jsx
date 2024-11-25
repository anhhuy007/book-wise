"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
  Star,
  ArrowDownAZ,
  ArrowUpAZ,
} from "lucide-react";

const sortOptions = [
  { value: "price-up", label: "Giá tăng dần", icon: ArrowUpNarrowWide },
  { value: "price-down", label: "Giá giảm dần", icon: ArrowDownWideNarrow },
  { value: "rating", label: "Đánh giá cao", icon: Star },
  { value: "a-to-z", label: "A đến Z", icon: ArrowDownAZ },
  { value: "z-to-a", label: "Z đến A", icon: ArrowUpAZ },
];

function Sort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  const handleSortChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      className="flex-none"
      value={currentSort}
      onValueChange={handleSortChange}
    >
      <SelectTrigger className="w-[170px] py-4 text-foreground">
        <SelectValue placeholder="Chọn bộ lọc" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortOptions.map(({ value, label, icon: Icon }) => (
            <SelectItem key={value} value={value} className="cursor-pointer">
              <div className="flex items-center">
                <Icon className="mr-3 h-6 w-6" />
                <span>{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Sort;
