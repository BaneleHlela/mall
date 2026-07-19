// Shared helpers for the Store/Product/Service search endpoints.
// Keeps pagination math, tag parsing, and sort-key resolution identical
// across all three controllers instead of three drifting copies.

export const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const MAX_LIMIT = 50;
export const DEFAULT_LIMIT = 20;

export const parsePagination = ({ page, limit } = {}) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(MAX_LIMIT, Math.max(1, parseInt(limit, 10) || DEFAULT_LIMIT));
  return { page: pageNum, limit: limitNum, skip: (pageNum - 1) * limitNum };
};

// Comma-separated string (or array) -> normalized, deduped tag list, or null if empty.
export const parseTags = (tagsParam) => {
  if (!tagsParam) return null;
  const raw = Array.isArray(tagsParam) ? tagsParam : String(tagsParam).split(',');
  const tags = [...new Set(raw.map((t) => String(t).trim().toLowerCase()).filter(Boolean))];
  return tags.length ? tags : null;
};

// sortKey is untrusted request input: only ever index into these maps,
// never build a Mongo sort object from a raw string.
export const STORE_SORTS = {
  'top-rated': { 'rating.averageRating': -1 },
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  'most-liked': { 'likes.count': -1 },
  'most-viewed': { visits: -1 }, // top-level `visits` is the live field - see VisitController.js
};

export const PRODUCT_SORTS = {
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  'most-viewed': { 'perfomanceStats.views': -1 },
};

export const SERVICE_SORTS = { ...PRODUCT_SORTS };

// Returns a Mongo sort object, or null to mean "sort by $meta:textScore relevance"
// (only valid when hasTextQuery is true - callers must handle the null case themselves).
export const resolveSort = (sortMap, sortKey, hasTextQuery) => {
  if (sortKey && sortMap[sortKey]) return sortMap[sortKey];
  if (hasTextQuery) return null;
  return sortMap.newest;
};
