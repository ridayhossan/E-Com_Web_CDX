import mongoose, { Schema, models, model } from 'mongoose';

export interface ICategory extends mongoose.Document { name: string; slug: string; image?: string; description?: string; }
const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: String,
  description: String,
}, { timestamps: true });
export default models.Category || model<ICategory>('Category', CategorySchema);
