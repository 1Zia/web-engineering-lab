const test = require("node:test");
const assert = require("node:assert/strict");

test("counters keep independent closure state", async () => {
  const { makeCounter } = await import("../public/utils.js");
  const first = makeCounter();
  const second = makeCounter();
  assert.deepEqual([first(), first(), second(), first()], [1, 2, 1, 3]);
});

test("describeSlot accepts an object with additional properties", async () => {
  const { describeSlot } = await import("../public/utils.js");
  assert.equal(
    describeSlot({
      day: "Monday",
      start: "10:00",
      end: "11:00",
      room: "Room 214",
      id: 1,
    }),
    "Monday 10:00–11:00, Room 214",
  );
});

test("getRequired returns the selected element or a useful missing-element error", async () => {
  const { getRequired } = await import("../public/utils.js");
  const element = { id: "name" };
  const root = {
    querySelector: (selector) => (selector === "#name" ? element : null),
  };
  assert.equal(getRequired("#name", root), element);
  assert.throws(() => getRequired("#missing", root), {
    message: "Missing element: #missing",
  });
});
