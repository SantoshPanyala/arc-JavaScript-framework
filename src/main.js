// src/main.js

import { render, h } from './lib/arc.js';
import { Router, Link } from './lib/router.js';
import { TodoListApp } from './todo.js';

// --- Page Components ---

function HomePage() {
    return h('div', null,
        h(Link, { to: '/about' }, 'Go to About Page'),
        h('hr'),
        h(TodoListApp) // Use the ToDo list component here
    );
}

function AboutPage() {
    return h('div', null,
        h('h1', null, 'About Page'),
        h(Link, { to: '/' }, 'Go back Home')
    );
}

function NotFoundPage() {
    return h('div', null,
        h('h1', null, '404 - Not Found')
    );
}

// --- Route Definitions ---
const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '*', component: NotFoundPage }
];

const App = () => h(Router, { routes });

const container = document.getElementById('app');
render(App, container);