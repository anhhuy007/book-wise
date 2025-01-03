"use client";

import { useState } from "react";
import useSWR from "swr";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCarousel from "@/components/(home-page)/BookCarousel";
import BookCard from "@/components/(home-page)/BookCard";

const fetcher = async (url, query) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, top_k: 12 }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);

  const {
    data: books,
    error,
    isValidating,
  } = useSWR(
    searchQuery ? ["http://127.0.0.1:8000/search", searchQuery] : null,
    ([url, query]) => fetcher(url, query),
    {
      revalidateOnFocus: false,
    }
  );

  const handleSearch = () => {
    if (query.trim()) {
      setSearchQuery(query);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-4 w-full">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Tìm kiếm sách
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nhập mô tả về cuốn sách bạn muốn tìm kiếm tại đây. Chúng tôi sẽ giúp bạn tìm ra cuốn sách phù hợp nhất (lưu ý: hiện tại chỉ hỗ trợ tiếng Anh).
            </p>
          </div>

          <div className="w-full max-w-3xl">
            <div className="relative rounded-xl shadow-lg">
              <Input
                type="search"
                placeholder="Try 'science fiction novels about time travel' or 'heartwarming romance in Paris'..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full h-16 pl-6 pr-40 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <div className="absolute right-2 top-2">
                <Button
                  onClick={handleSearch}
                  disabled={isValidating}
                  className="h-12 px-6 text-base font-medium rounded-lg"
                >
                  <Search className="w-5 h-5 mr-2" />
                  {isValidating ? "Đang tìm kiếm..." : "Tìm kiếm"}
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuery("bestselling fiction 2024")}
              >
                Bestsellers
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuery("award winning novels")}
              >
                Award Winners
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuery("recommended for book clubs")}
              >
                Book Club Picks
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          {isValidating && (
            <div className="flex justify-center items-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
          )}
          {error && (
            <p className="text-center text-red-500 text-lg">
              Failed to fetch books: {error.message}
            </p>
          )}
          {books?.length > 0 && !isValidating && (
            <section className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
          )}
          {!books?.length && !isValidating && (
            <p className="text-center text-gray-500 text-lg">
              No results found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
