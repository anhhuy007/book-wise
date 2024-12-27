import { neon } from "@neondatabase/serverless";

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

export async function getCategories() {
  const response = await sql`
        SELECT * FROM categories
    `;

  return response;
}

// app/services/Services.js
export async function getBooksByCategory(categoryName) {
  const response = await sql`
    SELECT b.*, c.name as category_name, c.description as category_description 
    FROM books b
    JOIN categories c ON b.category = c.name
    WHERE c.name = ${categoryName}
    ORDER BY b.avg_rating DESC
  `;

  console.log("Books by Category: ", categoryName);

  return response;
}

export async function getBooksByAuthor(authorId) {
  const response = await sql`
    SELECT b.*
    FROM books b
    JOIN authors a ON b.authors = a.name
    WHERE a.id = ${authorId}
    ORDER BY b.avg_rating DESC
  `;

  console.log("Books by Author: ", authorId);

  return response;
}

export async function getAuthorById(authorId) {
  const response = await sql`
    SELECT * FROM authors
    WHERE id = ${authorId}
  `;
  return response[0];
}

export async function getAuthors() {
  const response = await sql`
        SELECT * FROM authors
    `;

  return response;
}
