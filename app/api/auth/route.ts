import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { setAuthCookie } from "@/app/actions/cookie";
import { getUserInfo } from "@/app/actions/firestore";

export async function GET() {
  const session = (await cookies()).get("session")?.value || "";
  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  //Use Firebase Admin to validate the session cookie
  const decodedClaims = await adminAuth.verifySessionCookie(session, false);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}

export async function POST() {
  const authorization = (await headers()).get("Authorization");

  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];

    const decodedToken = await adminAuth.verifyIdToken(idToken);

    if (decodedToken) {
      await setAuthCookie(idToken);

      const user = await getUserInfo(decodedToken.uid);
      return NextResponse.json({ slug: user.slug }, { status: 200 });
    }
  }

  return NextResponse.json({}, { status: 200 });
}
