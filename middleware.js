/** @format */

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/client']);
// const isProtectedRoute = createRouteMatcher([
//   "/dashboard(.*)",   // protect all /dashboard routes
//   "/admin(.*)",       // protect all /admin routes
// ]);
// /client("*.")//protect all child routes

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
