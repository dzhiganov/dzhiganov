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

    <!-- Mobile Menu Button -->
    <div class="md:hidden">
      <button
        @click="toggleMobileMenu"
        class="text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-2"
        aria-label="Open mobile menu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="
              isMobileMenuOpen
                ? 'M6 18L18 6M6 6l12 12'
                : 'M4 6h16M4 12h16M4 18h16'
            "
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu (slide-in) -->
    <transition name="slide-fade">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-50 bg-black/40 flex"
        @keydown.esc="closeMobileMenu"
        tabindex="0"
        aria-modal="true"
        role="dialog"
      >
        <div
          class="w-64 bg-bg-primary h-full shadow-xl flex flex-col p-6 animate-slide-in-left"
        >
          <div class="flex justify-between items-center mb-6">
            <span class="text-accent font-mono text-lg">Menu</span>
            <button
              @click="closeMobileMenu"
              class="text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
              aria-label="Close mobile menu"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav class="flex flex-col gap-2">
            <template v-for="item in navItems" :key="item.label + '-mobile'">
              <a
                :href="item.href"
                class="flex items-center px-4 py-2 rounded-lg text-text-muted hover:text-accent hover:bg-surface/30 focus:outline-none focus:ring-2 focus:ring-accent transition-colors font-medium gap-3 nav-link"
                :aria-label="item.label"
                @click="closeMobileMenu"
                tabindex="0"
              >
                <span class="w-5 h-5 flex items-center justify-center">
                  <component :is="item.icon" class="w-5 h-5" />
                </span>
                <span class="font-mono text-base">{{ item.label }}</span>
              </a>
            </template>
          </nav>
          <div class="mt-auto flex flex-col gap-2 pt-6">
            <UserAuth />
            <ThemeToggle />
            <div v-if="user">
              <NuxtLink
                to="/dashboard"
                class="block border border-accent text-accent px-4 py-2 rounded font-mono text-sm text-center hover:bg-accent/10 transition-colors"
                @click="closeMobileMenu"
                >Dashboard</NuxtLink
              >
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              class="block border border-accent text-accent px-4 py-2 rounded font-mono text-sm text-center hover:bg-accent/10 transition-colors"
              >Resume</a
            >
          </div>
        </div>
        <div class="flex-1" @click="closeMobileMenu"></div>
      </div>
    </transition>
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
