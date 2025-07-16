<template>
  <!-- Hero Section -->
  <section class="flex flex-col items-center justify-center px-4 py-20">
    <div class="max-w-2xl mx-auto text-center">
      <!-- Author Image -->
      <div class="mb-8">
        <img
          src="/author.jpg"
          alt="Dima Zhiganov"
          class="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
        />
      </div>

      <!-- Title -->
      <h1
        class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
      >
        Hey, it's Dima Zhiganov
      </h1>

      <!-- Subtitle -->
      <p
        class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
      >
        Software engineer passionate about building great products and sharing
        knowledge through code, videos, and writing.
      </p>

      <!-- Social Links -->
      <div class="flex justify-center space-x-6 mb-12">
        <a
          href="https://www.youtube.com/@d.zhiganov"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500 transition-colors"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            />
          </svg>
        </a>
        <a
          href="https://x.com/dima_zhiganov"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/dmitriy-zhiganov"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>
      </div>

      <!-- Materials Access CTA - Only show if user is not logged in -->
      <div
        v-if="!user"
        class="bg-neutral-200 dark:bg-gray-900 rounded-xl p-8 max-w-lg mx-auto transition-all duration-300"
      >
        <div class="text-center">
          <div class="mb-4">
            <h3 class="text-2xl font-bold text-text-primary mb-2">
              Get All Materials
            </h3>
            <p class="text-text-muted mb-6 leading-relaxed">
              Get instant access to slides, exclusive resources, and
              step-by-step guides from every tutorial
            </p>
          </div>

          <div class="space-y-3">
            <NuxtLink
              to="/login"
              class="w-full bg-blue-500 text-bg-primary font-bold py-4 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Access Now
            </NuxtLink>
          </div>

          <!-- Feature highlights -->
          <div class="mt-6 pt-6 border-t border-border-color">
            <div
              class="flex items-center justify-center space-x-6 text-text-muted text-sm"
            >
              <div class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1 text-text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Audio version
              </div>
              <div class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1 text-text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Text version
              </div>
              <div class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1 text-text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Slides
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Blog Posts Section -->
  <section class="py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <h2
        class="text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center"
      >
        Latest Posts
      </h2>

      <div v-if="posts.length > 0" class="space-y-8">
        <article
          v-for="post in posts"
          :key="post._path"
          class="group relative bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl dark:hover:shadow-accent/10 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:border-gray-300 dark:hover:border-accent/30"
          @click="navigateTo(post?.path)"
        >
          <!-- Gradient overlay for extra depth -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-black/20 pointer-events-none"
          ></div>

          <div class="relative md:flex">
            <!-- Text Content -->
            <div class="p-8 md:w-3/4 md:pr-8 relative z-10">
              <h3
                class="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 transition-colors duration-300"
              >
                {{ post.title }}
              </h3>
              <p
                class="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed"
              >
                {{ post.description }}
              </p>

              <div
                class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6"
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
                  class="px-3 py-1 bg-gradient-to-r from-accent/20 to-accent/10 text-accent rounded-full text-xs font-medium border border-accent/20"
                >
                  {{ post.meta.difficulty }}
                </span>
              </div>

              <div v-if="post.tags" class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags.slice(0, 3)"
                  :key="tag"
                  class="px-3 py-1 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-800"
                >
                  {{ tag }}
                </span>
                <span
                  v-if="post.tags.length > 3"
                  class="px-3 py-1 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600"
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
                class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"
              ></div>
              <img
                :src="post?.meta?.thumbnail"
                :alt="post.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </article>
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">
          No blog posts yet. Stay tuned!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { authClient } from '~/lib/auth-client';

// Get user authentication state
const { data: sessionData } = authClient.useSession();
const user = computed(() => sessionData?.value?.user);

// Fetch blog posts
const { data: blogPosts } = await useAsyncData('blog-posts', async () => {
  try {
    const collectionResponse = await queryCollection('materials').all();

    return collectionResponse;
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
