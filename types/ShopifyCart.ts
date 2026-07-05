import type { ShopifyProduct } from "./ShopifyProduct";

export interface CartItem extends ShopifyProduct {
  quantity: number;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: string;
  totalCost: string;
  products: CartItem[];
}