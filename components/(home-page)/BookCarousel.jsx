import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookCard from "./BookCard";

export function BookCarousel() {
  const books = [
    {
      img_url: "https://images.unsplash.com/photo-1612838334573-8f6e4d4b9a0f",
      title: "Sách hay 1",
      author: "Tác giả A",
      publisher: "Nhà xuất bản B",
      publishedDate: "2023-11-03",
      description: "Mô tả về cuốn sách 1",
    },
    {
      img_url: "https://images.unsplash.com/photo-1612838334573-8f6e4d4b9a0f",
      title: "Sách hay 2",
      author: "Tác giả B",
      publisher: "Nhà xuất bản C",
      publishedDate: "2023-11-03",
      description: "Mô tả về cuốn sách 2",
    },
    {
      img_url: "https://example.com/image3.jpg", // Thay thế bằng URL hình ảnh
      title: "Sách hay 3",
      author: "Tác giả C",
      publisher: "Nhà xuất bản D",
      publishedDate: "2023-12-15",
      description: "Mô tả về cuốn sách 3",
    },
    {
      img_url: "https://example.com/image4.jpg",
      title: "Sách hay 4",
      author: "Tác giả D",
      publisher: "Nhà xuất bản E",
      publishedDate: "2024-01-01",
      description: "Mô tả về cuốn sách 4",
    },
    {
      img_url: "https://example.com/image5.jpg",
      title: "Sách hay 5",
      author: "Tác giả E",
      publisher: "Nhà xuất bản F",
      publishedDate: "2023-11-20",
      description: "Mô tả về cuốn sách 5",
    },
    {
      img_url: "https://images.unsplash.com/photo-1612838334573-8f6e4d4b9a0f",
      title: "Sách hay 1",
      author: "Tác giả A",
      publisher: "Nhà xuất bản B",
      publishedDate: "2023-11-03",
      description: "Mô tả về cuốn sách 1",
    },
    {
      img_url: "https://images.unsplash.com/photo-1612838334573-8f6e4d4b9a0f",
      title: "Sách hay 2",
      author: "Tác giả B",
      publisher: "Nhà xuất bản C",
      publishedDate: "2023-11-03",
      description: "Mô tả về cuốn sách 2",
    },
    {
      img_url: "https://example.com/image3.jpg", // Thay thế bằng URL hình ảnh
      title: "Sách hay 3",
      author: "Tác giả C",
      publisher: "Nhà xuất bản D",
      publishedDate: "2023-12-15",
      description: "Mô tả về cuốn sách 3",
    },
    {
      img_url: "https://example.com/image4.jpg",
      title: "Sách hay 4",
      author: "Tác giả D",
      publisher: "Nhà xuất bản E",
      publishedDate: "2024-01-01",
      description: "Mô tả về cuốn sách 4",
    },
  ];
  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold self-start mb-10">Sách hay</h2>
        <Carousel className="w-11/12">
          <CarouselContent className="flex justify-between -ml-5">
            {Array.from({ length: books.length }).map((_, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/3 lg:basis-1/5 pl-5"
              >
                <BookCard {...books[index]} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}

export default BookCarousel;
