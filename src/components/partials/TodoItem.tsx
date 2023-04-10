import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import Todo from '../models/Todo';
import { Checkbox } from '../elements/';
import { QUERIES } from '../../constants';

import styles from '../../assets/styles/todos.module.scss';
import todoStore from '../../stores/todoStore';
import Category from '../models/Category';

type TodoProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoProps) => {
  const queryClient = useQueryClient();

  const { register, setValue } = useForm<Todo>({
    defaultValues: todo,
  });

  const toggle = async () => {
    await todoStore.updateTodo(todo);
    setValue('checked', todo.checked);

    queryClient.setQueryData([QUERIES.CATEGORIES, todo.categoryID], (category: Category | undefined) => {
      if (category !== undefined) {
        return new Category(category.toJSON());
      }

      return category;
    });
  };

  return (
    <li className={`${styles.todo} ${todo.checked ? styles.done : undefined}`} onClick={toggle}>
      {todo.content}
      <Checkbox {...register('checked')} disabled />
    </li>
  );
};

export default TodoItem;
