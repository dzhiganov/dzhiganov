---
title: 'Web Performance: Building Fast Web Applications'
description: 'Comprehensive guide to web performance optimization covering loading time, UI speed, and advanced techniques for building fast web applications'
thumbnail: '/materials/performance/main.jpeg'
videoId: 'https://www.youtube.com/watch?v=ixee55xm_d8&feature=youtu.be'
videoTitle: 'Web Performance: Building Fast Web Applications - Complete Guide'
duration: '1:08:26'
publishedAt: '2025-07-20'
tags:
  [
    'Performance',
    'Web Development',
    'Optimization',
    'CDN',
    'Caching',
    'JavaScript',
    'CSS',
    'Frontend',
  ]
difficulty: 'Intermediate'
resources:
  [
    {
      type: 'slides',
      title: 'Slides',
      link: 'https://drive.google.com/file/d/1bqVdmrgDxmwgm3h0-j77u-S4fLZKQ8vi/view?usp=sharing',
    },
  ]
---

## Table of Contents

1. [What Web Performance Really Means](#what-web-performance-really-means)
2. [When to Prioritize Loading Time](#when-to-prioritize-loading-time)
3. [When to Prioritize UI Speed](#when-to-prioritize-ui-speed)
4. [Performance Optimization Strategy](#performance-optimization-strategy)
5. [Loading Time Optimization Deep Dive](#loading-time-optimization-deep-dive)
   - [Understanding Core Metrics](#understanding-core-metrics)
   - [Time to First Byte (TTFB) Optimization](#1-time-to-first-byte-ttfb-optimization)
   - [First Contentful Paint (FCP) Optimization](#2-first-contentful-paint-fcp-optimization)
   - [Largest Contentful Paint (LCP) Optimization](#3-largest-contentful-paint-lcp-optimization)
   - [Time to Interactive (TTI) Optimization](#4-time-to-interactive-tti-optimization)
6. [UI Speed Optimization](#ui-speed-optimization)
   - [Animation Performance](#animation-performance)
   - [Main Thread Optimization](#main-thread-optimization)
7. [Implementation Roadmap](#implementation-roadmap)
8. [Key Takeaways](#key-takeaways)

---

Welcome to our deep dive into web performance! Today we'll explore what it truly means to build fast web applications - knowledge that's invaluable whether you're preparing for system design interviews or enhancing your development skills.

## What Web Performance Really Means

Let's start with a fundamental question: when we say "web performance," what exactly do we mean?

Consider this scenario: an application takes 5 minutes to load but works incredibly fast afterward. Can we call it performant? I'd argue no. But here's the twist - the opposite is equally problematic. If an application loads quickly but runs slowly, we can't call it performant either.

![Intro](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_174329_www.youtube.com.jpeg?updatedAt=1753029324597)

This brings us to a crucial understanding: **web performance has two distinct dimensions:**

- **Loading Speed**: How fast the application loads initially
- **Runtime Performance**: How fast the application works after loading

Only when both aspects are optimized can we truly say our application is fully performant. While ideally we'd optimize both with unlimited resources, software development is about balancing trade-offs. We need to understand when each becomes more critical.

## When to Prioritize Loading Time

### Critical Scenarios for Loading Speed

**Competitive Markets**
When operating in highly competitive environments, you simply cannot afford to be slower than competitors. Users have extremely low patience - if your site takes too long, they'll easily find replacements.

**Mobile Users and Poor Connections**
Mobile users often deal with poor networks, making slow loading exponentially worse. With mobile traffic dominating web usage, this optimization isn't optional.

**Conversion Rate Dependencies**
When your revenue directly correlates with loading speed, this becomes mission-critical. This is especially true for impulse purchase scenarios in e-commerce.

**High Traffic Volume**
With millions of users, even small percentages matter enormously. 3% user loss isn't significant with 1,000 users, but becomes serious with millions.

### Real-World Impact Data

![Impact](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_174447_www.youtube.com.jpeg?updatedAt=1753029324644)

The business impact is measurable and significant:

- **Amazon**: 100ms delay = 1% drop in sales
- **Google**: 53% of mobile users abandon sites taking >3 seconds
- **Walmart**: 1-second improvement = 2% conversion increase

### When Loading Speed Is Less Critical

**Service-Based Applications**
Users choose services based on features, not loading speed. If your service solves their problem, they'll tolerate slightly longer loads.

**Higher-End Device Targeting**
When building for users with mid-level+ devices (like video editors), you can skip optimizations for low-end devices.

**B2B Applications**
Business users typically have better devices and are more tolerant of complex applications that take time to load, especially when the value proposition is clear.

**Important Note**: Deprioritizing doesn't mean ignoring - loading time must still be "good enough."

## When to Prioritize UI Speed

### Critical Scenarios for UI Responsiveness

**Task-Oriented Applications**
Applications like Google Sheets or Figma require smooth interfaces because users perform thousands of interactions during normal workflows. While users might tolerate slow initial loading, they won't accept sluggish performance during active use.

**Long Session Times**
The importance of UI smoothness increases dramatically with session length. Short sessions don't waste much time with minor delays, but long sessions (like 10 minutes to several hours in Figma) magnify every small lag into significant frustration.

**Revenue Dependencies in Different Contexts**
Here's an interesting distinction:

- **E-commerce sites**: Revenue depends on loading speed (capture users quickly)
- **B2B applications**: Revenue depends on UI speed (employee productivity impacts client profits)

### Real-World Examples

![Example Amazon](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_174417_www.youtube.com.jpeg?updatedAt=1753029324707)

**Amazon** avoids heavy animations to ensure interface consistency across all devices and network conditions. Function over form because users want to complete transactions quickly.

![Figma Example](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_174522_www.youtube.com.jpeg?updatedAt=1753029324654)

**Figma** prioritizes UI speed over loading time. It's task-oriented, complex, involves many interactions, and serves primarily B2B users willing to wait for initial load because they understand the value.

## Performance Optimization Strategy

### Key Assessment Questions

Before optimizing, honestly evaluate your application:

1. **Session Length**: Short (Amazon-style) vs. Long (Figma-style)
2. **Market Competition**: How competitive is your space?
3. **Revenue Correlation**: Does speed directly affect revenue?
4. **Device Usage**: Primarily mobile or desktop?
5. **Workflow Impact**: Does UI speed affect user productivity?

### SPA vs MPA Considerations

**Single Page Applications (SPAs)**

- ✅ Benefits: Smoother UI, no page refreshes
- ❌ Downsides: Loading time, TTI, and SEO challenges
- 🛠️ Solution: Code splitting and lazy loading

**Multi-Page Applications (MPAs)**

- ✅ Benefits: Better initial loading metrics
- ❌ Downsides: Less smooth navigation

## Loading Time Optimization Deep Dive

### Understanding Core Metrics

![Core Metrics](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_174640_www.youtube.com.jpeg?updatedAt=1753029324658)

Google Lighthouse provides these benchmarks for optimization:

- **Time to First Byte (TTFB)**: < 200ms
- **First Contentful Paint (FCP)**: < 1.8 seconds
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **Time to Interactive (TTI)**: < 3.8 seconds

### 1. Time to First Byte (TTFB) Optimization

#### Content Delivery Networks: The Foundation

![CDN](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_174823_www.youtube.com.jpeg?updatedAt=1753029322580)

CDNs are probably your highest-impact optimization. They work by caching resources geographically closer to users, eliminating the need for requests to travel to your origin server.

**Why CDNs Matter**: No matter how optimized your setup, you can't bypass the speed of light. Reducing physical distance between users and content is the most effective way to improve delivery speed.

**Advanced CDN Features:**

- **Automatic Compression**: Reduces file sizes before delivery
- **Image Optimization**: Converts formats and resolutions based on device/network
- **Minification**: Optimizes CSS/JavaScript on the fly
- **Smart Caching**: Optimizes cache hit ratios across edge servers

![CDN Coverage](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_175334_www.youtube.com.jpeg?updatedAt=1753029322609)

**CDN Challenges:**

- **Cost**: Can become expensive, especially with advanced features
- **Geographic Coverage**: May lack presence in key user regions
- **Security**: Additional attack vectors and privacy concerns (GDPR compliance)

#### Caching Strategy

![Caching Strategy](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_175521_www.youtube.com.jpeg?updatedAt=1753029322650)

| Content Type         | Cache Strategy | TTL        | Reasoning                           |
| -------------------- | -------------- | ---------- | ----------------------------------- |
| **Public Resources** | ✅ Always      | Variable   | No user-specific data               |
| **Static Assets**    | ✅ Always      | Long       | Images, CSS, JS change infrequently |
| **Dynamic Content**  | ⚠️ Maybe       | Short (5s) | API responses during high traffic   |
| **Private Data**     | ❌ Never       | N/A        | Security risk                       |

![Cache Hit](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_175539_www.youtube.com.jpeg?updatedAt=1753029322538)

**Cache Hit Ratio Goals:**

- Static sites: 95-99%
- Dynamic sites: Lower, but optimize aggressively

**Improving Cache Performance:**

- Normalize query parameters effectively
- Minimize unnecessary cookies
- Use appropriate TTL for different content types
- Implement cache busting for updated assets

#### Server-Side Optimizations

![Optimize DNS](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_175625_www.youtube.com.jpeg?updatedAt=1753029322540)

Beyond CDNs, optimize your origin server:

- **Database**: Add indexes for frequent queries, batch operations
- **Caching**: Use Redis/Memcached for heavy queries and API responses
- **Auto-scaling**: Dynamic resource allocation (AWS, Kubernetes)
- **DNS**: Prefetch critical domains
- **Compression**: Gzip (universal) + Brotli (better performance)
- **HTTP Overhead**: Remove unnecessary headers, optimize cookie usage

### 2. First Contentful Paint (FCP) Optimization

#### The PRPL Pattern

![PRPL](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_18316_www.youtube.com.jpeg?updatedAt=1753029327235)

This strategy follows **Preload, Render, Precache, Lazy Load**:

**Preload Critical Resources**
Target resources not detected by the browser's preload scanner:

- Lazy-loaded images
- CSS background images
- Critical CSS and fonts
- @font-face definitions

**Above-the-Fold Priority**
Focus on content visible without scrolling. Load everything needed for this section first, defer everything else.

![Above the fold content](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_18259_www.youtube.com.jpeg?updatedAt=1753029327124)

**Render Optimization**

- **Above-the-fold**: Inline critical CSS/JavaScript
- **Full page**: Consider server-side rendering (SSR, static generation, hydration)

**Cache Resources in Service Workers Cache**

![Service Worker](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_175713_www.youtube.com.jpeg?updatedAt=1753029322560)

**Precaching Strategies**

| Cache Type            | Use Case         | Strategy            | Persistence   |
| --------------------- | ---------------- | ------------------- | ------------- |
| **Browser Cache**     | Static assets    | Automatic, long TTL | Until cleared |
| **JavaScript Memory** | State management | Session-based       | Page reload   |
| **Service Workers**   | Offline support  | Custom logic        | Configurable  |

**Lazy Loading Implementation**
Apply strategically to:

- **Images/Videos**: Load when near viewport
- **Code**: Dynamic imports by route/feature
- **Libraries**: Load when needed (text editors, etc.)
- **Data**: Pagination and on-demand fetching

**Lazy Loading Cautions:**

- Never lazy load above-the-fold content
- Handle quick scrolling with Intersection Observer
- Consider SEO impact for critical content

### 3. Largest Contentful Paint (LCP) Optimization

#### Modern Media Formats

![Image Optimization](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_175639_www.youtube.com.jpeg?updatedAt=1753029322607)

**Image Optimization:**

| Format       | Best For                 | Compression | Browser Support |
| ------------ | ------------------------ | ----------- | --------------- |
| **AVIF**     | Complex photos, high-res | Excellent   | Modern browsers |
| **WebP**     | Graphics, logos          | Good        | Wide support    |
| **JPEG/PNG** | Fallbacks                | Standard    | Universal       |

**Video Optimization:**

- **AV1**: Best compression, ideal for 4K/8K streaming
- **VP9**: Good compression, YouTube standard
- **WebM**: Container format, widely supported

**Selection Criteria:**

- Compression efficiency vs. quality retention
- Encode/decode speed for your use case
- Browser support requirements
- CDN processing capabilities

#### Font Optimization

![FOUT](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_181321_www.youtube.com.jpeg?updatedAt=1753029327376)

Fonts block rendering to prevent Flash of Unstyled Text (FOUT), so optimization is crucial:

- **Modern Formats**: Use WOFF2 for smaller sizes and better performance
- **Caching**: Browser cache + local storage for persistence
- **Loading Strategy**: Consider font-display properties

#### JavaScript Optimization

![Tree Shaking](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_181336_www.youtube.com.jpeg?updatedAt=1753029329160)

**Tree Shaking**: Remove unused code during build

- Requires ES6 modules (statically analyzable)
- Mark side-effect-free modules appropriately
- Target common sources: large libraries, default imports

![Code Splitting](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_181355_www.youtube.com.jpeg?updatedAt=1753029329160)

**Code Splitting**: Divide bundles into smaller chunks

- Especially important for SPAs
- Split by routes, features, or dependencies
- Load only what's needed initially

### 4. Time to Interactive (TTI) Optimization

#### Breaking Down Long Tasks

![Event Loop](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_18147_www.youtube.com.jpeg?updatedAt=1753029329273)

Long-running JavaScript blocks the main thread, making pages unresponsive. Since JavaScript is single-threaded, the main thread can only handle one operation at a time.

![Web workers](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_182058_www.youtube.com.jpeg?updatedAt=1753029329231)

**Solutions:**

- **Web Workers**: Separate thread for heavy computations
- **Server Delegation**: Move expensive operations backend
- **Task Chunking**: Split work using setTimeout/requestAnimationFrame

#### Web Workers Implementation

```javascript
// Main thread sends task
worker.postMessage({ data: heavyComputationData });

// Worker processes and returns result
worker.onmessage = function (e) {
  // Handle result without blocking main thread
  updateUI(e.data.result);
};
```

**When to Use**: Only for resource-intensive computations, not ordinary operations.

#### Server-Side Processing

Move computations server-side when:

- Data processing, filtering, searching large datasets
- Heavy calculations and aggregations
- Machine learning and AI tasks

**Trade-offs**: Higher server costs vs. better client performance

#### Predictive Prefetching

Tools like Guess.js analyze user behavior to predict and preload resources users are likely to need next, eliminating guesswork in optimization.

## UI Speed Optimization

### Animation Performance

#### GPU Acceleration Principles

The key to smooth animations is leveraging the GPU effectively:

**Prefer CSS over JavaScript animations** to avoid main thread blocking
**Use GPU-friendly properties**: `transform` and `opacity`
**Avoid layout triggers**: Properties like `width`, `height`, `margin`

#### Browser Rendering Pipeline

![Rendering pipeline](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_182211_www.youtube.com.jpeg?updatedAt=1753029329220)

Understanding the rendering pipeline helps optimize effectively:

1. **JavaScript**: Dynamic style changes
2. **Style**: CSS rule calculation
3. **Layout**: Geometry computation (expensive)
4. **Paint**: Visual styling (moderate cost)
5. **Composite**: Layer merging (cheapest)

**Performance Hierarchy:**

- 🥇 **Best**: Composite-only (transform, opacity)
- 🥈 **Good**: Paint + Composite
- 🥉 **Expensive**: Layout + Paint + Composite

#### Composition Layers

**Manual Layer Promotion** with `will-change`:

```css
.animated-element {
  will-change: transform; /* Creates layer in advance */
}
```

**Use Cases:**

- Animation delays due to layer promotion time
- Dynamic property changes (hover effects)
- Overlapping element conflicts

**Cautions:**

- Each layer consumes GPU memory
- Too many layers hurt low-end device performance
- Remove `will-change` after animations complete

#### Animation Best Practices Checklist

- ✅ **Minimize**: Fewer effects = better performance
- ✅ **Composition layer**: Use when possible
- ⚠️ **Avoid layout**: Most expensive operation
- 🎛️ **User controls**: Let users disable animations
- 🔧 **Tools**: Use CSS Triggers to check impact
- 🧪 **Test**: Cross-browser compatibility

### Main Thread Optimization

#### Computational Strategies

**Heavy Computation Solutions:**

1. **Web Workers**: Separate thread for intensive tasks
2. **Backend Delegation**: Server-side processing
3. **Task Chunking**: Break work into smaller pieces

**Task Chunking Example:**

```javascript
function processLargeDataset(data) {
  const chunkSize = 1000;
  let index = 0;

  function processChunk() {
    const chunk = data.slice(index, index + chunkSize);
    // Process chunk
    index += chunkSize;

    if (index < data.length) {
      setTimeout(processChunk, 0); // Next chunk in new event loop
    }
  }

  processChunk();
}
```

**Timing Functions:**

- **setTimeout**: General task splitting
- **requestAnimationFrame**: Animation-related work
- **requestIdleCallback**: Low-priority tasks during browser idle time

#### DOM Manipulation Optimization

![Layout trashing](https://ik.imagekit.io/x2cofkp5v/Screenshot_20-7-2025_182254_www.youtube.com.jpeg?updatedAt=1753029329252)

**Layout Thrashing Prevention**

```javascript
// ❌ Bad: Causes layout thrashing
for (let i = 0; i < elements.length; i++) {
  elements[i].style.height = elements[i].offsetHeight + 10 + 'px';
}

// ✅ Good: Separate reads and writes
const heights = elements.map((el) => el.offsetHeight); // Read all
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px'; // Write all
});
```

**Optimization Principles:**

- Group multiple DOM changes into single updates
- Separate style reads from style writes
- Minimize repeated calculations in loops

## Implementation Roadmap

### High Impact, Low Effort

1. **CDN Implementation**: Biggest bang for buck
2. **Image Format Optimization**: Modern formats with fallbacks
3. **Basic Compression**: Gzip/Brotli setup

### Medium Impact, Medium Effort

1. **Code Splitting**: Reduce initial bundle size
2. **Lazy Loading**: Strategic resource loading
3. **Font Optimization**: WOFF2 and caching strategies

### High Impact, High Effort

1. **Advanced SSR**: Server-side rendering optimization
2. **Sophisticated Caching**: Multi-layer caching strategies
3. **Predictive Prefetching**: Behavior-based optimization

## Key Takeaways

**Remember the Two Dimensions**: Loading speed AND runtime performance both matter. Context determines priority.

**Measure First**: Use Google Lighthouse to establish baselines before optimizing.

**Context-Driven Decisions**: E-commerce prioritizes loading; B2B tools prioritize UI speed.

**Progressive Enhancement**: Start with high-impact, low-effort optimizations before tackling complex implementations.

**User-Centric Approach**: Every optimization should improve actual user experience, not just metrics.

The goal isn't perfect metrics - it's creating web applications that feel fast, responsive, and delightful for your specific users. Understanding these principles will help you make informed decisions about where to invest your optimization efforts for maximum impact.
