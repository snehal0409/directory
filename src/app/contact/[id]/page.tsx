// src/app/contact/[id]/page.tsx
import { getUserById } from './actions';
import { PublicProfile } from './components/PublicProfile';
import { redirect } from 'next/navigation';

export default async function ContactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch user data
  const user = await getUserById(id);

  // Ensure the user object has the required properties
  if (!user?.username) {
    redirect('/404');
  }

  return <PublicProfile user={user} />;
}
