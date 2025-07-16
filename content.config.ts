import { defineCollection, defineContentConfig } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    materials: defineCollection({
      type: 'page',
      source: 'materials/*.md',
    }),
  },
});
