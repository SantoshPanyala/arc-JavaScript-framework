**Arc.js 🚀**

A lightweight JavaScript framework for building modern web applications, built from scratch.

**Core Philosophy**
Arc.js is designed for early-stage startups that need a unified and performant tool to build their public website, internal dashboard, and design system with a single, simple component model.

**Features**
Virtual DOM: In-memory representation of the UI for efficient updates.

**Component-Based:** Build your UI from reusable, functional components.

**State Management:** Includes a useState hook for managing local component state.

**Reconciliation:** An efficient "diffing" algorithm minimizes direct DOM manipulation for maximum performance.

**Getting Started**
Here is a simple example of a counter component built with Arc.js.

`main.js`

JavaScript

import { render } from './arc.js';
import { Counter } from './counter.js';

const container = document.getElementById('app');
render(Counter, container);
counter.js

JavaScript

import { createElement, useState } from './arc.js';

export function Counter() {
const [count, setCount] = useState(0);

    return createElement(
        'div',
        { class: 'counter-container' },
        createElement('h1', null, 'Counter'),
        createElement('p', null, `The count is: ${count}`),
        createElement(
            'button',
            { onClick: () => setCount(count + 1) },
            'Increment'
        )
    );
}
API Reference
render(Component, container): Renders a root component into a DOM container.

createElement(type, props, ...children): Creates a virtual DOM node.

useState(initialState): A hook to add state to a functional component. Returns [value, setValueFn].

Notebook LLM Notes (Phase 2 Summary)
This is your private documentation to solidify your learning.

Arc.js - Phase 2 Learnings: The Interactive Engine
Core Problem Solved
This phase was about transforming our static renderer into a dynamic engine that can react to user input and manage data.

Key Concepts Implemented
Components: We shifted from defining our UI in one block to using functions (Counter.js) that return a VDOM tree. This makes our code modular and reusable.

State (useState): We created a useState hook.

Purpose: To give components a "memory."

Mechanism: It uses a global array (hooks) to store state between renders. The setState function it returns not only updates the value but, crucially, triggers the _reRender function.

Reconciliation (diff): This was the most complex part.

Purpose: To avoid demolishing and rebuilding the entire DOM on every change.

Mechanism: Our diff function compares the oldVTree to the newVTree. It recursively walks the tree, and instead of rebuilding, it makes minimal, targeted changes (e.g., replaceChild, setAttribute, textContent).

Critical Bugs & Lessons Learned
The null vs. undefined Bug: Changing our check from oldVTree == null to oldVTree === undefined broke the initial render. Lesson: == null is a specific, intentional way to check for both null and undefined and is a rare exception to the "always use ===" rule.

The Text Node Bug: The diff function crashed trying to find .children on a string. Lesson: An algorithm must account for all data types it might encounter. We fixed this by adding a specific check for text nodes.

The firstChild Bug: Our diff function kept updating the wrong elements because it always used parentNode.firstChild. Lesson: A recursive DOM function needs a reliable way to target the correct node at each level. We fixed this by passing the index to our diff function to select the right parentNode.childNodes[index].