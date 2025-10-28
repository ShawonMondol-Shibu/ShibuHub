import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const hasToken = cookieStore.get('token')?.value;

  const { pathname } = request.nextUrl

  // যদি লগইন করা থাকে এবং products ছাড়া অন্য পেজে আসে, তাহলে /products এ রিডিরেক্ট করো
  if (hasToken && pathname === '/login') {
    return NextResponse.redirect(new URL('/products', request.url))
  }

  // যদি টোকেন না থাকে, তাহলে শুধু products পেজ ব্লক করো
  if (!hasToken && pathname.startsWith('/product')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/products', '/products/:path*', '/profile'],
}
