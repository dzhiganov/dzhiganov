<template>
  <div>
    <!-- About Me Section -->
    <section class="mb-12">
      <h1 class="text-4xl font-bold text-text-primary mb-8">About Me</h1>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
          <div class="text-text-muted space-y-4 text-lg leading-relaxed">
            <p>
              Hello! My name is Dmitriy and I'm a Senior Software Engineer with 6+ years of expertise in React, TypeScript, and backend technologies. 
              My journey in web development has taken me from Kazan to Berlin, where I now work at Trade Republic building cutting-edge fintech solutions.
            </p>
            
            <p>
              Throughout my career, I've had the privilege of working at leading companies like 
              <a href="https://traderepublic.com" class="text-accent hover:underline">Trade Republic</a>, 
              <a href="https://exante.eu" class="text-accent hover:underline">EXANTE</a>, 
              <a href="https://kaspersky.com" class="text-accent hover:underline">Kaspersky</a>, and 
              <a href="https://qiwi.com" class="text-accent hover:underline">Qiwi</a>. 
              My expertise spans from frontend development to team leadership and CI/CD implementation.
            </p>
            
            <p>
              Some of my key achievements include leading test integration that reduced bugs by 20%, 
              developing a CMS platform that increased team productivity by 15%, and establishing an intern program 
              with a 90% acceptance rate through structured mentorship.
            </p>
            
            <p>Here are a few technologies I've been working with recently:</p>
          </div>
          
          <ul class="grid grid-cols-2 gap-2 mt-6 text-text-muted font-mono text-sm">
            <li class="flex items-center">
              <span class="text-accent mr-2">▹</span>
              React & TypeScript
            </li>
            <li class="flex items-center">
              <span class="text-accent mr-2">▹</span>
              JavaScript & GraphQL
            </li>
            <li class="flex items-center">
              <span class="text-accent mr-2">▹</span>
              Unit Testing & CI/CD
            </li>
            <li class="flex items-center">
              <span class="text-accent mr-2">▹</span>
              Team Leadership
            </li>
            <li class="flex items-center">
              <span class="text-accent mr-2">▹</span>
              Frontend Architecture
            </li>
            <li class="flex items-center">
              <span class="text-accent mr-2">▹</span>
              Code Quality & Optimization
            </li>
          </ul>
        </div>
        
        <div class="relative group">
          <div class="relative">
            <img 
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
              alt="Dmitriy Zhiganov"
              class="rounded w-full max-w-xs filter grayscale hover:grayscale-0 transition-all duration-300"
            >
            <div class="absolute inset-0 border-2 border-accent rounded translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="bg-surface/5 rounded-lg p-8">
      <h2 class="text-3xl font-bold text-text-primary mb-6">Get In Touch</h2>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <p class="text-text-muted text-lg leading-relaxed mb-6">
            Although I'm not currently looking for any new opportunities, my inbox is always open. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <a href="mailto:hey@dimazhiganov.dev" class="text-text-primary hover:text-accent transition-colors">
                hey@dimazhiganov.dev
              </a>
            </div>
            
            <div class="flex items-center">
              <svg class="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 17.56c-4.24-.95-7.43-4.78-7.43-9.56 0-5.52 4.48-10 10-10s10 4.48 10 10c0 4.78-3.19 8.61-7.43 9.56L12 13.5l-1.2 6.06z"/>
              </svg>
              <span class="text-text-primary">Berlin, Germany</span>
            </div>
            
            <div class="flex items-center">
              <svg class="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <a href="https://linkedin.com/in/dmitriy-zhiganov" target="_blank" class="text-text-primary hover:text-accent transition-colors">
                LinkedIn Profile
              </a>
            </div>
            
            <div class="flex items-center">
              <svg class="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <a href="https://github.com/delawere" target="_blank" class="text-text-primary hover:text-accent transition-colors">
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
        
        <div class="flex flex-col justify-center">
          <a 
            href="mailto:hey@dimazhiganov.dev" 
            class="inline-block border border-accent text-accent px-8 py-4 rounded-lg font-mono text-center hover:bg-accent/10 transition-colors"
          >
            Say Hello
          </a>
        </div>
      </div>
    </section>
  </div>
</template>