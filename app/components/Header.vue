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

    <div class="flex items-center gap-6">
      <div class="relative text-white text-sm">
        <select
          :value="currentKey"
          @change="onLocaleChange"
          class="bg-transparent border border-white/30 rounded px-2 py-1 cursor-pointer outline-none hover:border-white/80 bg-primary"
        >
          <option
            v-for="(data, key) in supportedLocales"
            :key="key"
            :value="key"
            class="text-black"
          >
            {{ data.label }}
          </option>
        </select>
      </div>

      <button
        class="text-white flex items-center gap-2 hover:opacity-80 relative cursor-pointer"
        :disabled="pendingCart"
        @click="toggleCartPanelOpen"
      >
        <span class="text-lg">🛒</span>
        <ClientOnly>
          <span
            class="bg-white text-primary text-xs font-bold px-2 py-0.5 rounded-full"
            >{{ cart?.totalQuantity ?? 0 }}</span
          >
        </ClientOnly>
      </button>
    </div>
  </header>
</template>

<script setup>
const { cart, pending: pendingCart, toggleCartPanelOpen } = useCart();
const { currentLocale, supportedLocales, setLocale } = useLocale();

const currentKey = computed(() => {
  return Object.keys(supportedLocales).find(
    key => supportedLocales[key].country === currentLocale.value.country
  );
});

const onLocaleChange = (event) => {
  setLocale(event.target.value);
};

</script>
