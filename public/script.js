function greet(name) {
  return `Hello, ${name}!`;
}

if (typeof document !== "undefined") {
  const greeting = document.getElementById("greeting");
  if (greeting) greeting.textContent = greet("World");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { greet };
}
