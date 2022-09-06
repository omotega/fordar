const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  vendorId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  foodType: { type: String, required: true },
  readyTime: { type: Number },
  price: { type: Number },
  rating: { type: Number },
  images: { type: [String] },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Food', foodSchema);
