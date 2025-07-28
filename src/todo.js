// src/todo.js

import { createElement, useState } from './lib/arc.js';

/**
 * A component for a single to-do item with a delete button.
 */
function TodoItem(props) {
    return createElement('li', null,
        props.text,
        createElement('button', { class: 'delete-btn', onClick: props.onDelete }, 'Delete')
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

    return createElement(
        'div',
        { class: 'todo-app' },
        createElement('h1', null, 'My To-Do List'),

        createElement(
            'div',
            { class: 'add-todo' },
            createElement('input', {
                type: 'text',
                value: inputValue,
                onInput: (e) => setInputValue(e.target.value),
            }),
            createElement('button', { onClick: handleAddTodo }, 'Add')
        ),

        createElement(
            'ul',
            null,
            ...todos.map((todoText, index) =>
                createElement(TodoItem, {
                    text: todoText,
                    onDelete: () => handleDeleteTodo(index),
                })
            )
        )
    );
}