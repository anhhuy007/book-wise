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

export async function getCategories(page = 1, limit = 8) {
  const offset = (page - 1) * limit;

  const categories = await sql`
    SELECT 
      c.*,
      COUNT(b.id) as total_books
    FROM categories c
    LEFT JOIN books b ON c.name = b.category
    GROUP BY c.name, c.description, c.view_count
    ORDER BY total_books DESC
    LIMIT ${limit} 
    OFFSET ${offset}
  `;

  const totalCount = await sql`
    SELECT COUNT(*) as count FROM categories
  `;

  return {
    categories,
    totalPages: Math.ceil(totalCount[0].count / limit),
    currentPage: page,
  };
}

// app/services/Services.js
export async function getBooksByCategory(categoryName, page = 1, limit = 12) {
  const offset = (page - 1) * limit;

  const books = await sql`
    SELECT b.*, c.name as category_name, c.description as category_description 
    FROM books b
    JOIN categories c ON b.category = c.name
    WHERE c.name = ${categoryName}
    ORDER BY b.avg_rating DESC
    LIMIT ${limit} 
    OFFSET ${offset}
  `;

  const totalCount = await sql`
    SELECT COUNT(*) as count 
    FROM books b
    JOIN categories c ON b.category = c.name
    WHERE c.name = ${categoryName}
  `;

  return {
    books,
    totalPages: Math.ceil(totalCount[0].count / limit),
    currentPage: page,
  };
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

export async function getAuthors(page = 1, limit = 72) {
  const offset = (page - 1) * limit;

  const authors = await sql`
    SELECT * FROM authors
    ORDER BY name
    LIMIT ${limit} 
    OFFSET ${offset}
  `;

  const totalCount = await sql`
    SELECT COUNT(*) as count FROM authors
  `;

  return {
    authors,
    totalPages: Math.ceil(totalCount[0].count / limit),
    currentPage: page,
  };
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
