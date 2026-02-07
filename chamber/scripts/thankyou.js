const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phoneNumber = params.get("phoneNumber");
const businessName = params.get("businessName");
const timestamp = params.get("timestamp");

document.querySelector("#display-firstName").textContent = firstName || "N/A";
document.querySelector("#display-lastName").textContent = lastName || "N/A";
document.querySelector("#display-email").textContent = email || "N/A";
document.querySelector("#display-phoneNumber").textContent = phoneNumber || "N/A";
document.querySelector("#display-businessName").textContent = businessName || "N/A";

if (timestamp) {
    const date = new Date(timestamp);

    document.querySelector("#display-timestamp").textContent =
        date.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short"
        });
} else {
    document.querySelector("#display-timestamp").textContent = "N/A";
}