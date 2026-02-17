import { isFavorite, toggleFavorite, addToCart } from "./storage.js";

const modal = document.querySelector("#productModal");

const closeBtn = document.querySelector("#closeModalBtn");
const favoriteBtn = document.querySelector("#modalFavBtn");
const cartBtn = document.querySelector("#modalCartBtn");

const title = document.querySelector("#modalTitle");
const desc = document.querySelector("#modalDesc");
const category = document.querySelector("#modalCategory");
const price = document.querySelector("#modalPrice");
const nutrition = document.querySelector("#modalNutrition");
const recipe = document.querySelector("#modalRecipe");

let currentProduct = null;

function moneyMXN(amount) {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    }).format(amount);
}

function updateFavoriteButton(id) {
    const fav = isFavorite(id);
    favoriteBtn.textContent = fav ? "Remove Favorite" : "Save Favorite";
}

export function openProductModal(product) {
    if (!modal) return;

    currentProduct = product;

    title.textContent = product.name;
    desc.textContent = product.description;
    category.textContent = product.category;
    price.textContent = moneyMXN(product.price);
    nutrition.textContent = product.nutrition;
    recipe.textContent = product.recipe;

    updateFavoriteButton(product.id);

    modal.showModal();
}

function closeModal() {
    if (!modal) return;
    modal.close();
}

if (closeBtn) closeBtn.addEventListener("click", closeModal);

if (modal) {
    modal.addEventListener("click", (event) => {
        const rect = modal.getBoundingClientRect();
        const clickedInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;

        if (!clickedInDialog) closeModal();
    });
}

if (favoriteBtn) {
    favoriteBtn.addEventListener("click", () => {
        if (!currentProduct) return;

        toggleFavorite(currentProduct.id);
        updateFavoriteButton(currentProduct.id);

        window.dispatchEvent(new Event("favoritesUpdated"));
    });
}

if (cartBtn) {
    cartBtn.addEventListener("click", () => {
        if (!currentProduct) return;

        addToCart(currentProduct.id);
        window.dispatchEvent(new Event("cartUpdated"));

        closeModal();
    });
}
