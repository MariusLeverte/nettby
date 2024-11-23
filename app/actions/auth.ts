import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

export const getSessionUser = async () => {
  const session = (await cookies()).get("session")?.value;

  if (!session) return null;

  try {
    const user = await adminAuth.verifySessionCookie(session, false);
    return user;
  } catch (err) {
    console.error(err);
  }
};
