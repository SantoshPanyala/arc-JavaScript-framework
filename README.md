<img width="100%" alt="Arc.js Poster" src="https://github.com/user-attachments/assets/a5756fbd-c4ec-4a9a-aaf4-da1ce17f16f5">


# Arc.js
A lightweight and unified JavaScript framework for building modern web applications, designed for performance and simplicity.



## 🚀 Quick Start

Get a simple, interactive counter running in minutes.

1.  **Create an `index.html` file:**
    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Arc.js App</title>
      </head>
      <body>
        <div id="app"></div>
        <script type="module" src="/main.js"></script>
      </body>
    </html>
    ```

2.  **Create a `main.js` file:**
    ```javascript
    import { h, render, useState } from '@santosh459/arc-js';

    /**
     * A simple counter component.
     */
    function Counter() {
      // Use the useState hook to give our component state
      const [count, setCount] = useState(0);

      // Return the UI description using the 'h' function
      return h(
        'div',
        { class: 'counter-container' },
        h('h1', null, `Count: ${count}`),
        h(
          'button',
          { onClick: () => setCount(count + 1) },
          'Increment'
        )
      );
    }

    // Get the root container from the DOM
    const container = document.getElementById('app');

    // Render our component into the container
    render(Counter, container);
    ```

---

## Core Concepts

### The `h` function
The `h` function (short for hyperscript) creates a virtual blueprint of an HTML element. It doesn't create a real DOM element but rather a JavaScript object that describes what the real element should look like.
`h(type, props, ...children)`

### Components
Components in Arc.js are just JavaScript functions that return a UI blueprint created by the `h` function. They can be simple and stateless or have their own internal state.
```javascript
// A simple, stateless component
const Welcome = (props) => h('h1', null, `Hello, ${props.name}`);
````

### State with `useState`

The `useState` hook lets you add state to a component. It returns an array with the current state value and a function to update it. Calling the update function will automatically trigger a re-render of the component.
`const [state, setState] = useState(initialValue);`

### Side Effects with `useEffect`

The `useEffect` hook lets you perform side effects, such as fetching data or adding event listeners. By providing an empty dependency array `[]`, the effect will run only once when the component first mounts.
`useEffect(callback, dependencies);`

-----

## API Reference

* `h(type, props, ...children)`

    * Creates a virtual DOM node that describes an element. If `type` is a function, it will render it as a component.

* `render(Component, container)`

    * Renders a component into a DOM container and initializes the framework.

* `useState(initialState)`

    * A hook that adds local state to a component and returns `[state, setState]`.

* `useEffect(callback, dependencies)`

    * A hook for running side effects after a component renders.

-----

## Installation

Add Arc.js to your project using npm:

```bash
npm install @santosh459/arc-js
```

```
```