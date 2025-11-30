import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes that require authentication
const protectedRoutes = ['/dashboard']
const authRoutes = ['/auth/login', '/auth/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if user has auth token (stored in cookies)
  const token = request.cookies.get('auth-token')?.value
  const isAuthenticated = !!token

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // For demo purposes, we allow access to all routes
  // In production, uncomment below to protect routes:
  
  // if (!isAuthenticated && protectedRoutes.some((route) => pathname.startsWith(route))) {
  //   return NextResponse.redirect(new URL('/auth/login', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
