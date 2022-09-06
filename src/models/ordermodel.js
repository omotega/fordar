const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  orderId: { type: String, required: true },
  vendorId: { type: String, required: true },
  items: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true,
      },
      unit: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, required: true },
  orderDate: { type: Date },
  orderStatus: { type: String },
  remarks: { type: String },
  deliveryId: { type: String },
  readyTime: { type: Number },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
