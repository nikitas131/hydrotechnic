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
