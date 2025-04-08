
 import { redirect } from "next/navigation";
import { session } from "@/app/actions/auth";
import {LoginForm} from "./_components";

export default async function LoginPage() {
  const user = await session();
  if (user) redirect("/"); // Already logged in? Go home

  return <LoginForm />;
}
