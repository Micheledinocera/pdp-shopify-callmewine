export const useProduct = (productId: string) => {
  const { data: product, pending, error } = useFetch('/api/product', {
    query: { id: productId },
    key: `product-fetch-${productId}`
  })
  
  return {
    product,
    pending,
    error
  }
}
