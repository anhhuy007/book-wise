"use client";

import { useState, useCallback } from "react";
import CategoryList from "@/components/(category)/CategoryList";
import { Button } from "@/components/ui/button";

function Category() {
  const [categoriesComponents, setCategoriesComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({
          excludeCategories: categoriesComponents.flatMap(
            (comp) => comp.props.previousCategories
          ),
        }),
      });

      const newCategories = await response.json();

      setCategoriesComponents((prevComponents) => [
        ...prevComponents,
        <CategoryList key={Date.now()} categories={newCategories} />,
      ]);
    } catch (error) {
      console.error("Failed to load more categories:", error);
    } finally {
      setIsLoading(false);
    }
  }, [categoriesComponents]);

  return (
    <div className="container mx-auto px-4">
      {categoriesComponents}

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

export default Category;
