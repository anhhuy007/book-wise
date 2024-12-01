"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Filter from "@/components/(book-search-result)/Filter";
import FilterSheet from "@/components/(book-search-result)/FilterSheet";
import Sort from "@/components/(book-search-result)/Sort";
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

const authorData = {
  name: "James Clear",
  img_url:
    "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
  bio: "James Clear is an author, speaker, and expert on habits, decision-making, and continuous improvement. He is the author of the New York Times bestseller, Atomic Habits.",
  book_count: 2,
  books: [
    {
      id: "1",
      title: "Atomic Habits",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.8,
      published_date: "2018-10-16T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 158432,
      authors: "James Clear",
    },
    {
      id: "2",
      title: "The Alchemist",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.5,
      published_date: "2018-10-16T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 158432,
      authors: "James Clear",
    },
  ],
};

function AuthorDetail({ params }) {
  const { authorId } = React.use(params);
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "rating");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  // const { authorId } = React.use(params);
  // const { data, error, isLoading } = useSWR(
  //   `/api/authors/${authorId}`,
  //   fetcher
  // );

  const data = authorData.books;
  const [filters, setFilters] = useState({
    category: "",
    authorName: `${authorData.name}`,
    startYear: "1900",
    endYear: new Date().getFullYear().toString(),
    ratingRange: [0, 5],
    languae: "",
  });

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  useEffect(() => {
    setSort(searchParams.get("sort") || "rating");
    console.log("Sort type changed: ", sort);
  }, [searchParams]);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error</div>;

  const totalBooks = data.length;
  const booksPerPage = 5;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const handleApplyFilters = (filters) => {
    setFilters(filters);
  };

  const renderPaginationItems = () => {
    const items = [];
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
            <PaginationLink href={`?page=${i}`} isActive={currentPage === i}>
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

  const sortedData = [...data].sort((a, b) => {
    if (sort === "rating") {
      return b.avg_rating - a.avg_rating;
    } else if (sort === "date-up") {
      return a.published_date - b.published_date;
    } else if (sort === "date-down") {
      return b.published_date - a.published_date;
    } else if (sort === "a-to-z") {
      return a.title.localeCompare(b.title);
    } else if (sort === "z-to-a") {
      return b.title.localeCompare(a.title);
    }
  });

  const startResult = (currentPage - 1) * booksPerPage + 1;
  const endResult = Math.min(currentPage * booksPerPage, totalBooks);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  return (
    <>
      <div className="flex min-h-screen">
        <div className="hidden lg:block w-64 relative">
          <div className="sticky ml-4 top-[150px]">
            <Filter
              filters={filters}
              onApply={handleApplyFilters}
              disabledFields={{ author: true }}
            />
          </div>
        </div>
        <div className="flex-1 flex gap-10 lg:ml-[200px]">
          <Separator orientation="vertical" className="hidden lg:block full" />
          <div className="flex-1 flex flex-col px-6 lg:pr-12 xl:pr-20 gap-8 md:gap-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-2xl">
                Tác giả:{" "}
                <span className="font-extrabold">{authorData.name}</span>
              </h1>
              <div className="flex gap-3 items-center">
                <span className="text-lg text-muted-foreground">Sắp xếp:</span>
                <Sort />
              </div>
            </div>

            <div className="text-lg text-muted-foreground">
              Hiển thị từ {startResult} đến {endResult} của tổng {totalBooks}{" "}
              kết quả
            </div>

            <div className="block lg:hidden">
              <FilterSheet
                filters={filters}
                onApply={handleApplyFilters}
                disabledFields={{ author: true }}
              />
            </div>

            <Separator className="bg-foreground" />

            <div className="flex flex-col gap-6 md:gap-10">
              {paginatedData.map((book) => (
                <React.Fragment key={book.id}>
                  <BookSearchResult bookData={book} />
                  <Separator className="bg-foreground" />
                </React.Fragment>
              ))}
              ;
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`?page=${Math.max(1, currentPage - 1)}`}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    href={`?page=${Math.min(totalPages, currentPage + 1)}`}
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

export default AuthorDetail;
