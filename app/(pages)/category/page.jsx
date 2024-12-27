import { getCategories } from "@/app/services/Services";
import { CategoriesGrid } from "@/components/category/CategoryList";

export default async function CategoriesPage() {
  const categories = await getCategories();  

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Explore Book Categories</h1>
      <CategoriesGrid categories={categories} />
    </div>
  );
}