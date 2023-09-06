'use server';
import { revalidatePath } from 'next/cache';
import { FileDB } from '../../helpers/file-db';
import { Todo } from './types';

const db = new FileDB();
const createId = () => Math.floor(Math.random() * 100000);

export const getTodos = () => {
  const todos = db.readByKey('todos') || [];
  return todos as Todo[];
};

export const createTodo = (newTodo: Omit<Todo, 'id'>) => {
  const todos = getTodos();
  todos.push({ ...newTodo, id: createId() });
  db.writeByKey('todos', todos);
  revalidatePath('/crud-file-db');
};

export const updateTodo = (updatedTodo: Todo) => {
  const todos = getTodos();
  const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
  todos[index] = updatedTodo;
  db.writeByKey('todos', todos);
  revalidatePath('/crud-file-db');
};

export const deleteTodo = (id: number) => {
  const todos = getTodos();
  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);
  db.writeByKey('todos', todos);
  revalidatePath('/crud-file-db');
};
