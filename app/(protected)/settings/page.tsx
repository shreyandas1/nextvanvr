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
