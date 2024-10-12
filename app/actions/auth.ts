import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

export const getSessionUser = async () => {
  const session = cookies().get("session")?.value;

  if (!session) return null;

  return await adminAuth.verifySessionCookie(session, false);
};
