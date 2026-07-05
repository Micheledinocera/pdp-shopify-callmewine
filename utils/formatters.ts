import type {CartItem, ShopifyCart} from '~~/types/ShopifyCart';

export function formatShopifyPrice(
  amount: string | undefined,
  currencyCode: string | undefined,
): string {
  if (!amount) return '';

  const numericPrice = parseFloat(amount);
  if (isNaN(numericPrice)) return '';

  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: currencyCode || 'EUR',
    currencyDisplay: 'symbol',
  }).format(numericPrice);
}

export function formatShopifyCart(response: any): ShopifyCart {
  const formattedCart: ShopifyCart = {
    id: response.id,
    checkoutUrl: response.checkoutUrl,
    totalCost: formatShopifyPrice(
      response.cost.totalAmount.amount,
      response.cost.totalAmount.currencyCode,
    ),
    totalQuantity: response.totalQuantity,
    products: [],
  };
  formattedCart.products = response.lines.edges.map((edge: any) => {
    const cartItem: CartItem = {
      quantity: edge.node.quantity,
      title: edge.node.merchandise.product.title,
      vendor: edge.node.merchandise.product.vendor,
      variantId: edge.node.merchandise.id,
      image: edge.node.merchandise.product.featuredImage.url,
      imageAlt: edge.node.merchandise.product.featuredImage.altText,
      price: formatShopifyPrice(
        edge.node.merchandise.price.amount,
        edge.node.merchandise.price.currencyCode,
      ),
      giftOption: response.lines.edges[0].node.attributes.find(
        (attribute: {key: string; value: string}) =>
          attribute.key == 'giftOption',
      )?.value,
      giftMessage: response.lines.edges[0].node.attributes.find(
        (attribute: {key: string; value: string}) =>
          attribute.key == 'giftMessage',
      )?.value,
    };
    return cartItem;
  });
  return formattedCart;
}
