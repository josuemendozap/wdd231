import { openProductModal } from "./modal.js";
import { getFavorites, getCart, clearCart } from "./storage.js";

const grid = document.querySelector("#productGrid");
const statusText = document.querySelector("#statusText");

const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categorySelect");
const favoritesSelect = document.querySelector("#favoritesSelect");

const favCount = document.querySelector("#favCount");
const cartCount = document.querySelector("#cartCount");
const clearCartBtn = document.querySelector("#clearCartBtn");

const notesField = document.querySelector("#notes");
const cartField = document.querySelector("#cartField");

let allProducts = [];

function setStatus(msg) {
    if (statusText) statusText.textContent = msg;
}

function moneyMXN(amount) {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    }).format(amount);
}

function updateCounts() {
    if (favCount) favCount.textContent = getFavorites().length;
    if (cartCount) cartCount.textContent = getCart().length;
}

function cartToNotes() {
    const cart = getCart();

    if (!notesField || !cartField) return;

    if (cart.length === 0) {
        cartField.value = "";
        return;
    }

    const lines = cart.map(id => {
        const product = allProducts.find(p => p.id === id);
        return product ? product.name : id;
    });

    const cartText = lines.join(", ");

    cartField.value = cartText;

    if (notesField.value.trim() === "") {
        notesField.value = cartText;
    }
}

function fillCategories(products) {
    if (!categorySelect) return;

    const categories = ["all", ...new Set(products.map(p => p.category))];

    categorySelect.innerHTML = categories
        .map(c => `<option value="${c}">${c}</option>`)
        .join("");
}

function buildCard(product) {
    const favorites = getFavorites();
    const isFav = favorites.includes(product.id);

    return `
    <article class="product-card">
      <div class="product-top">
        <h3>${product.name}</h3>
        <p class="price">${moneyMXN(product.price)}</p>
      </div>

      <p class="small">${product.description}</p>

      <div class="product-meta">
        <span class="tag">${product.category}</span>
        <span class="tag">${isFav ? "★ Favorite" : "☆ Not favorite"}</span>
      </div>

      <button class="btn product-btn" data-id="${product.id}">
        View Details
      </button>
    </article>
  `;
}

function renderProducts(products) {
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = `<p>No products match your filters.</p>`;
        return;
    }

    grid.innerHTML = products.map(buildCard).join("");

    const buttons = grid.querySelectorAll(".product-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const product = allProducts.find(p => p.id === id);
            if (product) openProductModal(product);
        });
    });
}

function applyFilters() {
    if (!searchInput || !categorySelect || !favoritesSelect) return;

    const search = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const favMode = favoritesSelect.value;
    const favorites = getFavorites();

    let filtered = [...allProducts];

    if (category !== "all") {
        filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search)
        );
    }

    if (favMode === "favorites") {
        filtered = filtered.filter(p => favorites.includes(p.id));
    }

    renderProducts(filtered);
}

async function loadProducts() {
    setStatus("Loading products...");

    try {
        const response = await fetch("data/products.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        allProducts = data;

        fillCategories(allProducts);
        applyFilters();

        updateCounts();
        cartToNotes();

        setStatus(`Loaded ${allProducts.length} items.`);
    } catch (error) {
        console.error(error);
        setStatus("Error loading products. Check your JSON path or file.");
    }
}

function setupEvents() {
    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (categorySelect) categorySelect.addEventListener("change", applyFilters);
    if (favoritesSelect) favoritesSelect.addEventListener("change", applyFilters);

    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", () => {
            clearCart();
            updateCounts();
            cartToNotes();
        });
    }

    window.addEventListener("favoritesUpdated", () => {
        updateCounts();
        applyFilters();
    });

    window.addEventListener("cartUpdated", () => {
        updateCounts();
        cartToNotes();
    });

    const form = document.querySelector("#orderForm");
    if (form) {
        form.addEventListener("submit", () => {
            cartToNotes();
        });
    }
}

setupEvents();
loadProducts();
