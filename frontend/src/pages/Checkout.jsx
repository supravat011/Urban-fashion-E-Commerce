import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from '../utils/axios';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handlePlaceOrder = async () => {
        setLoading(true);
        setError('');

        try {
            const orderData = {
                items: cartItems.map((item) => ({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    imageURL: item.imageURL,
                })),
                total: getCartTotal(),
            };

            await axios.post('/api/order/create', orderData);

            clearCart();
            alert('Order placed successfully!');
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex items-center gap-4 pb-4 border-b">
                                <img
                                    src={item.imageURL.startsWith('http') ? item.imageURL : `${apiUrl}${item.imageURL}`}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                </div>
                                <p className="font-semibold text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-6 border-t">
                        <div className="flex justify-between text-xl font-bold text-gray-900">
                            <span>Total</span>
                            <span>${getCartTotal().toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h2>
                    <p className="text-gray-600 mb-6">
                        This is a demo application. No payment gateway is integrated.
                        Click "Place Order" to complete your order.
                    </p>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
