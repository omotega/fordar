const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({
  name: { type: String, required: true },
  ownerName: { type: String, required: true },
  foodType: { type: [String] },
  pincode: { type: String, required: true },
  address: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  serviceAvailable: { type: Boolean },
  coverImages: { types: [String] },
  rating: { type: Number, default: 2 },
  role: { type: String, default: 'vendor' },
  food: [{ type: mongoose.Schema.Types.ObjectId, ref: 'food' }],
  lat: { type: Number },
  lng: { type: Number },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Vendor', vendorSchema);
