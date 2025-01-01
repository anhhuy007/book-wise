'use server'

import { neon } from "@neondatabase/serverless";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getAuthCookie, setAuthCookie } from "@/app/services/auth";

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

export async function getUserProfile() {
  const token = await getAuthCookie();
  const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
  const response = await sql`
    SELECT u.username, u.email, ui.university, ui.faculty, ui.dob, ui.gender
    FROM users u
    JOIN userInfo ui ON u.id = ui.id
    WHERE u.id = ${decoded.userId}  
  `;
  
  if (response.length === 0) {
    throw new Error("User profile not found!");
  }

  return response[0];
}

export async function updateUserProfile(profileData) {
  const token = await getAuthCookie();
  const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
  
  const response = await sql`
    UPDATE userInfo 
    SET 
      gender = ${profileData.gender},
      dob = ${profileData.dob},
      university = ${profileData.school},
      faculty = ${profileData.faculty}
    WHERE id = ${decoded.userId}
    RETURNING *
  `;

  return response[0];
}

export async function signUp(email, password, username) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const response = await sql`
    WITH new_user as (
      INSERT INTO users (email, password_hash, username, avatar_url, created_at)
      VALUES (${email}, ${hashedPassword}, ${username}, 'https://github.com/shadcn.png', ${new Date()})
      RETURNING id
    )
    INSERT INTO userInfo (id)
    VALUES ((SELECT id FROM new_user))
    RETURNING id
  `;

  return response;
}

export async function login(email, password) {
  const user = await sql`
    SELECT u.id, u.email, u.password_hash
    FROM users u
    WHERE u.email = ${email}
  `;

  if (user.length === 0) {
    throw new Error('User not found');
  }

  const isValidPassword = await bcrypt.compare(password, user[0].password_hash);
  
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    { userId: user[0].id, email: user[0].email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  await setAuthCookie(token);

  return { token, user: user[0] };
}

export async function changePassword(oldPassword, newPassword) {
  const token = await getAuthCookie();
  const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
  const user = await sql`
    SELECT password_hash FROM users WHERE id = ${decoded.userId}
  `;

  const isValidPassword = await bcrypt.compare(oldPassword, user[0].password_hash);
  
  if (!isValidPassword) {
    throw new Error('Current password entered is incorrect');
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
  const response = await sql`
    UPDATE users 
    SET password_hash = ${hashedNewPassword}
    WHERE id = ${userId}
    RETURNING id
  `;

  return response;
}