import { type NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = !!req.cookies.get("next-auth.session-token");

  console.log("Test Middleware", path, session, req.url);

  if (!session) {
    return NextResponse.redirect(
      new URL(`/auth/signin?callbackUrl=${path}&error=Unauthenticated`, req.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  // matcher: ["/profile"],
  matcher: [
    "/((?!auth|svg|images|api|_next/static|_next/image|favicon.ico|en).*)",
    "/",
  ],
  // matcher: ["/((?!auth|svg|images|api).*)"],
};
