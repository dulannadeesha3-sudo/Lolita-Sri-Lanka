/* ========================================
   LOLITA ECOMMERCE - MAIN APPLICATION
   ======================================== */

// PRODUCTS DATABASE
const products = [
    {
        id: 1,
        name: "Imperial Handcrafted Pure Silk Saree",
        category: "sarees",
        price: 45000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
        description: "Luxurious royal pure silk saree embellished with elegant gold zari embroidery work.",
        sizes: ["Standard"]
    },
    {
        id: 2,
        name: "Elegant Ivory Floral Linen Dress",
        category: "dresses",
        price: 14500,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80",
        description: "Premium breathable pure linen featuring delicate minimalist floral prints.",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 3,
        name: "Designer Handblock Print Kurti Set",
        category: "kurtis",
        price: 8900,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&w=600&q=80",
        description: "Crafted out of 100% fine cotton featuring custom organic handblock printing.",
        sizes: ["M", "L", "XL", "XXL"]
    },
    {
        id: 4,
        name: "Lolita Royal Pearl Choker Set",
        category: "accessories",
        price: 12000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
        description: "Signature pearl drop choker necklace set curated to complement traditional drapes.",
        sizes: ["One Size"]
    },
    {
        id: 5,
        name: "Heritage Sri Lankan Silk Batik Saree",
        category: "sarees",
        price: 38000,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
        description: "Stunning silk saree highlighting original handcrafted Sri Lankan batik print.",
        sizes: ["Standard"]
    },
    {
        id: 6,
        name: "Pastel Lavender Sunset Maxi Dress",
        category: "dresses",
        price: 16500,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
        description: "Ethereal lavender colored flowing maxi dress for tropical evenings.",
        sizes: ["S", "M", "L"]
    },
    {
        id: 7,
        name: "Kashmiri Aari Intricate Kurti",
        category: "kurtis",
        price: 11500,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=600&q=80",
        description: "Elegant traditional embroidery handwoven on premium cool georgette fabric.",
        sizes: ["M", "L", "XL"]
    },
    {
        id: 8,
        name: "Traditional Kundan Filigree Jhumkas",
        category: "accessories",
        price: 6500,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
        description: "Intricately finished premium Kundan jhumka statement earrings with dangling pearls.",
        sizes: ["One Size"]
    }
];

// STATE VARIABLES
let cart = [];
let wishlist = [];
let activeCategory = 'all';
let currentSlide = 0;
const totalSlides = 2;

// PAGE INITIALIZATION
window.onload = function() {
    renderProducts();
    updateSlider();
    setupAutoSlide();
};

// ========================================
// PRODUCT RENDERING
// ========================================

function renderProducts(productsList = products) {
    const grid = document.getElementById('productGrid');
    const countText = document.getElementById('productCountText');
    grid.innerHTML = "";

    if (productsList.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-16">
                <i class="fa-solid fa-hourglass-empty text-4xl text-brand-300"></i>
                <p class="text-brand-500 mt-4">We couldn't find matching items. Please try a different search!</p>
            </div>
        `;
        countText.innerText = "No items found";
        return;
    }

    productsList.forEach((prod, index) => {
        const isFavorited = wishlist.includes(prod.id);
        const heartClass = isFavorited ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart';
        
        const card = `
            <div class="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group border border-brand-100 flex flex-col justify-between" style="animation: slideInUp 0.6s ease-out ${index * 0.1}s both;">
                <div class="relative overflow-hidden bg-brand-50 aspect-3/4">
                    <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                    
                    <div class="absolute top-3 right-3 flex flex-col gap-2">
                        <button onclick="toggleWishlist(${prod.id})" class="w-9 h-9 rounded-full bg-white text-brand-800 flex items-center justify-center shadow-md hover:bg-brand-50 hover:text-red-500 transition-all">
                            <i class="${heartClass}"></i>
                        </button>
                        <button onclick="openQuickView(${prod.id})" class="w-9 h-9 rounded-full bg-white text-brand-800 flex items-center justify-center shadow-md hover:bg-brand-500 hover:text-white transition-all">
                            <i class="fa-solid fa-expand"></i>
                        </button>
                    </div>

                    <span class="absolute bottom-3 left-3 bg-brand-900/80 text-brand-100 text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full font-semibold backdrop-blur-xs">${prod.category}</span>
                </div>

                <div class="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-1.5">
                            <div class="flex items-center text-amber-500 text-xs">
                                <i class="fa-solid fa-star mr-1"></i>
                                <span class="font-bold text-brand-800">${prod.rating}</span>
                            </div>
                            <span class="text-xs text-brand-400 font-semibold">${prod.sizes.join(', ')}</span>
                        </div>
                        <h3 class="serif-font font-bold text-base text-brand-950 hover:text-brand-500 cursor-pointer" onclick="openQuickView(${prod.id})">${prod.name}</h3>
                        <p class="text-xs text-brand-500 mt-2 line-clamp-2">${prod.description}</p>
                    </div>

                    <div class="mt-4 pt-3 border-t border-brand-50 flex items-center justify-between">
                        <span class="font-bold text-lg text-brand-900">Rs. ${prod.price.toLocaleString('en-US')}</span>
                        <button onclick="addToCart(${prod.id}, '${prod.sizes[0]}')" class="bg-brand-100 text-brand-800 hover:bg-brand-500 hover:text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all uppercase flex items-center gap-1.5">
                            <i class="fa-solid fa-bag-shopping"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });

    countText.innerText = `Showing ${productsList.length} premium items`;
}

// ========================================
// FILTERING & SEARCHING
// ========================================

function filterCategory(category) {
    activeCategory = category;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-brand-500', 'text-white', 'shadow-sm');
        btn.classList.add('bg-white', 'text-brand-800', 'border', 'border-brand-200');
    });

    const activeBtn = document.getElementById(`btn-${category}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-brand-800', 'border', 'border-brand-200');
        activeBtn.classList.add('bg-brand-500', 'text-white', 'shadow-sm');
    }

    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    renderProducts(filtered);
}

function filterCategoryMobile(category) {
    filterCategory(category);
    toggleMobileMenu();
    scrollToProducts();
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

function searchProductsMobile() {
    const query = document.getElementById('mobileSearchInput').value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

function sortProducts() {
    const sortBy = document.getElementById('sortSelect').value;
    let currentList = [...products];

    if (activeCategory !== 'all') {
        currentList = currentList.filter(p => p.category === activeCategory);
    }

    if (sortBy === 'low-to-high') {
        currentList.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-to-low') {
        currentList.sort((a, b) => b.price - a.price);
    }

    renderProducts(currentList);
}

// ========================================
// NOTIFICATIONS
// ========================================

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `px-5 py-3.5 rounded-2xl text-white font-bold text-sm shadow-xl flex items-center space-x-3 transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-auto max-w-sm ${
        type === 'success' ? 'bg-brand-900 border border-brand-700' : 'bg-red-600'
    }`;
    
    const icon = type === 'success' 
        ? '<i class="fa-solid fa-circle-check text-accent"></i>' 
        : '<i class="fa-solid fa-circle-exclamation"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========================================
// HERO SLIDER
// ========================================

function updateSlider() {
    const slider = document.getElementById('heroSlider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.getElementById(`dot${i}`);
        if (i === currentSlide) {
            dot.classList.remove('bg-white/50');
            dot.classList.add('bg-white', 'w-6');
        } else {
            dot.classList.remove('bg-white', 'w-6');
            dot.classList.add('bg-white/50');
        }
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function setSlide(num) {
    currentSlide = num;
    updateSlider();
}

function setupAutoSlide() {
    setInterval(nextSlide, 7000);
}

// ========================================
// UI CONTROLS
// ========================================

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const content = document.getElementById('mobileMenuContent');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        setTimeout(() => {
            content.classList.remove('-translate-x-full');
        }, 10);
    } else {
        content.classList.add('-translate-x-full');
        setTimeout(() => {
            menu.classList.add('hidden');
        }, 300);
    }
}

function toggleMobileSearch() {
    const bar = document.getElementById('mobileSearchBar');
    bar.classList.toggle('hidden');
}

function toggleCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const content = document.getElementById('cartDrawerContent');
    if (drawer.classList.contains('hidden')) {
        drawer.classList.remove('hidden');
        setTimeout(() => {
            content.classList.remove('translate-x-full');
        }, 10);
        updateCartUI();
    } else {
        content.classList.add('translate-x-full');
        setTimeout(() => {
            drawer.classList.add('hidden');
        }, 300);
    }
}

function scrollToProducts() {
    document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// WISHLIST MANAGEMENT
// ========================================

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (index > -1) {
        wishlist.splice(index, 1);
        showToast(`Removed "${product.name}" from favorites.`);
    } else {
        wishlist.push(productId);
        showToast(`Added "${product.name}" to favorites!`);
    }

    updateWishlistUI();
    const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
    renderProducts(filtered);
}

function updateWishlistUI() {
    const badge = document.getElementById('wishlistCountBadge');
    if (badge) badge.innerText = wishlist.length;
}

function showWishlistModal() {
    const modal = document.getElementById('wishlistModal');
    const container = document.getElementById('wishlistItemsContainer');
    container.innerHTML = "";

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fa-regular fa-heart text-5xl text-brand-200 mb-4 block"></i>
                <p class="text-brand-500 font-semibold text-sm">Your Wishlist is empty.</p>
                <p class="text-brand-400 text-xs mt-1">Tap heart icons to save your favorites.</p>
            </div>
        `;
    } else {
        wishlist.forEach(id => {
            const prod = products.find(p => p.id === id);
            if (prod) {
                const itemHtml = `
                    <div class="flex items-center justify-between border-b border-brand-100 pb-3 last:border-0">
                        <div class="flex items-center space-x-3">
                            <img src="${prod.image}" alt="${prod.name}" class="w-12 h-16 object-cover rounded-lg bg-brand-50 border border-brand-100">
                            <div class="max-w-[180px]">
                                <h4 class="font-bold text-brand-900 text-sm truncate">${prod.name}</h4>
                                <p class="text-xs font-bold text-brand-600">Rs. ${prod.price.toLocaleString('en-US')}</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button onclick="addToCart(${prod.id}, '${prod.sizes[0]}'); closeWishlistModal();" class="bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all flex items-center gap-1">
                                <i class="fa-solid fa-bag-shopping"></i> Add
                            </button>
                            <button onclick="toggleWishlist(${prod.id}); showWishlistModal();" class="text-neutral-400 hover:text-red-500 p-1 transition-colors text-sm">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                `;
                container.innerHTML += itemHtml;
            }
        });
    }
    modal.classList.remove('hidden');
}

function closeWishlistModal() {
    document.getElementById('wishlistModal').classList.add('hidden');
}

// ========================================
// SHOPPING CART
// ========================================

function addToCart(productId, size) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.product.id === productId && item.size === size);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ product, size, quantity: 1 });
    }

    updateCartUI();
    showToast(`${product.name} added to bag!`);
}

function updateCartQuantity(productId, size, change) {
    const item = cart.find(i => i.product.id === productId && i.size === size);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => !(i.product.id === productId && i.size === size));
    }

    updateCartUI();
}

function removeItemFromCart(productId, size) {
    cart = cart.filter(i => !(i.product.id === productId && i.size === size));
    updateCartUI();
    showToast("Item removed from bag.");
}

function updateCartUI() {
    const itemsContainer = document.getElementById('cartDrawerItems');
    const badge = document.getElementById('cartCountBadge');
    const totalText = document.getElementById('cartTotalPrice');
    const discountText = document.getElementById('discountText');

    itemsContainer.innerHTML = "";
    let totalCount = 0;
    let subtotal = 0;

    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="text-center py-20 flex flex-col items-center">
                <i class="fa-solid fa-cart-shopping text-5xl text-brand-200 mb-4"></i>
                <p class="text-brand-500 font-semibold">Your bag is empty.</p>
                <button onclick="toggleCartDrawer(); scrollToProducts();" class="mt-4 bg-brand-500 text-white font-bold py-2.5 px-6 rounded-full text-xs uppercase transition-all hover:bg-brand-600">Start Shopping</button>
            </div>
        `;
        badge.innerText = "0";
        totalText.innerText = "LKR 0.00";
        discountText.innerText = "- LKR 0.00";
        return;
    }

    cart.forEach(item => {
        totalCount += item.quantity;
        const itemTotal = item.product.price * item.quantity;
        subtotal += itemTotal;

        const card = `
            <div class="flex items-center space-x-4 border-b border-brand-100 pb-4">
                <img src="${item.product.image}" alt="${item.product.name}" class="w-16 h-20 object-cover rounded-xl bg-brand-50 border border-brand-100">
                <div class="flex-grow">
                    <h4 class="font-bold text-brand-900 text-sm line-clamp-1">${item.product.name}</h4>
                    <p class="text-xs text-brand-500 mt-0.5">Size: ${item.size}</p>
                    <div class="flex items-center justify-between mt-2.5">
                        <div class="flex items-center border border-brand-200 rounded-lg overflow-hidden bg-white">
                            <button onclick="updateCartQuantity(${item.product.id}, '${item.size}', -1)" class="px-2 py-0.5 hover:bg-brand-50 text-xs font-bold text-brand-800"><i class="fa-solid fa-minus"></i></button>
                            <span class="px-3 py-0.5 text-xs font-bold text-brand-900 bg-vintage">${item.quantity}</span>
                            <button onclick="updateCartQuantity(${item.product.id}, '${item.size}', 1)" class="px-2 py-0.5 hover:bg-brand-50 text-xs font-bold text-brand-800"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <span class="font-bold text-brand-900 text-sm">Rs. ${itemTotal.toLocaleString('en-US')}</span>
                    </div>
                </div>
                <button onclick="removeItemFromCart(${item.product.id}, '${item.size}')" class="text-brand-300 hover:text-red-500 text-base"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        itemsContainer.insertAdjacentHTML('beforeend', card);
    });

    badge.innerText = totalCount;

    const discount = subtotal * 0.15;
    const finalTotal = subtotal - discount;

    discountText.innerText = `- LKR ${discount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    totalText.innerText = `LKR ${finalTotal.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

// ========================================
// CHECKOUT
// ========================================

function openCheckoutModal() {
    if (cart.length === 0) {
        showToast("Please add items to your cart first!", "error");
        return;
    }
    
    const totalText = document.getElementById('cartTotalPrice').innerText;
    document.getElementById('checkoutPaidAmount').innerText = totalText;

    toggleCartDrawer();
    document.getElementById('checkoutModal').classList.remove('hidden');
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.add('hidden');
    cart = []; 
    updateCartUI();
}

// ========================================
// QUICK VIEW
// ========================================

function openQuickView(productId) {
    const prod = products.find(p => p.id === productId);
    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');

    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
            <button onclick="closeQuickView()" class="absolute top-6 right-6 text-brand-800 hover:text-brand-500 text-2xl z-10"><i class="fa-solid fa-xmark"></i></button>
            
            <div class="rounded-2xl overflow-hidden bg-brand-50 aspect-3/4">
                <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover">
            </div>

            <div class="flex flex-col justify-between py-2">
                <div>
                    <div class="flex items-center text-amber-500 text-sm mb-2">
                        <i class="fa-solid fa-star mr-1"></i>
                        <span class="font-bold">${prod.rating} / 5.0</span>
                    </div>
                    <h2 class="serif-font text-2.5xl sm:text-3.5xl font-bold text-brand-950">${prod.name}</h2>
                    <p class="text-xs text-brand-400 mt-1 uppercase tracking-widest font-bold">${prod.category}</p>
                    <h3 class="text-2xl font-bold text-brand-900 mt-4">Rs. ${prod.price.toLocaleString('en-US')}</h3>
                    
                    <div class="h-[1px] bg-brand-100 my-5"></div>
                    
                    <p class="text-sm text-brand-600 leading-relaxed">${prod.description}</p>
                    
                    <div class="mt-6">
                        <label class="text-xs uppercase tracking-wider font-bold text-brand-500 block mb-2">Select Size:</label>
                        <div class="flex space-x-3" id="quickViewSizes">
                            ${prod.sizes.map((s, idx) => `
                                <button onclick="selectQuickViewSize(this)" class="size-select-btn px-4 py-2 text-xs font-bold rounded-lg border ${
                                    idx === 0 ? 'bg-brand-500 text-white border-brand-500' : 'bg-white text-brand-800 border-brand-200 hover:bg-brand-50'
                                }">${s}</button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="mt-8">
                    <button onclick="addQuickViewToCart(${prod.id})" class="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-full text-center tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2">
                        <i class="fa-solid fa-bag-shopping"></i> Add to Shopping Bag
                    </button>
                </div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.add('hidden');
}

function selectQuickViewSize(button) {
    document.querySelectorAll('.size-select-btn').forEach(btn => {
        btn.classList.remove('bg-brand-500', 'text-white', 'border-brand-500');
        btn.classList.add('bg-white', 'text-brand-800', 'border-brand-200', 'hover:bg-brand-50');
    });
    button.classList.remove('bg-white', 'text-brand-800', 'border-brand-200', 'hover:bg-brand-50');
    button.classList.add('bg-brand-500', 'text-white', 'border-brand-500');
}

function addQuickViewToCart(productId) {
    const activeSizeBtn = document.querySelector('.size-select-btn.bg-brand-500');
    const size = activeSizeBtn ? activeSizeBtn.innerText : "Standard";
    addToCart(productId, size);
    closeQuickView();
}

// ========================================
// CUSTOMER REVIEWS SECTION
// ========================================

const reviewsDatabase = [
    {
        id: 1,
        name: "Anita S.",
        title: "Verified Buyer",
        location: "Colombo",
        rating: 5,
        headline: "Absolutely stunning saree!",
        text: "The Imperial Silk Saree exceeded all my expectations. The fabric quality is premium and the gold zari work is impeccable. Perfect for my sister's wedding ceremony.",
        avatar: "AS",
        date: "2 weeks ago",
        helpful: 142,
        product: "Imperial Handcrafted Pure Silk Saree"
    },
    {
        id: 2,
        name: "Pooja M.",
        title: "Wedding Shopper",
        location: "Kandy",
        rating: 5,
        headline: "A masterpiece of elegance",
        text: "The rose gold zari embroidery on my wedding saree matched perfectly. The craftsmanship is exceptional and delivery was incredibly fast. Lolita truly understands luxury!",
        avatar: "PM",
        date: "1 month ago",
        helpful: 89,
        product: "Heritage Sri Lankan Silk Batik Saree"
    },
    {
        id: 3,
        name: "Rupesh D.",
        title: "Loyal Customer",
        location: "Galle",
        rating: 5,
        headline: "Premium experience from start to finish",
        text: "Super fast delivery and elegant premium packaging. The online support team is extremely cooperative and helpful. Best luxury fashion experience ever!",
        avatar: "RD",
        date: "3 weeks ago",
        helpful: 156,
        product: "Elegant Ivory Floral Linen Dress"
    },
    {
        id: 4,
        name: "Kavya N.",
        title: "Fashion Enthusiast",
        location: "Negombo",
        rating: 4,
        headline: "Stunning quality and design",
        text: "The saree colors are vibrant and the weaving is impeccable. I've already recommended Lolita to all my friends. Worth every penny spent!",
        avatar: "KN",
        date: "4 days ago",
        helpful: 67,
        product: "Heritage Sri Lankan Silk Batik Saree"
    },
    {
        id: 5,
        name: "Meera T.",
        title: "Party Planner",
        location: "Colombo",
        rating: 5,
        headline: "Perfect for special occasions",
        text: "The kurtis drape beautifully and the embroidery work is incredibly detailed. I purchased multiple pieces for my event clients and they loved it!",
        avatar: "MT",
        date: "1 week ago",
        helpful: 98,
        product: "Kashmiri Aari Intricate Kurti"
    },
    {
        id: 6,
        name: "Deepak L.",
        title: "Gift Buyer",
        location: "Matara",
        rating: 5,
        headline: "Luxury gift that impressed everyone",
        text: "Bought sarees for my wife and mother. Both loved the quality and design. The packaging made it feel extra special. Will definitely shop again!",
        avatar: "DL",
        date: "2 days ago",
        helpful: 45,
        product: "Imperial Handcrafted Pure Silk Saree"
    },
    {
        id: 7,
        name: "Nimmi K.",
        title: "Regular Customer",
        location: "Colombo",
        rating: 5,
        headline: "Best online fashion store in SL",
        text: "The variety and quality of collections are unmatched. Customer service is fantastic. I've been shopping here for months and never disappointed!",
        avatar: "NK",
        date: "1 week ago",
        helpful: 123,
        product: "Designer Handblock Print Kurti Set"
    },
    {
        id: 8,
        name: "Samantha R.",
        title: "Verified Buyer",
        location: "Colombo",
        rating: 4,
        headline: "Great quality, highly recommended",
        text: "The Ivory Linen Dress is so comfortable for this weather. The fabric breathes beautifully and looks elegant. Very happy with my purchase!",
        avatar: "SR",
        date: "3 days ago",
        helpful: 76,
        product: "Elegant Ivory Floral Linen Dress"
    },
    {
        id: 9,
        name: "Harini G.",
        title: "Jewelry Lover",
        location: "Colombo",
        rating: 5,
        headline: "Stunning accessory collection",
        text: "The Kundan jhumkas are absolutely beautiful and well-crafted. They arrive in a lovely box. Perfect for enhancing any traditional outfit!",
        avatar: "HG",
        date: "5 days ago",
        helpful: 52,
        product: "Traditional Kundan Filigree Jhumkas"
    }
];

let displayedReviews = 3;
let helpfulTracking = {};

// Initialize Reviews on Page Load
window.addEventListener('DOMContentLoaded', function() {
    renderReviews(displayedReviews);
    initializeHelpfulTracking();
    updateReviewStats();
});

// Render Reviews
function renderReviews(count) {
    const reviewsGrid = document.getElementById('reviewsGrid');
    if (!reviewsGrid) return;
    
    reviewsGrid.innerHTML = '';

    const reviewsToDisplay = reviewsDatabase.slice(0, count);

    reviewsToDisplay.forEach((review, index) => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        
        const starClass = `${review.rating}-stars`;

        reviewCard.innerHTML = `
            <div>
                <div class="review-meta">
                    <div class="star-rating ${starClass}"></div>
                    <span class="text-brand-400 font-semibold">${review.date}</span>
                </div>
                
                <span class="verified-badge">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    Verified Purchase
                </span>

                <h4 class="review-headline">${review.headline}</h4>
                <p class="review-text">${review.text}</p>
            </div>

            <div>
                <div class="customer-info">
                    <div class="customer-avatar">${review.avatar}</div>
                    <div>
                        <div class="customer-name">${review.name}</div>
                        <div class="customer-title">${review.title}</div>
                    </div>
                </div>

                <div class="review-actions">
                    <button onclick="markHelpful(${review.id})" id="helpful-btn-${review.id}" class="review-action-btn" title="Mark as helpful">
                        👍 <span id="helpful-count-${review.id}">${review.helpful}</span>
                    </button>
                    <button onclick="reportReview(${review.id})" class="review-action-btn report" title="Report review">
                        ⚠️ Report
                    </button>
                </div>
            </div>
        `;

        reviewsGrid.appendChild(reviewCard);
    });

    // Update Load More Button
    updateLoadMoreButton();
}

// Update Load More Button
function updateLoadMoreButton() {
    const btn = document.getElementById('loadMoreBtn');
    if (!btn) return;
    
    if (displayedReviews >= reviewsDatabase.length) {
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
        btn.innerText = 'All Reviews Loaded';
    } else {
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
        btn.innerText = 'Load More Reviews';
    }
}

// Load More Reviews
function loadMoreReviews() {
    displayedReviews += 3;
    renderReviews(displayedReviews);
    showReviewToast('✓ More reviews loaded!');
    
    // Scroll to reviews section
    setTimeout(() => {
        document.getElementById('customerReviews').scrollIntoView({ behavior: 'smooth' });
    }, 200);
}

// Mark Review as Helpful
function markHelpful(reviewId) {
    const btn = document.getElementById(`helpful-btn-${reviewId}`);
    const countSpan = document.getElementById(`helpful-count-${reviewId}`);
    const review = reviewsDatabase.find(r => r.id === reviewId);

    if (!review) return;

    if (!helpfulTracking[reviewId]) {
        helpfulTracking[reviewId] = true;
        review.helpful += 1;
        countSpan.textContent = review.helpful;
        btn.classList.add('active');
        showReviewToast(`✓ Thank you! Review marked as helpful.`);
    } else {
        helpfulTracking[reviewId] = false;
        review.helpful -= 1;
        countSpan.textContent = review.helpful;
        btn.classList.remove('active');
        showReviewToast(`Review helpful mark removed.`);
    }
}

// Report Review
function reportReview(reviewId) {
    const review = reviewsDatabase.find(r => r.id === reviewId);
    if (!review) return;
    
    showReviewToast(`✓ Thank you! Review reported.`);
    console.log(`Review ${reviewId} reported by user`);
}

// Initialize Helpful Tracking
function initializeHelpfulTracking() {
    reviewsDatabase.forEach(review => {
        helpfulTracking[review.id] = false;
    });
}

// Toast Notification
function showReviewToast(message) {
    const toast = document.getElementById('reviewToast');
    const toastText = document.getElementById('reviewToastText');
    if (!toast) return;
    
    toastText.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Update Review Stats
function updateReviewStats() {
    const avgRatingEl = document.getElementById('avgRating');
    const totalReviewsEl = document.getElementById('totalReviews');
    
    if (!avgRatingEl || !totalReviewsEl) return;

    const totalRating = reviewsDatabase.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = (totalRating / reviewsDatabase.length).toFixed(1);
    const totalReviews = reviewsDatabase.length;

    avgRatingEl.textContent = avgRating;
    totalReviewsEl.textContent = totalReviews.toLocaleString();
}

// Filter Reviews by Rating
function filterByRating(rating) {
    const filtered = reviewsDatabase.filter(review => review.rating >= rating);
    displayedReviews = Math.min(3, filtered.length);
    
    const grid = document.getElementById('reviewsGrid');
    if (grid) {
        grid.innerHTML = '';
        filtered.slice(0, displayedReviews).forEach((review, index) => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            const starClass = `${review.rating}-stars`;

            reviewCard.innerHTML = `
                <div>
                    <div class="review-meta">
                        <div class="star-rating ${starClass}"></div>
                        <span class="text-brand-400 font-semibold">${review.date}</span>
                    </div>
                    
                    <span class="verified-badge">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        Verified Purchase
                    </span>

                    <h4 class="review-headline">${review.headline}</h4>
                    <p class="review-text">${review.text}</p>
                </div>

                <div>
                    <div class="customer-info">
                        <div class="customer-avatar">${review.avatar}</div>
                        <div>
                            <div class="customer-name">${review.name}</div>
                            <div class="customer-title">${review.title}</div>
                        </div>
                    </div>

                    <div class="review-actions">
                        <button onclick="markHelpful(${review.id})" id="helpful-btn-${review.id}" class="review-action-btn" title="Mark as helpful">
                            👍 <span id="helpful-count-${review.id}">${review.helpful}</span>
                        </button>
                        <button onclick="reportReview(${review.id})" class="review-action-btn report" title="Report review">
                            ⚠️ Report
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(reviewCard);
        });
    }
}

// Search Reviews
function searchReviews(query) {
    const filtered = reviewsDatabase.filter(review => 
        review.text.toLowerCase().includes(query.toLowerCase()) ||
        review.name.toLowerCase().includes(query.toLowerCase()) ||
        review.headline.toLowerCase().includes(query.toLowerCase())
    );
    displayedReviews = filtered.length;
    
    const grid = document.getElementById('reviewsGrid');
    if (grid) {
        grid.innerHTML = '';
        filtered.forEach((review, index) => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            const starClass = `${review.rating}-stars`;

            reviewCard.innerHTML = `
                <div>
                    <div class="review-meta">
                        <div class="star-rating ${starClass}"></div>
                        <span class="text-brand-400 font-semibold">${review.date}</span>
                    </div>
                    
                    <span class="verified-badge">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        Verified Purchase
                    </span>

                    <h4 class="review-headline">${review.headline}</h4>
                    <p class="review-text">${review.text}</p>
                </div>

                <div>
                    <div class="customer-info">
                        <div class="customer-avatar">${review.avatar}</div>
                        <div>
                            <div class="customer-name">${review.name}</div>
                            <div class="customer-title">${review.title}</div>
                        </div>
                    </div>

                    <div class="review-actions">
                        <button onclick="markHelpful(${review.id})" id="helpful-btn-${review.id}" class="review-action-btn">
                            👍 <span id="helpful-count-${review.id}">${review.helpful}</span>
                        </button>
                        <button onclick="reportReview(${review.id})" class="review-action-btn report">
                            ⚠️ Report
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(reviewCard);
        });
    }
}

// ========================================
// NEWSLETTER
// ========================================

function subscribeNewsletter(event) {
    event.preventDefault();
    showToast("Successfully subscribed to newsletter. Thank you!");
    event.target.reset();
}
