import { cn } from '@/lib/utils';

interface HeaderProps {
	label: string;
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className="">
			<h1> Auth </h1>
			<p>{label}</p>
		</div>
	);
};
