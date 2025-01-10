import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('sb-access-token');

  if (!token && req.nextUrl.pathname.startsWith('/upload')) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/upload', '/viewer'],
};
