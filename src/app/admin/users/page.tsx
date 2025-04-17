import { redirect } from 'next/navigation';
import { getSessionAdmin } from '@/lib/session';
import { getAllUsers } from './actions/getAllUsers';
import UserTable from './components/UserTable';
import AdminNav from '../dashboard/components/AdminNav';
import Link from 'next/link';

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

        
       
        
        <h1 className="text-xl font-semibold mb-5">Manage Users</h1>

<div className="mb-6">
  <Link
    href="/admin/users/add"
    className=" bg-blue-600  hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
  >
    Add User
  </Link>
</div>
        
      <UserTable users={usersData} /> {/* Pass the users data as a prop */}

      
    </div>
  );
}
