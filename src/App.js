import React, { useState } from 'react';
import { FcTodoList } from 'react-icons/fc';
import './App.css';

import { MdDelete } from 'react-icons/md';

function App() {
    const ESCAPE_KEY = 27;
    const ENTER_KEY = 13;

    const [todos, setTodos] = useState([]);
    const [value, setValue] = useState('');

    const erase = () => {
        setValue('');
    };

    const submit = () => {
        setTodos([
            ...todos, // forma de ir concatenando o que ja estava com o novo objeto
            {
                id: new Date().getTime(), // uso apenas para esse projeto,em projetos maiores é recomendado utilização de libs especificas para id's
                title: value,
                checked: false,
            },
        ]);

        erase();
    };

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onKeyDown = (event) => {
        if (event.which === ENTER_KEY) {
            submit();
        } else if (event.which === ESCAPE_KEY) {
            erase();
        }
    };

    const onToggle = (todo) => {
        setTodos(
            todos.map((obj) =>
                obj.id === todo.id ? { ...obj, checked: !todo.checked } : obj
            )
        );
    };

    const onRemove = (todo) => {
        setTodos(todos.filter((obj) => obj.id !== todo.id));
    };

    return (
        <section id="app" className="container">
            <header>
                <h1 className="title">todo</h1>
                <FcTodoList size={50} />
            </header>
            <section className="main">
                <input
                    className="new-todo"
                    placeholder="o que precisa ser feito?"
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id.toString()}>
                            <span
                                className={[
                                    'todo',
                                    todo.checked ? 'checked' : '',
                                ].join(' ')}
                                onClick={() => onToggle(todo)}
                                onKeyPress={() => onToggle(todo)}
                                role="button"
                                tabIndex={0}
                            >
                                {todo.title}
                            </span>
                            <button
                                className="remove"
                                type="button"
                                onClick={() => onRemove(todo)}
                            >
                                <MdDelete size={28} />
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}

export default App;
