<template>
  <section id="experience" class="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
    <div class="max-w-4xl">
      <h2 class="section-heading">
        <span class="text-green  text-xl">02.</span>
        Where I've Worked
      </h2>
      
      <div class="mt-12 flex flex-col md:flex-row">
        <!-- Company Tabs -->
        <div class="flex md:flex-col mb-8 md:mb-0 md:mr-8 overflow-x-auto">
          <button 
            v-for="(job, index) in jobs" 
            :key="index"
            @click="activeJob = index"
            :class="[
              'whitespace-nowrap px-6 py-3 text-left border-b-2 md:border-b-0 md:border-l-2 transition-colors duration-300  text-sm',
              activeJob === index 
                ? 'border-green text-green bg-green/10' 
                : 'border-navy-light text-slate hover:text-green hover:bg-green/5'
            ]"
          >
            {{ job.company }}
          </button>
        </div>
        
        <!-- Job Content -->
        <div class="flex-1 min-h-[400px]">
          <div v-if="jobs[activeJob]" class="space-y-6">
            <div>
              <h3 class="text-xl font-medium text-lightest-slate">
                {{ jobs[activeJob].title }}
                <span class="text-green">@ {{ jobs[activeJob].company }}</span>
              </h3>
              <p class="text-slate  text-sm mt-1">
                {{ jobs[activeJob].duration }}
              </p>
            </div>
            
            <ul class="space-y-3">
              <li v-for="(achievement, i) in jobs[activeJob].achievements" :key="i" class="flex items-start text-slate">
                <span class="text-green mr-3 mt-1 text-sm">▹</span>
                <span class="leading-relaxed" v-html="achievement"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeJob = ref(0)

const jobs = [
  {
    company: 'Upstatement',
    title: 'Senior Frontend Engineer',
    duration: 'May 2018 - Present',
    achievements: [
      'Write modern, performant, maintainable code for a diverse array of client and internal projects',
      'Work with a variety of different languages, platforms, frameworks, and content management systems such as JavaScript, TypeScript, Gatsby, React, Craft, WordPress, Prismic, and Netlify',
      'Communicate with multi-disciplinary teams of engineers, designers, producers, and clients on a daily basis'
    ]
  },
  {
    company: 'Apple',
    title: 'UI Engineer Co-op',
    duration: 'July - December 2017',
    achievements: [
      'Developed and shipped highly interactive web applications for Apple Music using Ember.js',
      'Built and shipped the Apple Music Extension within Facebook Messenger leveraging third-party and internal APIs',
      'Architected and implemented the front-end of Apple Music\'s embeddable web player widget, which lets users log in and listen to full songs in the browser',
      'Contributed extensively to MusicKit.js, a JavaScript framework that allows developers to add an Apple Music player to their web apps'
    ]
  },
  {
    company: 'Scout Studio',
    title: 'Developer',
    duration: 'January - June 2017',
    achievements: [
      'Collaborated with other student designers and engineers on pro-bono projects to create new brands, design systems, and websites for organizations in the community',
      'Built and delivered technical solutions according to stakeholder business requirements'
    ]
  },
  {
    company: 'Starry',
    title: 'Software Engineer Co-op',
    duration: 'July - December 2016',
    achievements: [
      'Engineered and maintained major features of Starry\'s customer-facing web app using ES6, Handlebars, Backbone, Marionette and CSS',
      'Proposed and implemented scalable solutions to issues identified with cloud services and applications responsible for communicating with Starry\'s proprietary hardware',
      'Collaborated with designers and other developers to ensure thoughtful and coherent user experiences across Starry\'s iOS and Android mobile apps'
    ]
  },
  {
    company: 'Mullen',
    title: 'Creative Technologist Co-op',
    duration: 'July - December 2015',
    achievements: [
      'Developed and maintained code for in-house and client websites primarily using HTML, CSS, Sass, JavaScript, and jQuery',
      'Manually tested sites in various browsers and mobile devices to ensure cross-browser compatibility and responsiveness',
      'Clients included JetBlue, Lovesac, U.S. Cellular, U.S. Department of Defense, and more'
    ]
  }
]
</script>