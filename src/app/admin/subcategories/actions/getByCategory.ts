import { connectDB } from "@/lib/mongodb";

export async function getSubcategoriesByCategory(categoryKey: string) {
  const db = await connectDB();
  console.log("DB object:", db); // Log the db object
  const subcategories = await db
    .collection("subcategories")
    .find({ subcategoryParent: categoryKey })
    .project({ _id: 1, subcategoryKey: 1, subcategoryName: 1, subcategoryParent: 1 })
    .toArray();

  return subcategories;
}
