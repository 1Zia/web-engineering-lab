import { getRequired } from "./utils.js";
const form = getRequired("form");
const nameInput = getRequired("#name", form);
const emailInput = getRequired("#email", form);
const status = getRequired("#status");
function showError(input, message) {
    const error = document.createElement("span");
    error.className = "error";
    error.setAttribute("role", "alert");
    error.textContent = message;
    error.id = `${input.id}-error`;
    input.setAttribute("aria-invalid", "true");
    const descriptions = input.getAttribute("aria-describedby")?.split(/\s+/) ?? [];
    input.setAttribute("aria-describedby", [...descriptions, error.id].join(" "));
    input.after(error);
}
function clearErrors() {
    form.querySelectorAll(".error").forEach((el) => el.remove());
    form.querySelectorAll("[aria-invalid]").forEach((input) => {
        input.removeAttribute("aria-invalid");
        const descriptions = (input.getAttribute("aria-describedby") ?? "")
            .split(/\s+/)
            .filter((id) => id && id !== `${input.id}-error`);
        if (descriptions.length > 0)
            input.setAttribute("aria-describedby", descriptions.join(" "));
        else
            input.removeAttribute("aria-describedby");
    });
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    let valid = true;
    if (name === "") {
        showError(nameInput, "Please enter your name.");
        valid = false;
    }
    if (!email.includes("@")) {
        showError(emailInput, "Please enter a valid email address.");
        valid = false;
    }
    if (valid) {
        status.textContent = `Thanks, ${name}! Your feedback was received.`;
        form.reset();
    }
});
