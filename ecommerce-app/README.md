# Shopfront

A clean, production-ready React e-commerce storefront with multi-category browsing, product detail pages, and a persistent shopping cart.

## Stack

- **React 18** with function components and hooks
- **React Router v6** for client-side routing
- **Vite** for dev server and production builds
- Plain CSS with design tokens (no framework lock-in)
- No backend yet — a mock data layer with a real-API-shaped interface stands in for one

## Getting started

```bash
npm install
npm run dev       # start dev server at http://localhost:3000
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/
    common/       Spinner, ErrorMessage, StarRating — generic, reusable, no business logic
    layout/        Header, Footer, Layout (route shell), CartDrawer
    product/       ProductCard, ProductGrid, ProductGallery, SortControl
    category/      CategoryCard
  pages/            One component per route: Home, Category, Search, ProductDetail, Cart, NotFound
  context/          CartContext — global cart state via useReducer + Context
  hooks/            useAsync — generic data-fetching hook (loading/error/data/refetch)
  services/         api.js — the ONLY module that knows where data comes from
  data/             mockData.js — fake categories/products, shaped like real API responses
  utils/            format.js — currency formatting, clamping, etc.
  styles/           index.css — design tokens + all component styles
```

## Architecture notes

**Data layer is isolated.** Every component calls functions in `services/api.js`
(`getCategories`, `getProducts`, `getProductById`, etc.) rather than importing
mock data directly. Swapping to a real backend means rewriting the bodies of
those functions to call `fetch()` against your API — no component code
changes. See the comment block at the top of `services/api.js` for an example.

**State is split by scope.**
- Cart state is global (many components need it: header badge, drawer, detail page, cart page) → React Context + `useReducer`, persisted to `localStorage`.
- Data-fetching state (loading/error/data) is local to whichever page needs it, via the `useAsync` hook — no need for a global store for things only one page renders.
- UI-only state (gallery active image, mobile menu open, search input) stays in the component that owns it with `useState`.

**Routing** uses a single layout route (`Layout`) that wraps all pages with
the header/footer/cart drawer via `<Outlet />`, so adding a new page is just
adding a new `<Route>` inside it.

**Loading/error handling is consistent.** `useAsync` returns
`{ data, isLoading, error, refetch }` for every fetch, and pages render the
same `Spinner` / `ErrorMessage` components in the same pattern, so behavior
doesn't drift between pages.

