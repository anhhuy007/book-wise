"use server";

import {
  getUserFavouriteBooks,
  addBookToFavourites,
  removeBookFromFavourites,
} from "@/app/services/Services";

export async function GET(req, context) {
  const { params } = context;
  const { userId } = await params;

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const response = await getUserFavouriteBooks(userId);
    return new Response(JSON.stringify(response), {
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

// POST request to add a book to favourites
export async function POST(req, context) {
  const { userId } = context.params;
  const { bookId } = await req.json();

  if (!userId || !bookId) {
    return new Response(
      JSON.stringify({ error: "User ID and Book ID are required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await addBookToFavourites(userId, bookId);
    return new Response(JSON.stringify(response), {
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

// DELETE request to remove a book from favourites
export async function DELETE(req, context) {
  const { userId } = context.params;
  const { bookId } = await req.json();

  if (!userId || !bookId) {
    return new Response(
      JSON.stringify({ error: "User ID and Book ID are required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await removeBookFromFavourites(userId, bookId);
    return new Response(JSON.stringify(response), {
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
