import React from "react";
import { getAllSubcategories } from "./actions";
import { deleteSubcategoryAction } from "./actions";

export default async function SubcategoriesPage() {
  const subcategories = await getAllSubcategories();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Subcategories</h1>
      <a
        href="/.admin/subcategories/add"
        className="mb-4 inline-block bg-green-600 text-white px-4 py-2 rounded"
      >
        + Add Subcategory
        
      </a>

      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Key</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Parent Category</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((sub: any) => (
            <tr key={sub._id}>
              <td className="border p-2">{sub.subcategoryKey}</td>
              <td className="border p-2">{sub.subcategoryName}</td>
              <td className="border p-2">{sub.categoryName}</td>
              <td className="border p-2">
                <a
                  href={`/.admin/subcategories/edit/${sub._id}`}
                  className="text-blue-600 mr-2"
                >
                  Edit
                </a>
                <form
                  action={deleteSubcategoryAction.bind(null, sub._id)}
                  method="POST"
                  className="inline"
                >
                  <button
                    type="submit"
                    className="text-red-600"
                    onClick={(e) => {
                      if (!confirm("Are you sure you want to delete this subcategory?")) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
