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
        SELECT b.*, a.id as author_id
        FROM books b
        JOIN authors a ON b.authors = a.name
        WHERE b.id = ${id}`;

  return response;
}

export async function searchBooksByTitle(title) {
  const response = await sql`
        SELECT b.*, a.id as author_id
        FROM books b
        JOIN authors a ON b.authors = a.name
        WHERE b.title ILIKE ${`%${title}%`}`;

  console.log("response: ", response);
  return response;
}

export async function searchBooksByAuthor(author) {
  const response = await sql`
        SELECT b.*, a.id as author_id
        FROM books b
        JOIN authors a ON b.authors = a.name
        WHERE a.name ILIKE ${`%${author}%`}`;
  return response;
}

export async function searchBooksByCategory(category) {
  const response = await sql`
        SELECT b.*, a.id as author_id
        FROM books b
        JOIN authors a ON b.authors = a.name
        WHERE b.category ILIKE ${`%${category}%`}`;

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

export async function getUserFavouriteBooks(userId) {
  // join with books table to get book details
  const response = await sql`
    SELECT b.*
    FROM favourite_books fb
    JOIN books b ON fb.book_id = b.id
    WHERE fb.user_id = ${userId}
  `;

  return response;
}

export async function addFavouriteBook(userId, bookId) {
  const response = await sql`
    INSERT INTO favourite_books (user_id, book_id)
    VALUES (${userId}, ${bookId})
    RETURNING *
  `;

  return response;
}

export async function getFollowingAuthors(userId) {
  const response = await sql`
    SELECT a.*
    FROM following_authors fa
    JOIN authors a ON fa.author_id = a.id
    WHERE fa.user_id = ${userId}
  `;

  return response;
}

export async function addBookToFavourites(userId, bookId) {
  const response = await sql`
    INSERT INTO favourite_books (user_id, book_id)
    VALUES (${userId}, ${bookId})
    RETURNING *
  `;

  return response;
}

export async function removeBookFromFavourites(userId, bookId) {
  const response = await sql`
    DELETE FROM favourite_books
    WHERE user_id = ${userId} AND book_id = ${bookId}
    RETURNING *
  `;

  return response;
}

export async function followAuthor(userId, authorId) {
  const response = await sql`
    INSERT INTO following_authors (user_id, author_id)
    VALUES (${userId}, ${authorId})
    RETURNING *
  `;

  return response;
}

export async function unfollowAuthor(userId, authorId) {
  const response = await sql`
    DELETE FROM following_authors
    WHERE user_id = ${userId} AND author_id = ${authorId}
    RETURNING *
  `;

  return response;
}
