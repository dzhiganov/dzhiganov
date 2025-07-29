<template>
  <section id="projects" class="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
    <div class="max-w-6xl">
      <h2 class="section-heading">
        <span class="text-accent  text-xl">02.</span>
        Featured Projects
      </h2>
      
      <!-- Projects Grid -->
      <div class="mt-16 space-y-8">
        <div 
          v-for="(project, index) in featuredProjects" 
          :key="index"
          class="relative bg-black rounded-3xl overflow-hidden min-h-[400px] flex"
        >
          <!-- Left Content -->
          <div class="flex-1 p-12 flex flex-col justify-center">
            <h3 class="text-white text-5xl font-bold mb-6 leading-tight">
              {{ project.title }}
            </h3>
            <p class="text-gray-300 text-xl mb-8 leading-relaxed max-w-lg">
              {{ project.description }}
            </p>
            
            <button class="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center w-fit">
              View Project
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </div>
          
          <!-- Right side - Code + Person -->
          <div class="flex-1 relative">
            <!-- Code Editor Background -->
            <div class="absolute inset-0 bg-gray-900/80">
              <!-- Code Editor Header -->
              <div class="flex items-center justify-between p-4 border-b border-gray-700/50">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div class="text-gray-400 text-sm ">{{ project.filename }}</div>
              </div>
              
              <!-- Code Content -->
              <div class="p-6  text-sm leading-relaxed">
                <div class="space-y-1">
                  <div v-for="(line, lineIndex) in project.codeLines" :key="lineIndex" class="flex">
                    <span class="text-gray-500 w-8 text-right mr-4">{{ lineIndex + 1 }}</span>
                    <span v-html="line" class="flex-1"></span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Person Placeholder -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-64 h-80 bg-gray-600 rounded-lg flex items-center justify-center">
                <div class="text-center text-gray-300">
                  <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <p class="text-sm">Person Image</p>
                  <p class="text-xs">Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- View All Projects -->
      <div class="text-center mt-16">
        <a 
          href="#" 
          class="inline-flex items-center border border-accent text-accent px-7 py-4 rounded-xl  hover:bg-accent/10 transition-all duration-300"
        >
          View All Projects
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const featuredProjects = [
  {
    title: 'AI coding Beyond basics',
    description: 'The ultimate Vibe Coding Guideline to bring ideas to production',
    filename: 'test-mcp.py',
    codeLines: [
      '<span class="text-blue-400">from</span> <span class="text-white">mcp.server.fastmcp</span> <span class="text-blue-400">import</span> <span class="text-white">FastMCP</span>',
      '',
      '<span class="text-gray-500"># Create an MCP server</span>',
      '<span class="text-white">mcp</span> = <span class="text-yellow-400">FastMCP</span>(<span class="text-green-400">"My MCP Server"</span>)',
      '',
      '<span class="text-purple-400">@mcp.tool</span>()',
      '<span class="text-blue-400">def</span> <span class="text-yellow-400">calculate_bmi</span>(<span class="text-white">weight_kg: float, height_m: float</span>):',
      '    <span class="text-green-400">"""Calculate BMI given weight in kg and height in meters"""</span>',
      '',
      '    <span class="text-white">Args:</span>',
      '        <span class="text-white">weight_kg (float): Weight in kilograms</span>',
      '        <span class="text-white">height_m (float): Height in meters</span>',
      '',
      '    <span class="text-white">Returns:</span>',
      '        <span class="text-white">float: Body Mass Index (BMI) value</span>',
      '    <span class="text-green-400">"""</span>',
      '    <span class="text-blue-400">return</span> <span class="text-white">weight_kg / (height_m ** 2)</span>',
      '',
      '<span class="text-purple-400">@mcp.resource</span>(<span class="text-green-400">"users://{user_id}"</span>)',
      '<span class="text-blue-400">def</span> <span class="text-yellow-400">get_user_profile</span>(<span class="text-white">user_id: str</span>):',
      '    <span class="text-green-400">"""Get user profile data"""</span>',
      '    <span class="text-blue-400">return</span> <span class="text-white">f</span><span class="text-green-400">"User {user_id} profile data"</span>'
    ]
  },
  {
    title: 'DevFlow Community',
    description: 'The ultimate Stack Overflow clone built with Next.js 14',
    filename: 'devflow.tsx',
    codeLines: [
      '<span class="text-blue-400">import</span> <span class="text-white">{ NextRequest, NextResponse }</span> <span class="text-blue-400">from</span> <span class="text-green-400">"next/server"</span>',
      '<span class="text-blue-400">import</span> <span class="text-white">{ connectToDatabase }</span> <span class="text-blue-400">from</span> <span class="text-green-400">"@/lib/mongoose"</span>',
      '',
      '<span class="text-gray-500">// Create an API endpoint</span>',
      '<span class="text-blue-400">export</span> <span class="text-blue-400">async</span> <span class="text-blue-400">function</span> <span class="text-yellow-400">POST</span>(<span class="text-white">request: NextRequest</span>) {',
      '  <span class="text-blue-400">try</span> {',
      '    <span class="text-blue-400">const</span> <span class="text-white">body</span> = <span class="text-blue-400">await</span> <span class="text-white">request.json()</span>',
      '    <span class="text-blue-400">const</span> <span class="text-white">{ title, content, tags }</span> = <span class="text-white">body</span>',
      '',
      '    <span class="text-gray-500">// Connect to database</span>',
      '    <span class="text-blue-400">await</span> <span class="text-yellow-400">connectToDatabase</span>()',
      '',
      '    <span class="text-blue-400">return</span> <span class="text-yellow-400">NextResponse</span>.<span class="text-yellow-400">json</span>({',
      '      <span class="text-white">success:</span> <span class="text-orange-400">true</span>,',
      '      <span class="text-white">message:</span> <span class="text-green-400">"Question created successfully"</span>',
      '    })',
      '  } <span class="text-blue-400">catch</span> (<span class="text-white">error</span>) {',
      '    <span class="text-blue-400">return</span> <span class="text-yellow-400">NextResponse</span>.<span class="text-yellow-400">json</span>({',
      '      <span class="text-white">error:</span> <span class="text-green-400">"Failed to create question"</span>',
      '    }, { <span class="text-white">status:</span> <span class="text-orange-400">500</span> })'
    ]
  },
  {
    title: 'SaaS Landing Builder',
    description: 'A powerful drag-and-drop landing page builder for modern SaaS',
    filename: 'builder.tsx',
    codeLines: [
      '<span class="text-blue-400">import</span> <span class="text-white">React</span> <span class="text-blue-400">from</span> <span class="text-green-400">"react"</span>',
      '<span class="text-blue-400">import</span> <span class="text-white">{ motion }</span> <span class="text-blue-400">from</span> <span class="text-green-400">"framer-motion"</span>',
      '<span class="text-blue-400">import</span> <span class="text-white">{ DragDropContext }</span> <span class="text-blue-400">from</span> <span class="text-green-400">"react-beautiful-dnd"</span>',
      '',
      '<span class="text-blue-400">interface</span> <span class="text-yellow-400">BuilderProps</span> {',
      '  <span class="text-white">components:</span> <span class="text-yellow-400">Component</span>[]',
      '  <span class="text-white">onDrop:</span> (<span class="text-white">result:</span> <span class="text-yellow-400">DropResult</span>) => <span class="text-blue-400">void</span>',
      '}',
      '',
      '<span class="text-blue-400">export</span> <span class="text-blue-400">const</span> <span class="text-yellow-400">PageBuilder</span>: <span class="text-yellow-400">React.FC</span>&lt;<span class="text-yellow-400">BuilderProps</span>&gt; = ({',
      '  <span class="text-white">components,</span>',
      '  <span class="text-white">onDrop</span>',
      '}) => {',
      '  <span class="text-blue-400">return</span> (',
      '    &lt;<span class="text-red-400">DragDropContext</span> <span class="text-blue-400">onDragEnd</span>={<span class="text-white">onDrop</span>}&gt;',
      '      &lt;<span class="text-red-400">motion.div</span>',
      '        <span class="text-blue-400">className</span>=<span class="text-green-400">"builder-canvas"</span>',
      '        <span class="text-blue-400">initial</span>={{ <span class="text-white">opacity:</span> <span class="text-orange-400">0</span> }}',
      '        <span class="text-blue-400">animate</span>={{ <span class="text-white">opacity:</span> <span class="text-orange-400">1</span> }}'
    ]
  }
]
</script>