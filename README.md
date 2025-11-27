# MERN E-Commerce Website

A full-stack e-commerce shopping website built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring separate admin and customer functionalities, JWT authentication, product management with image uploads, shopping cart, and order processing.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

### Admin Features
- ✅ Secure admin login with JWT authentication
- ✅ Add new products with image upload
- ✅ View all products in a table format
- ✅ Update existing products (including images)
- ✅ Delete products with image cleanup
- ✅ Role-based access control

### Customer Features
- ✅ User registration and login
- ✅ Browse products with search and category filters
- ✅ Add products to shopping cart
- ✅ Update cart quantities
- ✅ Place orders (saved to MongoDB)
- ✅ View order history
- ✅ Persistent cart using localStorage

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (MongoDB Atlas)
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Context API** - State management

## 📁 Project Structure

```
E-commerce Website/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── admin.js             # Admin role check
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Product.js           # Product schema
│   │   └── Order.js             # Order schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── admin.js             # Admin routes
│   │   ├── product.js           # Product routes
│   │   └── order.js             # Order routes
│   ├── scripts/
│   │   └── seedAdmin.js         # Seed admin user
│   ├── uploads/                  # Product images
│   ├── .env                     # Environment variables
│   ├── .env.example             # Environment template
│   ├── server.js                # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── AdminRoute.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   └── admin/
    │   │       ├── Dashboard.jsx
    │   │       ├── AddProduct.jsx
    │   │       └── ProductList.jsx
    │   ├── utils/
    │   │   └── axios.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── .env.example
    └── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   PORT=5000
   ```

4. **Create admin user**
   ```bash
   npm run seed
   ```
   
   Default admin credentials:
   - Email: `admin@shop.com`
   - Password: `admin123`
   
   ⚠️ **Important**: Change the admin password after first login!

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

## 📸 Image Upload Explanation

### How It Works

The application uses **Multer** middleware to handle product image uploads:

1. **Storage Configuration**: Images are stored in the `backend/uploads/` directory with unique filenames
2. **File Validation**: Only image files (jpg, jpeg, png, gif, webp) are accepted
3. **Size Limit**: Maximum file size is 5MB
4. **Static Serving**: The `/uploads` folder is served as static files via Express
5. **Database Storage**: Only the image URL path is stored in MongoDB (e.g., `/uploads/product-123456.jpg`)

### Upload Process

**Admin adds a product:**
1. Admin selects an image file in the Add Product form
2. Form data is sent as `multipart/form-data` using FormData
3. Multer processes the upload and saves the file
4. Server returns the image URL
5. Product document is created with the image URL

**Updating a product:**
- If a new image is uploaded, the old image file is deleted from the filesystem
- The new image is saved and the URL is updated in the database

**Deleting a product:**
- Both the database document and the image file are removed

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user

### Admin Routes (`/api/admin`) - Protected & Admin Only
- `POST /add-product` - Add new product with image
- `GET /products` - Get all products
- `PUT /product/:id` - Update product
- `DELETE /product/:id` - Delete product

### Product Routes (`/api/products`) - Public
- `GET /` - Get all products
- `GET /:id` - Get single product

### Order Routes (`/api/order`) - Protected
- `POST /create` - Create new order
- `GET /my-orders` - Get user's orders
- `GET /:id` - Get single order

## 🧪 Testing with Postman

A complete Postman collection is included in `postman_collection.json`. Import it into Postman to test all API endpoints.

### Testing Flow:

1. **Register a customer** - `POST /api/auth/register`
2. **Login as admin** - `POST /api/auth/login` (use admin credentials)
3. **Add products** - `POST /api/admin/add-product` (with image file)
4. **View products** - `GET /api/products`
5. **Login as customer** - `POST /api/auth/login`
6. **Create order** - `POST /api/order/create`

## 🔐 Authentication Flow

1. User registers or logs in
2. Server generates JWT token with user ID
3. Token is sent to client and stored in localStorage
4. Axios interceptor automatically adds token to all requests
5. Backend middleware verifies token on protected routes
6. Admin middleware checks user role for admin routes

## 🎨 Frontend Features

### State Management
- **AuthContext**: Manages user authentication state
- **CartContext**: Manages shopping cart with localStorage persistence

### Protected Routes
- **ProtectedRoute**: Requires authentication
- **AdminRoute**: Requires admin role

### Styling
- Modern, responsive design with Tailwind CSS
- Custom color palette (primary and secondary gradients)
- Smooth animations and transitions
- Mobile-friendly navigation

## 📝 Notes

- **No Payment Gateway**: This is a demo application without payment integration
- **Image Storage**: Images are stored locally; consider cloud storage (AWS S3, Cloudinary) for production
- **Security**: Change default admin credentials and JWT secret in production
- **CORS**: Backend allows all origins; restrict in production

## 🤝 Contributing

Feel free to fork this project and submit pull requests!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using the MERN stack

---

**Happy Shopping! 🛒**
