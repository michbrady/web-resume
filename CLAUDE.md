# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal resume website for Michael Brady (CIO). No build system, bundler, or package manager — just vanilla HTML/CSS/JS served directly.

## Development

Open `index.html` in a browser. No build step, no dev server required. For live reload during development, use any static file server (e.g., `npx serve .` or VS Code Live Server extension).

## Architecture

- **index.html** — Single-page resume. All content lives here in semantic HTML sections (header, executive summary, achievements, career timeline, technical skills, education).
- **styles.css** — All styling including responsive breakpoints (768px, 480px) and print styles. Uses CSS custom properties implicitly via gradient colors (`#667eea` primary blue, `#764ba2` secondary purple, `#2c3e50` dark). Card-based layout with CSS Grid and Flexbox.
- **script.js** — Interactivity added on `DOMContentLoaded`: scroll-triggered fade-in animations (IntersectionObserver), typing effect on name, parallax header, click-to-copy contact info, tech tag hover effects, and a dynamically injected dark mode toggle + styles.

## Key Patterns

- Dark mode CSS is injected via JavaScript (not in styles.css) — the toggle button and dark mode styles are both created in `script.js`.
- Animations use inline `style` manipulation (opacity/transform) rather than CSS classes.
- External dependencies: Google Fonts (Inter) and Font Awesome 6 via CDN only.
- Print styles preserve header background color with `-webkit-print-color-adjust: exact`.

## Deployment

Designed for GitHub Pages or any static hosting. No build artifacts or deployment scripts.
