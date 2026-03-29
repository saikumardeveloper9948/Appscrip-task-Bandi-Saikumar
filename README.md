# Mettā Muse - E-Commerce Product Listing Platform

A fully responsive, feature-rich e-commerce product listing application built with **Next.js 16**, **React 19**, and **TypeScript**. Demonstrates modern web development practices including Server-Side Rendering (SSR), advanced filtering, search functionality, and mobile-first responsive design.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Component Documentation](#component-documentation)
- [Features Documentation](#features-documentation)
- [Styling & Responsive Design](#styling--responsive-design)
- [API Integration](#api-integration)
- [Browser Support](#browser-support)

---

## 🎯 Overview

Mettā Muse is a production-ready e-commerce platform that showcases modern React patterns, responsive web design, and user-centric features. The application fetches real product data from the Fake Store API and provides an intuitive interface for browsing, searching, and filtering products.

**Live Data Source:** [Fake Store API](https://fakestoreapi.com)

---

## ✨ Key Features

### 🔍 Search Functionality
- **Real-time product search** by product title
- **Case-insensitive matching** for better UX
- Search results update instantly as you type
- Integrated with product listing filters

### 🎛️ Advanced Filtering System
Complete filtering with 11 different filter categories:
- **CUSTOMIZABLE** — Product customization toggle
- **PRICE** — Dual input fields with range sliders
- **RATING** — 5-star rating selection (1★ to 5★)
- **IDEAL FOR** — Gender targeting (All, Men, Women, Unisex)
- **OCCASION** — Event type (Casual, Formal, Party, Wedding)
- **WORK** — Production methods (Hand-embroidered, Hand-painted, Machine-made)
- **FABRIC** — Material types (Cotton, Silk, Wool, Linen)
- **SEGMENT** — Product tier (Premium, Luxury, Budget)
- **SUITABLE FOR** — Season (Summer, Winter, All Seasons)
- **RAW MATERIALS** — Material sourcing (Natural, Organic, Recycled)
- **PATTERN** — Design patterns (Solid, Striped, Floral, Geometric)

Features:
- ✅ Collapsible/expandable filter sections
- ✅ "Clear All" button to reset filters
- ✅ Real-time product filtering
- ✅ Filter state persistence across page interactions

### 📊 Sorting Options
- **Recommended** — Default sorting
- **Newest First** — Newest products
- **Popular** — By review count
- **Price: Low to High** — Ascending order
- **Price: High to Low** — Descending order

### 🛒 Shopping Features
- **Add to Cart** — With dynamic badge counter
- **Wishlist Management** — Add/remove from wishlist
- **Real-time Counters** — Cart and wishlist item counts
- **Product Quick View** — Detailed product overlay

### 📱 Responsive Navigation
- **Desktop Navigation Bar** — Full menu below header
- **Mobile Hamburger Menu** — Transforms to "X" when open
- **Internal Navigation** — Hash-based links to sections:
  - #shop — Product listings
  - #contact — Footer contact section
  - #stories, #about, #skills — Additional sections
- **Smooth Page Scrolling** — Implemented globally

### 🎨 Header & Navigation
- **Sticky Header** — Remains visible while scrolling
- **Announcement Bar** — Promotional Messages
- **Search Bar** — Quick product search
- **Dynamic Badges** — Cart & wishlist counters
- **Language Selector** — Multiple language options
- **Account Menu** — Login, Sign Up, Profile, Orders
- **Skills Dropdown** — Design, Photography, Craftsmanship subcategories

### 📄 Footer
- **Newsletter Signup** — Email subscription
- **Company Information** — Contact details & branding
- **Payment Methods** — 6 branded payment icons (Google Pay, Mastercard, PayPal, AMEX, Apple Pay, DPay)
- **Quick Links** — Navigation shortcuts
- **Social Media Links** — Circular styled icons
- **Currency Selector** — Multiple currency options
- **Collapsible Sections** — Mobile-optimized footer
- **Dynamic Copyright** — Auto-updates with current year

### 📐 Responsive Design
- **Mobile First** — Optimized for mobile devices
- **4 Breakpoints:**
  - Small Mobile: < 600px
  - Mobile: 600px - 767px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+
- **Dynamic Grid Layout:**
  - Mobile: 2 columns
  - Tablet: 3 columns
  - Desktop: 3-4 columns (based on filter state)
- **Touch-Optimized** — Larger touch targets on mobile
- **Fluid Typography** — Using CSS clamp() for responsive text

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.2.1 |
| **JavaScript** | React 19.2.4 |
| **Language** | TypeScript 5 |
| **Styling** | CSS 3 (Grid, Flexbox, Custom Properties) |
| **HTTP Client** | Native Fetch API |
| **Build Tool** | Next.js App Router |
| **Package Manager** | npm |
| **Linting** | ESLint 9 |
| **CSS Preprocessor** | PostCSS 4 |

---

## 🏗️ Project Architecture

### Component Hierarchy

```
App (Root)
├── RootLayout
│   ├── ClientWrapper
│   │   ├── Header
│   │   │   └── Navigation Bar
│   │   ├── Hero Section
│   │   └── Section#shop
│   │       └── ProductListing
│   │           ├── FilterSidebar
│   │           └── ProductGrid
│   │               └── ProductCard[] (repeated)
│   └── Footer
```

### Data Flow

```
ClientWrapper (State Management)
├── searchQuery (Search state)
├── cartCount (Cart items)
├── wishlistCount (Wishlist items)
└── → Header (receives counts & search handler)
└── → ProductListing (receives filtered products)
    └── → FilterSidebar (filter controls)
    └── → ProductCard (interactive elements)
```

### State Management Strategy

- **App-Level State** — ClientWrapper manages global state
- **Component-Level State** — Individual components manage UI state (open/closed menus)
- **Callback Pattern** — Parent receives filter updates from children
- **Props Drilling** — Used for passing filters and handlers down the tree

---

## 📂 Project Structure

```
appscrip-task-bandi-saikumar/
├── src/
│   ├── app/
│   │   ├── globals.css              # Global styles (850+ lines)
│   │   ├── layout.tsx               # Root layout with Footer
│   │   ├── page.tsx                 # Home page with SSR
│   │   └── next-env.d.ts            # Next.js type definitions
│   │
│   ├── components/
│   │   ├── Header.tsx               # Header with nav, search, icons
│   │   ├── Footer.tsx               # Footer with newsletter, payments
│   │   ├── ClientWrapper.tsx        # App-level state management
│   │   ├── ProductListing.tsx      # Product grid & listing logic
│   │   ├── FilterSidebar.tsx        # 11-filter sidebar
│   │   └── ProductCard.tsx          # Individual product card
│   │
│   ├── lib/
│   │   ├── api.ts                   # Fake Store API integration
│   │   └── hooks.ts                 # Custom React hooks
│   │
│   └── types/
│       └── product.ts               # TypeScript interfaces
│
├── public/                           # Static assets
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript configuration
├── next.config.ts                    # Next.js configuration
├── postcss.config.mjs                # PostCSS configuration
├── eslint.config.mjs                 # ESLint configuration
└── README.md                         # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** — v18.0 or higher
- **npm** — v9.0 or higher

### Setup Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd appscrip-task-bandi-saikumar

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:3000
```

### Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint checks
```

---

## 📦 Component Documentation

### Header.tsx
**Purpose:** Main navigation header with search, cart, wishlist, and language selector

**Key Props:**
```typescript
interface HeaderProps {
  cartCount?: number;              // Shopping cart item count
  wishlistCount?: number;          // Wishlist item count
  onSearch?: (query: string) => void;  // Search callback
  searchQuery?: string;            // Current search query
}
```

**Features:**
- Sticky positioning
- Dropdown menus (Shop, Account, Language)
- Search bar with form submission
- Dynamic badge counters
- Mobile hamburger menu
- Navigation menu bar below header
- Hash-based internal navigation

**Components Used:**
- Navigation bar (secondary)
- Search form
- Icon buttons (search, wishlist, cart, account, language)

---

### ClientWrapper.tsx
**Purpose:** Root component managing global application state

**State Managed:**
```typescript
const [cartCount, setCartCount] = useState(0);       // Cart items
const [wishlistCount, setWishlistCount] = useState(0); // Wishlist items
const [searchQuery, setSearchQuery] = useState("");   // Search input
```

**Features:**
- Product filtering by search query
- Cart count tracking
- Wishlist count tracking
- Callback functions for state updates
- Server-Side Rendering for initial data

**Rendered Elements:**
- Header (with search functionality)
- Hero section
- ProductListing (with filtered products)
- Footer (in layout.tsx)

---

### ProductListing.tsx
**Purpose:** Main product grid with filtering, sorting, and responsive layout

**Key State:**
```typescript
const [selectedCategory, setSelectedCategory] = useState("");
const [sortBy, setSortBy] = useState("recommended");
const [showFilter, setShowFilter] = useState(true);
const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
// ... additional filter states
```

**Features:**
- Real-time product filtering
- Dynamic sorting
- Collapsible filter sidebar (mobile)
- Product count display
- "Hide/Show Filter" toggle
- Mobile sort dropdown
- Responsive grid layout (2-4 columns)

**Responsive Behavior:**
- Desktop: 3-4 columns with filter
- Tablet: 3 columns
- Mobile: 2 columns, collapsible filters

---

### FilterSidebar.tsx
**Purpose:** Advanced filtering panel with 11 filter categories

**Filter Categories:**
1. **Customizable** — Toggle checkbox
2. **Price** — Min/Max inputs + range slider
3. **Rating** — 5-star checkboxes
4. **Ideal For** — Gender selection
5. **Occasion** — Event type
6. **Work** — Production method
7. **Fabric** — Material type
8. **Segment** — Product tier
9. **Suitable For** — Season
10. **Raw Materials** — Material sourcing
11. **Pattern** — Design pattern

**Features:**
- Expandable/collapsible sections with chevron icons
- "Clear All" button to reset filters
- Real-time filter updates
- Visual feedback for active filters
- Touch-friendly checkboxes

**Note:** Additional filters (Ideal For, Occasion, etc.) display in UI but require product data attributes to function fully.

---

### ProductCard.tsx
**Purpose:** Individual product display with interactive elements

**Props:**
```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart?: (productTitle: string) => void;
  onAddToWishlist?: () => void;
  onRemoveFromWishlist?: () => void;
}
```

**Features:**
- Product image display
- Title and description
- Price display
- Star rating with review count
- "Add to Bag" button
- "Quick View" button
- Wishlist toggle

**Interactive Elements:**
- Hover effects on image (zoom)
- Smooth overlay animation
- Button interactions with callbacks

---

### Footer.tsx
**Purpose:** Footer section with company info, payment methods, and newsletter

**Sections:**

1. **Newsletter Signup**
   - Email input field
   - Subscribe button
   - Confirmation message

2. **Company Info**
   - "BE THE FIRST TO KNOW" section
   - Contact details (phone, email)
   - Currency selector

3. **Footer Links**
   - mettā muse (main navigation)
   - QUICK LINKS
   - FOLLOW US (social media)

4. **Payment Methods** (6 payment icons)
   - Google Pay (gradient)
   - Mastercard (red/orange)
   - PayPal (blue)
   - AMEX (blue)
   - Apple Pay (white)
   - DPay (purple)

5. **Social Links**
   - Circular white-bordered icons
   - Hover effects

**Mobile Features:**
- Collapsible sections with toggle arrows
- Payment icons displayed at bottom
- Stacked layout for better mobile UX

**Dynamic Features:**
- Copyright year auto-updates with current year
- Dynamic social links
- Responsive payment badge sizing

---

## 🎯 Features Documentation

### Search Functionality

**How It Works:**
1. User clicks search icon in header
2. Search form expands with input field
3. User types product name (case-insensitive)
4. Products filter in real-time
5. Submit to confirm search or click elsewhere to close

**Implementation:**
- Search input: `handleSearch(query: string)`
- Filter logic: `products.filter(p => p.title.toLowerCase().includes(query))`
- State: `searchQuery` in ClientWrapper
- Props: `onSearch` callback to Header

**Examples:**
- Search "Backpack" → Shows backpack products
- Search "Jacket" → Shows jacket products
- Clear search → Shows all products

---

### Price Range Filtering

**How It Works:**
1. Open PRICE section in FilterSidebar
2. Set Min price (default: $0)
3. Set Max price (default: $1000)
4. Use range sliders or input fields
5. Products update instantly

**Implementation:**
- Twin range sliders (CSS)
- Min/Max input fields
- `priceRange: { min: number; max: number }`
- Filter: `p.price >= min && p.price <= max`
- Real-time display of selected range

---

### Rating Filter

**How It Works:**
1. Open RATING section
2. Select one or more star ratings:
   - 5★
   - 4★ & above
   - 3★ & above
   - 2★ & above
   - 1★ & above
3. Products with matching ratings display

**Implementation:**
- Checkbox array: `selectedRatings: number[]`
- Filter: `selectedRatings.some(r => p.rating.rate >= r)`
- Visual feedback: Checkmark appears when selected

---

### Cart & Wishlist

**Cart System:**
- Click "Add to Bag" button on product card
- Cart counter increments in header
- Real-time update
- Badge shows total items

**Wishlist System:**
- Click heart icon to add/remove
- Wishlist counter increments in header
- Visual feedback (filled/unfilled heart)
- Real-time updates

**Note:** Both currently track counts only. Full functionality (persistent storage, cart editing) can be added with localStorage or backend integration.

---

### Mobile Menu

**Features:**
- Hamburger icon transforms to "X" when menu is open
- Menu includes all navigation items
- Smooth collapse/expand animation
- Centered alignment
- Account section separated with divider
- All links use hash navigation (#shop, #contact, etc.)

**Navigation Items:**
- SHOP (primary)
- SKILLS (dropdown)
  - Design
  - Photography
  - Craftsmanship
- STORIES
- ABOUT
- CONTACT US
- Account section:
  - Login
  - Sign Up

---

## 🎨 Styling & Responsive Design

### CSS Architecture

**Responsive Breakpoints:**
```css
Max-width: 767px          → Mobile (2-column grid)
Min-width: 768px          → Tablet+ (3-column grid)
Min-width: 1024px         → Desktop (3-4 column grid)
```

**Key CSS Features:**
- CSS Grid for product layout
- Flexbox for navigation and spacing
- CSS Custom Properties for colors
- CSS clamp() for responsive typography
- Media queries for responsive behavior
- Smooth transitions and animations

**Color Scheme:**
```css
--color-black: #000000
--color-white: #ffffff
--color-gray-100: #f5f5f5
--color-gray-200: #e8e8e8
--color-gray-500: #737373
--color-gray-700: #404040
--color-accent: #8b6914 (Metta Muse Gold)
```

**Typography:**
```css
--font-primary: 'Helvetica Neue', Arial, sans-serif
Font sizes: clamp(11px, 3.5vw, 52px) for hero title
Letter-spacing: 0.05em for headings
```

### Responsive Product Grid

**Mobile (< 768px):**
```css
grid-template-columns: repeat(2, 1fr);
gap: 16px;
padding: 0 16px;
```

**Tablet (768px - 1024px):**
```css
grid-template-columns: repeat(3, 1fr);
gap: 24px;
padding: 0 24px;
```

**Desktop (1024px+):**
```css
grid-template-columns: repeat(4, 1fr);    / with filter open
grid-template-columns: repeat(3, 1fr);    / with filter closed
gap: 32px;
padding: 0 24px;
```

### Mobile Optimizations

- Touch-friendly button sizes (40px minimum)
- Larger font sizes for readability
- Hamburger menu instead of desktop nav
- Collapsible filter sidebar
- Full-width inputs on mobile
- Vertical stacked layouts
- Optimized spacing for thumbs
- High contrast for visibility

---

## 🌐 API Integration

### Data Source
**Fake Store API** — https://fakestoreapi.com

### API Endpoints Used

**1. GET /products**
```typescript
fetch('https://fakestoreapi.com/products')
Returns: Product[]
```

**Response Example:**
```json
{
  "id": 1,
  "title": "Fjallraven Backpack",
  "price": 109.95,
  "description": "Your perfect pack...",
  "category": "men's clothing",
  "image": "https://...",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}
```

**2. GET /products/categories**
```typescript
fetch('https://fakestoreapi.com/products/categories')
Returns: string[]
```

**Available Categories:**
- electronics (13 products)
- jewelery (4 products)
- men's clothing (4 products)
- women's clothing (6 products)

### Implementation

**File:** `src/lib/api.ts`

```typescript
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}
```

**Type Definitions:** `src/types/product.ts`

```typescript
export interface ProductRating {
  rate: number;    // 0-5 star rating
  count: number;   // Number of reviews
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}
```

### Server-Side Rendering (SSR)

**Page:** `src/app/page.tsx`

```typescript
export const dynamic = "force-dynamic";  // Always fetch fresh data

const products = await fetchProducts();
const categories = await fetchCategories();
```

**Benefits:**
- ✅ Fresh data on each page load
- ✅ SEO optimized (content in HTML)
- ✅ Faster initial page render
- ✅ Better search engine indexing

---

## 🌍 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| Mobile Safari | 14+ | ✅ Full Support |
| Chrome Mobile | 90+ | ✅ Full Support |

**Required Features:**
- CSS Grid & Flexbox
- CSS Custom Properties
- CSS clamp()
- ES6+ JavaScript
- Fetch API
- LocalStorage (for future cart persistence)

---

## 🔮 Future Enhancements

### Planned Features

1. **Cart Persistence**
   - Save cart to localStorage
   - Persist across sessions
   - Cart data recovery

2. **Wishlist Persistence**
   - Save wishlists to localStorage
   - Share wishlists
   - Wishlist compilation

3. **User Authentication**
   - Login/Sign up functionality
   - User profiles
   - Saved addresses
   - Order history

4. **Advanced Search**
   - Search suggestions/autocomplete
   - Search history
   - Popular searches
   - Search analytics

5. **Product Details Page**
   - Full product page
   - Detailed images
   - Customer reviews
   - Related products

6. **Checkout Flow**
   - Cart review
   - Shipping address
   - Payment integration
   - Order confirmation

7. **Analytics & SEO**
   - Google Analytics integration
   - Product schema markup
   - Sitemap generation
   - Meta tags per product

8. **Performance Optimization**
   - Image lazy loading
   - Code splitting
   - CSS optimization
   - Caching strategies

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author

**Bandi Saikumar**
- Project: Appscrip Task
- Date: March 2026
- Built with: Next.js 16, React 19, TypeScript

---

## 📞 Support & Contact

For issues, questions, or feedback:
- mettamuse.com
- Phone: +44 221 133 5360
- Email: customercare@mettamuse.com

---

**Last Updated:** March 29, 2026
**Version:** 1.0.0

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
