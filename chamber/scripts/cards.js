const list = document.querySelector("#list-on");
const cardsOn = document.querySelector("#cards-on");
const cards = document.querySelector("#cards");

const url = "data/members.json";

cardsOn.addEventListener("click", () => {
    cards.classList.add("grid");

    cards.classList.remove("list");
});

list.addEventListener("click", () => {
    cards.classList.add("list");
    
    cards.classList.remove("grid");
});

const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement("section");
        let companyName = document.createElement("h2");
        let companyAddress = document.createElement("p");
        let companyPhone = document.createElement("p");
        let companyWebsite = document.createElement("a");
        let companyPortrait = document.createElement("img");
        let companyMembershipLevel = document.createElement("p");
        let companyFounded = document.createElement("p");

        companyName.textContent = `${member.name}`;

        companyPortrait.setAttribute("src", `images/${member.image}`);
        companyPortrait.setAttribute("alt", `${member.name} logo`);
        companyPortrait.setAttribute("loading", "lazy");
        companyPortrait.setAttribute("width", "300");
        companyPortrait.setAttribute("height", "400");

        companyAddress.textContent = member.address;

        companyPhone.textContent = `Phone: ${member.phone}`;

        companyWebsite.textContent = member.website;
        companyWebsite.href = member.website;
        companyWebsite.target = "_blank";

        companyMembershipLevel.textContent = `Membership Level: ${member.membershipLevel}`;

        companyFounded.textContent = `Founded Year: ${member.founded}`;

        card.appendChild(companyName);
        card.appendChild(companyPortrait);
        card.appendChild(companyAddress);
        card.appendChild(companyPhone);
        card.appendChild(companyWebsite);
        card.appendChild(companyMembershipLevel);
        card.appendChild(companyFounded);

        cards.appendChild(card);
    });
}

async function getMembersData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

getMembersData();


document.querySelectorAll("img:not(.hero)").forEach(img => {
    img.setAttribute("loading", "lazy");
})
