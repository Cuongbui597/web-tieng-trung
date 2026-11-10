import { NextResponse } from 'next/server';

export const config = {
    matcher: ['/admin/:path*', '/api/products/:path*'],
};

export function middleware(request) {
    const basicAuth = request.headers.get('authorization');

    if (basicAuth) {
        const auth = basicAuth.split(' ')[1];
        const [user, pwd] = atob(auth).split(':');

        // Default credentials: admin / admin123
        // You can change this or use environment variables
        if (user === 'admin' && pwd === 'admin123') {
            return NextResponse.next();
        }
    }

    return new NextResponse('Authentication required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    });
}
