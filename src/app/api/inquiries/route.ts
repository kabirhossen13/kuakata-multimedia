import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

export async function GET() {
    await dbConnect();
    try {
        // This should be protected by admin middleware/auth in a real scenario
        const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
        return NextResponse.json(inquiries);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const inquiry = await Inquiry.create(body);
        return NextResponse.json(inquiry, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
