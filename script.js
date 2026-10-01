/* =========================================
   QIM CLOTHES STORE
   ========================================= */


/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,
        name: "Premium Black T-Shirt",
        category: "Men",
        price: 25000,
        image: "https://placehold.co/600x700/111/fff?text=Black+T-Shirt"
    },

    {
        id: 2,
        name: "Classic White T-Shirt",
        category: "Men",
        price: 22000,
        image: "https://placehold.co/600x700/eee/111?text=White+T-Shirt"
    },

    {
        id: 3,
        name: "Oversized Hoodie",
        category: "Men",
        price: 45000,
        image: "https://placehold.co/600x700/555/fff?text=Hoodie"
    },

    {
        id: 4,
        name: "Ladies Fashion Dress",
        category: "Women",
        price: 55000,
        image: "https://placehold.co/600x700/d8b/fff?text=Fashion+Dress"
    },

    {
        id: 5,
        name: "Women's Casual Top",
        category: "Women",
        price: 30000,
        image: "https://placehold.co/600x700/e8d/111?text=Casual+Top"
    },

    {
        id: 6,
        name: "Classic Sneakers",
        category: "Shoes",
        price: 70000,
        image: "https://placehold.co/600x700/ddd/111?text=Sneakers"
    },

    {
        id: 7,
        name: "Urban Cap",
        category: "Accessories",
        price: 18000,
        image: "https://placehold.co/600x700/333/fff?text=Cap"
    },

    {
        id: 8,
        name: "Premium Jeans",
        category: "Men",
        price: 60000,
        image: "https://placehold.co/600x700/246/fff?text=Jeans"
    },

    {
        id: 9,
        name: "Ladies Handbag",
        category: "Accessories",
        price: 50000,
        image: "https://placehold.co/600x700/654/fff?text=Handbag"
    },

    {
        id: 10,
        name: "Sports Sneakers",
        category: "Shoes",
        price: 85000,
        image: "https://placehold.co/600x700/444/fff?text=Sports+Shoes"
    }

];


/* ================= CART ================= */

let cart = [];


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(list = products) {

    const container =
        document.getElementById("productsContainer");

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;">
                No products found.
            </p>
        `;

        return;
    }


    list.forEach(product => {

        container.innerHTML += `

            <div class="product-card">

                <img
                    src="${product.image}"
                    class="product-image"
                    alt="${product.name}"
                >

                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3 class="product-name">
                        ${product.name}
                    </h3>

                    <div class="product-price">
                        ${formatPrice(product.price)}
                    </div>

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;

    });

}


/* ================= PRICE FORMAT ================= */

function formatPrice(price) {

    return "TSh " +
        price.toLocaleString("en-TZ");

}


/* ================= ADD TO CART ================= */

function addToCart(id) {

    const product =
        products.find(p => p.id === id);

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCart();

    openCart();

}


/* ================= UPDATE CART ================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    let totalItems = 0;
    let totalPrice = 0;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center;padding:40px 0;">
                Your cart is empty.
            </p>
        `;

    }


    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;


        cartItems.innerHTML += `

            <div class="cart-product">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-product-info">

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ${formatPrice(item.price)}
                    </p>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                    <span
                        class="remove"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </span>

                </div>

            </div>

        `;

    });


    cartCount.innerText = totalItems;

    cartTotal.innerText =
        formatPrice(totalPrice);

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(product => product.id === id);


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(product => product.id !== id);

    }


    updateCart();

}


/* ================= REMOVE ================= */

function removeFromCart(id) {

    cart =
        cart.filter(product => product.id !== id);

    updateCart();

}


/* ================= OPEN CART ================= */

function openCart() {

    document
        .getElementById("cart")
        .classList.add("active");

    document
        .getElementById("cartOverlay")
        .style.display = "block";

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .style.display = "none";

}


/* ================= CHECKOUT ================= */

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    closeCart();

    renderCheckout();


    document
        .getElementById("checkoutModal")
        .classList.add("active");

}


/* ================= CLOSE CHECKOUT ================= */

function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("active");

}


/* ================= CHECKOUT SUMMARY ================= */

function renderCheckout() {

    const container =
        document.getElementById("checkoutItems");

    const total =
        document.getElementById("checkoutTotal");


    container.innerHTML = "";

    let totalPrice = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        totalPrice += itemTotal;


        container.innerHTML += `

            <div class="summary-row">

                <span>
                    ${item.name}
                    × ${item.quantity}
                </span>

                <strong>
                    ${formatPrice(itemTotal)}
                </strong>

            </div>

        `;

    });


    total.innerText =
        formatPrice(totalPrice);

}


/* ================= WHATSAPP ORDER ================= */

document
    .getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }


        const name =
            document
            .getElementById("customerName")
            .value.trim();


        const phone =
            document
            .getElementById("customerPhone")
            .value.trim();


        const location =
            document
            .getElementById("customerLocation")
            .value.trim();


        const notes =
            document
            .getElementById("customerNotes")
            .value.trim();


        let message =
            "🛍️ *NEW ORDER - QIM CLOTHES STORE*%0A%0A";


        message +=
            "*CUSTOMER DETAILS*%0A";

        message +=
            "Name: " + encodeURIComponent(name) + "%0A";

        message +=
            "Phone: " + encodeURIComponent(phone) + "%0A";

        message +=
            "Location: " + encodeURIComponent(location) + "%0A";


        if (notes) {

            message +=
                "Notes: " +
                encodeURIComponent(notes) +
                "%0A";

        }


        message +=
            "%0A*ORDER DETAILS*%0A";


        let total = 0;


        cart.forEach(item => {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;


            message +=
                "• " +
                encodeURIComponent(item.name) +
                " × " +
                item.quantity +
                " - " +
                encodeURIComponent(
                    formatPrice(itemTotal)
                ) +
                "%0A";

        });


        message +=
            "%0A*TOTAL: " +
            encodeURIComponent(
                formatPrice(total)
            ) +
            "*";


        /* QIM WhatsApp number */

        const whatsappNumber =
            "255794997737";


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            message;


        window.open(
            whatsappURL,
            "_blank"
        );

    });


/* ================= CATEGORY FILTER ================= */

function filterProducts(category) {

    if (category === "all") {

        displayProducts(products);

        return;
    }


    const filtered =
        products.filter(
            product =>
                product.category === category
        );


    displayProducts(filtered);

}


/* ================= SEARCH ================= */

function searchProducts() {

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    const filtered =
        products.filter(product =>

            product.name
            .toLowerCase()
            .includes(search)

            ||

            product.category
            .toLowerCase()
            .includes(search)

        );


    displayProducts(filtered);

}


/* ================= START WEBSITE ================= */

displayProducts();

updateCart();