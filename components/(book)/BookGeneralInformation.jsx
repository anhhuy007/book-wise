import React from "react";
import Image from "next/image";
import { Star, StarHalf } from "lucide-react";

function BookGeneralInformation({ bookData }) {
  const fullStars = Math.floor(bookData.avg_rating);
  const hasHalfStar = bookData.avg_rating % 1 >= 0.5;

  return (
    <>
      <div className="flex flex-grow gap-10">
        {/* Book cover */}
        <Image
          src={bookData.img_url}
          alt={bookData.title}
          width={300}
          height={300}
          className="w-full max-w-[200px] md:max-w-[300px] h-auto object-cover"
        />
        {/* Book Information */}
        <div className="flex xl:max-w-md flex-col gap-2 xl:gap-5 space-y-4">
          <h1 className="text-2xl xl:text-5xl font-semibold">
            {bookData.title}
          </h1>
          <h2 className="text-lg xl:text-2xl font-semibold">
            Written by: {bookData.author}
          </h2>
          <p className="text-lg xl:text-2xl">{bookData.category}</p>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                if (index < fullStars) {
                  return (
                    <Star
                      key={index}
                      size={16}
                      className="text-yellow-400 fill-current"
                    />
                  );
                } else if (index === fullStars && hasHalfStar) {
                  return (
                    <StarHalf
                      key={index}
                      size={16}
                      className="text-yellow-400 fill-current"
                    />
                  );
                } else {
                  return (
                    <Star key={index} size={16} className="text-gray-300" />
                  );
                }
              })}
            </div>
            <span>{bookData.avg_rating.toFixed(1)}</span>
            <span>({bookData.rating_count})</span>
          </div>
          <span>
            <p>"{bookData.description}"</p>
          </span>
        </div>
      </div>
    </>
  );
}

export default BookGeneralInformation;
