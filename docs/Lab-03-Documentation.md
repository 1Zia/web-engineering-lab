# Web Engineering Lab Report

## Lab 03: CSS Fundamentals - Styling, Layout and Animation

**Student:** Ziaullah Khan  
**Roll number:** 2330-0145  
**Degree:** BS Artificial Intelligence (BS AI)  
**Course:** Web Engineering

### Objective

Practise CSS methods, selectors, typography, units, Flexbox, the box model, positioning, responsive media queries, transitions, transforms, and keyframe animation in a standalone page.

### Tools and technologies

HTML5, CSS3, Visual Studio Code, Live Server, and a web browser.

### Tasks and implementation

| Task                                   | Implementation                                                                                                                                                                                                          |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. CSS methods, colours, and selectors | Linked `style.css`, added an internal style block, and used inline styling. Demonstrated an id selector with a blue box, class selectors with red headings, and external green, internal blue, and inline pink buttons. |
| 2. Typography                          | Set the page font to Times New Roman and centred and capitalised the example text.                                                                                                                                      |
| 3. CSS units                           | Compared nested `px`, `em`, and `rem` font sizes and included a short explanation of their reference sizes.                                                                                                             |
| 4. Flexbox navbar                      | Created a 60px dark navbar with an orange logo and search button, three navigation links, and evenly distributed content.                                                                                               |
| 5. Box model and opacity               | Styled three 100px square boxes with borders, different background colours, and `opacity: 0.5`; made the third box circular.                                                                                            |
| 6. Positioning and stacking            | Added a fixed “Love Nature” panel on the right with a background image and `z-index: 10`.                                                                                                                               |
| 7. Flexbox alignment                   | Centred an item horizontally and vertically in its flex parent; used `align-self` on the child.                                                                                                                         |
| 8. Responsive media queries            | Changed a demo box to green at widths up to 299px, pink from 300px to 399px, red from 400px to 599px, and blue from 600px onward.                                                                                       |
| 9. Transition and transform            | Added a button hover transition that sets its font size to 24px and rotates it by 5 degrees.                                                                                                                            |
| 10. Loading animation                  | Created a circular loader with one coloured border side and an infinite `spin` keyframe animation.                                                                                                                      |

### Concepts applied

The CSS cascade resolves declarations from external, internal, and inline styles. `em` and `rem` use different font-size references. Flexbox controls alignment; the box model combines content, padding, borders, and margins. Positioning and `z-index` control placement and stacking. Media queries adapt styles to viewport widths, while transitions and keyframes animate CSS properties.

### Results and evidence

The standalone page is available at `css-lab/index.html` and can be opened with Live Server. Browser inspection confirmed the four responsive colours, the fixed background panel at `z-index: 10`, and the loader's infinite `spin` animation.

![Lab 03 page showing the CSS task examples](screenshots/Lab-03-Page.png)

### Conclusion

The ten tasks demonstrate foundational CSS styling, layout, responsive behavior, and animation in one page.
