import React from "react";
import Image from "next/image";
import { Star, StarHalf, Eye, Heart, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function BookGeneralInformation({ bookData }) {
  if (!bookData) {
    return <div>Loading...</div>;
  }

  const fullStars = Math.floor(bookData.avg_rating || 0);
  const hasHalfStar = (bookData.avg_rating || 0) % 1 >= 0.5;

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
          <Link href={`/author/${bookData.authors}`}>
            <h2 className="text-lg xl:text-2xl font-semibold text-blue-500 hover:underline">
              Written by: {bookData.authors}
            </h2>
          </Link>
          <Link href={`/category/${bookData.category}`}>
            <p className="text-lg xl:text-2xl font-semibold text-blue-500 hover:underline">
              {bookData.category}
            </p>
          </Link>
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
              <span>{bookData.avg_rating}</span>
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

export function BookSearchResult({ bookData }) {
  const fullStars = Math.floor(bookData.avg_rating);
  const hasHalfStar = bookData.avg_rating % 1 >= 0.5;
  const publishedYear = new Date(bookData.published_year).getFullYear();

  console.log(bookData);
  return (
    <>
      <div className="flex gap-5 md:gap-10">
        {/* Book cover */}
        <Image
          src={bookData.img_url}
          alt={bookData.title}
          width={300}
          height={400}
          className="
            w-full h-auto object-cover
            aspect-[3/4] 
            max-w-[120px]
            md:w-1/3 md:max-w-[150px]
            lg:w-1/4 lg:max-w-[170px]
            xl:w-1/3 xl:max-w-[200px]
          "
        />
        {/* Book Information */}
        <div className="flex flex-col gap-1 md:gap-2 lg:gap-3 xl:gap-5">
          <Link href={`/book/${bookData.id}`}>
            <h1 className="text-lg md:text-xl xl:text-2xl font-semibold hover:underline">
              {bookData.title}
            </h1>
          </Link>
          <Link href={`/author/${bookData.authors}`}>
            <h2 className="text-lg md:text-xl font-semibold text-blue-500 hover:underline">
              By: {bookData.authors}
            </h2>
          </Link>
          <Link href={`/category/${bookData.category}`}>
            <p className="text-lg md:text-xl text-blue-500 hover:underline">
              {bookData.category}
            </p>
          </Link>
          <div className="flex gap-2 items-center md:space-x-2 ">
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
            <div className="flex gap-2 ">
              <span className=" text-lg">{bookData.avg_rating}</span>
              <span className=" text-lg">({bookData.rating_count})</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            <Link href={`/book/${bookData.id}`}>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl py-1 sm:py-2 md:py-3 lg:py-4 px-2 sm:px-3 md:px-4 lg:px-5"
              >
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                Xem
              </Button>
            </Link>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl py-1 sm:py-2 md:py-3 lg:py-4 px-2 sm:px-3 md:px-4 lg:px-5"
            >
              <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              Theo dõi
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl py-1 sm:py-2 md:py-3 lg:py-4 px-2 sm:px-3 md:px-4 lg:px-5"
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              Yêu thích
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
