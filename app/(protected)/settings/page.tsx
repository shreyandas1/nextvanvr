'use client';

import { auth, signOut } from '@/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SignOutButton from '@/components/auth/signout-button';
import { json } from 'stream/consumers';
import { useEffect, useState } from 'react';
import { List } from 'postcss/lib/list';
import { db } from '@/lib/db';
import { useSession } from 'next-auth/react';
import axios from 'axios';

/**
 * The `SettingsPage` component is a protected page that displays a list of models
 * retrieved from the server and provides a link to add a new model. It ensures
 * that the user is authenticated before rendering the content.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered settings page.
 *
 * @remarks
 * - This component uses the `useSession` hook to check the user's authentication status.
 * - It fetches the list of models from the `api/models` endpoint using Axios.
 * - If the user is not authenticated, a message is displayed instead of the content.
 *
 * @example
 * ```tsx
 * import SettingsPage from './settings/page';
 *
 * const App = () => {
 *   return <SettingsPage />;
 * };
 * ```
 *
 * @dependencies
 * - `useState` and `useEffect` from React for state management and side effects.
 * - `useSession` from `next-auth/react` for authentication handling.
 * - `axios` for making HTTP requests.
 * - `Link` from `next/link` for navigation.
 */
const SettingsPage = () => {
	const [models, setModels] = useState([]);

	const { data: session, status } = useSession();

	useEffect(() => {
		axios({
			method: 'get',
			url: 'api/models',
		}).then((res) => {
			setModels(res.data);
		});
	}, []);

	if (status !== 'authenticated') {
		return <p>Not authenticated</p>;
	}

	return (
		<div>
			{models.map((model) => (
				<p>
					<Link href={`/models/${model.id}`}>{model.name}</Link>
				</p>
			))}

			<p>
				<Link href="/admin/addModel/">Add a model</Link>
			</p>
		</div>
	);
};

export default SettingsPage;
