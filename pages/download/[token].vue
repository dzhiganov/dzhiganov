<template>
  <div class="min-h-screen pt-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
    <div class="max-w-2xl mx-auto">
      <!-- Loading State -->
      <div v-if="pending" class="text-center py-12">
        <div class="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-text-secondary">Validating download link...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="mb-6">
          <svg class="w-20 h-20 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          <h2 class="text-text-primary text-3xl font-bold mb-4">Download Unavailable</h2>
          <p class="text-text-secondary text-lg mb-8">{{ error.data?.message || 'This download link is invalid or has expired.' }}</p>
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

      <!-- Success State -->
      <div v-else-if="data" class="py-12">
        <div class="text-center mb-8">
          <svg class="w-20 h-20 text-accent mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h1 class="text-text-primary text-3xl font-bold mb-4">Download Materials</h1>
          <p class="text-text-secondary text-lg mb-2">{{ data.materials.title }}</p>
          <p class="text-text-muted text-sm">Downloaded for: {{ data.email }}</p>
        </div>

        <!-- Files List -->
        <div class="bg-surface/10 rounded-lg p-6 mb-8">
          <h3 class="text-text-primary text-xl font-semibold mb-4">Available Files</h3>
          <div class="space-y-3">
            <div 
              v-for="file in data.materials.files" 
              :key="file.name"
              class="flex items-center justify-between p-4 bg-surface/5 rounded-lg border border-border-color hover:border-accent/50 transition-colors"
            >
              <div class="flex items-center">
                <div class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-text-primary font-medium">{{ file.name }}</h4>
                  <p class="text-text-muted text-sm">{{ file.type }} • {{ file.size }}</p>
                </div>
              </div>
              <a 
                :href="file.url" 
                download
                class="bg-accent text-primary px-4 py-2 rounded font-mono text-sm hover:bg-accent/90 transition-colors"
                @click="trackDownload(file.name)"
              >
                Download
              </a>
            </div>
          </div>
        </div>

        <!-- Additional Resources -->
        <div v-if="data.materials.additionalResources?.length" class="bg-surface/10 rounded-lg p-6 mb-8">
          <h3 class="text-text-primary text-xl font-semibold mb-4">Additional Resources</h3>
          <div class="space-y-3">
            <a 
              v-for="resource in data.materials.additionalResources" 
              :key="resource.title"
              :href="resource.url" 
              target="_blank"
              class="flex items-center text-text-secondary hover:text-accent transition-colors"
            >
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              {{ resource.title }}
            </a>
          </div>
        </div>

        <!-- Important Notice -->
        <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-yellow-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <div>
              <h4 class="text-yellow-500 font-semibold mb-1">Important Notice</h4>
              <p class="text-text-secondary text-sm">
                This download link has been used and is no longer valid. 
                Please download all files now as you won't be able to access this page again.
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="text-center space-y-4">
          <NuxtLink 
            :to="`/video/${data.videoId}`"
            class="inline-block border border-accent text-accent px-6 py-3 rounded font-mono hover:bg-accent/10 transition-colors mr-4"
          >
            Back to Video
          </NuxtLink>
          <NuxtLink 
            to="/#videos"
            class="inline-block bg-accent text-primary px-6 py-3 rounded font-mono hover:bg-accent/90 transition-colors"
          >
            Browse More Videos
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const token = route.params.token

// Fetch download data
const { data, pending, error } = await useLazyFetch(`/api/materials/download/${token}`, {
  server: false
})

// Track download events
const trackDownload = (fileName) => {
  console.log(`Downloaded: ${fileName}`)
  // Add analytics tracking here if needed
}

// Set page meta
useHead(() => ({
  title: data.value ? `Download: ${data.value.materials.title}` : 'Download Materials',
  meta: [
    { 
      name: 'description', 
      content: data.value ? `Download materials for ${data.value.videoTitle}` : 'Download tutorial materials' 
    },
    { name: 'robots', content: 'noindex, nofollow' } // Prevent indexing of download pages
  ]
}))

// Handle errors
if (error.value) {
  console.error('Download error:', error.value)
}
</script>