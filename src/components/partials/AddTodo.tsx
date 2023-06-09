import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Todo from '../models/Todo';
import { addTodo } from '../../queries/todoQueries';

import styles from '../../assets/styles/todos.module.scss';
import { QUERIES } from '../../constants';

const schema = z.object({
  content: z.string().min(1, { message: 'Required' }),
});

const AddTodo = () => {
  const queryClient = useQueryClient();
  const { categoryID } = useParams();

  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<Todo>({ 
    resolver: zodResolver(schema),
    defaultValues: new Todo(),
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      const todo = new Todo(getValues());
      todo.categoryID = categoryID ?? '';
      await addTodo(todo);
    },
    onSuccess: () => {
      reset(new Todo());
      queryClient.invalidateQueries({ queryKey: [QUERIES.CATEGORIES, categoryID] });
    }
  });

  const onSubmit = handleSubmit(() => {
    mutate();
  });

  return (
    <form onSubmit={onSubmit} className={styles.addTodoForm}>
      <div>
        <label htmlFor="noteContent">Enter the content for the todo</label>
        <input {...register('content')} placeholder="Learn react-query..." />

        {
          errors.content && (
            <span className="inputError">{errors.content.message }</span>
          )
        }
      </div>

      <button onSubmit={AddTodo}>
        Add todo!
      </button>
    </form>
  );
};

export default AddTodo;
