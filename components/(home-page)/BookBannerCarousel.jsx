"use client";

import React, { useEffect } from "react";
import useSWR from "swr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import BookBanner from "./BookBanner";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function BookBannerCarousel() {
  const { data, error, isLoading } = useSWR(
    "https://672752d1302d03037e70a402.mockapi.io/banner",
    fetcher
  );

  // Use state to track the current slide index
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Set up the auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (data?.length || 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [data]);

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

  const banners = data;

  return (
    <div className="flex flex-row w-full justify-center">
      <Carousel className="flex w-full max-w-screen-xl pl-32">
        <CarouselContent
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: banners.length }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
              <BookBanner {...banners[index]} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
