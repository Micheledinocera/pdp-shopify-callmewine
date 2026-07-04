<!-- pages/products/[id].vue -->
<template>
  <div>

      <NuxtLink to="/" class="text-sm text-gray-500 hover:text-[#721c24] inline-flex items-center gap-1 mb-6">
        ← Torna alla home
      </NuxtLink>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <!-- Colonna Sinistra: Immagine -->
        <div class="flex justify-center items-center bg-white p-8 rounded-lg border border-gray-100 shadow-sm min-h-[400px]">
          <div class="animate-pulse flex space-x-4 w-full justify-center" v-if="pending">
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
              {{ product?.vendor || 'Caricamento...' }}
            </p>
            <!-- Titolo -->
            <h1 class="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              {{ product?.title || 'Nome Prodotto' }}
            </h1>

            <!-- Prezzi -->
            <div class="flex items-baseline gap-3 my-4 p-3 bg-gray-50 rounded-md inline-flex">
              <span class="text-2xl font-bold text-[#721c24]">
                {{ product?.price || '€ 0,00' }}
              </span>
              <span v-if="product?.compareAtPrice" class="text-sm line-through text-gray-400">
                {{ product.compareAtPrice }}
              </span>
            </div>

            <hr class="my-6 border-gray-200" />

            <!-- Opzione Regalo -->
            <div class="bg-amber-50/60 border border-amber-200/70 p-4 rounded-md mb-6">
              <label class="flex items-center gap-3 cursor-pointer font-medium text-gray-700">
                <input 
                  type="checkbox" 
                  v-model="giftOption" 
                  class="rounded text-[#721c24] focus:ring-[#721c24] h-4 w-4"
                />
                <span>Aggiungi confezione regalo (+€ 2,00)</span>
              </label>

              <div v-if="giftOption" class="mt-3 transition-all duration-200">
                <label class="block text-xs text-gray-500 mb-1 font-medium">Messaggio personalizzato:</label>
                <textarea 
                  v-model="giftMessage"
                  rows="3" 
                  maxlength="250"
                  placeholder="Scrivi qui il tuo messaggio d'auguri..."
                  class="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#721c24] focus:border-[#721c24] outline-none"
                ></textarea>
                <span class="text-[10px] text-gray-400 flex justify-end mt-0.5">
                  {{ giftMessage.length }}/250 caratteri
                </span>
              </div>
            </div>
          </div>

          <!-- CTA Aggiungi al Carrello -->
          <button 
            @click="handleAddToCart"
            :disabled="pending"
            class="w-full bg-[#721c24] text-white font-bold tracking-wide py-4 px-6 rounded hover:bg-[#5a151c] transition-colors shadow-md uppercase disabled:opacity-50"
          >
            Aggiungi al carrello
          </button>
        </div>
      </div>
  </div>
</template>

<script setup>
const route = useRoute()

// Stato per l'opzione regalo
const giftOption = ref(false)
const giftMessage = ref('')

// Ricostruiamo il GID completo di Shopify usando l'id della rotta
const fullShopifyId = `gid://shopify/Product/${route.params.id}`

// Placeholder per i dati reattivi del prodotto
const pending = ref(false)
const product = ref({
  title: 'Prodotto di Esempio',
  vendor: 'Cantina Callmewine',
  price: '€ 25,00',
  compareAtPrice: '€ 32,00',
  image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop' // Placeholder temporaneo
})

const handleAddToCart = () => {
  alert(`Aggiunto al carrello!\nRegalo: ${giftOption.value ? 'Sì' : 'No'}\nMessaggio: ${giftMessage.value}`)
}
</script>