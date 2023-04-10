import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import Todo from '../models/Todo';
import { Checkbox } from '../elements/';

import styles from '../../assets/styles/todos.module.scss';
import todoStore from '../../stores/todoStore';

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
    queryClient.invalidateQueries({ queryKey: ['categories', todo.categoryID] });
  };

  return (
    <li className={`${styles.todo} ${todo.checked ? styles.done : undefined}`} onClick={toggle}>
      {todo.content}
      <Checkbox {...register('checked')} disabled />
    </li>
  );
};

export default TodoItem;
