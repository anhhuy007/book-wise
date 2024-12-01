"use client";

import React, { useState, useEffect } from "react";
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

const categoryData = {
  name: "Self-Development",
  description:
    "Self-Development books help individuals improve their personal skills, mindset, and overall lifestyle.",
  book_count: 23,
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
      authors: "Paulo Coelho",
    },
    {
      id: "3",
      title: "The Power of Now",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.6,
      published_date: "1997-06-01T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 81234,
      authors: "Eckhart Tolle",
    },
    {
      id: "4",
      title: "The Subtle Art of Not Giving a F*ck",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.3,
      published_date: "2016-09-13T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 61234,
      authors: "Mark Manson",
    },
    {
      id: "5",
      title: "You Are a Badass",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.5,
      published_date: "2013-04-23T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 45321,
      authors: "Jen Sincero",
    },
    {
      id: "6",
      title: "Daring Greatly",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.7,
      published_date: "2012-09-11T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 78456,
      authors: "Brené Brown",
    },
    {
      id: "7",
      title: "Grit",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.6,
      published_date: "2016-12-06T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 67543,
      authors: "Angela Duckworth",
    },
    {
      id: "8",
      title: "Big Magic",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.4,
      published_date: "2015-09-22T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 54023,
      authors: "Elizabeth Gilbert",
    },
    {
      id: "9",
      title: "The Four Agreements",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.7,
      published_date: "1997-01-01T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 36547,
      authors: "Don Miguel Ruiz",
    },
    {
      id: "10",
      title: "The Gifts of Imperfection",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.5,
      published_date: "2010-09-15T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 23456,
      authors: "Brené Brown",
    },
    {
      id: "11",
      title: "Awaken the Giant Within",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.6,
      published_date: "1991-02-01T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 32456,
      authors: "Tony Robbins",
    },
    {
      id: "12",
      title: "The 7 Habits of Highly Effective People",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.7,
      published_date: "1989-08-15T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 42356,
      authors: "Stephen Covey",
    },
    {
      id: "13",
      title: "Drive",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.5,
      published_date: "2009-12-29T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 65432,
      authors: "Daniel H. Pink",
    },
    {
      id: "14",
      title: "Mindset",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.8,
      published_date: "2006-02-01T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 73456,
      authors: "Carol S. Dweck",
    },
    {
      id: "15",
      title: "The Power of Habit",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.7,
      published_date: "2012-02-01T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 82345,
      authors: "Charles Duhigg",
    },
    {
      id: "16",
      title: "Start with Why",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.6,
      published_date: "2009-09-09T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 54321,
      authors: "Simon Sinek",
    },
    {
      id: "17",
      title: "Tools of Titans",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.6,
      published_date: "2016-12-06T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 67891,
      authors: "Tim Ferriss",
    },
    {
      id: "18",
      title: "The 5 AM Club",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.4,
      published_date: "2018-12-04T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 43212,
      authors: "Robin Sharma",
    },
    {
      id: "19",
      title: "Atomic Habits Workbook",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.5,
      published_date: "2020-10-13T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 21432,
      authors: "James Clear",
    },
    {
      id: "20",
      title: "The Power of Positive Thinking",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.4,
      published_date: "1952-10-01T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 12345,
      authors: "Norman Vincent Peale",
    },
    {
      id: "21",
      title: "How to Win Friends and Influence People",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.8,
      published_date: "1936-10-01T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 54321,
      authors: "Dale Carnegie",
    },
    {
      id: "22",
      title: "The Miracle Morning",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.6,
      published_date: "2012-12-14T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 23456,
      authors: "Hal Elrod",
    },
    {
      id: "23",
      title: "The Psychology of Achievement",
      img_url:
        "https://image.slidesharecdn.com/nhagiakim-161103070024/95/nh-gi-kim-the-alchemist-1-638.jpg?cb=1478156544",
      avg_rating: 4.7,
      published_date: "1985-10-01T00:00:00.000Z",
      category: "Self-Development",
      rating_count: 65321,
      authors: "Brian Tracy",
    },
  ],
};

function CategoryDetail({ params }) {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "rating");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  // const { categoryId } = React.use(params);
  // const { data, error, isLoading } = useSWR(`/api/categories/${categoryId}`, fetcher);

  const data = categoryData.books;
  const [filters, setFilters] = useState({
    category: `${categoryData.name}`,
    startYear: "1900",
    endYear: new Date().getFullYear().toString(),
    ratingRange: [0, 5],
    language: "",
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
              disabledFields={{ category: true }}
            />
          </div>
        </div>
        <div className="flex-1 flex gap-10 lg:ml-[200px]">
          <Separator orientation="vertical" className="hidden lg:block full" />
          <div className="flex-1 flex flex-col px-6 lg:pr-12 xl:pr-20 gap-8 md:gap-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-2xl">
                Thể loại:{" "}
                <span className="font-extrabold">{categoryData.name}</span>
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
                disabledFields={{ category: true }}
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

export default CategoryDetail;
