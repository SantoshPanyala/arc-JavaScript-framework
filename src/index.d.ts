// src/index.d.ts

/**
 * Declares the 'h' function. It can accept a string or a function as its type.
 */
export function h(type: string | Function, props?: { [key: string]: any }, ...children: any[]): object;

/**
 * Declares the 'render' function.
 */
export function render(component: Function, container: HTMLElement): void;

/**
 * Declares the 'useState' hook.
 */
export function useState<T>(initialState: T): [T, (newState: T) => void];

/**
 * Declares the 'useEffect' hook.
 */
export function useEffect(callback: () => void, dependencies: any[]): void;