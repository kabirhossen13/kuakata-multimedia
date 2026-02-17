import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET() {
    await dbConnect();
    try {
        const services = await Service.find({ active: true }).sort({ title: 1 });
        return NextResponse.json(services);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const service = await Service.create(body);
        return NextResponse.json(service, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
