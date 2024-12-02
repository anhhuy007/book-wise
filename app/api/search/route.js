import {
  searchBooksByAuthor,
  searchBooksByCategory,
  searchBooksByTitle,
} from "@/app/services/Services";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const q = searchParams.get("q");

  if (!type || !q) {
    return new Response(
      JSON.stringify({
        message: "Missing query parameters.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  let response;
  switch (type) {
    case "book":
      response = await searchBooksByTitle(q);
      break;
    case "author":
      response = await searchBooksByAuthor(q);
      break;
    case "category":
      response = await searchBooksByCategory(q);
      break;
    default:
      return new Response(
        JSON.stringify({
          message: "Invalid search type.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  }

  console.log("Total items: ", response.length);

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
