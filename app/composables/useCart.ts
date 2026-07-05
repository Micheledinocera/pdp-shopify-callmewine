export const useCart = () => {
  const cartData = useState<any>('cart', () => null);
  const pending = useState<boolean>('cart_pending', () => false);
  const isCartPanelOpen = useState<boolean>('is_cart_panel_open', () => false);

  const toggleCartPanelOpen = () => {
    isCartPanelOpen.value = !isCartPanelOpen.value;
  };

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

  const createCart = async (
    variantId: String,
    quantity = 1,
    options?: {giftOption: boolean; giftMessage: string},
  ) => {
    pending.value = true;
    try {
      const data = await $fetch('/api/cart/create', {
        method: 'POST',
        body: {
          variantId,
          quantity,
          options
        },
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

  const initCart = async () => {
    if (import.meta.client) {
      await fetchCart();
    }
  };

  const clearCart = () => {
    cartData.value = null;
    localStorage.removeItem('shopify_cart_id');
  };

  return {
    cart: cartData,
    pending,
    initCart,
    fetchCart,
    createCart,
    isCartPanelOpen,
    toggleCartPanelOpen,
    clearCart,
  };
};
