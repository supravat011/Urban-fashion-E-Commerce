import { useState, useEffect } from 'react';
import axios from '../../utils/axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
    });
    const [editImage, setEditImage] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/admin/products');
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load products');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            await axios.delete(`/api/admin/product/${id}`);
            setProducts(products.filter((p) => p._id !== id));
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product._id);
        setEditFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
        });
    };

    const handleEditChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditImageChange = (e) => {
        setEditImage(e.target.files[0]);
    };

    const handleUpdate = async (id) => {
        try {
            const formData = new FormData();
            formData.append('name', editFormData.name);
            formData.append('price', editFormData.price);
            formData.append('description', editFormData.description);
            formData.append('category', editFormData.category);

            if (editImage) {
                formData.append('image', editImage);
            }

            const { data } = await axios.put(`/api/admin/product/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setProducts(products.map((p) => (p._id === id ? data.product : p)));
            setEditingProduct(null);
            setEditImage(null);
        } catch (err) {
            alert('Failed to update product');
        }
    };

    const cancelEdit = () => {
        setEditingProduct(null);
        setEditImage(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Products</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {products.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-xl">No products found</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        {editingProduct === product._id ? (
                                            <>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleEditImageChange}
                                                        className="text-sm"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={editFormData.name}
                                                        onChange={handleEditChange}
                                                        className="input-field"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        name="category"
                                                        value={editFormData.category}
                                                        onChange={handleEditChange}
                                                        className="input-field"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        step="0.01"
                                                        value={editFormData.price}
                                                        onChange={handleEditChange}
                                                        className="input-field"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <button
                                                        onClick={() => handleUpdate(product._id)}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img
                                                        src={product.imageURL.startsWith('http') ? product.imageURL : `${apiUrl}${product.imageURL}`}
                                                        alt={product.name}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                    <div className="text-sm text-gray-500 line-clamp-1">
                                                        {product.description}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    ${product.price}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="text-primary-600 hover:text-primary-900"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
