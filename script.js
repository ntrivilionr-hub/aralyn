// CONFIGURACIÓN DEL CARRITO
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartPanel = document.getElementById('cart-panel');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalContainer = document.getElementById('cart-total');

// Función para abrir/cerrar el carrito
function toggleCart() {
    cartPanel.classList.toggle('active');
}

// Función para añadir al carrito
function addToCart(name, price, image) {
    const item = { name, price, image };
    cart.push(item);
    updateCartUI();
    
    // Feedback visual rápido
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "¡Añadido! ✨";
    btn.style.background = "#25D366";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "var(--primary)";
    }, 1000);
}

// Actualizar la interfaz del carrito
function updateCartUI() {
    cartCount.innerText = cart.length;
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="50">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <i class="fas fa-trash" onclick="removeFromCart(${index})" style="cursor:pointer; color:#ff4d4d;"></i>
            </div>
        `;
    });

    cartTotalContainer.innerText = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// ==========================================
// FUNCIÓN PARA PAGAR POR WHATSAPP (LA QUE NECESITABAS)
// ==========================================
function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío. ¡Añade algunos productos de Aralayn!");
        return;
    }

    const telefono = "584246459365"; // Tu número de Aralayn Skincare
    let mensaje = "¡Hola Aralayn! 🌸 Quiero realizar el siguiente pedido:%0A%0A";
    
    let total = 0;
    cart.forEach((item, index) => {
        mensaje += `*${index + 1}.* ${item.name} - $${item.price.toFixed(2)}%0A`;
        total += item.price;
    });

    mensaje += `%0A*Total a pagar: $${total.toFixed(2)}*%0A%0A_¿Me indican los pasos para el pago?_`;

    // Abrir WhatsApp con el mensaje listo
    window.open(`https://api.whatsapp.com/send?phone=${telefono}&text=${mensaje}`, '_blank');
}

// Función simple para el boletín
function suscribir() {
    alert("¡Gracias por suscribirte! Pronto recibirás tips de skincare en tu correo. ✨");
}

// Animaciones al bajar (Scroll Reveal)
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(window => {
        const windowHeight = window.innerHeight;
        const revealTop = window.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            window.classList.add('active');
        }
    });
});
