const express = require('express');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user's active cart/order
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id, status: 'pending' }).populate('products.product');
    res.json(cart || null);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add to cart / current pending order
router.post('/', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.id, status: 'pending' });
    if (!cart) {
      cart = new Cart({ user: req.user.id, products: [] });
    }
    const existingProduct = cart.products.find(p => p.product.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get current user's order history
router.get('/history', auth, async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.user.id }).populate('products.product');
    res.json(carts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all carts (admin only)
router.get('/admin', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  try {
    const carts = await Cart.find().populate('user', 'name email').populate('products.product');
    res.json(carts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update cart status (admin only)
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  const { status } = req.body;
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Checkout (user can checkout their own pending cart)
router.post('/checkout', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id, status: 'pending' });
    if (!cart) return res.status(404).json({ error: 'No pending cart found' });
    cart.status = 'ordered';
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;