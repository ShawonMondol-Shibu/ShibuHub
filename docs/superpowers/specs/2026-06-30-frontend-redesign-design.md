# ShibuHub Frontend Redesign — Design Spec

**Date:** 2026-06-30
**Scope:** Full frontend rebuild (website + dashboard + auth pages)
**Direction:** Clean minimal, Indigo color scheme, Polished and professional

---

## 1. Design System

### Colors
- **Primary:** Indigo `oklch(55% 0.25 270)` — slightly more saturated than current
- **Background (light):** Pure white `oklch(1 0 0)`
- **Background (dark):** Blue-tinted dark `oklch(0.13 0.005 270)`
- **Muted/gray:** Warm gray scale (not pure gray, slight warmth)
- **Accent:** Indigo-50 for subtle backgrounds

### Typography
- **Font:** Lato (400/700) — keep existing
- **Letter-spacing:** Tighter on headings (`-0.02em`)
- **Type scale:** 14/16/20/24/32/48/64px

### Spacing
- **Section padding:** 80-120px vertical
- **Card padding:** 24-32px consistently
- **Element gaps:** 8/12/16/24/32/48px scale

### Shadows
- Cards: `shadow-sm` at rest, `shadow-lg` on hover
- No `shadow-xl` or `shadow-2xl` at rest
- Inputs: Subtle border, focus ring in indigo

### Border Radius
- Cards: `rounded-xl` (12px)
- Buttons: `rounded-lg` (8px) primary, `rounded-full` for pills
- Inputs: `rounded-lg` (8px)

### Components
- **Buttons:** Solid indigo primary, outline secondary, ghost tertiary
- **Cards:** White bg, 1px border, subtle shadow
- **Inputs:** Clean border, focus ring in indigo
- **Badges:** Soft pill shape with tinted backgrounds

---

## 2. Navigation

### Desktop Navbar
- Fixed top, glassmorphism (`bg-background/80 backdrop-blur-xl`)
- Logo (ShibuHub) on left with icon
- Centered nav links: Home, Products, About, Contact
- Right side: Search icon, Cart (badge), Favourites (badge), User avatar
- Active link: Bottom border indicator (2px indigo line) — not filled background
- Links: `text-sm font-medium text-muted-foreground`, active = `text-foreground`
- Height: 64px
- Dashboard link removed from main nav (accessible via user dropdown)

### Mobile Navbar
- Same logo + user icons on top
- Hamburger menu slides in as full-width dropdown
- Animated menu items with stagger fade-in

### User Dropdown
- Shows name/email if logged in, "Sign In" if not
- Cart, Favourites, Profile, Logout
- Badge counts on Cart and Favourites

---

## 3. Homepage

### Hero Section
- Full-width, `min-h-[80vh]`
- Left: Large bold heading "Premium Electronics for Your Digital Life", subtitle, CTA button "Browse Products"
- Right: Featured product image with subtle floating animation
- Background: Soft gradient with decorative grid pattern (low opacity)
- **No carousel** — static hero with one featured product (faster load, clearer message)
- Below hero: "Featured Categories" row (Electronics, Clothing, Jewelry) as clickable cards

### Our Products
- Section title with subtle underline accent
- 4-column grid (responsive: 1→2→3→4)
- Product cards: White bg, rounded-xl, subtle shadow, image with hover scale, title, price, "View" button
- Heart icon top-right on each card
- "View All Products" link at bottom center

### Electronics Services
- 3-column grid of service cards
- Icon centered, title below, description
- Cards with subtle left border accent (indigo)

### Shipping & Delivery
- 3 cards: Standard, Express, Same-Day
- Each with icon, name, duration, price
- Subtle gradient backgrounds on cards

### License/Certifications
- 6-card grid (2×3)
- Icon, title, badge, description
- Clean card design with hover lift

### Footer
- 4-column layout: Brand + description, Quick Links, Contact, Newsletter
- Newsletter: Email input + Subscribe button
- Social icons row
- Payment methods row
- Copyright bar at bottom

---

## 4. Products Page

- Breadcrumb at top
- Page heading: "Our Collection" with subtitle
- Search bar: Clean input with search icon, full-width max-w-2xl
- Category filters: Horizontal pill buttons (All, Electronics, Clothing, Jewelry)
- Product grid: Same 4-column responsive grid
- Pagination: Clean numbered buttons with prev/next
- Empty state: Icon + message when no results

## 5. Product Detail Page

- Breadcrumb at top
- Two-column layout (image left, info right)
- Image: Large square container with rounded corners, subtle shadow
- Info: Category badge, title, star rating, price, description
- Add to Cart + Favourite buttons
- Feature badges: Free Shipping, Warranty, Returns
- Reviews section below with avatars, names, star ratings, comments
- "Similar Products" section at bottom

---

## 6. Cart & Checkout

### Cart Page
- Breadcrumb
- Empty state if no items
- Each item: Product image (64×64), title, description, price, quantity controls (−/+), remove button
- Cart summary at bottom: Total + "Proceed to Checkout" button

### Checkout Page
- Two-column: Order items list (left) + Order summary card (right)
- Summary: Items count, subtotal, shipping (Free), total, "Pay with Stripe" button
- Success page: Checkmark icon, confirmation message, "View My Orders" link

---

## 7. Auth Pages (Login & Signup)

- Centered card on full-height background
- Clean card with subtle shadow and border
- Login: Email + Password fields, "Login" button, "Don't have an account? Sign up" link
- Signup: Full name, Email, Phone, Address, Password, Confirm Password, "Create Account" button
- Both use form validation with inline error messages

---

## 8. About Page

- Breadcrumb
- Hero heading: "About ShibuHub"
- Founder card: Photo, name, title, bio details
- Stats row: 4 cards (Years, Customers, Products, Partners)
- Mission & Expertise sections with text + images
- Partner brands: Logo grid

## 9. Contact Page

- Breadcrumb
- Heading: "Get in Touch"
- Two-column: Contact form (left) + Contact info card (right)
- Form: Name, Email, Phone, Message, Submit button
- Info card: Email, Phone, Address, Hours + Social links

---

## 10. Profile Page

### Layout
Two-column (sidebar + main content)

### Left Sidebar (sticky)
- User avatar (large, rounded-full)
- Name, email
- Contact info items: Phone, Address
- "Edit Profile" button

### Right Content
- Tab navigation: Pending Orders | Completed Orders | Cancelled Orders
- Each tab shows a list of order cards
- Order card: Order ID (truncated), status badge (color-coded), date, items list, total

### Order Status Colors
- Pending: Yellow/amber badge
- Processing: Blue badge
- Shipped: Indigo badge
- Delivered: Green badge
- Cancelled: Red badge

---

## 11. Dashboard Pages

### Dashboard Home
- Stats cards row: Total Revenue, Orders, Customers, Products
- Clean card design with icons and values

### Products Management
- Table with columns: Name, Category, Price, Stock, Actions
- "Add Product" button in header
- Actions: Edit (pencil icon), Delete (trash icon)
- Row hover effect

### Add Product Form
- Centered card layout
- Form fields: Name, Model, Category, Brand, Price, Description
- Clean form styling with consistent spacing

### Orders Management
- Table: Order ID, Customer, Total, Status (dropdown), Date
- Status dropdown to change order status inline
- Row highlighting by status

### Clients
- Table: Name, Email, Role, Joined date, Actions (delete)
- Empty state when no customers

### Teams
- Table: Name, Email, Role, Joined date
- "Add Member" button

### Dashboard Auth (Login/Signup)
- Same clean card design as customer auth
- Separate from customer auth routes

---

## 12. Favourite Page

- Breadcrumb
- Empty state if no favourites
- Each item: Product image (64×64), title, price, "View Product" button, remove button
- Grid or list layout

---

## 13. Checkout Success Page

- Centered layout
- Checkmark icon (green)
- "Order Confirmed!" heading
- Thank you message
- Order reference (truncated)
- "View My Orders" button

---

## 14. Shared Components

### Loading States
- Skeleton loaders matching content layout
- Spinner for button actions

### Empty States
- Icon + title + description + optional action button
- Consistent across all list pages

### Error States
- Error message + retry button
- Consistent across data-fetching pages

### Breadcrumbs
- Dynamic breadcrumb component (already exists, will polish styling)
- Indigo accent on active segment

---

## 15. Key Changes from Current

1. **Hero:** Remove carousel, use static hero with one featured product
2. **Navbar:** Remove Dashboard link from main nav, add search/cart/favourites icons
3. **Product Cards:** Remove `CardHeader` usage, use simpler card structure
4. **Footer:** Restructure to 4-column with newsletter
5. **Auth Pages:** Add background styling, improve card design
6. **Profile:** Two-column layout with sidebar
7. **Dashboard:** Consistent table styling with hover effects
8. **All Pages:** Consistent spacing, shadows, border-radius

---

## 16. Files to Modify

### Layout & Navigation
- `components/layout/Navbar.tsx`
- `components/layout/NavbarUser.tsx`
- `components/layout/Footer.tsx`
- `components/layout/DynamicBreadcrumb.tsx`
- `app/(website)/layout.tsx`

### Homepage
- `components/layout/home/Header.tsx`
- `components/layout/home/OurProducts.tsx`
- `components/layout/home/Services.tsx`
- `components/layout/home/Electronics.tsx`
- `components/layout/home/Shipping.tsx`
- `components/layout/home/License-section.tsx`
- `app/(website)/page.tsx`

### Product Components
- `components/layout/Product.tsx`
- `app/(website)/products/page.tsx`
- `app/(website)/products/[id]/ProductPage.tsx`

### Cart & Checkout
- `app/(website)/cart/page.tsx`
- `app/(website)/checkout/page.tsx`
- `app/(website)/checkout/success/page.tsx`

### Auth Pages
- `app/(auth)/login/page.tsx`
- `app/(auth)/signup/page.tsx`
- `app/dashboard/(auth)/signIn/page.tsx`
- `app/dashboard/(auth)/signUp/page.tsx`

### Profile & Orders
- `app/(website)/profile/page.tsx`
- `app/(website)/profile/PendingOrders.tsx`
- `app/(website)/profile/CompleteOrders.tsx`
- `app/(website)/profile/CanceledOrders.tsx`
- `app/(website)/favourite/page.tsx`

### Contact & About
- `app/(website)/contact/page.tsx`
- `app/(website)/about/page.tsx`
- `components/layout/contact/ContactForm.tsx`
- `components/layout/contact/ContactInfo.tsx`

### Dashboard
- `app/dashboard/(pages)/page.tsx`
- `app/dashboard/(pages)/products/page.tsx`
- `app/dashboard/(pages)/addProducts/page.tsx`
- `app/dashboard/(pages)/orders/page.tsx`
- `app/dashboard/(pages)/clients/page.tsx`
- `app/dashboard/(pages)/teams/page.tsx`
- `app/dashboard/(pages)/layout.tsx`

### Shared
- `components/shared/loading-page.tsx`
- `components/shared/empty-state.tsx`
- `components/shared/error-page.tsx`
- `components/shared/spinner.tsx`

### Styles
- `app/globals.css` (color variables, shadows, border-radius updates)
