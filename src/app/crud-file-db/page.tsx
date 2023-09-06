import { CreateTodo, DeleteTodo, EditableTodo } from './client';
import { getTodos } from './todo-actions';

export default function CrudFileDB() {
  const todos = getTodos();

  return (
    <main className="min-h-screen px-8">
      <section className="flex flex-col gap-4 mb-4">
        <h1 className="text-lg">CRUD File DB</h1>
        <p>
          A simple todo CRUD example using the app router, server actions and a
          file database. The forms are built with react-hook-form and are
          currently client-side.
        </p>
      </section>

      <section>
        {todos?.map((todo) => (
          <div key={todo.id} className="flex gap-2 items-center mb-3">
            <EditableTodo todo={todo} />
            <DeleteTodo id={todo.id} />
          </div>
        ))}
      </section>

      <section>
        <CreateTodo />
      </section>
    </main>
  );
}
