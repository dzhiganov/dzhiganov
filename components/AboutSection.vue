<template>
  <section id="about" class="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
    <div class="max-w-4xl">
      <h2 class="section-heading">
        <span class="text-accent font-mono text-xl">01.</span>
        About Me
      </h2>
      
      <div class="grid md:grid-cols-3 gap-12 mt-12">
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
            <div class="absolute inset-0 border-2 border-secondary rounded translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>