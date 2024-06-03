import { Todo } from "../hooks/useTodos";

export const loadTodosFromLocalStorage = (): Todo[] => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : [];
};

export const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
