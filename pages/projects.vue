<template>
  <div class="min-h-screen pt-20">
    <!-- Projects Content Container -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <div class="animate-fade-up">
        <!-- Header Section -->
        <div class="mb-12">
          <h1 class="text-5xl font-bold text-text-primary mb-4">Projects</h1>
          <div class="h-1 w-20 bg-accent rounded-full"></div>
        </div>

        <!-- Projects List -->
        <div class="space-y-3 w-1/2">
          <!-- YouTube Channel -->
          <a
            href="https://www.youtube.com/@d.zhiganov"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-900 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors outline-none"
          >
            <div
              class="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            >
              <svg
                class="w-8 h-8 text-[#FF0000]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base font-bold text-text-primary">
                YouTube Channel
              </h3>
              <p class="text-text-secondary text-xs leading-relaxed truncate">
                Educational content on web development
              </p>
            </div>
            <div class="flex-shrink-0">
              <svg
                class="w-4 h-4 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
          </a>

          <!-- FlowTracks Project -->
          <a
            href="https://flow-tracks.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-900 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors outline-none"
          >
            <div
              class="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
            >
              <img
                src="@/public/project-flow-tracks.png"
                alt="FlowTracks"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base font-bold text-text-primary">FlowTracks</h3>
              <p class="text-text-secondary text-xs leading-relaxed truncate">
                Productivity and workflow tracking application
              </p>
            </div>
            <div class="flex-shrink-0">
              <svg
                class="w-4 h-4 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  layout: 'default',
});
</script>

<style scoped>
.prose {
  color: var(--text-secondary);
}

.prose a {
  color: var(--accent);
  text-decoration: none;
  transition: opacity 0.3s;
}

.prose a:hover {
  opacity: 0.8;
}
</style>
