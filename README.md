<img width="100%" alt="Arc.js Poster" src="https://github.com/user-attachments/assets/a5756fbd-c4ec-4a9a-aaf4-da1ce17f16f5">


# Arc.js
A lightweight and unified JavaScript framework for building modern web applications, designed for performance and simplicity.

---

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