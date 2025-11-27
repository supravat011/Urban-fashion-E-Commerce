import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import axios from '../utils/axios';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get('search') || '';
    const categoryFilter = searchParams.get('category') || 'All';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = [
        { name: 'Ethnic Wear', discount: '50-80% OFF', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80' },
        { name: 'Casual Wear', discount: '40-80% OFF', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80' },
        { name: "Men's Activewear", discount: '30-70% OFF', img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80' },
        { name: "Women's Activewear", discount: '30-70% OFF', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80' },
        { name: 'Western Wear', discount: '40-80% OFF', img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80' },
        { name: 'Sportswear', discount: '30-80% OFF', img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&q=80' },
        { name: 'Loungewear', discount: '30-60% OFF', img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80' },
        { name: 'Innerwear', discount: 'UP TO 70% OFF', img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80' },
        { name: 'Lingerie', discount: 'UP TO 70% OFF', img: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&q=80' },
        { name: 'Watches', discount: 'UP TO 80% OFF', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
        { name: 'Grooming', discount: 'UP TO 60% OFF', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80' },
        { name: 'Beauty & Makeup', discount: 'UP TO 60% OFF', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80' },
        { name: 'Handbags', discount: '40-80% OFF', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80' },
        { name: 'Headphones', discount: 'UP TO 70% OFF', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
        { name: 'Jewellery', discount: 'UP TO 80% OFF', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80' },
        { name: 'Home Decor', discount: '40-70% OFF', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80' },
        { name: 'Footwear', discount: '30-70% OFF', img: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&q=80' },
        { name: 'Sunglasses', discount: 'UP TO 60% OFF', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80' },
    ];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            {/* Top Coupon Strip - Fixed below navbar */}
            <div className="fixed top-24 left-0 right-0 z-40 bg-gray-100 py-2 text-center border-b border-gray-200">
                <p className="text-sm font-medium text-gray-700">
                    FLAT <span className="font-bold text-gray-900">₹300 OFF</span> On Your 1st Purchase Via App!
                </p>
            </div>

            <div className="min-h-screen bg-white pt-32">

                {/* Black Friday Hero Section */}
                {categoryFilter === 'All' && !searchTerm && (
                    <div className="relative w-full h-[700px] bg-black overflow-hidden">
                        <img
                            src="/assets/banner-girl.jpg"
                            alt="Black Friday Sale"
                            className="absolute inset-0 w-full h-full object-cover object-top opacity-70"
                            style={{ objectPosition: 'center 20%' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
                            <div className="mb-4">
                                <img src="/assets/urban-logo.png" alt="URBAN" className="h-16 w-auto mx-auto mb-4" />
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-2 text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]">
                                BLACK <br /> FRIDAY
                            </h1>
                            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest mb-6 text-white drop-shadow-lg">
                                SALE <span className="text-yellow-400">NOV 26 - 30</span>
                            </h2>
                            <p className="text-xl md:text-2xl font-light mb-8 tracking-wide drop-shadow-md">
                                PRICES DOWN. SAVINGS UP. <br />
                                <span className="font-bold text-yellow-400">50-80% OFF</span>
                            </p>

                        </div>
                    </div>
                )}

                {/* Sponsored & Bank Offers */}
                <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 bg-[length:200%_100%] animate-gradient-x py-4 border-b border-orange-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-slide"></div>
                    <div className="container-custom flex flex-wrap justify-between items-center gap-4 text-sm text-gray-600 relative z-10">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">Sponsored By:</span>
                            <span className="font-serif text-xl tracking-widest text-black hover:scale-110 transition-transform inline-block">GUESS</span>
                            <span className="font-sans text-xl font-bold text-black tracking-wider ml-4 hover:scale-110 transition-transform inline-block">NEXT</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-red-600 animate-pulse text-base bg-red-50 px-3 py-1 rounded-full shadow-lg">10% Instant Discount*</span>
                            <span className="font-bold text-gray-800 hover:text-blue-600 hover:scale-110 transition-all cursor-pointer inline-block">BOBCARD</span>
                            <span className="font-bold text-gray-800 hover:text-red-600 hover:scale-110 transition-all cursor-pointer inline-block">HSBC</span>
                            <span className="font-bold text-gray-800 hover:text-blue-800 hover:scale-110 transition-all cursor-pointer inline-block">RBL BANK</span>
                        </div>
                    </div>
                </div>

                {/* Infinite Scrolling Offer Carousel */}
                {categoryFilter === 'All' && !searchTerm && (
                    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 mb-0 overflow-hidden relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

                        <h2 className="text-center text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-500 to-yellow-300 animate-shimmer uppercase tracking-widest mb-8 relative z-10 drop-shadow-lg flex items-center justify-center gap-4">
                            <span className="animate-bounce inline-block">🔥</span> Flash Deals <span className="animate-bounce inline-block" style={{ animationDelay: '0.2s' }}>🔥</span>
                        </h2>

                        <div className="relative">
                            <style>{`
                            @keyframes scroll {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-50%); }
                            }
                            @keyframes shimmer {
                                0% { background-position: 0% 50%; }
                                50% { background-position: 100% 50%; }
                                100% { background-position: 0% 50%; }
                            }
                            @keyframes shimmer-slide {
                                0% { transform: translateX(-100%); }
                                100% { transform: translateX(100%); }
                            }
                            @keyframes gradient-x {
                                0%, 100% { background-position: 0% 50%; }
                                50% { background-position: 100% 50%; }
                            }
                            .animate-scroll {
                                animation: scroll 30s linear infinite;
                            }
                            .animate-scroll:hover {
                                animation-play-state: paused;
                            }
                            .animate-shimmer {
                                background-size: 200% auto;
                                animation: shimmer 3s linear infinite;
                            }
                            .animate-shimmer-slide {
                                animation: shimmer-slide 3s linear infinite;
                            }
                            .animate-gradient-x {
                                animation: gradient-x 5s ease infinite;
                            }
                        `}</style>

                            <div className="flex animate-scroll">
                                {/* First set of cards */}
                                {[
                                    { title: 'Pretty Dresses', price: '599', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80', brand: 'fwd' },
                                    { title: 'Skirts & Shorts', price: '599', img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80', brand: 'fwd' },
                                    { title: 'Jeans & Trousers', price: '699', img: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400&q=80', brand: 'fwd' },
                                    { title: 'Kurta & Kurtis', price: '399', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80', brand: 'fwd' },
                                    { title: 'Glam Lipsticks', price: '199', img: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&q=80', brand: 'MARS' },
                                    { title: 'Men\'s Shirts', price: '499', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80', brand: 'fwd' },
                                    { title: 'Sneakers', price: '899', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80', brand: 'NIKE' },
                                    { title: 'Watches', price: '999', img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80', brand: 'TIMEX' },
                                ].map((deal, idx) => (
                                    <div key={`deal-1-${idx}`} className="flex-shrink-0 w-64 mx-3">
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                                            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                                                <img src={deal.img} alt={deal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                                    HOT DEAL
                                                </div>
                                            </div>
                                            <div className="p-4 bg-white">
                                                <div className="text-center mb-3">
                                                    <span className="text-3xl font-black italic" style={{ fontFamily: 'Impact, sans-serif' }}>{deal.brand}</span>
                                                </div>
                                                <div className="bg-black text-white py-3 px-4 rounded-lg text-center">
                                                    <div className="text-2xl font-black">UNDER ₹{deal.price}</div>
                                                    <div className="text-sm font-medium mt-1">{deal.title}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Duplicate set for seamless loop */}
                                {[
                                    { title: 'Pretty Dresses', price: '599', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80', brand: 'fwd' },
                                    { title: 'Skirts & Shorts', price: '599', img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80', brand: 'fwd' },
                                    { title: 'Jeans & Trousers', price: '699', img: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400&q=80', brand: 'fwd' },
                                    { title: 'Kurta & Kurtis', price: '399', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80', brand: 'fwd' },
                                    { title: 'Glam Lipsticks', price: '199', img: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&q=80', brand: 'MARS' },
                                    { title: 'Men\'s Shirts', price: '499', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80', brand: 'fwd' },
                                    { title: 'Sneakers', price: '899', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80', brand: 'NIKE' },
                                    { title: 'Watches', price: '999', img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80', brand: 'TIMEX' },
                                ].map((deal, idx) => (
                                    <div key={`deal-2-${idx}`} className="flex-shrink-0 w-64 mx-3">
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                                            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                                                <img src={deal.img} alt={deal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                                    HOT DEAL
                                                </div>
                                            </div>
                                            <div className="p-4 bg-white">
                                                <div className="text-center mb-3">
                                                    <span className="text-3xl font-black italic" style={{ fontFamily: 'Impact, sans-serif' }}>{deal.brand}</span>
                                                </div>
                                                <div className="bg-black text-white py-3 px-4 rounded-lg text-center">
                                                    <div className="text-2xl font-black">UNDER ₹{deal.price}</div>
                                                    <div className="text-sm font-medium mt-1">{deal.title}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div >
                )}

                {/* Shop By Category Header */}
                {
                    categoryFilter === 'All' && !searchTerm && (
                        <div className="bg-red-700 py-4 mb-8 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                            <h2 className="text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 uppercase tracking-widest drop-shadow-sm relative z-10">
                                Shop By Category
                            </h2>
                        </div>
                    )
                }

                {/* Category Grid */}
                {
                    categoryFilter === 'All' && !searchTerm && (
                        <div className="bg-white py-12 px-8">
                            <div className="w-full">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-full">
                                    {categories.map((cat) => (
                                        <Link to={`/?category=${cat.name}`} key={cat.name} className="group">
                                            <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                                <div className="relative aspect-[3/4] overflow-hidden">
                                                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                </div>
                                                <div className="bg-black text-white py-4 px-3 text-center">
                                                    <h3 className="font-bold text-sm uppercase mb-1 tracking-wide">{cat.name}</h3>
                                                    <div className="text-lg font-black">{cat.discount}</div>
                                                    <button className="mt-2 text-xs font-semibold uppercase tracking-wider hover:underline">
                                                        Shop Now
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Product Listing Section */}
                <div className="container-custom py-8" id="products">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide border-l-4 border-primary-500 pl-3">
                            {categoryFilter === 'All' ? (searchTerm ? `Search Results for "${searchTerm}"` : 'Trending Now') : `${categoryFilter} Collection`}
                        </h3>
                        <span className="text-gray-500 text-sm font-medium">{filteredProducts.length} Items</span>
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
                            {filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
};

export default Home;
