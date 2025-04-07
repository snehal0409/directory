import { Profile } from "./_components";
import { session } from "../actions/auth";

export default async function ProfilePage() {
   const user = await session()

    return (
        <Profile user={user} />
    );
}