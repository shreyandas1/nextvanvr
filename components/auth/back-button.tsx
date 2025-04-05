'use client';
import { StringToBoolean } from 'class-variance-authority/types';
import { Button } from '../ui/button';
import Link from 'next/link';

interface BackButtonProps {
	href: string;
	label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
	return (
		<Button variant="link" asChild>
			<Link href={href}>{label}</Link>
		</Button>
	);
};
