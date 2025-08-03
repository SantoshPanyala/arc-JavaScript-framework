// src/lib/router.js

import { h, useState, useEffect } from './arc.js';

/**
 * The main Router component. It listens for URL hash changes and renders the correct page component.
 */
export function Router(props) {
    const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

    // This useEffect hook sets up the event listener correctly, so it only runs once.
    useEffect(() => {
        const handleHashChange = () => {
            setCurrentPath(window.location.hash.slice(1) || '/');
        };

        window.addEventListener('hashchange', handleHashChange);

        // Cleanup function to remove the listener if the component is ever unmounted
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []); // The empty array [] ensures this effect runs only once.

    // Find the component that matches the current path from the routes array
    const route = props.routes.find(r => r.path === currentPath);
    // If no route is found, use the wildcard '*' component
    const ComponentToRender = route ? route.component : props.routes.find(r => r.path === '*').component;

    // Render the matched component
    return h(ComponentToRender);
}

/**
 * The Link component, which creates a simple <a> tag with a hash-based href.
 */
export function Link(props) {
    return h(
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