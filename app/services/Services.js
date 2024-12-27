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