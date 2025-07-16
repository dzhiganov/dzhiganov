<template>
  <section id="videos" class="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
    <div class="max-w-6xl">
      <h2 class="section-heading">
        <span class="text-accent font-mono text-xl">03.</span>
        Educational Videos
      </h2>
      
      <p class="text-slate text-lg mt-8 mb-16 max-w-2xl">
        Latest coding tutorials and web development content from my YouTube channel. 
        Covering modern frameworks, best practices, and developer productivity tips.
      </p>
      
      <!-- Debug Info -->
      <div class="mb-8 p-4 bg-surface/10 rounded-lg font-mono text-sm">
        <h3 class="text-accent mb-2">Debug Information:</h3>
        <p>API Key: {{ apiKeyStatus }}</p>
        <p>Channel ID: {{ CHANNEL_ID }}</p>
        <p>Data: {{ data ? `${data.length} videos` : 'null' }}</p>
        <p>Error: {{ error || 'none' }}</p>
        <p>Pending: {{ pending }}</p>
      </div>
      
      <!-- Loading State -->
      <div v-if="pending" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="bg-surface/10 rounded-lg overflow-hidden animate-pulse">
          <div class="w-full h-48 bg-surface/20"></div>
          <div class="p-6">
            <div class="h-6 bg-surface/20 rounded mb-3"></div>
            <div class="h-4 bg-surface/20 rounded mb-2"></div>
            <div class="h-4 bg-surface/20 rounded w-3/4"></div>
          </div>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-text-muted mb-4">Unable to load videos from YouTube.</p>
        <p class="text-text-muted text-sm">{{ error }}</p>
        <button 
          @click="refresh()" 
          class="mt-4 border border-accent text-accent px-4 py-2 rounded font-mono text-sm hover:bg-accent/10 transition-colors"
        >
          Try Again
        </button>
      </div>
      
      <!-- Featured Videos -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="video in data || []" 
          :key="video.id"
          class="bg-surface/10 rounded-lg overflow-hidden hover:translate-y-[-7px] transition-transform duration-300 cursor-pointer"
          @click="navigateToVideo(video.id)"
        >
          <!-- Video Thumbnail -->
          <div class="relative group">
            <img 
              :src="video.thumbnail" 
              :alt="video.title"
              class="w-full h-48 object-cover"
            >
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div class="w-16 h-16 bg-accent/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div class="absolute top-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm font-mono">
              {{ video.duration }}
            </div>
          </div>
          
          <!-- Video Info -->
          <div class="p-6">
            <h3 class="text-text-primary text-xl font-semibold mb-3 line-clamp-2">
              {{ video.title }}
            </h3>
            <p class="text-text-secondary text-sm mb-4 leading-relaxed line-clamp-3">
              {{ video.description }}
            </p>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-text-muted text-sm">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {{ video.views }} views
              </div>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in video.tags.slice(0, 2)" 
                  :key="tag"
                  class="text-accent font-mono text-xs bg-accent/10 px-2 py-1 rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- View All Videos Link -->
      <div class="text-center mt-16">
        <NuxtLink to="/videos" class="inline-block border border-accent text-accent px-7 py-4 rounded font-mono hover:bg-accent/10 transition-colors">
          All Videos
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const { fetchChannelVideos } = useYouTube()

// Channel ID for @d.zhiganov
const CHANNEL_ID = 'UC_ckAFL4cSnoIQE2tZRiBKg'

const config = useRuntimeConfig()
const apiKeyStatus = config.public.youtubeApiKey ? 'Present' : 'Missing'

// Fetch videos from YouTube API
const { data, pending, error, refresh } = await useLazyAsyncData('youtube-videos', async () => {
  console.log('Fetching videos for channel:', CHANNEL_ID)
  console.log('API Key available:', !!config.public.youtubeApiKey)
  
  const result = await fetchChannelVideos(CHANNEL_ID, 6)
  console.log('Fetched videos:', result)
  return result
})

// Debug information
onMounted(() => {
  console.log('YouTube API Debug Info:')
  console.log('- API Key:', config.public.youtubeApiKey ? 'Present' : 'Missing')
  console.log('- Channel ID:', CHANNEL_ID)
  console.log('- Data:', data.value)
  console.log('- Error:', error.value)
  console.log('- Pending:', pending.value)
})

const navigateToVideo = (videoId) => {
  // Navigate to internal video page
  navigateTo(`/video/${videoId}`)
}
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