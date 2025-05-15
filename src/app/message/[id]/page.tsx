import { redirect } from 'next/navigation';
import { getMessagesWithUser } from './actions';
import MessageBox from './components/MessageBox';
import MessageThread from './components/MessageThread';
import { session } from '@/app/actions/auth';
import { getUserById } from './actions'

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MessagePage({ params }: Props) {
  const {id: otherUserId} = await params;
  const currentUser = await session();

  if (!currentUser) {
    redirect('/login');
  }

    const otherUser = await getUserById(otherUserId);

     if (!otherUser?.username) {
    redirect('/404');
  }


  const messages = await getMessagesWithUser(otherUserId);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Message {otherUser.username}</h1>

      <MessageThread messages={messages} currentUserId={currentUser.userId} otherUserId={otherUserId} />

      <MessageBox receiverId={otherUserId} />
    </div>
  );
}
