import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-black tracking-widest text-white uppercase font-serif">URBAN</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Elevate your style with our curated collection of premium fashion.
                            Quality meets comfort in every piece we offer.
                        </p>
                        <div className="flex gap-4">
                            {['facebook', 'x', 'instagram', 'youtube'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300 group"
                                >
                                    <span className="sr-only">{social}</span>
                                    <img
                                        src={`https://cdn.simpleicons.org/${social}/white`}
                                        alt={social}
                                        className="w-5 h-5 transition-all duration-300 group-hover:invert"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 relative inline-block">
                            Quick Links
                        </h3>
                        <ul className="space-y-4 text-gray-400">
                            {['Home', 'Men', 'Women', 'Kids', 'Beauty'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/?category=${item}`}
                                        className="hover:text-yellow-400 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-yellow-400 transition-colors"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 relative inline-block">
                            Customer Care
                        </h3>
                        <ul className="space-y-4 text-gray-400">
                            {['Contact Us', 'Shipping Policy', 'Returns & Exchanges', 'FAQs', 'Size Guide'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-yellow-400 transition-colors"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 relative inline-block">
                            Stay Updated
                        </h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Subscribe to our newsletter for exclusive offers, new arrivals, and fashion tips.
                        </p>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1 top-1 bottom-1 bg-yellow-500 text-black px-4 rounded-md font-bold hover:bg-yellow-400 transition-colors"
                                >
                                    JOIN
                                </button>
                            </div>
                            <p className="text-xs text-gray-500">
                                By subscribing, you agree to our Privacy Policy and Terms of Service.
                            </p>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} URBAN. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <img src="https://cdn.simpleicons.org/visa/white" alt="Visa" className="h-6 opacity-50 hover:opacity-100 transition-opacity" />
                            <img src="https://cdn.simpleicons.org/mastercard/white" alt="Mastercard" className="h-6 opacity-50 hover:opacity-100 transition-opacity" />
                            <img src="https://cdn.simpleicons.org/paypal/white" alt="PayPal" className="h-6 opacity-50 hover:opacity-100 transition-opacity" />
                            <img src="https://cdn.simpleicons.org/americanexpress/white" alt="Amex" className="h-6 opacity-50 hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
