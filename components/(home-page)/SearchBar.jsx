"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ShineBorder from "../ui/shine-border";
// import { useEffect, useState } from "react";

function SearchBar({ onSearchTypeChange }) {
  const handleChangeSearchType = (value) => {
    onSearchTypeChange(value);
  };

  return (
    <div className="relative group ">
      {/* <ShineBorder className=" transition-all duration-300 group-hover:scale-105"> */}
      <div className="flex items-center p-6 space-x-5 rounded-xl transform transition duration-300">
        <div className="flex bg-accent flex-1 p-5 space-x-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="bg-accent outline-none flex-1 pr-10"
            type="text"
            placeholder="Tên sách..."
          />
        </div>
        <Select onValueChange={handleChangeSearchType}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Tìm theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="book">Tên sách</SelectItem>
            <SelectItem value="auth">Tác giả</SelectItem>
            <SelectItem value="pub">Nhà xuất bản</SelectItem>
          </SelectContent>
        </Select>

        <div className="py-3 px-7 font-semibold rounded-3xl bg-primary text-primary-foreground hover:shadow-2xl transition duration-300 cursor-pointer">
          <span>Tìm kiếm</span>
        </div>
      </div>
      {/* </ShineBorder> */}
    </div>
  );
}

export default SearchBar;
