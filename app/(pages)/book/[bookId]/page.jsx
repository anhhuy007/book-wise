"use client";

import React from "react";
import useSWR from "swr";
import BookGeneralInformation from "@/components/(book)/BookGeneralInformation";
import { Separator } from "@/components/ui/separator";
import BookCarousel from "@/components/(home-page)/BookCarousel";
import LoadingAnimation from "@/components/ui/loading";
import AboutSection from "@/components/(book)/AboutSection";
import { useRouter } from "next/router";
import OpinionSection from "@/components/(book)/OpinionSection";

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
    <>
      <div className="flex flex-col xl:mx-48 gap-20">
        <BookGeneralInformation bookData={bookData} />
        <Separator className="bg-foreground mt-10" />
        <div className="-mx-48">
          <h2 className="mx-20 text-2xl font-bold">Bạn cũng có thể thích</h2>
          <BookCarousel book_data={youMightLikeData} />
        </div>
        {/* <Separator className="bg-foreground" />
        <AboutSection />
        <Separator className="bg-foreground" />
        <OpinionSection /> */}
      </div>
    </>
  );
}

export default BookDetail;
