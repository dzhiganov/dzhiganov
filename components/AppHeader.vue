<template>
  <header
    class="top-0 fixed left-0 right-0 z-50 w-full flex justify-between items-center px-4 py-2 backdrop-blur-md bg-white/10 dark:bg-black/20"
    aria-label="Main navigation sidebar"
  >
    <!-- Left side - Avatar -->
    <NuxtLink
      to="/"
      class="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
    >
      <img
        src="@/public/author.jpg"
        alt="Avatar"
        class="w-full h-full object-cover"
      />
    </NuxtLink>

    <!-- Center - Navigation Links -->
    <nav class="flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2 w-auto">
      <NuxtLink
        to="/"
        class="text-text-muted hover:text-text-primary transition-colors text-sm font-medium whitespace-nowrap"
        :class="{ 'text-accent': $route.path === '/' }"
      >
        Home
      </NuxtLink>
      <NuxtLink
        to="/projects"
        class="text-text-muted hover:text-text-primary transition-colors text-sm font-medium whitespace-nowrap"
        :class="{ 'text-accent': $route.path === '/projects' }"
      >
        Projects
      </NuxtLink>
      <NuxtLink
        to="/about"
        class="text-text-muted hover:text-text-primary transition-colors text-sm font-medium whitespace-nowrap"
        :class="{ 'text-accent': $route.path === '/about' }"
      >
        About
      </NuxtLink>
    </nav>

    <!-- Right side - User Auth and Theme Toggle -->
    <div class="flex items-center space-x-4 justify-end">
      <div class="flex items-center space-x-4">
        <ThemeToggle />
        <UserAuth />
      </div>
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
:deep(a) {
  outline: none;
}

:deep(a:focus) {
  outline: none;
}

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
