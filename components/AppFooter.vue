<template>
  <footer
    class="w-full bg-primary/95 backdrop-blur-md border-t border-border-color text-text-muted py-6 px-4 flex flex-col md:flex-row items-center justify-between mt-16 shadow-lg"
  >
    <div class="flex gap-4 items-center mb-2 md:mb-0">
      <NuxtLink
        to="/privacy"
        class="text-sm hover:text-accent transition-colors underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
        >Privacy Policy</NuxtLink
      >
      <span class="hidden md:inline">·</span>
      <NuxtLink
        to="/tos"
        class="text-sm hover:text-accent transition-colors underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
        >Terms of Service</NuxtLink
      >
    </div>
    <div class="text-xs  select-none">
      © {{ new Date().getFullYear() }} Dmitrii Zhiganov. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
// No script needed, year is rendered inline
</script>
