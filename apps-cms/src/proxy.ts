import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
    const { nextUrl } = request
    const hostname = request.headers.get('host') || ''

    const isAdminDomain = hostname.startsWith('admin.')

    // ----- ADMIN DOMAIN LOGIC -----
    if (isAdminDomain) {
        if (nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/admin', request.url))
        }

        return NextResponse.next()
    }

    // ----- FRONTEND DOMAIN TRYING TO ACCESS /admin -----
    if (nextUrl.pathname.startsWith('/admin')) {
        const url = new URL(request.url)

        const [baseHost, port] = hostname.split(':')

        url.host = `admin.${baseHost}${port ? `:${port}` : ''}`

        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next|static|favicon.ico).*)'],
}
