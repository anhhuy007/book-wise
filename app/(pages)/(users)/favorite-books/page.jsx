"use client";

import "./style.css";
import React from "react";
import useSWR from "swr";
import BookCard from "@/components/(home-page)/BookCard";
import LoadingAnimation from "@/components/ui/loading";

// Create fetcher function for SWR
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const SlidingContainer = ({ isOpen, book, onClose }) => {
  return (
    <div className={`sliding-container ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={onClose}>
        <span className="sr-only">Đóng</span>
      </button>
      {book && (
        <>
          <h2>{book.title}</h2>
          <p>{book.description}</p>
        </>
      )}
    </div>
  );
};

export default function FavouriteBooks() {
  const { data, error, isLoading } = useSWR(
    "https://672752d1302d03037e70a402.mockapi.io/book",
    fetcher
  );

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

  const books = data;

  return (
    <div className="favourite-books">
      <div className="container overflow-y-auto">
        <h1>Sách yêu thích</h1>
        <div className="grid grid-cols-5 gap-4">
          {books.map((book, index) => (
            <div key={index}>
              <BookCard {...book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
