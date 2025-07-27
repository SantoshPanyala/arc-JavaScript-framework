// src/arc.js

// --- Internal State Management ---
// These global variables hold the state of our application.
let rootComponent = null;   // The root component function (e.g., Counter).
let rootContainer = null;   // The real DOM node where the app is mounted.
let currentVTree = null;    // The last rendered virtual DOM tree, for comparison.
let hooks = [];             // An array to store the state of our hooks between renders.
let hookIndex = 0;          // The index to keep track of which hook is being called.

// --- Framework Functions ---
// These are the public functions that users of our framework will interact with.

/**
 * Creates an object that describes an HTML element or a component (a Virtual DOM node).
 */
export function createElement(type, props, ...children) {
    if (typeof type === 'function') {
        return type(props);
    }
    return { type, props: props || {}, children: children.flat() };
}

/**
 * The useState hook. Gives a component state and a way to update it.
 */
export function useState(initialState) {
    const oldHook = hooks[hookIndex];
    const hook = oldHook ? oldHook : { state: initialState };

    const setState = (newState) => {
        hook.state = newState;
        _reRender(); // Trigger a re-render when state changes.
    };

    hooks[hookIndex] = hook;
    hookIndex++;
    return [hook.state, setState];
}

/**
 * Renders a component into a container, kicking off the whole process.
 */
export function render(Component, container) {
    rootComponent = Component;
    rootContainer = container;
    _reRender();
}

// --- Helper Functions ---
// These are the private functions that make our framework's engine run.

/**
 * Compares old and new props and updates them on the real DOM node.
 */
function diffProps(oldProps, newProps, domNode) {
    // Set new or changed props
    for (const prop in newProps) {
        if (oldProps[prop] !== newProps[prop]) {
            if (prop.startsWith('on')) { // Handle event listeners
                const eventType = prop.slice(2).toLowerCase();
                if (oldProps[prop]) {
                    domNode.removeEventListener(eventType, oldProps[prop]);
                }
                domNode.addEventListener(eventType, newProps[prop]);
            } else { // Handle attributes
                domNode.setAttribute(prop, newProps[prop]);
            }
        }
    }

    // Remove old props that no longer exist
    for (const prop in oldProps) {
        if (!(prop in newProps)) {
            if (prop.startsWith('on')) {
                const eventType = prop.slice(2).toLowerCase();
                domNode.removeEventListener(eventType, oldProps[prop]);
            } else {
                domNode.removeAttribute(prop);
            }
        }
    }
}

/**
 * The main reconciliation function. Compares the virtual DOM trees and updates the real DOM.
 */
function diff(oldVTree, newVTree, parentNode, index = 0) {
    // Use the index to get the correct DOM node to work on
    const domNode = parentNode.childNodes[index];

    // If a new node doesn't exist, remove the old one
    if (newVTree === undefined) {
        parentNode.removeChild(domNode);
        return;
    }

    // If the old node didn't exist, create and add the new one
    if (oldVTree == null) {
        parentNode.appendChild(createDomNode(newVTree));
        return;
    }

    // Handle text nodes
    if (typeof newVTree !== 'object' || typeof oldVTree !== 'object') {
        if (oldVTree !== newVTree) {
            parentNode.replaceChild(createDomNode(newVTree), domNode);
        }
        return;
    }

    // Handle different element types
    if (oldVTree.type !== newVTree.type) {
        parentNode.replaceChild(createDomNode(newVTree), domNode);
        return;
    }

    // Diff props on the same element type
    diffProps(oldVTree.props, newVTree.props, domNode);

    // Recursively diff the children, passing the correct index for each
    const oldChildren = oldVTree.children;
    const newChildren = newVTree.children;
    const maxLength = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < maxLength; i++) {
        diff(oldChildren[i], newChildren[i], domNode, i);
    }
}

/**
 * The private re-render function that triggers the diffing process.
 */
function _reRender() {
    hookIndex = 0;
    const newVTree = createElement(rootComponent);

    // The initial diff call starts at index 0 on the root container
    diff(currentVTree, newVTree, rootContainer, 0);

    currentVTree = newVTree;
}

/**
 * Creates a real DOM node from a virtual DOM node (used for the initial render).
 */
function createDomNode(vNode) {
    if (typeof vNode === 'string' || typeof vNode === 'number') {
        return document.createTextNode(vNode.toString());
    }

    const node = document.createElement(vNode.type);
    diffProps({}, vNode.props, node); // Use diffProps to set initial props

    for (const child of vNode.children) {
        node.appendChild(createDomNode(child));
    }

    return node;
}