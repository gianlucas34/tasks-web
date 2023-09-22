import { NextRequest, NextResponse } from 'next/server'
import { TOKEN_COOKIE } from '@/constants/cookies'

export default function middleware(request: NextRequest) {
  const user = request.cookies.get(TOKEN_COOKIE)?.value

  if (!user) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next()
    }

    const signInURL = new URL('/', request.url)

    return NextResponse.redirect(signInURL)
  }

  if (request.nextUrl.pathname === '/') {
    const homeURL = new URL('/tasks', request.url)

    return NextResponse.redirect(homeURL)
  }
}

export const config = {
  matcher: ['/', '/tasks/:path*'],
}
