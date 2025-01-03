"use server";

import { getBookById } from "@/app/services/Services";

// return list of books that user might like
export async function GET(req, context) {
  const { params } = context;
  const { userId } = await params;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Book ID is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/recommend/colabborative",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      }
    );

    // get books detail from ids fetch from response
    const json_response = await response.json();
    const books = json_response.books;
    const bookIds = books.map((book) => book.id);

    console.log("IDs: ", bookIds);

    let result = [];
    for (let i = 0; i < bookIds.length; i++) {
      const book = await getBookById(bookIds[i]);

      if (!book[0]) {
        continue;
      }

      result.push(book[0]);
    }

    console.log("Result: ", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
