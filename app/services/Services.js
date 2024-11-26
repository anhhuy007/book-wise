import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL_DEV);

export async function getBestSeller() {
    const response = await sql`
        SELECT * FROM books
        ORDER BY avg_rating DESC
        LIMIT 20
    `;

    return response;
}

export async function getYouMightLike() {
    const response = await sql`
        SELECT * FROM books
        ORDER BY RANDOM()
        LIMIT 20
    `;

    return response;
}

export async function getPeopleAlsoViewed() {
    const response = await sql`
        SELECT * FROM books
        ORDER BY RANDOM()
        LIMIT 20
    `;

    return response;
}

export async function getBookById(id) {
    const response = await sql`
        SELECT * FROM books
        WHERE id = ${id}
    `;

    return response;
}

export async function searchBooksByTitle(title) {
    const response = await sql`
        SELECT * FROM books
        WHERE title ILIKE ${`%${title}%`}
    `;

    return response;
}

export async function searchBooksByAuthor(author) {
    const response = await sql`
        SELECT * FROM books
        WHERE authors ILIKE ${`%${author}%`}
    `;

    return response;
}

export async function searchBooksByCategory(category) {
    const response = await sql`
        SELECT * FROM books
        WHERE category ILIKE ${`%${category}%`}
    `;

    return response;
}
