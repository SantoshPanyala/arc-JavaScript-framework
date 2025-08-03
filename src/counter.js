// src/counter.js

import { h, useState } from './lib/arc.js';

export function Counter() {
  // Use the useState hook to manage the count
  const [count, setCount] = useState(0);

  return h(
      'div',
      { class: 'counter-container' },
      h('h1', null, 'Counter'),
      h('p', null, `The count is: ${count}`),
      h(
          'button',
          { onClick: () => setCount(count + 1) }, // When clicked, update the state!
          'Increment'
      )
  );
}