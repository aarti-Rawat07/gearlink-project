const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  image: { type: String },
  category: { type: String },
  brand: { type: String },
  rating: { type: Number, default: 5 },
  stock: { type: String, default: "In Stock" },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);