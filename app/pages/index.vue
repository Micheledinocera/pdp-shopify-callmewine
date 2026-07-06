<!-- pages/index.vue -->
<template>
  <div>
    <h1 class="text-4xl font-serif font-bold text-gray-800 mb-4">
    {{$t('index.welcome')}}
    </h1>
    <p class="text-gray-600 mb-8 max-w-md mx-auto">
    {{$t('index.description')}}
    </p>

    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-sm mx-auto">
    <template v-if="pending"> {{$t('index.loading')}} </template>
    <template v-else>
        <h2 class="font-bold text-lg text-gray-700 mb-2">{{product.title}}</h2>
        <img 
            :src="product.image" 
            :alt="product.imageAlt" 
            class="w-full h-[450px] object-contain transition-transform hover:scale-105 duration-300"
          />
        <NuxtLink 
        :to="`/products/${productId}`" 
        class="inline-block w-full bg-primary text-white font-medium py-2.5 px-4 rounded hover:bg-secondary transition-colors"
        >
        {{$t('index.viewProduct')}}
        </NuxtLink>
    </template>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const productId = '7171746234415'
const { product, pending, error } = useProduct(productId)

useHead({
  title: t('index.welcome'),
  meta: [
    { name: 'description', content: t('index.description') },
    { property: 'og:title', content: t('index.welcome') },
    { property: 'og:description', content: t('index.description') },
    { property: 'og:image', content: 'https://cdn.shopify.com/s/files/1/0650/4356/2708/files/HP_HeroBanner_-_2026-07-03T180626.757.png?v=1783094794&width=180&height=auto' }
  ]
});

</script>