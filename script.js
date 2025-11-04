// 🛍️ Product List
const products = [
    { id: 1, name: "Smartphone", price: 14999, img: "images/phone.jpg", category: "mobiles" },
    { id: 2, name: "Laptop", price: 49999, img: "images/laptop.jpg", category: "laptops" },
    { id: 3, name: "Smartwatch", price: 4999, img: "images/watch.jpg", category: "mobiles" },
    { id: 4, name: "Shoes", price: 1999, img: "images/shoes.jpg", category: "clothes" },
    { id: 5, name: "Television", price: 25999, img: "images/tv.jpg", category: "electronics" },
    { id: 6, name: "Bag", price: 999, img: "images/bag.jpg", category: "clothes" },
    { id: 7, name: "Camera", price: 29999, img: "images/camera.jpg", category: "electronics" },
    { id: 8, name: "Headphones", price: 1999, img: "images/headphones.jpg", category: "electronics" },
    { id: 9, name: "Perfume", price: 799, img: "images/perfume.jpg", category: "clothes" },
    { id: 10, name: "Table", price: 15999, img: "images/table.jpg", category: "furniture" }
];

// 🧱 Show Products on Home Page
function showProducts(items) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";

    // ✨ ADD DISCOUNT SECTION (Step 1)
    const discountBanner = document.createElement("div");
    discountBanner.classList.add("discount-banner");
    discountBanner.innerHTML = `
        <h2>🔥 Mega Offer: 50% OFF on Electronics!</h2>
        <p>Hurry up! Limited time offer ends soon ⏰</p>
    `;
    container.appendChild(discountBanner);

    // 🛒 SHOW PRODUCTS
    items.forEach((p, i) => {
        const card = document.createElement("div");
        card.classList.add("product", "product-item");
        card.setAttribute("data-category", p.category);

        // Add small animation delay (Step 2)
        card.style.animationDelay = `${i * 0.1}s`;

        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}" 
                 style="width:100%; height:200px; object-fit:cover; border-radius:10px;">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button class="addCartBtn" data-id="${p.id}">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}

// 🔍 Search Functionality
function handleSearch() {
    const query = document.getElementById("search").value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query)
    );
    showProducts(filtered);
}

document.getElementById("searchBtn").addEventListener("click", handleSearch);
document.getElementById("search").addEventListener("keyup", (e) => {
    if (e.key === "Enter") handleSearch();
});

// 🛒 Cart Functionality
let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

// 🧾 Order data store panna
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function updateCartCount() {
    document.getElementById("cartCount").textContent = cart.length;
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("addCartBtn")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        const product = products.find(p => p.id === id);
        if (product) {
            cart.push(product);
            alert(`${product.name} added to cart!`);
            updateCartCount();
            localStorage.setItem("cartItems", JSON.stringify(cart));
        }
    }
});

// ✅ Order confirm panna function
function placeOrder() {
    if (cart.length === 0) {
        alert("Cart is empty bro!");
        return;
    }

    const newOrder = {
        id: Date.now(),
        items: cart,
        date: new Date().toLocaleString()
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("✅ Order placed successfully!");
    cart = [];
    localStorage.removeItem("cartItems");
    updateCartCount();
}

// 🌙 Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        themeToggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
    });
}

// 🧩 Initialize Products
showProducts(products);
updateCartCount();

// 🧩 User login check
document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("flipUser");
    const isLogged = localStorage.getItem("isLoggedIn");

    const loginBtn = document.getElementById("loginBtn");
    const userProfile = document.getElementById("userProfile");
    const userName = document.getElementById("userName");

    if (isLogged === "true" && user) {
        if (loginBtn) loginBtn.style.display = "none";
        if (userProfile) userProfile.style.display = "inline";
        if (userName) userName.textContent = user;
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            alert("You have been logged out!");
            window.location.href = "login.html";
        });
    }
});

// ⏰ Flash Deal Countdown Timer
function startDealTimer(duration) {
    let timer = duration, hours, minutes, seconds;
    const display = document.getElementById("dealsTimer");

    const interval = setInterval(() => {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = `${hours}:${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "Expired!";
        }
    }, 1000);
}

// 🕒 Start 1-hour countdown (3600 sec)
startDealTimer(3600);

// 🧩 CATEGORY FILTER
const categoryButtons = document.querySelectorAll('.category-btn');

categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');
        filterProducts(category);
    });
});

function filterProducts(category) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";

    let filtered =
        category === "all"
            ? products
            : products.filter(p => p.category === category);

    showProducts(filtered);
}

// 🧩 Category Filter Functionality
document.addEventListener("DOMContentLoaded", () => {
    const categoryCards = document.querySelectorAll(".category-card");

    categoryCards.forEach(card => {
        card.addEventListener("click", () => {
            const category = card.querySelector("p").textContent.toLowerCase();

            let filtered = [];
            if (category === "mobiles") {
                filtered = products.filter(p => p.name.toLowerCase().includes("phone"));
            } else if (category === "laptops") {
                filtered = products.filter(p => p.name.toLowerCase().includes("laptop"));
            } else if (category === "fashion") {
                filtered = products.filter(p => p.name.toLowerCase().includes("shoes") || p.name.toLowerCase().includes("bag"));
            } else if (category === "electronics") {
                filtered = products.filter(p =>
                    p.name.toLowerCase().includes("tv") ||
                    p.name.toLowerCase().includes("camera") ||
                    p.name.toLowerCase().includes("headphones") ||
                    p.name.toLowerCase().includes("watch")
                );
            } else if (category === "furniture") {
                filtered = products.filter(p => p.name.toLowerCase().includes("table"));
            } else {
                filtered = products;
            }

            showProducts(filtered);
        });
    });
});

