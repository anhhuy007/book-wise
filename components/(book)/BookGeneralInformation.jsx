import React from "react";
import Image from "next/image";
import { Star, StarHalf } from "lucide-react";

function BookGeneralInformation({ bookData }) {
  const fullStars = Math.floor(bookData.avg_rating);
  const hasHalfStar = bookData.avg_rating % 1 >= 0.5;

  return (
    <>
      <div className="flex flex-grow gap-5 md:gap-10">
        {/* Book cover */}
        <Image
          src={bookData.img_url}
          alt={bookData.title}
          width={300}
          height={400}
          className="
            w-full h-auto object-cover
            aspect-[3/4] 
            max-w-[150px]
            md:w-1/3 md:max-w-[250px]
            lg:w-1/4 lg:max-w-[350px]
            xl:w-1/3 xl:max-w-[400px]
          "
        />
        {/* Book Information */}
        <div className="flex xl:max-w-md flex-col gap-1 md:gap-5 space-y-4">
          <h1 className="text-2xl xl:text-5xl font-semibold">
            {bookData.title}
          </h1>
          <h2 className="text-lg xl:text-2xl font-semibold">
            Written by: {bookData.author}
          </h2>
          <p className="text-lg xl:text-2xl">{bookData.category}</p>
          <div className="flex flex-col gap-2 md:flex-row md:space-x-2 ">
            <div className="flex ">
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
            <div className="flex gap-2">
              <span>{bookData.avg_rating.toFixed(1)}</span>
              <span>({bookData.rating_count})</span>
            </div>
          </div>
          <span className="hidden md:block">
            <p>"{bookData.description}"</p>
          </span>
        </div>
      </div>
      <span className="my-10 pr-3 text-center md:hidden">
        <p>"{bookData.description}"</p>
      </span>
    </>
  );
}

export default BookGeneralInformation;
