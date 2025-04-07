import  Home  from "./_components";
import { session } from "./actions/auth";

export default async function HomePage() {
   const user = await session()
    return (
        <Home user={user} />
    );
}