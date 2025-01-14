"use client";

import React from "react";
import useSWR from "swr";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import BookBanner from "./BookBanner";
import Autoplay from "embla-carousel-autoplay";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function BookBannerCarousel() {
  const { data, error, isLoading } = useSWR(
    "https://672752d1302d03037e70a402.mockapi.io/banner",
    fetcher
  );

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Không thể tải sách. Vui lòng thử lại sau.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <div className="animate-pulse">Đang tải sách...</div>
      </div>
    );
  }

  const banners = data;
  // console.log("Banners: ", banners);

  return (
    <div className="flex flex-row w-full justify-center">
      <Carousel
        className="flex w-full max-w-screen-xl pl-32"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <BookBanner {...banner} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
