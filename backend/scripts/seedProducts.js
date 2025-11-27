const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const connectDB = require('../config/db');

dotenv.config();

const products = [
    // ETHNIC WEAR
    {
        name: "Maroon Embroidered Anarkali Kurta",
        price: 2499,
        description: "Maroon and gold-toned embroidered anarkali kurta with trousers and dupatta.",
        category: "Ethnic Wear",
        imageURL: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=750&fit=crop"
    },
    {
        name: "Teal Blue Printed Saree",
        price: 1899,
        description: "Teal blue and gold-toned printed saree with blouse piece.",
        category: "Ethnic Wear",
        imageURL: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=750&fit=crop"
    },
    {
        name: "Pink Silk Lehenga Choli",
        price: 3999,
        description: "Beautiful pink silk lehenga with embroidered choli and dupatta.",
        category: "Ethnic Wear",
        imageURL: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&h=750&fit=crop"
    },
    {
        name: "Green Bandhani Kurta Set",
        price: 1799,
        description: "Traditional green bandhani printed kurta with palazzo and dupatta.",
        category: "Ethnic Wear",
        imageURL: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&h=750&fit=crop"
    },

    // CASUAL WEAR
    {
        name: "Men Olive Green Casual Shirt",
        price: 1299,
        description: "Olive green solid casual shirt, has a spread collar, long sleeves.",
        category: "Casual Wear",
        imageURL: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=750&fit=crop"
    },
    {
        name: "Men Beige Chinos",
        price: 1599,
        description: "Beige solid tapered fit chinos, has a button and zip closure.",
        category: "Casual Wear",
        imageURL: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=750&fit=crop"
    },
    {
        name: "Men Blue Denim Jacket",
        price: 2299,
        description: "Classic blue denim jacket with button closure and chest pockets.",
        category: "Casual Wear",
        imageURL: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=750&fit=crop"
    },
    {
        name: "Women Striped T-Shirt",
        price: 799,
        description: "Comfortable striped cotton t-shirt for everyday wear.",
        category: "Casual Wear",
        imageURL: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=750&fit=crop"
    },

    // MEN'S ACTIVEWEAR
    {
        name: "Men Grey Running T-shirt",
        price: 899,
        description: "Grey solid running t-shirt, has a round neck, short sleeves.",
        category: "Men's Activewear",
        imageURL: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=750&fit=crop"
    },
    {
        name: "Men Black Joggers",
        price: 1499,
        description: "Black solid joggers, has an elasticated waistband with drawstring.",
        category: "Men's Activewear",
        imageURL: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=750&fit=crop"
    },
    {
        name: "Men Blue Training Shorts",
        price: 799,
        description: "Breathable blue training shorts with moisture-wicking fabric.",
        category: "Men's Activewear",
        imageURL: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=750&fit=crop"
    },
    {
        name: "Men Compression Tank Top",
        price: 1099,
        description: "Black compression tank top for intense workouts.",
        category: "Men's Activewear",
        imageURL: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=500&h=750&fit=crop"
    },

    // WOMEN'S ACTIVEWEAR
    {
        name: "Women Pink Sports Bra",
        price: 999,
        description: "Pink solid sports bra, has a racerback.",
        category: "Women's Activewear",
        imageURL: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=750&fit=crop"
    },
    {
        name: "Women Black Tights",
        price: 1299,
        description: "Black solid tights, has an elasticated waistband.",
        category: "Women's Activewear",
        imageURL: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=500&h=750&fit=crop"
    },
    {
        name: "Women Purple Yoga Set",
        price: 2199,
        description: "Complete purple yoga set with sports bra and high-waist leggings.",
        category: "Women's Activewear",
        imageURL: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=750&fit=crop"
    },
    {
        name: "Women Running Tank Top",
        price: 899,
        description: "Lightweight running tank top with mesh panels.",
        category: "Women's Activewear",
        imageURL: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=750&fit=crop"
    },

    // WESTERN WEAR
    {
        name: "Women Black Floral Dress",
        price: 2199,
        description: "Black and pink floral print fit and flare dress.",
        category: "Western Wear",
        imageURL: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=750&fit=crop"
    },
    {
        name: "Women White Shirt",
        price: 1199,
        description: "White solid casual shirt, has a spread collar, long sleeves.",
        category: "Western Wear",
        imageURL: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=500&h=750&fit=crop"
    },
    {
        name: "Women Blue Skinny Jeans",
        price: 1899,
        description: "Classic blue skinny fit jeans with stretch fabric.",
        category: "Western Wear",
        imageURL: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500&h=750&fit=crop"
    },
    {
        name: "Women Red Blazer",
        price: 2799,
        description: "Elegant red blazer perfect for formal occasions.",
        category: "Western Wear",
        imageURL: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&h=750&fit=crop"
    },
    {
        name: "Women Beige Trench Coat",
        price: 3499,
        description: "Classic beige trench coat with belt.",
        category: "Western Wear",
        imageURL: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&h=750&fit=crop"
    },

    // SPORTSWEAR
    {
        name: "Unisex Red Track Jacket",
        price: 2499,
        description: "Red solid track jacket, has a mock collar, zip closure.",
        category: "Sportswear",
        imageURL: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=750&fit=crop"
    },
    {
        name: "Unisex Black Tracksuit",
        price: 3299,
        description: "Complete black tracksuit with jacket and pants.",
        category: "Sportswear",
        imageURL: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=750&fit=crop"
    },
    {
        name: "Sports Windbreaker Jacket",
        price: 1999,
        description: "Lightweight windbreaker jacket for outdoor sports.",
        category: "Sportswear",
        imageURL: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&h=750&fit=crop"
    },

    // LOUNGEWEAR
    {
        name: "Women Grey Lounge Set",
        price: 1699,
        description: "Grey printed lounge set, has a t-shirt and pyjamas.",
        category: "Loungewear",
        imageURL: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=750&fit=crop"
    },
    {
        name: "Men Navy Blue Pajama Set",
        price: 1499,
        description: "Comfortable navy blue pajama set for relaxing at home.",
        category: "Loungewear",
        imageURL: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=750&fit=crop"
    },
    {
        name: "Women Pink Satin Nightwear",
        price: 1899,
        description: "Luxurious pink satin nightwear set.",
        category: "Loungewear",
        imageURL: "https://images.unsplash.com/photo-1616150840032-f9c9f5d0c401?w=500&h=750&fit=crop"
    },

    // INNERWEAR
    {
        name: "Men Pack of 3 Boxers",
        price: 999,
        description: "Pack of 3 assorted printed boxers.",
        category: "Innerwear",
        imageURL: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&h=750&fit=crop"
    },
    {
        name: "Men Pack of 5 Vests",
        price: 799,
        description: "Pack of 5 white cotton vests.",
        category: "Innerwear",
        imageURL: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=750&fit=crop"
    },
    {
        name: "Men Thermal Innerwear Set",
        price: 1499,
        description: "Warm thermal innerwear set for winter.",
        category: "Innerwear",
        imageURL: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=750&fit=crop"
    },

    // LINGERIE
    {
        name: "Women Red Lace Bra",
        price: 899,
        description: "Red lace non-wired lightly padded bra.",
        category: "Lingerie",
        imageURL: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=750&fit=crop"
    },
    {
        name: "Women Black Push-Up Bra",
        price: 999,
        description: "Black push-up bra with underwire support.",
        category: "Lingerie",
        imageURL: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=750&fit=crop"
    },
    {
        name: "Women Nude T-Shirt Bra",
        price: 799,
        description: "Seamless nude t-shirt bra for everyday wear.",
        category: "Lingerie",
        imageURL: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=500&h=750&fit=crop"
    },

    // WATCHES
    {
        name: "Men Black Chronograph Watch",
        price: 4999,
        description: "Black chronograph watch with leather strap.",
        category: "Watches",
        imageURL: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=750&fit=crop"
    },
    {
        name: "Women Rose Gold Watch",
        price: 3499,
        description: "Rose gold-toned analogue watch.",
        category: "Watches",
        imageURL: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=750&fit=crop"
    },
    {
        name: "Men Silver Smart Watch",
        price: 8999,
        description: "Silver smart watch with fitness tracking features.",
        category: "Watches",
        imageURL: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=750&fit=crop"
    },
    {
        name: "Women Diamond Studded Watch",
        price: 6999,
        description: "Elegant watch with diamond-studded dial.",
        category: "Watches",
        imageURL: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=500&h=750&fit=crop"
    },

    // GROOMING
    {
        name: "Men Grooming Kit",
        price: 1999,
        description: "Essential grooming kit for men.",
        category: "Grooming",
        imageURL: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&h=750&fit=crop"
    },
    {
        name: "Men Beard Trimmer",
        price: 2499,
        description: "Professional beard trimmer with multiple length settings.",
        category: "Grooming",
        imageURL: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=750&fit=crop"
    },
    {
        name: "Men Hair Styling Wax",
        price: 599,
        description: "Strong hold hair styling wax.",
        category: "Grooming",
        imageURL: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=750&fit=crop"
    },

    // BEAUTY & MAKEUP
    {
        name: "Matte Red Lipstick",
        price: 799,
        description: "Long-lasting matte red lipstick.",
        category: "Beauty & Makeup",
        imageURL: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=750&fit=crop"
    },
    {
        name: "Eyeshadow Palette",
        price: 1499,
        description: "12-color eyeshadow palette.",
        category: "Beauty & Makeup",
        imageURL: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=750&fit=crop"
    },
    {
        name: "Foundation & Concealer Set",
        price: 1899,
        description: "Complete foundation and concealer set for flawless skin.",
        category: "Beauty & Makeup",
        imageURL: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=750&fit=crop"
    },
    {
        name: "Makeup Brush Set",
        price: 1299,
        description: "Professional 12-piece makeup brush set.",
        category: "Beauty & Makeup",
        imageURL: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=500&h=750&fit=crop"
    },

    // HANDBAGS
    {
        name: "Women Tan Tote Bag",
        price: 2299,
        description: "Tan solid tote bag with zip closure.",
        category: "Handbags",
        imageURL: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=750&fit=crop"
    },
    {
        name: "Women Black Leather Handbag",
        price: 2999,
        description: "Premium black leather handbag with gold hardware.",
        category: "Handbags",
        imageURL: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=750&fit=crop"
    },
    {
        name: "Women Crossbody Bag",
        price: 1799,
        description: "Compact crossbody bag perfect for everyday use.",
        category: "Handbags",
        imageURL: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=750&fit=crop"
    },

    // HEADPHONES
    {
        name: "Wireless Over-Ear Headphones",
        price: 3999,
        description: "Black wireless over-ear headphones with noise cancellation.",
        category: "Headphones",
        imageURL: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=750&fit=crop"
    },
    {
        name: "True Wireless Earbuds",
        price: 2999,
        description: "Compact true wireless earbuds with charging case.",
        category: "Headphones",
        imageURL: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=750&fit=crop"
    },
    {
        name: "Gaming Headset",
        price: 4499,
        description: "RGB gaming headset with surround sound.",
        category: "Headphones",
        imageURL: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500&h=750&fit=crop"
    },

    // JEWELLERY
    {
        name: "Gold-Plated Necklace Set",
        price: 1299,
        description: "Gold-plated necklace with matching earrings.",
        category: "Jewellery",
        imageURL: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=750&fit=crop"
    },
    {
        name: "Silver Bracelet",
        price: 899,
        description: "Elegant silver bracelet with intricate design.",
        category: "Jewellery",
        imageURL: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=750&fit=crop"
    },
    {
        name: "Diamond Earrings",
        price: 4999,
        description: "Stunning diamond stud earrings.",
        category: "Jewellery",
        imageURL: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=750&fit=crop"
    },

    // HOME DECOR
    {
        name: "Ceramic Flower Vase",
        price: 699,
        description: "White ceramic flower vase.",
        category: "Home Decor",
        imageURL: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&h=750&fit=crop"
    },
    {
        name: "Decorative Wall Art",
        price: 1499,
        description: "Modern abstract wall art for living room.",
        category: "Home Decor",
        imageURL: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&h=750&fit=crop"
    },
    {
        name: "Scented Candle Set",
        price: 899,
        description: "Set of 3 aromatic scented candles.",
        category: "Home Decor",
        imageURL: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&h=750&fit=crop"
    },

    // FOOTWEAR
    {
        name: "Men Black Formal Shoes",
        price: 2499,
        description: "Classic black leather formal shoes.",
        category: "Footwear",
        imageURL: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&h=750&fit=crop"
    },
    {
        name: "Women White Sneakers",
        price: 1999,
        description: "Comfortable white sneakers for everyday wear.",
        category: "Footwear",
        imageURL: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=750&fit=crop"
    },
    {
        name: "Men Running Shoes",
        price: 2799,
        description: "Lightweight running shoes with cushioned sole.",
        category: "Footwear",
        imageURL: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=750&fit=crop"
    },
    {
        name: "Women High Heels",
        price: 2199,
        description: "Elegant black high heels for formal occasions.",
        category: "Footwear",
        imageURL: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=750&fit=crop"
    },

    // SUNGLASSES
    {
        name: "Men Aviator Sunglasses",
        price: 1499,
        description: "Classic aviator sunglasses with UV protection.",
        category: "Sunglasses",
        imageURL: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=750&fit=crop"
    },
    {
        name: "Women Cat-Eye Sunglasses",
        price: 1299,
        description: "Stylish cat-eye sunglasses.",
        category: "Sunglasses",
        imageURL: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=750&fit=crop"
    },
    {
        name: "Unisex Wayfarer Sunglasses",
        price: 1199,
        description: "Trendy wayfarer style sunglasses.",
        category: "Sunglasses",
        imageURL: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=750&fit=crop"
    },

    // MEN CATEGORY
    {
        name: "Men Black Leather Jacket",
        price: 3999,
        description: "Premium black leather jacket for men.",
        category: "Men",
        imageURL: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=750&fit=crop"
    },
    {
        name: "Men Blue Formal Shirt",
        price: 1499,
        description: "Classic blue formal shirt for office wear.",
        category: "Men",
        imageURL: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=750&fit=crop"
    },
    {
        name: "Men Grey Suit",
        price: 5999,
        description: "Elegant grey suit for formal occasions.",
        category: "Men",
        imageURL: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=750&fit=crop"
    },
    {
        name: "Men Brown Boots",
        price: 2999,
        description: "Stylish brown leather boots.",
        category: "Men",
        imageURL: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&h=750&fit=crop"
    },

    // WOMEN CATEGORY
    {
        name: "Women Red Evening Gown",
        price: 4999,
        description: "Stunning red evening gown for special occasions.",
        category: "Women",
        imageURL: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&h=750&fit=crop"
    },
    {
        name: "Women Denim Jacket",
        price: 1999,
        description: "Classic denim jacket for casual outings.",
        category: "Women",
        imageURL: "https://images.unsplash.com/photo-1578932750355-5eb30ece487a?w=500&h=750&fit=crop"
    },
    {
        name: "Women Floral Maxi Dress",
        price: 2499,
        description: "Beautiful floral print maxi dress.",
        category: "Women",
        imageURL: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=750&fit=crop"
    },
    {
        name: "Women Black Ankle Boots",
        price: 2299,
        description: "Trendy black ankle boots.",
        category: "Women",
        imageURL: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=750&fit=crop"
    },

    // KIDS CATEGORY
    {
        name: "Kids Blue T-Shirt",
        price: 599,
        description: "Comfortable cotton t-shirt for kids.",
        category: "Kids",
        imageURL: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&h=750&fit=crop"
    },
    {
        name: "Kids Pink Dress",
        price: 899,
        description: "Adorable pink dress for girls.",
        category: "Kids",
        imageURL: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&h=750&fit=crop"
    },
    {
        name: "Kids Denim Jeans",
        price: 799,
        description: "Durable denim jeans for kids.",
        category: "Kids",
        imageURL: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&h=750&fit=crop"
    },
    {
        name: "Kids Sneakers",
        price: 1299,
        description: "Comfortable sneakers for active kids.",
        category: "Kids",
        imageURL: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&h=750&fit=crop"
    },

    // HOME CATEGORY
    {
        name: "Decorative Cushion Set",
        price: 1499,
        description: "Set of 4 decorative cushions for your living room.",
        category: "Home",
        imageURL: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=750&fit=crop"
    },
    {
        name: "Table Lamp",
        price: 1999,
        description: "Modern table lamp with adjustable brightness.",
        category: "Home",
        imageURL: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=750&fit=crop"
    },
    {
        name: "Wall Clock",
        price: 899,
        description: "Elegant wall clock for home decor.",
        category: "Home",
        imageURL: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&h=750&fit=crop"
    },
    {
        name: "Bedsheet Set",
        price: 2499,
        description: "Premium cotton bedsheet set with pillow covers.",
        category: "Home",
        imageURL: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=750&fit=crop"
    },

    // BEAUTY CATEGORY
    {
        name: "Facial Cleanser",
        price: 799,
        description: "Gentle facial cleanser for all skin types.",
        category: "Beauty",
        imageURL: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=750&fit=crop"
    },
    {
        name: "Hair Serum",
        price: 999,
        description: "Nourishing hair serum for smooth and shiny hair.",
        category: "Beauty",
        imageURL: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=750&fit=crop"
    },
    {
        name: "Face Mask Set",
        price: 1299,
        description: "Set of 5 different face masks for skincare.",
        category: "Beauty",
        imageURL: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=750&fit=crop"
    },
    {
        name: "Perfume",
        price: 2999,
        description: "Luxury perfume with long-lasting fragrance.",
        category: "Beauty",
        imageURL: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=750&fit=crop"
    },

    // Additional Ethnic Wear Products
    {
        name: "Royal Blue Silk Saree",
        price: 2799,
        description: "Elegant royal blue silk saree with golden border.",
        category: "Ethnic Wear",
        imageURL: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=750&fit=crop"
    },
    {
        name: "Yellow Floral Kurta Set",
        price: 1999,
        description: "Beautiful yellow floral printed kurta with palazzo and dupatta.",
        category: "Ethnic Wear",
        imageURL: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&h=750&fit=crop"
    }
];

const seedProducts = async () => {
    try {
        await connectDB();

        // Clear existing products
        await Product.deleteMany({});
        console.log('Existing products removed');

        // Insert new products
        await Product.insertMany(products);
        console.log('Data Imported Successfully!');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedProducts();
