import { places } from "../data/places.mjs";

const grid = document.querySelector("#discoverGrid");

function buildCards(data) {
    grid.innerHTML = "";

    data.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");

        const h2 = document.createElement("h2");
        h2.textContent = place.title;

        const figure = document.createElement("figure");

        const img = document.createElement("img");

        img.src = place.image300;  // fallback
        img.srcset = `${place.image200} 200w, ${place.image300} 300w`;
        img.sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 200px, 300px";

        img.alt = place.alt;
        img.loading = "lazy";
        img.width = 300;
        img.height = 200;
        
        figure.appendChild(img);

        const address = document.createElement("address");
        address.textContent = place.address;

        const p = document.createElement("p");
        p.textContent = place.description;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Learn More";

        button.addEventListener("click", () => {
            alert(`More info coming soon: ${place.title}`);
        });

        card.append(h2, figure, address, p, button);
        grid.appendChild(card);
    });
}

buildCards(places);


const visitBox = document.querySelector("#visitMessage");
const visitText = document.querySelector("#visitText");
const closeBtn = document.querySelector("#closeVisitMessage");

const msPerDay = 1000 * 60 * 60 * 24;
const now = Date.now();

const lastVisit = Number(localStorage.getItem("discoverLastVisit"));

let message = "";

if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
} else {
    const diffDays = Math.floor((now - lastVisit) / msPerDay);

    if (diffDays < 1) {
        message = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${diffDays} days ago.`;
    }
}

visitText.textContent = message;
localStorage.setItem("discoverLastVisit", now);

closeBtn.addEventListener("click", () => {
    visitBox.style.display = "none";
});
