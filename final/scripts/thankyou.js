function getParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name) || "";
}

function safeText(value) {
    return value ? value : "(not provided)";
}

document.querySelector("#outFname").textContent = safeText(getParam("fname"));
document.querySelector("#outLname").textContent = safeText(getParam("lname"));
document.querySelector("#outEmail").textContent = safeText(getParam("email"));
document.querySelector("#outMobile").textContent = safeText(getParam("mobile"));
document.querySelector("#outZone").textContent = safeText(getParam("zone"));
document.querySelector("#outNotes").textContent = safeText(getParam("notes"));
