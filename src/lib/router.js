// src/lib/router.js

import { createElement, useState } from './arc.js';

// This is our main Router component
export function Router(props) {
    // Get the initial path from the URL hash, or default to the root '/'
    const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

    // This is how we listen for URL changes.
    // When the user clicks back/forward or on a hash link, this event fires.
    window.addEventListener('hashchange', () => {
        setCurrentPath(window.location.hash.slice(1) || '/');
    });

    // Find the component that matches the current path from the routes array
    const route = props.routes.find(r => r.path === currentPath);
    const ComponentToRender = route ? route.component : props.routes.find(r => r.path === '*').component;

    // --- ADD THIS LOG ---
    console.log('Router is trying to render path:', currentPath, 'with component:', ComponentToRender.name);

    // Render the matched component
    return createElement(ComponentToRender);
}

export function Link(props) {
    return createElement(
        'a',
        {
            // The href attribute is set to the hash path
            href: '#' + props.to,
            // Pass along any other props like 'class'
            ...props,
        },
        // The content inside the link, like "Go to About"
        props.children
    );
}