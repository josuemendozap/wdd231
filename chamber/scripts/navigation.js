const navButton = document.querySelector("#ham-btn");
const nav = document.querySelector("#nav-bar");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    nav.classList.toggle("show");
});

