/**
 * Data access layer.
 *
 * Every component talks to this module, never to `mockData.js` directly.
 * That means swapping the mock store for a real backend is a one-file change:
 * replace the function bodies below with `fetch()` calls against your API,
 * keep the same signatures and return shapes, and the rest of the app is
 * unaffected.
 *
 * Example of what a real implementation might look like:
 *
 *   const BASE_URL = import.meta.env.VITE_API_BASE_URL;
 *
 *   export async function getCategories() {
 *     const res = await fetch(`${BASE_URL}/categories`);
 *     if (!res.ok) throw new ApiError('Failed to load categories', res.status);
 *     return res.json();
 *   }
 */

import { categories, products } from '../data/mockData';

/** Simulated network latency so loading states are visible during development. */
const MOCK_DELAY_MS = 350;

export class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch all product categories.
 * @returns {Promise<Array<{id: string, name: string, description: string, image: string}>>}
 */
export async function getCategories() {
  await delay(MOCK_DELAY_MS);
  return [...categories];
}

/**
 * Fetch a single category by id.
 * @param {string} categoryId
 * @returns {Promise<object>}
 */
export async function getCategoryById(categoryId) {
  await delay(MOCK_DELAY_MS);
  const category = categories.find((c) => c.id === categoryId);
  if (!category) {
    throw new ApiError(`Category "${categoryId}" not found`, 404);
  }
  return { ...category };
}

/**
 * Fetch products, optionally filtered by category and/or search term.
 * @param {{categoryId?: string, search?: string, sortBy?: 'price-asc'|'price-desc'|'rating'|'name'}} [options]
 * @returns {Promise<Array<object>>}
 */
export async function getProducts(options = {}) {
  await delay(MOCK_DELAY_MS);
  const { categoryId, search, sortBy } = options;

  let results = [...products];

  if (categoryId) {
    results = results.filter((p) => p.categoryId === categoryId);
  }

  if (search) {
    const term = search.trim().toLowerCase();
    if (term) {
      results = results.filter(
        (p) => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
      );
    }
  }

  switch (sortBy) {
    case 'price-asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'name':
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return results;
}

/**
 * Fetch a single product by id.
 * @param {string} productId
 * @returns {Promise<object>}
 */
export async function getProductById(productId) {
  await delay(MOCK_DELAY_MS);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    throw new ApiError(`Product "${productId}" not found`, 404);
  }
  return { ...product };
}

/**
 * Fetch a small set of related products from the same category.
 * @param {string} productId
 * @param {number} [limit=4]
 * @returns {Promise<Array<object>>}
 */
export async function getRelatedProducts(productId, limit = 4) {
  await delay(MOCK_DELAY_MS);
  const product = products.find((p) => p.id === productId);
  if (!product) return [];
  return products.filter((p) => p.categoryId === product.categoryId && p.id !== productId).slice(0, limit);
}
