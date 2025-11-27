import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Welcome, {user?.name}!
                    </h2>
                    <p className="text-gray-600">
                        Manage your e-commerce store from this dashboard.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Add Product Card */}
                    <Link
                        to="/admin/add-product"
                        className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg p-8 text-white hover:shadow-xl transition-shadow group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold">Add Product</h3>
                            <svg
                                className="w-12 h-12 opacity-80 group-hover:scale-110 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </div>
                        <p className="opacity-90">
                            Add new products to your store with images and details
                        </p>
                    </Link>

                    {/* Manage Products Card */}
                    <Link
                        to="/admin/products"
                        className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl shadow-lg p-8 text-white hover:shadow-xl transition-shadow group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold">Manage Products</h3>
                            <svg
                                className="w-12 h-12 opacity-80 group-hover:scale-110 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                />
                            </svg>
                        </div>
                        <p className="opacity-90">
                            View, edit, and delete existing products
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
