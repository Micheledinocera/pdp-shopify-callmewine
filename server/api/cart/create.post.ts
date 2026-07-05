import {defineEventHandler, readBody, createError} from 'h3';
import { formatShopifyCart } from '~~/utils/formatters';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);

  const {variantId, quantity} = body;

  if (!variantId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Variant ID is required to initialize a cart',
    });
  }

  const graphqlQuery = {
    query: `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        vendor
                        featuredImage {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      input: {
        lines: [
          {
            merchandiseId: variantId,
            quantity: quantity || 1,
          },
        ],
      },
    },
  };

  try {
    const response = await $fetch<{data: any; errors?: any[]}>(
      config.shopifyStorefrontEndpoint as string,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token':
            config.shopifyStorefrontToken as string,
        },
        body: graphqlQuery,
      },
    );

    if (response.errors || response.data?.cartCreate?.userErrors?.length > 0) {
      const errorMsg =
        response.errors?.[0]?.message ||
        response.data?.cartCreate?.userErrors?.[0]?.message;
      throw createError({
        statusCode: 500,
        statusMessage: errorMsg || 'Shopify Cart Creation Error',
      });
    }
    return formatShopifyCart(response.data?.cartCreate?.cart);
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Server Error during cart creation',
    });
  }
});
