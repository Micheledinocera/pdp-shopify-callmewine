<template>
  <header
    class="bg-primary py-4 px-6 shadow-md sticky top-0 z-40 flex justify-between items-center"
  >
    <NuxtLink to="/">
      <img
        src="https://cdn.shopify.com/s/files/1/0656/7824/6108/files/logo-callmewine-white.svg?v=1688664490"
        alt="Callmewine Logo"
        class="h-8"
      />
    </NuxtLink>

    <button class="text-white flex items-center gap-2 hover:opacity-80 relative cursor-pointer" :disabled="pendingCart" @click="toggleCartPanelOpen">
      <span class="text-lg">🛒</span>
      <span class="bg-white text-primary text-xs font-bold px-2 py-0.5 rounded-full">{{
        cart?.totalQuantity ?? 0
      }}</span>
    </button>
  </header>
</template>

<script setup>
const { cart, pending: pendingCart,toggleCartPanelOpen } = useCart();
</script>
