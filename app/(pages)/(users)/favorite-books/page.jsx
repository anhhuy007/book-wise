"use client";

import "./style.css";
import React from "react";
import useSWR from "swr";
import BookCard from "@/components/(home-page)/BookCard";
import LoadingAnimation from "@/components/ui/loading";

// Create fetcher function for SWR
const fetcher = (...args) => fetch(...args).then((res) => res.json());

// function shuffle(array) {
//   let currentIndex = array.length;

//   // While there remain elements to shuffle...
//   while (currentIndex != 0) {
//     // Pick a remaining element...
//     let randomIndex = Math.floor(Math.() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }

  return array;
}

export default function FavouriteBooks() {
  const { data: books, error, isLoading } = useSWR(
    "/api/favourites/1",
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
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="favourite-books">
      <div className="flex flex-col overflow-y-auto">
        <h1>Favourite Books</h1>
        <div className="grid grid-cols-5 gap-4">
        {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
