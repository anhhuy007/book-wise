import { getBooksByCategory } from "@/app/services/Services";

export async function GET(req, { params }) {
  try {
    const { categoryName } = params;
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const decodedCategoryName = decodeURIComponent(categoryName);

    if (!categoryName) {
      return new Response(
        JSON.stringify({ error: "Category name is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { books, totalPages, currentPage } = await getBooksByCategory(decodedCategoryName, page);

    if (!books.length) {
      return new Response(
        JSON.stringify({
          books: [],
          categoryInfo: {
            name: decodedCategoryName,
            description: "No books found in this category",
          },
          pagination: { currentPage: 1, totalPages: 1 }
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        books,
        categoryInfo: {
          name: decodedCategoryName,
          description: `Books in ${decodedCategoryName} category`
        },
        pagination: { currentPage, totalPages }
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}