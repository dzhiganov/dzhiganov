<template>
  <div class="min-h-screen pt-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
    <div v-if="currentVideo" class="max-w-6xl">
      <!-- Back Button -->
      <button 
        @click="$router.back()" 
        class="flex items-center text-accent hover:text-text-primary transition-colors mb-8 font-mono"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Videos
      </button>

      <!-- Video Content -->
      <div class="grid lg:grid-cols-3 gap-12">
        <!-- Main Video Section -->
        <div class="lg:col-span-2">
          <!-- Video Player -->
          <div class="relative bg-black rounded-lg overflow-hidden mb-8">
            <div class="aspect-video">
              <iframe
                :src="`https://www.youtube.com/embed/${currentVideo.youtubeId}`"
                class="w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <!-- Video Info -->
          <div class="mb-8">
            <h1 class="text-text-primary text-3xl font-bold mb-4">{{ currentVideo.title }}</h1>
            
            <div class="flex items-center gap-6 mb-6 text-text-secondary">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {{ currentVideo.views }} views
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {{ currentVideo.likes }} likes
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                Published {{ currentVideo.publishDate }}
              </div>
            </div>

            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="tag in currentVideo.tags" 
                :key="tag"
                class="text-accent font-mono text-sm bg-accent/10 px-3 py-1 rounded"
              >
                {{ tag }}
              </span>
            </div>

            <div class="prose prose-invert max-w-none">
              <p class="text-text-secondary text-lg leading-relaxed">{{ currentVideo.description }}</p>
            </div>
          </div>

          <!-- Video Description -->
          <div class="bg-surface/10 p-6 rounded-lg">
            <h3 class="text-text-primary text-xl font-semibold mb-4">About This Video</h3>
            <div class="text-text-secondary space-y-4">
              <p>{{ currentVideo.longDescription }}</p>
              
              <div v-if="currentVideo.timestamps">
                <h4 class="text-text-primary font-semibold mb-2">Timestamps:</h4>
                <ul class="space-y-1">
                  <li v-for="timestamp in currentVideo.timestamps" :key="timestamp.time" class="font-mono text-sm">
                    <span class="text-accent">{{ timestamp.time }}</span> - {{ timestamp.title }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Additional Resources -->
          <div class="bg-surface/10 p-6 rounded-lg mb-8">
            <h3 class="text-text-primary text-xl font-semibold mb-4">Resources</h3>
            <div class="space-y-3">
              <a 
                v-for="resource in currentVideo.resources" 
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

          <!-- Materials -->
          <div v-if="currentVideo.hasMaterials" class="bg-surface/10 p-6 rounded-lg mb-8">
            <h3 class="text-text-primary text-xl font-semibold mb-4">Materials</h3>
            <p class="text-text-secondary text-sm mb-4">Get access to source code, project files, and additional resources for this tutorial.</p>
            <NuxtLink 
              :to="`/materials/${currentVideo.youtubeId}`"
              class="inline-flex items-center text-accent hover:text-text-primary transition-colors bg-accent/10 hover:bg-accent/20 px-4 py-2 rounded"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Get Materials
            </NuxtLink>
          </div>

          <!-- Related Videos -->
          <div class="bg-surface/10 p-6 rounded-lg">
            <h3 class="text-text-primary text-xl font-semibold mb-4">Related Videos</h3>
            <div class="space-y-4">
              <div 
                v-for="relatedVideo in relatedVideos" 
                :key="relatedVideo.id"
                class="flex gap-3 cursor-pointer hover:bg-surface/5 p-2 rounded transition-colors"
                @click="navigateToVideo(relatedVideo.id)"
              >
                <img 
                  :src="relatedVideo.thumbnail" 
                  :alt="relatedVideo.title"
                  class="w-20 h-12 object-cover rounded"
                >
                <div class="flex-1">
                  <h4 class="text-text-primary text-sm font-medium line-clamp-2 mb-1">
                    {{ relatedVideo.title }}
                  </h4>
                  <p class="text-text-secondary text-xs">{{ relatedVideo.views }} views</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Not Found -->
    <div v-else class="text-center py-24">
      <h1 class="text-text-primary text-3xl font-bold mb-4">Video Not Found</h1>
      <p class="text-text-secondary mb-8">The video you're looking for doesn't exist.</p>
      <NuxtLink to="/#videos" class="inline-block border border-accent text-accent px-7 py-4 rounded font-mono hover:bg-accent/10 transition-colors">
        Back to Videos
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { fetchChannelVideos } = useYouTube()

// Channel ID for @d.zhiganov
const CHANNEL_ID = 'UC_ckAFL4cSnoIQE2tZRiBKg'

// Fetch all videos to find the current one
const { data: allVideos } = await useLazyAsyncData('video-details', async () => {
  const videos = await fetchChannelVideos(CHANNEL_ID, 50) // Fetch more videos to ensure we find the one
  return videos
})

// Find the current video by YouTube ID
const video = computed(() => {
  if (!allVideos.value) return null
  return allVideos.value.find(v => v.youtubeId === route.params.id)
})

// Generate mock additional data for the video page
const enhancedVideo = computed(() => {
  if (!video.value) return null
  
  return {
    ...video.value,
    youtubeId: video.value.youtubeId,
    likes: '8.7K', // Mock data - YouTube API doesn't provide likes without OAuth
    longDescription: `${video.value.description} This comprehensive tutorial covers everything you need to know about the topic with practical examples and real-world applications.`,
    hasMaterials: true,
    timestamps: [
      { time: '0:00', title: 'Introduction' },
      { time: '5:30', title: 'Getting Started' },
      { time: '15:45', title: 'Core Concepts' },
      { time: '25:20', title: 'Advanced Techniques' },
      { time: '35:10', title: 'Best Practices' },
      { time: '45:00', title: 'Conclusion' }
    ],
    resources: [
      { title: 'Official Documentation', url: 'https://developer.mozilla.org' },
      { title: 'GitHub Repository', url: 'https://github.com' },
      { title: 'Additional Resources', url: 'https://example.com' }
    ]
  }
})

const relatedVideos = [
  {
    id: 'nextjs-fullstack-app',
    title: 'Build a Full-Stack App with Next.js 14',
    thumbnail: 'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    views: '189K'
  },
  {
    id: 'tailwind-advanced-patterns',
    title: 'Advanced Tailwind CSS Patterns & Components',
    thumbnail: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    views: '156K'
  }
]

// Use the enhanced video data
const currentVideo = computed(() => enhancedVideo.value)

const navigateToVideo = (videoId) => {
  router.push(`/video/${videoId}`)
}

// Set page meta
useHead(() => ({
  title: currentVideo.value ? `${currentVideo.value.title} - Alex Rivera` : 'Video Not Found - Alex Rivera',
  meta: [
    { 
      name: 'description', 
      content: currentVideo.value ? currentVideo.value.description : 'Video not found' 
    }
  ]
}))
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  color: inherit;
}

.prose p {
  margin-bottom: 1rem;
}
</style>