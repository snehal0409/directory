import { getUserById } from './actions';
import { PublicProfile } from './components/PublicProfile';
import { redirect } from 'next/navigation';

export default async function ContactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const otherUser = await getUserById(id);

  if (!otherUser?.username) {
    redirect('/404');
  }

  return <PublicProfile user={otherUser} />;
}
