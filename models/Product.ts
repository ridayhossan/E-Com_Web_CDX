import mongoose, { Schema, models, model } from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string; slug: string; image: string; price: number; discountPrice?: number; description: string;
  category: mongoose.Types.ObjectId; stock: number; featured: boolean;
}
const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: Number,
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  stock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });
export default models.Product || model<IProduct>('Product', ProductSchema);
