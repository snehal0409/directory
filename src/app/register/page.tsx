
import { RegisterForm } from "./_components";
import { redirect } from "next/navigation";
import { session } from "../actions/auth"; 

export default async function RegisterPage() {
    const user = await session();

    if (user) {
        redirect("/"); 
    }

    return <RegisterForm />;
}
