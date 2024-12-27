// app/(pages)/category/[categoryName]/page.jsx
"use client";

import React from "react";
import useSWR from "swr";
import BookCarousel from "@/components/(home-page)/BookCarousel";
import LoadingAnimation from "@/components/ui/loading";
import { useParams } from "next/navigation";
import BookCard from "@/components/(home-page)/BookCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function BooksByCategory() {
  const params = useParams();
  const { categoryName } = params;

  const { data, error, isLoading } = useSWR(
    `/api/books/category/${encodeURIComponent(categoryName)}`,
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
      <div className="flex justify-center items-center min-h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  const { books, categoryInfo } = data || {};

  console.log(books);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          {categoryInfo?.name || categoryName}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {categoryInfo?.description}
        </p>
      </div>
      <section className="w-full">
        {/* Book Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
