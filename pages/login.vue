<template>
  <div
    class="flex items-center justify-center bg-bg-primary py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-text-primary">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-text-muted">
          Get instant access to slides, exclusive resources, and step-by-step
          guides from every tutorial
        </p>
      </div>

      <div class="mt-8 space-y-6">
        <!-- Social Sign In -->
        <div class="space-y-4">
          <button
            @click="signInWithGitHub"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-800 dark:bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            Continue with GitHub
          </button>

          <button
            @click="signInWithGoogle"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-3 px-4 border border-border-color text-sm font-medium rounded-lg text-text-primary bg-surface hover:bg-surface/80 dark:hover:bg-surface/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <!-- Feature highlights -->
        <div class="border border-border-color rounded-lg p-6">
          <h3 class="text-lg font-semibold text-text-primary mb-4 text-center">
            What you'll get access to:
          </h3>
          <div class="space-y-3">
            <div class="flex items-center text-sm text-text-muted">
              <svg
                class="w-4 h-4 mr-3 text-text-muted flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span
                ><strong class="text-text-primary">Audio versions</strong> of
                all tutorials for learning on the go</span
              >
            </div>
            <div class="flex items-center text-sm text-text-muted">
              <svg
                class="w-4 h-4 mr-3 text-text-muted flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span
                ><strong class="text-text-primary">Text versions</strong> with
                detailed explanations and code examples</span
              >
            </div>
            <div class="flex items-center text-sm text-text-muted">
              <svg
                class="w-4 h-4 mr-3 text-text-muted flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span
                ><strong class="text-text-primary">Presentation slides</strong>
                for quick reference and teaching</span
              >
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="text-center">
          <p class="text-xs text-text-muted">
            By signing in, you agree to our terms of service and privacy policy
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { authClient } from '~/lib/auth-client';

definePageMeta({
  layout: false,
});

const route = useRoute();

// Get redirect URL from query parameter, default to home page
const redirectUrl = route.query.redirect || '/';

const signInWithGitHub = async () => {
  await authClient.signIn.social({ 
    provider: 'github', 
    callbackURL: redirectUrl 
  });
};

const signInWithGoogle = async () => {
  await authClient.signIn.social({ 
    provider: 'google', 
    callbackURL: redirectUrl 
  });
};

const isLoading = ref(false);
const error = ref(null);
</script>
