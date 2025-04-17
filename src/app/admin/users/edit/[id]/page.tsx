import {EditUserForm }from '../[id]/components/EditUserForm';
import { getUserById } from '../../actions/getUserByID';
import { redirect } from 'next/navigation';
import { getSessionAdmin } from '@/lib/session';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditUserPage({ params }: Props) {
  const session = await getSessionAdmin();
  if (!session) redirect('/admin/login');

  const { id } = await params

  const user = await getUserById(id);
  if (!user) redirect('/admin/users');

  return (
    <div className="p-6">
      
      <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
      <EditUserForm user={user} />
    </div>
  );
}
