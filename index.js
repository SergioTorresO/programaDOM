import { getCart, saveCart, updateCartCountUI } from './funtions/cart.js';
import { renderProducts, createAddButton, createControls } from './elements/product_card.js';
import { products } from './data/products_data.js';

// Renderizar productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});

const addToCart = document.querySelector('.products_container');
//kevin es mk
addToCart.addEventListener('click', (event) => {
    if (event.target.classList.contains('add_to_cart')) {
        const productCardEl = event.target.closest('.product_card');
        const productNameEl = productCardEl ? productCardEl.querySelector('h3') : null;
        const productData = products.find(p => p.name === (productNameEl ? productNameEl.textContent : ''));
        if (!productData) return;

        const cart = getCart();
        const existing = cart.find(item => item.id === productData.id);

        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            // Añadir al carrito en el almacenamiento
            cart.push({
                id: productData.id,
                name: productData.name,
                price: productData.price,
                quantity: 1
            });
        }

        // Actualizar UI del botón
        const controls = createControls();
        productCardEl.replaceChild(controls, event.target);

        saveCart(cart);
        updateCartCountUI();

        console.log(`Añadido al carrito: ${productData.name}`);
    }
    else if (event.target.classList.contains('increase_btn')) {
        const productCardEl = event.target.closest('.product_card');
        const productNameEl = productCardEl ? productCardEl.querySelector('h3') : null;
        const productData = products.find(p => p.name === (productNameEl ? productNameEl.textContent : ''));
        if (!productData) return;

        const cart = getCart();
        const item = cart.find(i => i.id === productData.id);
        if (item) {
            item.quantity = (item.quantity || 1) + 1;
            saveCart(cart);
            const qtySpan = productCardEl.querySelector('.cart_qty');
            if (qtySpan) qtySpan.textContent = item.quantity;
            updateCartCountUI();
        }
    }
    else if (event.target.classList.contains('decrease_btn')) {
        const productCardEl = event.target.closest('.product_card');
        const productNameEl = productCardEl ? productCardEl.querySelector('h3') : null;
        const productData = products.find(p => p.name === (productNameEl ? productNameEl.textContent : ''));
        if (!productData) return;
        const cart = getCart();
        const itemIndex = cart.findIndex(i => i.id === productData.id);
        if (itemIndex > -1) {
            const item = cart[itemIndex];
            item.quantity = (item.quantity || 1) - 1;
            if (item.quantity <= 0) {
                cart.splice(itemIndex, 1);
                const addButton = createAddButton();
                productCardEl.replaceChild(addButton, productCardEl.querySelector('.cart_controls'));
            } else {
                const qtySpan = productCardEl.querySelector('.cart_qty');
                if (qtySpan) qtySpan.textContent = item.quantity;
            }
            saveCart(cart);
            updateCartCountUI();
        }
    }
});

const searchForm = document.getElementById('search');
if (searchForm) {
    let searchTimeout = null;

    searchForm.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            renderProducts();
        }, 500);
    });
}

const categorySelect = document.getElementById('category');
if (categorySelect) {
    categorySelect.addEventListener('change', () => {
        renderProducts();
    });
}

// Inicializar contador al cargar
updateCartCountUI();