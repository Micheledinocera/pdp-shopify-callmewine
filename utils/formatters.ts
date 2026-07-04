export function formatShopifyPrice(amount: string | undefined, currencyCode: string | undefined): string {
  if (!amount) return '';

  const numericPrice = parseFloat(amount);
  if (isNaN(numericPrice)) return '';

  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: currencyCode || 'EUR',
    currencyDisplay: 'symbol'
  }).format(numericPrice);
}