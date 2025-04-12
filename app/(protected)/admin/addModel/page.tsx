/**
 * This is the page component for adding a new model in the admin section.
 *
 * The component performs the following:
 * - Authenticates the user using the `auth` function.
 * - Checks if the authenticated user has the `ADMIN` role.
 * - If the user is not authenticated or does not have the `ADMIN` role, it renders the `AdminOnlyFailPage` component.
 * - If the user is an admin, it renders the `ModelForm` component, passing the user's email as a prop.
 *
 * @returns A React component that conditionally renders based on the user's authentication and role.
 */
import { auth } from '@/auth';
import { AdminOnlyFailPage } from '@/components/auth/adminOnlyFailPage';
import { ModelForm } from '@/components/three/ModelForm';

const addModelPage = async () => {
	const session = await auth();
	
	if (!session || session.user.role !== 'ADMIN') {
		return <AdminOnlyFailPage />;
	}
	return (
		<div>
			<ModelForm email={session.user.email} />
		</div>
	);
};

export default addModelPage;
