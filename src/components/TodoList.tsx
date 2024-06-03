import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

const todoSchema = z.object({
  description: z.string().min(1, "Todo description is required"),
});

type TodoFormValues = z.infer<typeof todoSchema>;

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo: SubmitHandler<TodoFormValues> = ({ description }) => {
    setTodos([...todos, { id: Date.now(), description, completed: false }]);
    reset();
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <form onSubmit={handleSubmit(addTodo)}>
        <input {...register("description")} placeholder="New todo" />
        <button type="submit">Add Todo</button>
        {errors.description && <span>{errors.description.message}</span>}
      </form>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

