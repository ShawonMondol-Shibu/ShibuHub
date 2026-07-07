# ShibuHub Design Overhaul Spec

## Goal

Full design overhaul to make ShibuHub production-grade: fix dark mode, establish consistent theming, shared components, typography/spacing system, brand consistency, and product card rendering.

## Approach

Full token migration — replace all hardcoded colors with theme tokens, fix font variables, add shared components, fix spacing, fix brand.

---

## 1. Theme System Fix

### Changes to `app/globals.css`

- Change `--font-sans` from `var(--font-geist-sans)` to `var(--font-lato)`
- Remove `--font-mono: var(--font-geist-mono)` (not used)
- Update dark mode `--primary` to keep indigo brand identity: `oklch(0.65 0.2 270)` (lighter indigo for dark backgrounds)
- Add `--brand: oklch(51.1% 0.262 276.966)` for light mode, `--brand: oklch(0.65 0.2 270)` for dark mode
- Map `--brand` into Tailwind via `@theme inline` as `--color-brand`

### Files modified

- `app/globals.css`

---

## 2. Color Token Migration

### Replacement rules

| Hardcoded | Theme token |
|-----------|-------------|
| `bg-indigo-600` / `bg-indigo-500` | `bg-primary` |
| `text-indigo-600` / `text-indigo-500` | `text-primary` |
| `bg-indigo-50` / `bg-indigo-100` | `bg-primary/10` or `bg-muted` |
| `hover:bg-indigo-700` | `hover:bg-primary/90` |
| `border-indigo-200` | `border-border` |
| `text-gray-600` | `text-muted-foreground` |
| `text-gray-900` | `text-foreground` |
| `bg-white` | `bg-background` |
| `text-red-500` | `text-destructive` |
| `from-indigo-600 to-purple-600` | `from-primary to-primary/80` |

### Files to update

- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `components/layout/home/Header.tsx`
- `components/layout/home/OurProducts.tsx`
- `components/layout/home/Shipping.tsx`
- `components/layout/home/License-section.tsx`
- `components/layout/Product.tsx`
- `app/(website)/page.tsx`
- `app/(website)/products/page.tsx`
- `app/(website)/products/[id]/ProductPage.tsx`
- `app/(website)/checkout/page.tsx`
- `app/(website)/cart/page.tsx`

---

## 3. Shared Components

### New components to create

- `components/shared/loading-page.tsx` — Full-page skeleton for content loading (product grids, page content)
- `components/shared/error-page.tsx` — Error display with retry button using theme tokens
- `components/shared/empty-state.tsx` — Reusable empty state: icon + message + optional action button
- `components/shared/spinner.tsx` — Small spinner for form submissions and inline loading

### Usage

- **Skeleton** for: product grid loading, product detail loading, dashboard data loading
- **Spinner** for: form submit buttons, page transitions, cart operations
- **Error page** for: API fetch failures, route errors
- **Empty state** for: no search results, empty cart, no orders

### Files to update (replace inline loading/error blocks)

- `app/(website)/page.tsx`
- `app/(website)/products/page.tsx`
- `app/(website)/products/[id]/ProductPage.tsx`
- `app/dashboard/(pages)/products/page.tsx`
- `app/dashboard/(pages)/clients/page.tsx`
- `app/dashboard/(pages)/teams/page.tsx`
- `app/dashboard/(pages)/orders/page.tsx`

---

## 4. Typography + Spacing System

### Typography fixes

- `globals.css`: `--font-sans: var(--font-lato)` (was pointing to Geist)
- Remove `--font-mono` variable
- Headings: Use consistent sizes — `text-4xl` for section titles, `text-2xl` for card titles, `text-lg` for body

### Spacing system

| Element | Spacing |
|---------|---------|
| Section vertical | `py-16 md:py-24` |
| Section horizontal | `px-4 sm:px-6 lg:px-8` |
| Card grid gap | `gap-6 lg:gap-8` |
| Card internal | `p-6` |
| Form fields | `space-y-6` |
| Component gaps | `gap-4` to `gap-6` |

### Files to update

- `app/globals.css` (font vars)
- `components/layout/home/Header.tsx` (replace `mt-60` spacing)
- `components/layout/home/OurProducts.tsx` (replace `mt-60`)
- `components/layout/home/Shipping.tsx` (replace `mt-40`)
- `components/layout/home/License-section.tsx` (replace `py-40`)
- `app/(website)/products/page.tsx` (fix grid gaps)
- `app/(website)/checkout/page.tsx` (fix layout gaps)
- `app/(website)/layout.tsx` (remove `min-h-[70vh]`)

---

## 5. Brand Consistency + Product Card Fix

### Brand fixes

- `components/layout/Footer.tsx`: "Digital Device Services" → "ShibuHub"
- `components/layout/Footer.tsx`: Hardcoded "2025" → dynamic year
- `components/layout/Navbar.tsx`: Keep gradient logo, make it theme-aware
- `app/(website)/checkout/page.tsx`: Remove hardcoded user info, show empty state or use auth

### Product card fix

- `components/layout/Product.tsx`:
  - Remove `mix-blend-lighten` from image
  - Use `bg-muted rounded-lg` container for image
  - Keep `object-contain`
  - Replace `bg-indigo-500` button with `bg-primary`
  - Remove hidden `<i>` element hack

### Files to update

- `components/layout/Footer.tsx`
- `components/layout/Navbar.tsx`
- `components/layout/Product.tsx`
- `app/(website)/checkout/page.tsx`

---

## Verification

After implementation:

1. `bun run lint` — must pass
2. `bun run build` — must pass
3. Manual check: toggle dark mode on homepage, products, product detail, checkout, cart
4. Manual check: dashboard in both themes
5. Verify product images render correctly in both themes
6. Verify all loading states use skeleton/spinner consistently
