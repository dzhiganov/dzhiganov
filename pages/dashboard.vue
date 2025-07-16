<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold">Dashboard</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <img 
                v-if="user?.image" 
                :src="user.image" 
                :alt="user.name" 
                class="w-8 h-8 rounded-full"
              />
              <span class="text-sm font-medium">{{ user?.name }}</span>
            </div>
            
            <button
              @click="signOut"
              class="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
    
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg p-8">
          <div class="text-center">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Welcome to your dashboard!
            </h2>
            
            <div class="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
              <h3 class="text-lg font-semibold mb-4">Your Profile</h3>
              <div class="space-y-2 text-left">
                <p><strong>Name:</strong> {{ user?.name }}</p>
                <p><strong>Email:</strong> {{ user?.email }}</p>
                <p><strong>ID:</strong> {{ user?.id }}</p>
                <p><strong>Created:</strong> {{ formatDate(user?.createdAt) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: false,
})

const { user, signOut } = useAuth()

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString()
}

// Redirect if not authenticated
if (!user.value) {
  await navigateTo('/login')
}
</script>