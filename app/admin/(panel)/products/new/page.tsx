import ProductForm from '@/components/ProductForm'; import { getCategories } from '@/lib/data';
export default async function NewProduct(){const categories=await getCategories();return <main><h1 className="text-3xl font-black">Add product</h1><ProductForm categories={categories}/></main>}
