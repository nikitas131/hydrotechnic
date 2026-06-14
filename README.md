# HydroTechnic / BRK Construction Website

Responsive static website for two connected brands:

- HydroTechnic
- BRK Construction

## Pages

| File | Purpose |
|---|---|
| `index.html` | HydroTechnic main page |
| `hydrotechnic-projects.html` | HydroTechnic projects archive |
| `brk.html` | BRK Construction main page |
| `brk-projects.html` | BRK Construction projects archive |

## Structure

```text
assets/
index.html
hydrotechnic-projects.html
brk.html
brk-projects.html
styles.css
script.js
_headers
_redirects
robots.txt
sitemap.xml
README.md
```

## Deployment

For Cloudflare Pages:

```text
Build command: empty
Build output directory: /
```

## Security headers

The `_headers` file includes:

- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy
- Permissions Policy
- HSTS

## Notes

This is a static website with no database, no admin panel and no login system. That keeps the attack surface low and improves performance.


## Performance update
- Canvas shader runs at a lighter frame rate.
- Particle count reduced.
- Background animation pauses when the browser tab is hidden.
- Resize handling is debounced.
- Mobile blur effects reduced for smoother scrolling.
- Cards use `content-visibility` for faster rendering.
- Hover animations are lighter and smoother.


## Project filter update
Project pages and preview sections now include category filters:
- Bathrooms
- Plumbing works
- Renovations
- Painting
- Construction
- Drywall
- Plastering
- Tiles
- Heating
- Solar water heaters
- Repairs


## Stable projects update
- Home pages now show only a small project preview section.
- Full project archives remain on:
  - `hydrotechnic-projects.html`
  - `brk-projects.html`
- Project cards now use stable heights and responsive grid rules.
- New project cards can be added by copying an existing `<article class="project-card ...">`.
- Filter empty-state handling was added so categories do not break the layout.


## Extra projects update
- Added 10 extra HydroTechnic project cards.
- Added 10 extra BRK Construction project cards.
- Project cards have fixed visual proportions so text does not break the layout.
- New projects can still be added by copying any existing `<article class="project-card filter-item" ...>`.
