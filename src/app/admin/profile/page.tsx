// app/admin/profile/page.tsx
import { getSessionAdmin } from '../../../lib/session';
import { redirect } from 'next/navigation';

export default async function AdminProfilePage() {
  const session = await getSessionAdmin();

  // If not logged in, redirect to login page
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div>
      <h1>Admin Profile</h1>
      {/* Admin profile content */}
    </div>
  );
}
