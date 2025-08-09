import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: String,
  discount:    { type: Number, required: true },
  validFrom:   { type: Date, required: true },
  validTo:     { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model('Offer', offerSchema);
