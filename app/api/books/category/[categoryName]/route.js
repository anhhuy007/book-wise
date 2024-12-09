// app/api/books/category/[categoryName]/route.js
import { getBooksByCategory } from "@/app/services/Services";

export async function GET(req, { params }) {
  try {
    const { categoryName } = params;
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

    const books = await getBooksByCategory(decodedCategoryName);

    if (!books.length) {
      return new Response(
        JSON.stringify({
          books: [],
          categoryInfo: {
            name: decodedCategoryName,
            description: "No books found in this category"
          }
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        books,
        categoryInfo: {
          name: decodedCategoryName,
          description: `Books in ${decodedCategoryName} category`
        }
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}