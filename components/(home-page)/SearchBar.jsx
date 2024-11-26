"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightToLine } from "lucide-react";

const SearchBar = () => {
  const router = useRouter();
  const [searchType, setSearchType] = useState("book");
  const [searchValue, setSearchValue] = useState("");

  const handleChangeSearchType = (value) => {
    setSearchType(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(
        `/search?type=${searchType}&q=${encodeURIComponent(searchValue)}`
      );
    }
  };

  return (
    <div className="relative group">
      <div className="flex items-center p-6 space-x-2 md:space-x-5 rounded-xl transform transition duration-300">
        <Select onValueChange={handleChangeSearchType}>
          <SelectTrigger className="w-[100px] md:w-[150px]">
            <SelectValue placeholder="Tìm theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="book">Sách</SelectItem>
            <SelectItem value="auth">Tác giả</SelectItem>
            <SelectItem value="pub">Nhà xuất bản</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex bg-accent max-w-[170px] md:max-w-max p-3 space-x-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 opacity-30 hidden md:block"
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
            className="bg-accent outline-none md:flex-1 md:pr-10"
            type="text"
            placeholder="Tên sách..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div
          className="flex flex-row rounded-lg bg-slate-800 text-white font-bold px-5 py-3 hover:bg-slate-600 cursor-pointer"
          onClick={handleSearch}
        >
          <ArrowRightToLine className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
