---
layout: ebomb
title: Easily Mock Static/Final Objects
---

A common refrain amongst new to intermediate TDD practitioners is that they can't mock out static or final classes. And a class that's final AND static? Forget it! Unfortunately many API's use static and final liberally for reasons I can't usually fathom. This leads to code that looks like:

public sealed class ClientWebSocket : WebSocket

What are you trying to test?
  - Don't know how to use it?
  - Parameters in? (because they change)
  - Reaction to return value (because you do things differently)

You don't need a trick




