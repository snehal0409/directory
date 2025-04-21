// src/app/user/listings/edit/[id]/page.tsx

import dbConnect from '@/lib/mongodb';
import Item from '@/models/item';
import { LeanItem } from '@/models/item';
import { Subcategory } from '@/models/subcategory';
import Category from '@/models/category';
import { redirect } from 'next/navigation';
import EditItemForm from './components/EditItemForm';
import { session } from '@/app/actions/auth';

type Props = {
  params: { id: string };
};

export default async function EditItemPage({ params }: Props) {
  const user = await session();
  if (!user) redirect('/login');

  await dbConnect();
  const { id } = params;

  const item = (await Item.findOne({ _id: id, userId: user.id }).lean()) as LeanItem | null;
  if (!item) redirect('/dashboard/listings');

  const allCategories = await Category.find().lean();
  const allSubcategories = await Subcategory.find().lean();

  const formattedCategories = allCategories.map((category) => ({
    categoryKey: category.categoryKey,
    categoryName: category.categoryName,
  }));

  const formattedSubcategories = allSubcategories.map((subcat) => ({
    subcategoryKey: subcat.subcategoryKey,
    subcategoryName: subcat.subcategoryName,
  }));

  const selectedSubcat = formattedSubcategories.find(
    (sc) => sc.subcategoryKey === item.subcategoryKey
  );

  const selectedCategoryKey = selectedSubcat?.subcategoryKey || '';

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Listing</h2>
      <EditItemForm
        item={{
          _id: item._id.toString(),
          itemTitle: item.itemTitle,
          itemDescription: item.itemDescription,
          subCategoryKey: item.subcategoryKey,
        }}
        selectedCategoryKey={selectedCategoryKey}
        categories={formattedCategories}
        subcategories={formattedSubcategories}
      />
    </div>
  );
}
