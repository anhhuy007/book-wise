import { getCategories } from "@/app/services/Services";
import { CategoriesGrid } from "@/components/category/CategoryList";
import PaginationControls from "@/components/ui/pagination_control";
import { Suspense } from "react";

export default async function CategoriesPage({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1;
  const {
    categories,
    totalPages,
    currentPage: page,
  } = await getCategories(currentPage);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">
        Explore Book Categories
      </h1>
      <CategoriesGrid categories={categories} />

      <Suspense fallback={<div>Loading...</div>}>
        <CategoriesGrid categories={categories} />
      </Suspense>

      <div className="mt-8 flex justify-center">
        <PaginationControls
          totalPages={totalPages}
          currentPage={page}
          baseUrl="/category"
        />
      </div>
    </div>
  );
}
