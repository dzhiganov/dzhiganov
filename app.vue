<template>
  <div
    class="bg-bg-primary min-h-screen text-text-primary transition-colors duration-300 flex flex-col"
  >
    <AppHeader />
    <div class="flex flex-col flex-1">
      <!-- Main Content -->
      <main class="flex-1 w-full mt-12">
        <NuxtPage />
      </main>

      <AppFooter />
    </div>
    <ClientOnly>
      <ConsentNotice />
    </ClientOnly>
  </div>
  <Analytics />
</template>

<script setup>
import { Analytics } from '@vercel/analytics/nuxt';
import ConsentNotice from '~/components/ConsentNotice.vue';

useHead({
  title: 'Dima Zhiganov',
  meta: [
    {
      name: 'description',
      content:
        'Full Stack Developer passionate about creating amazing web experiences and educational content.',
    },
  ],
});
</script>
