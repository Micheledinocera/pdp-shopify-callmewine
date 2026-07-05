<template>
  <Teleport to="body">
    <!-- Contenitore globale del Panel -->
    <div v-if="isCartPanelOpen" class="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      <div class="absolute inset-0 overflow-hidden">
        
        <!-- Overlay Scuro con animazione Fade -->
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
            @click="isCartPanelOpen = false"
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
            <div class="pointer-events-auto w-screen max-w-md bg-white shadow-xl flex flex-col h-full">
              <div @click="toggleCartPanelOpen"> X </div>

            </div>
          </Transition>
          
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const { cart, pending, isCartPanelOpen, toggleCartPanelOpen } = useCart();
</script>