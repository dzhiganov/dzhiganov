// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      youtubeApiKey: process.env.YOUTUBE_API_KEY,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
  ],
  css: ['~/assets/css/main.css'],
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
      'Fira+Code': [400, 500],
      Chivo: [300, 400, 500, 600, 700],
      Lora: [400, 500, 600, 700],
    },
  },
  app: {
    head: {
      title: 'Dmitriy Zhiganov - Senior Software Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Senior Software Engineer with 6+ years of expertise in React, TypeScript, and backend technologies. Currently at Trade Republic in Berlin.',
        },
      ],
    },
  },
  routeRules: {
    '/': {
      prerender: true,
      ssr: false,
    },
  },
});
