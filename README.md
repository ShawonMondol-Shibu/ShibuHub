# ShibuHub

A full-stack e-commerce storefront + admin dashboard built with Next.js 15, BetterAuth, Drizzle ORM, NeonDB, and Stripe.

## Tech Stack

- **Framework**: Next.js 15 (App Router + Turbopack)
- **Auth**: BetterAuth (email/password with role-based access)
- **Database**: NeonDB (serverless PostgreSQL) + Drizzle ORM
- **Payments**: Stripe Checkout + Webhooks
- **UI**: shadcn/ui (new-york style) + Tailwind CSS v4
- **State**: React Query v5 + React Context
- **Package Manager**: Bun

## Features

### Storefront
- Product browsing with search, category filtering, and pagination
- Product detail pages with ratings, reviews, and similar products
- Shopping cart with quantity management (localStorage persistence)
- Favourites/wishlist
- Stripe checkout with webhook order confirmation
- User authentication (signup/signin)
- Profile with order history

### Admin Dashboard
- Real-time stats (revenue, orders, customers, products)
- Product CRUD management
- Order management with status updates
- Customer management
- Team member management
- Contact form submissions
- Role-based access control (admin/manager/staff)

## Getting Started

### Prerequisites
- Node.js 18+
- Bun
- NeonDB account (free tier)
- Stripe account (test mode)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/shibuhub.git
cd shibuhub

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Push database schema
bun run db:push

# Seed database with sample products
bun run db:seed

# Start development server
bun run dev
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# BetterAuth
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Database Schema

- **users** - User accounts with roles (admin/manager/staff)
- **categories** - Product categories
- **products** - Product catalog with images, pricing, stock
- **orders** - Customer orders with Stripe integration
- **order_items** - Individual items in orders
- **reviews** - Product reviews
- **favourites** - User wishlists
- **contact_messages** - Contact form submissions

## Scripts

```bash
bun run dev          # Development server
bun run build        # Production build
bun run lint         # ESLint
bun run db:push      # Push schema to database
bun run db:seed      # Seed sample data
bun run db:studio    # Drizzle Studio (database GUI)
```

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Configure Stripe webhook endpoint: `https://your-domain.vercel.app/api/webhook`
5. Deploy

## License

MIT
