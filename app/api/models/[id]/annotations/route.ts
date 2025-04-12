import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { log } from 'node:console';

export const GET = async (req: NextRequest) => {
	const url = new URL(req.url);

	const id = url.pathname.split('/')[3];

	if (!id) {
		return NextResponse.json(
			{ message: 'Model ID is required' },
			{ status: 400 }
		);
	}

	const annotations = await db.annotation.findMany({
		where: { modelId: id as string },
	});

	return NextResponse.json({ annotations: annotations }, { status: 200 });
};

export const POST = async (req: NextRequest) => {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized action' }, { status: 403 });
    }

    const url = new URL(req.url);
    const id = url.pathname.split('/')[3];

    const data = await req.json();

    const { name, description } = data;

    
    try {
     await db.annotation.create({
         data: {
             annotationName: name,
             description: description,
             modelId: id as string,
         }
     })
    } catch (e) {
        console.error('Error creating annotation:', e);
        return NextResponse.json(
            { error: 'Failed to create annotation' },
            { status: 500 }
        );
    }
    return NextResponse.json({ message: 'Annotation created' }, { status: 200 });

}
