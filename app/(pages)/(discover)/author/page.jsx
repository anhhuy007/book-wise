"use client";

import { useState, useEffect, useCallback } from "react";
import AuthorList from "@/components/(author)/AuthorList";
import { Button } from "@/components/ui/button";

function Authors() {
  const [authorsComponents, setAuthorsComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [excludeAuthors, setExcludeAuthors] = useState([]);

  useEffect(() => {
    const loadInitialAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/authors", {
          method: "POST",
          body: JSON.stringify({ excludeAuthors }),
        });

        const newAuthors = await response.json();
        setAuthorsComponents([
          <AuthorList key={Date.now()} authors={newAuthors} />,
        ]);
        setExcludeAuthors((prev) => [
          ...prev,
          ...newAuthors.map((author) => author.author),
        ]);
      } catch (error) {
        console.error("Failed to load authors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialAuthors();
  }, []);

  const handleLoadMore = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/authors", {
        method: "POST",
        body: JSON.stringify({
          excludeAuthors,
        }),
      });

      const newAuthors = await response.json();
      setAuthorsComponents((prevComponents) => [
        ...prevComponents,
        <AuthorList key={Date.now()} authors={newAuthors} />,
      ]);

      setExcludeAuthors((prev) => [
        ...prev,
        ...newAuthors.map((author) => author.author),
      ]);
    } catch (error) {
      console.error("Failed to load more authors:", error);
    } finally {
      setIsLoading(false);
    }
  }, [excludeAuthors]);

  return (
    <div className="container mx-auto px-4">
      {authorsComponents}

      <div className="flex justify-center mt-8">
        <Button
          onClick={handleLoadMore}
          disabled={isLoading}
          className={`text-xl p-8 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Tải thêm
          {isLoading ? "Đang tải..." : ""}
        </Button>
      </div>
    </div>
  );
}

export default Authors;
