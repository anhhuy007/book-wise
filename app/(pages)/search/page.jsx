"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { BookSearchResult } from "@/components/(book)/BookGeneralInformation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import Sort from "@/components/(book-search-result)/Sort";
import Filter from "@/components/(book-search-result)/Filter";

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

function ResultPage() {
  const searchParams = useSearchParams();
  const searchType = searchParams.get("type");
  const query = searchParams.get("q");
  const sort = searchParams.get("sort");
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalBooks = 100;
  const booksPerPage = 10;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    const ellipsisThreshold = 3;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - ellipsisThreshold &&
          i <= currentPage + ellipsisThreshold)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={`?type=${searchType}&q=${query}&sort=${sort}&page=${i}`}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === 2 && currentPage > ellipsisThreshold + 1) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      } else if (
        i === totalPages - 1 &&
        currentPage < totalPages - ellipsisThreshold
      ) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    return items;
  };

  const startResult = (currentPage - 1) * booksPerPage + 1;
  const endResult = Math.min(currentPage * booksPerPage, totalBooks);

  return (
    <div className="flex relative gap-10">
      <Filter />
      <Separator orientation="vertical" className="hidden md:block h-[300vh]" />
      <div className="flex-1 flex flex-col px-6 lg:pr-12 xl:pr-20 gap-8 md:gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl">
            Keyword Search: <span className="font-extrabold">{query}</span>
          </h1>
          <Sort />
        </div>

        <div className="text-lg text-muted-foreground">
          Showing {startResult} to {endResult} of {totalBooks} results
        </div>

        <Separator className="bg-foreground" />

        <div className="flex flex-col gap-6 md:gap-10">
          {Array.from({
            length: Math.min(booksPerPage, endResult - startResult + 1),
          }).map((_, index) => (
            <React.Fragment key={index}>
              <BookSearchResult bookData={bookData} />
              {index < Math.min(booksPerPage, endResult - startResult) && (
                <Separator className="bg-foreground" />
              )}
            </React.Fragment>
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?type=${searchType}&q=${query}&sort=${sort}&page=${Math.max(
                  1,
                  currentPage - 1
                )}`}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {renderPaginationItems()}
            <PaginationItem>
              <PaginationNext
                href={`?type=${searchType}&q=${query}&sort=${sort}&page=${Math.min(
                  totalPages,
                  currentPage + 1
                )}`}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default ResultPage;
