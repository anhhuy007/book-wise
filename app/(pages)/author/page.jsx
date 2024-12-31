import { getAuthors } from "@/app/services/Services";
import { AuthorGrid } from "@/components/author/AuthorList";
import PaginationControls from "@/components/ui/pagination_control";
import { Suspense } from "react";

export default async function AuthorsPage({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1;
  const {
    authors,
    totalPages,
    currentPage: page,
  } = await getAuthors(currentPage);

  return (
    <div className="mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">
        Explore Popular Authors
      </h1>

      <Suspense fallback={<div>Loading...</div>}>
        <AuthorGrid authors={authors} />
      </Suspense>

      <div className="mt-8 flex justify-center">
        <PaginationControls
          totalPages={totalPages}
          currentPage={page}
          baseUrl="/author"
        />
      </div>
    </div>
  );
}
