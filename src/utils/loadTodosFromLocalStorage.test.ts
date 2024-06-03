import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from './loadTodosFromLocalStorage';
import { Todo } from "../hooks/useTodos";

describe('localStorage Utils', () => {
  const mockTodos: Todo[] = [
    { id: 1, description: 'Test Todo 1', completed: false },
    { id: 2, description: 'Test Todo 2', completed: true },
  ];

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('should load todos from localStorage', () => {
    localStorage.setItem('todos', JSON.stringify(mockTodos));
    const todos = loadTodosFromLocalStorage();
    expect(todos).toEqual(mockTodos);
  });

  test('should return an empty array if no todos are in localStorage', () => {
    const todos = loadTodosFromLocalStorage();
    expect(todos).toEqual([]);
  });

  test('should save todos to localStorage', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');
    saveTodosToLocalStorage(mockTodos);
    expect(spy).toHaveBeenCalledWith('todos', JSON.stringify(mockTodos));
    const storedTodos = JSON.parse(localStorage.getItem('todos')!);
    expect(storedTodos).toEqual(mockTodos);
  });
});
