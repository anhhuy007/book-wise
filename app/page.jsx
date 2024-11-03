"use client";

import SearchBar from "@/components/(home-page)/SearchBar";
import { useState } from "react";
import Category from "@/components/(home-page)/Category";
import BookCard from "@/components/(home-page)/BookCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookCarousel from "@/components/(home-page)/BookCarousel";

export default function Page() {
  const [searchType, setSearchType] = useState("");

  const handleChangeSearchType = (value) => {
    setSearchType(value);
    console.log(value);
  };

  const books = {
    img_url: "https://images.unsplash.com/photo-1612838334573-8f6e4d4b9a0f",
    title: "Sách hay",
    author: "Tác giả A",
    publisher: "Nhà xuất bản B",
    publishedDate: "2023-11-03",
    description: "Mô tả về cuốn sách",
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex-none">
        <SearchBar onSearchTypeChange={handleChangeSearchType} />
      </div>
      <Category searchType={searchType} />
      <BookCarousel />
    </div>
  );
}
