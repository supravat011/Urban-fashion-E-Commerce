import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-[1920px] mx-auto px-8 h-24 flex items-center justify-between">
                {/* Left: Logo & Nav Links */}
                <div className="flex items-center gap-16">
                    <Link to="/" className="flex items-center">
                        <img src="/assets/urban-logo.png" alt="URBAN" className="h-20 w-auto hover:scale-105 transition-transform" />
                    </Link>

                    <div className="hidden lg:flex items-center gap-10 text-base font-bold text-gray-800 uppercase tracking-wide">
                        <Link to="/?category=Men" className="hover:text-pink-500 hover:border-b-4 hover:border-pink-500 py-8 transition-all">Men</Link>
                        <Link to="/?category=Women" className="hover:text-pink-500 hover:border-b-4 hover:border-pink-500 py-8 transition-all">Women</Link>
                        <Link to="/?category=Kids" className="hover:text-pink-500 hover:border-b-4 hover:border-pink-500 py-8 transition-all">Kids</Link>
                        <Link to="/?category=Home" className="hover:text-pink-500 hover:border-b-4 hover:border-pink-500 py-8 transition-all">Home</Link>
                        <Link to="/?category=Beauty" className="hover:text-pink-500 hover:border-b-4 hover:border-pink-500 py-8 transition-all">Beauty</Link>
                        {isAdmin && (
                            <Link to="/admin/dashboard" className="text-pink-600 hover:text-pink-700">Admin</Link>
                        )}
                    </div>
                </div>

                {/* Right: Search & Actions */}
                <div className="flex items-center gap-8">
                    {/* Search Bar */}
                    <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-md px-6 py-4 w-[600px] lg:w-[700px] focus-within:bg-white focus-within:border-gray-300 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search for products, brands and more"
                            className="bg-transparent border-none outline-none text-base w-full text-gray-700 placeholder-gray-400 ml-2 px-0"
                        />
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center cursor-pointer group relative">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700 group-hover:text-gray-900">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <span className="text-xs font-bold text-gray-700 group-hover:text-gray-900">Profile</span>

                            {/* Profile Dropdown */}
                            <div className="absolute top-full right-0 pt-4 hidden group-hover:block">
                                <div className="bg-white shadow-lg border border-gray-100 rounded-md p-4 w-64">
                                    {user ? (
                                        <>
                                            <div className="mb-4">
                                                <p className="font-bold text-gray-900">Hello, {user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                            <button onClick={handleLogout} className="text-primary-500 font-bold text-sm hover:underline">Logout</button>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-sm font-bold text-gray-900 mb-1">Welcome</p>
                                            <p className="text-xs text-gray-500 mb-4">To access account and manage orders</p>
                                            <Link to="/login" className="block w-full border border-gray-200 text-primary-500 font-bold text-center py-2 rounded hover:border-primary-500">LOGIN / SIGNUP</Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Link to="/cart" className="flex flex-col items-center cursor-pointer group relative">
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700 group-hover:text-gray-900">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 5c.07.286.074.58.012.865l-1.25 5.25a1.125 1.125 0 01-1.086.878H7.46a1.125 1.125 0 01-1.086-.878l-1.25-5.25a1.125 1.125 0 01.012-.865l1.263-5a1.125 1.125 0 011.086-.878h7.46c.44 0 .85.22 1.086.578.236.358.33.792.26 1.215z" />
                                </svg>
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs font-bold text-gray-700 group-hover:text-gray-900">Bag</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 p-4">
                    <div className="flex flex-col gap-4">
                        <Link to="/?category=Men" className="font-bold text-gray-700">Men</Link>
                        <Link to="/?category=Women" className="font-bold text-gray-700">Women</Link>
                        <Link to="/?category=Kids" className="font-bold text-gray-700">Kids</Link>
                        <Link to="/?category=Home" className="font-bold text-gray-700">Home & Living</Link>
                        <Link to="/?category=Beauty" className="font-bold text-gray-700">Beauty</Link>
                        {user ? (
                            <button onClick={handleLogout} className="text-primary-500 font-bold text-left">Logout</button>
                        ) : (
                            <Link to="/login" className="text-primary-500 font-bold">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
