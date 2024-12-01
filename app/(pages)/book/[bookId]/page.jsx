"use client";

import React from "react";
import BookAvailableStatus from "@/components/(book)/BookAvailableStatus";
import BookGeneralInformation from "@/components/(book)/BookGeneralInformation";
import { Separator } from "@/components/ui/separator";
import AboutSection from "@/components/(book)/AboutSection";
import OpinionSection from "@/components/(book)/OpinionSection";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function BookDetail({ params }) {
  const { bookId } = React.use(params);
  const { data, error, isLoading } = useSWR(`/api/books/${bookId}`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const bookData = data[0];
  console.log("Book Data: ", bookData);

  return (
    <>
      <div className="flex flex-col p-2 xl:p-20 xl:pr-40 gap-20">
        <div className="flex flex-col xl:flex-row justify-between w-full space-x-4">
          {/* Left Column - Book Cover and Information */}
          <BookGeneralInformation bookData={bookData} />
          {/* Right Column - Book Available Status */}
          <div className="flex justify-center items-center xl:items-start xl:flex-shrink-0">
            <BookAvailableStatus bookData={bookData} />
          </div>
        </div>
        <Separator className="bg-foreground" />
        <AboutSection />
        <Separator className="bg-foreground" />
        <OpinionSection />
      </div>
    </>
  );
}

export default BookDetail;
