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
