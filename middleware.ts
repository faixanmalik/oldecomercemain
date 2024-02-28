import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const authRoutes = ["/login", "/api/login"];
  //
  // const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);
  // const isProtectedRoute = !isAuthRoute
  //
  // const cookie = request.cookies.get("x-access-token");
  //
  // if (isAuthRoute && cookie) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  // if ((!cookie || !cookie.value) && isProtectedRoute) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // if ((!cookie || !cookie.value) && isAuthRoute) {
  //   return NextResponse.next();
  // }
  //
  // const credentials = cookie && JSON.parse(cookie.value);
  //
  // if (credentials && credentials.email !== process.env.ROOT_EMAIL) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // if (credentials && credentials.password !== process.env.ROOT_PASSWORD) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  //
  // return NextResponse.next();
}
