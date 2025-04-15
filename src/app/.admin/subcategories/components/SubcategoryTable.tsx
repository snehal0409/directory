import React from 'react';
import { getAllSubcategories } from '../actions';

export default async function SubcategoryTable() {
  const subcategories = await getAllSubcategories();

  return (
    <table className="w-full border mt-6">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Key</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Parent Category Key</th>
        </tr>
      </thead>
      <tbody>
        {subcategories.map((sub: any) => (
          <tr key={sub._id}>
            <td className="p-2 border">{sub.subcategoryKey}</td>
            <td className="p-2 border">{sub.subcategoryName}</td>
            <td className="p-2 border">{sub.subcategoryParent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
