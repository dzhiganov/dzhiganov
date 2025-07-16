<template>
  <div
    class="bg-bg-primary min-h-screen text-text-primary transition-colors duration-300 flex flex-col"
  >
    <AppHeader />
    <div class="flex flex-col flex-1">
      <!-- Main Content -->
      <main class="flex-1 w-full mt-24">
        <NuxtPage />
      </main>

      <AppFooter />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'John Doe - Full Stack Developer',
  meta: [
    {
      name: 'description',
      content:
        'Full Stack Developer passionate about creating amazing web experiences and educational content.',
    },
  ],
});
</script>
