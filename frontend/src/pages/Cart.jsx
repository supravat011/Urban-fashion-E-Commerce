import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Add some products to get started!</p>
                    <Link to="/" className="btn-primary">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
                                <img
                                    src={item.imageURL.startsWith('http') ? item.imageURL : `${apiUrl}${item.imageURL}`}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />

                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-600">{item.category}</p>
                                    <p className="text-lg font-semibold text-primary-600 mt-2">
                                        ${item.price}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-900">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-600 hover:text-red-700 text-sm font-medium mt-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <Link to="/checkout" className="block w-full btn-primary text-center">
                                Proceed to Checkout
                            </Link>

                            <Link to="/" className="block w-full btn-secondary text-center mt-3">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
