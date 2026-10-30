import { getRequired } from "./utils.js";

const form = getRequired<HTMLFormElement>("form");
const nameInput = getRequired<HTMLInputElement>("#name", form);
const emailInput = getRequired<HTMLInputElement>("#email", form);
const status = getRequired<HTMLParagraphElement>("#status");

function showError(input: HTMLInputElement, message: string): void {
  const error = document.createElement("span");
  error.className = "error";
  error.setAttribute("role", "alert");
  error.textContent = message;
  error.id = `${input.id}-error`;
  input.setAttribute("aria-invalid", "true");
  const descriptions =
    input.getAttribute("aria-describedby")?.split(/\s+/) ?? [];
  input.setAttribute("aria-describedby", [...descriptions, error.id].join(" "));
  input.after(error);
}

function clearErrors(): void {
  form.querySelectorAll(".error").forEach((el) => el.remove());
  form.querySelectorAll<HTMLInputElement>("[aria-invalid]").forEach((input) => {
    input.removeAttribute("aria-invalid");
    const descriptions = (input.getAttribute("aria-describedby") ?? "")
      .split(/\s+/)
      .filter((id) => id && id !== `${input.id}-error`);
    if (descriptions.length > 0)
      input.setAttribute("aria-describedby", descriptions.join(" "));
    else input.removeAttribute("aria-describedby");
  });
}

form.addEventListener("submit", (event: SubmitEvent) => {
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
