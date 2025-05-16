import { Profile } from "./_components";
import { session } from "../actions/auth";
import { redirect } from "next/navigation";
import {Header} from "../_components/Header"; // ✅ Import Header

export default async function ProfilePage() {
  const user = await session();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Header /> {/* ✅ Header added here */}
      <Profile user={user} />
    </>
  );
}
