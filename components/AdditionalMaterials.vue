<template>
  <div
    v-if="hasAdditionalMaterials"
    class="bg-gray-50 dark:bg-surface/10 border border-border-color rounded-lg p-6 mb-8"
  >
    <h3 class="text-text-primary text-lg font-semibold mb-4 flex items-center">
      Additional Materials
    </h3>

    <div class="space-y-4">
      <!-- Dynamic Resources -->
      <div
        v-for="resource in resources"
        :key="resource.link"
        class="flex items-center justify-between p-4 bg-white dark:bg-bg-primary border border-border-color rounded-lg hover:bg-gray-50 dark:hover:bg-surface/20 transition-colors"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center"
          >
            <!-- Slides Icon -->
            <PresentationChartBarIcon
              v-if="resource.type === 'slides'"
              class="w-5 h-5 text-accent"
            />
            <!-- Audio Icon -->
            <SpeakerWaveIcon
              v-else-if="resource.type === 'audio'"
              class="w-5 h-5 text-accent"
            />
            <!-- Code Icon -->
            <CodeBracketIcon
              v-else-if="resource.type === 'code'"
              class="w-5 h-5 text-accent"
            />
            <!-- Default Link Icon -->
            <LinkIcon v-else class="w-5 h-5 text-accent" />
          </div>
          <div>
            <h4 class="text-text-primary font-medium">{{ getResourceTitle(resource.type, resource.title) }}</h4>
            <p class="text-text-muted text-sm">
              {{ getResourceDescription(resource.type) }}
            </p>
          </div>
        </div>
        <a
          :href="resource.link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 border border-accent text-accent rounded font-mono text-sm hover:bg-accent/10 transition-colors"
        >
          <ArrowTopRightOnSquareIcon class="w-4 h-4 mr-2" />
          {{ getResourceButtonText(resource.type) }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  LinkIcon,
  PresentationChartBarIcon,
  SpeakerWaveIcon,
} from '@heroicons/vue/24/outline';

const props = defineProps({
  resources: {
    type: Array,
    default: () => [],
  },
});


const hasAdditionalMaterials = computed(() => {
  return props.resources && props.resources.length > 0;
});

const getResourceTitle = (type, originalTitle) => {
  const defaultTitles = {
    slides: 'Slides',
    audio: 'Podcast',
    code: 'Source Code',
    default: 'Resource',
  };
  
  // Use original title if provided, otherwise use default
  return originalTitle || defaultTitles[type] || defaultTitles.default;
};

const getResourceDescription = (type) => {
  const descriptions = {
    slides: 'View the slides used in this tutorial',
    audio: 'Listen to the AI-generated podcast',
    code: 'Download the complete source code',
    default: 'Access additional resource',
  };
  return descriptions[type] || descriptions.default;
};

const getResourceButtonText = (type) => {
  const buttonTexts = {
    slides: 'View Slides',
    audio: 'Listen',
    code: 'Download',
    default: 'Visit',
  };
  return buttonTexts[type] || buttonTexts.default;
};
</script>
