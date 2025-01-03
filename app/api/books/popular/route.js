'use server';

import { getBookById } from "@/app/services/Services";

// return list of books that user might like
export async function GET(req, res) {
    try {
        const response = await fetch("http://127.0.0.1:8000/popular_books", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // get books detail from ids fetch from response
        const json_response = await response.json();
        const books = json_response.books;
        const bookIds = books.map((book) => book.id);

        let result = [];
        for (let i = 0; i < bookIds.length; i++) {
            const book = await getBookById(bookIds[i]);

            if (!book[0]) {
                continue;
            }

            result.push(book[0]);
        }

        return new Response(JSON.stringify(result), {
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