import { redirect } from 'next/navigation';
import { getSessionAdmin } from '@/lib/session';
import { getAllUsers } from './actions/getAllUsers';
import UserTable from './components/UserTable';
import AdminNav from '../dashboard/components/AdminNav';
import Link from 'next/link';
import LogoutButton from '../dashboard/components/logout';

export default async function ManageUsersPage() {
  const admin = await getSessionAdmin();
  if (!admin) redirect('/admin/login');

  // Fetch users data
  const users = await getAllUsers();

  // Ensure that users is an empty array if undefined or null
  const usersData = users ?? [];

  return (
    
    <div className="p-6">
        <AdminNav />

        
       
        
      
<div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-bold">Users</h1>
  <div className="flex gap-2">
    <Link
      href="/admin/users/add"
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      + Add Subcategory
    </Link>
    <LogoutButton />
  </div>
</div>

        
      <UserTable users={usersData} /> {/* Pass the users data as a prop */}

      
    </div>
  );
}
