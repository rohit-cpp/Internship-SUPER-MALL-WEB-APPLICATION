import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  category:    { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  floor:       { type: mongoose.Schema.Types.ObjectId, ref: 'Floor', required: true },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: String,
}, { timestamps: true });

export default mongoose.model('Shop', shopSchema);
