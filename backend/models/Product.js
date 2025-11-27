const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a product name'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price'],
            min: [0, 'Price cannot be negative'],
        },
        imageURL: {
            type: String,
            required: [true, 'Please provide a product image'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a category'],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', productSchema);
