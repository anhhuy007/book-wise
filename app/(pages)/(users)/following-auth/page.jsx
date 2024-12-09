import React from "react";
import Link from "next/link";

// Sample data for authors
const authorsData = [
  {
    name: "Author One",
    books: [
      { title: "Book A1", img_url: "url_to_image_A1", avg_rating: 4.5 },
      { title: "Book A2", img_url: "url_to_image_A2", avg_rating: 4.0 },
    ],
  },
  {
    name: "Author Two",
    books: [
      { title: "Book B1", img_url: "url_to_image_B1", avg_rating: 4.8 },
      { title: "Book B2", img_url: "url_to_image_B2", avg_rating: 4.2 },
    ],
  },
  {
    name: "Author Three",
    books: [
      { title: "Book C1", img_url: "url_to_image_C1", avg_rating: 4.7 },
    ],
  },
];

function FollowingAuthors() {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-3">Following Authors</h1>
      {authorsData.map((author, index) => (
        <div key={index} className="author-container mb-5 border border-gray-200 rounded p-5">
          <h2 className="text-lg font-bold">{author.name}</h2>
          <h3 className="mt-5 mb-2">Tác phẩm tiêu biểu</h3>
          <div className="flex gap-2 overflow-x-auto">
            {author.books.map((book, bookIndex) => (
              <Link key={bookIndex} href={`/book/${book.title}`}>
                <div className="flex flex-col items-start w-full max-w-[120px] group">
                  <div className="w-full transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-lg rounded-lg overflow-hidden">
                    <div className="w-full aspect-[5/7] overflow-hidden">
                      <img
                        src={book.img_url}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 bg-white">
                      <h3 className="text-sm font-bold text-black line-clamp-1 overflow-hidden text-clip">
                        {book.title}
                      </h3>
                      <span className="text-xs text-gray-500 block truncate">
                        {author.name}
                      </span>
                      <span className="text-xs font-semibold text-gray-600">
                        {book.avg_rating.toFixed(1)} ★
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FollowingAuthors;