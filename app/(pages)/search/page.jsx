"use client";

import React, { useState, useEffect } from "react";
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
import FilterSheet from "@/components/(book-search-result)/FilterSheet";

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
  //
  const searchParams = useSearchParams();
  const searchType = searchParams.get("type");
  const query = searchParams.get("q");
  const sort = searchParams.get("sort");

  //Filters
  const [filters, setFilters] = useState({
    category: "",
    authorName: "",
    startYear: "1900",
    endYear: new Date().getFullYear().toString(),
    ratingRange: [0, 5],
    language: "",
  });

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    console.log("Applied filters:", newFilters);
  };

  const currentPage = Number(searchParams.get("page")) || 1;
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const booksPerPage = 10;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const searchType = queryParams.get("type");
        const query = queryParams.get("q");
        const sort = queryParams.get("sort");
        const authorName = queryParams.get("authorName");
        const category = queryParams.get("category");
        const startYear = queryParams.get("startYear");
        const endYear = queryParams.get("endYear");

        const ratingRangeParam = queryParams.get("ratingRange");
        const ratingRange = ratingRangeParam
          ? ratingRangeParam.split("-").map(Number)
          : [0, 5];

        const language = queryParams.get("language");
        const currentPage = Number(queryParams.get("page")) || 1;

        const response = await fetch(
          `/api/books?type=${searchType}&q=${query}&sort=${sort}&page=${currentPage}&authorName=${authorName}&category=${category}&startYear=${startYear}&endYear=${endYear}&ratingRange=${ratingRange.join(
            ","
          )}&language=${language}`
        );
        const data = await response.json();
        setBooks(data.books);
        setTotalBooks(data.totalBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [searchType, query, sort, currentPage, filters]);

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
          -(
            <PaginationItem key="start-ellipsis">
              <PaginationEllipsis />
            </PaginationItem>
          )
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
    <>
      <div className="flex min-h-screen">
        <div className="hidden lg:block w-64 relative">
          <div className="sticky ml-4 top-[150px]">
            <Filter filters={filters} onApply={handleApplyFilters} />
          </div>
        </div>
        <div className="flex-1 flex gap-10 lg:ml-[200px]">
          <Separator orientation="vertical" className="hidden lg:block full" />
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

            <div className="block lg:hidden">
              <FilterSheet />
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
      </div>
    </>
  );
}

export default ResultPage;
