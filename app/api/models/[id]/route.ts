/**
 * Handles the GET request for retrieving a model by its ID.
 *
 * @param request - The incoming HTTP request object.
 * @param response - The outgoing HTTP response object.
 * @returns A JSON response containing the model's details if found, or an error message if not.
 *
 * @remarks
 * - The `id` is extracted from the URL path.
 * - If the `id` is missing, a 400 Bad Request response is returned.
 * - If no model is found with the given `id`, a 404 Not Found response is returned.
 * - If the model is found, its name, `objFile`, `mtlFile`, and `txtFile` are returned in the response.
 *
 * @example
 * // Example request URL: /api/models/123
 * // Example response:
 * // {
 * //   "name": "Example Model",
 * //   "objFile": "example.obj",
 * //   "mtlFile": "example.mtl",
 * //   "txtFile": "example.txt"
 * // }
 */
import { db } from '@/lib/db';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
	const url = new URL(request.url);
	const id = url.pathname.split('/').pop(); // Extract the ID from the URL

	if (!id) {
		return NextResponse.json(
			{ message: 'Model ID is required' },
			{ status: 400 }
		);
	}
	const model = await db.model.findFirst({
		where: { id: id as string },
	});

	if (!model) {
		return NextResponse.json({ message: 'Model not found' }, { status: 404 });
	}

	const objFile = model.objFile;
	const mtlFile = model.mtlFile;
	const txtFile = model.txtFile;
	const modelName = model.name;

	return NextResponse.json(
		{ name: modelName, objFile: objFile, mtlFile: mtlFile, txtFile: txtFile },
		{ status: 200 }
	);
}
