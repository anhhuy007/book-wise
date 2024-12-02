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

export function BookCarousel({ book_data }) {
  // convert book_data (from json array) to array of objects
  const books = book_data.map((book) => {
    return {
      id: book.id,
      title: book.title,
      authors: book.authors,
      img_url: book.img_url,
      avg_rating: book.avg_rating,
      rating_count: book.rating_count,
      category: book.category,
    };
  });

  return (
    <div className="w-full justify-center max-w-[1400px]">
      <Carousel>
        <CarouselContent className="ml-2">
          {Array.from({ length: books.length }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pt-5 pb-2 md:basis-1/3 lg:basis-1/5"
            >
              <BookCard {...books[index]} />
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
