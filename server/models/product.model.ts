import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  shop:        { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  name:        { type: String, required: true },
  description: String,
  price:       { type: Number, required: true },
  features:    [String],
  offer:       { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
