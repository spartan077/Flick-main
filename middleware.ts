import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes
  if (
    !session &&
    (req.nextUrl.pathname.startsWith('/record') ||
      req.nextUrl.pathname.startsWith('/messages') ||
      req.nextUrl.pathname.startsWith('/dashboard'))
  ) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // Redirect to dashboard if logged in and trying to access auth page
  if (session && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}