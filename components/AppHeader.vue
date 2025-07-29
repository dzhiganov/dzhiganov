<template>
  <header
    class="top-0 fixed left-0 right-0 z-50 w-full flex justify-between px-4 py-2"
    aria-label="Main navigation sidebar"
  >
    <!-- Logo/Avatar and Name -->
    <div class="flex items-center">
      <NuxtLink
        to="/"
        class="group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-all duration-300"
        aria-label="Home"
      >
        <div class="flex items-center space-x-3">
          <!-- Logo Icon -->
          <div
            class="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
          >
            <span class="text-white font-bold text-lg">DZ</span>
          </div>

          <!-- Name with styling -->
          <div class="flex flex-col">
            <h1
              class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 font-['Inter']"
            >
              Dima Zhiganov
            </h1>
            <p
              class="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase font-['Inter']"
            >
              Software Engineer
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Right side - User Auth and Theme Toggle -->
    <div class="flex items-center space-x-4">
      <UserAuth />
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup>
// Get theme state for logo switching
const isDark = computed(() => {
  return localStorage.getItem('theme') === 'dark';
});
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slide-in-left {
  animation: slide-in-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
