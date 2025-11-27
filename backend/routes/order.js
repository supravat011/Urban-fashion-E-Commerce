const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// @route   POST /api/order/create
// @desc    Create a new order
// @access  Private
router.post('/create', protect, async (req, res) => {
    try {
        const { items, total } = req.body;

        // Validation
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items in order' });
        }

        if (!total || total <= 0) {
            return res.status(400).json({ message: 'Invalid order total' });
        }

        // Create order
        const order = await Order.create({
            userId: req.user._id,
            items,
            total,
            status: 'pending',
        });

        res.status(201).json({
            message: 'Order placed successfully',
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/order/my-orders
// @desc    Get logged-in user's orders
// @access  Private
router.get('/my-orders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .populate('userId', 'name email');

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/order/:id
// @desc    Get single order by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId', 'name email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Make sure user owns this order or is admin
        if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
