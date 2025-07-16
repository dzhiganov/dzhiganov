<template>
  <div class="min-h-screen pt-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
    <div class="max-w-6xl">
      <!-- Back Button -->
      <NuxtLink 
        to="/" 
        class="flex items-center text-accent hover:text-text-primary transition-colors mb-8 font-mono"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </NuxtLink>

      <!-- Page Header -->
      <div class="mb-16">
        <h1 class="text-text-primary text-4xl md:text-6xl font-bold mb-6">All Videos</h1>
        <p class="text-text-secondary text-lg max-w-2xl leading-relaxed">
          A complete collection of coding tutorials from @d.zhiganov, covering modern web development, 
          React patterns, and developer productivity tips. Each video includes source code and additional resources.
        </p>
      </div>

      <!-- Debug Info -->
      <div class="mb-8 p-4 bg-surface/10 rounded-lg font-mono text-sm">
        <h3 class="text-accent mb-2">Debug Information:</h3>
        <p>API Key: {{ apiKeyStatus }}</p>
        <p>Channel ID: {{ CHANNEL_ID }}</p>
        <p>Data: {{ allVideos ? `${allVideos.length} videos` : 'null' }}</p>
        <p>Error: {{ error || 'none' }}</p>
        <p>Pending: {{ pending }}</p>
      </div>

      <!-- Filter/Sort Options -->
      <div v-if="allVideos && allVideos.length > 0" class="mb-12 flex flex-wrap gap-4 items-center">
        <div class="flex items-center gap-2">
          <span class="text-text-secondary font-mono text-sm">Filter by:</span>
          <select 
            v-model="selectedCategory" 
            class="bg-surface/10 border border-border-color text-text-primary px-3 py-2 rounded font-mono text-sm focus:border-accent focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option v-for="category in availableCategories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        
        <div class="flex items-center gap-2">
          <span class="text-text-secondary font-mono text-sm">Sort by:</span>
          <select 
            v-model="sortBy" 
            class="bg-surface/10 border border-border-color text-text-primary px-3 py-2 rounded font-mono text-sm focus:border-accent focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 12" :key="i" class="bg-surface/10 rounded-lg overflow-hidden animate-pulse">
          <div class="w-full h-48 bg-surface/20"></div>
          <div class="p-6">
            <div class="h-6 bg-surface/20 rounded mb-3"></div>
            <div class="h-4 bg-surface/20 rounded mb-2"></div>
            <div class="h-4 bg-surface/20 rounded w-3/4 mb-4"></div>
            <div class="flex justify-between">
              <div class="h-4 bg-surface/20 rounded w-20"></div>
              <div class="h-4 bg-surface/20 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-text-muted mb-4">Unable to load videos from YouTube.</p>
        <p class="text-text-muted text-sm mb-6">{{ error }}</p>
        <button 
          @click="refresh()" 
          class="border border-accent text-accent px-4 py-2 rounded font-mono text-sm hover:bg-accent/10 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Videos Grid -->
      <div v-else-if="filteredAndSortedVideos.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="video in filteredAndSortedVideos" 
          :key="video.id"
          class="bg-surface/10 rounded-lg overflow-hidden hover:translate-y-[-7px] transition-transform duration-300 cursor-pointer"
          @click="navigateToVideo(video.youtubeId)"
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
            <div class="absolute top-4 left-4 bg-accent/90 text-primary px-2 py-1 rounded text-xs font-mono font-bold">
              {{ video.category }}
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
            
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2 text-text-muted text-sm">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {{ video.views }} views
              </div>
              <div class="text-text-muted text-sm font-mono">
                {{ video.publishDate }}
              </div>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in video.tags.slice(0, 3)" 
                :key="tag"
                class="text-accent font-mono text-xs bg-accent/10 px-2 py-1 rounded"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- No Videos State -->
      <div v-else class="text-center py-12">
        <p class="text-text-muted mb-4">No videos found.</p>
        <button 
          @click="refresh()" 
          class="border border-accent text-accent px-4 py-2 rounded font-mono text-sm hover:bg-accent/10 transition-colors"
        >
          Refresh
        </button>
      </div>

      <!-- Load More Button (if needed) -->
      <div v-if="allVideos && allVideos.length >= 24" class="text-center mt-16">
        <button 
          @click="loadMoreVideos"
          class="inline-block border border-accent text-accent px-7 py-4 rounded font-mono hover:bg-accent/10 transition-colors"
        >
          Load More Videos
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const { fetchChannelVideos } = useYouTube()

// Channel ID for @d.zhiganov
const CHANNEL_ID = 'UC_ckAFL4cSnoIQE2tZRiBKg'

const config = useRuntimeConfig()
const apiKeyStatus = config.public.youtubeApiKey ? 'Present' : 'Missing'

const selectedCategory = ref('all')
const sortBy = ref('newest')

// Fetch all videos from YouTube API (more than the homepage)
const { data: allVideos, pending, error, refresh } = await useLazyAsyncData('all-youtube-videos', async () => {
  console.log('Fetching all videos for channel:', CHANNEL_ID)
  const result = await fetchChannelVideos(CHANNEL_ID, 24) // Fetch more videos for the all videos page
  console.log('Fetched all videos:', result)
  return result
})

// Get available categories from the fetched videos
const availableCategories = computed(() => {
  if (!allVideos.value) return []
  const categories = [...new Set(allVideos.value.map(video => video.category))]
  return categories.sort()
})

// Helper function to parse duration for sorting
const parseDuration = (duration) => {
  const parts = duration.split(':')
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1])
  } else if (parts.length === 3) {
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
  }
  return 0
}

// Helper function to parse view count for sorting
const parseViewCount = (views) => {
  const num = views.toLowerCase()
  if (num.includes('k')) {
    return parseFloat(num) * 1000
  } else if (num.includes('m')) {
    return parseFloat(num) * 1000000
  }
  return parseInt(num) || 0
}

// Computed properties for filtering and sorting
const filteredAndSortedVideos = computed(() => {
  if (!allVideos.value) return []
  
  let filtered = allVideos.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(video => 
      video.category === selectedCategory.value || 
      video.tags.includes(selectedCategory.value)
    )
  }

  // Sort videos
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'newest':
        // For newest, we'll assume the order from YouTube API is already newest first
        return 0
      case 'oldest':
        // Reverse the order for oldest first
        return 0
      case 'popular':
        const aViews = parseViewCount(a.views)
        const bViews = parseViewCount(b.views)
        return bViews - aViews
      case 'duration':
        const aDuration = parseDuration(a.duration)
        const bDuration = parseDuration(b.duration)
        return aDuration - bDuration
      default:
        return 0
    }
  })

  return sorted
})

const navigateToVideo = (youtubeId) => {
  // Navigate to internal video page  
  navigateTo(`/video/${youtubeId}`)
}

const loadMoreVideos = () => {
  // This could be implemented to fetch more videos
  console.log('Loading more videos...')
  // You could implement pagination here by fetching more videos from the API
}

// Set page meta
useHead({
  title: 'All Videos - @d.zhiganov Channel',
  meta: [
    { name: 'description', content: 'Complete collection of coding tutorials from @d.zhiganov covering modern web development, React, and programming best practices.' }
  ]
})
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