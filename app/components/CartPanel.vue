<template>
  <Teleport to="body">
    <div
      v-if="isCartPanelOpen"
      class="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <div class="absolute inset-0 overflow-hidden">
        <Transition
          appear
          enter-active-class="ease-in-out duration-500"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in-out duration-500"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            class="absolute inset-0 bg-gray-500/75 transition-opacity"
            @click="toggleCartPanelOpen"
          ></div>
        </Transition>

        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <Transition
            appear
            enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <div
              class="pointer-events-auto w-screen max-w-md bg-white shadow-xl flex flex-col h-full"
            >
              <div
                class="px-4 py-6 sm:px-6 border-b border-gray-200 flex items-center justify-between"
              >
                <div class="flex items-baseline gap-2">
                  <h2 class="text-lg font-medium text-gray-900">Il tuo Carrello</h2>
                  <span v-if="cart?.totalQuantity" class="text-sm text-gray-500"
                    >({{ cart.totalQuantity }})</span
                  >
                </div>
                <button
                  type="button"
                  class="text-gray-400 hover:text-gray-600 p-2 outline-none text-xl font-semibold transition-colors"
                  @click="toggleCartPanelOpen"
                >
                  ✕
                </button>
              </div>

              <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div v-if="pending" class="flex justify-center items-center h-32">
                  <div
                    class="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"
                  ></div>
                </div>

                <div
                  v-else-if="!cart || !cart.products || cart.products.length === 0"
                  class="text-center py-12"
                >
                  <p class="text-gray-500">Il tuo carrello è vuoto.</p>
                </div>

                <div v-else class="space-y-6">
                  <div class="flex justify-end">
                    <button
                      @click="clearCart"
                      class="text-xs text-gray-400 hover:text-secondary transition-colors underline"
                    >
                      Svuota carrello
                    </button>
                  </div>

                  <div
                    v-for="item in cart.products"
                    :key="item.variantId"
                    class="flex py-4 border-b border-gray-100 last:border-0"
                  >
                    <div
                      class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 p-1 bg-gray-50"
                    >
                      <img
                        :src="item.image"
                        :alt="item.imageAlt || item.title"
                        class="h-full w-full object-contain"
                      />
                    </div>

                    <div class="ml-4 flex flex-1 flex-col justify-between">
                      <div>
                        <div
                          class="flex justify-between text-base font-medium text-gray-900 gap-2"
                        >
                          <h3 class="line-clamp-2 text-sm font-semibold">
                            {{ item.title }}
                          </h3>
                          <p class="text-sm font-bold text-gray-900 whitespace-nowrap">
                            {{ item.price }}
                          </p>
                        </div>
                        <p class="mt-1 text-xs text-gray-400 uppercase tracking-wider">
                          {{ item.vendor }}
                        </p>
                        <div
                          v-if="item.giftOption == 'true' && item.giftMessage.length > 0"
                          class="mt-2 space-y-1 bg-amber-50/60 border border-amber-200/50 p-2 rounded text-xs"
                        >
                          <span class="font-medium flex items-center gap-1">
                            🎁 Confezione regalo inclusa
                          </span>
                          <!-- Mostra il messaggio di auguri -->
                          <span class="block text-gray-600 italic mt-0.5">
                            <span class="font-medium not-italic text-gray-700"
                              >Dedica:</span
                            >
                            "{{ item.giftMessage }}"
                          </span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between text-sm">
                        <p class="text-gray-500 text-xs">
                          Quantità:
                          <span class="font-medium text-gray-900">{{
                            item.quantity
                          }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="cart && cart.products && cart.products.length > 0"
                class="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-50"
              >
                <div
                  class="flex justify-between text-base font-medium text-gray-900 mb-6"
                >
                  <p class="font-semibold">Totale stimato</p>
                  <p class="font-bold text-lg text-secondary">{{ cart.totalCost }}</p>
                </div>

                <a
                  :href="cart.checkoutUrl"
                  target="_blank"
                  class="flex items-center justify-center rounded bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-secondary transition-colors uppercase w-full text-center tracking-wider"
                >
                  Procedi al Checkout
                </a>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { cart, pending, isCartPanelOpen, toggleCartPanelOpen, clearCart } = useCart();
</script>
