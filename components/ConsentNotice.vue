<template>
  <div
    v-if="isComponentReady && showBanner"
    class="fixed bottom-2 right-2 bg-bg-primary border border-gray-300 dark:border-gray-700 z-50 shadow-sm rounded-lg max-w-md"
  >
    <div class="max-w-4xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center space-x-3">
          <div
            class="w-6 h-6 bg-text-primary/10 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <InformationCircleIcon class="w-4 h-4 text-text-primary" />
          </div>
          <p class="text-text-primary text-sm">
            This website uses essential authentication cookies to keep you
            logged in and provide access to materials.
          </p>
        </div>
        <button
          @click="acceptCookies"
          class="bg-text-primary text-bg-primary px-4 py-2 rounded text-sm hover:bg-text-primary/90 transition-colors whitespace-nowrap"
        >
          Accept
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InformationCircleIcon } from '@heroicons/vue/24/outline';
import { nextTick, onMounted, ref } from 'vue';

const showBanner = ref(false);
const isComponentReady = ref(false);
const COOKIE_CONSENT_KEY = 'cookie-consent-accepted';

const acceptCookies = () => {
  // Save consent to localStorage (client-side only)
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
  }
  showBanner.value = false;
};

onMounted(() => {
  // Delay component initialization to ensure everything is loaded
  nextTick(() => {
    setTimeout(() => {
      isComponentReady.value = true;

      // Check if user has already accepted cookies (client-side only)
      if (typeof window !== 'undefined' && window.localStorage) {
        const hasAccepted = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!hasAccepted) {
          showBanner.value = true;
        }
      }
    }, 1000); // 1 second delay after page load
  });
});
</script>
