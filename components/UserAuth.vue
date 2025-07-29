<template>
  <div>
    <!-- User is logged in -->
    <div v-if="user" class="relative flex items-center">
      <!-- User Avatar or First Letter - Clickable -->
      <div class="relative flex items-center">
        <button
          @click="togglePopup"
          class="focus:outline-none focus:ring-2 focus:ring-accent rounded-full"
        >
          <img
            v-if="user.image"
            :src="user.image"
            :alt="`${user.name} avatar`"
            class="w-10 h-10 rounded-full border-2 border-accent object-cover hover:scale-105 transition-transform"
          />
          <div
            v-else
            class="w-10 h-10 rounded-full border-2 border-accent bg-accent/20 flex items-center justify-center hover:scale-105 transition-transform"
          >
            <span class="text-accent font-semibold text-lg">
              {{ user.name?.charAt(0)?.toUpperCase() || 'U' }}
            </span>
          </div>
        </button>

        <!-- User Popup -->
        <div
          v-if="showPopup"
          class="absolute right-0 top-full mt-2 w-64 bg-bg-primary border border-border-color rounded-lg shadow-lg z-50"
          @click.stop
        >
          <div class="p-4">
            <div class="flex items-center space-x-3 mb-4">
              <img
                v-if="user.image"
                :src="user.image"
                :alt="`${user.name} avatar`"
                class="w-10 h-10 rounded-full border border-accent object-cover flex-shrink-0"
              />
              <div
                v-else
                class="w-10 h-10 rounded-full border border-accent bg-accent/20 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-accent font-semibold text-sm">
                  {{ user.name?.charAt(0)?.toUpperCase() || 'U' }}
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-text-primary text-sm font-medium truncate">
                  {{ user.name }}
                </div>
                <div class="text-text-muted text-xs truncate">
                  {{ user.email }}
                </div>
              </div>
            </div>

            <button
              @click="handleSignOut"
              class="w-full text-left px-3 py-2 text-sm text-text-muted hover:text-accent hover:bg-surface/30 rounded transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- User is not logged in -->
    <div v-else>
      <NuxtLink
        to="/login"
        class="px-4 py-2 rounded text-sm hover:bg-accent/10 transition-colors font-semibold"
      >
        Login
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { authClient } from '~/lib/auth-client';

const sessionData = ref(null);
const showPopup = ref(false);

async function getSession() {
  const { data: session } = await authClient.getSession();
  return session;
}

onMounted(async () => {
  const session = await getSession();
  sessionData.value = session;
});

const user = computed(() => {
  // Try different ways to access the user data
  const userData =
    sessionData?.value?.user || sessionData?.value?.session?.user;
  return userData;
});

const togglePopup = (event) => {
  event.stopPropagation();
  showPopup.value = !showPopup.value;
};

const handleSignOut = async () => {
  await authClient.signOut();
  showPopup.value = false;
  await navigateTo('/');
  window.location.reload();
};

// Close popup when clicking outside
const closePopup = () => {
  showPopup.value = false;
};

// Add click outside listener after session is loaded
watch(sessionData, (newSession) => {
  if (newSession) {
    nextTick(() => {
      document.addEventListener('click', closePopup);
    });
  }
});

onUnmounted(() => {
  document.removeEventListener('click', closePopup);
});
</script>
