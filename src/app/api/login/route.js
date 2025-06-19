import { supabase, setAuthCookies } from "@/lib/auth";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const csrfToken = crypto.randomBytes(32).toString("hex");
  const response = NextResponse.json({ user: data.user, csrfToken });

  setAuthCookies(response, data.session);

  response.cookies.set("csrf-token", csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return response;
}
