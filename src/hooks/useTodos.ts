import { useState, useEffect } from 'react';
import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from '../utils/loadTodosFromLocalStorage ';

export interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    const savedTodos = loadTodosFromLocalStorage();
    console.log('savedTodos', savedTodos)
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const addTodo = (description: string) => {
    setTodos([...todos, { id: Date.now(), description, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return { todos: filteredTodos, addTodo, toggleTodo, setFilter, filter };
};
