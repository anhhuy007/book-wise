"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import BookCard from "@/components/(home-page)/BookCard";
import LoadingAnimation from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function BooksByCategory() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { categoryName } = params;
  const page = Number(searchParams.get('page')) || 1;

  const { data, error, isLoading } = useSWR(
    `/api/books/category/${encodeURIComponent(categoryName)}?page=${page}`,
    fetcher
  );

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Failed to load books. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  const { books, categoryInfo, pagination } = data || {};
  const { currentPage, totalPages } = pagination || {};

  const handlePageChange = (newPage) => {
    router.push(`/category/${categoryName}?page=${newPage}`);
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{categoryInfo?.name || categoryName}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {categoryInfo?.description}
        </p>
      </div>

      <section className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books?.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <div className="flex justify-center gap-2 mt-8">
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === currentPage ? "default" : "outline"}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </Button>
        ))}

        <Button
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}