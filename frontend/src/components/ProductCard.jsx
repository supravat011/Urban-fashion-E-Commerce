import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (!user) {
            navigate('/login');
            return;
        }
        addToCart(product);
    };

    return (
        <div className="group cursor-pointer">
            <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                <img
                    src={product.imageURL.startsWith('http') ? product.imageURL : `${apiUrl}${product.imageURL}`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-white border border-gray-200 text-gray-900 font-bold py-2 px-4 rounded hover:border-gray-900 transition-colors uppercase text-sm tracking-wide flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 5c.07.286.074.58.012.865l-1.25 5.25a1.125 1.125 0 01-1.086.878H7.46a1.125 1.125 0 01-1.086-.878l-1.25-5.25a1.125 1.125 0 01.012-.865l1.263-5a1.125 1.125 0 011.086-.878h7.46c.44 0 .85.22 1.086.578.236.358.33.792.26 1.215z" />
                        </svg>
                        Add to Bag
                    </button>
                </div>
            </div>

            <div className="mt-3">
                <h3 className="font-bold text-gray-900 text-base truncate">{product.category}</h3>
                <p className="text-gray-500 text-sm truncate font-normal">{product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-gray-900 text-sm">Rs. {product.price}</span>
                    <span className="text-xs text-orange-500 font-bold">(40% OFF)</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
