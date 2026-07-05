export const useCart = () => {
  const cartData = ref(null);
  const pending = ref(false);

  const fetchCart = async () => {
    const savedCartId = localStorage.getItem('shopify_cart_id');
    if (!savedCartId) return;

    pending.value = true;
    try {
      const data = await $fetch('/api/cart/get', {
        query: {id: savedCartId},
      });

      if (data) cartData.value = data;
      else localStorage.removeItem('shopify_cart_id');
    } catch (error) {
      console.error('Errore nel recupero del carrello:', error);
    } finally {
      pending.value = false;
    }
  };

  const createCart = async (variantId: String, quantity = 1) => {
    pending.value = true;
    try {
      const data = await $fetch('/api/cart/create', {
        method: 'POST',
        body: {variantId, quantity},
      });

      if (data?.id) {
        localStorage.setItem('shopify_cart_id', data.id);
        cartData.value = data;
      }
      return data;
    } catch (error) {
      console.error('Errore nella creazione del carrello:', error);
      throw error;
    } finally {
      pending.value = false;
    }
  };

  return {
    cart: cartData,
    pending,
    fetchCart,
    createCart,
  };
};
