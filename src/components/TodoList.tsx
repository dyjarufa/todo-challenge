import { useTodoForm } from "../hooks/useTodoForm";
import { useTodos } from "../hooks/useTodos";


function TodoList() {
  const { todos, addTodo, toggleTodo, setFilter } = useTodos();
  const { register, handleSubmit, errors } = useTodoForm(addTodo);

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
