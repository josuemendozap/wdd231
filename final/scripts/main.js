const menuBtn = document.querySelector("#menuBtn");
const nav = document.querySelector("#primaryNav");
const yearSpan = document.querySelector("#year");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", isOpen);
        menuBtn.textContent = isOpen ? "✕" : "☰";
    });
}
