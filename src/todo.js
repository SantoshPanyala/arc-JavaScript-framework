// src/todo.js

import { h, useState } from './lib/arc.js';

/**
 * A component for a single to-do item with a delete button.
 */
function TodoItem(props) {
    return h('li', null,
        props.text,
        h('button', { class: 'delete-btn', onClick: props.onDelete }, 'Delete')
    );
}

/**
 * The main application component.
 */
export function TodoListApp() {
    const [todos, setTodos] = useState(['Learn Arc.js', 'Build a To-Do App']);
    const [inputValue, setInputValue] = useState('');

    const handleAddTodo = () => {
        if (inputValue.trim() === '') return;
        setTodos([...todos, inputValue]);
        setInputValue('');
    };



    const handleDeleteTodo = (indexToDelete) => {
        const newTodos = todos.filter((_, index) => index !== indexToDelete);
        setTodos(newTodos);
    };

    return h(
        'div',
        { class: 'todo-app' },
        h('h1', null, 'My To-Do List'),

        h(
            'div',
            { class: 'add-todo' },
            h('input', {
                type: 'text',
                value: inputValue,
                onInput: (e) => setInputValue(e.target.value),
            }),
            h('button', { onClick: handleAddTodo }, 'Add')
        ),

        h(
            'ul',
            null,
            ...todos.map((todoText, index) =>
                h(TodoItem, {
                    text: todoText,
                    onDelete: () => handleDeleteTodo(index),
                })
            )
        )
    );
}