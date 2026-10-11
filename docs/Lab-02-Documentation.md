# Lab 02: Semantic HTML and Accessibility Foundations

**Student:** Ziaullah Khan  
**Roll number:** 2330-0145  
**Degree:** BS Artificial Intelligence (BS AI)  
**Course:** Web Engineering

## Objective

Extend the Lab 01 page with semantic landmarks, accessible tabular data, meaningful graphics, an accessible form, keyboard support, and WCAG-oriented automated checks.

## Tools and technologies

- Semantic HTML5, CSS, and JavaScript
- Chrome headless browser
- axe-core 4.13.0 and Lighthouse

## Tasks performed

1. Kept `h1#greeting` and the Lab 01 greeting script.
2. Added the first-focusable skip link, `header`, list-based `nav`, one `main`, two ordered `h2` sections, and a footer `address`.
3. Built an Office Hours table with a caption, `thead`, `tbody`, scoped column headings, and machine-readable `time` values.
4. Added a decorative SVG hidden with `aria-hidden` and an informative location SVG with `role="img"`, `title`, `figure`, and `figcaption`.
5. Built the feedback form with associated labels, required fields, an email hint using `aria-describedby`, a `fieldset` and `legend`, radio buttons, a textarea, and a submit button.
6. Added `aria-current="location"` only where native HTML has no equivalent.
7. Added visible 3px `:focus-visible` outlines and a skip link that appears on focus.

## Important code concepts

Semantic landmarks let assistive-technology users move between major page areas. Labels and table headings give controls and data explicit relationships. Native elements are preferred to unnecessary ARIA. Keyboard focus must be visible and follow the document's logical order.

## Results

- Automated keyboard test confirmed the expected eight Tab stops, from the skip link through the submit button.
- Every tested interactive element displayed a 3px focus outline.
- axe-core reported **0 violations**.
- Lighthouse Accessibility scored **100**.

![Implemented Lab 02 page](screenshots/Lab-02-Page.png)

![Lighthouse Accessibility score of 100](screenshots/Lab-02-Lighthouse.png)

Automated tools cannot detect every accessibility issue, so manual assistive-technology testing is still recommended.

## Conclusion

The original greeting page is now a semantic, keyboard-operable, and automatically audited accessible page.

## Viva preparation

**Why must a page have only one `main` element?**  
It identifies the page's unique primary content as a clear landmark.

**Why is a placeholder not a label?**  
It disappears during input and does not reliably provide a programmatic name.

**When should `aria-hidden="true"` be used on an SVG?**  
When the graphic is decorative and should not add noise for assistive technology.

**Why use `scope="col"` on table headings?**  
It explicitly associates each header with the cells in its column.
