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

export function BookCarousel({
  book_data
}) {
  // convert book_data (from json array) to array of objects
  const books = book_data.map((book) => {
    return {
      id: book.id,
      title: book.title,
      authors: book.authors, 
      img_url: book.img_url,
      avg_rating: book.avg_rating,
      rating_count: book.rating_count,
      category: book.category
    };
  });

  return (
    <div className="flex w-full justify-center">
      <Carousel className="w-full max-w-screen-xl">
        <CarouselContent>
          {Array.from({ length: books.length }).map((_, index) => (
            <CarouselItem
              key={index}
              className="ml-[5px] pt-5 pb-2 md:basis-1/3 lg:basis-1/5"
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
