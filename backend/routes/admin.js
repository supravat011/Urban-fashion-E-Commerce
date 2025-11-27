const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

// Configure Multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// @route   POST /api/admin/add-product
// @desc    Add a new product with image
// @access  Private/Admin
router.post('/add-product', protect, adminOnly, upload.single('image'), async (req, res) => {
    try {
        const { name, price, description, category } = req.body;

        // Validation
        if (!name || !price || !description || !category) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a product image' });
        }

        // Create image URL
        const imageURL = `/uploads/${req.file.filename}`;

        // Create product
        const product = await Product.create({
            name,
            price,
            imageURL,
            description,
            category,
        });

        res.status(201).json({
            message: 'Product added successfully',
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/admin/products
// @desc    Get all products (admin view)
// @access  Private/Admin
router.get('/products', protect, adminOnly, async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/admin/product/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/product/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
    try {
        const { name, price, description, category } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update fields
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.category = category || product.category;

        // If new image is uploaded, delete old image and update
        if (req.file) {
            // Delete old image file
            const oldImagePath = path.join(__dirname, '..', product.imageURL);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            product.imageURL = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await product.save();

        res.json({
            message: 'Product updated successfully',
            product: updatedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   DELETE /api/admin/product/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/product/:id', protect, adminOnly, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete image file
        const imagePath = path.join(__dirname, '..', product.imageURL);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
