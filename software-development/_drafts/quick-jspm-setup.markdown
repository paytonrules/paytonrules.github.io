---
layout: ebomb
title: Easy ES6 Project Setup
---

This blog is gonna be written a little bit backwards. We're gonna start with quick setting up a bare-bones no-framework ES6 JavaScript app using JSPM. Then we'll go into how it works and the motivation. If you want to skip ahead you can follow the links.

* [Project Setup](#setup)
* [Working With This Setup](#working)
  * [How does it work?](#bash)
  * [Where Do Things Go](#where)
  * [Installing New Dependencies](#dependencies)
  * [Bundling](#bundling)
* [Motiviation](#motivation)
  * [How about React/Angular2/Karma?](#frameworks)
  * [Why Bash?](#bash)
* [Owning your tools](#ownyourtools)

## Setting Up Your Project

To setup a JSPM projects with tests (using Jasmine) can be a pretty difficult process. Global modules like Jasmine that rely on script tags take a lot of tweaking and playing with to get working. Fortunately I've worked it out for you.

**Clone project-skeletons off of github.**

The project skeletons app is a project of mine that's meant to make it easy to create common project setups. Currently it only supports JSPM.

```bash
git clone git@github.com:paytonrules/project-skeletons.git
```

Note this project requires bash and sed. I have not tried it on Windows with cygwin/git bash, but would love to hear about anybody who tries.

**Run the setup program.**

From anywhere you can run:

```bash
[skeletons-directory]/create-app jspm [project-dir]
```

Where the `skeletons-directory` is where you cloned project-skeletons, and the `project-dir` is where your new project is going to be. So for instance:

```bash
./project-skeletons/create-app jspm ~/Projects/my-awesome-project
```

The program will ask you a couple questions about your new program. Then it's gonna install some node dependencies (sadly) and some JSPM dependencies. It does require the internet.

**Verify Your Program**

Change to your new directory and run a couple tasks to verify everything is working.

```bash
npm start
```

This should start a browser-sync server at port 3000, and launch the browser.

![The App](/images/plane_jane_javascript.jpg)

If you were able to see that screen you've got the app running. The app is running on browser-sync, which means that as you change files the website will update itself. Now let's run the tests.

```bash
npm test
```

You should see one failing test, so you know where to start. If this failed the most common problem is that PhantomJS failed to install. If this is the case please log an issue at To run your tests continuously you can use testem.

```bash
npm run testem
```

_insert screenshot_

### Working Within The Skeleton












In my examples for the _Real World Guide_ I've been using JavaScript, mostly a mix and match of ES6 and ES5 features because it's a language I expect most readers will have encountered in their professional careers. Like it or not it's the language of the Web, and the Web is the platform of an enormous amount of software written today.

That code is mostly ES5 because that's what you're likely to see in the wild. Messy ES5. It's not what you should be using today on new projects.

# Using ES6 Today

I'll try not to spend too much time convincing you to use ES6. What is ES6? It's the latest version of the JavaScript language as specified by the Ecma standards committee. It's not another language like CoffeeScript, but the evolution of the JavaScript language. In fact Ecma is planning on updating JavaScript (or ECMAScript) every single year. ES6 has features like:

* Intuitive Lexical Scoping
* Actual Modules
* Enhanced Object Literals

You can see all the features [here](https://babeljs.io/docs/learn-es2015/) and if you need future convincing to get upgraded you can look at the fabulous blog [here](http://developer.telerik.com/featured/choose-es6-modules-today/).

If you're using


