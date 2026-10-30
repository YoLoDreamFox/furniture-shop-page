# Furniro: furniture store home page

A responsive layout of a furniture online store's home page, built from a Figma Community design.
Hand-coded in HTML and SCSS, with the interactive parts written in vanilla JavaScript.

Русская версия: [Readme.md](Readme.md)

> This is a practice project. The design belongs to its author (see "Credits and licenses").
> My part: the layout, the mobile version and the improvements to the design.

**Demo:** https://yolodreamfox.github.io/furniture-shop-page/

![Home page: desktop and mobile](docs/preview.png)

## About

The Furniro design only includes a desktop version, so I designed and built the mobile version myself.
The original design also had inconsistent spacing, overlapping blocks and no hover states.
I brought all of this into one consistent system and listed the changes below.

## What I changed compared to the design

- One spacing scale and shared side margins instead of different values in different blocks
- Aligned blocks and headings, fixed overlaps (an image covered a block title) and one heading that was not centered
- Reduced text colors to a few roles: primary, secondary, accent and text on buttons
- Added hover states and animations: the action layer on product cards, buttons, links, the carousel
- Designed and built the mobile version

## Features

- Responsive layout: desktop and mobile
- A horizontal list of categories with snapping cards (`scroll-snap`)
- A product grid that adapts to the screen width, with "discount" and "new" badges and the old price
- An action layer that appears when hovering over a product card
- A carousel of inspiring rooms: arrows, dots, the active card scales up
- A gallery and a footer with a newsletter form (the label floats above the field)
- A notice that this is a demo version

## Stack

HTML5, SCSS (`@use`, variables, mixins), CSS cascade layers (`@layer`), vanilla JavaScript.
Font: Poppins.

## Project structure

```
├── index.html
├── css/            compiled styles
├── scss/           sources: variables, mixins, global and main styles
├── js/             carousel, notice, templates
├── data/           
│   ├── data.js     information
│   └── picture/    images
└── libs/           fonts, icons
```

## Running locally

1. Clone the repository.
2. Open `index.html` through a local server: the Live Server extension for VS Code
   or `python -m http.server` in the project folder will do.

## Building styles

Styles are compiled with the Watch Sass extension for VS Code. The compiled CSS is in the repository,
so no build is needed just to view the page.

## Deployment

The page is hosted on GitHub Pages (Settings → Pages → `main` branch, repository root).

## Credits and licenses

- Design: eCommerce Website | Web Page Design | UI KIT | Interior Landing Page by [design author](https://www.figma.com/@uiux_expert), [link to the design on Figma Community](https://www.figma.com/community/file/1252561852327562039/ecommerce-website-web-page-design-ui-kit-interior-landing-page), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
  Changes: the responsive version, fixes to spacing, alignment and colors, hover states and animations.
- Photos and illustrations from the design: sources and licenses are listed on the design's page.
- Poppins font: SIL OFL 1.1.
- Icons: [source and license](https://www.svgrepo.com/).

## License

Code and layout: © 2026 YoLoDreamFox. All rights reserved. The code is published for viewing;
permission from the author is required to use it in other projects.
The design and its materials remain with their authors and are used under their terms.