'use server';

import { getUserFavouriteBooks } from "@/app/services/Services";

export async function GET(req, context) {
    const { params } = context;
    const { userId } = await params;

    if (!userId) {
        return new Response(JSON.stringify({ error: "User ID is required" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const response = await getUserFavouriteBooks(userId);
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