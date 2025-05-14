import { Profile } from "./_components";
import { session } from "../actions/auth";
import { redirect } from "next/navigation"; 

export default async function ProfilePage() {
   const user = await session();

   if (!user) {
      
      redirect("/login"); 
   }

   return <Profile user={user} />;
}  