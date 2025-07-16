---
title: 'Frontend Architecture Patterns'
description: 'Comprehensive guide to frontend architecture patterns including MVC, MVP, and modern client-side patterns'
thumbnail: '/materials/frontend-architecture-patterns/mvc.png'
videoId: 'https://www.youtube.com/watch?v=ixee55xm_d8&feature=youtu.be'
videoTitle: 'Frontend Architecture Patterns: From MVC to Modern Patterns'
duration: '1:12:45'
publishedAt: '2024-01-20'
tags: ['Architecture', 'Frontend', 'MVC', 'MVP', 'Patterns']
difficulty: 'Advanced'
resources:
  [
    {
      type: 'slides',
      title: 'Slides',
      link: 'https://drive.google.com/file/d/1J3dkH-x5clvjFN6ejQwFFhRSdwPnfkBV/view?usp=sharing',
    },
    {
      type: 'audio',
      'Podcast (AI generated)',
      link: 'https://notebooklm.google.com/notebook/aacea2b8-5b25-4d1b-a2e8-96f31665fa38/audio',
    },
  ]
---

## Introduction to High-Level Architecture

When developers hear the word **architecture**, many immediately think about **files and directories**. While that's part of it, **it's not the main idea**. Architecture isn't just about **how your files are structured**—it's about **how different layers of your app interact with each other**.

You might've heard of **MVC (Model-View-Controller)**, which was a common pattern in the past. Even though it's not as widely used in modern frontend apps, the concept still helps us understand **how different parts of an application communicate**.

Here's an important distinction: **Your architecture can dictate how your files are structured, but it doesn't have to.** For example, even if you **put every single file into one folder** (which nobody on your team will like), you'd still have **an architecture**—as long as your **components interact in a structured way**.

## Why Do We Need Architecture?

Architecture serves several critical purposes:

**Flexibility** – It allows different parts of the app to be **modified or replaced** without affecting everything else. While you might not often replace React with Vue or Vue with Svelte, **flexibility** isn't just about swapping frameworks—it's about **having clear boundaries between components** to make application maintenance easier.

**Testability** – Individual layers are easier to test when they're properly separated.

**Scalability** – As an app **grows**, clear separation of concerns helps **manage complexity**. A **tiny app** might not need much structure, but a **large, enterprise-level app** requires thinking about scalability from day one.

## Factors Affecting Architecture Importance

The importance of **architecture** depends on three key factors:

**Project Size** – Bigger apps require **more structure** to stay maintainable.

**Team Size** – The more people working on the project, the **more critical architecture becomes**. Even in a **2-3 person team**, having **some structure** is beneficial. But in a **team of 10-15 developers**? Good architecture is essential.

**Project Lifetime** – For short-lived MVPs (Minimum Viable Products), we can prioritize speed over structure, but long-term projects need **solid architecture** to prevent **technical debt**.

**Important Note**: Architecture often **slows down initial development**—but in the long run, it **makes scaling and feature development much faster**.

## MVC (Model-View-Controller)

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/mvc.png){width="600"}

MVC has been around for **over 36 years**. While not commonly used in modern frontend applications, it contains **fundamental concepts** that help us understand more complex patterns.

### MVC Components

MVC breaks an app into **three main layers**:

**Model** – Represents the **application data and business logic**. This layer is usually represented by **backend, database, and API**.

**View** – Responsible for **displaying data**. This is the **UI**—what the user actually sees on the screen. It can also include **UI logic**, like opening a modal window.

**Controller** – Acts as a **bridge** between Model and View. It **handles user input**, updates the Model, and tells the View what to display.

### MVC Workflow

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/mvc-2.png){width="600"}

Here's how MVC works in practice:

1. **User Input** – User clicks a button, types something, or performs any interaction
2. **View captures the input & passes it to the Controller** – The View doesn't process the event—it forwards it to the Controller
3. **Controller processes the input & interacts with the Model** – The Controller decides what to do with the input and sends requests to the Model if needed
4. **Model updates the data** – The Model processes the request and modifies data accordingly
5. **View gets updated** – Both the Controller and Model can update the View using either:
   - **Observer Pattern** – The View "subscribes" to updates from the Model
   - **Flow Synchronization** – The View explicitly asks the Model for updates
6. **User sees the updated UI** – Changes are reflected in the interface

### Real-World Example

Consider a user clicking **"Like"** on a post:

- The **View** captures the event and sends it to the **Controller**
- The **Controller** updates the **Model** (increments the like count in the database)
- The **Model** sends the updated like count back to the **View**
- The **View** updates the UI to show the new like count

### Frontend-Only MVC

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/mvc-4.png){width="600"}

MVC doesn't require a backend server. You can have **pure frontend MVC** where:

- **Model** is your **state management system** (Redux, Vuex, or Pinia)
- **View** is your **React, Vue, or Svelte components**
- **Controller** is debatable—some say we don't have a Controller in modern frontend apps because the View directly updates the Model, while others argue that **hooks, composables, or middleware** act as Controller-like layers

### Full-Stack MVC

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/mvc-5.png){width="600"}

In full-stack applications:

- **View** → Frontend UI (React, Vue, Angular)
- **Controller** → API layer handling client-server communication
- **Model** → Backend containing business logic and database

### Hierarchical MVC

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/hmvc.png){width="600"}

For large applications, instead of one massive MVC structure, we **break it down into smaller, independent MVC units**. Each **feature, module, or page** has its **own MVC structure**. For example:

- Redux store split into multiple slices for different features
- React or Vue pages with their own state, logic, and utilities

## Thin vs. Thick Clients

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/thin-thick-clients.png){width="600"}

This distinction **defines how much processing happens on the client-side** versus the server-side.

### Thin Client

A **thin client** keeps most processing on the server, while the client only handles UI and user interactions. This is common in traditional multi-page applications (MPAs) and static websites. Think of simple HTML websites or traditional web apps that reload every time you click a button.

### Thick Client

A **thick client** performs significant logic on the client-side, reducing server workload. This approach is common in SPAs (Single Page Applications) and desktop-like web apps like Google Docs. Most interactions don't require full-page reloads—they're handled instantly on the client-side, sometimes even offline.

### MVC with Different Client Types

**Thin Client + Backend**:

- Client (View) renders data and sends actions to Controller
- Controller (API) bridges client and backend
- Model (Backend) handles all business logic and data processing
- **Pros**: Simpler, lightweight frontend
- **Cons**: Every interaction depends on server, slower response times

**Thick Client + Backend**:

- Client (View) manages state, handles logic, can store data offline
- Controller API still acts as bridge
- Backend (Model) is lighter because frontend takes more responsibilities
- **Pros**: Faster on powerful devices, better UX, offline capability
- **Cons**: Heavier client-side, potential performance issues

### Client-Side MVC

With thick clients, we can implement MVC entirely on the client-side:

- **Model** → State management system (Redux, Vuex, Pinia)
- **View** → UI components (React, Vue)
- **Controller** → Hooks, composables, middlewares, or API calls

## MVC Limitations

### Advantages

- **Easy to understand** – Clear and logical pattern
- **Easy to develop and maintain** – Well-established approach

### Disadvantages

**Fat Controllers Problem** – Views don't handle events and push everything to Controllers, creating bloated Controllers that do too much.

**Blurry boundaries between Model & Controller** – Sometimes unclear what belongs in Model vs. Controller.

**Complex View Layer** – Views handle events and observe state changes, making them more than pure UI layers, which complicates testing and maintenance.

**Outdated for Modern Apps** – MVC was introduced in 1979 for classic web applications with just presentation layers, not for modern, complex web applications with client-side logic and data storage.

### The Fat Controller Problem

Controllers become massive because they handle:

- Sending requests to servers
- Handling API responses
- Synchronization with backends (WebSockets for real-time updates)
- Managing client-side caching
- Many other responsibilities

This happens because **MVC was never designed for complex web applications**. In 1979:

- Client-side state management didn't exist
- SPAs weren't a thing
- Offline-first apps didn't exist

### When to Use MVC

**Good for**:

- Small to medium-sized web applications
- As a decent starting point when scalability isn't a big concern

**Not suitable for**:

- SPAs with complex state management
- Apps with heavy client-side logic
- Offline-first or local-first applications

## MVP (Model-View-Presenter)

MVP **evolved from MVC** to better fit modern web applications. The key difference: **the View doesn't communicate with the Model directly**. Everything **goes through the Presenter**.

### MVP vs. MVC

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/mvc-vs-mvp.png){width="600"}

In MVC, we had to **put observer logic into the View**, making it complex. MVP **solves this** by **moving this logic into the Presenter**. The View becomes a **pure UI layer**—nothing more.

This makes the system:

- **More predictable** – No circular dependencies
- **Easier to test** – View contains no logic
- **More structured** – Each layer has a clear role

### Two Types of MVP

**Supervising Controller**:

- View still handles some simple updates independently
- Only complex logic goes through the Presenter
- **Pros**: Less boilerplate, faster development
- **Cons**: View becomes harder to test and maintain
- **Suitable for**: Simple UI where View logic is minimal

**Passive View**:

- View is completely passive
- ALL logic is handled by the Presenter
- **Pros**: Clear boundaries, easier to test
- **Cons**: More code for basic tasks, potential overhead
- **Suitable for**: Applications with complex UI logic or when testability is crucial

### MVP Trade-offs

**Advantages**:

- **Better separation of concerns** – View is purely UI, Presenter handles logic
- **More testable** – View doesn't need to observe data updates

**Disadvantages**:

- **Fat Presenter problem** – Like Fat Controller in MVC, Presenter can become a "God Layer"
- **Not very expressive** – Doesn't define where to handle backend sync, client-side caching, etc.

## MVVM (Model-View-ViewModel)

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/mvvm.png){width="600"}

The main idea of MVVM is to **separate View Logic from Business Logic**.

### Understanding Business vs. View Logic

**Business Logic** – When we actually modify data:

- Changing a username
- Processing a payment
- Removing an item from a cart
- Anything that affects the application's real data

**View Logic** – Purely UI-related operations that don't modify real data:

- Opening or closing modal windows
- Disabling buttons when loading
- Updating progress bars while downloading
- Visual changes that don't affect core data

### Why MVVM Matters

Modern web apps are **insanely complex**. Think about Figma or Google Calendar—they're super interactive with tons of UI updates happening constantly. If we throw all this UI logic into the View layer like in MVC, things get messy fast. MVVM provides a better way to handle View logic.

### MVVM Structure

**View** → The UI, same as always
**ViewModel** → Handles **all UI-related logic**
**Model** → Handles **business logic and actual data**

The **ViewModel** is the new component that:

- Takes care of all UI logic
- Updates the View and interacts with the Model
- Keeps UI in sync with data

### Two-Way Data Binding

MVVM introduces **two-way binding**:

- When ViewModel changes (getting data from Model), View updates automatically
- When View changes, Model updates automatically
- This eliminates manual state synchronization

### Key MVVM Differences

- **ViewModel stores UI data** – Previous patterns didn't distinguish between business and UI data
- **View is isolated from Model** – ViewModel coordinates between them
- **Many Views can share one ViewModel** – But one View cannot have multiple ViewModels
- **ViewModel contains UI data and behavior** – But without any actual UI controls
- **Automatic synchronization** – When ViewModel detects View changes, it updates its state and modifies Model if needed

### MVVM Trade-offs

**Advantages**:

- **Clear layer separation** between UI logic and business logic
- **Scalability** – Easier to test, maintain, and scale

**Disadvantages**:

- **Steeper learning curve** – Can seem confusing initially
- **Inexpressiveness** – Doesn't define where to handle API requests or error handling

### When to Use MVVM

Best for applications with **complex UI logic that needs testing**:

- Lots of user interactions
- Forms with live validation
- Dynamic UI updates

**You probably don't need it** for simple static sites.

## Hierarchical MVC (HMVC)

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/hmvc-2.png){width="600"}

HMVC addresses MVC's **scalability problems**. It works great for small applications, but as apps grow, MVC starts to fall apart.

### The Scalability Problem

In traditional MVC, **one controller** starts handling too many things:

- Interacting with multiple models instead of one
- Processing data from multiple APIs, services, and backend sources
- Handling complex UI updates

**Results**:

- Code gets messy
- Testing becomes a nightmare
- Making changes takes forever

### HMVC Solution

**Hierarchical MVC** is an **extension of MVC** that fixes scalability issues. Instead of **one big MVC structure**, we **break it down into smaller, independent MVC blocks**. Each block handles a **specific feature** and interacts with other blocks **only through controllers**.

**Example**:

- **Users** feature gets its own MVC module
- **Dashboard** feature gets its own MVC module
- **Orders** feature gets its own MVC module
- Features communicate only via their controllers

This **decoupling** makes architecture **modular, reusable, and scalable**.

### HMVC in Practice

If you've worked with **Angular**, this should sound familiar. Angular has **feature modules**, which implement **HMVC** in frontend development. In large Angular apps, each feature (Users, Orders, Dashboard) gets its own **separate module** with components, services, and state management.

### HMVC Trade-offs

**Advantages**:

- **Modularity** – Applications broken into smaller modules encourage independent development, facilitate maintenance, improve testability, and set error boundaries
- **Code reusability** – Modular nature promotes code reuse

**Disadvantages**:

- **Steeper learning curve** – Harder to understand and develop
- **Potential inconsistency** – Each module can feel like its own "mini-application" with different coding standards, patterns, tools, or naming conventions

### When to Use HMVC

**Good for**:

- Large-scale applications with multiple independent features
- Systems where different teams own different project parts
- Frontend apps fetching data from multiple APIs and services

**Not recommended for**:

- Small or medium-sized apps

HMVC **takes traditional MVC and makes it scalable** by splitting it into **independent MVC blocks**. It's **great for large applications** but **overkill for small ones**.

## MVVM-C (Model-View-ViewModel-Coordinator)

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/mvvm-c.png){width="600"}

MVVM-C builds on **MVVM** by adding a **Coordinator** to **manage navigation and screen transitions**.

### Why Do We Need a Coordinator?

In MVVM, there's **no clear place** to handle navigation:

- **View** is just UI—shouldn't handle routing
- **Model** is just data—doesn't know UI exists
- **ViewModel** could do it, **but then it gets bloated with navigation logic**

### MVVM-C Solution

Instead of stuffing navigation logic into the ViewModel, we **move it into a separate Coordinator**. Whenever you need to navigate between screens, your **ViewModel doesn't handle it anymore**—the **Coordinator does**.

### MVVM-C Trade-offs

**Advantages**:

- **Separation of concerns** – Navigation logic completely separate from UI and business logic
- **Better testability** – Can unit test navigation logic independently

**Disadvantages**:

- **Increased complexity** – Adding another layer to architecture

### When to Use MVVM-C

Suitable for applications with **complex navigation scenarios**, like multi-step workflows (e.g., e-commerce checkout flow).

## VIPER (View-Interactor-Presenter-Entity-Router)

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/viper.png){width="600"}

VIPER offers even more structure by splitting logic into **five distinct layers**.

### VIPER Components

**View** – **Passive view** that displays UI and forwards user actions (no logic)
**Presenter** – Prepares data for view and ensures correct formatting
**Interactor** – Handles **business logic**—fetching and modifying data
**Entity** – **Raw data**—no logic, just structured information
**Router** – Manages **screen transitions** and **navigation**

### VIPER Communication Flow

- **View** only communicates with **Presenter**
- **Presenter** talks to **Interactor** and **Router**
- **Interactor** handles data from **Entity**
- **Router** handles navigation between screens

### VIPER Dependencies

**View** → depends on **Presenter**
**Presenter** → depends on **Interactor** and **Router**
**Interactor** → depends on **Entity**
**Entity** → depends on nothing

View changes most often, so other parts shouldn't depend on it. This creates a clean dependency hierarchy.

### VIPER Modularity

VIPER can separate:

- **Interactor** into multiple **Services** if needed
- **Entity** into modular **Entities** if needed

### Key VIPER Features

- **Designing applications based on use cases** – Build around use cases (services) that define core features
- **Clear place for APIs** – Interactor is responsible for fetching data
- **Navigation handling** – Router manages all navigation, like in MVVM-C

### VIPER Trade-offs

**Advantages**:

- **Better separation of concerns** – Each component has clear responsibility
- **Scales well** – Better suited for large projects or multiple developers working on different features

**Disadvantages**:

- **More boilerplate** – Requires writing many interfaces for classes with minimal responsibilities

### When to Use VIPER

VIPER is better suited for **complex, long-term applications**. For small applications, MV\* patterns are more suitable.

## Clean Architecture

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/clean-architecture.png){width="600"}

**Clean Architecture** comes from **Uncle Bob's book** and is a well-known approach for building maintainable systems.

### Clean Architecture Layers

The diagram shows **four main layers**:

1. **Entities** – **Core business logic**
2. **Use Cases** – **Application logic**
3. **Interface Adapters** – **Bridge between use cases and external systems**
4. **Frameworks & Drivers** – **Databases, UI frameworks, APIs, external services**

**Key Rule**: **Dependencies always point inward**. Inner layers don't know about outer layers, but outer layers depend on inner layers.

### Layer Details

**Entities** – **Pure business logic**:

- Don't care about UI, databases, or frameworks
- Only care about business rules (e.g., how transactions work, overdraft handling)
- **Independent** – don't rely on anything else in the system

**Use Cases** – Layer **above** entities:

- Define **specific actions** the app can perform
- **Orchestrate** business logic but don't handle UI or external services
- Example: "Get the last 100 transactions" processes data but doesn't store it

**Interface Adapters** – **Adapting data** between **use cases** and **frameworks**:

- Ensure data is formatted correctly before reaching UI or database
- Act as **translator** between different system parts

**Frameworks & Drivers** – Outer layer includes:

- **UI Frameworks** (React, Vue, Angular)
- **Databases** (PostgreSQL, MongoDB, Firebase)
- **External APIs**
- **Not essential** to core business logic—swappable without affecting inner layers

### Clean Architecture Principles

**Separation by dividing software into layers** – Entity and external interface layers are mandatory; others can be discarded if not needed. Additional layers can be added.

**The Dependency Rule** – Outer layers depend on inner layers, not vice versa. Nothing in an inner circle can know anything about something in an outer circle.

### Clean Architecture Applications

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/clean-architecture-2.png){width="600"}

**Full-Stack E-commerce Example**:

- **Entities**: `User`, `Ticket`, `Cart`
- **Use Cases**: `SearchTickets`, `AddToCart`, `Checkout`, `ProcessPayment`
- **Adapters**: Transmit data between backend API and frontend UI
- **Frameworks**: Web frameworks, third-party services, databases

**Offline-First App Example**:

- **Entities**: Local data models
- **Use Cases**: Data manipulation logic
- **Adapters**: Bridge between UI and IndexedDB
- **Frameworks**: Vue/React + IndexedDB API

**Pure UI Web App Example**:

- **Core logic**: All UI-based
- **Instead of database models**: View logic at center
- **Backend**: Just a framework—doesn't define core logic

### Clean Architecture Trade-offs

**Advantages**:

- **Highly testable** – Each layer can be tested individually
- **Database independent** – Application decoupled from database
- **UI independent** – UI framework is isolated

**Disadvantages**:

- **Higher barrier to entry** – Requires experienced & disciplined team
- **Increased complexity** – Can introduce significant complexity for smaller projects

## Hexagonal Architecture (Ports and Adapters)

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/hexagonal.png){width="600"}

Hexagonal Architecture makes **distributed development easier**. Teams in different locations can work on different parts independently using **integration tests and mocks**.

### Hexagonal Architecture Structure

- **Business Logic** at the center
- **Input and Output Ports**:
  - **Input Ports** for the **Driving Side**
  - **Output Ports** for the **Driven Side**

### Team Distribution Example

**Team B** (Backend Team):

- Responsible for **Business Logic** and **Ports**
- Builds logic without worrying about UI
- Defines **Ports**—entry points where other parts can connect, retrieve, or modify data

**Team A** (UI Team):

- Works on **Adapters** and UI
- Don't need to know how backend works internally
- Just know that **input ports exist** and use them for data exchange

### Web Application Implementation

**Driving Side (Left)**: User events, web sockets, server-sent events
**Driven Side (Right)**: User interface, client storage, local storage

The driving side **controls** the application, while the driven side is **controlled by** application logic.

### Contracts in Hexagonal Architecture

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/hexagonal-2.png){width="600"}

**Contracts** define **clear expectations** for interactions between **ports** and **adapters**. They can be enforced using:

- **Response Validators** (Zod, Joi, Yup)
- **Integration Tests**
- **TypeScript Types**
- **GraphQL Schemas**
- **OpenAPI Specifications**

**How contracts work**:

1. Client sends request to Input Port
2. Backend validates request body, query params, and structure
3. Client also has contract to ensure UI gets expected data
4. Prevents unexpected API changes and keeps frontend/backend in sync

### When to Use Hexagonal Architecture

**Good for**:

- **Full-stack applications with complex business logic** – Critical business rules that must remain isolated and testable
- **Multiple interfaces** – Apps interacting with REST APIs, GraphQL, CLI, or multiple UIs
- **Rich Web Applications** – Frontend with business logic or local-first apps

**Not recommended for**:

- **Simple Apps** – Overhead unnecessary for small projects
- **Small Teams or Projects** – May add too much complexity without clear benefits

### Clean vs. Hexagonal Architecture

**Clean Architecture**:

- **Newer** and evolved from Hexagonal Architecture
- Focuses on **layer separation within a single application**
- Separates concerns into **Entities, Use Cases, Controllers, and Infrastructure**

**Hexagonal Architecture**:

- **Older but still very effective**
- Best suited when system involves **multiple distributed parts**
- Focuses on **interactions between services and external interfaces**

If you have **multiple interfaces**, **Hexagonal Architecture makes more sense**. It's often **easier to understand** and gives **clear separation of concerns** without being overly rigid.

## Screaming Architecture

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/screaming.png){width="600"}

**Screaming Architecture** is not about how modules interact—it's about **how we should structure our code** and **name our entities**.

### Core Concept

Introduced by **Robert Martin**, the idea is that **the architecture of a software system should be immediately recognizable** just by looking at its **top-level structure**—package names, model names, and directories.

The architecture should **scream the intent and purpose of the application**. It should be **obvious** what the system does **without** digging into details.

### Screaming Architecture Principles

**Focus on Business Domain**:

- Structure codebase around **core business concepts**
- Use **domain-specific names** for models and features
- If building a **to-do list**, features should be named "Tasks" or "To-Do"
- If building **user management**, call it "Users", not "Controllers" or "Handlers"

**Organize by Features, Not Layers**:

- Each feature should contain everything it needs—logic, data handling, and UI components

**Hide Technical Details**:

- Things like **frameworks, databases, or APIs** should be **abstracted away**
- Keep them in **lower-level modules**, **not** on the top-level

### Immediate Recognition

When you open a project and glance at the **directory structure**, you should immediately know:

- **What this project is for**
- **What the main entities are**
- **How the business logic is organized**

A **good** top-level design should **tell the reader about the business, not technical details**.

### Architecture vs. File Organization

In System Design, we should focus on **architecture rather than file organization**. File organization can be changed easily at any stage, but **changing architecture**—once a project has grown—is **difficult, if not impossible**.

**Architecture** is a **tough, hard-to-reverse decision** because:

- As applications grow, codebases become massive
- Rewriting entire architecture is time-consuming and often not feasible
- The only realistic migration is usually rebuilding from scratch
- Companies rarely have budget for massive rewrites

**File structure and naming conventions** are **easily changeable**:

- Rename files, update imports, done
- Not a big deal to refactor structure

At project start, **choosing perfect architecture is nearly impossible** because you don't know what the application will evolve into. However, we should still try to choose at least a good enough architecture.

## Vertical Slices

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/vertical-slices.png){width="600"}

**Vertical slices** are probably **the most modern architecture style** and **one of the most widely used today**.

### Understanding Vertical Slices

To understand vertical slices, think back to **Clean Architecture**. Clean Architecture follows a **layered approach** where **each layer is a technical entity**. But here's the issue: **Clean Architecture tells us how to separate layers, but it doesn't tell us how to organize features within those layers**.

**Vertical slices solve this problem** by promoting a **feature-based approach**, where each feature is a business case.

### How Vertical Slices Work

Think of **vertical slices** as **internal structure for your architecture layers**.

In **Clean Architecture**, we have:

- **Entities**
- **Use Cases**
- **Controllers**
- **External Interfaces**

Instead of treating each as a separate layer covering the entire app, **we slice the application vertically** into **self-contained features**.

Each **slice** contains:

- **Its own Entity**
- **Its own Use Case**
- **Its own Controller**
- **Its own External Interface**

**Every feature is self-contained inside a slice**, making the architecture:

- **More modular**
- **Easier to scale**
- **More maintainable**

### Combining with Other Patterns

![Frontend-Architecture-Image](/materials/frontend-architecture-patterns/vertical-slices-vs-mvp.png){width="600"}

Vertical Slices can combine with other architecture patterns. For example, in an **MVP application** with three layers, we don't know how to internally structure them. **With vertical slices, we create one slice per feature**:

- **Create To-Do Slice**
- **Delete To-Do Slice**
- **Update To-Do Slice**

Each slice **internally follows MVP** architecture but remains **independent**.

### Vertical Slices Trade-offs

**Advantages**:

- **Better Code Organization** – Each feature is self-contained, making codebase modular and easy to manage
- **Easier for Multiple Teams** – Each slice is independent, so teams can work on different slices simultaneously

**Disadvantages**:

- **Potential for Overengineering** – Strictly following vertical slices everywhere, even for simple features, can lead to unnecessary complexity and extra boilerplate
- **Inconsistency Between Teams** – Different teams might structure things differently, leading to codebase inconsistencies

**Possible Solutions**:

- Use common design guides
- Enforce linting & formatting rules
- Rotate developers across teams

### When to Use Vertical Slices

**Good for**:

- **Large-Scale Applications** – Particularly beneficial with many distinct features, helping keep codebase organized by feature
- **Cross-Functional Teams** – Teams can take ownership of specific features from end to end, promoting better collaboration and quicker delivery

**Use something else for**:

- **Simple Applications** – Overhead unnecessary for simple full-stack applications or thin web clients
- **Small Teams or Projects** – Additional architectural complexity might not pay off

## Conclusion

### Pattern Coverage

While we explored several patterns, we didn't cover all of them. The goal was to focus on the most widely used ones like **MVC, MVP, and Clean Architecture**. There are likely **hundreds or even thousands** of patterns, and covering them all was never the intention.

We also introduced some **less common** frontend patterns like **VIPER**, traditionally used in mobile development. Frontend developers **regularly borrow** useful concepts from backend development—it's completely normal for ideas to migrate across different areas of software development.

### Why Frontend Architecture Matters

The topic of frontend architecture has been overshadowed for too long. Even though frontend **usually** doesn't have complex business logic, modern frontend applications **have become extremely complex**:

- **Local-first applications**
- **Offline support**
- **Highly interactive UIs**
- **State-heavy applications like Figma, Notion, or Google Docs**

The frontend **is no longer just rendering views**—it often **manages state, caching, data persistence, and even synchronization with backend services**.

### Adapting Patterns

**Patterns are not meant to be followed rigidly**. While each pattern has core concepts, we can and should adjust them to fit specific needs:

- **Add more layers** if necessary
- **Remove unnecessary layers** if they don't add value
- No two web applications are identical—every project differs in challenges that need solving

There's **no single "perfect" pattern** that works for every situation. Each application is unique, so we must tailor our architectural approach accordingly.

### Common Language

Using patterns provides a **common language** for developers. If you describe a system using terms like **Model, Controller, and View**, most developers will immediately understand what you mean—even if there are small differences in interpretation. That's one of the biggest advantages of using established patterns.

Remember: **Architecture is about making your application maintainable, scalable, and understandable**—not about following patterns perfectly, but about choosing the right approach for your specific situation.

**Need Help?** Contact me at [hey@dimazhiganov.dev](mailto:hey@dimazhiganov.dev)

_Happy coding!_ 🚀
