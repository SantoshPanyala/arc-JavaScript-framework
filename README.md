<img width="100%" alt="Arc.js Poster" src="https://github.com/user-attachments/assets/a5756fbd-c4ec-4a9a-aaf4-da1ce17f16f5">


# Arc.js 🚀

A lightweight JavaScript framework for building modern, multi-page web applications, built from scratch to understand the core principles of frontend development.

## Core Philosophy

Arc.js is designed as a foundational learning tool that is powerful enough for early-stage startups. It provides a unified and performant way to build a public website, an internal dashboard, or a design system using a single, simple component model.

## Key Features

* **Virtual DOM:** In-memory representation of the UI for efficient updates.
* **Component-Based Architecture:** Build your UI from reusable, functional components.
* **State Management:** Includes a `useState` hook for managing local component state.
* **Side Effect Management:** Includes a `useEffect` hook to manage side effects like API calls or subscriptions.
* **Efficient Reconciliation:** A "diffing" algorithm minimizes direct DOM manipulation for maximum performance.
* **Client-Side Routing:** A hash-based router for building multi-page applications.

## Installation

```bash
npm install @santosh459/arc-js
```

## Usage Example

Multi-Page App with State
Here is how you can build a simple multi-page application with a To-Do list on the home page. page.

**`main.js`**
```javascript
import { render, createElement } from '@santosh459/arc-js';
import { Router, Link } from '@santosh459/arc-js/router'; // Assuming router is exported
import { TodoListApp } from './components/todo.js';

// Page Components
function HomePage() {
    return createElement('div', null,
        createElement(Link, { to: '/about' }, 'Go to About Page'),
        createElement('hr'),
        createElement(TodoListApp)
    );
}

function AboutPage() {
    return createElement('div', null,
        createElement('h1', null, 'About Page'),
        createElement(Link, { to: '/' }, 'Go back Home')
    );
}

// Route Definitions
const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
];

const App = () => createElement(Router, { routes });
const container = document.getElementById('app');
render(App, container);
```

// Fetching Data with useEffect
import { createElement, useState, useEffect } from '@santosh459/arc-js';

function PostViewer() {
const [post, setPost] = useState(null);

    useEffect(() => {
        // Fetch data from an API when the component mounts
        fetch('[https://jsonplaceholder.typicode.com/posts/1](https://jsonplaceholder.typicode.com/posts/1)')
            .then(response => response.json())
            .then(data => setPost(data));
    }, []); // Empty dependency array means this runs only once

    if (!post) {
        return createElement('p', null, 'Loading post...');
    }

    return createElement(
        'div',
        { class: 'post' },
        createElement('h2', null, post.title),
        createElement('p', null, post.body)
    );
}

## API Reference

* `render(Component, container)`: Renders a root component into a DOM container.
* `createElement(type, props, ...children)`: Creates a virtual DOM node.
* `useState(initialState)`: A hook to add state to a functional component.
* `useEffect(callback, dependencies)`: A hook to perform side effects. The effect only re-runs if a value in the dependencies array changes.
* `Link(props)`: A component for client-side navigation. Requires a `to` prop.
* `Router(props)`: A component that takes a routes array prop to render pages.
* `Link(props)`: A component for client-side navigation. Requires a to prop.

## License

MIT
--

## How to Publish the Update to NPM

Follow these steps to publish the new version of your package.

### 1. Update the Version Number

Since you added a new feature (`useEffect`), you should update the minor version according to semantic versioning.

* Open your **`package.json`** file.
* Change the version from `"1.0.1"` to **`"1.1.0"`**.

```json
// package.json
{
  "name": "@santosh459/arc-js",
  "private": false,
  "version": "1.1.0", 
  // ... rest of the file
}