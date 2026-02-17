const FAV_KEY = "familiaSazonFavorites";
const CART_KEY = "familiaSazonCart";

export function getFavorites() {
    const saved = localStorage.getItem(FAV_KEY);
    return saved ? JSON.parse(saved) : [];
}

export function isFavorite(id) {
    return getFavorites().includes(id);
}

export function toggleFavorite(id) {
    const favorites = getFavorites();

    if (favorites.includes(id)) {
        const updated = favorites.filter(x => x !== id);
        localStorage.setItem(FAV_KEY, JSON.stringify(updated));
        return false;
    } else {
        favorites.push(id);
        localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
        return true;
    }
}

export function getCart() {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
}

export function addToCart(id) {
    const cart = getCart();
    cart.push(id);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCart() {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
}
