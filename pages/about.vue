<template>
  <div class="min-h-screen">
    <!-- Banner -->
    <div class="w-full relative overflow-hidden">
      <img src="@/public/banner.png" alt="Banner" class="w-full h-auto" />
      <div class="absolute inset-0 bg-black/40"></div>
      <a
        href="https://unsplash.com/@purzlbaum"
        target="_blank"
        rel="noopener noreferrer"
        class="absolute bottom-2 right-4 text-xs text-white/70 hover:text-white transition-colors"
      >
        Photo by Claudio Schwarz
      </a>
    </div>

    <!-- About Content Container -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <div class="animate-fade-up">
        <!-- Header Section -->
        <div class="mb-12">
          <h1 class="text-5xl font-bold text-text-primary mb-4">About Me</h1>
          <div class="h-1 w-20 bg-accent rounded-full"></div>
        </div>

        <!-- Content -->
        <div class="prose prose-invert max-w-none mb-12 text-base">
          <p class="text-text-secondary leading-relaxed mb-6">
            Senior Frontend Developer with 7.5+ years of experience, based in
            Germany. I work with React, Vue, and TypeScript. I've built products
            for millions of users, led teams of 3 developers, and set up testing
            infrastructure and CI/CD pipelines.
          </p>

          <ul
            class="space-y-3 text-text-secondary text-base leading-relaxed list-none"
          >
            <li>
              <strong class="text-text-primary">What I build:</strong> B2C/B2B
              products, internal tools (Backoffice, CMS), UI component
              libraries, and developer tooling—CI/CD pipelines, linting setups,
              automated testing.
            </li>
            <li>
              <strong class="text-text-primary">Technical experience:</strong>
              React, Vue, TypeScript, with full-stack experience in Node.js,
              PostgreSQL, and MongoDB. I've developed UI kit libraries used by
              multiple teams across companies.
            </li>
            <li>
              <strong class="text-text-primary">Industries:</strong> FinTech
              (Investment platforms, Banking, Online payments), Web Security,
              Healthcare. Currently working at Trade Republic (Europe's largest
              savings platform).
            </li>
            <li>
              <strong class="text-text-primary"
                >Infrastructure & testing:</strong
              >
              I set up CI/CD pipelines, automated testing (unit, E2E,
              integration tests), linting standards, and security automation.
              Reduced bugs by 20% and code errors by 30%.
            </li>
            <li>
              <strong class="text-text-primary">Leadership & mentoring:</strong>
              Led 3-person frontend teams, mentored 5 developers through
              probation, and ran technical workshops.
            </li>
          </ul>
        </div>

        <!-- Find Me Online Title -->
        <h2 class="text-xl font-bold text-text-primary mb-6 mt-12">
          Find Me Online
        </h2>

        <!-- Social Links - Minimalistic Design -->
        <div class="flex flex-col gap-6 w-fit mb-12">
          <!-- GitHub -->
          <a
            href="https://github.com/dzhiganov"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center space-x-4 group cursor-pointer outline-none"
          >
            <svg
              class="w-6 h-6 text-text-muted group-hover:text-[#333] dark:group-hover:text-white transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            <div>
              <p class="text-text-primary font-medium text-base">GitHub</p>
              <p class="text-text-muted text-sm">dzhiganov</p>
            </div>
          </a>

          <!-- LinkedIn -->
          <a
            href="https://www.linkedin.com/in/dmitriy-zhiganov"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center space-x-4 group cursor-pointer outline-none"
          >
            <svg
              class="w-6 h-6 text-text-muted group-hover:text-[#0A66C2] transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
            <div>
              <p class="text-text-primary font-medium text-base">LinkedIn</p>
              <p class="text-text-muted text-sm">dmitriy-zhiganov</p>
            </div>
          </a>

          <!-- Twitter -->
          <a
            href="https://x.com/dima_zhiganov"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center space-x-4 group cursor-pointer outline-none"
          >
            <svg
              class="w-6 h-6 text-text-muted group-hover:text-black dark:group-hover:text-white transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
            <div>
              <p class="text-text-primary font-medium text-base">Twitter</p>
              <p class="text-text-muted text-sm">@dima_zhiganov</p>
            </div>
          </a>

          <!-- YouTube -->
          <a
            href="https://www.youtube.com/@d.zhiganov"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center space-x-4 group cursor-pointer outline-none"
          >
            <svg
              class="w-6 h-6 text-text-muted group-hover:text-[#FF0000] transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
              />
            </svg>
            <div>
              <p class="text-text-primary font-medium text-base">YouTube</p>
              <p class="text-text-muted text-sm">@d.zhiganov</p>
            </div>
          </a>

          <!-- Email -->
          <a
            href="mailto:dmitriyzhiganov101@gmail.com"
            class="flex items-center space-x-4 group cursor-pointer outline-none"
          >
            <svg
              class="w-6 h-6 text-text-muted group-hover:text-accent transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
            <div>
              <p class="text-text-primary font-medium text-base">Email</p>
              <p class="text-text-muted text-sm">
                dmitriyzhiganov101@gmail.com
              </p>
            </div>
          </a>

          <!-- Stack Overflow -->
          <a
            href="https://stackoverflow.com/users/13730174/dmitriy-zhiganov"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center space-x-4 group cursor-pointer outline-none"
          >
            <CodeBracketSquareIcon
              class="w-6 h-6 text-text-muted group-hover:text-[#F48024] transition-colors flex-shrink-0"
            />
            <div>
              <p class="text-text-primary font-medium text-base">
                Stack Overflow
              </p>
              <p class="text-text-muted text-sm">dmitriy-zhiganov</p>
            </div>
          </a>

          <!-- LeetCode -->
          <a
            href="https://leetcode.com/u/delawere/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center space-x-4 group cursor-pointer outline-none"
          >
            <CommandLineIcon
              class="w-6 h-6 text-text-muted group-hover:text-[#FFA116] transition-colors flex-shrink-0"
            />
            <div>
              <p class="text-text-primary font-medium text-base">LeetCode</p>
              <p class="text-text-muted text-sm">delawere</p>
            </div>
          </a>
        </div>

        <!-- Resume Section -->
        <div class="mt-12 mb-12">
          <h2 class="text-xl font-bold text-text-primary mb-6">Resume</h2>
          <a
            href="https://drive.google.com/file/d/1EI8PIxlqYsviPm9Sp-hIm5plVkDo2cEF/view"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center space-x-4 group cursor-pointer outline-none"
          >
            <DocumentIcon
              class="w-6 h-6 text-text-muted group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors flex-shrink-0"
            />
            <div>
              <p class="text-text-primary font-medium text-base">Resume</p>
              <p class="text-text-muted text-sm">PDF</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CodeBracketSquareIcon,
  CommandLineIcon,
  DocumentIcon,
} from '@heroicons/vue/24/outline';

// Page metadata
definePageMeta({
  layout: 'default',
});
</script>

<style scoped>
a {
  outline: none !important;
}

a:focus {
  outline: none !important;
}

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

.prose ul li {
  font-size: inherit;
}
</style>
