export const useProduct = (productId: string) => {
  const {currentLocale} = useLocale();

  const {
    data: product,
    pending,
    error,
  } = useFetch('/api/product', {
    query: {id: productId, countryCode: currentLocale.value.country},
    key: `product-fetch-${productId}`,
  });

  return {
    product,
    pending,
    error,
  };
};
