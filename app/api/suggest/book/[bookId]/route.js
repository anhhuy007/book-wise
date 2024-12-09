'use server';

import { getBookById, getYouMightLike} from "@/app/services/Services";

// return list of books that user might like
export async function GET(req, context) {
    const { params } = context;
    const { bookId } = await params;

    if (!bookId) {
        return new Response(JSON.stringify({ error: "Book ID is required" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const response = await getYouMightLike();
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}