<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-xl w-full space-y-8">
      <div
        class="bg-gray-200 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/20 dark:border-gray-700/20 rounded-lg p-8"
      >
        <div class="text-center">
          <h2 class="text-3xl font-bold">Sign in to your account</h2>
        </div>

        <div class="space-y-6 mt-6">
          <!-- Social Sign In -->
          <div class="space-y-3 max-w-sm mx-auto">
            <button
              @click="signInWithGitHub"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-4 px-6 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              Continue with GitHub
            </button>

            <button
              @click="signInWithGoogle"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-4 px-6 border border-gray-200 dark:border-gray-600 text-sm font-semibold rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
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

          <!-- Additional Info -->
          <div class="text-center">
            <p class="text-xs text-gray-400 dark:text-gray-700">
              By signing in, you agree to our terms of service and privacy
              policy
            </p>
          </div>
        </div>
      </div>

      <!-- Latest Articles Preview Section -->
      <div v-if="posts.length > 0" class="mt-12 max-w-4xl mx-auto">
        <div class="py-8">
          <h2
            class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-8 text-center"
          >
            Latest Articles
          </h2>

          <div class="space-y-6">
            <div
              v-for="post in posts"
              :key="post._path"
              class="group rounded-lg shadow-lg overflow-hidden bg-black/5 dark:bg-white/5"
            >
              <div class="md:flex">
                <!-- Text Content -->
                <div class="p-6 md:w-3/4 md:pr-6">
                  <h3
                    class="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  >
                    {{ post.title }}
                  </h3>
                  <p
                    class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed"
                  >
                    {{ post.description }}
                  </p>

                  <div
                    class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4"
                  >
                    <time
                      :datetime="post.meta.publishedAt"
                      class="flex items-center"
                    >
                      <svg
                        class="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {{ formatDate(post.meta.publishedAt) }}
                    </time>
                    <span
                      v-if="post.meta.difficulty"
                      class="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold border border-blue-200 dark:border-blue-700"
                    >
                      {{ post.meta.difficulty }}
                    </span>
                  </div>

                  <div v-if="post.tags" class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in post.tags.slice(0, 3)"
                      :key="tag"
                      class="px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-700"
                    >
                      {{ tag }}
                    </span>
                    <span
                      v-if="post.tags.length > 3"
                      class="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600"
                    >
                      +{{ post.tags.length - 3 }}
                    </span>
                  </div>
                </div>

                <!-- Thumbnail -->
                <div
                  v-if="post?.meta?.thumbnail"
                  class="md:w-1/2 aspect-video md:aspect-square overflow-hidden relative"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-10"
                  ></div>
                  <img
                    :src="post?.meta?.thumbnail"
                    :alt="post.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
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
    callbackURL: redirectUrl,
  });
};

const signInWithGoogle = async () => {
  await authClient.signIn.social({
    provider: 'google',
    callbackURL: redirectUrl,
  });
};

const isLoading = ref(false);
const error = ref(null);

// Fetch latest blog posts for preview
const { data: blogPosts } = await useAsyncData('login-blog-posts', async () => {
  try {
    const collectionResponse = await queryCollection('materials').all();

    return collectionResponse
      .sort((a, b) => {
        return new Date(b.meta.publishedAt) - new Date(a.meta.publishedAt);
      })
      .slice(0, 3); // Show only latest 3 posts
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
});

const posts = computed(() => blogPosts.value || []);

// Date formatting utility
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
