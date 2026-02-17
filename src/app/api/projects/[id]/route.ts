import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    try {
        const project = await Project.findById(params.id);
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json(project);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    try {
        const body = await req.json();
        const project = await Project.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json(project);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    try {
        const project = await Project.findByIdAndDelete(params.id);
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
