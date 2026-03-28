# Appscrip Task — Bandi Saikumar

A responsive e-commerce product listing page built with **Next.js 16** (App Router) demonstrating Server-Side Rendering (SSR), SEO best practices, and clean code structure.

## Features

- **Next.js App Router** with **Server-Side Rendering (SSR)** — products are fetched on each request
- **Responsive design** — works on mobile, tablet, and desktop
- **SEO optimised** — page title, meta description, H1/H2 tags, JSON-LD schema markup, and descriptive image `alt` text
- **Product listing** powered by [fakestoreapi.com](https://fakestoreapi.com/)
- **Filter sidebar** — filter by product category
- **Sort options** — recommended, newest, popular, price ascending/descending
- **Accessible markup** — ARIA roles, labels, and landmarks throughout
- Minimal external dependencies — only Next.js, React, and TypeScript

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Pure CSS (no CSS framework)
- **API:** [fakestoreapi.com](https://fakestoreapi.com/)

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global CSS (responsive, variables)
│   ├── layout.tsx        # Root layout with Header & Footer
│   └── page.tsx          # Home page (SSR data fetch)
├── components/
│   ├── Header.tsx        # Sticky header with nav & icons
│   ├── Footer.tsx        # Footer with links & newsletter
│   ├── FilterSidebar.tsx # Collapsible category/filter sidebar
│   ├── ProductCard.tsx   # Individual product card
│   └── ProductListing.tsx# Product grid with filter & sort state
├── lib/
│   └── api.ts            # API utilities (fakestoreapi.com)
└── types/
    └── product.ts        # TypeScript interfaces
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build & Start

```bash
npm run build
npm start
```

## SEO

The page includes:
- **`<title>`** and **`<meta name="description">`** via Next.js Metadata API
- **`<h1>`** on the hero section and **`<h2>`** on product cards and footer sections
- **JSON-LD schema** (`@type: Store` + `OfferCatalog`) in `<script type="application/ld+json">`
- Descriptive `alt` text on all product images (e.g. `"Fjallraven Backpack - men's clothing product image"`)
- SEO-friendly image name attribute derived from the product title
