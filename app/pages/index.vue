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
const productId = '7171746234415'
const { product, pending, error } = useProduct(productId)

</script>