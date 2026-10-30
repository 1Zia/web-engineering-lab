import {
  delay,
  makeCounter,
  getRequired,
  describeSlot,
  greet,
  type Slot,
} from "./utils.js";

const slots: Slot[] = [
  { day: "Monday", start: "10:00", end: "11:00", room: "Room 214" },
  { day: "Wednesday", start: "14:00", end: "15:00", room: "Room 214" },
];

getRequired<HTMLHeadingElement>("#greeting").textContent = greet("World");
const status = getRequired<HTMLParagraphElement>("#status");
const tbody = getRequired<HTMLTableSectionElement>("#schedule tbody");
const nextBooking = makeCounter();

tbody.addEventListener("click", async (event: MouseEvent) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const button = target.closest<HTMLButtonElement>("button[data-day]");
  const row = target.closest("tr");
  if (button === null || row === null || button.disabled) return;

  const slot = slots.find((candidate) => candidate.day === button.dataset.day);
  if (slot === undefined) return;

  // Prevent repeated keyboard or mouse activations during the simulated update.
  button.disabled = true;
  row.setAttribute("aria-busy", "true");
  status.textContent = `Updating ${slot.day}…`;
  await delay(1000);

  const booked = row.classList.toggle("selected");
  const count = tbody.querySelectorAll("tr.selected").length;
  button.setAttribute("aria-pressed", String(booked));
  row.removeAttribute("aria-busy");
  button.disabled = false;
  status.textContent = booked
    ? `Booking #${nextBooking()} confirmed: ${describeSlot(slot)}. ${count} of ${slots.length} slots booked.`
    : `Booking for ${slot.day} cancelled. ${count} of ${slots.length} slots booked.`;
});
