import {defineEventHandler, getQuery, createError} from 'h3';
import {formatShopifyCart} from '~~/utils/formatters';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const queryParams = getQuery(event);
  const cartId = queryParams.id;
  const countryCode = queryParams.countryCode;

  if (!cartId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing cart ID parameter',
    });
  }

  const graphqlQuery = {
    query: `
      query getCart($id: ID!, $country: CountryCode!) @inContext(country: $country) {
        cart(id: $id) {
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
                attributes {
                  key
                  value
                }
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
      }
    `,
    variables: {
      id: cartId,
      country: countryCode,
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

    if (response.errors) {
      throw createError({
        statusCode: 500,
        statusMessage:
          response.errors[0]?.message || 'Shopify Fetch Cart Error',
      });
    }
    return formatShopifyCart(response.data?.cart) || null;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Server Error while fetching cart',
    });
  }
});
