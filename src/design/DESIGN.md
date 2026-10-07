# DESIGN.md for Coffee Shop App (Stitch UI)

## Design Tokens

- **Colors** (HSL):
  - --color-primary: 25deg 80% 55%;   /* Warm coffee orange */
  - --color-secondary: 210deg 15% 20%; /* Dark slate for background */
  - --color-background: 210deg 13% 12%;
  - --color-surface: 210deg 10% 18%;
  - --color-on-primary: 0deg 0% 100%;
  - --color-on-secondary: 0deg 0% 100%;
  - --color-muted: 210deg 5% 30%;

- **Typography**
  - --font-base: "Inter", system-ui, sans-serif;
  - --font-heading: "Oswald", system-ui, sans-serif;
  - --font-size-base: 1rem;
  - --font-size-lg: 1.25rem;
  - --font-size-xl: 2rem;

- **Spacing**
  - --space-xxs: 0.25rem;
  - --space-xs: 0.5rem;
  - --space-sm: 1rem;
  - --space-md: 1.5rem;
  - --space-lg: 2rem;
  - --space-xl: 3rem;

- **Border Radius**
  - --radius-sm: 0.5rem;
  - --radius-md: 1rem;
  - --radius-lg: 1.5rem;

- **Elevation (Glassmorphism)**
  - --elev-1: rgba(255,255,255,0.08) 0px 1px 3px;
  - --elev-2: rgba(255,255,255,0.12) 0px 4px 6px;

## Component Guidelines

### Button
- Background: var(--color-primary)
- Color: var(--color-on-primary)
- Padding: var(--space-sm) var(--space-md)
- Border-radius: var(--radius-md)
- Hover: background lighten 5%
- Focus: outline 2px solid var(--color-primary) with offset

### Card (Glass)
- Background: rgba(255,255,255,0.07) with backdrop-filter: blur(12px)
- Border: 1px solid rgba(255,255,255,0.12)
- Border-radius: var(--radius-lg)
- Box-shadow: var(--elev-1)
- Padding: var(--space-md)

### NavBar
- Fixed top, height 4rem, full width.
- Background: var(--color-secondary) with 0.9 opacity.
- Items spaced via flex-gap var(--space-lg).
- Responsive: collapses to hamburger at <640px.

## Accessibility
- Ensure contrast ratio >= 4.5:1 for text against backgrounds.
- All interactive elements have :focus-visible styling.
- Use semantic HTML (nav, main, section, button).

## Export
The design system can be exported as HTML/CSS via Stitch's `export` command, producing `design/tokens.css` and a `DESIGN.md` manifest.
