// src/app/admin/actions/logout.ts

'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logoutAdmin() {
  (await cookies()).delete("admin-token");
  redirect("/admin/login");
}