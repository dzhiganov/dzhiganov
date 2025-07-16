<template>
  <div class="h-screen bg-primary overflow-hidden">
    <!-- Dashboard Layout -->
    <div class="flex h-full">
      <!-- Fixed Sidebar -->
      <aside
        class="w-64 bg-surface border-r border-surface/20 flex flex-col h-full flex-shrink-0"
      >
        <div class="flex-1 flex flex-col">
          <!-- Profile Section -->
          <div class="p-6 border-b border-surface/20">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center"
              >
                <span class="text-accent font-bold text-lg">DZ</span>
              </div>
              <div>
                <h1 class="text-text-primary font-semibold">
                  Dmitriy Zhiganov
                </h1>
                <p class="text-text-muted text-sm">Senior Software Engineer</p>
              </div>
            </div>
          </div>
          <!-- Navigation -->
          <nav class="flex-1 p-4">
            <div class="space-y-1">
              <NuxtLink
                to="/"
                class="flex items-center px-3 py-2.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface/50 transition-colors font-medium"
                :class="{
                  'bg-accent/10 text-accent hover:text-accent':
                    $route.path === '/',
                }"
              >
                <svg
                  class="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7.5v6L5.5 14 11 10.5z"
                  />
                </svg>
                Videos
              </NuxtLink>
              <NuxtLink
                to="/about"
                class="flex items-center px-3 py-2.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface/50 transition-colors font-medium"
                :class="{
                  'bg-accent/10 text-accent hover:text-accent':
                    $route.path === '/about',
                }"
              >
                <svg
                  class="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
                About
              </NuxtLink>
            </div>
          </nav>
          <!-- Footer -->
          <div class="p-4 border-t border-surface/20">
            <!-- Theme Toggle -->
            <div class="flex items-center justify-center mb-4">
              <ThemeToggle />
            </div>

            <!-- Social Links -->
            <div class="flex justify-center space-x-4">
              <a
                href="https://github.com/delawere"
                target="_blank"
                class="text-text-muted hover:text-accent transition-colors p-1"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/dmitriy-zhiganov"
                target="_blank"
                class="text-text-muted hover:text-accent transition-colors p-1"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
              <a
                href="mailto:hey@dimazhiganov.dev"
                class="text-text-muted hover:text-accent transition-colors p-1"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </aside>
      <!-- Main Content Area -->
      <main class="bg-primary overflow-hidden">
        <!-- Content Container -->
        <div class="flex-1">
          <div class="p-8">
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup></script>
