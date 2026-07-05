export default defineNuxtPlugin(async (nuxtApp) => {
  const { initCart } = useCart();
  await initCart();
});