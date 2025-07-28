// src/main.js

import { render, createElement } from './lib/arc.js';
import { Router, Link } from './lib/router.js';
import { TodoListApp } from './todo.js';

// --- Page Components ---

function HomePage() {
    return createElement('div', null,
        createElement(Link, { to: '/about' }, 'Go to About Page'),
        createElement('hr'),
        createElement(TodoListApp) // Use the ToDo list component here
    );
}

function AboutPage() {
    return createElement('div', null,
        createElement('h1', null, 'About Page'),
        createElement(Link, { to: '/' }, 'Go back Home')
    );
}

function NotFoundPage() {
    return createElement('div', null,
        createElement('h1', null, '404 - Not Found')
    );
}

// --- Route Definitions ---
const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '*', component: NotFoundPage }
];

const App = () => createElement(Router, { routes });

const container = document.getElementById('app');
render(App, container);