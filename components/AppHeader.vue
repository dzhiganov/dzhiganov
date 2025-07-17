<template>
  <header
    class="bg-primary/95 backdrop-blur-md border-b border-border-color top-0 fixed left-0 right-0 z-50 w-full flex justify-between shadow-lg"
    aria-label="Main navigation sidebar"
  >
    <!-- Logo/Avatar and Name -->
    <div class="flex flex-col items-center py-1 px-4">
      <NuxtLink
        to="/"
        class="focus:outline-none focus:ring-2 focus:ring-accent rounded-full"
        aria-label="Home"
      >
        <img
          src="/logo.svg"
          alt="Dmitriy Zhiganov avatar"
          class="hover:scale-105 max-w-32 transition-transform"
        />
      </NuxtLink>
    </div>

    <!-- Right side - User Auth and Theme Toggle -->
    <div class="flex items-center space-x-4 px-4 py-1">
      <UserAuth />
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup>
import { AcademicCapIcon, AtSymbolIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const navItems = [
  { label: 'Materials', href: '/', icon: AcademicCapIcon },
  { label: 'Contacts', href: '/contacts', icon: AtSymbolIcon },
];

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Get user authentication state
const { user } = useAuth();
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
