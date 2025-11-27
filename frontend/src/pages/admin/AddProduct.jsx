import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!image) {
            setError('Please select a product image');
            return;
        }

        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('image', image);

            await axios.post('/api/admin/add-product', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess('Product added successfully!');

            // Reset form
            setFormData({
                name: '',
                price: '',
                description: '',
                category: '',
            });
            setImage(null);
            setImagePreview(null);

            setTimeout(() => {
                navigate('/admin/products');
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Enter product name"
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                Price ($)
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <input
                                id="category"
                                name="category"
                                type="text"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="e.g., Electronics, Clothing, Books"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="input-field"
                                placeholder="Enter product description"
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                Product Image
                            </label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="input-field"
                            />
                            {imagePreview && (
                                <div className="mt-4">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-48 h-48 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Adding Product...' : 'Add Product'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
