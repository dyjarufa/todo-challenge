import { renderHook, act } from '@testing-library/react-hooks';
import { useTodos, Todo } from './useTodos';
import * as localStorageUtils from '../utils/loadTodosFromLocalStorage';

jest.mock('../utils/loadTodosFromLocalStorage');

describe('useTodos', () => {
  beforeEach(() => {
    localStorageUtils.loadTodosFromLocalStorage.mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with todos from localStorage', () => {
    const todos: Todo[] = [{ id: 1, description: 'Test Todo', completed: false }];
    localStorageUtils.loadTodosFromLocalStorage.mockReturnValue(todos);

    const { result } = renderHook(() => useTodos());

    expect(result.current.todos).toEqual(todos);
  });

  test('should add a new todo', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('New Todo');
    });

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].description).toBe('New Todo');
    expect(localStorageUtils.saveTodosToLocalStorage).toHaveBeenCalledWith(result.current.todos);
  });

  test('should toggle todo completion status', () => {
    const todos: Todo[] = [{ id: 1, description: 'Test Todo', completed: false }];
    localStorageUtils.loadTodosFromLocalStorage.mockReturnValue(todos);

    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.toggleTodo(1);
    });

    expect(result.current.todos[0].completed).toBe(true);
    expect(localStorageUtils.saveTodosToLocalStorage).toHaveBeenCalledWith(result.current.todos);
  });

  test('should filter todos based on active filter', () => {
    const todos: Todo[] = [
      { id: 1, description: 'Active Todo', completed: false },
      { id: 2, description: 'Completed Todo', completed: true }
    ];
    localStorageUtils.loadTodosFromLocalStorage.mockReturnValue(todos);

    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.setFilter('active');
    });

    expect(result.current.todos).toEqual([todos[0]]);
  });

  test('should filter todos based on completed filter', () => {
    const todos: Todo[] = [
      { id: 1, description: 'Active Todo', completed: false },
      { id: 2, description: 'Completed Todo', completed: true }
    ];
    localStorageUtils.loadTodosFromLocalStorage.mockReturnValue(todos);

    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.setFilter('completed');
    });

    expect(result.current.todos).toEqual([todos[1]]);
  });
});
