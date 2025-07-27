// src/main.js

import { createElement, render } from './arc.js';
import { Counter } from './counter.js';

// 1. Define the UI by calling the Counter component.
const app = createElement(Counter);

// 2. Get the container element.
const container = document.getElementById('app');

// 3. Render the UI.
render(Counter, container);