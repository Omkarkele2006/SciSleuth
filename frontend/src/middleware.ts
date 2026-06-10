import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/diagnostic",
  "/results",
  "/graph",
  "/mission",
  "/recover",
  "/teacher",
];

export function middleware(
  request: NextRequest
) {
  const accessToken =
    request.cookies.get(
      "sb-access-token"
    );

  const pathname =
    request.nextUrl.pathname;

  const isProtected =
    protectedRoutes.some(
      (route) =>
        pathname.startsWith(route)
    );

  if (
    isProtected &&
    !accessToken
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/diagnostic/:path*",
    "/results/:path*",
    "/graph/:path*",
    "/mission/:path*",
    "/recover/:path*",
    "/teacher/:path*",
  ],
};