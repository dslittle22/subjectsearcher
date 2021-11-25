import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { findNextSemesterRoute } from '@/lib/dates';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (req.url == '/') {
        return NextResponse.redirect(findNextSemesterRoute())
    }
    return NextResponse.next()
}