import Admin from "@/models/admin";

// Ensure getAdminById is working correctly
export async function getAdminById(id: string) {
  try {
    // Fetch the admin, ensure only one result is returned
    const admin = await Admin.findById(id).lean();
    
    if (!admin) {
      console.log("Admin not found with ID:", id);
    }
    return admin || null;
  } catch (err) {
    console.log("Error fetching admin by ID:", err);
    return null;
  }
}
