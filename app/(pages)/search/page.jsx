"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { BookSearchResult } from "@/components/(book)/BookGeneralInformation";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

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

function ResultPage() {
  //
  const searchParams = useSearchParams();
  const searchType = searchParams.get("type");
  const query = searchParams.get("q");
  const [sort, setSort] = useState(searchParams.get("sort") || "rating");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [filters, setFilters] = useState({
    category: "",
    authorName: "",
    startYear: "1900",
    endYear: new Date().getFullYear().toString(),
    ratingRange: [0, 5],
    language: "",
  });

  const { data, error, isLoading } = useSWR(
    `/api/search?type=${searchType}&q=${query}`,
    fetcher
  );

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  useEffect(() => {
    setSort(searchParams.get("sort") || "rating");
    console.log("Sort type changed: ", sort);
  }, [searchParams]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

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
            <Filter filters={filters} onApply={handleApplyFilters} />
          </div>
        </div>
        <div className="flex-1 flex gap-10 lg:ml-[200px]">
          <Separator orientation="vertical" className="hidden lg:block full" />
          <div className="flex-1 flex flex-col px-6 lg:pr-12 xl:pr-20 gap-8 md:gap-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-2xl">
                Từ khóa tìm kiếm:{" "}
                <span className="font-extrabold">{query}</span>
              </h1>
              <div className="flex gap-3 items-center">
                <span className="text-lg text-muted-foreground">Sắp xếp:</span>
                <Sort />
              </div>
            </div>
            <div className="text-lg text-muted-foreground">
              {totalBooks === 0 ? (
                <>
                  <span>Không có kết quả nào</span>
                  <br />
                  <span>Hãy thử tìm kiếm bằng từ khóa khác</span>
                </>
              ) : (
                <span>
                  Hiển thị từ {startResult} đến {endResult} của tổng{" "}
                  {totalBooks} kết quả.
                </span>
              )}
            </div>

            <div className="block lg:hidden">
              <FilterSheet filters={filters} onApply={handleApplyFilters} />
            </div>

            <Separator className="bg-foreground" />

            <div className="flex flex-col gap-6 md:gap-10">
              {paginatedData.map((book) => (
                <React.Fragment key={book.id}>
                  <BookSearchResult bookData={book} />
                  <Separator className="bg-foreground" />
                </React.Fragment>
              ))}
            </div>

            {totalBooks > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultPage;
