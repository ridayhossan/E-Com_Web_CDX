import { NextResponse } from 'next/server'; import { connectDB } from '@/lib/mongodb'; import Category from '@/models/Category'; import { requireAdmin } from '@/lib/auth';
export async function POST(request: Request,{params}:{params:{id:string}}){requireAdmin();await connectDB();await Category.findByIdAndDelete(params.id);return NextResponse.redirect(new URL('/admin/categories',request.url));}
