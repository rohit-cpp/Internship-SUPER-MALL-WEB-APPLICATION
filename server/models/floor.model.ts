import mongoose from 'mongoose';

const floorSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  description: String,
}, { timestamps: true });

export default mongoose.model('Floor', floorSchema);
