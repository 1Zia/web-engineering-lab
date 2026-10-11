const test = require("node:test");
const assert = require("node:assert/strict");
const { greet } = require("../public/script.js");

test('greet("World") returns the expected message', () => {
  assert.equal(greet("World"), "Hello, World!");
});
