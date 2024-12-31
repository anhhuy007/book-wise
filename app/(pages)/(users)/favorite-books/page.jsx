"use client";

import React from "react";
import useSWR from "swr";
import BookCard from "@/components/(home-page)/BookCard";
import LoadingAnimation from "@/components/ui/loading";

// Create fetcher function for SWR
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function FavouriteBooks() {
  const {
    data: books,
    error,
    isLoading,
  } = useSWR("/api/favourites/1", fetcher);

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Không thể tải sách yêu thích. Vui lòng thử lại sau.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="favourite-books">
      <div className="flex flex-col overflow-y-auto">
        <h1 className="text-4xl font-bold text-center">
          Danh sách yêu thích của bạn
        </h1>

        <div className="grid grid-cols-5 gap-4 mt-10">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
