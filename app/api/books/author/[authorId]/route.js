import { getBooksByAuthor, getAuthorById } from "@/app/services/Services";

export async function GET(req, { params }) {
  try {
    const { authorId } = params;
    console.log("Author ID: ", authorId);

    if (!authorId) {
      return new Response(JSON.stringify({ error: "Author ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const books = await getBooksByAuthor(authorId);

    const authorInfo = await getAuthorById(authorId);

    if (!books.length) {
      return new Response(
        JSON.stringify({
          books: [],
          authorInfo: {
            authorId,
            name: authorInfo.name,
            description: authorInfo.description,
            view_count: authorInfo.view_count,
            avatar_url: authorInfo.avatar_url,
          },
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
        authorInfo: {
          authorId,
          name: authorInfo.name,
          description: authorInfo.description,
          view_count: authorInfo.view_count,
          avatar_url: authorInfo.avatar_url,
        },
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
