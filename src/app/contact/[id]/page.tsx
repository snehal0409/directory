import { getUserById } from './actions';
import { PublicProfile } from './components/PublicProfile';
import { redirect } from 'next/navigation';
import { session } from '@/app/actions/auth';

export default async function ContactPage({ params }: { params: Promise<{ id: string }> }) {
   const currentUser = await session();

  
  const { id } = await params;

  // Fetch user data
  const otherUser = await getUserById(id);

  // Ensure the user object has the required properties
  if (!otherUser?.username) {
    redirect('/404');
  }

  return <PublicProfile user={otherUser} />;
}
