/**
 * formatCurrency.js
 * Centralized Poké Coins currency formatter for Delibird Mart.
 * Formats values into official Poké Coins representation (e.g. 🪙 18,000).
 */

export function formatPokéCoins(price) {
  if (price === undefined || price === null || isNaN(price)) return '🪙 0';
  const numeric = Number(price);
  return `🪙 ${numeric.toLocaleString('en-US')}`;
}

export function formatPrice(price) {
  return formatPokéCoins(price);
}
