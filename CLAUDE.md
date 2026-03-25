# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Mikroagra** — a small family gardening shop in Spytihněv, Czech Republic. The site is in Czech and showcases seed potatoes, seeds, fertilizers, animal feed, and agricultural sprays.

## Architecture

Plain HTML/CSS/JS with no build tools, frameworks, or package manager. The entire site is three files:

- `index.html` — single-page layout with sections: nav, hero, about, product catalog, potato price list, opening hours, contact (with embedded Google Map), footer
- `style.css` — all styling, uses CSS custom properties (`:root` vars prefixed `--green-*`, `--brown-*`, etc.), responsive via media queries at 900px and 640px breakpoints
- `script.js` — navbar scroll effect, mobile hamburger menu toggle, smooth scroll with fixed-nav offset

## Development

Open `index.html` directly in a browser — no build step or server required. Any static file server (e.g., `python3 -m http.server`) also works.

## Key Details

- **Language**: All user-facing text is in Czech (lang="cs")
- **Fonts**: Google Fonts — Inter (body) and Playfair Display (headings)
- **Layout**: CSS Grid for product cards (3-col), about section (2-col), contact section; Flexbox for nav, hours, footer
- **Mobile nav**: Hamburger toggle at ≤640px, menu slides open via `.active` class
