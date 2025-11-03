---
title: 'Real-Time Updates'
description: 'Comprehensive guide to real-time updates covering short polling, long polling, server-sent events, and WebSockets for building responsive web applications'
thumbnail: '/materials/real-time/main.png'
videoId: 'https://www.youtube.com/watch?v=8Uyka3fzXek&t=647s'
videoTitle: 'Real-Time Updates'
duration: '1:08:26'
publishedAt: '2025-11-02'
tags:
  [
    'Performance',
    'Web Development',
    'REST',
    'Web-sockets',
    'Real-time',
    'JavaScript',
    'Frontend',
  ]
difficulty: 'Intermediate'
resources:
  [
    {
      type: 'slides',
      title: 'Slides',
      link: 'https://drive.google.com/file/d/1iTMiC--AM_k4xIm_WQ75e06_gwdDl-u4/view?usp=sharing',
    },
    {
      type: 'audio',
      title: 'Podcast (AI generated)',
      link: 'https://drive.google.com/file/d/1dRF_NMv13iW1JHklx3zOUDjphwHYKRTt/view?usp=sharing',
    },
  ]
---

![Real-Time Updates in System Design - Title slide with introduction](https://ik.imagekit.io/x2cofkp5v/Real-Time%20Updates.001.jpeg?updatedAt=1762097449816)

# Real-Time Updates in System Design: Building Blocks Series

## Table of Contents

1. [What Are Real-Time Updates?](#what-are-real-time-updates)
   - [Where Do We Need Real-Time Updates?](#where-do-we-need-real-time-updates)
2. [Fundamental Concepts](#fundamental-concepts)
   - [Pull vs Push Strategies](#pull-vs-push-strategies)
   - [What is Comet?](#what-is-comet)
3. [Why This Discussion Matters](#why-this-discussion-matters)
   - [The Reality is More Complex](#the-reality-is-more-complex)
   - [Real-World Examples](#real-world-examples)
   - [Interview Perspective](#interview-perspective)
4. [The Four Approaches](#the-four-approaches)
5. [Short Polling](#1-short-polling)
   - [Advantages](#advantages)
   - [The Serious Trade-off](#the-serious-trade-off)
   - [The Problem of Useless Requests](#the-problem-of-useless-requests)
   - [When Short Polling is Useful](#when-short-polling-is-useful)
   - [When to Avoid Short Polling](#when-to-avoid-short-polling)
   - [Scaling Considerations](#scaling-considerations)
6. [Long Polling](#2-long-polling)
   - [Advantages](#advantages-1)
   - [Trade-offs](#trade-offs)
   - [When Long Polling is Useful](#when-long-polling-is-useful)
   - [Why Choose Long Polling Over Server-Sent Events?](#why-choose-long-polling-over-server-sent-events)
   - [When to Avoid Long Polling](#when-to-avoid-long-polling)
   - [The Reconnection Delay Problem](#the-reconnection-delay-problem)
   - [Scaling Long Polling](#scaling-long-polling)
7. [Server-Sent Events](#3-server-sent-events)
   - [Advantages](#advantages-2)
   - [Disadvantages](#disadvantages)
   - [When to Use Server-Sent Events](#when-to-use-server-sent-events)
   - [When NOT to Use Server-Sent Events](#when-not-to-use-server-sent-events)
   - [Decision Schema](#decision-schema)
   - [Real-World Applications](#real-world-applications)
8. [WebSockets](#4-websockets)
   - [Advantages](#advantages-3)
   - [Disadvantages](#disadvantages-1)
   - [When to Use WebSockets](#when-to-use-websockets)
   - [When to Avoid WebSockets](#when-to-avoid-websockets)
   - [Applications Well-Suited for WebSockets](#applications-well-suited-for-websockets)
   - [WebSocket Efficiency](#websocket-efficiency)
   - [Implementation Complexity](#implementation-complexity)
     - [Scaling Challenges](#scaling-challenges)
     - [Sharing Updates Between Servers](#sharing-updates-between-servers)
     - [HTTP vs WebSocket Protocol](#http-vs-websocket-protocol)
     - [Infrastructure Issues](#infrastructure-issues)
     - [Authentication Challenges](#authentication-challenges)
   - [WebSocket Recommendations](#websocket-recommendations)
9. [Summary](#summary)
   - [Short Polling](#short-polling-summary)
   - [Long Polling](#long-polling-summary)
   - [Server-Sent Events](#server-sent-events-summary)
   - [WebSockets](#websockets-summary)
10. [Final Thoughts](#final-thoughts)

---

## What Are Real-Time Updates?

Before we begin, let's clarify what real-time updates mean and when we need them. Real-time updates usually mean that we want to update the user interface in real time, near real-time, or sometimes periodically. As frontend developers, our goal is to update the user interface to display new data to the user.

### Where Do We Need Real-Time Updates?

Typical applications include:

- **Chat applications and messengers**
- **Online games**
- **Stock applications**
- **Collaborative tools** like Google Documents, Figma, and others

## Fundamental Concepts

### Pull vs Push Strategies

Before we begin, let's clarify a couple of important points. First, the difference between pull and push strategies—both strategies are needed for delivering updates:

- **Pull**: When the client requests updates from the server (e.g., short and long polling)
- **Push**: When the server sends messages to the client (e.g., server-sent events and WebSockets)

In simple words, push is when the server initiates the update, and pull is when the client is the initiator.

### What is Comet?

Comet is an umbrella term encompassing techniques and technologies that create a persistent HTTP connection to push messages from the server to the client. It includes long polling, server-sent events, and others.

## Why This Discussion Matters

You might think that everything about WebSockets and other techniques is already well known—why should we revisit them? I noticed that the major part of articles about real-time updates look very similar:

- "Short polling is very ineffective—just don't use it"
- "Long polling: use it if the browser doesn't support WebSockets"
- "Server-sent events aren't necessary if WebSockets exist"
- "WebSockets: it's progressive, it's fast—use them for real-time updates everywhere"

Based on numerous articles and tutorial videos, it's often challenging to understand why we need anything besides WebSockets if it's supported by the browser.

### The Reality is More Complex

WebSockets offer a bidirectional connection primarily designed for specific cases which we will explore later. It's not a one-size-fits-all solution. You may ask, "Okay, if it's a bidirectional channel, why can't I just use WebSockets every time when I need real-time updates?"

The answer is: yes, you can do it, but it may not always be the wisest choice. Designing web applications isn't just about efficiency—it involves trade-offs. We can't blindly choose WebSockets without considering the resources required for development and maintenance.

**A simple analogy**: Building a static one-page site in React is possible, but is it a good choice? I think no. The same principle applies here.

### Real-World Examples

Let's consider two examples that might provoke some thought:

1. **LinkedIn** utilizes server-sent events for instant messaging. Why don't they use WebSockets?
2. **Stack Overflow** uses WebSockets to update the interface in real-time for adding new posts in the feed. In such cases, we don't need a bidirectional connection—why not use server-sent events or polling?

### Interview Perspective

Why should this matter to us during interviews? If we have a requirement to implement real-time updates, we might choose WebSockets and simply cover such requirements. However, during an interview, what matters most is not what we choose but **why we make the choice and why we reject other options**.

The interviewer expects us to be knowledgeable about alternative options, potential trade-offs, and effective ways to navigate them. In other words, in my opinion, it's better to choose a solution the interviewer might disagree with but back it up with solid arguments and demonstrate extensive knowledge.

## The Four Approaches

Now we're ready to start. Let's look at the structure:

1. **Short Polling**
2. **Long Polling**
3. **Server-Sent Events**
4. **WebSockets**

At the end of the discussion, we will summarize everything together.

---

## 1. Short Polling

![Short Polling diagram showing client periodically requesting updates from server](<https://ik.imagekit.io/x2cofkp5v/Streaks%20(13).png?updatedAt=1762097937564>){width="300"}

Short polling is a process where the client periodically asks the server for updates—let's say every 5 seconds.

### Advantages

- **No additional work required on the server side**
- **Operates over HTTP**
- **Doesn't require a persistent connection**

### The Serious Trade-off

However, it has one very serious trade-off: **it can be an inefficient solution in many cases**.

Let's explore why it might be inefficient. Imagine we have frequent or random updates—sometimes they may occur every minute, other times every second. However, with short polling, we have a static interval (for example, every 5 seconds).

**How it works:**

1. The client sends a request to the server and receives updated data
2. Closes the connection and waits for 5 seconds
3. All updates during this period will be skipped

### The Problem of Useless Requests

The next problem with short polling is the occurrence of useless requests:

- We send a request to the server, but there are no updates
- We wait 5 seconds and try again
- We send another request, and again there are no updates
- That's two useless requests already, and it's just the beginning

With long polling or push approaches, we avoid making these useless requests. However, in short polling, there is a risk that a majority of the requests will be redundant as there are no data updates.

### When Short Polling is Useful

Despite these drawbacks, short polling can still be useful in some scenarios:

1. **No access to server code**: Such as using a backend from a third-party development team that might be deprecated or not support real-time updates by design. In such cases, we have no choice but to periodically poll the server for updates.

2. **Periodic updates**: When we simply want to update data periodically and don't need real-time updates. This is a relatively common business requirement when data is updated at known intervals (like every 5 minutes). Here, using a persistent connection might be inefficient, and short polling can be very effective.

3. **Simplest solution**: If we need the simplest, possibly temporary solution—for instance, if we lack developer resources or are unsure how a part of the app will evolve, we need the simplest and most cost-effective solution.

### When to Avoid Short Polling

We should definitely avoid using short polling when:

- **Real-time updates are necessary**: Short polling doesn't provide real-time updates. It might sometimes appear to do so if the request interval is short, but that would be coincidental.

- **Updates occur rarely or randomly**: In such cases, the majority of requests will be useless, making short polling highly inefficient.

### Scaling Considerations

![Short Polling scaling architecture with load balancer and multiple servers](<https://ik.imagekit.io/x2cofkp5v/Streaks%20(14).png?updatedAt=1762098103250>){width="600"}

When choosing a protocol for network communication, it's important to consider scaling. Scaling refers to a system, network, or process's ability to handle an increasing workload by adding resources.

**Types of scaling:**

- **Vertical scaling**: Add more resources like CPU and memory to a single machine
- **Horizontal scaling**: Add more servers to the server pool
- **Grid scaling**: Combines both approaches

**Load Balancer**: A key element in scaling is the load balancer—a system component responsible for distributing incoming traffic. Simply put, it decides which server should receive a request based on various factors such as server load.

**Scaling short polling**: Frankly, there are no unique problems for short polling in terms of scaling. Scaling is straightforward, aligning with short polling's simplicity.

**Example**: Assume we're developing a stock application that needs to update stocks every minute. What if the number of clients becomes too large? We can simply add more CPU and memory to the server (vertical scaling). But what if we reach the limit? We must switch to horizontal scaling.

The process works smoothly because data is typically stored in a database, ensuring all servers access the same information.

---

## 2. Long Polling

![Long Polling diagram showing client sending request and server holding connection until data is available](<https://ik.imagekit.io/x2cofkp5v/Streaks%20(15).png?updatedAt=1762098246835>){width="300"}

Long polling isn't a technology—it's just a technique. The client sends a request to the server as usual, but instead of returning it immediately, the server holds it. For how long? Until new data becomes available. Only then is the data sent to the client.

In practice, this simple tweak can significantly improve client-server communications.

### Advantages

1. **Much more resource efficient** compared to short polling, solving the problem of useless requests
2. **Nearly real-time updates** (why not completely real-time? There is a possible delay which we will look at later)

### Trade-offs

However, this approach has trade-offs:

1. **Requires persistent connection**, adding complexity
2. **Infrastructure issues**: Most infrastructure is configured for short-lived connections, so some proxy servers or other elements might unexpectedly interrupt the connection
3. **Additional backend work** is needed
4. **Horizontal scaling becomes more challenging**: If a client-server connection is established and the load balancer later decides to distribute the load to new servers, moving a long polling connection from one server to another isn't straightforward
5. **HTTP overhead**: Long polling operates over standard HTTP, inheriting all HTTP-related issues like overhead
6. **Not specifically designed for real-time updates**: As mentioned before, long polling is more of a hack than a dedicated technology
7. **Potential message loss**: What if an update occurs during reconnection? We might lose it. To avoid this, we would need to implement a message queue to preserve all updates

### When Long Polling is Useful

1. **Real-time updates for all browsers**: Long polling has the broadest browser support because under the hood it's just a simple XMLHttpRequest. Many WebSockets and server-sent events libraries use long polling as a fallback for older browsers.

2. **Supporting older browsers**: If we need to support older browsers, long polling is our only option.

3. **Infrequent server messages**: In most cases, server-sent events or WebSockets would be more efficient in terms of latency than long polling, but if updates aren't too frequent, the slight delay wouldn't be a problem.

Remember our initial discussion: we don't always need the perfect solution. Sometimes it's smarter to step back and keep the connection simple and cheap if it doesn't significantly impact performance.

### Why Choose Long Polling Over Server-Sent Events?

Long polling remains the easiest and simplest solution for real-time updates, offering the widest browser support. Additionally, it allows the use of HTTP headers, doesn't have issues with authentication, and lets developers interact with the server in a very familiar way. That's why long polling may sometimes be preferable over server-sent events.

### When to Avoid Long Polling

1. **Need for efficient bidirectional channel**: While a bidirectional connection can be emulated using long polling and standard HTTP requests, WebSockets are better for minimal latency.

2. **Infrastructure not suited for persistent connections**: For example, if updates from a third-party service come every 5 minutes, maintaining a constant connection for these updates is inefficient, making short polling a better option.

3. **HTTP overhead is an issue**: To minimize HTTP overhead, switching to server-sent events might be more suitable.

### The Reconnection Delay Problem

![Long Polling reconnection delay problem - update occurring during reconnection causing delays](<https://ik.imagekit.io/x2cofkp5v/Streaks%20(17).png?updatedAt=1762098246835>){width="600"}

Long polling may not update data in real-time, especially when data updates occur during the reconnection process. Remember that long polling is not a really persistent connection—it requires reconnection each time. While it's often perceived as persistent, these reconnections do occur and can cause delays.

**How it works:**

1. The client initiates a long polling connection with the server
2. When an update occurs, the server sends it to the client
3. But what if another update happens simultaneously? We can't immediately send the second update following the first one
4. We must reestablish the connection and only then can we send new data to the client

While such delay is usually not critical, it can be problematic if minimal latency is required.

### Scaling Long Polling

![Long Polling scaling architecture showing stateless and stateful server configurations](<https://ik.imagekit.io/x2cofkp5v/Streaks%20(16).png?updatedAt=1762098246835>){width="600"}

Scaling in the context of long polling is a more interesting challenge. Before we dive in, it's crucial to understand the difference between stateless and stateful server architectures:

- **Stateless architecture**: No data is stored on the server
- **Stateful architecture**: Some data is kept on the server

The advantage of stateless servers is flexibility—we can easily replace such a server, redirect its requests to another server, or perform other actions.

**The Problem**: Let's consider scaling in a stateful architecture. Suppose we're using long polling for a process like loading progress, which is maintained in the server's memory, not in the database. At some point, the server sends an update of the loading process to the client. The client updates the interface and sends a new request to the server. However, for some reason, the load balancer redirects this new request to a second server. The problem is that the second server doesn't know about the ongoing loading process.

**Solutions**:

1. **Sticky Sessions**: A technique that forces the load balancer to redirect requests to the same server based on the client ID. We maintain a map of clients and servers in the load balancer.

2. **Shared Storage**: By having an additional place to store data, we can render our server stateless.

**Which approach is better?**

**Sticky Sessions:**

- ✅ Easier to implement
- ❌ Can lead to uneven distribution of connections
- ❌ Data loss is still possible if the server goes down
- ❌ Suitable only for short-lived or non-critical data
- ❌ Presents vulnerability to targeted attacks

**Shared Storage:**

- ❌ More challenging to implement and maintain
- ✅ Does not affect load balancing
- ✅ Safer as data is stored in shared storage
- ✅ Perfect for long-lived or critical data

In summary, shared storage is more complex to set up but offers more reliable storage solutions.

**Why don't the same scaling problems affect short polling?** Short polling isn't typically used for real-time updates requiring stateful architecture. For example, in analytics applications, data would typically be updated in the database, not stored on the server. In contrast, long polling might be used for tracking real-time file uploads where a stateful architecture makes sense because data has a short-lived nature.

---

## 3. Server-Sent Events

![Server-Sent Events diagram showing persistent connection with server pushing updates to client](<https://ik.imagekit.io/x2cofkp5v/Streaks%20(18).png?updatedAt=1762098246835>){width="300"}

Server-sent events is an implementation of the Comet pattern where a client establishes a connection to a server, allowing the server to send messages directly to the client. Unlike short and long polling, server-sent events is a real technology, not just a hack.

It allows the server to initiate message sending to the client—it is a push technology, not polling, because the server is the initiator of the messages, not the client. This contrasts with previous methods where the client had to request updates.

### Advantages

1. **Real-time updates**: Unlike long polling, server-sent events establishes a true persistent connection, minimizing delay. There is no need to reconnect.

2. **Works well with infrastructure**: Server-sent events works well with most proxy servers and load balancers because it operates over plain HTTP.

3. **Lower HTTP overhead**: Relatively lower HTTP overhead compared to polling methods, averaging around 5 bytes versus 8 bytes for traditional polling.

4. **Built-in features**: Provides features like automatic reconnection, event names, and event IDs.

5. **HTTP/2 benefits**: If used over HTTP/2, server-sent events support multiplexing, allowing multiple connections over a single TCP connection and other HTTP/2 features.

6. **Battery optimization**: Connectionless pushes for battery saving on mobile devices.

7. **Easy fallback**: Easy to polyfill server-sent events for browsers which are not supported, thanks to operating over plain HTTP.

8. **Developer-friendly**: Provides a convenient and intuitive event-driven interface familiar to most frontend developers.

### Disadvantages

1. **Server complexity**: Persistent connection requires additional server-side work, more complex server implementation than polling.

2. **Browser support**: Less browser support than polling and WebSockets.

3. **Traffic efficiency**: Less efficient traffic consumption compared to WebSockets, which don't have HTTP overhead.

4. **CORS requirements**: Cross-domain connections need appropriate CORS settings.

5. **Connection limits**: Limited to six concurrent connections per browser below HTTP version 1; more connections require HTTP version 2 or higher.

### When to Use Server-Sent Events

Typical use cases for server-sent events are similar to those for long polling, as both technologies effectively do the same thing from a user perspective—updating data in real time.

**Use cases include:**

- When a **one-directional channel** for real-time updates is needed
- For **frequent server messages** where HTTP overhead with long polling might be an issue
- When **battery life concerns** exist, as server-sent events supports connectionless pushes, allowing mobile devices to economize battery life by entering sleep mode between messages

### When NOT to Use Server-Sent Events

1. **Bidirectional communication needs**: WebSockets might be a better choice because using server-sent events with HTTP requests to emulate two-way communication is less efficient.

2. **Very frequent server messages**: When HTTP overhead could become problematic, we may switch to WebSockets.

### Decision Schema

![Decision schema comparing long polling, server-sent events, and WebSockets by update frequency](<https://ik.imagekit.io/x2cofkp5v/Streaks%20(19).png?updatedAt=1762098246835>){width="400"}

Here's a simple schema to help decide which technology to use:

- **Long polling**: For low update frequency scenarios
- **Server-sent events**: For medium update frequency scenarios, offering better traffic efficiency
- **WebSockets**: For high update frequency scenarios (which we'll discuss later)

### Real-World Applications

Examples of real-world applications where server-sent events can be useful:

- **Real-time notifications** for news or social feeds
- **Live updates** for sport events, cryptocurrency prices, or real-time analytics
- **Progress updates** for long processes
- **Server statistics monitoring** like uptime, health, and running processes

These are just a few of the many possible applications for server-sent events.

---

## 4. WebSockets

![WebSockets diagram showing bidirectional communication channel between client and server](<https://ik.imagekit.io/x2cofkp5v/Streaks%20(20).png?updatedAt=1762098246835>){width="300"}

WebSocket is a bidirectional channel that enables communication in both directions: client to server and server to client. This feature makes WebSockets unique. Although we can emulate a bidirectional channel with long polling or server-sent events plus a standard HTTP request, WebSockets offer this functionality natively.

### Advantages

1. **Bidirectional channel**: WebSockets provide true bidirectional communication.

2. **Lower latency and reduced message overhead**: They operate on a protocol separate from HTTP.

3. **Better browser support**: Compared to server-sent events.

4. **Binary data transfer**: Supports binary data transfer, which reduces payload size compared to text-only methods. This also means we can transfer binary data such as media files.

5. **Cross-domain connections**: WebSockets can connect to servers from different domains without CORS requirements.

### Disadvantages

Despite these benefits, implementing WebSockets also has disadvantages:

1. **Implementation complexity**: More complex to implement and maintain than other methods.

2. **Protocol differences**: Runs on different protocols (ws and wss for secure WebSockets), potentially causing issues with some proxy servers, firewalls, and load balancers that only work with HTTP.

3. **Missing HTTP features**: Lacks support for HTTP features like multiplexing.

4. **Browser support**: Browser support is not as high as for polling methods.

5. **Scaling complexity**: Horizontal scaling involves additional complexities.

### When to Use WebSockets

1. **Bidirectional channel requirement**: If an application really needs such a connection, WebSockets should be a good choice.

2. **Maximum efficiency**: As we saw in previous sections, even if bidirectional communication isn't necessary, WebSockets can be implemented to achieve lower latency and reduced overhead.

### When to Avoid WebSockets

1. **Neither bidirectional communication nor high-speed updates are critical**: In many cases where updates are infrequent or the application doesn't require active client-to-server messaging and fast data transmission, WebSockets may introduce unnecessary complexity. Server-sent events or long polling might provide a simpler, more maintainable solution.

2. **Infrastructure not ready**: If existing infrastructure isn't ready to handle the WebSocket protocol, downgrading to server-sent events plus HTTP requests might be more feasible.

3. **Need HTTP/2 features**: When specific features of HTTP/2 or server-sent events are required. WebSockets don't operate over HTTP; therefore, they don't have the benefits of HTTP/2.

4. **Risks not understood**: It's important to remember that WebSockets use a different protocol, which might lead to unpredictable challenges as most IT infrastructure is designed to work with HTTP.

### Applications Well-Suited for WebSockets

Here's a list of applications where the use of WebSockets might be very useful:

- **Collaborative tools** like Google Docs or Figma
- **Multiplayer games**
- **Chat applications**
- **Trading applications** and financial platforms requiring real-time price updates

What's common between these applications? They require real-time interactions between users where minimal latency is crucial. In such cases, it's not just about subscribing users to updates but also allowing them to actively send messages to the server. Applications where users need to both receive and actively send messages are well-suited for WebSockets.

> **Note (Nov 2025)**: For multiple real-time update use cases, [Web Transport](https://www.youtube.com/watch?v=ReV31oGX6oo&t=40s) should work better than WebSockets in terms of efficiency and performance. However, browser support is not yet mature enough for production use. Keep an eye on this emerging standard as it gains wider adoption.

**Use cases**: Bidirectional communications
**Example apps**: Collaborative tools like Google Docs or Figma, multiplayer games, chat applications
**Key advantages**: Highly efficient in network traffic, minimal delay
**Key disadvantages**: Operates over the WebSocket protocol, potentially causing infrastructure compatibility issues, lacks HTTP/2 core features like multiplexing

### WebSocket Efficiency

![WebSocket efficiency comparison - overhead comparison between long polling and WebSockets](<https://ik.imagekit.io/x2cofkp5v/Streaks%20(21).png?updatedAt=1762098246835>){width="600"}

You have likely heard that WebSockets are very efficient, but what does that mean? WebSockets provide minimal overhead, especially when compared to polling methods. However, it's crucial to consider trade-offs.

While the visual difference between long polling and WebSockets may seem significant, in reality, if messages are infrequent, this might not be a big problem. In contrast, in scenarios like multiplayer games where interactions are highly frequent and intensive, even the smallest overhead can be critical.

### Implementation Complexity

We often mention that implementing WebSockets is complex, but what does this mean in practical terms?

#### Scaling Challenges

![WebSockets scaling challenges - load distribution and server reconnection scenario](<https://ik.imagekit.io/x2cofkp5v/Streaks%20(22).png?updatedAt=1762098246835>){width="600"}

One major challenge with WebSockets is scaling. Before diving in, I should mention that server-sent events and long polling face similar scaling issues. However, long polling inherently includes reconnection, and server-sent events also allow automatic reconnection if the connection drops. In contrast, **with WebSockets, reconnection logic must be manually implemented**.

**The scaling scenario:**

1. A client establishes a connection with a server
2. Another client also connects to the same server
3. As server load increases, the cloud provider decides to distribute the load between two servers
4. To do that, we have no choice but to drop the connection with one server and establish it with another

**Important aspect**: WebSocket connections aren't maintained through the load balancer—they are used only for establishing the initial connection. Afterward, the client and WebSocket server maintain a direct connection. When reconnection is necessary, it must go through the load balancer again.

#### Sharing Updates Between Servers

![Pub/Sub pattern for sharing updates between multiple servers](<https://ik.imagekit.io/x2cofkp5v/Streaks%20(23).png?updatedAt=1762098246835>){width="600"}

The next problem is that we need to share updates between servers. This challenge, previously discussed in the context of long polling, also applies to WebSockets and server-sent events when working with multiple servers. To solve such problems, we can implement a Pub/Sub pattern like we did before for long polling.

#### HTTP vs WebSocket Protocol

A more global problem with WebSockets is that they do not use HTTP. This might seem beneficial at first because it resolves the issue of HTTP overhead. However, separating from HTTP means missing out on many advantages of HTTP version 2 and higher, such as multiplexing.

With HTTP, one TCP connection can be reused for multiple HTTP connections, which is very important for handling multiple tabs. In contrast, WebSockets require opening a new TCP connection for each WebSocket connection, potentially leading to inefficiencies.

**Chat application example**: These apps usually offer group or shop chat features where we're receiving updates for each group in real time. We have two main options:

1. **Multiple WebSocket connections**: Maintaining multiple TCP connections. This approach is more reliable and easier to maintain because each group is independent. However, it can be highly inefficient.

2. **Single connection with additional information**: We add information to each message, allowing the reuse of a single WebSocket connection. However, this method is less reliable—if the single connection fails, the user will not receive any updates. Additionally, this adds overhead to each WebSocket message, which we initially tried to eliminate.

**Multiple tabs problem**: In scenarios with multiple tabs, each tab opens its own independent WebSocket connection and, as a result, its own TCP connection. In our chat example, each tab might open four TCP connections, leading to a total of eight TCP connections for two tabs.

**Solutions to reduce connections:**

1. **Switch to long polling or server-sent events**: HTTP version 2 supports multiplexing, allowing a single TCP connection to be shared across multiple connections.

2. **Use shared workers**: Can be shared across multiple tabs, therefore sharing the connection. However, shared workers have relatively limited browser support.

3. **Use broadcast channel**: Communicate between tabs by maintaining a WebSocket connection in only one tab and sharing data between tabs using the broadcast channel.

4. **Use browser storage**: Like session or local storage to share data between tabs. However, this requires a mechanism to subscribe the app to updates in these storages.

5. **Do nothing**: If independent TCP connections are preferred.

#### Infrastructure Issues

![WebSocket infrastructure compatibility with proxy servers and load balancers](<https://ik.imagekit.io/x2cofkp5v/Streaks%20(23).png?updatedAt=1762098246835>){width="600"}

The next potential problem with WebSockets relates to infrastructure. Many infrastructure components, such as proxy servers or load balancers, are not configured to work with WebSockets and may block or ignore this unfamiliar protocol.

**Solution**: Using encrypted WebSocket connections. Secure WebSocket connections are invisible to most proxy servers, preventing them from blocking the connection.

#### Authentication Challenges

Another issue with WebSockets is authentication. Cookie authentication isn't always suitable, and the WebSockets API doesn't allow setting the authorization header with a token. Therefore, there is no standard way to establish an authorized connection via WebSocket—a problem also faced by server-sent events.

**Authentication solutions:**

1. **Query parameters**: Send the access token in URL query parameters. The connection will be refused if the token is invalid. It's not the most secure approach but can be relatively safe if we use secure WebSocket connections, as request strings are encrypted in transmission. Unlike HTTP, WebSocket URLs aren't visible in the browser URL bar. However, server logs may still record the plain text request parameters.

2. **Short-lived tokens**: Involves a separate server responsible for issuing short-lived tokens. Before sending a request to the server, the client receives a short-lived token from the authentication server. Even if the token is intercepted, its short time of living makes it useless for malicious actors. The downside is the necessity for an additional service.

3. **First message authentication**: Send the authentication token with the first message via the WebSocket channel. The server then verifies this token and, if it's invalid, closes the connection. This method is more secure than the URL parameter approach and simpler than the short-lived token approach. However, this method is vulnerable to DoS attacks—the connection is established first, and only then is the authentication token checked.

4. **Cookies**: The simplest solution. Since a WebSocket connection begins with an HTTP handshake, cookies are a possible option. For this to work, the WebSocket server and the web application must be deployed on the same domain.

5. **SEC-WebSocket-Protocol header**: The initial HTTP request may include this header, which can be used to transmit a token. The downside is that it isn't designed for security like the authorization header, so it could potentially be read as plain text and logged by proxy servers.

### WebSocket Recommendations

If you choose to use WebSockets for real-time communications, consider these recommendations:

1. **Use frameworks** that offer multiple transport protocols with automatic fallback, such as Socket.IO, which defaults to long polling if WebSockets are unsupported.

2. **Always deploy over TLS**: Deploy your real-time backend over encrypted TLS connections, improving security and helping to bypass issues with proxies and load balancers.

3. **Prefer libraries**: Use a WebSocket framework or library to handle numerous edge cases.

4. **Don't use unconsciously**: Avoid using WebSockets unconsciously. They are well-suited for applications requiring ultra-fast, full-duplex communications like online games, but might not be necessary for every case.

---

## Summary

Let's summarize the key points of all the approaches that we discussed:

### Short Polling

- **Use cases**: Updates at fixed intervals (e.g., every 30 seconds or every 1 minute), suitable for non-real-time requirements
- **Example apps**: Analytics apps, stock applications
- **Key advantages**: Simplicity
- **Key disadvantages**: Inefficient in terms of network traffic, doesn't provide real-time updates

### Long Polling

- **Use cases**: Near real-time updates
- **Example apps**: Analytics apps, stock apps, social networks
- **Key advantages**: Operates over HTTP, benefiting from HTTP/2 features, broad browser support
- **Key disadvantages**: Potential delays between updates, HTTP overhead

### Server-Sent Events

- **Use cases**: Real-time updates
- **Example apps**: Analytics apps, stock apps, social networks, possibly chat applications
- **Key advantages**: HTTP-based, offers unique features such as reconnection, event IDs, connectionless pushes
- **Key disadvantages**: HTTP overhead

### WebSockets

- **Use cases**: Bidirectional communications, real-time applications requiring frequent, continuous updates
- **Example apps**: Collaborative tools like Google Docs or Figma, multiplayer games, chat applications, high-frequency trading platforms, live financial data feeds
- **Key advantages**: Highly efficient in network traffic, minimal delay, fastest data transmission method for real-time applications. WebSockets eliminate HTTP overhead and provide a direct persistent connection, making them ideal for scenarios with frequent updates where every millisecond matters, such as trading applications receiving stock price updates or cryptocurrency data feeds
- **Key disadvantages**: Operates over the WebSocket protocol, potentially causing infrastructure compatibility issues, lacks HTTP/2 core features like multiplexing

---

_This lecture is part of the System Design Building Blocks series. Each building block provides fundamental knowledge that can be combined to design complex systems effectively._
