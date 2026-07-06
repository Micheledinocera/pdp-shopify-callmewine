<!-- pages/products/[id].vue -->
<template>
  <div>
    <NuxtLink
      to="/"
      class="text-sm text-gray-500 hover:text-secondary inline-flex items-center gap-1 mb-6"
    >
      ← {{$t('product.back')}}
    </NuxtLink>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      <!-- Colonna Sinistra: Immagine -->
      <div
        class="flex justify-center items-center bg-white p-8 rounded-lg border border-gray-100 shadow-sm min-h-[400px]"
      >
        <div
          class="animate-pulse flex space-x-4 w-full justify-center"
          v-if="pendingProduct"
        >
          <div class="w-64 h-80 bg-gray-200 rounded"></div>
        </div>
        <img
          v-else-if="product?.image"
          :src="product.image"
          :alt="product.title"
          class="max-h-[450px] object-contain transition-transform hover:scale-105 duration-300"
        />
      </div>

      <!-- Colonna Destra: Dettagli e Info Acquisto -->
      <div class="flex flex-col justify-between">
        <div>
          <!-- Vendor -->
          <p class="text-sm uppercase tracking-widest text-gray-400 font-medium mb-1">
            {{ product?.vendor || $t('product.loading') }}
          </p>
          <!-- Titolo -->
          <h1 class="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
            {{ product?.title || $t('product.productNamePlaceholder') }}
          </h1>

          <!-- Prezzi -->
          <div
            class="flex items-baseline gap-3 my-4 p-3 bg-gray-50 rounded-md inline-flex"
          >
            <span class="text-2xl font-bold text-secondary">
              {{ product?.price || $t('product.pricePlaceholder') }}
            </span>
            <span
              v-if="product?.compareAtPrice"
              class="text-sm line-through text-gray-400"
            >
              {{ product.compareAtPrice }}
            </span>
          </div>

          <hr class="my-6 border-gray-200" />

          <!-- Opzione Regalo -->
          <div class="bg-amber-50/60 border border-amber-200/70 p-4 rounded-md mb-6">
              <label
                class="flex items-center gap-3 cursor-pointer font-medium text-gray-700"
              >
                <input
                  type="checkbox"
                  v-model="giftOption"
                  class="rounded text-secondary focus:ring-secondary h-4 w-4"
                />
                <span>{{$t('product.giftOption')}}</span>
              </label>

            <div v-if="giftOption" class="mt-3 transition-all duration-200">
              <label class="block text-xs text-gray-500 mb-1 font-medium"
                >{{$t('product.giftLabel')}}</label
              >
              <textarea
                v-model="giftMessage"
                rows="3"
                maxlength="250"
                :placeholder="$t('product.giftPlaceholder')"
                class="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-secondary focus:border-secondary outline-none"
              ></textarea>
              <span class="text-[10px] text-gray-400 flex justify-end mt-0.5">
                {{ giftMessage.length }}/250 {{$t('product.chars')}}
              </span>
            </div>
          </div>
        </div>

        <ClientOnly>
          <div>
            <button
              @click="handleAddToCart"
              :disabled="pending || cart"
              class="w-full bg-primary text-white font-bold tracking-wide py-4 px-6 rounded hover:bg-secondary transition-colors shadow-md uppercase disabled:opacity-50"
            >
              {{$t('product.addToCart')}}
            </button>
            <span v-if="cart" class="text-[10px] text-red-600 flex justify-end mt-0.5">
              {{$t('product.cartWarning')}}
            </span>
          </div>

          <template #fallback>
            <button
              disabled
              class="w-full bg-primary text-white font-bold tracking-wide py-4 px-6 rounded opacity-50 uppercase"
              >
                {{$t('product.loading')}}
              </button>
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const giftOption = ref(false);
const giftMessage = ref("");

const { product, pending: pendingProduct } = useProduct(route.params.id);
const { createCart, pending: pendingCart, cart, toggleCartPanelOpen } = useCart();

const pending = computed(() => pendingProduct.value || pendingCart.value);

async function handleAddToCart() {
  if (!product.value?.variantId) return;
  try {
    await createCart(product.value.variantId, 1, {
      giftOption: giftOption.value,
      giftMessage: giftMessage.value,
    });
    toggleCartPanelOpen();
  } catch (err) {}
}
</script>
