import React, { useState } from "react";
import Image from "next/image";
import { Star, StarHalf, Eye, Heart, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function BookGeneralInformation({ bookData }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  if (!bookData) {
    return <div>Loading...</div>;
  }

  const fullStars = Math.floor(bookData.avg_rating);
  const hasHalfStar = bookData.avg_rating % 1 !== 0;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Book Cover */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg border bg-muted">
          <Image
            src={bookData.img_url}
            alt={bookData.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Book Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold tracking-tight">
                {bookData.title}
              </h1>
              <div className="text-sm text-muted-foreground space-x-2">
                <span>ISBN: {bookData.isbn}</span>
                <span>•</span>
                <span>{bookData.pages} Pages</span>
                <span>•</span>
                <span>Language: {bookData.language}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleLike}
            >
              {isLiked ? (
                <Heart className="h-5 w-5 " />
              ) : (
                <Heart className="h-5 w-5 text-red-500" />
              )}
            </Button>
          </div>

          <div className="space-y-2">
            <Link href={`/author/${bookData.authors}`}>
              <h2 className="text-xl font-semibold hover:underline">
                by {bookData.authors}
              </h2>
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Category: {bookData.category}
              </span>
              <span>•</span>
              <span className="text-sm text-muted-foreground">
                Published: {bookData.published_year}
              </span>
            </div>
          </div>

          <Card className="p-4 bg-muted/50 flex flex-col">
            <p className="text-sm leading-relaxed line-clamp-[8]">
              {bookData.description}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="">
                  Read more
                </Button>
              </DialogTrigger>
              <DialogContent className="text-pretty">
                <DialogHeader>
                  <DialogTitle>Full Description</DialogTitle>
                </DialogHeader>
                {bookData.description}
              </DialogContent>
            </Dialog>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 ">
              <div className="text-2xl font-bold">
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
                </div>{" "}
              </div>
              <div className="text-sm text-muted-foreground">
                ({bookData.rating_count} reviews)
              </div>
            </div>

            <div className="flex items-center space-x-4"></div>
            <div className="flex flex-1 items-center w-full space-x-4">
              <Button size="lg" className="flex-1">
                Preview
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Add to favorite
              </Button>
            </div>
          </div>
        </div>
      </div>
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
