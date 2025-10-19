import { products } from "../data/products_data.js";
import { isInCart, getProductCart } from "../funtions/cart.js";
import { filter } from "../funtions/filters.js";


/*
<div class="product_card">
    <img src="./img/product.jpg" alt="Producto 1">
    <h3>Producto 1</h3>
    <p>Descripción del producto 1.</p>
    <span>category1</span>
    <p class="price">$10.00</p>
    <button class="add_to_cart">Agregar al carrito</button>
</div>
*/

const getQty = (productId) => {
    const productInCart = getProductCart(productId);
    return productInCart ? productInCart.quantity || 0 : 0;
}

export const createControls = (productId = null) => {
    let qty = "";
    if (productId) {
        const productInCart = getProductCart(productId);
        qty = productInCart ? productInCart.quantity || 0 : 0;
    }

    const controls = document.createElement('div');
    controls.className = 'cart_controls';

    const decreaseBtn = document.createElement('button');
    decreaseBtn.type = 'button';
    decreaseBtn.className = 'decrease_btn';
    decreaseBtn.textContent = '−';

    const qtySpan = document.createElement('span');
    qtySpan.className = 'cart_qty';
    qtySpan.textContent = qty || 1;

    const increaseBtn = document.createElement('button');
    increaseBtn.type = 'button';
    increaseBtn.className = 'increase_btn';
    increaseBtn.textContent = '+';

    controls.appendChild(decreaseBtn);
    controls.appendChild(qtySpan);
    controls.appendChild(increaseBtn);
    return controls;
}

export const createAddButton = () => {
    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'add_to_cart';
    addButton.textContent = 'Agregar al carrito';
    return addButton;
}

export const renderProducts = () => {
    const productsContainer = document.querySelector('.products_container');
    if (!productsContainer) return;
    productsContainer.innerHTML = '';

    
    const filteredProducts = filter(products);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product_card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Descripción del ${product.name}.</p>
            <span>category1</span>
            <p class="price">$${product.price.toFixed(2)}</p>
        `;

        if (isInCart(product.id)) {
            const controls = createControls(product.id);
            productCard.appendChild(controls);
        } else {
            const addButton = createAddButton();
            productCard.appendChild(addButton);
        }
        productsContainer.appendChild(productCard);
    });
};