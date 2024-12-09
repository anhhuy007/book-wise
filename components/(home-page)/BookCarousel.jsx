"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookCard from "./BookCard";

export function BookCarousel({ book_data = [] }) {
  const books = book_data || [];

  return (
    <div className="flex w-full justify-center">
      <Carousel className="w-full max-w-screen-xl">
        <CarouselContent>
          {books.map((book, index) => (
            <CarouselItem
              key={book?.id || index}
              className="ml-[5px] pt-5 pb-2 md:basis-1/3 lg:basis-1/5"
            >
              <BookCard book={book} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default BookCarousel;