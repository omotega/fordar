const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  cart: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true,
      },
      unit: { type: Number, required: true },
    },
  ],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
