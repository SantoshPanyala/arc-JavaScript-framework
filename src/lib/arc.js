// src/arc.js

// --- Internal State Management ---
// These global variables hold the state of our application.
let rootComponent = null;   // The root component function (e.g., Counter).
let rootContainer = null;   // The real DOM node where the app is mounted.
let currentVTree = null;    // The last rendered virtual DOM tree, for comparison.
let hooks = [];             // An array to store the state of our hooks between renders.
let hookIndex = 0;          // The index to keep track of which hook is being called.
let effectsToRun = [];
// --- Framework Functions ---
// These are the public functions that users of our framework will interact with.

/**
 * Creates an object that describes an HTML element or a component (a Virtual DOM node).
 */
export function h(type, props, ...children) {
    if (typeof type === 'function') {
        return type({ ...props, children: children.flat() });
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
        _reRender(); // Trigger a re-render when the state changes.
    };

    hooks[hookIndex] = hook;
    hookIndex++;
    return [hook.state, setState];
}

export function useEffect(callback, dependencies) {
    const oldHook = hooks[hookIndex];
    const hasChanged = oldHook ? dependencies.some((dep, i) => dep !== oldHook.dependencies[i]) : true;

    if (hasChanged) {
        // We will run this effect after the render
        effectsToRun.push(callback);
    }

    hooks[hookIndex] = { dependencies }; // Store dependencies for the next render
    hookIndex++;
}

/**
 * Renders a component into a container, kicking off the whole process.
 */
export function render(Component, container) {
    window.arc = {
        version: '1.3.2', // Use the version from your package.json
        logo: `
<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1.17875" y="1.09244" width="31.5658" height="31.5658" rx="5.02031" fill="url(#paint0_linear_5106_133)" stroke="#D55838" stroke-width="0.434156"/>
<path d="M16.8981 7.72077C18.3819 7.64479 19.3877 8.77859 19.7216 10.1144C20.0476 11.4141 20.2135 12.7499 20.6255 14.0377C21.3973 16.4493 23.0031 18.417 24.8887 20.0527C25.7366 20.7865 26.7444 21.3525 27.0084 22.5423C27.2323 23.5481 26.7044 24.9038 25.8746 25.5157C24.3128 26.6635 22.7111 25.6137 21.1314 25.1378C18.3759 24.308 15.4564 24.3319 12.7028 25.1718C10.9231 25.7137 8.86747 26.9135 7.46771 24.9438C6.71584 23.886 6.64585 22.7262 7.36973 21.6284C7.73967 21.0685 8.20559 20.8005 8.6955 20.3786C11.459 17.993 13.0368 15.7654 13.8266 12.14C14.2506 10.2104 14.2985 7.85275 16.8981 7.72077ZM16.8681 11.5141C16.7481 11.5421 16.6761 11.6961 16.6402 11.8001C16.4422 12.356 16.3542 13.1059 16.1842 13.7038C15.2884 16.8912 13.5547 19.4588 11.1951 21.7324C11.0451 21.8784 10.4492 22.3423 10.4232 22.5063C10.3872 22.7322 10.5912 22.9222 10.8111 22.9242C14.2886 21.6144 17.9599 21.4124 21.5473 22.4183C22.0312 22.5542 22.5751 22.7962 23.0431 22.9022C23.233 22.9462 23.365 22.9382 23.479 22.7622C23.587 22.5962 23.559 22.5063 23.451 22.3583C23.159 21.9623 22.5191 21.5704 22.1912 21.1765C20.0416 19.0069 18.4698 16.3433 17.67 13.3838C17.582 13.0599 17.368 11.7941 17.2281 11.6281C17.1421 11.5241 16.9981 11.4821 16.8681 11.5121V11.5141Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_5106_133" x1="9.65023" y1="26.3753" x2="31.1238" y2="2.83696" gradientUnits="userSpaceOnUse">
<stop stop-color="#DE360E"/>
<stop offset="1" stop-color="#FF704E"/>
</linearGradient>
</defs>
</svg>
[cite_start]`
    };


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
    effectsToRun = []; // Reset the effects queue
    const newVTree = h(rootComponent);

    diff(currentVTree, newVTree, rootContainer, 0);

    currentVTree = newVTree;

    // After the DOM is updated, run all the queued effects
    effectsToRun.forEach(effect => effect());
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