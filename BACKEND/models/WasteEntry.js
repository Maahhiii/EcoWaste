import mongoose from 'mongoose';

const wasteEntrySchema = new mongoose.Schema({
  location: { type: String, required: true },
  weight: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const WasteEntry = mongoose.model('WasteEntry', wasteEntrySchema);

export default WasteEntry;
