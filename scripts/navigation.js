const navButton = document.querySelector("#ham-btn");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    nav.classList.toggle("show");
});

const nav = document.querySelector("#nav-bar");