import './TodoList.css';
import { useTodoForm } from "../hooks/useTodoForm";
import { useTodos } from "../hooks/useTodos";

export function TodoList() {
  const { todos, addTodo, toggleTodo, setFilter } = useTodos();
  const { register, handleSubmit, errors } = useTodoForm(addTodo);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input {...register("description")} placeholder="New todo" />
        <button type="submit">Add Todo</button>
        {errors.description && <span>{errors.description.message}</span>}
      </form>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

