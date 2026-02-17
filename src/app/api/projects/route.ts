import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');

        let query: any = {};
        if (category) query.category = category;
        if (featured === 'true') query.featured = true;

        const projects = await Project.find(query).sort({ releaseYear: -1 });
        return NextResponse.json(projects);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();

        // Auto-generate slug if not provided
        if (!body.slug && body.title) {
            body.slug = body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        const project = await Project.create(body);
        return NextResponse.json(project, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
