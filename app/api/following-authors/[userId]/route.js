"use server";

import {
  getFollowingAuthors,
  followAuthor,
  unfollowAuthor,
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
    const response = await getFollowingAuthors(userId);
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

// POST request to follow an author
export async function POST(req, context) {
  const { params } = context;
  const { userId } = await params;
  const { authorId } = await req.json();

  if (!userId || !authorId) {
    return new Response(
      JSON.stringify({ error: "User ID and Author ID are required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await followAuthor(userId, authorId);
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

// DELETE request to unfollow an author
export async function DELETE(req, context) {
  const { params } = context;
  const { userId } = await params;
  const { authorId } = await req.json();

  if (!userId || !authorId) {
    return new Response(
      JSON.stringify({ error: "User ID and Author ID are required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await unfollowAuthor(userId, authorId);
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
