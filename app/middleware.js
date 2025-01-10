import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check active session
  const { data: { session } } = await supabase.auth.getSession();

  // If user is logged in and tries to access login page
  if (session && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/upload', req.url));
  }

  // If user is not logged in and tries to access protected routes
  if (!session && req.nextUrl.pathname.startsWith('/upload')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/', '/upload', '/viewer']
};
