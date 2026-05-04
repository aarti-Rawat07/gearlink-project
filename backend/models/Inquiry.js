const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  mobile: { type: String },
  city: { type: String },
  message: { type: String, required: true },
  form: { type: String, default: 'contact' },
  status: { type: String, enum: ['Pending', 'Replied'], default: 'Pending' },
  reply: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
