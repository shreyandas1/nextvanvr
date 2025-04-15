/**
 * Handles GET requests to retrieve annotations for a specific model.
 *
 * @param req - The incoming Next.js request object.
 * @returns A JSON response containing the annotations for the specified model ID,
 *          or an error message if the model ID is not provided.
 *
 * @remarks
 * - The model ID is extracted from the URL path.
 * - If the model ID is missing, a 400 status code is returned.
 * - Retrieves annotations from the database using the provided model ID.
 */
//export const GET: (req: NextRequest) => Promise<NextResponse>;

/**
 * Handles POST requests to create a new annotation for a specific model.
 *
 * @param req - The incoming Next.js request object.
 * @returns A JSON response indicating the success or failure of the annotation creation.
 *
 * @remarks
 * - Requires the user to be authenticated and have an 'ADMIN' role.
 * - The model ID is extracted from the URL path.
 * - The request body must include `name` and `description` for the annotation.
 * - If the user is unauthorized, a 403 status code is returned.
 * - If the annotation creation fails, a 500 status code is returned.
 */
//export const POST: (req: NextRequest) => Promise<NextResponse>;
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
