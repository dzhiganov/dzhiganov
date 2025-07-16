interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views: string
  publishDate: string
  category: string
  tags: string[]
  youtubeId: string
}

interface YouTubeApiResponse {
  items: Array<{
    id: {
      videoId: string
    }
    snippet: {
      title: string
      description: string
      publishedAt: string
      thumbnails: {
        medium: {
          url: string
        }
      }
      tags?: string[]
      categoryId: string
    }
    statistics: {
      viewCount: string
    }
    contentDetails: {
      duration: string
    }
  }>
}

export const useYouTube = () => {
  const config = useRuntimeConfig()
  
  const formatDuration = (duration: string): string => {
    // Convert ISO 8601 duration (PT15M33S) to readable format (15:33)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return '0:00'
    
    const hours = parseInt(match[1] || '0')
    const minutes = parseInt(match[2] || '0')
    const seconds = parseInt(match[3] || '0')
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
  
  const formatViewCount = (count: string): string => {
    const num = parseInt(count)
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`
    }
    return count
  }
  
  const formatPublishDate = (dateString: string): string => {
    const publishDate = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - publishDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months} month${months > 1 ? 's' : ''} ago`
    } else {
      const years = Math.floor(diffDays / 365)
      return `${years} year${years > 1 ? 's' : ''} ago`
    }
  }
  
  const categorizeVideo = (title: string, description: string, tags: string[] = []): string => {
    const content = `${title} ${description} ${tags.join(' ')}`.toLowerCase()
    
    if (content.includes('react') || content.includes('jsx')) return 'React'
    if (content.includes('next.js') || content.includes('nextjs')) return 'Next.js'
    if (content.includes('typescript') || content.includes('ts')) return 'TypeScript'
    if (content.includes('javascript') || content.includes('js')) return 'JavaScript'
    if (content.includes('css') || content.includes('tailwind') || content.includes('styling')) return 'CSS'
    if (content.includes('node') || content.includes('backend') || content.includes('api')) return 'Backend'
    if (content.includes('deploy') || content.includes('vercel') || content.includes('netlify')) return 'Deployment'
    if (content.includes('performance') || content.includes('optimization')) return 'Performance'
    if (content.includes('testing') || content.includes('jest')) return 'Testing'
    
    return 'Web Development'
  }
  
  const extractTags = (title: string, description: string, ytTags: string[] = []): string[] => {
    const allTags = new Set<string>()
    
    // Add YouTube tags (first 3)
    ytTags.slice(0, 3).forEach(tag => allTags.add(tag))
    
    // Extract common tech terms from title and description
    const content = `${title} ${description}`.toLowerCase()
    const techTerms = [
      'react', 'nextjs', 'next.js', 'typescript', 'javascript', 'css', 'html',
      'tailwind', 'node.js', 'express', 'api', 'hooks', 'components',
      'tutorial', 'guide', 'tips', 'tricks', 'best practices'
    ]
    
    techTerms.forEach(term => {
      if (content.includes(term) && allTags.size < 4) {
        allTags.add(term.charAt(0).toUpperCase() + term.slice(1))
      }
    })
    
    return Array.from(allTags).slice(0, 4)
  }
  
  const fetchChannelVideos = async (channelId: string, maxResults: number = 12): Promise<YouTubeVideo[]> => {
    try {
      const apiKey = config.public.youtubeApiKey
      
      console.log('YouTube API Debug:')
      console.log('- API Key:', apiKey ? 'Present' : 'Missing')
      console.log('- Channel ID:', channelId)
      
      if (!apiKey) {
        console.error('YouTube API key not configured')
        throw new Error('YouTube API key not configured. Please add YOUTUBE_API_KEY to your .env file')
      }
      
      if (!channelId || channelId === 'UCYourChannelIdHere') {
        console.error('Channel ID not configured')
        throw new Error('Channel ID not configured. Please update CHANNEL_ID in VideosSection.vue')
      }
      
      // Step 1: Get video IDs from channel
      console.log('Fetching videos from YouTube API...')
      const searchResponse = await $fetch<YouTubeApiResponse>(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          key: apiKey,
          channelId: channelId,
          part: 'id,snippet',
          order: 'date',
          type: 'video',
          maxResults: maxResults
        }
      })
      
      console.log('Search response:', searchResponse)
      
      if (!searchResponse.items || searchResponse.items.length === 0) {
        console.log('No videos found for channel')
        return []
      }
      
      // Step 2: Get detailed video information
      const videoIds = searchResponse.items.map(item => item.id.videoId).join(',')
      
      const videosResponse = await $fetch<any>(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          key: apiKey,
          id: videoIds,
          part: 'snippet,statistics,contentDetails'
        }
      })
      
      // Step 3: Transform data
      console.log('Videos response:', videosResponse)
      const videos: YouTubeVideo[] = videosResponse.items.map((video: any) => {
        const snippet = video.snippet
        const stats = video.statistics
        const contentDetails = video.contentDetails
        
        return {
          id: video.id,
          title: snippet.title,
          description: snippet.description.split('\n')[0].substring(0, 150) + '...',
          thumbnail: snippet.thumbnails.medium.url,
          duration: formatDuration(contentDetails.duration),
          views: formatViewCount(stats.viewCount),
          publishDate: formatPublishDate(snippet.publishedAt),
          category: categorizeVideo(snippet.title, snippet.description, snippet.tags),
          tags: extractTags(snippet.title, snippet.description, snippet.tags),
          youtubeId: video.id
        }
      })
      
      return videos
      
    } catch (error) {
      console.error('Error fetching YouTube videos:', error)
      return []
    }
  }
  
  return {
    fetchChannelVideos
  }
}