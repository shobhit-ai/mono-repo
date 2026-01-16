// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//     const { nextUrl } = request
//     const hostname = request.headers.get('host')

//     // Check if the current hostname indicates the admin domain
//     // You can customize this logic or use environment variables
//     // For local development, this will match 'admin.localhost:3000'
//     const isAdminDomain = hostname?.startsWith('admin.')

//     if (isAdminDomain) {
//         // Logic for Admin Domain

//         // If the user visits the root '/', redirect to '/admin'
//         if (nextUrl.pathname === '/') {
//             return NextResponse.redirect(new URL('/admin', request.url))
//         }

//         // Optional: You could restrict non-admin routes here if you have strict separation,
//         // but typically Payload's /admin is self-contained.

//     } else {
//         // Logic for Frontend Domain (e.g. localhost:3000)

//         // If the user tries to access /admin on the frontend domain, redirect to the admin domain
//         if (nextUrl.pathname.startsWith('/admin')) {
//             const url = new URL(request.url)
//             const newHost = `admin.${hostname}`
//             url.host = newHost
//             return NextResponse.redirect(url)
//         }
//     }

//     return NextResponse.next()
// }

// export const config = {
//     matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
// }


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { nextUrl } = request
    const hostname = request.headers.get('host') || ''

    const isAdminDomain = hostname.startsWith('admin.')

    if (isAdminDomain) {
      
        if (nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/admin', request.url))
        }

        return NextResponse.next()
    }

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

