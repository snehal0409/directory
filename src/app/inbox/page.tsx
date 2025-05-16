import { Header } from '../_components/Header';
import { getInboxList } from './actions';
import InboxList from './components/InboxList';
import { session } from '@/app/actions/auth';
import { redirect } from 'next/navigation';

export default async function InboxPage() {
  const currentUser = await session();

  if (!currentUser) {
    redirect('/login');
  }

  const inbox = await getInboxList();

  return (
      <><Header />
      <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>

      <InboxList inbox={inbox} />
    </div></>
  );
}
