<template>
  <div
    v-if="showBanner"
    class="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-border-color p-4 z-50 shadow-lg"
  >
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-start space-x-3">
          <div class="w-6 h-6 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg
              class="w-4 h-4 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-text-primary font-medium mb-1">
              Cookie Notice
            </h3>
            <p class="text-text-muted text-sm leading-relaxed">
              This website uses essential authentication cookies to keep you logged in and provide access to materials. 
              These cookies are necessary for the site to function properly and cannot be disabled.
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-3 flex-shrink-0">
          <button
            @click="acceptCookies"
            class="bg-accent text-white px-4 py-2 rounded font-medium hover:bg-accent/90 transition-colors text-sm"
          >
            Got it
          </button>
          <NuxtLink
            to="/privacy"
            class="text-text-muted hover:text-accent transition-colors text-sm underline"
          >
            Privacy Policy
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showBanner = ref(false);
const COOKIE_CONSENT_KEY = 'cookie-consent-accepted';

const acceptCookies = () => {
  // Save consent to localStorage
  localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
  showBanner.value = false;
};

onMounted(() => {
  // Check if user has already accepted cookies
  const hasAccepted = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!hasAccepted) {
    showBanner.value = true;
  }
});
</script>