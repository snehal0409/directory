import { getSessionAdmin } from "@/lib/session";
import AddAdminForm from "./components/AddAdminForm";
import { redirect } from "next/navigation";

export default async function AddAdminPage() {
     const admin = await getSessionAdmin();
    
    
      if (!admin) redirect("/admin/login");
    
  return <AddAdminForm />;
}
