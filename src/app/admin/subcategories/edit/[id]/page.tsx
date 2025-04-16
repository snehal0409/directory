import EditSubcategoryForm from '../../components/EditSubcategoryForm';
import { getSubcategoryById } from '../../actions/getSubcategoryByID';
import { getAllCategories } from '../../actions/getAllCategories';
import React from 'react';

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditSubcategoryPage({ params }: EditPageProps) {
  const { id } = await params
  const subcategory = await getSubcategoryById(id);
  const categories = await getAllCategories();
  return <EditSubcategoryForm subcategory={subcategory} categories={categories} />;
}
