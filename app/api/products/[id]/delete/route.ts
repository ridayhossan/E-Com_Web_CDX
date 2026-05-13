import { NextResponse } from 'next/server'; import { connectDB } from '@/lib/mongodb'; import Product from '@/models/Product'; import { requireAdmin } from '@/lib/auth';
export async function POST(request: Request,{params}:{params:{id:string}}){requireAdmin();await connectDB();await Product.findByIdAndDelete(params.id);return NextResponse.redirect(new URL('/admin/products',request.url));}
