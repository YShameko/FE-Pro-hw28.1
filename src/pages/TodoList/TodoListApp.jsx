import React, { useEffect, useState, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './todoListapp.style.css';

const STORAGE_KEY = 'todoListReact';

const TodoItem = ({ todo, onDelete, onToggle }) => {
    const itemClass = `todo-item ${todo.checked ? 'todo-item_checked' : ''}`;

    const handleSubmit = (values) => {
        if (values.checked !== todo.checked) {
             onToggle(todo.id);
        }
    };

    const initialValues = { 
        checked: todo.checked,
    };

    return (
        <Formik 
            initialValues={initialValues} 
            onSubmit={handleSubmit} 
        >
            {({ submitForm }) => ( 
                <li className={itemClass}>
                    <Form 
                        className="todo-item-form" 
                        onChange={submitForm} >
                        <Field type="checkbox" name="checked" />
                        <span className="todo-item-description"> {todo.text} </span>
                    </Form>
                    
                    <button className="todo-item-delete" onClick={() => onDelete(todo.id)} >
                        Видалити
                    </button>
                </li>
            )}
        </Formik>
    );
};

const AddTodoForm = ({ onAdd }) => {

    const validate = (values) => {
        const errors = {};
        if (!values.text || values.text.trim().length < 5) {
            errors.text = 'Вкажіть щонайменше 5 непорожніх символів';
        }
        return errors;
    };

    const handleSubmit = (values, { resetForm }) => {
        onAdd(values.text.trim());
        resetForm();
    };

    return (
        <Formik
            initialValues={{text: ''}}
            validate={validate}
            onSubmit={handleSubmit}
        >
            <Form className="form">
                <div className="form-add-todo">
                    <Field
                        type="text"
                        name="text"
                        placeholder="Введіть нове завдання..."
                        className="form-input"
                    />
                    <ErrorMessage name="text" component="div" className="form-error-message" />
                </div>
                
                <button type="submit" className="form-btn"> Додати </button>
            </Form>
        </Formik>
    );
};


export default function TodoListApp() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = localStorage.getItem(STORAGE_KEY);
        try {
            const initialTodos = storedTodos ? JSON.parse(storedTodos) : [];
            setTodos(initialTodos);
        } catch (e) {
            console.error("Помилка читання localStorage", e);
            setTodos([]);
        }
    }, []); // componentDidMount

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]); 

    const handleAdd = useCallback((text) => {
        const newTodo = {
            id: crypto.randomUUID(), 
            text,
            checked: false,
        };

        setTodos(prevTodos => [...prevTodos, newTodo]);
    }, []);

    const handleDelete = useCallback((id) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }, []);

    const handleToggle = useCallback((id) => {
        setTodos(prevTodos => 
            prevTodos.map(todo => 
                todo.id === id ? { ...todo, checked: !todo.checked } : todo
            )
        );
    }, []);

    return (
        <div className="container">
            <AddTodoForm onAdd={handleAdd} />
            <ul className="js--todos-wrapper">
                {todos.map(todo => (
                    <TodoItem 
                        key={todo.id} 
                        todo={todo}
                        onDelete={handleDelete}
                        onToggle={handleToggle}
                    />
                ))}
                {todos.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#64748b' }}>Список завдань поки порожній.</p>
                )}
            </ul>
        </div>
    );

}