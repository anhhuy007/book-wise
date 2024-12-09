'use client';

import './style.css';
import React from 'react';
import useSWR from 'swr';
import BookCard from '@/components/(home-page)/BookCard';
import LoadingAnimation from '@/components/ui/loading';

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

const SlidingContainer = ({ isOpen, book, onClose }) => {
  return (
      <div className={`sliding-container ${isOpen ? 'open' : ''}`}>
          <button className="close-button" onClick={onClose}>Close</button>
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

  const books = shuffle(data);

  return (
    <div className='favourite-books'>
      <div className="container overflow-y-auto">
        <h1>Favourite Books</h1>
        <div className='grid grid-cols-5 gap-4'>
          {books.map((book, index) => (
            <div key={index}>
              <BookCard {...book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};