// src/counter.js

import { createElement, useState } from './arc.js';

export function Counter() {
  // Use the useState hook to manage the count
  const [count, setCount] = useState(0);

  return createElement(
      'div',
      { class: 'counter-container' },
      createElement('h1', null, 'Counter'),
      createElement('p', null, `The count is: ${count}`),
      createElement(
          'button',
          { onClick: () => setCount(count + 1) }, // When clicked, update the state!
          'Increment'
      )
  );
}