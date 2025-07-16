<template>
  <div class="flex items-center space-x-2">
    <NuxtLink
      v-for="{ label, to } in breadcrumbs"
      :key="label"
      :to="to"
      class="text-accent hover:text-accent/80"
      >{{ label }}</NuxtLink
    >
  </div>
</template>

<script setup>
const { path, params } = useRoute();

const { id } = params;

const breadcrumbs = computed(() => {
  const items = path
    .split('/')
    .filter(Boolean)
    .map((item) => {
      return {
        label: item.charAt(0).toUpperCase() + item.slice(1),
        to: `/${item}`,
      };
    });
  return [
    {
      label: 'Home',
      to: '/',
    },
    ...items,
  ];
});
</script>
