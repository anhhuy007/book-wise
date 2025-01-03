"use client";

import BookCarousel from "@/components/(home-page)/BookCarousel";
import BookBannerCarousel from "@/components/(home-page)/BookBannerCarousel";
import {
  getBestSeller,
  getYouMightLike,
  getPeopleAlsoViewed,
} from "@/app/services/Services";
import React from "react";
import useSWR from "swr";

const MyButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      b
    </a>
  );
});
MyButton.displayName = "MyBtn";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page() {
  // const best_seller = await getBestSeller();
  const { data: popularBooks } = useSWR("/api/books/popular", fetcher);
  const { data: booksYouMightLike } = useSWR(
    "/api/books/collaborative/1",
    fetcher
  );
  const { data: booksPeopleAlsoWatched } = useSWR(
    "/api/books/user_preferences/1",
    fetcher
  );

  return (
    <div className="flex flex-col w-full items-center">
      <BookBannerCarousel />

      <h2 className="text-2xl font-bold self-start mt-10 mb-5">
        Sách phổ biến
      </h2>
      <BookCarousel book_data={popularBooks} />

      <h2 className="text-2xl font-bold self-start mt-10 mb-5">
        Có thể bạn sẽ thích
      </h2>
      <BookCarousel book_data={booksYouMightLike} />

      <h2 className="text-2xl font-bold self-start mt-10 mb-5">
        Mọi người cũng đang xem
      </h2>
      <BookCarousel book_data={booksPeopleAlsoWatched} />
    </div>
  );
}
