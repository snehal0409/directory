'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logoutAdmin() {
  (await cookies()).delete('admin-token')
  redirect('/.admin/login')
}
// Define and export the logout function
export async function logout() {
    // Add your logout logic here
    console.log("User logged out");
  }