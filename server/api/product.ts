import type { ShopifyProduct } from "~~/types/ShopifyProduct"
import { formatShopifyPrice } from "~~/utils/formatters"

export default defineEventHandler(async (event): Promise<ShopifyProduct> => {
  const config = useRuntimeConfig(event)
  const queryParams = getQuery(event)
  
  const productId = queryParams.id
  if (!productId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing product ID',
    })
  }

  const fullShopifyId = `gid://shopify/Product/${productId}`

  const graphqlQuery = {
    query: `
      query getProduct($id: ID!) {
        product(id: $id) {
          title
          vendor
          featuredImage {
            url
            altText
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      id: fullShopifyId
    }
  }

  try {
    const response = await $fetch<{ data: any; errors?: any[] }>(config.shopifyStorefrontEndpoint as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.shopifyStorefrontToken as string
      },
      body: graphqlQuery
    })

    if (response.errors) {
      throw createError({
        statusCode: 500,
        statusMessage: response.errors[0]?.message || 'Shopify GraphQL Error'
      })
    }

    const variantNode = response.data?.product?.variants?.edges[0]?.node

    const formattedProduct: ShopifyProduct = {
        title: response.data?.product?.title || '',
        vendor: response.data?.product?.vendor || '',
        image: response.data?.product?.featuredImage?.url || '',
        imageAlt: response.data?.product?.featuredImage?.altText || '',
        variantId: variantNode?.id || '',
        price: formatShopifyPrice(variantNode?.price?.amount, variantNode?.price?.currencyCode),
        compareAtPrice: formatShopifyPrice(variantNode?.compareAtPrice?.amount, variantNode?.compareAtPrice?.currencyCode)
    }

    return formattedProduct
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Server Error'
    })
  }
})