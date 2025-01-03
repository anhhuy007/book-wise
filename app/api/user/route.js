'use server';

import { getUserProfile } from "@/app/services/Services";
import { NextResponse } from "next/server";
import { signUp, login, changePassword } from "@/app/services/Services";

// return list of books that user might like
export default async function GET(req, context) {
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

export async function POST(request) {
  const { action, ...data } = await request.json();

  try {
    switch (action) {
      case 'signup':
        const signupResult = await signUp(data.email, data.password, data.username);
        return NextResponse.json(signupResult);

      case 'login':
        const loginResult = await login(data.email, data.password);
        return NextResponse.json(loginResult);

      case 'changePassword':
        const changePasswordResult = await changePassword(data.oldPassword, data.newPassword);
        return NextResponse.json(changePasswordResult);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
