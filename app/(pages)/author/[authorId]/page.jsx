"use client";

import React from "react";
import useSWR from "swr";
import LoadingAnimation from "@/components/ui/loading";
import BookCard from "@/components/(home-page)/BookCard";
import { useParams } from "next/navigation";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function BooksByAuthor() {
  const params = useParams();
  const { authorId } = params;

  const { data, error, isLoading } = useSWR(
    `/api/books/author/${authorId}`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  if (error || !data || !data.books) {
    return (
      <div className="text-center p-4 text-red-500">
        Không thể tải sách. Vui lòng thử lại sau.
      </div>
    );
  }

  const { books, authorInfo } = data || {};

  console.log(books);

  if (!books.length) {
    return (
      <div className="text-center p-4"> Không có sách nào của tác giả này.</div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6 md:p-12">
      {/* Thông tin tác giả */}
      <div className="text-center mb-8">
        {authorInfo?.avatar_url && (
          <img
            src={authorInfo.avatar_url}
            alt={authorInfo.name}
            className="rounded-full w-32 h-32 mx-auto mb-4"
          />
        )}
        <h1 className="text-4xl font-bold mb-4">
          {authorInfo?.name || "Unknown Author"}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {authorInfo?.description || "No description available."}
        </p>
      </div>
      {books.length < 4 ? (
        <div className="flex items-center justify-between mx-60 p-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
