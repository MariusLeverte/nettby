import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  //Return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //Call the authentication endpoint
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();

  return response;
}

// Add your protected routes, excluding "/" and "/sign-up"
export const config = {
  matcher: ["/((?!sign-up|api|$).*)"],
};
