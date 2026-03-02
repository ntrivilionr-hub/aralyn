// --- LÓGICA DEL CARRITO ---
let cart = [];
const cartCountElement = document.getElementById('cart-count');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Función para agregar productos
function addToCart(name, price, image) {
    cart.push({ name, price, image });
    updateCart();
    alert(`✅ ¡${name} agregado al carrito!`);
}

// Función para actualizar la vista del carrito
function updateCart() {
    cartCountElement.innerText = cart.length;
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <p class="cart-item-title">${item.name}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <i class="fas fa-trash cart-item-remove" onclick="removeFromCart(${index})" style="cursor:pointer; color:#88URI_ENC; margin-left:10px;"></i>
        `;
        cartItemsElement.appendChild(cartItem);
    });

    cartTotalElement.innerText = `$${total.toFixed(2)}`;
}

// Función para remover productos
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Función para alternar el panel del carrito
function toggleCart() {
    document.getElementById('cart-panel').classList.toggle('open');
}

// Función de Checkout para enviar a WhatsApp
function checkout() {
    if (cart.length === 0) {
        alert("¡Tu carrito está vacío!");
        return;
    }

    let message = "Hola Aralayn! 🌸 Quiero hacer un pedido con los siguientes productos:%0A%0A";
    let total = 0;
    cart.forEach(item => {
        message += `- ${item.name} ($${item.price.toFixed(2)})%0A`;
        total += item.price;
    });
    message += `%0A*Total: $${total.toFixed(2)}*`;

    // Reemplaza con tu número real de Aralayn
    const whatsappNumber = "584246459URI_ENC"; 
    const finalUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;

    window.open(finalUrl, '_blank');
    cart = []; // Vaciar carrito
    updateCart();
    toggleCart();
}

// --- ANIMACIÓN DE APARECER AL BAJAR (Scroll Reveal) ---
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100; // px desde el borde inferior
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Ejecutar al cargar

// --- Función para la Newsletter (Llamada a la acción) ---
function suscribir() {
    const email = prompt("Maracaibo Skincare Tips: Ingresa tu correo electrónico para recibir tips exclusivos:");
    if (email) {
        alert(`¡Gracias! Revisa tu bandeja de entrada en: ${email}`);
    }
}