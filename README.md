# Arc.js 🚀

A lightweight JavaScript framework for building modern, multi-page web applications, built from scratch to understand the core principles of frontend development.

## Core Philosophy

Arc.js is designed as a foundational learning tool that is powerful enough for early-stage startups. It provides a unified and performant way to build a public website, an internal dashboard, or a design system using a single, simple component model.

## Key Features

* **Virtual DOM:** In-memory representation of the UI for efficient updates.
* **Component-Based Architecture:** Build your UI from reusable, functional components.
* **State Management:** Includes a `useState` hook for managing local component state.
* **Efficient Reconciliation:** A "diffing" algorithm minimizes direct DOM manipulation for maximum performance.
* **Client-Side Routing:** A hash-based router for building multi-page applications.

## Installation

```bash
npm install @santosh459/arc-js
```

## Usage Example

Here is how you can build a simple multi-page application with a To-Do list on the home page.

**`main.js`**
```javascript
import { render, createElement } from '@your-username/arc-js';
import { Router, Link } from '@your-username/arc-js/router'; // Assuming router is exported
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

## API Reference

* `render(Component, container)`: Renders a root component into a DOM container.
* `createElement(type, props, ...children)`: Creates a virtual DOM node.
* `useState(initialState)`: A hook to add state to a functional component.
* `Router(props)`: A component that takes a `routes` array prop to render pages.
* `Link(props)`: A component for client-side navigation. Requires a `to` prop.

## License

MIT