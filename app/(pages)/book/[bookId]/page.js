"use client";

import React from "react";
import BookAvailableStatus from "@/components/(book)/BookAvailableStatus";
import BookGeneralInformation from "@/components/(book)/BookGeneralInformation";
import { Separator } from "@/components/ui/separator";
import AboutSection from "@/components/(book)/AboutSection";
import OpinionSection from "@/components/(book)/OpinionSection";

const bookData = {
  created_at: "2024-11-02T18:33:58.986Z",
  title: "Atomic Habits",
  img_url:
    "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
  author: "James Clear",
  published_year: "2018-10-16T00:00:00.000Z",
  category: "Self-Development",
  avg_rating: 4.8,
  rating_count: 158432,
  description:
    "A revolutionary system to get 1% better every day. Learn how tiny changes can lead to remarkable results in this practical guide to habit formation and behavior change.",
  id: "2",
};

function BookDetail({ params }) {
  const { bookId } = React.use(params);

  return (
    <>
      <div className="flex flex-col p-2 xl:p-20 xl:pr-40 gap-20">
        <div className="flex flex-col xl:flex-row justify-between w-full space-x-4">
          {/* Left Column - Book Cover and Information */}
          <BookGeneralInformation bookData={bookData} />
          {/* Right Column - Book Available Status */}
          <div className="mx-auto xl:flex-shrink-0">
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
