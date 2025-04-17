import { redirect } from 'next/navigation';
import { getSessionAdmin } from '@/lib/session';
import AddUserForm from './components/AddUserForm';

export default async function AddUserPage() {
  const admin = await getSessionAdmin();
  if (!admin) redirect('/admin/login');

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Add New User</h1>
      <AddUserForm />
    </div>
  );
}
