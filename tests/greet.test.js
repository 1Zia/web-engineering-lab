const test = require("node:test");
const assert = require("node:assert/strict");

test('greet("World") returns the expected message', async () => {
  const { greet } = await import("../public/utils.js");
  assert.equal(greet("World"), "Hello, World!");
});
