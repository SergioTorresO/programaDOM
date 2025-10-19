export function getCart() {
    try {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
        return [];
    }
}

export function getProductCart(productId) {
    const cart = getCart();
    return cart.find(item => item.id === productId);
}

export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartCountUI() {
    const countEl = document.querySelector('.cart_count');
    if (!countEl) return;
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    countEl.textContent = totalItems;

    const totalPriceEl = document.querySelector('.cart_total');
    if (totalPriceEl) {
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0);
        totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

export function isInCart(productId) {
    const cart = getCart();
    return cart.some(item => item.id === productId);
}