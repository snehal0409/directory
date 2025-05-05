import dbConnect from '@/lib/mongodb';
import Item from '@/models/item';
import { Subcategory } from '@/models/subcategory';
import Category from '@/models/category';
import { redirect } from 'next/navigation';
import {EditItemForm, ImageType} from './components/EditItemForm';
import { getSessionAdmin } from '@/lib/session';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditItemPage({ params }: Props) {
  const user = await getSessionAdmin();
  if (!user) redirect('/admin/login');

  await dbConnect();
  const { id } = await params;

  const item = await Item.findOne({ _id: id }).lean() as {
    _id: string;
    itemTitle: string;
    itemDescription: string;
    subcategoryKey: string;
    images: ImageType[]; 
  } | null;
  if (!item) redirect('/admin/items');

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

  const selectedCategory = allCategories.find(
    (cat) => cat.categoryKey === selectedSubcat?.subcategoryName
  );

  return (
    <EditItemForm
      item={{
        _id: item._id.toString(),
        itemTitle: item.itemTitle,
        itemDescription: item.itemDescription,
        subCategoryKey: item.subcategoryKey,
        images: item.images,
      }}
      selectedCategoryKey={selectedCategory?.categoryKey || ''}
      categories={formattedCategories}
      subcategories={formattedSubcategories}
    />
  );
}
