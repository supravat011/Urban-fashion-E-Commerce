require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@shop.com' });

        if (adminExists) {
            console.log('Admin user already exists!');
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            name: 'Admin',
            email: 'admin@shop.com',
            password: 'admin123',
            role: 'admin',
        });

        console.log('Admin user created successfully!');
        console.log('Email: admin@shop.com');
        console.log('Password: admin123');
        console.log('\nPlease change the password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
