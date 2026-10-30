# Lab 05 legacy migration notes

## Purpose

The feedback validator was first exercised with jQuery 3.7.1, then ported to native browser APIs and compiled from strict TypeScript. The legacy version is retained in Git commit `133838b`; the final page does not load jQuery.

## Why jQuery exists and why it remains

jQuery provided concise selectors, events, DOM manipulation and effects when browser behavior differed widely. Native selectors, `classList`, `fetch`, modules and CSS transitions now cover many of those jobs. Older applications still depend on jQuery plugins and existing code, and replacing them requires testing the behavior users already rely on.

## Six required translations

| Legacy call                         | Native equivalent                                                                                                                             | Explanation                                                                                                                                                                            |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$(document).ready(fn)`             | Load `<script type="module">`, then run initialization at module scope; alternatively use `document.addEventListener("DOMContentLoaded", fn)` | Module scripts defer execution until HTML parsing finishes.                                                                                                                            |
| `$("#name").val()`                  | `getRequired<HTMLInputElement>("#name").value`                                                                                                | A native input exposes its value directly; the helper checks for a missing element.                                                                                                    |
| `.after(html)`                      | Create a `span` with `document.createElement`, set `textContent` and attributes, then call `input.after(error)`                               | `insertAdjacentHTML("afterend", html)` is a literal insertion equivalent for trusted HTML, but constructing an element avoids parsing user input.                                      |
| `$(".error").remove()`              | `form.querySelectorAll(".error").forEach((element) => element.remove())`                                                                      | Native selectors return a collection, so remove each matching element. Scope it to the form.                                                                                           |
| `.text(message).hide().fadeIn(400)` | `status.textContent = message`                                                                                                                | The port deliberately omits the fade as allowed by the statement. Native visibility and a CSS transition could implement an optional effect; assigning text alone does not animate it. |
| `$form[0].reset()`                  | `form.reset()`                                                                                                                                | The native form is already an `HTMLFormElement`; no wrapper indexing is needed.                                                                                                        |

## Three legacy smells

1. **Function scoped `var` variables.** Use block scoped `const` for bindings that remain fixed and `let` for changing values such as the validation flag.
2. **Library based string utilities and numeric search tests.** Replace `$.trim(value)` with `value.trim()` and `email.indexOf("@") === -1` with `!email.includes("@")`. `$.trim` was removed in jQuery 4, so the legacy exercise pins 3.7.1.
3. **Building markup as strings.** Replace concatenated error HTML with `createElement`, `setAttribute`, `textContent` and `after`. This separates content from markup and keeps user text from becoming HTML.

## Behavior preserved

Both versions prevent navigation, trim the name and email, clear old errors, reject an empty name and an email without `@`, display the same messages, and reset the complete form only after a valid submission. The native version adds `aria-invalid` and associates each message through `aria-describedby`, preserving the email hint when errors clear.

The exercise checks only for an `@`, so even `@` is accepted. The message textarea retains its `required` attribute, but the supplied custom validator checks only name and email because the form uses `novalidate`. These choices preserve the assigned behavior. There is no server request or persistent booking store.

## Compiler errors observed during migration

The first strict check was run before typing the migrated scripts. Examples of actual diagnostics:

```text
src/feedback.ts(2,19): error TS18047: 'form' is possibly 'null'.
src/feedback.ts(6,20): error TS7006: Parameter 'input' implicitly has an 'any' type.
src/feedback.ts(23,26): error TS2339: Property 'value' does not exist on type 'Element'.
```

`getRequired<HTMLFormElement>` and `getRequired<HTMLInputElement>` provide the expected element types and throw a clear error when an element is missing. The error helper now takes `input: HTMLInputElement` and `message: string` and returns `void`. Importing the shared helper also makes the feedback file a module, avoiding a collision with the browser's global `status` name.

## Structural typing and deliberate error

This variable is accepted because it contains every property required by `Slot`; the extra `id` does not change that compatibility:

```ts
const booking = {
  day: "Monday",
  start: "10:00",
  end: "11:00",
  room: "Room 214",
  id: 1,
};
describeSlot(booking);
```

The temporary call `describeSlot({ day: "Monday" })` failed with **TS2739** because `start`, `end` and `room` were missing. Replacing `delay(1000)` with `delay("1000")` in `main.ts` failed with **TS2345** because a string cannot be passed to a number parameter. The broken build left all three compiled JavaScript files unchanged, confirming `noEmitOnError`. Both experiments were removed or fixed, and the final type check passed.

See the [compiler experiment transcript](docs/evidence/Lab-05-TypeScript-Experiments.txt).

## References and acknowledgement

- [Supplied Lab 05 statement](docs/Lab-05-Statement.docx) provides the exercise, validator messages and TypeScript examples.
- [jQuery trim API](https://api.jquery.com/jQuery.trim/) documents deprecation and removal.
- [MDN JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) explains module loading and scope.
- [TypeScript configuration reference](https://www.typescriptlang.org/tsconfig/) explains strict checking and emit settings.

Implementation, documentation and automated checks were prepared with OpenAI Codex assistance. The supplied starter examples are acknowledged above.
