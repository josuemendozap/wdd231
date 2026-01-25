const membersURL = "data/members.json"; 

async function getSpotlights() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const qualifiedMembers = data.members.filter(member =>
            member.membershipLevel === 2 || member.membershipLevel === 3
        );

        qualifiedMembers.sort(() => Math.random() - 0.5);

        const numberOfSpotlights = Math.floor(Math.random() * 2) + 2;
        const selectedMembers = qualifiedMembers.slice(0, numberOfSpotlights);

        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

function displaySpotlights(members) {
    const container = document.querySelector("#spotlights");
    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("spotlight-card");

        card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Membership:</strong> ${getMembershipName(member.membershipLevel)}</p>
      <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a>
    `;
        container.appendChild(card);
    });
}

function getMembershipName(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Bronze";
}

getSpotlights();