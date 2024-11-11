"use client";

import BookCarousel from "@/components/(home-page)/BookCarousel";
import BookBannerCarousel from "@/components/(home-page)/BookBannerCarousel";

export default function Page() {
  return (
    <div className="flex flex-col w-full items-center">
      <BookBannerCarousel />

      <h2 className="text-2xl font-bold self-start mt-10 mb-5">Best Seller</h2>
      <BookCarousel />

      <h2 className="text-2xl font-bold self-start mt-10 mb-5">
        Có thể bạn sẽ thích
      </h2>
      <BookCarousel />

      <h2 className="text-2xl font-bold self-start mt-10 mb-5">
        Mọi người cũng đang xem
      </h2>
      <BookCarousel />
    </div>
  );
}
