# Solène Candle — Luxury Hand-Poured Candles

A premium D2C e-commerce store built with **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Zustand**.

> *Scent is a feeling. Make it yours.*

![Solène Candle](public/images/hero_banner.png)

## ✨ Features

- **Premium Design** — Warm terracotta accent, elegant typography (Cormorant Garamond + DM Sans), Framer Motion animations throughout.
- **Full E-Commerce Flow** — Shop, product detail pages, cart drawer, cart page, and mock checkout with order confirmation.
- **Collections** — Browse candles by mood: Dark & Moody, Floral, Fresh & Clean, Warm & Cosy.
- **Journal/Blog** — 3 full-length editorial articles with beautiful photography.
- **Content Pages** — About (with timeline), FAQ (animated accordion), Contact (with form), Shipping & Returns, Privacy Policy, Terms & Conditions.
- **Cart System** — Zustand-powered persistent cart with size selection, quantity control, and slide-out drawer.
- **AI-Generated Imagery** — All product and editorial photography generated with AI.
- **SEO Ready** — Open Graph tags, Twitter cards, structured metadata, semantic HTML.
- **Responsive** — Fully responsive across mobile, tablet, and desktop.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database (for production)

### Installation

```bash
git clone https://github.com/your-username/solene-candle.git
cd solene-candle
npm install
```

### Environment Variables

Copy the example env file and add your Neon database URL:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgres://user:password@your-neon-endpoint.neon.tech/neondb?sslmode=require"
```

### Database Setup

```bash
npx prisma db push
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

### Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

> **Note:** The app includes a mock Prisma client (`lib/prisma.ts`) that returns static data so the frontend works without a database connection. To use a real database, replace it with the standard PrismaClient setup (see `lib/prisma.real.ts.example` below).

## 🌐 Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com).
3. Add `DATABASE_URL` to your Vercel environment variables.
4. Deploy!

Prisma will auto-generate during the build step.

## 🗂️ Project Structure

```
app/
├── page.tsx              # Home (10 sections)
├── shop/page.tsx          # Shop with filters & sorting
├── shop/[slug]/page.tsx   # Product detail
├── collections/           # Collection listing & detail
├── cart/page.tsx           # Cart overview
├── checkout/page.tsx       # Mock checkout
├── journal/               # Blog listing & posts
├── about/page.tsx          # About (6 sections + timeline)
├── faq/page.tsx            # Animated FAQ accordion
├── contact/page.tsx        # Contact form
├── shipping-returns/       # Shipping rates & return policy
├── privacy/page.tsx        # Privacy policy
├── terms/page.tsx          # Terms & conditions
├── layout.tsx              # Root layout + SEO metadata
└── globals.css             # Design tokens
components/
├── home/                  # Hero, FeaturedProducts, WhyChooseUs, etc.
├── layout/                # Navbar, Footer, AnnouncementBar
├── shop/                  # ProductCard, QuickView, Filters, Sort
├── product/               # Gallery, Info, Tabs, Related
├── cart/                  # CartDrawer, CartItem, EmptyCart
└── ui/                    # Button, Input, Badge, Modal, etc.
store/
└── cartStore.ts           # Zustand cart state management
lib/
├── prisma.ts              # Mock Prisma client (static data)
├── mockData.ts            # Product & collection data
├── journalData.ts         # Blog post content
└── utils.ts               # formatPrice, cn
```

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--cream` | `#FAF7F2` | Primary background |
| `--warm-white` | `#FEFCF8` | Card backgrounds |
| `--charcoal` | `#1A1A1A` | Primary text |
| `--warm-gray` | `#6B6460` | Secondary text |
| `--gold` | `#C4956A` | Accent (warm terracotta) |
| `--gold-light` | `#D9BFA7` | Accent hover |
| `--blush` | `#F2E8E1` | Section backgrounds |

## 📄 License

MIT
