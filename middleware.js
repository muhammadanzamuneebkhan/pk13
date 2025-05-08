/** @format */

// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

const PUBLIC_PATHS = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/',
  '/api/webhooks/clerk',
];

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;
  console.log('Middleware path:', path);

  const isPublic = PUBLIC_PATHS.some((publicPath) =>
    path.startsWith(publicPath)
  );
  if (!isPublic) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
