


import Link from 'next/link';

const Dashboard = () => {

    
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <div className="space-x-4">
        <Link
          href="/profile"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit Profile
        </Link>
        <Link
          href="/user/listings"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          My Listings
        </Link>
        
      </div>
    </div>
  );
}

export default Dashboard;
