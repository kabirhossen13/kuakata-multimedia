import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';

export async function GET() {
    await dbConnect();
    try {
        const team = await TeamMember.find({}).sort({ name: 1 });
        return NextResponse.json(team);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const teamMember = await TeamMember.create(body);
        return NextResponse.json(teamMember, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
