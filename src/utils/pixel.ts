export function trackAddToCart(productId: number, value: number) {
  if (typeof fbq !== 'undefined') {
    fbq('track', 'AddToCart', {
      content_ids: [productId],
      content_type: 'product',
      value: value,
      currency: 'DZD'
    });
  }
}

export function trackPurchase(value: number, products: Array<{ id: number, quantity: number }>) {
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Purchase', {
      content_ids: products.map(p => p.id),
      content_type: 'product',
      value: value,
      currency: 'DZD',
      num_items: products.reduce((sum, p) => sum + p.quantity, 0)
    });
  }
}

export function trackViewContent(productId: number, value: number) {
  if (typeof fbq !== 'undefined') {
    fbq('track', 'ViewContent', {
      content_ids: [productId],
      content_type: 'product',
      value: value,
      currency: 'DZD'
    });
  }
}