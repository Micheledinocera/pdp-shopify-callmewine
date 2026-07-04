import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  tailwindcss: {
    config: {
      content: [
        "./app/components/**/*.{js,vue,ts}",
        "./app/layouts/**/*.vue",
        "./app/pages/**/*.vue",
        "./app/plugins/**/*.{js,ts}",
        "./app/app.vue",
        "./app/error.vue",
      ]
    }
  },
  css: ['~/assets/css/tailwind.css'],
  devtools: { enabled: true },
  runtimeConfig: {
    shopifyStorefrontEndpoint: process.env.SHOPIFY_ENDPOINT,
    shopifyStorefrontToken: process.env.SHOPIFY_TOKEN,
  }
})
