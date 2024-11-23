"use server";

import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 dager

export const setCookie = async (name: string, value: string) => {
  (await cookies()).set({
    name: name,
    value: value,
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  });
};

export const setAuthCookie = async (idToken: string) => {
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn,
  });

  setCookie("session", sessionCookie);
};
