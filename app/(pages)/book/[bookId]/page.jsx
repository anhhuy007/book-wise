"use client";

import React from "react";
import useSWR from "swr";
import BookGeneralInformation from "@/components/(book)/BookGeneralInformation";
import { Separator } from "@/components/ui/separator";
import BookCarousel from "@/components/(home-page)/BookCarousel";
import LoadingAnimation from "@/components/ui/loading";

const fetcher = (url) => fetch(url).then((res) => res.json());

function BookDetail({ params }) {
  const { bookId } = React.use(params);
  const { data, error, isLoading } = useSWR(`/api/books/${bookId}`, fetcher);
  const { data: youMightLikeData } = useSWR(
    `/api/suggest/book/${bookId}`,
    fetcher
  );

  if (isLoading) return <LoadingAnimation />;
  if (error) return <div>Error</div>;

  const bookData = data[0];
  console.log("Book Data: ", bookData);

  return (
    <div className="flex flex-col p-2 xl:p-20 xl:pr-40">
      <BookGeneralInformation bookData={bookData} />
      <Separator className="bg-foreground mt-10" />
      <div className="mt-10">
        <h2 className="text-2xl font-bold">You might also like</h2>
        <BookCarousel book_data={youMightLikeData} />
      </div>
    </div>
  );
}

export default BookDetail;
