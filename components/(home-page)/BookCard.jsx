import { StarFilledIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const BookCard = ({ book = {} }) => {
  const [randomOffset, setRandomOffset] = useState(0);

  useEffect(() => {
    setRandomOffset(Math.random());
  }, []);

  if (!book) return null;

  return (
    <Link href={`/book/${book.id || ""}`}>
      <div className="flex flex-col items-start w-full max-w-[210px] group">
        <div
          className="w-full transition-all duration-300 ease-in-out transform 
                      group-hover:scale-105 group-hover:-translate-y-2 
                      group-hover:shadow-lg rounded-lg overflow-hidden
                      group-hover:border-2"
        >
          <div className="w-full aspect-[5/7.7] overflow-hidden">
            <img
              src={book.img_url || "/placeholder.jpg"}
              alt={book.title || "Book cover"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 bg-white">
            <div className="flex flex-row gap-2 items-center w-full">
              <StarFilledIcon size={16} color="#FFD700" />
              <span className="text-xs font-semibold text-gray-600">
                {(((book.avg_rating || 0) % 5) + randomOffset).toFixed(1)}
              </span>
              <span className="text-xs font-bold text-yellow-300"> · </span>
              <span className="text-xs font-semibold text-gray-500 overflow-hidden">
                {((book.rating_count || 0) % 1000).toLocaleString()} đánh giá
              </span>
            </div>
            <span className="font-bold text-sm text-purple-600 pt-3 block truncate">
              {book.category || "Không có thể loại"}
            </span>
            <h3 className="text-lg font-bold text-black pt-2 line-clamp-2 overflow-hidden text-clip">
              {book.title || "Không có tên sách"}
            </h3>
            <span className="text-sm text-gray-500 block truncate">
              {book.authors || "Không có tác giả"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
