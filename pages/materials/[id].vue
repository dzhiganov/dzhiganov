<template>
  <div class="min-h-screen pt-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
    <!-- Loading State -->
    <div v-if="isSessionPending || pending" class="max-w-4xl mx-auto">
      <div class="animate-pulse">
        <div class="h-8 bg-surface/20 rounded mb-4 w-3/4"></div>
        <div class="h-4 bg-surface/20 rounded mb-2 w-1/2"></div>
        <div class="h-4 bg-surface/20 rounded mb-8 w-2/3"></div>
        <div class="space-y-4">
          <div class="h-4 bg-surface/20 rounded"></div>
          <div class="h-4 bg-surface/20 rounded"></div>
          <div class="h-4 bg-surface/20 rounded w-5/6"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-2xl mx-auto text-center py-12">
      <div class="mb-6">
        <svg
          class="w-20 h-20 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <h2 class="text-text-primary text-3xl font-bold mb-4">Access Denied</h2>
        <p class="text-text-secondary text-lg mb-8">
          {{
            error.statusMessage ||
            'You need a valid token to access these materials.'
          }}
        </p>
      </div>

      <div class="space-y-4">
        <NuxtLink
          to="/#videos"
          class="inline-block border border-accent text-accent px-6 py-3 rounded font-mono hover:bg-accent/10 transition-colors"
        >
          Browse Videos
        </NuxtLink>
      </div>
    </div>

    <!-- Materials Content (authenticated users) -->
    <div v-else-if="data && session" class="max-w-4xl mx-auto mt-12">
      <!-- Material Header -->
      <div class="mb-12">
        <div class="flex flex-wrap items-center gap-4 mb-4">
          <span
            v-for="tag in data.tags"
            :key="tag"
            class="text-accent font-mono text-sm bg-accent/10 px-3 py-1 rounded"
          >
            {{ tag }}
          </span>
          <span class="text-text-muted font-mono text-sm">
            {{ data.difficulty }}
          </span>
          <span class="text-text-muted font-mono text-sm">
            {{ data.duration }}
          </span>
        </div>

        <h1 class="text-text-primary text-4xl md:text-5xl font-bold mb-4">
          {{ data.title }}
        </h1>

        <p class="text-text-secondary text-xl leading-relaxed">
          {{ data.description }}
        </p>
      </div>

      <!-- Additional Materials - Top -->
      <AdditionalMaterials :resources="data?.meta?.resources" />

      <!-- Materials Content -->
      <div class="content-wrapper">
        <ContentRenderer :value="data" class="materials-content" />
      </div>

      <!-- Additional Materials - Bottom -->
      <AdditionalMaterials :resources="data?.meta?.resources" />

      <!-- Related Video Link -->
      <div class="mt-16 p-8 bg-surface/10 rounded-lg text-center">
        <h3 class="text-text-primary text-2xl font-semibold mb-4">
          Watch the Tutorial
        </h3>
        <p class="text-text-secondary mb-6">
          Haven't watched the tutorial yet? Check out the complete video
          walkthrough.
        </p>
        <a
          :href="`${data.meta.videoId}`"
          target="_blank"
          class="inline-flex items-center bg-accent text-primary px-6 py-3 rounded font-mono hover:bg-accent/90 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch {{ data.videoTitle }}
        </a>
      </div>
    </div>

    <!-- This section is now removed since auth is required -->
    <div v-else class="max-w-2xl mx-auto text-center py-12">
      <p class="text-text-secondary text-lg">
        You need to be logged in to access materials.
      </p>
      <NuxtLink
        to="/login"
        class="inline-block mt-4 bg-accent text-primary px-6 py-3 rounded font-mono hover:bg-accent/90 transition-colors"
      >
        Log In
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import AdditionalMaterials from '~/components/AdditionalMaterials.vue';
import { authClient } from '~/lib/auth-client';

const isSessionPending = ref(true);
const session = ref(null);

async function getSession() {
  try {
    isSessionPending.value = true;
    const { data: session } = await authClient.getSession();
    isSessionPending.value = false;
    return session;
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  } finally {
    isSessionPending.value = false;
  }
}

// Auth middleware - redirect to login if not authenticated
onMounted(async () => {
  const sessionData = await getSession();
  if (!sessionData) {
    // Store the current material URL for redirect after login
    const currentUrl = route.fullPath;
    await navigateTo(`/login?redirect=${encodeURIComponent(currentUrl)}`);
  } else {
    session.value = sessionData;
  }
});

const route = useRoute();

// Remove token-based logic since we're using auth now

// Mock video titles for demonstration
const videoTitles = {
  'react-hooks-masterclass': 'React Hooks Masterclass: useState to useCallback',
  'nextjs-fullstack-app': 'Build a Full-Stack App with Next.js 14',
  'tailwind-advanced-patterns': 'Advanced Tailwind CSS Patterns & Components',
};

const videoTitle = computed(
  () => videoTitles[route.params.id] || 'Tutorial Materials',
);

// Fetch materials content - auth is handled by middleware above
const { data, pending, error } = await useLazyAsyncData(
  `materials-${route.params.id}`,
  async () => {
    try {
      // Fetch the markdown content using the correct Nuxt Content v3 API
      const content = await queryCollection('materials')
        .path(`/materials/${route.params.id}`)
        .first();

      if (!content) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Materials not found',
        });
      }
      return content;
    } catch (err) {
      console.error('Error fetching materials:', err);

      if (err.statusCode) throw err;

      throw createError({
        statusCode: 404,
        statusMessage: 'Materials not found',
      });
    }
  },
);

// Remove form submission logic since we're using auth now

// Set page meta
useHead(() => ({
  title: data.value
    ? `${data.value.title} - Materials`
    : `Get Materials - ${videoTitle.value} - Dmitriy Zhiganov`,
  meta: [
    {
      name: 'description',
      content: data.value
        ? data.value.description
        : `Get the source code and materials for ${videoTitle.value}`,
    },
    { name: 'robots', content: 'noindex, nofollow' }, // Prevent indexing of materials pages
  ],
}));
</script>

<style scoped>
/* Minimal Markdown Styles - Browser Defaults + Theme Colors */

/* Step 1: Beautiful typography with Google Fonts */
.content-wrapper {
  font-family: 'Lora', serif;
  font-size: 18px;
  line-height: 1.7;
  color: #000;
}

.dark .content-wrapper {
  color: #fff;
}

/* Step 2: Restore browser defaults (bypasses Tailwind reset) */
:deep(.materials-content) {
  /* Reset Tailwind's aggressive resets */
  margin: revert;
  padding: revert;
  font-size: revert;
  font-weight: revert;
  line-height: revert;

  /* Keep container styles */
  max-width: none;
  font-family: inherit;
  color: inherit;
}

/* Restore default heading styles with Chivo */
:deep(.materials-content h1) {
  font-family: 'Chivo', sans-serif;
  font-size: 2.5em;
  font-weight: 700;
  margin: 0.67em 0;
}
:deep(.materials-content h2) {
  font-family: 'Chivo', sans-serif;
  font-size: 2em;
  font-weight: 600;
  margin: 0.75em 0;
}
:deep(.materials-content h3) {
  font-family: 'Chivo', sans-serif;
  font-size: 1.5em;
  font-weight: 600;
  margin: 0.83em 0;
}
:deep(.materials-content h4) {
  font-family: 'Chivo', sans-serif;
  font-size: 1.25em;
  font-weight: 500;
  margin: 1.12em 0;
}
:deep(.materials-content h5) {
  font-family: 'Chivo', sans-serif;
  font-size: 1.1em;
  font-weight: 500;
  margin: 1.5em 0;
}
:deep(.materials-content h6) {
  font-family: 'Chivo', sans-serif;
  font-size: 1em;
  font-weight: 500;
  margin: 1.67em 0;
}

/* Restore default paragraph and list styles with Lora */
:deep(.materials-content p) {
  font-family: 'Lora', serif;
  margin: 1em 0;
  line-height: 1.7;
}
:deep(.materials-content ul) {
  list-style-type: disc;
  margin: 1em 0;
  padding-left: 2em;
}
:deep(.materials-content ol) {
  list-style-type: decimal;
  margin: 1em 0;
  padding-left: 2em;
}
:deep(.materials-content li) {
  font-family: 'Lora', serif;
  margin: 0.5em 0;
  line-height: 1.6;
}

/* Step 3: Dark mode colors only */
.dark :deep(.materials-content) {
  color: #fff;
}

.dark :deep(.materials-content h1),
.dark :deep(.materials-content h2),
.dark :deep(.materials-content h3),
.dark :deep(.materials-content h4),
.dark :deep(.materials-content h5),
.dark :deep(.materials-content h6) {
  color: #fff;
}

.dark :deep(.materials-content a) {
  color: #efbcd5; /* accent pink */
}

/* Step 4: Code blocks with better dark mode contrast */
:deep(.materials-content code) {
  background-color: rgb(57, 57, 57);
  color: #d63384;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
}

.dark :deep(.materials-content code) {
  background-color: #2d3748;
  color: #fbd38d;
  border: 1px solid #4a5568;
}

:deep(.materials-content pre) {
  background-color: #272727;
  color: #e9ecef;
  border: 1px solid #e9ecef;
  padding: 1.5em;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.9em;
  line-height: 1.5;
}

.dark :deep(.materials-content pre) {
  background-color: #1a202c;
  border: 1px solid #2d3748;
  color: #e2e8f0;
}

:deep(.materials-content pre code) {
  background: none;
  color: inherit;
  padding: 0;
  border: none;
  font-size: inherit;
}

/* Step 5: Links with brand colors */
:deep(.materials-content a) {
  color: #8661c1; /* muted purple */
  text-decoration: underline;
}

/* Step 6: Subtle blockquotes */
:deep(.materials-content blockquote) {
  border-left: 4px solid #efbcd5; /* accent pink */
  background-color: rgba(239, 188, 213, 0.1);
  padding: 1em;
  margin: 1em 0;
}

.dark :deep(.materials-content blockquote) {
  border-left-color: #efbcd5;
  background-color: rgba(239, 188, 213, 0.1);
}
</style>
