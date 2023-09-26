'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTodo, deleteTodo, updateTodo } from './todo-actions';
import { Todo } from './types';

type TodoForm = Todo;

export const CreateTodo = () => {
  const { register, formState, handleSubmit, reset } = useForm<TodoForm>();
  const { isDirty, isSubmitting } = formState;
  const onSubmit = handleSubmit((data) => {
    createTodo({
      name: data.name,
      done: false,
    });
    reset();
  });

  return (
    <form onSubmit={onSubmit} className="text-base">
      <fieldset className="my-2">
        <label className="block mb-1">Add Todo:</label>
        <input {...register('name')} className="text-black" />
      </fieldset>
      {isDirty && (
        <button
          disabled={!isDirty || isSubmitting}
          className="px-4 py-2text-white bg-blue-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save
        </button>
      )}
    </form>
  );
};

export const EditableTodo = ({ todo }: { todo: Todo }) => {
  console.log({ todo });
  const defaultValues = todo;
  const { register, reset, formState, handleSubmit } = useForm<TodoForm>({
    defaultValues,
  });
  const { isDirty, isSubmitting } = formState;
  useEffect(() => {
    reset(todo);
  }, [todo, reset]);
  const onSubmit = handleSubmit((data) => {
    updateTodo({
      ...data,
      id: todo.id,
    });
  });

  return (
    <form onSubmit={onSubmit} className="text-base">
      <label className="hidden">Name</label>
      <input {...register('name')} className="text-black mr-2 " />
      <input {...register('done')} type="checkbox" />
      <label className="ml-2 hidden">Done</label>
      {isDirty && (
        <button
          disabled={!isDirty || isSubmitting}
          className="ml-2 text-blue-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Update
        </button>
      )}
    </form>
  );
};

export const DeleteTodo = ({ id }: { id: number }) => {
  return (
    <button onClick={() => deleteTodo(id)} className="text-red-800">
      Delete
    </button>
  );
};
