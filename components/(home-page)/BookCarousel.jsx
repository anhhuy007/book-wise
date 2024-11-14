"use client";

import React from "react";
import useSWR from "swr";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookCard from "./BookCard";

// Create fetcher function for SWR
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function BookCarousel() {
  const { data, error, isLoading } = useSWR(
    "https://672752d1302d03037e70a402.mockapi.io/book",
    fetcher
  );

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Failed to load books. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <div className="animate-pulse">Loading books...</div>
      </div>
    );
  }

  const books = shuffle(data);

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
